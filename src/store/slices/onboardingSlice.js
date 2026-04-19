import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getToken } from "@/utils/helpers";
import * as onboardingApi from "@/api/onboarding";
import { ONBOARDING_DEFAULT_VALUES } from "@/features/onboarding/onboardingConfig";

function stripPassword(values) {
  const o = { ...values };
  delete o.accountPassword;
  return o;
}

/** Align with DB ENUM + select options (yes | no | partially); map legacy session labels. */
function normalizeCustodyArrangement(raw) {
  if (raw === null || raw === undefined || raw === "") return "";
  const s = String(raw).trim();
  if (s === "yes" || s === "no" || s === "partially") return s;
  const legacy = {
    "Full Custody": "yes",
    "Shared Custody": "partially",
    "Visitation Only": "no",
    "Adult Children": "yes",
    "Prefer to discuss": ""
  };
  return legacy[s] !== undefined ? legacy[s] : "";
}

function mergeBundleIntoValues(bundle, prevValues = {}) {
  const profile = bundle?.profile || {};
  const photosMeta = bundle?.photos || [];
  const urls = [...photosMeta]
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
    .map((p) => p.image_url)
    .filter(Boolean);
  let photos = [...(prevValues.photos && prevValues.photos.length ? prevValues.photos : [])];
  if (urls.length) {
    photos = [...urls];
    while (photos.length < 5) photos.push("");
    photos = photos.slice(0, 5);
  } else if (!photos.length) {
    photos = [...ONBOARDING_DEFAULT_VALUES.photos];
  }

  const merged = {
    ...ONBOARDING_DEFAULT_VALUES,
    ...prevValues,
    ...profile,
    accountEmail: prevValues.accountEmail || profile.accountEmail || "",
    photos
  };
  merged.custodyArrangement = normalizeCustodyArrangement(merged.custodyArrangement);
  return merged;
}

export const hydrateOnboarding = createAsyncThunk(
  "onboarding/hydrate",
  async (_, { rejectWithValue }) => {
    try {
      if (!getToken()) return null;
      return await onboardingApi.getOnboardingRequest();
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || e.message);
    }
  }
);

export const saveOnboardingStep = createAsyncThunk(
  "onboarding/saveStep",
  async ({ stepKey }, { getState, rejectWithValue }) => {
    try {
      const values = stripPassword(getState().onboarding.values);
      return await onboardingApi.patchOnboardingRequest({ stepKey, ...values });
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || e.message);
    }
  }
);

export const submitOnboarding = createAsyncThunk(
  "onboarding/submit",
  async (_, { getState, rejectWithValue }) => {
    try {
      const values = stripPassword(getState().onboarding.values);
      await onboardingApi.patchOnboardingRequest({ stepKey: "photosReview", ...values });
      return await onboardingApi.submitOnboardingRequest();
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || e.message);
    }
  }
);

const onboardingSlice = createSlice({
  name: "onboarding",
  initialState: {
    values: { ...ONBOARDING_DEFAULT_VALUES },
    errors: {},
    saving: false,
    loading: false,
    hydrateError: null,
    lastSavedAt: null
  },
  reducers: {
    updateField: (state, action) => {
      const { field, value } = action.payload;
      state.values[field] = value;
      if (state.errors[field]) delete state.errors[field];
    },
    updateFields: (state, action) => {
      state.values = { ...state.values, ...action.payload };
      Object.keys(action.payload).forEach((k) => {
        if (state.errors[k]) delete state.errors[k];
      });
    },
    setErrors: (state, action) => {
      state.errors = action.payload || {};
    },
    clearErrors: (state) => {
      state.errors = {};
    },
    resetOnboarding: (state) => {
      state.values = { ...ONBOARDING_DEFAULT_VALUES };
      state.errors = {};
    },
    syncAccountEmail: (state, action) => {
      if (action.payload?.accountEmail) {
        state.values.accountEmail = action.payload.accountEmail;
      }
    },
    loadFromSession: (state) => {
      try {
        const raw = sessionStorage.getItem("onboardingData");
        if (!raw) return;
        const parsed = JSON.parse(raw);
        state.values = { ...ONBOARDING_DEFAULT_VALUES, ...parsed };
      } catch {
        /* ignore */
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(hydrateOnboarding.pending, (state) => {
        state.loading = true;
        state.hydrateError = null;
      })
      .addCase(hydrateOnboarding.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.values = mergeBundleIntoValues(action.payload, state.values);
        }
      })
      .addCase(hydrateOnboarding.rejected, (state, action) => {
        state.loading = false;
        state.hydrateError = action.payload || action.error?.message;
      })
      .addCase(saveOnboardingStep.pending, (state) => {
        state.saving = true;
      })
      .addCase(saveOnboardingStep.fulfilled, (state, action) => {
        state.saving = false;
        state.lastSavedAt = new Date().toISOString();
        if (action.payload) {
          state.values = mergeBundleIntoValues(action.payload, state.values);
        }
        try {
          sessionStorage.setItem("onboardingData", JSON.stringify(state.values));
        } catch {
          /* ignore */
        }
      })
      .addCase(saveOnboardingStep.rejected, (state) => {
        state.saving = false;
      })
      .addCase(submitOnboarding.pending, (state) => {
        state.saving = true;
      })
      .addCase(submitOnboarding.fulfilled, (state, action) => {
        state.saving = false;
        if (action.payload) {
          state.values = mergeBundleIntoValues(action.payload, state.values);
        }
        try {
          sessionStorage.setItem("onboardingData", JSON.stringify(state.values));
        } catch {
          /* ignore */
        }
      })
      .addCase(submitOnboarding.rejected, (state) => {
        state.saving = false;
      });
  }
});

export const { updateField, updateFields, setErrors, clearErrors, resetOnboarding, syncAccountEmail, loadFromSession } =
  onboardingSlice.actions;

export default onboardingSlice.reducer;

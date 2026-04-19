import * as yup from "yup";
import { ROUTE_PATHS } from "@/routes/paths";

export const ONBOARDING_STEPS = [
  {
    key: "basicInfo",
    route: ROUTE_PATHS.ONBOARDING_BASIC_INFO,
    schema: yup.object({
      firstName: yup.string().trim().required("First name is required."),
      lastName: yup.string().trim().required("Last name is required."),
      gender: yup.string().oneOf(["male", "female", "other"]).required("Gender is required."),
      dateOfBirth: yup.string().required("Date of birth is required."),
      location: yup.string().trim().required("Current location is required."),
      phone: yup.string().trim().optional()
    })
  },
  {
    key: "religiousLifestyle",
    route: ROUTE_PATHS.ONBOARDING_RELIGIOUS_LIFESTYLE_STEP_2,
    schema: yup.object({
      religiousLevel: yup.string().required("Religious level is required."),
      shabbatObservance: yup.string().required("Shabbat observance is required."),
      kashrutLevel: yup.string().required("Kashrut level is required."),
      lifestyleDescription: yup
        .string()
        .trim()
        .min(20, "Please enter at least 20 characters.")
        .required("Lifestyle description is required.")
    })
  },
  {
    key: "personality",
    route: ROUTE_PATHS.ONBOARDING_PERSONALITY_STEP_3,
    schema: yup.object({
      personalityTraits: yup.array().min(1, "Select at least one trait."),
      hobbies: yup.array().min(1, "Select at least one interest."),
      aboutMe: yup
        .string()
        .trim()
        .min(20, "Please enter at least 20 characters.")
        .required("About Me is required."),
      lookingFor: yup
        .string()
        .trim()
        .min(20, "Please enter at least 20 characters.")
        .required("This field is required.")
    })
  },
  {
    key: "familyBackground",
    route: ROUTE_PATHS.ONBOARDING_FAMILY_STEP_4,
    schema: yup.object({
      siblingsCount: yup
        .number()
        .typeError("Siblings count is required.")
        .integer("Enter a whole number.")
        .min(0, "Enter 0 or more.")
        .required("Siblings count is required."),
      birthOrder: yup.string().trim().min(1, "Birth order is required.").required("Birth order is required."),
      familyStyle: yup.string().trim().required("Family style is required."),
      motherHeritage: yup.string().trim().required("Mother's heritage is required."),
      fatherHeritage: yup.string().trim().required("Father's heritage is required."),
      familyNarrative: yup
        .string()
        .trim()
        .min(20, "Please enter at least 20 characters.")
        .required("Family narrative is required."),
      siblingNotes: yup.string().trim().optional()
    })
  },
  {
    key: "status",
    route: ROUTE_PATHS.ONBOARDING_STATUS_FEMALE_STEP_5,
    schema: yup.object({
      relationshipStatus: yup.string().oneOf(["single", "divorced", "widowed"]).required("Please select your current status."),
      hasChildren: yup
        .boolean()
        .transform((v) => {
          if (v === 1 || v === true) return true;
          if (v === 0 || v === false) return false;
          if (v === undefined || v === null) return false;
          return Boolean(v);
        })
        .required(),
      childrenCount: yup.mixed().when("hasChildren", {
        is: (v) => v === true || v === 1,
        then: () =>
          yup
            .number()
            .transform((val, orig) => {
              if (orig === "" || orig === null || orig === undefined) return undefined;
              const n = typeof orig === "number" ? orig : Number(orig);
              return Number.isFinite(n) ? n : NaN;
            })
            .typeError("Enter a valid number.")
            .required("Children quantity is required.")
            .integer("Enter a whole number.")
            .min(1, "Enter 1 or more."),
        otherwise: () => yup.mixed().nullable().notRequired()
      }),
      custodyArrangement: yup.mixed().when("hasChildren", {
        is: (v) => v === true || v === 1,
        then: () =>
          yup
            .string()
            .oneOf(["yes", "no", "partially"], "Select a custody arrangement.")
            .required("Custody arrangement is required."),
        otherwise: () => yup.string().nullable().notRequired()
      })
    })
  },
  {
    key: "matchPreferences",
    route: ROUTE_PATHS.ONBOARDING_MATCH_PREFERENCES_STEP_6,
    schema: yup.object({
      preferredAgeMin: yup
        .number()
        .typeError("Minimum age is required.")
        .integer()
        .min(18, "Minimum age must be 18 or above.")
        .max(99, "Enter a valid age.")
        .required("Minimum age is required."),
      preferredAgeMax: yup
        .number()
        .typeError("Maximum age is required.")
        .integer()
        .min(18, "Maximum age must be 18 or above.")
        .max(99, "Enter a valid age.")
        .required("Maximum age is required.")
        .test("max-gte-min", "Maximum age must be greater than or equal to minimum age.", function maxGteMin(value) {
          const min = this.parent.preferredAgeMin;
          if (typeof min !== "number" || typeof value !== "number") return true;
          return value >= min;
        }),
      matchReligiousPreference: yup.string().required("Select a religious preference."),
      dealBreakerSmoker: yup.boolean().required(),
      dealBreakerDifferentReligiousLevel: yup.boolean().required(),
      dealBreakerHasChildren: yup.boolean().required()
    })
  },
  {
    key: "photosReview",
    route: ROUTE_PATHS.ONBOARDING_PHOTOS_REVIEW,
    schema: yup.object({
      photos: yup
        .array()
        .of(yup.string())
        .test("primary-photo", "Add a main photo.", (arr) => Boolean(arr?.[0])),
      agreementAccepted: yup.boolean().oneOf([true], "You must confirm profile information before finishing.")
    })
  }
];

export const ONBOARDING_DEFAULT_VALUES = {
  accountEmail: "",
  accountPassword: "",
  firstName: "",
  lastName: "",
  gender: "",
  phone: "",
  dateOfBirth: "",
  location: "",
  religiousLevel: "",
  shabbatObservance: "",
  kashrutLevel: "",
  lifestyleDescription: "",
  personalityTraits: [],
  hobbies: [],
  aboutMe: "",
  lookingFor: "",
  siblingsCount: "",
  birthOrder: "",
  familyStyle: "",
  motherHeritage: "",
  fatherHeritage: "",
  familyNarrative: "",
  siblingNotes: "",
  relationshipStatus: "single",
  hasChildren: false,
  childrenCount: "",
  custodyArrangement: "",
  preferredAgeMin: 24,
  preferredAgeMax: 36,
  matchReligiousPreference: "Modern Orthodox",
  dealBreakerSmoker: true,
  dealBreakerDifferentReligiousLevel: false,
  dealBreakerHasChildren: false,
  photos: ["", "", "", "", ""],
  agreementAccepted: false,
  lineageTag: "Cohen"
};

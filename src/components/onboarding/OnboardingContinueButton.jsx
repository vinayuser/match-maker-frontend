/** Primary CTA used across onboarding steps. */
export default function OnboardingContinueButton({ onClick, type = "button", disabled = false, label = "Continue" }) {
  return (
    <button type={type} disabled={disabled} onClick={onClick} className="obi-continue md:w-auto">
      <span>{label}</span>
      <span className="material-symbols-outlined text-lg text-[#412d00]" aria-hidden>
        arrow_forward
      </span>
    </button>
  );
}

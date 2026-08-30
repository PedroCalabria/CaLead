import type { LeadSubmission, SubmissionField } from "./types";

export const SUBMISSION_FIELDS: SubmissionField[] = [
  "fullName",
  "email",
  "phone",
  "website",
  "linkedin",
];

/** Returns an error message, or null when the field is acceptable. */
export function validateField(
  field: SubmissionField,
  rawValue: string,
): string | null {
  const v = String(rawValue ?? "").trim();

  switch (field) {
    case "fullName":
      if (!v) return "Enter the lead’s full name.";
      if (v.length < 2) return "That is too short — use at least two characters.";
      return null;

    case "email":
      if (!v) return "Enter an email address.";
      if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v)) {
        return "That doesn’t look like an email address. Check for a missing @ or domain.";
      }
      return null;

    case "phone": {
      if (!v) return "Enter a phone number, including the country code.";
      if (!v.startsWith("+")) {
        return "Start with a country code, like +1 (415) 555-0148.";
      }
      const digits = v.replace(/[^0-9]/g, "");
      if (digits.length < 8) {
        return "That number looks incomplete — 8 or more digits after the country code.";
      }
      return null;
    }

    case "website": {
      if (!v) return "Enter the company website.";
      const host = v.replace(/^https?:\/\//, "").split("/")[0];
      if (!/^[a-z0-9-]+(\.[a-z0-9-]+)+$/i.test(host)) {
        return "That doesn’t look like a domain. Try something like acme.io.";
      }
      return null;
    }

    case "linkedin":
      if (!v) return "Enter the LinkedIn company page or profile URL.";
      if (!/linkedin\.com\/(company|in)\/[^\s/]+/i.test(v)) {
        return "That doesn’t look like a LinkedIn URL. It should start with linkedin.com/company/ or linkedin.com/in/.";
      }
      return null;
  }
}

export function validateAll(
  form: LeadSubmission,
): Partial<Record<SubmissionField, string>> {
  const errors: Partial<Record<SubmissionField, string>> = {};
  for (const field of SUBMISSION_FIELDS) {
    const error = validateField(field, form[field]);
    if (error) errors[field] = error;
  }
  return errors;
}

/** Adds the scheme a rep almost always leaves off. */
export function normaliseUrl(field: SubmissionField, value: string): string {
  const v = value.trim();
  if (!v || /^https?:\/\//i.test(v)) return v;
  if (field === "website") return `https://${v}`;
  if (field === "linkedin") return `https://${v.replace(/^www\./, "")}`;
  return v;
}

import type { UserRole } from "@/types";

const EMAIL_FORMAT = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Official Indian government / public-sector email domains.
const GOV_DOMAIN_PATTERN = /(^|\.)(gov\.in|nic\.in)$/i;

// Common personal/free email providers — disallowed for the Analyst/Builder
// role, which is meant to represent a company or firm account.
const FREE_EMAIL_DOMAINS = new Set([
  "gmail.com",
  "yahoo.com",
  "yahoo.co.in",
  "hotmail.com",
  "outlook.com",
  "live.com",
  "icloud.com",
  "aol.com",
  "protonmail.com",
  "rediffmail.com",
  "yandex.com",
]);

export interface EmailRoleValidation {
  valid: boolean;
  error?: string;
}

/** Human-readable hint shown near the email field for the selected role. */
export function emailHintForRole(role: UserRole): string {
  switch (role) {
    case "government":
      return "Requires an official government email (e.g. name@agency.gov.in or .nic.in).";
    case "analyst":
      return "Requires a company/organization email — personal Gmail, Yahoo, or Outlook accounts aren't accepted.";
    case "public":
    default:
      return "Any valid email address works for citizen access.";
  }
}

/** Validates that an email is well-formed and matches the access rules for the given role. */
export function validateEmailForRole(email: string, role: UserRole): EmailRoleValidation {
  const trimmed = email.trim().toLowerCase();

  if (!EMAIL_FORMAT.test(trimmed)) {
    return { valid: false, error: "Enter a valid email address." };
  }

  const domain = trimmed.split("@")[1] ?? "";

  if (role === "government" && !GOV_DOMAIN_PATTERN.test(domain)) {
    return {
      valid: false,
      error: "Government access requires an official .gov.in or .nic.in email address.",
    };
  }

  if (role === "analyst" && FREE_EMAIL_DOMAINS.has(domain)) {
    return {
      valid: false,
      error: "Analyst / Builder access requires a company or organization email — not a personal email provider.",
    };
  }

  return { valid: true };
}

/** The dashboard root a given role should land on / be redirected to. */
export function roleHomePath(role: UserRole): string {
  return `/${role}`;
}

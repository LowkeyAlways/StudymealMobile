import type { User } from "@supabase/supabase-js";

type UserMetadata = {
  family_name?: unknown;
  first_name?: unknown;
  full_name?: unknown;
  given_name?: unknown;
  last_name?: unknown;
  name?: unknown;
};

function readText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export function getUserDisplayName(user: User) {
  const metadata = user.user_metadata as UserMetadata;
  const firstName = readText(metadata.first_name) || readText(metadata.given_name);
  const lastName = readText(metadata.last_name) || readText(metadata.family_name);
  const fullName = readText(metadata.full_name) || readText(metadata.name);
  const composedName = [firstName, lastName].filter(Boolean).join(" ");

  return composedName || fullName || "Compte Studymeal";
}

export function getUserInitial(user: User) {
  return getUserDisplayName(user).charAt(0).toUpperCase() || "S";
}

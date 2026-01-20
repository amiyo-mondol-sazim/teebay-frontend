export function getInitials(name: string) {
  const trimmed = name.trim();
  if (!trimmed) return "";
  return trimmed
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export function getUserName(email?: string | null) {
  return email?.split("@")[0] ?? "User";
}

export function getUserEmail(email?: string | null) {
  return email ?? "";
}

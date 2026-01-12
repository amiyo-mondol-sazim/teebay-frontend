export const getInitials = (name: string) => {
  const trimmed = name.trim();
  if (!trimmed) return '';
  return trimmed
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
};

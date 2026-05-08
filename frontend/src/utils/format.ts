export function formatCoins(value: number) {
  return `${value} coins`;
}

export function formatRelativeDeparture(iso: string) {
  const diffMs = new Date(iso).getTime() - Date.now();
  const diffMinutes = Math.max(Math.round(diffMs / 60000), 0);

  if (diffMinutes < 60) {
    return `Leaves in ${diffMinutes} min`;
  }

  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;
  return `Leaves in ${hours}h ${minutes}m`;
}

export function formatTimestamp(iso: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(iso));
}

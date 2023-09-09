export function generateUniqueId() {
  const timestamp = new Date().getTime();
  const random = Math.random().toString(36).substring(2, 15);
  return `${timestamp}${random}`;
}

export function formatDate(date?: Date): string {
  const currentDate = date || new Date();
  const day = String(currentDate.getDate()).padStart(2, '0');
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const year = currentDate.getFullYear();
  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  const seconds = String(currentDate.getSeconds()).padStart(2, '0');
  const formattedDateTime = `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`;
  return formattedDateTime;
}

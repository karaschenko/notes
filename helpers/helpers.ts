export function generateUniqueId() {
  const timestamp = new Date().getTime();
  const random = Math.random().toString(36).substring(2, 15);
  return `${timestamp}${random}`;
}

export function formatDate(date: Date = new Date()): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`;
}

export function generateTitleFromContent(content: string): string {
  const words: string[] = content.trim().split(/\s+/);
  const firstTwoWords: string[] = words.slice(0, 2);
  const title: string = firstTwoWords.join(" ").slice(0, 30);

  return title;
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number = 500
) {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

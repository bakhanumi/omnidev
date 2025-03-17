// Форматирование даты
export function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return 'Будет объявлена позже';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// Преобразование даты для input типа datetime-local
export function toDateTimeLocal(dateString: string | null | undefined): string {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return date.toISOString().slice(0, 16);
}

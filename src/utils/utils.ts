export const truncateText = (text: string | undefined | null, length: number): string => {
  if (!text) return '';
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
};
export const truncateText = (text: string | undefined | null, length: number): string => {
  if (!text) return '';
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
};

export const priceToString = (price: number) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const formatPrice = (price: number | string): string => {
  if (price === '') return '';
  const parsedPrice = typeof price === 'string' ? parseInt(price, 10) : price;
  return parsedPrice.toLocaleString('ko-KR');
};

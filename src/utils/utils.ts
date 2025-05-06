export const truncateText = (text: string | undefined | null, length: number): string => {
  if (!text) return '';
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
};

export const priceToString = (price: number) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const formatPhoneNum = (phoneNum: string) => {
  if (phoneNum === '') return '';
  return phoneNum.replace(/-/g, '');
};

export const openNewTap = (url: string) => {
  window.open(url, '_blank');
};

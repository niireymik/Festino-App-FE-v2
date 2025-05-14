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

export const getRelativeTime = (timestamp: string): string => {
  const now = new Date();
  const past = new Date(timestamp);
  const diffMs = now.getTime() - past.getTime();

  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 1) return '방금 전';
  if (diffMinutes < 60) return `${diffMinutes}분 전`;
  if (diffHours < 24) return `${diffHours}시간 전`;
  return `${diffDays}일 전`;
};

export const formatDateTime = (isoString: string): string => {
  const date = new Date(isoString);
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const period = hours < 12 ? '오전' : '오후';
  const hour12 = hours % 12 || 12;
  return `${date.getFullYear()}. ${String(date.getMonth() + 1).padStart(2, '0')}. ${String(date.getDate()).padStart(2, '0')}. ${period} ${hour12}:${minutes}`;
};

export const formatPrice = (price: number) => price.toLocaleString();

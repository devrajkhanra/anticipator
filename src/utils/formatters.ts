export const formatNumber = (num: any): string => {
  if (typeof num !== 'number' || !isFinite(num)) {
    return '0.00';
  }
  return num.toFixed(2);
};

export const formatLargeNumber = (num: any): string => {
  if (typeof num !== 'number' || !isFinite(num)) {
    return '0';
  }
  
  try {
    if (num >= 10000000) return `${(num / 10000000).toFixed(2)}Cr`;
    if (num >= 100000) return `${(num / 100000).toFixed(2)}L`;
    if (num >= 1000) return `${(num / 1000).toFixed(2)}K`;
    return num.toFixed(0);
  } catch {
    return '0';
  }
};

export const calculatePercentageChange = (current: number, previous: number): number => {
  if (!isFinite(current) || !isFinite(previous) || previous === 0) {
    return 0;
  }
  return ((current - previous) / previous) * 100;
};
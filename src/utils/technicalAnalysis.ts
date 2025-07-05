export function calculateMovingAverage(data: number[], period: number): number {
  if (data.length < period) return 0;
  return data.slice(0, period).reduce((sum, val) => sum + val, 0) / period;
}

export function calculateRSI(data: number[], period: number = 14): number {
  if (data.length < period + 1) return 50;

  let gains = 0;
  let losses = 0;

  for (let i = 1; i <= period; i++) {
    const difference = data[i] - data[i - 1];
    if (difference >= 0) {
      gains += difference;
    } else {
      losses -= difference;
    }
  }

  const avgGain = gains / period;
  const avgLoss = losses / period;
  
  const rs = avgGain / avgLoss;
  return 100 - (100 / (1 + rs));
}

export function findSupportResistance(data: number[]): {
  support: number;
  resistance: number;
} {
  const sorted = [...data].sort((a, b) => a - b);
  const q1 = sorted[Math.floor(sorted.length * 0.25)];
  const q3 = sorted[Math.floor(sorted.length * 0.75)];
  
  return {
    support: q1,
    resistance: q3
  };
}

export function calculateVolumeProfile(data: any[]): {
  highVolPrices: number[];
  avgVolume: number;
} {
  const volumes = data.map(d => d.totalTradedQuantity);
  const avgVolume = volumes.reduce((sum, vol) => sum + vol, 0) / volumes.length;
  
  const highVolPrices = data
    .filter(d => d.totalTradedQuantity > avgVolume * 1.5)
    .map(d => d.closePrice);

  return {
    highVolPrices,
    avgVolume
  };
}

export function analyzeDeliveryPattern(data: any[]): {
  trend: string;
  strength: number;
} {
  const deliveryPcts = data.map(d => d.deliveryPercentage);
  const avgDelivery = deliveryPcts.reduce((sum, pct) => sum + pct, 0) / deliveryPcts.length;
  const latestDelivery = deliveryPcts[0];
  
  let trend = 'Neutral';
  let strength = 50;

  if (latestDelivery > avgDelivery * 1.2) {
    trend = 'Strong Accumulation';
    strength = 80;
  } else if (latestDelivery > avgDelivery * 1.1) {
    trend = 'Moderate Accumulation';
    strength = 65;
  } else if (latestDelivery < avgDelivery * 0.8) {
    trend = 'Distribution';
    strength = 30;
  }

  return { trend, strength };
}
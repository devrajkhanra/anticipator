import { TECHNICAL_INDICATORS, PREDICTION_THRESHOLDS } from '../constants/analysis';

// Add these safety checks at the beginning of each function
function safeNumber(value: any): number {
  return typeof value === 'number' && !isNaN(value) ? value : 0;
}

export function getVolumeRationale(data: any[]): string {
  if (!data || data.length < 2) {
    return 'Insufficient data for volume analysis';
  }

  const latestData = data[0];
  const prevData = data[1];
  
  if (!latestData || !prevData) {
    return 'Data not available';
  }

  const volumeChange = safeNumber(
    ((latestData.totalTradedQuantity - prevData.totalTradedQuantity) / 
    prevData.totalTradedQuantity) * 100
  );
  
  if (volumeChange > 50) {
    return `Strong volume surge (${volumeChange.toFixed(0)}%) with ${
      safeNumber(latestData.deliveryPercentage).toFixed(1)}% delivery`;
  }
  return `Regular volume activity with ${
    safeNumber(latestData.deliveryPercentage).toFixed(1)}% delivery`;
}

// Update other helper functions similarly with null checks and safe number handling

export function getPriceActionConfidence(data: any[]): number {
  const latestData = data[0];
  const prevData = data[1];
  
  // Calculate confidence based on price action patterns
  let confidence = 50; // Base confidence
  
  // Strong trend if closing near high/low
  const range = latestData.highPrice - latestData.lowPrice;
  const closePosition = (latestData.closePrice - latestData.lowPrice) / range;
  
  if (closePosition > 0.8) confidence += 20;
  else if (closePosition > 0.6) confidence += 10;
  
  // Trend continuation
  if (latestData.closePrice > prevData.closePrice) {
    confidence += 10;
  }
  
  return Math.min(confidence, 100);
}

export function getPriceActionRationale(data: any[]): string {
  const latestData = data[0];
  const prevData = data[1];
  
  const change = ((latestData.closePrice - prevData.closePrice) / prevData.closePrice) * 100;
  const range = latestData.highPrice - latestData.lowPrice;
  const closePosition = (latestData.closePrice - latestData.lowPrice) / range;
  
  if (closePosition > 0.8) {
    return `Strong bullish close (${change.toFixed(2)}%) near day's high`;
  } else if (closePosition < 0.2) {
    return `Weak close (${change.toFixed(2)}%) near day's low`;
  }
  return `Moderate price action with ${change.toFixed(2)}% change`;
}

export function getVolumeConfidence(data: any[]): number {
  const latestData = data[0];
  const prevData = data[1];
  
  let confidence = 50;
  
  // Volume increase
  if (latestData.totalTradedQuantity > prevData.totalTradedQuantity * 1.5) {
    confidence += 20;
  } else if (latestData.totalTradedQuantity > prevData.totalTradedQuantity) {
    confidence += 10;
  }
  
  // High delivery percentage
  if (latestData.deliveryPercentage > TECHNICAL_INDICATORS.DELIVERY_THRESHOLD) {
    confidence += 20;
  }
  
  return Math.min(confidence, 100);
}


export function getMarketContextConfidence(indexData: any[], sectorData: any[]): number {
  const latestIndex = indexData[0];
  const latestSector = sectorData[0];
  
  let confidence = 50;
  
  // Market trend
  if (latestIndex.changePercent > 1) {
    confidence += 20;
  } else if (latestIndex.changePercent > 0) {
    confidence += 10;
  }
  
  // Sector strength
  if (latestSector.changePercent > 1) {
    confidence += 20;
  } else if (latestSector.changePercent > 0) {
    confidence += 10;
  }
  
  return Math.min(confidence, 100);
}

export function getMarketContextRationale(indexData: any[], sectorData: any[]): string {
  const latestIndex = indexData[0];
  const latestSector = sectorData[0];
  
  return `Market ${latestIndex.changePercent > 0 ? 'up' : 'down'} ${Math.abs(latestIndex.changePercent).toFixed(2)}%, ` +
    `Sector ${latestSector.changePercent > 0 ? 'up' : 'down'} ${Math.abs(latestSector.changePercent).toFixed(2)}%`;
}

export function getTechnicalConfidence(data: any[]): number {
  const latestData = data[0];
  const prevData = data[1];
  
  let confidence = 50;
  
  // Trend analysis
  if (latestData.closePrice > prevData.closePrice) {
    confidence += 10;
    if (latestData.closePrice > latestData.openPrice) {
      confidence += 10;
    }
  }
  
  // Volume support
  if (latestData.totalTradedQuantity > prevData.totalTradedQuantity) {
    confidence += 15;
  }
  
  return Math.min(confidence, 100);
}

export function getTechnicalRationale(data: any[]): string {
  const latestData = data[0];
  const prevData = data[1];
  
  const priceChange = ((latestData.closePrice - prevData.closePrice) / prevData.closePrice) * 100;
  const volumeChange = ((latestData.totalTradedQuantity - prevData.totalTradedQuantity) / 
    prevData.totalTradedQuantity) * 100;
  
  return `Price ${priceChange > 0 ? 'up' : 'down'} ${Math.abs(priceChange).toFixed(2)}% with ` +
    `${volumeChange > 0 ? 'increasing' : 'decreasing'} volume`;
}
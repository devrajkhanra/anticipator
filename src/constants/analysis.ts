export const TECHNICAL_INDICATORS = {
  RSI_PERIOD: 14,
  MA_PERIODS: [5, 10, 20, 50],
  VOLUME_THRESHOLD: 1.5, // 50% above average
  DELIVERY_THRESHOLD: 65 // 65% delivery percentage threshold
};

export const PRICE_PATTERNS = {
  BREAKOUT_THRESHOLD: 0.02, // 2% breakout threshold
  SUPPORT_LEVELS: 3, // Number of support levels to track
  RESISTANCE_LEVELS: 3 // Number of resistance levels to track
};

export const MARKET_CONTEXT = {
  PEER_CORRELATION_THRESHOLD: 0.7,
  SECTOR_IMPACT_WEIGHT: 0.4,
  MARKET_IMPACT_WEIGHT: 0.3,
  STOCK_SPECIFIC_WEIGHT: 0.3
};

export const PREDICTION_THRESHOLDS = {
  HIGH_CONFIDENCE: 75,
  MODERATE_CONFIDENCE: 60,
  LOW_CONFIDENCE: 50
};
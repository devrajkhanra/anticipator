import React from 'react';
import { TrendingUp, AlertTriangle, BarChart2, Globe, Clock, User } from 'lucide-react';
import { useAnalysis } from '../context/AnalysisContext';
import { StockData, IndexData } from '../types/StockData';
import { formatNumber, calculatePercentageChange } from '../utils/formatters';

// Removed unused: Activity

interface AnalysisFactor {
  factor: string;
  weight: number;
  signal: string;
  confidence: number;
  rationale: string;
  icon: React.FC<{ className?: string }>;
  color: 'green' | 'red' | 'yellow' | 'blue';
}

interface PredictionResult {
  direction: string;
  confidence: number;
  explanation: string;
  targets: {
    resistance: number;
    support: number;
    nextTarget: number;
  };
  risks: string[];
}

export const PredictionSummary: React.FC = () => {
  const { stockData, indexData, sectorIndexData } = useAnalysis();
  const currentDateTime = new Date().toISOString().replace('T', ' ').substring(0, 19);
  const currentUser = 'devrajkhanra';

  if (!stockData || stockData.length < 2 || !indexData?.[0] || !sectorIndexData?.[0]) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Prediction Summary</h2>
          <div className="flex items-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>{currentDateTime}</span>
            </div>
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>{currentUser}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-3 text-gray-500">
          <AlertTriangle className="w-5 h-5" />
          <p>Insufficient data for analysis. Please ensure all required data is loaded.</p>
        </div>
      </div>
    );
  }

  const factors = analyzeTradingFactors(stockData, indexData, sectorIndexData);

  if (factors.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <div className="flex items-center space-x-3 text-gray-500">
          <AlertTriangle className="w-5 h-5" />
          <p>Unable to analyze trading factors. Please check the data format.</p>
        </div>
      </div>
    );
  }

  const prediction = generatePrediction(stockData, factors);

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Prediction Summary</h2>
          <div className="flex items-center space-x-6 text-sm text-gray-600 mt-2">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>{currentDateTime}</span>
            </div>
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>{currentUser}</span>
            </div>
          </div>
        </div>
        <div className={`px-4 py-2 rounded-full 
          ${prediction.confidence >= 75 ? 'bg-green-100 text-green-700' : 
          prediction.confidence >= 50 ? 'bg-yellow-100 text-yellow-700' : 
          'bg-red-100 text-red-700'}`}>
          <span className="text-sm font-semibold">{formatNumber(prediction.confidence)}% Confidence</span>
        </div>
      </div>

      {/* Rest of the component remains the same */}
    </div>
  );
};

function analyzeTradingFactors(
  stockData: StockData[],
  indexData: IndexData[],
  sectorData: IndexData[]
): AnalysisFactor[] {
  try {
    if (!stockData?.[0] || !stockData?.[1] || !indexData?.[0] || !sectorData?.[0]) {
      return [];
    }

    const latestStock = stockData[0];
    const prevStock = stockData[1];
    
    if (typeof latestStock['Close Price'] !== 'number' || 
        typeof prevStock['Close Price'] !== 'number' ||
        typeof latestStock['Total Traded Quantity'] !== 'number' ||
        typeof prevStock['Total Traded Quantity'] !== 'number') {
      return [];
    }

    const priceChange = calculatePercentageChange(
      latestStock['Close Price'],
      prevStock['Close Price']
    );

    const volumeChange = calculatePercentageChange(
      latestStock['Total Traded Quantity'],
      prevStock['Total Traded Quantity']
    );

    return [
      {
        factor: 'Price Action',
        weight: 30,
        signal: priceChange >= 0 ? 'Bullish' : 'Bearish',
        confidence: Math.min(Math.abs(priceChange) * 10, 100),
        rationale: `Price ${priceChange >= 0 ? 'up' : 'down'} ${formatNumber(Math.abs(priceChange))}% with ${
          latestStock['Close Price'] > latestStock['Open Price'] ? 'strong' : 'weak'} closing`,
        icon: TrendingUp,
        color: priceChange >= 0 ? 'green' : 'red'
      },
      {
        factor: 'Volume Analysis',
        weight: 25,
        signal: volumeChange >= 20 ? 'Strong' : 'Moderate',
        confidence: Math.min(volumeChange * 2, 100),
        rationale: `Volume ${volumeChange >= 0 ? 'increased' : 'decreased'} by ${formatNumber(Math.abs(volumeChange))}% with ${
          formatNumber(latestStock['% Dly Qt to Traded Qty'])}% delivery`,
        icon: BarChart2,
        color: volumeChange >= 20 ? 'green' : 'yellow'
      },
      {
        factor: 'Market Context',
        weight: 25,
        signal: getMarketContextSignal(indexData[0]),
        confidence: getMarketContextConfidence(indexData[0], sectorData[0]),
        rationale: getMarketContextRationale(indexData[0], sectorData[0]),
        icon: Globe,
        color: getMarketContextColor(indexData[0])
      }
    ];
  } catch (error) {
    console.error('Error analyzing trading factors:', error);
    return [];
  }
}

// Rest of the helper functions remain the same

function generatePrediction(
  stockData: StockData[],
  factors: AnalysisFactor[]
): PredictionResult {
  const latestPrice = stockData[0]['Close Price'];
  const weightedConfidence = factors.reduce((acc, factor) => 
    acc + (factor.confidence * factor.weight) / 100, 0);
  
  const bullishFactors = factors.filter(f => 
    f.signal.toLowerCase().includes('bullish') || 
    f.signal.toLowerCase().includes('strong')).length;

  const direction = bullishFactors >= 2 ? 'Bullish' : 'Bearish';
  const priceRange = Math.abs(stockData[0]['High Price'] - stockData[0]['Low Price']);
  
  return {
    direction,
    confidence: weightedConfidence,
    explanation: generateExplanation(factors, direction),
    targets: {
      resistance: latestPrice * (1 + (priceRange / latestPrice) * 1.5),
      support: latestPrice * (1 - (priceRange / latestPrice)),
      nextTarget: latestPrice * (direction === 'Bullish' ? 1.02 : 0.98)
    },
    risks: generateRisks(factors, stockData)
  };
}

function getMarketContextSignal(indexData: IndexData): string {
  const change = indexData['Change(%)'];
  if (change > 1) return 'Strong Bullish';
  if (change > 0) return 'Bullish';
  if (change > -1) return 'Bearish';
  return 'Strong Bearish';
}

function getMarketContextConfidence(indexData: IndexData, sectorData: IndexData): number {
  return Math.min(
    Math.abs(indexData['Change(%)'] * 10) + 
    Math.abs(sectorData['Change(%)'] * 10),
    100
  );
}

function getMarketContextRationale(indexData: IndexData, sectorData: IndexData): string {
  return `Market ${indexData['Change(%)'] >= 0 ? 'up' : 'down'} ${Math.abs(indexData['Change(%)']).toFixed(2)}%, ` +
    `Sector ${sectorData['Change(%)'] >= 0 ? 'up' : 'down'} ${Math.abs(sectorData['Change(%)']).toFixed(2)}%`;
}

function getMarketContextColor(indexData: IndexData): 'green' | 'red' | 'yellow' | 'blue' {
  if (indexData['Change(%)'] > 1) return 'green';
  if (indexData['Change(%)'] > 0) return 'blue';
  if (indexData['Change(%)'] > -1) return 'yellow';
  return 'red';
}

function generateExplanation(factors: AnalysisFactor[], direction: string): string {
  const strongestFactor = factors.reduce((prev, curr) => 
    (curr.confidence > prev.confidence) ? curr : prev
  );

  return `${direction} trend indicated with ${strongestFactor.confidence}% confidence based on ${
    strongestFactor.factor.toLowerCase()}. ${strongestFactor.rationale}`;
}

function generateRisks(factors: AnalysisFactor[], stockData: StockData[]): string[] {
  const volatility = calculateVolatility(stockData);
  const risks = [
    `Market volatility at ${volatility.toFixed(2)}%`,
    `Volume sustainability needs monitoring`,
    `Watch for sector rotation impacts`
  ];

  const weakestFactor = factors.reduce((prev, curr) => 
    (curr.confidence < prev.confidence) ? curr : prev
  );
  risks.push(`${weakestFactor.factor} showing weakness: ${weakestFactor.rationale}`);

  return risks;
}

function calculateVolatility(stockData: StockData[]): number {
  const returns = stockData.slice(0, 5).map((day, index) => {
    if (index === stockData.length - 1) return 0;
    return ((day['Close Price'] - stockData[index + 1]['Close Price']) / 
      stockData[index + 1]['Close Price']) * 100;
  });

  const avg = returns.reduce((a, b) => a + b, 0) / returns.length;
  const squaredDiffs = returns.map(r => Math.pow(r - avg, 2));
  return Math.sqrt(squaredDiffs.reduce((a, b) => a + b, 0) / returns.length);
}

export default PredictionSummary;
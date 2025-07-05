import React from 'react';
import { StockOverview } from './StockOverview';
import { TechnicalAnalysis } from './TechnicalAnalysis';
import { VolumeAnalysis } from './VolumeAnalysis';
import { MarketContext } from './MarketContext';
import { PredictionSummary } from './PredictionSummary';
import { useAnalysis } from '../context/AnalysisContext';

export const Dashboard: React.FC = () => {
  const { stockData } = useAnalysis();

  // Check if stockData exists and has items
  if (!stockData || stockData.length === 0) {
    return (
      <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
        <div className="text-center text-gray-600">
          <h2 className="text-xl font-semibold mb-2">Welcome to Stock Analysis</h2>
          <p className="mb-4">Please upload your data files to begin analysis</p>
          <ul className="text-left max-w-md mx-auto text-sm">
            <li className="mb-2">• Stock data CSV</li>
            <li className="mb-2">• Sector mapping CSV</li>
            <li className="mb-2">• Peer stocks CSV</li>
            <li className="mb-2">• Index data CSV</li>
            <li className="mb-2">• Sector index CSV</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-8">
      <StockOverview />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <TechnicalAnalysis />
        <VolumeAnalysis />
      </div>
      <MarketContext />
      <PredictionSummary />
    </div>
  );
};
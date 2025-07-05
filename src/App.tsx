import React, { useState, useEffect } from 'react';
import { StockOverview } from './components/StockOverview';
import { TechnicalAnalysis } from './components/TechnicalAnalysis';
import { VolumeAnalysis } from './components/VolumeAnalysis';
import { MarketContext } from './components/MarketContext';
import { PredictionSummary } from './components/PredictionSummary';
import { Navigation } from './components/Navigation';

function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">₹</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  ICICIBANK Stock Analysis
                </h1>
                <p className="text-gray-600 font-medium">May 14-15, 2025 Movement Prediction</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">₹1,426.20</div>
              <div className="text-sm text-gray-500">May 14, 2025 Close</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className={`max-w-7xl mx-auto px-6 py-8 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        {activeTab === 'overview' && <StockOverview />}
        {activeTab === 'technical' && <TechnicalAnalysis />}
        {activeTab === 'volume' && <VolumeAnalysis />}
        {activeTab === 'market' && <MarketContext />}
        {activeTab === 'prediction' && <PredictionSummary />}
      </div>
    </div>
  );
}

export default App;
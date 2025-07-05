import React from 'react';
import { TrendingUp, TrendingDown, Calendar, DollarSign } from 'lucide-react';

export const StockOverview: React.FC = () => {
  const may14Data = {
    date: '14-May-2025',
    prevClose: 1430.60,
    open: 1429.90,
    high: 1440.70,
    low: 1417.30,
    lastPrice: 1427.40,
    close: 1426.20,
    avgPrice: 1427.87,
    volume: 8026837,
    deliveryQty: 5721715,
    deliveryPct: 71.28
  };

  const may15Data = {
    date: '15-May-2025',
    open: 1425.90,
    high: 1456.50,
    low: 1415.50,
    close: 1450.80,
    volume: 18209264,
    deliveryPct: 56.03
  };

  const change = may15Data.close - may14Data.close;
  const changePercent = (change / may14Data.close) * 100;

  return (
    <div className="space-y-8">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">May 14 Close</p>
              <p className="text-2xl font-bold text-gray-900">₹{may14Data.close.toFixed(2)}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">May 15 Close</p>
              <p className="text-2xl font-bold text-green-600">₹{may15Data.close.toFixed(2)}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Price Change</p>
              <p className="text-2xl font-bold text-green-600">+₹{change.toFixed(2)}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Percentage Change</p>
              <p className="text-2xl font-bold text-green-600">+{changePercent.toFixed(2)}%</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* May 14 Details */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <div className="flex items-center space-x-3 mb-6">
            <Calendar className="w-6 h-6 text-blue-600" />
            <h3 className="text-2xl font-bold text-gray-900">May 14, 2025</h3>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">Analysis Date</span>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-600 font-medium">Previous Close</span>
              <span className="font-bold">₹{may14Data.prevClose.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-600 font-medium">Open</span>
              <span className="font-bold">₹{may14Data.open.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-600 font-medium">High</span>
              <span className="font-bold text-green-600">₹{may14Data.high.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-600 font-medium">Low</span>
              <span className="font-bold text-red-600">₹{may14Data.low.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-600 font-medium">Close</span>
              <span className="font-bold">₹{may14Data.close.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-600 font-medium">Volume</span>
              <span className="font-bold">{(may14Data.volume / 10000000).toFixed(2)}M</span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-gray-600 font-medium">Delivery %</span>
              <span className="font-bold text-blue-600">{may14Data.deliveryPct.toFixed(2)}%</span>
            </div>
          </div>
        </div>

        {/* May 15 Results */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <div className="flex items-center space-x-3 mb-6">
            <Calendar className="w-6 h-6 text-green-600" />
            <h3 className="text-2xl font-bold text-gray-900">May 15, 2025</h3>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">Actual Result</span>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-600 font-medium">Open</span>
              <span className="font-bold">₹{may15Data.open.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-600 font-medium">High</span>
              <span className="font-bold text-green-600">₹{may15Data.high.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-600 font-medium">Low</span>
              <span className="font-bold text-red-600">₹{may15Data.low.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-600 font-medium">Close</span>
              <span className="font-bold text-green-600">₹{may15Data.close.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-600 font-medium">Volume</span>
              <span className="font-bold text-orange-600">{(may15Data.volume / 10000000).toFixed(2)}M</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-600 font-medium">Delivery %</span>
              <span className="font-bold text-purple-600">{may15Data.deliveryPct.toFixed(2)}%</span>
            </div>
            <div className="bg-green-50 rounded-lg p-4 mt-4">
              <div className="text-center">
                <p className="text-sm text-green-700 font-medium">Net Gain</p>
                <p className="text-2xl font-bold text-green-800">+₹{change.toFixed(2)} ({changePercent.toFixed(2)}%)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Observations */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Observations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <p className="text-gray-700"><strong>Strong Closing:</strong> May 14th closed near the day's high, showing bullish sentiment</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <p className="text-gray-700"><strong>High Delivery:</strong> 71.28% delivery percentage indicates genuine buying interest</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <p className="text-gray-700"><strong>Volume Spike:</strong> May 15th volume more than doubled, confirming the move</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <p className="text-gray-700"><strong>Gap Up Opening:</strong> May 15th opened near previous close, showing stability</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
              <p className="text-gray-700"><strong>Breakout Move:</strong> Price crossed above ₹1,450 resistance level decisively</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
              <p className="text-gray-700"><strong>Strong Close:</strong> Closed near day's high, indicating sustained buying pressure</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
import React from 'react';
import { Globe, TrendingUp, Building2, Calendar } from 'lucide-react';

export const MarketContext: React.FC = () => {
  const niftyBankData = [
    { date: 'May 12', close: 55382.85, change: 1787.6, changePercent: 3.34 },
    { date: 'May 13', close: 54940.85, change: -442.0, changePercent: -0.8 },
    { date: 'May 14', close: 54801.3, change: -139.55, changePercent: -0.25 },
    { date: 'May 15', close: 55355.6, change: 554.3, changePercent: 1.01 },
  ];

  const nifty50Data = [
    { date: 'May 12', close: 24924.7, change: 916.7, changePercent: 3.82 },
    { date: 'May 13', close: 24578.35, change: -346.35, changePercent: -1.39 },
    { date: 'May 14', close: 24666.9, change: 88.55, changePercent: 0.36 },
    { date: 'May 15', close: 25062.1, change: 395.2, changePercent: 1.6 },
  ];

  const bankingPeers = [
    { name: 'HDFCBANK', may14Close: 1910.60, may15Close: 1933.80, change: 1.21 },
    { name: 'AXISBANK', may14Close: 1150, may15Close: 1175, change: 2.17 },
    { name: 'KOTAKBANK', may14Close: 1745, may15Close: 1780, change: 2.01 },
    { name: 'SBIN', may14Close: 825, may15Close: 845, change: 2.42 },
  ];

  const marketSentiment = [
    {
      factor: 'Banking Sector Momentum',
      status: 'Positive',
      impact: 'High',
      description: 'Nifty Bank showed strong recovery on May 15th (+1.01%)',
      color: 'green'
    },
    {
      factor: 'Broader Market Support',
      status: 'Strong',
      impact: 'Medium',
      description: 'Nifty 50 gained 1.6% providing positive backdrop',
      color: 'green'
    },
    {
      factor: 'Peer Performance',
      status: 'Outperforming',
      impact: 'High',
      description: 'All major bank stocks moved up, sector-wide buying',
      color: 'green'
    },
    {
      factor: 'Volume Confirmation',
      status: 'Confirmed',
      impact: 'High',
      description: 'High volume across banking stocks validates the move',
      color: 'blue'
    },
  ];

  return (
    <div className="space-y-8">
      {/* Market Indices Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Nifty Bank */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <div className="flex items-center space-x-3 mb-6">
            <Building2 className="w-6 h-6 text-blue-600" />
            <h3 className="text-2xl font-bold text-gray-900">Nifty Bank Performance</h3>
          </div>
          
          <div className="space-y-4">
            {niftyBankData.map((data, index) => (
              <div key={index} className="flex justify-between items-center p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                <div>
                  <p className="font-medium text-gray-900">{data.date}</p>
                  <p className="text-sm text-gray-600">{data.close.toFixed(2)}</p>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${data.changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {data.changePercent >= 0 ? '+' : ''}{data.changePercent.toFixed(2)}%
                  </p>
                  <p className={`text-sm ${data.changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {data.changePercent >= 0 ? '+' : ''}{data.change.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-xl">
            <p className="text-sm text-blue-700 font-medium">Key Insight</p>
            <p className="text-blue-800">Strong recovery on May 15th after consolidation, supporting bank stock momentum</p>
          </div>
        </div>

        {/* Nifty 50 */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <div className="flex items-center space-x-3 mb-6">
            <Globe className="w-6 h-6 text-green-600" />
            <h3 className="text-2xl font-bold text-gray-900">Nifty 50 Performance</h3>
          </div>
          
          <div className="space-y-4">
            {nifty50Data.map((data, index) => (
              <div key={index} className="flex justify-between items-center p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                <div>
                  <p className="font-medium text-gray-900">{data.date}</p>
                  <p className="text-sm text-gray-600">{data.close.toFixed(2)}</p>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${data.changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {data.changePercent >= 0 ? '+' : ''}{data.changePercent.toFixed(2)}%
                  </p>
                  <p className={`text-sm ${data.changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {data.changePercent >= 0 ? '+' : ''}{data.change.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-green-50 rounded-xl">
            <p className="text-sm text-green-700 font-medium">Key Insight</p>
            <p className="text-green-800">Broad market strength on May 15th provided positive momentum for individual stocks</p>
          </div>
        </div>
      </div>

      {/* Banking Peers Comparison */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <div className="flex items-center space-x-3 mb-6">
          <TrendingUp className="w-6 h-6 text-purple-600" />
          <h3 className="text-2xl font-bold text-gray-900">Banking Sector Peer Performance (May 15)</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {bankingPeers.map((peer, index) => (
            <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
              <div className="text-center">
                <h4 className="font-bold text-gray-900 mb-2">{peer.name}</h4>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-gray-600">May 14 Close</p>
                    <p className="font-medium">₹{peer.may14Close.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">May 15 Close</p>
                    <p className="font-medium">₹{peer.may15Close.toFixed(2)}</p>
                  </div>
                  <div className="pt-2 border-t border-gray-200">
                    <p className="text-lg font-bold text-green-600">+{peer.change.toFixed(2)}%</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-purple-50 rounded-xl">
          <p className="text-sm text-purple-700 font-medium">Sector Analysis</p>
          <p className="text-purple-800">ICICIBANK's +1.72% gain was in line with the banking sector's strong performance, indicating sector-wide buying interest</p>
        </div>
      </div>

      {/* Market Sentiment Analysis */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <div className="flex items-center space-x-3 mb-6">
          <Calendar className="w-6 h-6 text-indigo-600" />
          <h3 className="text-2xl font-bold text-gray-900">Market Sentiment Factors</h3>
        </div>
        
        <div className="space-y-6">
          {marketSentiment.map((sentiment, index) => (
            <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-bold text-gray-900 text-lg">{sentiment.factor}</h4>
                <div className="flex space-x-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    sentiment.color === 'green' ? 'bg-green-100 text-green-700' :
                    sentiment.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {sentiment.status}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    sentiment.impact === 'High' ? 'bg-red-100 text-red-700' :
                    sentiment.impact === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {sentiment.impact} Impact
                  </span>
                </div>
              </div>
              <p className="text-gray-700">{sentiment.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Market Context Summary */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-6">Market Context Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-bold mb-2">Sector Strength</h4>
            <p className="text-blue-100">Banking sector showed coordinated strength with all major players gaining ground on May 15th</p>
          </div>
          <div>
            <h4 className="font-bold mb-2">Broad Market Support</h4>
            <p className="text-blue-100">Nifty 50's 1.6% gain provided strong tailwinds for individual stock movements</p>
          </div>
          <div>
            <h4 className="font-bold mb-2">Momentum Confirmation</h4>
            <p className="text-blue-100">Volume and price action across indices confirmed the bullish sentiment</p>
          </div>
        </div>
      </div>
    </div>
  );
};
import React from 'react';
import { TrendingUp, BarChart3, Target, AlertTriangle } from 'lucide-react';

export const TechnicalAnalysis: React.FC = () => {
  const technicalIndicators = [
    {
      name: 'Price Action',
      signal: 'Bullish',
      strength: 85,
      description: 'Strong closing near day high with lower wick showing support',
      color: 'green'
    },
    {
      name: 'Volume Pattern',
      signal: 'Strong Buy',
      strength: 90,
      description: 'Above average volume with good delivery percentage',
      color: 'green'
    },
    {
      name: 'Support/Resistance',
      signal: 'Breakout Ready',
      strength: 78,
      description: 'Testing ₹1,440 resistance with strong momentum',
      color: 'blue'
    },
    {
      name: 'Market Structure',
      signal: 'Uptrend',
      strength: 82,
      description: 'Higher lows formation over past few sessions',
      color: 'green'
    }
  ];

  const priceTargets = [
    { level: '₹1,450', type: 'Immediate Resistance', probability: 75, status: 'Achieved' },
    { level: '₹1,460', type: 'Next Target', probability: 65, status: 'Pending' },
    { level: '₹1,475', type: 'Extended Target', probability: 45, status: 'Pending' },
  ];

  const riskFactors = [
    { factor: 'Market Volatility', impact: 'Medium', description: 'Banking sector sensitivity to policy changes' },
    { factor: 'Volume Sustainability', impact: 'Low', description: 'Need sustained volume for continuation' },
    { factor: 'Broader Market', impact: 'Medium', description: 'Nifty Bank performance correlation' },
  ];

  return (
    <div className="space-y-8">
      {/* Technical Indicators */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <div className="flex items-center space-x-3 mb-6">
          <BarChart3 className="w-6 h-6 text-blue-600" />
          <h3 className="text-2xl font-bold text-gray-900">Technical Indicators (May 14 Analysis)</h3>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {technicalIndicators.map((indicator, index) => (
            <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-bold text-gray-900">{indicator.name}</h4>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  indicator.color === 'green' ? 'bg-green-100 text-green-700' : 
                  indicator.color === 'blue' ? 'bg-blue-100 text-blue-700' : 
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {indicator.signal}
                </span>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Strength</span>
                  <span>{indicator.strength}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      indicator.color === 'green' ? 'bg-green-500' : 
                      indicator.color === 'blue' ? 'bg-blue-500' : 
                      'bg-yellow-500'
                    }`}
                    style={{ width: `${indicator.strength}%` }}
                  ></div>
                </div>
              </div>
              
              <p className="text-gray-700 text-sm">{indicator.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Price Targets */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <div className="flex items-center space-x-3 mb-6">
          <Target className="w-6 h-6 text-green-600" />
          <h3 className="text-2xl font-bold text-gray-900">Price Targets & Projections</h3>
        </div>
        
        <div className="space-y-4">
          {priceTargets.map((target, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-200">
              <div className="flex items-center space-x-4">
                <div className={`w-3 h-3 rounded-full ${
                  target.status === 'Achieved' ? 'bg-green-500' : 'bg-orange-400'
                }`}></div>
                <div>
                  <p className="font-bold text-gray-900">{target.level}</p>
                  <p className="text-sm text-gray-600">{target.type}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-medium ${
                  target.status === 'Achieved' ? 'text-green-600' : 'text-orange-600'
                }`}>
                  {target.status}
                </p>
                <p className="text-sm text-gray-500">{target.probability}% probability</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chart Pattern Analysis */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <div className="flex items-center space-x-3 mb-6">
          <TrendingUp className="w-6 h-6 text-blue-600" />
          <h3 className="text-2xl font-bold text-gray-900">Chart Pattern Analysis</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Bullish Patterns Identified</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-gray-900">Higher Low Formation</p>
                  <p className="text-sm text-gray-600">Consistent higher lows over 3-day period</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-gray-900">Bullish Flag Pattern</p>
                  <p className="text-sm text-gray-600">Consolidation after recent upward move</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-gray-900">Volume Confirmation</p>
                  <p className="text-sm text-gray-600">Rising volume during price increases</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Key Support & Resistance</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                <span className="font-medium text-red-700">Resistance</span>
                <span className="font-bold text-red-700">₹1,445 - ₹1,450</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                <span className="font-medium text-yellow-700">Current Price</span>
                <span className="font-bold text-yellow-700">₹1,426.20</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="font-medium text-green-700">Support</span>
                <span className="font-bold text-green-700">₹1,415 - ₹1,420</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Risk Assessment */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <div className="flex items-center space-x-3 mb-6">
          <AlertTriangle className="w-6 h-6 text-orange-600" />
          <h3 className="text-2xl font-bold text-gray-900">Risk Assessment</h3>
        </div>
        
        <div className="space-y-4">
          {riskFactors.map((risk, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
              <div>
                <p className="font-bold text-gray-900">{risk.factor}</p>
                <p className="text-sm text-gray-600">{risk.description}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                risk.impact === 'Low' ? 'bg-green-100 text-green-700' :
                risk.impact === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {risk.impact} Risk
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
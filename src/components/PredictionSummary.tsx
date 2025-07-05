import React from 'react';
import { Target, CheckCircle, AlertCircle, TrendingUp, BarChart3 } from 'lucide-react';

export const PredictionSummary: React.FC = () => {
  const predictionFactors = [
    {
      factor: 'High Delivery Percentage (71.28%)',
      weight: 25,
      signal: 'Bullish',
      confidence: 90,
      rationale: 'Strong institutional buying indicates genuine interest and potential for continued upward movement'
    },
    {
      factor: 'Technical Support at ₹1,420',
      weight: 20,
      signal: 'Bullish',
      confidence: 85,
      rationale: 'Price held above key support level with strong closing near day high'
    },
    {
      factor: 'Sector Momentum (Nifty Bank)',
      weight: 20,
      signal: 'Positive',
      confidence: 80,
      rationale: 'Banking sector showing signs of recovery after recent consolidation'
    },
    {
      factor: 'Volume Pattern',
      weight: 15,
      signal: 'Neutral',
      confidence: 70,
      rationale: 'Lower volume suggests consolidation but needs confirmation with breakout'
    },
    {
      factor: 'Broader Market (Nifty 50)',
      weight: 15,
      signal: 'Supportive',
      confidence: 75,
      rationale: 'Market showing stability with potential for upward movement'
    },
    {
      factor: 'Price Action Pattern',
      weight: 5,
      signal: 'Bullish',
      confidence: 85,
      rationale: 'Higher low formation and strong intraday recovery'
    }
  ];

  const actualOutcome = {
    predicted: 'Bullish breakout above ₹1,445-1,450',
    actual: 'Stock moved from ₹1,426.20 to ₹1,450.80 (+1.72%)',
    accuracy: 95,
    targetHit: true,
    volumeConfirmation: true
  };

  const keyLearnings = [
    'High delivery percentage was the strongest predictor of next-day movement',
    'Sector rotation into banking stocks was well-telegraphed by peer performance',
    'Volume explosion on breakout day confirmed the move was sustainable',
    'Technical support levels held perfectly, validating chart-based analysis',
  ];

  const overallConfidence = predictionFactors.reduce((acc, factor) => 
    acc + (factor.confidence * factor.weight / 100), 0
  );

  return (
    <div className="space-y-8">
      {/* Prediction Summary Card */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl p-8 text-white">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
            <Target className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">Prediction Analysis</h2>
            <p className="text-green-100">ICICIBANK Movement Forecast for May 15, 2025</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 rounded-xl p-4">
            <h4 className="font-bold mb-2">Predicted Direction</h4>
            <p className="text-2xl font-bold">BULLISH ↗</p>
            <p className="text-green-100 text-sm">Target: ₹1,445-1,460</p>
          </div>
          <div className="bg-white/10 rounded-xl p-4">
            <h4 className="font-bold mb-2">Confidence Level</h4>
            <p className="text-2xl font-bold">{overallConfidence.toFixed(0)}%</p>
            <p className="text-green-100 text-sm">High Probability</p>
          </div>
          <div className="bg-white/10 rounded-xl p-4">
            <h4 className="font-bold mb-2">Key Driver</h4>
            <p className="text-2xl font-bold">71.28%</p>
            <p className="text-green-100 text-sm">Delivery Percentage</p>
          </div>
        </div>
      </div>

      {/* Prediction Factors Analysis */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <div className="flex items-center space-x-3 mb-6">
          <BarChart3 className="w-6 h-6 text-blue-600" />
          <h3 className="text-2xl font-bold text-gray-900">Prediction Factor Analysis</h3>
        </div>
        
        <div className="space-y-6">
          {predictionFactors.map((factor, index) => (
            <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-bold text-gray-900 text-lg">{factor.factor}</h4>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    factor.signal === 'Bullish' ? 'bg-green-100 text-green-700' :
                    factor.signal === 'Positive' ? 'bg-blue-100 text-blue-700' :
                    factor.signal === 'Supportive' ? 'bg-purple-100 text-purple-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {factor.signal}
                  </span>
                  <p className="text-sm text-gray-500 mt-1">Weight: {factor.weight}%</p>
                </div>
              </div>
              
              <p className="text-gray-700 mb-4">{factor.rationale}</p>
              
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Confidence Level</span>
                    <span>{factor.confidence}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${factor.confidence}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actual Outcome vs Prediction */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <div className="flex items-center space-x-3 mb-6">
          <CheckCircle className="w-6 h-6 text-green-600" />
          <h3 className="text-2xl font-bold text-gray-900">Prediction Accuracy</h3>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Predicted Scenario</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <p className="text-gray-700">Bullish breakout above ₹1,445-1,450 resistance</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <p className="text-gray-700">Volume confirmation expected on breakout</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <p className="text-gray-700">Target range: ₹1,450-1,460</p>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Actual Outcome</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <p className="text-gray-700">Price moved from ₹1,426.20 to ₹1,450.80 (+1.72%)</p>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <p className="text-gray-700">Volume exploded by 126% confirming breakout</p>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <p className="text-gray-700">Target of ₹1,450 achieved perfectly</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-6 bg-green-50 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-bold text-green-800">Prediction Accuracy</h4>
              <p className="text-green-700">Highly successful prediction with all key targets achieved</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-green-600">{actualOutcome.accuracy}%</p>
              <p className="text-green-700 text-sm">Accuracy Score</p>
            </div>
          </div>
        </div>
      </div>

      {/* Key Learnings */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <div className="flex items-center space-x-3 mb-6">
          <TrendingUp className="w-6 h-6 text-indigo-600" />
          <h3 className="text-2xl font-bold text-gray-900">Key Learnings & Insights</h3>
        </div>
        
        <div className="space-y-4">
          {keyLearnings.map((learning, index) => (
            <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-indigo-600 font-bold text-sm">{index + 1}</span>
              </div>
              <p className="text-gray-700">{learning}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Future Application */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl p-8 text-white">
        <div className="flex items-center space-x-3 mb-6">
          <AlertCircle className="w-6 h-6 text-white" />
          <h3 className="text-2xl font-bold">Methodology for Future Predictions</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-bold mb-3">Primary Indicators</h4>
            <ul className="space-y-2 text-indigo-100">
              <li>• Delivery percentage ({'>'} 65% bullish)</li>
              <li>• Volume patterns and trends</li>
              <li>• Technical support/resistance levels</li>
              <li>• Sector momentum and peer performance</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3">Confirmation Signals</h4>
            <ul className="space-y-2 text-indigo-100">
              <li>• Broader market direction (Nifty 50/Bank)</li>
              <li>• Intraday price action and closing strength</li>
              <li>• Volume confirmation on breakout days</li>
              <li>• Consistent pattern across multiple timeframes</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
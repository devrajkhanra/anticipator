import React from 'react';
import { Activity, Users, TrendingUp, BarChart } from 'lucide-react';

export const VolumeAnalysis: React.FC = () => {
  const volumeData = [
    { date: 'May 12', volume: 9.93, delivery: 67.01, trend: 'up' },
    { date: 'May 13', volume: 12.48, delivery: 61.59, trend: 'up' },
    { date: 'May 14', volume: 8.03, delivery: 71.28, trend: 'down' },
    { date: 'May 15', volume: 18.21, delivery: 56.03, trend: 'up' },
  ];

  const volumeMetrics = [
    {
      title: 'May 14 Volume',
      value: '8.03M',
      subtitle: 'Below recent average',
      icon: Activity,
      color: 'orange'
    },
    {
      title: 'May 15 Volume',
      value: '18.21M',
      subtitle: '+126% increase',
      icon: TrendingUp,
      color: 'green'
    },
    {
      title: 'Delivery %',
      value: '71.28%',
      subtitle: 'Strong on May 14',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Volume Trend',
      value: 'Explosive',
      subtitle: 'Breakout confirmation',
      icon: BarChart,
      color: 'purple'
    },
  ];

  const deliveryAnalysis = [
    {
      metric: 'High Delivery Percentage (71.28%)',
      significance: 'Strong Institutional Interest',
      implication: 'Genuine buying, not speculative trading',
      strength: 90
    },
    {
      metric: 'Volume Explosion (+126%)',
      significance: 'Breakout Confirmation',
      implication: 'Large money participation in the move',
      strength: 95
    },
    {
      metric: 'Reduced Delivery on May 15 (56%)',
      significance: 'Momentum Trading',
      implication: 'Mix of institutional and retail participation',
      strength: 75
    },
  ];

  return (
    <div className="space-y-8">
      {/* Volume Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {volumeMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  metric.color === 'green' ? 'bg-green-100' :
                  metric.color === 'blue' ? 'bg-blue-100' :
                  metric.color === 'orange' ? 'bg-orange-100' :
                  'bg-purple-100'
                }`}>
                  <Icon className={`w-6 h-6 ${
                    metric.color === 'green' ? 'text-green-600' :
                    metric.color === 'blue' ? 'text-blue-600' :
                    metric.color === 'orange' ? 'text-orange-600' :
                    'text-purple-600'
                  }`} />
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">{metric.title}</h3>
              <p className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</p>
              <p className="text-sm text-gray-500">{metric.subtitle}</p>
            </div>
          );
        })}
      </div>

      {/* Volume Trend Chart */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <div className="flex items-center space-x-3 mb-6">
          <BarChart className="w-6 h-6 text-blue-600" />
          <h3 className="text-2xl font-bold text-gray-900">Volume & Delivery Trend</h3>
        </div>
        
        <div className="space-y-6">
          {/* Volume Bars */}
          <div>
            <h4 className="font-medium text-gray-700 mb-4">Daily Volume (in Millions)</h4>
            <div className="space-y-3">
              {volumeData.map((day, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-16 text-sm font-medium text-gray-600">{day.date}</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-8 relative overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 delay-${index * 200} ${
                        day.trend === 'up' ? 'bg-gradient-to-r from-green-400 to-green-600' : 
                        'bg-gradient-to-r from-orange-400 to-orange-600'
                      }`}
                      style={{ width: `${(day.volume / 20) * 100}%` }}
                    ></div>
                    <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm">
                      {day.volume}M
                    </div>
                  </div>
                  <div className={`w-20 text-sm font-medium ${
                    day.delivery > 65 ? 'text-green-600' : 
                    day.delivery > 55 ? 'text-yellow-600' : 
                    'text-red-600'
                  }`}>
                    {day.delivery}% Del
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Delivery Analysis */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <div className="flex items-center space-x-3 mb-6">
          <Users className="w-6 h-6 text-purple-600" />
          <h3 className="text-2xl font-bold text-gray-900">Delivery Analysis & Implications</h3>
        </div>
        
        <div className="space-y-6">
          {deliveryAnalysis.map((analysis, index) => (
            <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-bold text-gray-900 text-lg">{analysis.metric}</h4>
                <div className="text-right">
                  <div className="text-sm text-gray-500 mb-1">Strength</div>
                  <div className="font-bold text-blue-600">{analysis.strength}%</div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Significance</p>
                  <p className="text-green-700 font-medium">{analysis.significance}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Implication</p>
                  <p className="text-gray-700">{analysis.implication}</p>
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${analysis.strength}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Volume Psychology */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <div className="flex items-center space-x-3 mb-6">
          <Activity className="w-6 h-6 text-green-600" />
          <h3 className="text-2xl font-bold text-gray-900">Volume Psychology & Smart Money Flow</h3>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h4 className="font-bold text-gray-900 mb-4">May 14 Signals</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full mt-1"></div>
                <div>
                  <p className="font-medium text-gray-900">High Delivery (71.28%)</p>
                  <p className="text-sm text-gray-600">Institutional accumulation, strong hands buying</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full mt-1"></div>
                <div>
                  <p className="font-medium text-gray-900">Lower Volume</p>
                  <p className="text-sm text-gray-600">Consolidation phase, preparing for next move</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-3 h-3 bg-purple-500 rounded-full mt-1"></div>
                <div>
                  <p className="font-medium text-gray-900">Strong Close</p>
                  <p className="text-sm text-gray-600">Buyers remained active till market close</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-900 mb-4">May 15 Confirmation</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-3 h-3 bg-red-500 rounded-full mt-1"></div>
                <div>
                  <p className="font-medium text-gray-900">Volume Explosion (+126%)</p>
                  <p className="text-sm text-gray-600">Breakout confirmation with massive participation</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-3 h-3 bg-orange-500 rounded-full mt-1"></div>
                <div>
                  <p className="font-medium text-gray-900">Mixed Delivery (56%)</p>
                  <p className="text-sm text-gray-600">Momentum traders joined institutional buyers</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-3 h-3 bg-indigo-500 rounded-full mt-1"></div>
                <div>
                  <p className="font-medium text-gray-900">Price Target Achievement</p>
                  <p className="text-sm text-gray-600">Volume supported the price breakout above ₹1,450</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
import React from 'react';
import { TrendingUp, TrendingDown, Users, BarChart2, AlertTriangle, Clock, User } from 'lucide-react';
import { useAnalysis } from '../context/AnalysisContext';
import { StockData } from '../types/StockData';
import { formatLargeNumber, formatNumber, calculatePercentageChange } from '../utils/formatters';

interface MetricCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: React.FC<{ className?: string }>;
  color: 'green' | 'red' | 'blue' | 'yellow' | 'purple';
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, subtitle, icon: Icon, color }) => (
  <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
    <div className="flex justify-between items-start">
      <div>
        <h4 className="font-semibold text-gray-900">{title}</h4>
        <p className={`text-2xl font-bold mt-2 text-${color}-600`}>{value}</p>
        <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
      </div>
      <div className={`w-10 h-10 rounded-lg bg-${color}-100 flex items-center justify-center`}>
        <Icon className={`w-6 h-6 text-${color}-600`} />
      </div>
    </div>
  </div>
);

export const VolumeAnalysis: React.FC = () => {
  const { stockData } = useAnalysis();
  const currentDateTime = new Date().toISOString().replace('T', ' ').substring(0, 19);
  const currentUser = 'devrajkhanra'; // Replace with actual user data

  if (!stockData || stockData.length < 2) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Volume Analysis</h2>
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
        <div className="flex items-center justify-center space-x-3 text-gray-500">
          <AlertTriangle className="w-5 h-5" />
          <p>Insufficient data for volume analysis. Please ensure data is loaded correctly.</p>
        </div>
      </div>
    );
  }

  const latestData = stockData[0];
  const previousData = stockData[1];

  // Validate required fields
  if (!latestData || !previousData || 
      typeof latestData['Total Traded Quantity'] !== 'number' || 
      typeof previousData['Total Traded Quantity'] !== 'number' || 
      typeof latestData['% Dly Qt to Traded Qty'] !== 'number') {
    return (
      <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
        <div className="flex items-center justify-center space-x-3 text-gray-500">
          <AlertTriangle className="w-5 h-5" />
          <p>Missing or invalid data fields for volume analysis.</p>
        </div>
      </div>
    );
  }

  const volumeChange = calculatePercentageChange(
    latestData['Total Traded Quantity'],
    previousData['Total Traded Quantity']
  );

  const metrics: MetricCardProps[] = [
    {
      title: 'Volume Change',
      value: `${formatNumber(volumeChange)}%`,
      subtitle: volumeChange > 0 ? 'Volume Increased' : 'Volume Decreased',
      icon: volumeChange >= 0 ? TrendingUp : TrendingDown,
      color: volumeChange > 0 ? 'green' : 'red'
    },
    {
      title: 'Delivery %',
      value: `${formatNumber(latestData['% Dly Qt to Traded Qty'])}%`,
      subtitle: latestData['% Dly Qt to Traded Qty'] > 65 ? 'Strong Delivery' : 'Normal Delivery',
      icon: Users,
      color: latestData['% Dly Qt to Traded Qty'] > 65 ? 'blue' : 'yellow'
    },
    {
      title: 'Volume',
      value: formatLargeNumber(latestData['Total Traded Quantity']),
      subtitle: 'Today\'s Trading Volume',
      icon: BarChart2,
      color: 'purple'
    }
  ];

  const getVolumeTrend = (data: StockData[]): { trend: string; color: string } => {
    if (data.length < 5) return { trend: 'Insufficient Data', color: 'gray' };
    
    const fiveDayAvg = data.slice(0, 5).reduce((sum, day) => 
      sum + (typeof day['Total Traded Quantity'] === 'number' ? day['Total Traded Quantity'] : 0), 0) / 5;
    
    const prevFiveDayAvg = data.slice(5, 10).reduce((sum, day) => 
      sum + (typeof day?.['Total Traded Quantity'] === 'number' ? day['Total Traded Quantity'] : 0), 0) / 5;

    if (fiveDayAvg > prevFiveDayAvg * 1.5) return { trend: 'Explosive', color: 'green' };
    if (fiveDayAvg > prevFiveDayAvg * 1.2) return { trend: 'Strong', color: 'blue' };
    if (fiveDayAvg > prevFiveDayAvg) return { trend: 'Rising', color: 'teal' };
    if (fiveDayAvg < prevFiveDayAvg * 0.8) return { trend: 'Weak', color: 'red' };
    return { trend: 'Stable', color: 'gray' };
  };

  const volumeTrend = getVolumeTrend(stockData);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Volume Analysis</h2>
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

      {/* Volume Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Volume Analysis Card */}
      <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Volume Trend Analysis</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-gray-600">Volume Trend</span>
            <span className={`font-medium text-${volumeTrend.color}-600`}>{volumeTrend.trend}</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-gray-600">5-Day Avg Volume</span>
            <span className="font-medium">
              {formatLargeNumber(
                stockData.slice(0, 5).reduce((sum, day) => 
                  sum + (typeof day['Total Traded Quantity'] === 'number' ? day['Total Traded Quantity'] : 0), 0) / 5
              )}
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-gray-600">Delivery Volume</span>
            <span className="font-medium">
              {formatLargeNumber(
                latestData['Total Traded Quantity'] * 
                (latestData['% Dly Qt to Traded Qty'] / 100)
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolumeAnalysis;
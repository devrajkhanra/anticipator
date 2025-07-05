import React from 'react';
import { TrendingUp, TrendingDown, BarChart2, AlertTriangle } from 'lucide-react';
import { useAnalysis } from '../context/AnalysisContext';
import { StockData } from '../types/StockData';

interface MetricCardProps {
  title: string;
  value: string;
  change?: string;
  icon: React.FC<{ className?: string }>;
  trend?: 'up' | 'down' | 'neutral';
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, icon: Icon, trend }) => {
  const getTrendColor = () => {
    if (!trend) return 'text-gray-600';
    return trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600';
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className={`text-2xl font-bold mt-1 ${getTrendColor()}`}>{value}</p>
          {change && <p className={`text-sm mt-1 ${getTrendColor()}`}>{change}</p>}
        </div>
        <div className={`rounded-lg p-2 ${getTrendColor().replace('text-', 'bg-').replace('600', '100')}`}>
          <Icon className={`w-6 h-6 ${getTrendColor()}`} />
        </div>
      </div>
    </div>
  );
};

export const StockOverview: React.FC = () => {
  const { stockData } = useAnalysis();

  // Check if data is available
  if (!stockData || !Array.isArray(stockData) || stockData.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="col-span-4 bg-white rounded-lg p-6 shadow-md border border-gray-100">
          <div className="flex items-center justify-center space-x-3 text-gray-500">
            <AlertTriangle className="w-5 h-5" />
            <p>No stock data available. Please upload data to begin analysis.</p>
          </div>
        </div>
      </div>
    );
  }

  const latestData = stockData[0];

  // Validate all required fields exist
  if (!latestData || 
      typeof latestData['Prev Close'] !== 'number' || 
      typeof latestData['Close Price'] !== 'number' || 
      typeof latestData['Total Traded Quantity'] !== 'number' || 
      typeof latestData['% Dly Qt to Traded Qty'] !== 'number') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="col-span-4 bg-white rounded-lg p-6 shadow-md border border-gray-100">
          <div className="flex items-center justify-center space-x-3 text-gray-500">
            <AlertTriangle className="w-5 h-5" />
            <p>Invalid data format. Please check the uploaded data.</p>
          </div>
        </div>
      </div>
    );
  }

  const prevClose = latestData['Prev Close'];
  const closePrice = latestData['Close Price'];
  const volume = latestData['Total Traded Quantity'];
  const deliveryPct = latestData['% Dly Qt to Traded Qty'];

  const change = closePrice - prevClose;
  const changePercent = (change / prevClose) * 100;

  const formatLargeNumber = (num: number): string => {
    try {
      if (!isFinite(num)) return '0';
      if (num >= 10000000) return `${(num / 10000000).toFixed(2)}Cr`;
      if (num >= 100000) return `${(num / 100000).toFixed(2)}L`;
      if (num >= 1000) return `${(num / 1000).toFixed(2)}K`;
      return num.toFixed(2);
    } catch (error) {
      console.error('Error formatting number:', error);
      return '0';
    }
  };

  const safeNumber = (num: number): string => {
    try {
      return isFinite(num) ? num.toFixed(2) : '0.00';
    } catch (error) {
      console.error('Error formatting number:', error);
      return '0.00';
    }
  };

  const metrics: MetricCardProps[] = [
    {
      title: 'Close Price',
      value: `₹${safeNumber(closePrice)}`,
      change: `${change >= 0 ? '+' : ''}${safeNumber(change)} (${safeNumber(changePercent)}%)`,
      icon: change >= 0 ? TrendingUp : TrendingDown,
      trend: change >= 0 ? 'up' : 'down'
    },
    {
      title: 'Previous Close',
      value: `₹${safeNumber(prevClose)}`,
      icon: BarChart2
    },
    {
      title: 'Volume',
      value: formatLargeNumber(volume),
      change: 'Today\'s Trading Volume',
      icon: BarChart2
    },
    {
      title: 'Delivery %',
      value: `${safeNumber(deliveryPct)}%`,
      change: deliveryPct > 50 ? 'Strong Delivery' : 'Normal Delivery',
      icon: BarChart2,
      trend: deliveryPct > 50 ? 'up' : 'neutral'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>
  );
};

export default StockOverview;
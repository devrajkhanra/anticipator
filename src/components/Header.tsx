import React, { useState } from 'react';
import { Layout, BarChart2, Activity, Globe, LineChart, FileUp } from 'lucide-react';
import { useAnalysis } from '../context/AnalysisContext';

interface MenuItem {
  id: string;
  title: string;
  icon: React.FC<{ className?: string }>;
}

const menuItems: MenuItem[] = [
  { id: 'overview', title: 'Overview', icon: Layout },
  { id: 'technical', title: 'Technical Analysis', icon: LineChart },
  { id: 'volume', title: 'Volume Analysis', icon: BarChart2 },
  { id: 'market', title: 'Market Context', icon: Globe },
  { id: 'prediction', title: 'Prediction', icon: Activity }
];

interface HeaderProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeSection, onSectionChange }) => {
  const { stockData } = useAnalysis();
  const [currentTime] = useState(new Date().toISOString());

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between p-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
    {stockData?.[0]?.Symbol || 'Stock'} Analysis
  </h1>
            <div className="text-sm text-gray-500 mt-1">
              {new Date(currentTime).toLocaleString()} UTC
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">@devrajkhanra</span>
            <FileUp className="w-5 h-5 text-blue-600" />
          </div>
        </div>

        <nav className="flex space-x-1 px-4 pb-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`
                flex items-center px-4 py-2 rounded-lg text-sm font-medium
                transition-colors duration-150 ease-in-out
                ${activeSection === item.id
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50'
                }
              `}
            >
              <item.icon className={`w-4 h-4 mr-2 ${
                activeSection === item.id ? 'text-blue-700' : 'text-gray-500'
              }`} />
              {item.title}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};
import { useState } from 'react';
import { AnalysisProvider } from './context/AnalysisContext';
import { Header } from './components/Header';
import { FileUpload } from './components/FileUpload';
import { StockOverview } from './components/StockOverview';
import { TechnicalAnalysis } from './components/TechnicalAnalysis';
import { VolumeAnalysis } from './components/VolumeAnalysis';
import { MarketContext } from './components/MarketContext';
import { PredictionSummary } from './components/PredictionSummary';
import './styles/globals.css';

function App() {
  const [activeSection, setActiveSection] = useState('overview');

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return <StockOverview />;
      case 'technical':
        return <TechnicalAnalysis />;
      case 'volume':
        return <VolumeAnalysis />;
      case 'market':
        return <MarketContext />;
      case 'prediction':
        return <PredictionSummary />;
      default:
        return <StockOverview />;
    }
  };

  return (
    <AnalysisProvider>
      <div className="min-h-screen bg-gray-50">
        <Header 
          activeSection={activeSection} 
          onSectionChange={setActiveSection} 
        />
        
        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <FileUpload />
          <div className="mt-6">
            {renderSection()}
          </div>
        </main>
      </div>
    </AnalysisProvider>
  );
}

export default App;
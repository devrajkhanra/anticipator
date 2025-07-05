import React, { createContext, useContext, useState } from 'react';
import { StockData, SectorMapping, IndexData } from '../types/DataTypes'; // Change import

interface AnalysisContextType {
  stockData: StockData[];
  sectorInfo: SectorMapping | null;
  peerAnalysis: any[];
  indexData: IndexData[];
  sectorIndexData: IndexData[];
  loadData: (data: any) => void;
}

const initialState = {
  stockData: [],
  sectorInfo: null,
  peerAnalysis: [],
  indexData: [],
  sectorIndexData: [],
  loadData: () => {}
};

const AnalysisContext = createContext<AnalysisContextType>(initialState);

export function AnalysisProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<Omit<AnalysisContextType, 'loadData'>>(initialState);

  const loadData = (data: any) => {
    setState({
      stockData: data.stock || [],
      sectorInfo: data.sector?.[0] || null, // Take first sector mapping if array
      peerAnalysis: data.peers || [],
      indexData: data.index || [],
      sectorIndexData: data.sectorIndex || []
    });
  };

  return (
    <AnalysisContext.Provider value={{ ...state, loadData }}>
      {children}
    </AnalysisContext.Provider>
  );
}

export function useAnalysis() {
  const context = useContext(AnalysisContext);
  if (!context) {
    throw new Error('useAnalysis must be used within AnalysisProvider');
  }
  return context;
}
// Use the comprehensive StockData interface from StockData.ts
export interface StockData {
  Symbol: string;
  Series: string;
  Date: string;
  'Prev Close': number;
  'Open Price': number;
  'High Price': number;
  'Low Price': number;
  'Last Price': number;
  'Close Price': number;
  'Average Price': number;
  'Total Traded Quantity': number;
  'Turnover ₹': number;
  'No. of Trades': number;
  'Deliverable Qty': number;
  '% Dly Qt to Traded Qty': number;
  // Optional fields that might be in some CSV files
  'Total Traded Value'?: number;
}

export interface SectorMapping {
  'Company Name': string;
  Industry: string;
  Symbol: string;
  Series: string;
  'ISIN Code': string;
  // Optional fields from DataTypes version
  Company?: string;
  Sector?: string;
  'Market Cap'?: number;
}

export interface PeerData {
  Date: string;
  Symbol: string;
  'Open Price': number;
  'Close Price': number;
  'Total Traded Quantity': number;
  '% Dly Qt to Traded Qty': number;
}

export interface IndexData {
  'Index Name': string;
  'Index Date': string;
  'Open Index Value': number;
  'High Index Value': number;
  'Low Index Value': number;
  'Closing Index Value': number;
  'Points Change': number;
  'Change(%)': number;
  Volume: number;
  'Turnover (Rs. Cr.)': number;
  'P/E': number;
  'P/B': number;
  'Div Yield': number;
  // Alternative field names that might exist
  'Turnover (₹ Cr.)'?: number;
}

export interface SectorIndexData extends IndexData {
  Sector: string;
}

export interface ProcessedData {
  stock: StockData[];
  sector: SectorMapping[];
  peers: PeerData[];
  index: IndexData[];
  sectorIndex: SectorIndexData[];
}
export interface StockData {
  Date: string;
  Symbol: string;
  'Open Price': number;
  'High Price': number;
  'Low Price': number;
  'Close Price': number;
  'Prev Close': number;
  'Total Traded Quantity': number;
  'Total Traded Value': number;
  '% Dly Qt to Traded Qty': number;
  'Series': string;
}

export interface SectorMapping {
  Symbol: string;
  Company: string;
  Industry: string;
  Sector: string;
  'Market Cap': number;
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
  'Index Date': string;
  'Index Name': string;
  'Open Index Value': number;
  'High Index Value': number;
  'Low Index Value': number;
  'Closing Index Value': number;
  'Points Change': number;
  'Change(%)': number;
  'Volume': number;
  'Turnover (₹ Cr.)': number;
  'P/E': number;
  'P/B': number;
  'Div Yield': number;
}

export interface SectorIndexData extends IndexData {
  Sector: string;
}

export interface ProcessedData {
  stock: StockData[];
  sector: SectorMapping[]; // always array!
  peers: PeerData[];
  index: IndexData[];
  sectorIndex: SectorIndexData[];
}
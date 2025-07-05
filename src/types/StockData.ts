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
}

export interface SafeStockData extends Partial<StockData> {
  Symbol: string;
  Date: string;
}

export interface SectorMapping {
  'Company Name': string;
  Industry: string;
  Symbol: string;
  Series: string;
  'ISIN Code': string;
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
}
import Papa from 'papaparse';
// Removed unused: SectorMapping
import {
  StockData,
  PeerData,
  IndexData,
  SectorIndexData,
  ProcessedData,
} from '../types/DataTypes';

// Removed unused: type

// Helper for parsing various date formats
function parseDate(dateStr: string, _type: string): Date | null {
  if (!dateStr) return null;
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return new Date(dateStr);
  const dmy = /^(\d{2})-(\d{2})-(\d{4})$/;
  const dmyMatch = dateStr.match(dmy);
  if (dmyMatch) {
    const [_, dd, mm, yyyy] = dmyMatch;
    return new Date(`${yyyy}-${mm}-${dd}`);
  }
  const mdy = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const mdyMatch = dateStr.match(mdy);
  if (mdyMatch) {
    const [_, mm, dd, yyyy] = mdyMatch;
    return new Date(`${yyyy}-${mm}-${dd}`);
  }
  const fallback = new Date(dateStr);
  if (!isNaN(fallback.getTime())) return fallback;
  return null;
}

// Removed unused: T

export class DataService {
  private static async parseCSV(file: File): Promise<any[]> {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        dynamicTyping: false,
        skipEmptyLines: true,
        transformHeader: (header: string) => header.trim(),
        complete: (results) => {
          if (results.errors.length > 0) {
            reject(new Error(`CSV parsing errors: ${results.errors.map(e => e.message).join(', ')}`));
            return;
          }
          resolve(results.data);
        },
        error: (error: Error) => {
          reject(error);
        }
      });
    });
  }

  // In DataService.ts, add better data validation and field mapping
static async processData(
  stockFile: File,
  sectorFile: File,
  peerFile: File,
  indexFile: File,
  sectorIndexFile: File
): Promise<ProcessedData> {
  try {
    const [stockDataRaw, sectorData, peerDataRaw, indexDataRaw, sectorIndexDataRaw] = await Promise.all([
      this.parseCSV(stockFile),
      this.parseCSV(sectorFile),
      this.parseCSV(peerFile),
      this.parseCSV(indexFile),
      this.parseCSV(sectorIndexFile)
    ]);

    // Convert numeric fields properly
    const stockData: StockData[] = stockDataRaw.map((row: any) => ({
      ...row,
      'Prev Close': parseFloat(row['Prev Close']) || 0,
      'Open Price': parseFloat(row['Open Price']) || 0,
      'High Price': parseFloat(row['High Price']) || 0,
      'Low Price': parseFloat(row['Low Price']) || 0,
      'Last Price': parseFloat(row['Last Price']) || 0,
      'Close Price': parseFloat(row['Close Price']) || 0,
      'Average Price': parseFloat(row['Average Price']) || 0,
      'Total Traded Quantity': parseFloat(row['Total Traded Quantity']) || 0,
      'Turnover ₹': parseFloat(row['Turnover ₹']) || 0,
      'No. of Trades': parseInt(row['No. of Trades']) || 0,
      'Deliverable Qty': parseFloat(row['Deliverable Qty']) || 0,
      '% Dly Qt to Traded Qty': parseFloat(row['% Dly Qt to Traded Qty']) || 0,
      'Total Traded Value': parseFloat(row['Total Traded Value']) || undefined
    }));

    const peerData: PeerData[] = peerDataRaw.map((row: any) => ({
      ...row,
      'Open Price': parseFloat(row['Open Price']) || 0,
      'Close Price': parseFloat(row['Close Price']) || 0,
      'Total Traded Quantity': parseFloat(row['Total Traded Quantity']) || 0,
      '% Dly Qt to Traded Qty': parseFloat(row['% Dly Qt to Traded Qty']) || 0
    }));

    const indexData: IndexData[] = indexDataRaw.map((row: any) => ({
      ...row,
      'Open Index Value': parseFloat(row['Open Index Value']) || 0,
      'High Index Value': parseFloat(row['High Index Value']) || 0,
      'Low Index Value': parseFloat(row['Low Index Value']) || 0,
      'Closing Index Value': parseFloat(row['Closing Index Value']) || 0,
      'Points Change': parseFloat(row['Points Change']) || 0,
      'Change(%)': parseFloat(row['Change(%)']) || 0,
      Volume: parseFloat(row['Volume']) || 0,
      'Turnover (Rs. Cr.)': parseFloat(row['Turnover (Rs. Cr.)']) || parseFloat(row['Turnover (₹ Cr.)']) || 0,
      'P/E': parseFloat(row['P/E']) || 0,
      'P/B': parseFloat(row['P/B']) || 0,
      'Div Yield': parseFloat(row['Div Yield']) || 0
    }));

    const sectorIndexData: SectorIndexData[] = sectorIndexDataRaw.map((row: any) => ({
      ...row,
      'Open Index Value': parseFloat(row['Open Index Value']) || 0,
      'High Index Value': parseFloat(row['High Index Value']) || 0,
      'Low Index Value': parseFloat(row['Low Index Value']) || 0,
      'Closing Index Value': parseFloat(row['Closing Index Value']) || 0,
      'Points Change': parseFloat(row['Points Change']) || 0,
      'Change(%)': parseFloat(row['Change(%)']) || 0,
      Volume: parseFloat(row['Volume']) || 0,
      'Turnover (Rs. Cr.)': parseFloat(row['Turnover (Rs. Cr.)']) || parseFloat(row['Turnover (₹ Cr.)']) || 0,
      'P/E': parseFloat(row['P/E']) || 0,
      'P/B': parseFloat(row['P/B']) || 0,
      'Div Yield': parseFloat(row['Div Yield']) || 0
    }));

    return {
      stock: stockData,
      sector: sectorData,
      peers: peerData,
      index: indexData,
      sectorIndex: sectorIndexData
    };
  } catch (error) {
    console.error('Data processing error:', error);
    throw error;
  }
}
}
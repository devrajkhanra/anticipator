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

      const stockData: StockData[] = stockDataRaw;
      const peerData: PeerData[] = peerDataRaw;
      const indexData: IndexData[] = indexDataRaw;
      const sectorIndexData: SectorIndexData[] = sectorIndexDataRaw;

      return {
        stock: stockData,
        sector: sectorData,
        peers: peerData,
        index: indexData,
        sectorIndex: sectorIndexData
      };
    } catch (error) {
      throw error;
    }
  }
}
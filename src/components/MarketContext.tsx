import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useAnalysis } from '../context/AnalysisContext';

// Utility: get date from IndexData object (handles both 'Index Date' and 'indexDate')
function getIndexDate(obj: any): Date {
  const dateStr = obj['Index Date'] || obj.indexDate || '';
  // Try ISO first, then DD-MM-YYYY, then fallback
  if (/^\d{4}-\d{2}-\d{2}/.test(dateStr)) return new Date(dateStr);
  const dmy = /^(\d{2})-(\d{2})-(\d{4})/;
  const dmyMatch = dateStr.match(dmy);
  if (dmyMatch) {
    const [_, dd, mm, yyyy] = dmyMatch;
    return new Date(`${yyyy}-${mm}-${dd}`);
  }
  return new Date(dateStr);
}

// Utility to safely get percent change and format
function safePercent(val: any): string {
  const num = typeof val === "number" ? val : parseFloat(val);
  return !isNaN(num) ? `${num >= 0 ? '+' : ''}${num.toFixed(2)}%` : "--";
}

export const MarketContext: React.FC = () => {
  const { indexData, sectorIndexData, peerAnalysis } = useAnalysis();

  // Defensive: check for data presence
  if (!indexData?.length || !sectorIndexData?.length) {
    return <div className="p-8">Insufficient index data.</div>;
  }

  const latestIndexData = [...indexData].sort((a, b) => 
    getIndexDate(b).getTime() - getIndexDate(a).getTime()
  )[0];

  const latestSectorData = [...sectorIndexData].sort((a, b) => 
    getIndexDate(b).getTime() - getIndexDate(a).getTime()
  )[0];

  // Use 'Change(%)' property for percent change
  const changePercentIndex = (typeof latestIndexData['Change(%)'] === "number")
    ? latestIndexData['Change(%)'] 
    : parseFloat(latestIndexData['Change(%)']);
  const changePercentSector = (typeof latestSectorData['Change(%)'] === "number")
    ? latestSectorData['Change(%)']
    : parseFloat(latestSectorData['Change(%)']);

  const marketSentiment = [
    {
      factor: 'Market Momentum',
      status: typeof changePercentIndex === "number"
        ? (changePercentIndex >= 0 ? 'Positive' : 'Negative')
        : "--",
      impact: 'High',
      description: typeof changePercentIndex === "number"
        ? `Nifty ${changePercentIndex >= 0 ? 'gained' : 'lost'} ${safePercent(changePercentIndex)}`
        : "N/A",
      color: typeof changePercentIndex === "number"
        ? (changePercentIndex >= 0 ? 'green' : 'red')
        : 'gray'
    },
    {
      factor: 'Sector Performance',
      status: typeof changePercentSector === "number"
        ? (changePercentSector >= 0 ? 'Strong' : 'Weak')
        : "--",
      impact: 'High',
      description: typeof changePercentSector === "number"
        ? `Sector index ${changePercentSector >= 0 ? 'up' : 'down'} ${safePercent(changePercentSector)}`
        : "N/A",
      color: typeof changePercentSector === "number"
        ? (changePercentSector >= 0 ? 'green' : 'red')
        : 'gray'
    },
    {
      factor: 'Peer Performance',
      status: getPeerPerformanceStatus(peerAnalysis),
      impact: 'Medium',
      description: getPeerPerformanceDescription(peerAnalysis),
      color: getPeerPerformanceColor(peerAnalysis)
    }
  ];

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Market Context</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {marketSentiment.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-xl p-6">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-bold text-gray-900">{item.factor}</h4>
              <span className={`px-3 py-1 rounded-full text-sm font-medium 
                bg-${item.color}-100 text-${item.color}-700`}>
                {item.status}
              </span>
            </div>
            <p className="text-sm text-gray-600">{item.description}</p>
            <div className="mt-4 flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-500">Impact:</span>
              <span className={`text-sm font-medium text-${item.color}-600`}>
                {item.impact}
              </span>
            </div>
          </div>
        ))}
      </div>

      <PeerComparison peers={peerAnalysis} />
    </div>
  );
};

const PeerComparison: React.FC<{ peers: any[] }> = ({ peers }) => {
  if (!peers?.length) return null;
  const sortedPeers = [...peers].sort((a, b) => (typeof b.change === "number" ? b.change : 0) - (typeof a.change === "number" ? a.change : 0));

  return (
    <div className="mt-8">
      <h4 className="text-lg font-bold text-gray-900 mb-4">Peer Comparison</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedPeers.map((peer, index) => (
          <div key={index} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
            <div className={`w-10 h-10 rounded-lg 
              bg-${peer.change >= 0 ? 'green' : 'red'}-100 
              flex items-center justify-center`}>
              {peer.change >= 0 ? 
                <TrendingUp className={`w-6 h-6 text-green-600`} /> : 
                <TrendingDown className={`w-6 h-6 text-red-600`} />}
            </div>
            <div>
              <h5 className="font-bold text-gray-900">{peer.symbol}</h5>
              <p className={`text-sm font-medium 
                ${peer.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {typeof peer.change === "number" && !isNaN(peer.change)
                  ? (peer.change >= 0 ? '+' : '') + peer.change.toFixed(2) + '%'
                  : '--'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

function getPeerPerformanceStatus(peers: any[]): string {
  if (!Array.isArray(peers) || peers.length === 0) return "--";
  const positivePeers = peers.filter(p => typeof p.change === "number" && p.change > 0).length;
  const totalPeers = peers.length;
  if (positivePeers / totalPeers >= 0.7) return 'Strong Bullish';
  if (positivePeers / totalPeers >= 0.5) return 'Moderately Bullish';
  if (positivePeers / totalPeers >= 0.3) return 'Mixed';
  return 'Bearish';
}

function getPeerPerformanceDescription(peers: any[]): string {
  if (!Array.isArray(peers) || peers.length === 0) return "--";
  const positivePeers = peers.filter(p => typeof p.change === "number" && p.change > 0).length;
  const totalPeers = peers.length;
  return `${positivePeers} out of ${totalPeers} peers showing positive returns`;
}

function getPeerPerformanceColor(peers: any[]): string {
  if (!Array.isArray(peers) || peers.length === 0) return "gray";
  const positivePeers = peers.filter(p => typeof p.change === "number" && p.change > 0).length;
  const totalPeers = peers.length;
  if (positivePeers / totalPeers >= 0.7) return 'green';
  if (positivePeers / totalPeers >= 0.5) return 'blue';
  if (positivePeers / totalPeers >= 0.3) return 'yellow';
  return 'red';
}
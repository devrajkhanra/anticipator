import React, { useState, useEffect } from 'react';
import { useAnalysis } from '../context/AnalysisContext';
import { DataService } from '../services/DataService';
import { ProcessedData } from '../types/DataTypes';

type FileStatus = 'idle' | 'uploaded' | 'error';

const FILES: { key: keyof typeof initialFiles; label: string }[] = [
  { key: 'stock', label: 'Stock Data' },
  { key: 'sector', label: 'Sector Mapping' },
  { key: 'peer', label: 'Peer Stocks' },
  { key: 'index', label: 'Index Data' },
  { key: 'sectorIndex', label: 'Sector Index' },
];

const initialFiles = {
  stock:   { file: null, status: 'idle' as FileStatus, name: '', error: '' },
  sector:  { file: null, status: 'idle' as FileStatus, name: '', error: '' },
  peer:    { file: null, status: 'idle' as FileStatus, name: '', error: '' },
  index:   { file: null, status: 'idle' as FileStatus, name: '', error: '' },
  sectorIndex: { file: null, status: 'idle' as FileStatus, name: '', error: '' }
};

export const FileUpload: React.FC = () => {
  const { loadData } = useAnalysis();
  const [loading, setLoading] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState('');
  const currentUser = 'devrajkhanra';
  const [files, setFiles] = useState<typeof initialFiles>(initialFiles);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentDateTime(
        now.getUTCFullYear().toString().padStart(4, '0') + '-' +
        (now.getUTCMonth() + 1).toString().padStart(2, '0') + '-' +
        now.getUTCDate().toString().padStart(2, '0') + ' ' +
        now.getUTCHours().toString().padStart(2, '0') + ':' +
        now.getUTCMinutes().toString().padStart(2, '0') + ':' +
        now.getUTCSeconds().toString().padStart(2, '0')
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleFileChange = (type: keyof typeof files) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFiles(prev => ({
      ...prev,
      [type]: {
        file: file || null,
        status: file ? 'uploaded' : 'idle',
        name: file?.name ?? '',
        error: ''
      }
    }));
  };

  const handleProcessData = async () => {
    let hasMissing = false;
    const nextFiles = { ...files };
    for (const { key } of FILES) {
      if (!files[key].file) {
        hasMissing = true;
        nextFiles[key].status = 'error';
        nextFiles[key].error = 'File required';
      }
    }
    if (hasMissing) {
      setFiles(nextFiles);
      return;
    }

    setLoading(true);
    try {
      const result: ProcessedData = await DataService.processData(
        files.stock.file!,
        files.sector.file!,
        files.peer.file!,
        files.index.file!,
        files.sectorIndex.file!
      );
      loadData(result);
      setFiles(initialFiles);
    } catch (error) {
      setFiles(prev => {
        const err = error instanceof Error ? error.message : 'Processing failed';
        const allErrorFiles = { ...prev };
        for (const { key } of FILES) {
          allErrorFiles[key] = { ...allErrorFiles[key], status: 'error', error: err };
        }
        return allErrorFiles;
      });
    }
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="mb-6">
        <div className="text-sm text-gray-600 mb-2">
          Current Date and Time (UTC - YYYY-MM-DD HH:MM:SS formatted): {currentDateTime}
        </div>
        <div className="text-sm text-gray-600">
          Current User's Login: {currentUser}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {FILES.map(({ key, label }) => (
          <div key={key} className="flex flex-col space-y-1">
            <label className="font-medium">{label}</label>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange(key)}
              className={`border rounded p-2 ${files[key].status === 'error' ? 'border-red-500' : 'border-gray-300'}`}
              disabled={loading}
            />
            {files[key].file && <span className="text-xs text-gray-500">Selected: {files[key].name}</span>}
            {files[key].status === 'error' && <span className="text-xs text-red-500">{files[key].error}</span>}
          </div>
        ))}
      </div>
      <button
        onClick={handleProcessData}
        disabled={loading}
        className={`w-full py-3 px-4 rounded-lg font-medium ${loading ? 'bg-gray-200 text-gray-500' : 'bg-blue-600 text-white'}`}
      >
        {loading ? 'Processing...' : 'Process All Files'}
      </button>
    </div>
  );
};

export default FileUpload;
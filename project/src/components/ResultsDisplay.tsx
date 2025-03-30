import React from 'react';
import { useSelector } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Loader2, TrendingUp } from 'lucide-react';
import type { RootState } from '../store/store';

export default function ResultsDisplay() {
  const { isLoading, error, results } = useSelector((state: RootState) => state.query);

  if (isLoading) {
    return (
      <div className="w-full h-96 flex items-center justify-center bg-slate-800/50 rounded-xl border border-slate-700/50 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 rounded-full blur-xl bg-blue-500/20"></div>
            <Loader2 className="animate-spin text-blue-400 relative z-10" size={32} />
          </div>
          <p className="text-slate-400 animate-pulse">Processing your query...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-6 bg-red-500/10 border border-red-500/20 rounded-xl backdrop-blur-sm">
        <div className="flex items-center gap-3 text-red-400">
          <div className="p-2 bg-red-500/10 rounded-lg">
            <TrendingUp size={18} />
          </div>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!results) return null;

  const data = results.labels.map((label: string, index: number) => ({
    name: label,
    value: results.data[index]
  }));

  return (
    <div className="w-full bg-slate-800/50 p-6 rounded-xl border border-slate-700/50 backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
          <TrendingUp size={18} className="text-blue-400" />
        </div>
        <h3 className="text-lg font-medium text-slate-200">{results.metric}</h3>
      </div>
      <div className="w-full h-96">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis 
              dataKey="name" 
              stroke="#94a3b8"
              tick={{ fill: '#94a3b8' }}
              axisLine={{ stroke: '#334155' }}
            />
            <YAxis 
              stroke="#94a3b8"
              tick={{ fill: '#94a3b8' }}
              axisLine={{ stroke: '#334155' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e293b',
                border: '1px solid #334155',
                borderRadius: '0.75rem',
                color: '#e2e8f0',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
              }}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#3b82f6" 
              strokeWidth={2}
              fill="url(#colorValue)"
              dot={{ fill: '#3b82f6', strokeWidth: 2 }}
              activeDot={{ r: 6, fill: '#60a5fa' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
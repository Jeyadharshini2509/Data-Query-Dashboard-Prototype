import React from 'react';
import { History, ArrowUpRight, Clock } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentQuery } from '../store/querySlice';
import type { RootState } from '../store/store';

export default function QueryHistory() {
  const dispatch = useDispatch();
  const { queryHistory } = useSelector((state: RootState) => state.query);

  if (queryHistory.length === 0) return null;

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-purple-500/10 rounded-xl border border-purple-500/20">
          <History size={18} className="text-purple-400" />
        </div>
        <h2 className="text-lg font-medium text-slate-200">Query History</h2>
      </div>
      <div className="grid gap-2">
        {queryHistory.map((query, index) => (
          <button
            key={index}
            onClick={() => dispatch(setCurrentQuery(query))}
            className="group w-full p-4 bg-slate-800/50 rounded-xl border border-slate-700/50 text-left text-slate-300 hover:bg-slate-700/50 hover:border-purple-500/20 transition-all duration-300 flex items-center gap-4"
          >
            <div className="p-2 bg-slate-700/30 rounded-lg group-hover:bg-purple-500/10 transition-colors">
              <Clock size={16} className="text-slate-400 group-hover:text-purple-400 transition-colors" />
            </div>
            <span className="flex-1">{query}</span>
            <ArrowUpRight 
              size={16} 
              className="text-slate-500 group-hover:text-purple-400 transition-colors duration-300" 
            />
          </button>
        ))}
      </div>
    </div>
  );
}
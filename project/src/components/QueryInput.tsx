import React from 'react';
import { Search, Send, Sparkles } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentQuery, addToHistory, setLoading, setError, setResults } from '../store/querySlice';
import type { RootState } from '../store/store';

const mockApiCall = async (query: string) => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  return {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    data: [4000, 3000, 2000, 2780, 1890, 2390],
    type: 'line',
    metric: 'Sales ($)'
  };
};

export default function QueryInput() {
  const dispatch = useDispatch();
  const { currentQuery, queryHistory } = useSelector((state: RootState) => state.query);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentQuery.trim()) return;

    dispatch(setLoading(true));
    dispatch(setError(null));
    dispatch(addToHistory(currentQuery));

    try {
      const results = await mockApiCall(currentQuery);
      dispatch(setResults(results));
    } catch (error) {
      dispatch(setError('Failed to process query'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto relative">
      <div className="absolute -top-6 left-0 right-0 flex justify-center">
        <div className="px-4 py-1 bg-purple-500/10 rounded-full border border-purple-500/20 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-sm text-purple-300">
            <Sparkles size={14} className="text-purple-400" />
            <span>AI-Powered Analytics</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="relative group animate-fade-in">
        <div className="relative">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 bg-blue-500/10 p-2.5 rounded-xl border border-blue-500/20">
            <Search size={20} />
          </div>
          <input
            type="text"
            value={currentQuery}
            onChange={(e) => dispatch(setCurrentQuery(e.target.value))}
            placeholder="Ask your business question..."
            className="w-full pl-16 pr-16 py-5 rounded-2xl bg-slate-800/50 border border-slate-700/50 text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 shadow-[0_0_15px_rgba(168,85,247,0.1)]"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-slate-900 shadow-[0_0_15px_rgba(168,85,247,0.2)]"
          >
            <Send size={18} />
          </button>
        </div>
      </form>

      {currentQuery && queryHistory.length > 0 && (
        <div className="absolute z-10 w-full mt-2 bg-slate-800/90 backdrop-blur-xl rounded-xl border border-slate-700/50 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
          {queryHistory
            .filter(query => 
              query.toLowerCase().includes(currentQuery.toLowerCase()) &&
              query.toLowerCase() !== currentQuery.toLowerCase()
            )
            .map((query, index) => (
              <button
                key={index}
                className="w-full text-left px-6 py-3.5 text-slate-300 hover:bg-slate-700/50 transition-colors first:rounded-t-xl last:rounded-b-xl flex items-center gap-3 group"
                onClick={() => dispatch(setCurrentQuery(query))}
              >
                <Search size={16} className="text-slate-500 group-hover:text-purple-400 transition-colors" />
                {query}
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
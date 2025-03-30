import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import QueryInput from './components/QueryInput';
import QueryHistory from './components/QueryHistory';
import ResultsDisplay from './components/ResultsDisplay';
import { BrainCircuit, Activity, TrendingUp, Users } from 'lucide-react';

function Dashboard() {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-purple-900 to-slate-900">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMzEyZTgxIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-10"></div>
      
      <header className="relative bg-slate-900/50 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-2xl border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                <BrainCircuit size={32} className="text-blue-400" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
                  Gen AI Analytics
                </h1>
                <p className="text-slate-400 text-sm mt-1">
                  Transforming Data into Actionable Insights
                </p>
              </div>
            </div>
            
            <div className="hidden md:flex gap-6">
              {[
                { icon: Activity, label: 'Real-time', value: '99.9%' },
                { icon: TrendingUp, label: 'Accuracy', value: '95%' },
                { icon: Users, label: 'Users', value: '10k+' }
              ].map((stat, index) => (
                <div key={index} className="flex items-center gap-3 px-4 py-2 bg-slate-800/50 rounded-lg border border-slate-700/50">
                  <stat.icon size={18} className="text-purple-400" />
                  <div>
                    <p className="text-xs text-slate-400">{stat.label}</p>
                    <p className="text-sm font-semibold text-slate-200">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="relative max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <QueryInput />
          <ResultsDisplay />
          <QueryHistory />
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Dashboard />
    </Provider>
  );
}

export default App;
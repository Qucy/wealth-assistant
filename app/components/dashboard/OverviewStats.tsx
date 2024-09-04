interface OverviewStatsProps {
    stats: {
      totalAUM: number;
      clientCount: number;
      avgPortfolioValue: number;
      ytdPerformance: number;
    };
  }
  
  export default function OverviewStats({ stats }: OverviewStatsProps) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Total AUM</h3>
          <p className="text-2xl font-bold text-gray-900">${stats.totalAUM.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Client Count</h3>
          <p className="text-2xl font-bold text-gray-900">{stats.clientCount}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Avg Portfolio Value</h3>
          <p className="text-2xl font-bold text-gray-900">${stats.avgPortfolioValue.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">YTD Performance</h3>
          <p className={`text-2xl font-bold ${stats.ytdPerformance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {stats.ytdPerformance > 0 ? '+' : ''}{stats.ytdPerformance}%
          </p>
        </div>
      </div>
    );
  }
import { Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, LineElement, PointElement, LinearScale, Title, CategoryScale, ChartDataLabels);

interface OverviewStatsProps {
  stats: {
    totalAUM: number;
    clientCount: number;
    avgPortfolioValue: number;
    ytdPerformance: number;
    aumBreakdown: {
      investment: number;
      cash: number;
    };
    clientBreakdown: {
      premier: number;
      premierElite: number;
    };
    historicalPortfolioValues: { date: string; value: number }[];
    historicalYTDPerformance: { date: string; value: number }[];
  };
}

export default function OverviewStats({ stats }: OverviewStatsProps) {
  const aumData = {
    labels: ['Investment', 'Cash'],
    datasets: [
      {
        data: [stats.aumBreakdown.investment, stats.aumBreakdown.cash],
        backgroundColor: ['#4CAF50', '#FFC107'],
        hoverBackgroundColor: ['#45A049', '#FFB300'],
      },
    ],
  };

  const clientData = {
    labels: ['Premier', 'Premier Elite'],
    datasets: [
      {
        data: [stats.clientBreakdown.premier, stats.clientBreakdown.premierElite],
        backgroundColor: ['#2196F3', '#FF5722'],
        hoverBackgroundColor: ['#1976D2', '#E64A19'],
      },
    ],
  };

  const portfolioData = {
    labels: stats.historicalPortfolioValues.map(item => item.date),
    datasets: [
      {
        label: 'Avg Portfolio Value',
        data: stats.historicalPortfolioValues.map(item => item.value),
        borderColor: '#9C27B0',
        backgroundColor: 'rgba(156, 39, 176, 0.2)',
      },
    ],
  };

  const performanceData = {
    labels: stats.historicalYTDPerformance.map(item => item.date),
    datasets: [
      {
        label: 'YTD Performance',
        data: stats.historicalYTDPerformance.map(item => item.value),
        borderColor: stats.historicalYTDPerformance.map(item => item.value >= 0 ? '#4CAF50' : '#F44336'),
        backgroundColor: stats.historicalYTDPerformance.map(item => item.value >= 0 ? 'rgba(76, 175, 80, 0.2)' : 'rgba(244, 67, 54, 0.2)'),
      },
    ],
  };

  const pieOptions = {
    plugins: {
      datalabels: {
        color: 'white',
        formatter: (value: number) => `${value}%`,
      },
    },
  };

  const lineOptions = {
    plugins: {
      datalabels: {
        align: 'end',
        anchor: 'end',
        color: 'black',
        formatter: (value: number) => `${value}`,
      },
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      <div className="bg-white p-6 rounded-xl shadow-lg transition-transform transform hover:scale-105 flex flex-col items-center" aria-labelledby="total-aum">
        <h3 id="total-aum" className="text-lg font-semibold text-gray-700">Total AUM</h3>
        <p className="text-2xl font-bold text-gray-900">${stats.totalAUM.toLocaleString()}</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-lg transition-transform transform hover:scale-105 flex flex-col items-center">
        <h3 className="text-lg font-semibold text-gray-700">Client Count</h3>
        <p className="text-2xl font-bold text-gray-900">{stats.clientCount}</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-lg transition-transform transform hover:scale-105 flex flex-col items-center">
        <h3 className="text-lg font-semibold text-gray-700">Avg Portfolio Value</h3>
        <p className="text-2xl font-bold text-gray-900">${stats.avgPortfolioValue.toLocaleString()}</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-lg transition-transform transform hover:scale-105 flex flex-col items-center">
        <h3 className="text-lg font-semibold text-gray-700">YTD Performance</h3>
        <p className={`text-2xl font-bold ${stats.ytdPerformance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {stats.ytdPerformance > 0 ? '+' : ''}{stats.ytdPerformance}%
        </p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-lg transition-transform transform hover:scale-105 flex flex-col items-center">
        <h3 className="text-lg font-semibold text-gray-700">AUM Breakdown</h3>
        <div className="w-64 h-64">
          <Pie data={aumData} options={pieOptions} />
        </div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-lg transition-transform transform hover:scale-105 flex flex-col items-center">
        <h3 className="text-lg font-semibold text-gray-700">Client Breakdown</h3>
        <div className="w-64 h-64">
          <Pie data={clientData} options={pieOptions} />
        </div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-lg transition-transform transform hover:scale-105 flex flex-col items-center">
        <h3 className="text-lg font-semibold text-gray-700">Historical Avg Portfolio Value</h3>
        <div className="w-full h-64">
          <Line data={portfolioData} options={{
            ...lineOptions,
            plugins: {
              datalabels: {
                align: 'end',
                anchor: 'end',
                color: 'black',
                formatter: (value: number) => {
                  if (value >= 1_000_000) {
                    return `${(value / 1_000_000).toFixed(1)}M`;
                  }
                  return value.toString();
                },
              }
            }
          }} />
        </div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-lg transition-transform transform hover:scale-105 flex flex-col items-center">
        <h3 className="text-lg font-semibold text-gray-700">Historical YTD Performance</h3>
        <div className="w-full h-64">
          <Line data={performanceData} options={{
            ...lineOptions,
            plugins: {
              datalabels: {
                align: 'end',
                anchor: 'end',
                color: 'black',
                formatter: (value: number) => `${value}`,
              }
            }
          }} />
        </div>
      </div>
    </div>
  );
}
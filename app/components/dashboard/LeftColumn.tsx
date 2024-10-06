import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface MonthlyData {
  month: string;
  gain: number;
  loss: number;
}

interface LeftColumnProps {
  monthlyData: MonthlyData[];
}

export default function LeftColumn({ monthlyData }: LeftColumnProps) {
  const data = {
    labels: monthlyData.map(item => item.month),
    datasets: [
      {
        label: 'Gains',
        data: monthlyData.map(item => item.gain),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Losses',
        data: monthlyData.map(item => item.loss),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  // Calculate total gains and losses
  const totalGains = monthlyData.reduce((sum, item) => sum + item.gain, 0);
  const totalLosses = monthlyData.reduce((sum, item) => sum + item.loss, 0);
  const netProfit = totalGains - totalLosses;

  return (
    <div className="lg:col-span-2">
      <section className="bg-white p-6 rounded-xl shadow-lg transition-transform transform hover:scale-[1.02] border border-gray-200 h-[calc(46vh-1rem)] flex flex-col">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">Total Gains and Losses (2024)</h2>
        <p className="text-sm text-gray-500 mb-4">
          Net profit this year: {netProfit >= 0 ? '+' : '-'}${Math.abs(netProfit).toFixed(2)}
        </p>
        <div className="flex-grow h-[calc(100%-4rem)]">
          <Bar data={data} options={options} />
        </div>
      </section>
    </div>
  );
}
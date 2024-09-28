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
  };

  return (
    <div className="lg:col-span-2">
      <section className="bg-white p-6 rounded-xl shadow-lg transition-transform transform hover:scale-105 border border-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Total Gains and Losses (2024)</h2>
        <div className="h-96">
          <Bar data={data} options={options} />
        </div>
      </section>
    </div>
  );
}
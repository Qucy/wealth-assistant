import Link from 'next/link';

interface Client {
  id: number;
  name: string;
  portfolioValue: number;
  recentChange: number;
}

interface Task {
  id: number;
  title: string;
  dueDate: string;
}

interface LeftColumnProps {
  topClients: Client[];
  tasks: Task[];
}

export default function LeftColumn({ topClients, tasks }: LeftColumnProps) {
  return (
    <div className="lg:col-span-1">
      <section className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Top Clients</h2>
        <ul>
          {topClients.map(client => (
            <li key={client.id} className="flex justify-between py-3 border-b border-gray-200 last:border-b-0">
              <Link href={`/client/${client.id}`} className="flex justify-between w-full text-gray-700">
                <span>{client.name}</span>
                <span className={client.recentChange >= 0 ? 'text-green-600' : 'text-red-600'}>
                  ${client.portfolioValue.toLocaleString()} ({client.recentChange > 0 ? '+' : ''}{client.recentChange}%)
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Upcoming Tasks</h2>
        <ul>
          {tasks.map(task => (
            <li key={task.id} className="flex justify-between py-3 border-b border-gray-200 last:border-b-0">
              <span className="text-gray-700">{task.title}</span>
              <span className="text-gray-500">{task.dueDate}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
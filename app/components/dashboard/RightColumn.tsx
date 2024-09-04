interface Alert {
    id: number;
    type: 'compliance' | 'risk';
    message: string;
  }
  
  interface RightColumnProps {
    alerts: Alert[];
  }
  
  export default function RightColumn({ alerts }: RightColumnProps) {
    return (
      <div className="lg:col-span-1">
        <section className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Performance Metrics</h2>
          {/* Add performance metrics content here */}
        </section>
  
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Alerts</h2>
          <ul>
            {alerts.map(alert => (
              <li key={alert.id} className={`py-3 mb-2 rounded ${alert.type === 'compliance' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                {alert.message}
              </li>
            ))}
          </ul>
        </section>
      </div>
    );
  }
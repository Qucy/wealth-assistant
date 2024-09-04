interface Activity {
    id: number;
    description: string;
    date: string;
  }
  
  interface MarketInsight {
    id: number;
    title: string;
    change: number;
  }
  
  interface MiddleColumnProps {
    recentActivities: Activity[];
    marketInsights: MarketInsight[];
  }
  
  export default function MiddleColumn({ recentActivities, marketInsights }: MiddleColumnProps) {
    return (
      <div className="lg:col-span-1">
        <section className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Recent Activities</h2>
          <ul>
            {recentActivities.map(activity => (
              <li key={activity.id} className="flex justify-between py-3 border-b border-gray-200 last:border-b-0">
                <span className="text-gray-700">{activity.description}</span>
                <span className="text-gray-500">{activity.date}</span>
              </li>
            ))}
          </ul>
        </section>
  
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Market Insights</h2>
          <ul>
            {marketInsights.map(insight => (
              <li key={insight.id} className="flex justify-between py-3 border-b border-gray-200 last:border-b-0">
                <span className="text-gray-700">{insight.title}</span>
                <span className={insight.change >= 0 ? 'text-green-600' : 'text-red-600'}>
                  {insight.change > 0 ? '+' : ''}{insight.change}%
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    );
  }
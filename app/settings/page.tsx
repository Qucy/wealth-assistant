import Layout from '../components/Layout';

export default function Settings() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold mb-6 text-gray-900">Settings</h1>
        
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Personal Preferences</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Language</label>
              <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md text-gray-900">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Time Zone</label>
              <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md text-gray-900">
                <option>Eastern Time (ET)</option>
                <option>Pacific Time (PT)</option>
                <option>Central European Time (CET)</option>
              </select>
            </div>
            <div>
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-indigo-600" />
                <span className="ml-2 text-gray-700">Enable email notifications</span>
              </label>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Client Portfolio Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Default Risk Profile</label>
              <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md text-gray-900">
                <option>Conservative</option>
                <option>Moderate</option>
                <option>Aggressive</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Performance Benchmark</label>
              <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md text-gray-900">
                <option>S&P 500</option>
                <option>MSCI World Index</option>
                <option>Custom Benchmark</option>
              </select>
            </div>
            <div>
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-indigo-600" />
                <span className="ml-2 text-gray-700">Auto-rebalance portfolios monthly</span>
              </label>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Compliance and Reporting</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">KYC Update Frequency</label>
              <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md text-gray-900">
                <option>Annually</option>
                <option>Bi-annually</option>
                <option>Quarterly</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Default Report Template</label>
              <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md text-gray-900">
                <option>Comprehensive</option>
                <option>Summary</option>
                <option>Performance Focus</option>
              </select>
            </div>
            <div>
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-indigo-600" />
                <span className="ml-2 text-gray-700">Enable automatic compliance checks</span>
              </label>
            </div>
          </div>
        </div>
        
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
          Save Settings
        </button>
      </div>
    </Layout>
  );
}
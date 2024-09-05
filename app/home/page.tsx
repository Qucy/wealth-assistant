import Layout from '../components/Layout';
import Link from 'next/link';

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="bg-white p-6 rounded-lg shadow mb-8">
            <h1 className="text-3xl font-bold mb-4 text-gray-900">Welcome to RM Wealth Assistant</h1>
            <p className="text-xl mb-2 text-gray-700">Your comprehensive tool for managing high-net-worth clients efficiently.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">How We Empower You</h2>
            <ul className="space-y-2">
              {[
                'Client portfolio overview and analytics',
                'Personalized investment recommendations',
                'Automated risk assessment and compliance checks',
                'Streamlined client communication tools',
                'Performance tracking and reporting'
              ].map((item, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Get Started</h2>
            <p className="mb-6 text-gray-700">Ready to enhance your client management capabilities? Click below to access your dashboard.</p>
            <Link href="/dashboard" passHref>
              <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out">
                Access RM Dashboard
              </button>
            </Link>
          </div>
        </main>
        
        <footer className="bg-white text-gray-600 py-6 shadow-inner">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2023 RM Wealth Assistant. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Layout>
  );
}
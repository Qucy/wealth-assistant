import Layout from '../components/Layout';
import Link from 'next/link';

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-white to-gray-50">
        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="border border-gray-200 p-10 rounded-lg shadow-sm mb-12 bg-white transform transition-all duration-300 hover:shadow-md">
              <h1 className="text-5xl font-bold mb-6 text-gray-900 leading-tight">Welcome to RM Wealth Assistant</h1>
              <p className="text-2xl mb-4 text-gray-700 leading-relaxed">Your comprehensive tool for managing high-net-worth clients efficiently.</p>
            </div>
            
            <div className="border border-gray-200 p-10 rounded-lg shadow-sm mb-12 bg-white transform transition-all duration-300 hover:shadow-md">
              <h2 className="text-4xl font-semibold mb-8 text-gray-900">How We Empower You</h2>
              <ul className="space-y-6">
                {[
                  'Client portfolio overview and analytics',
                  'Personalized investment recommendations',
                  'Automated risk assessment and compliance checks',
                  'Streamlined client communication tools',
                  'Performance tracking and reporting'
                ].map((item, index) => (
                  <li key={index} className="flex items-center text-gray-700 text-xl">
                    <svg className="w-8 h-8 mr-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="border border-gray-200 p-10 rounded-lg shadow-sm mb-12 bg-white transform transition-all duration-300 hover:shadow-md">
              <h2 className="text-4xl font-semibold mb-6 text-gray-900">Get Started</h2>
              <p className="mb-10 text-gray-700 text-xl leading-relaxed">Ready to enhance your client management capabilities? Access your dashboard to unlock the full potential of RM Wealth Assistant.</p>
              <Link href="/dashboard" passHref>
                <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-5 px-10 rounded-lg text-xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                  Access RM Dashboard
                </button>
              </Link>
            </div>
          </div>
        </main>
        
        <footer className="bg-white text-gray-600 py-8 border-t border-gray-200">
          <div className="container mx-auto px-4 text-center">
            <p className="text-base">&copy; 2023 RM Wealth Assistant. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Layout>
  );
}
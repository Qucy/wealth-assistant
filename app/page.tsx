import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-900 flex flex-col justify-center items-center text-white">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to Wealth Assistant</h1>
        <p className="text-xl mb-8 text-indigo-200">Your personal guide to financial success</p>
        <Link href="/dashboard">
          <button className="bg-indigo-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105">
            Get Started
          </button>
        </Link>
      </div>
      <div className="mt-16 space-y-4 text-indigo-200">
        <div className="flex items-center">
          <svg className="h-6 w-6 mr-2 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Personalized financial advice</span>
        </div>
        <div className="flex items-center">
          <svg className="h-6 w-6 mr-2 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Smart investment strategies</span>
        </div>
        <div className="flex items-center">
          <svg className="h-6 w-6 mr-2 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
          <span>Comprehensive portfolio management</span>
        </div>
      </div>
      <footer className="absolute bottom-4 text-sm text-indigo-300 opacity-75">
        © 2024 Wealth Assistant. All rights reserved.
      </footer>
    </div>
  );
}
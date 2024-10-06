'use client'

import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import OverviewStats from '../components/dashboard/OverviewStats';
import LeftColumn from '../components/dashboard/LeftColumn';
import RightColumn from '../components/dashboard/RightColumn';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendar, FaDownload } from 'react-icons/fa';

// Mock data interfaces
interface OverviewStats {
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
}

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

interface Alert {
  id: number;
  type: 'compliance' | 'risk';
  message: string;
}

// Dummy data for monthlyData
const monthlyData = [
  { month: 'Jan', gain: 50000, loss: 20000 },
  { month: 'Feb', gain: 55000, loss: 18000 },
  { month: 'Mar', gain: 60000, loss: 22000 },
  { month: 'Apr', gain: 58000, loss: 21000 },
  { month: 'May', gain: 62000, loss: 19000 },
  { month: 'Jun', gain: 65000, loss: 23000 },
  { month: 'Jul', gain: 68000, loss: 24000 },
  { month: 'Aug', gain: 70000, loss: 22000 },
  { month: 'Sep', gain: 72000, loss: 25000 },
];

// Dummy data for recentSales
const recentSales = [
  {
    id: 1,
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    phone: '+1 (555) 123-4567',
    investmentPreference: 'Moderate',
    riskTolerance: 'Medium',
    gender: 'male',
    customerAvatar: '/avatars/1.jpg',
    age: 25,
    jobTitle: 'Software Engineer',
    maritalStatus: 'Single',
    annualIncome: 120000,
    education: 'Bachelor\'s Degree',
    interests: ['Technology', 'Travel'],
    netWorth: 2000000,
    assets: { stocks: 800000, bonds: 500000, realEstate: 700000, cash: 180000, deposit: 180000 },
    liabilities: { mortgage: 400000, carLoan: 20000 },
    accountBalance: 180000,
    realisticGainLoss: 10000,
    unrealisticGainLoss: 15000,
    realisticGainLossPercentage: 5,
    unrealisticGainLossPercentage: 7.5,
    recentTransactions: [
      { date: '2024-05-15', description: 'Stock Purchase', amount: 5000 },
      { date: '2024-05-10', description: 'Dividend Payment', amount: 1200 }
    ],
    recentActivities: [
      { date: '2024-09-02', description: 'Purchased 100 shares of Apple stock at $150 each', type: 'Investment' },
      { date: '2024-09-04', description: 'Spent $500 on electronics at Best Buy using credit card', type: 'Normal Transaction' },
      { date: '2024-09-06', description: 'Visited the bank branch for account inquiries', type: 'Normal Visit' },
      { date: '2024-09-08', description: 'Bought 50 shares of Amazon stock at $2,000 each', type: 'Investment' },
      { date: '2024-09-11', description: 'Made a $200 debit card transaction at a local restaurant', type: 'Normal Transaction' },
      { date: '2024-09-13', description: 'Met with Relationship Manager to discuss investment strategies', type: 'Normal Visit' },
      { date: '2024-09-15', description: 'Sold 20 bonds at $1,000 each', type: 'Investment' },
      { date: '2024-09-17', description: 'Paid $1,500 credit card bill', type: 'Normal Transaction' },
      { date: '2024-09-19', description: 'Attended a financial planning session with a financial advisor', type: 'Normal Visit' },
      { date: '2024-09-21', description: 'Invested $10,000 in a mutual fund', type: 'Investment' }
    ],
    financialGoals: ['Retirement at 60', 'Children\'s Education'],
    relationshipManager: 'Sarah Johnson',
    amount: 1500.00,
    cards: [
      { name: 'Mastercard Debit Card', description: '10 transactions, $5000 spent, 30 days' },
      { name: 'Red Credit Card', description: '5 transactions, $2000 spent, 30 days' }
    ],
    clubs: [
      { name: 'Forex Club', description: 'Bronze tier, 50K to next tier' },
      { name: 'Top Trade Club', description: 'Level 3, 500K to next tier' }
    ]
  },
  {
    id: 2,
    customerName: 'Jane Smith',
    customerEmail: 'jane@example.com',
    phone: '+1 (555) 987-6543',
    investmentPreference: 'Aggressive',
    riskTolerance: 'High',
    gender: 'female',
    customerAvatar: '/avatars/2.jpg',
    age: 42,
    jobTitle: 'Marketing Director',
    maritalStatus: 'Married',
    annualIncome: 150000,
    education: 'Master\'s Degree',
    interests: ['Fashion', 'Art'],
    netWorth: 3500000,
    assets: { stocks: 1500000, bonds: 750000, realEstate: 1250000, cash: 200000, deposit: 180000 },
    liabilities: { mortgage: 600000 },
    accountBalance: 275000,
    realisticGainLoss: 10000,
    unrealisticGainLoss: 15000,
    realisticGainLossPercentage: 5,
    unrealisticGainLossPercentage: 7.5,
    portfolio: { stocks: 70, bonds: 20, cash: 10 },
    recentTransactions: [
      { date: '2023-05-17', description: 'Bond Sale', amount: 10000 },
      { date: '2023-05-12', description: 'Stock Dividend', amount: 2500 }
    ],
    recentActivities: [
      { date: '2024-09-02', description: 'Investment Activity', type: 'Investment' },
      { date: '2024-09-04', description: 'Credit Card Purchase', type: 'Normal Transaction' },
      { date: '2024-09-06', description: 'Branch Visit', type: 'Normal Visit' },
      { date: '2024-09-08', description: 'Stock Purchase', type: 'Investment' },
      { date: '2024-09-11', description: 'Debit Card Transaction', type: 'Normal Transaction' },
      { date: '2024-09-13', description: 'Meeting with RM', type: 'Normal Visit' },
      { date: '2024-09-15', description: 'Bond Sale', type: 'Investment' },
      { date: '2024-09-17', description: 'Credit Card Payment', type: 'Normal Transaction' },
      { date: '2024-09-19', description: 'Financial Planning Session', type: 'Normal Visit' },
      { date: '2024-09-21', description: 'Mutual Fund Investment', type: 'Investment' }
    ],
    financialGoals: ['Early Retirement', 'Start a Business'],
    relationshipManager: 'Michael Brown',
    amount: 2750.50,
    cards: [
      { name: 'Mastercard Debit Card', description: '10 transactions, $5000 spent, 30 days' },
      { name: 'EveryMile Credit Card', description: '5 transactions, $2000 spent, 30 days' }
    ],
    clubs: [
      { name: 'Travel Hub', description: 'Silver, 2 more ticket or hotel bookings to next tier' }
    ]
  },
  {
    id: 3,
    customerName: 'Alice Brown',
    customerEmail: 'alice@example.com',
    phone: '+1 (555) 234-5678',
    investmentPreference: 'Conservative',
    riskTolerance: 'Low',
    gender: 'female',
    customerAvatar: '/avatars/3.jpg',
    age: 55,
    jobTitle: 'Retired',
    maritalStatus: 'Married',
    annualIncome: 150000,
    education: 'Master\'s Degree',
    interests: ['Reading', 'Gardening'],
    netWorth: 1500000,
    assets: { stocks: 200000, bonds: 300000, realEstate: 500000, cash: 300000, deposit: 180000 },
    liabilities: { mortgage: 300000 },
    accountBalance: 120000,
    realisticGainLoss: 10000,
    unrealisticGainLoss: 15000,
    realisticGainLossPercentage: 5,
    unrealisticGainLossPercentage: 7.5,
    portfolio: { stocks: 10, bonds: 20, cash: 70 },
    recentTransactions: [
      { date: '2023-05-16', description: 'Dividend Payment', amount: 1000 },
      { date: '2023-05-13', description: 'Interest Payment', amount: 500 }
    ],
    recentActivities: [
      { date: '2024-09-02', description: 'Investment Activity', type: 'Investment' },
      { date: '2024-09-04', description: 'Credit Card Purchase', type: 'Normal Transaction' },
      { date: '2024-09-06', description: 'Branch Visit', type: 'Normal Visit' },
      { date: '2024-09-08', description: 'Stock Purchase', type: 'Investment' },
      { date: '2024-09-11', description: 'Debit Card Transaction', type: 'Normal Transaction' },
      { date: '2024-09-13', description: 'Meeting with RM', type: 'Normal Visit' },
      { date: '2024-09-15', description: 'Bond Sale', type: 'Investment' },
      { date: '2024-09-17', description: 'Credit Card Payment', type: 'Normal Transaction' },
      { date: '2024-09-19', description: 'Financial Planning Session', type: 'Normal Visit' },
      { date: '2024-09-21', description: 'Mutual Fund Investment', type: 'Investment' }
    ],
    financialGoals: ['Travel More', 'Donate to Charity'],
    relationshipManager: 'Emily White',
    amount: 1200.75,
    cards: [
      { name: 'Mastercard Debit Card', description: '10 transactions, $5000 spent' },
      { name: 'Red Credit Card', description: '5 transactions, $2000 spent' }
    ],
    clubs: [
      { name: 'Travel Hub', description: 'Silver, 2 more ticket or hotel bookings to next tier' }
    ]
  },
  {
    id: 4,
    customerName: 'Sarah Johnson',
    customerEmail: 'sarah@example.com',
    phone: '+1 (555) 876-5432',
    investmentPreference: 'Moderate',
    riskTolerance: 'Medium',
    gender: 'female',
    customerAvatar: '/avatars/4.jpg',
    age: 48,
    jobTitle: 'Entrepreneur',
    maritalStatus: 'Married',
    annualIncome: 150000,
    education: 'Master\'s Degree',
    interests: ['Technology', 'Investing'],
    netWorth: 4000000,
    assets: { stocks: 1800000, bonds: 600000, realEstate: 800000, cash: 300000, deposit: 180000 },
    liabilities: { mortgage: 500000, carLoan: 100000 },
    accountBalance: 320000,
    realisticGainLoss: 10000,
    unrealisticGainLoss: 15000,
    realisticGainLossPercentage: 5,
    unrealisticGainLossPercentage: 7.5,
    portfolio: { stocks: 50, bonds: 30, cash: 20 },
    recentTransactions: [
      { date: '2023-05-19', description: 'Stock Purchase', amount: 15000 },
      { date: '2023-05-11', description: 'Dividend Payment', amount: 1800 }
    ],
    recentActivities: [
      { date: '2024-09-02', description: 'Investment Activity', type: 'Investment' },
      { date: '2024-09-04', description: 'Credit Card Purchase', type: 'Normal Transaction' },
      { date: '2024-09-06', description: 'Branch Visit', type: 'Normal Visit' },
      { date: '2024-09-08', description: 'Stock Purchase', type: 'Investment' },
      { date: '2024-09-11', description: 'Debit Card Transaction', type: 'Normal Transaction' },
      { date: '2024-09-13', description: 'Meeting with RM', type: 'Normal Visit' },
      { date: '2024-09-15', description: 'Bond Sale', type: 'Investment' },
      { date: '2024-09-17', description: 'Credit Card Payment', type: 'Normal Transaction' },
      { date: '2024-09-19', description: 'Financial Planning Session', type: 'Normal Visit' },
      { date: '2024-09-21', description: 'Mutual Fund Investment', type: 'Investment' }
    ],
    financialGoals: ['Retirement at 65', 'Buy a Vacation Home'],
    relationshipManager: 'John Doe',
    amount: 1800.25,
    cards: [
      { name: 'Mastercard Debit Card', description: '10 transactions, $5000 spent' },
      { name: 'Red Credit Card', description: '5 transactions, $2000 spent' }
    ],
    clubs: [
      { name: 'Travel Hub', description: 'Silver, 2 more ticket or hotel bookings to next tier' }
    ]
  },
  {
    id: 5,
    customerName: 'David Lee',
    customerEmail: 'david@example.com',
    phone: '+1 (555) 345-6789',
    investmentPreference: 'Moderate',
    riskTolerance: 'Medium',
    gender: 'male',
    customerAvatar: '/avatars/5.jpg',
    age: 39,
    jobTitle: 'Financial Planner',
    maritalStatus: 'Married',
    annualIncome: 150000,
    education: 'Master\'s Degree',
    interests: ['Investing', 'Family'],
    netWorth: 3000000,
    assets: { stocks: 1200000, bonds: 400000, realEstate: 600000, cash: 300000, deposit: 90000 },
    liabilities: { mortgage: 400000, carLoan: 50000 },
    accountBalance: 250000,
    realisticGainLoss: 10000,
    unrealisticGainLoss: 15000,
    realisticGainLossPercentage: 5,
    unrealisticGainLossPercentage: 7.5,
    portfolio: { stocks: 40, bonds: 30, cash: 30 },
    recentTransactions: [
      { date: '2023-05-20', description: 'Stock Purchase', amount: 12000 },
      { date: '2023-05-12', description: 'Dividend Payment', amount: 1500 }
    ],
    recentActivities: [
      { date: '2024-09-02', description: 'Investment Activity', type: 'Investment' },
      { date: '2024-09-04', description: 'Credit Card Purchase', type: 'Normal Transaction' },
      { date: '2024-09-06', description: 'Branch Visit', type: 'Normal Visit' },
      { date: '2024-09-08', description: 'Stock Purchase', type: 'Investment' },
      { date: '2024-09-11', description: 'Debit Card Transaction', type: 'Normal Transaction' },
      { date: '2024-09-13', description: 'Meeting with RM', type: 'Normal Visit' },
      { date: '2024-09-15', description: 'Bond Sale', type: 'Investment' },
      { date: '2024-09-17', description: 'Credit Card Payment', type: 'Normal Transaction' },
      { date: '2024-09-19', description: 'Financial Planning Session', type: 'Normal Visit' },
      { date: '2024-09-21', description: 'Mutual Fund Investment', type: 'Investment' }
    ],
    financialGoals: ['Retirement at 65', 'Buy a Vacation Home'],
    relationshipManager: 'David Lee',
    amount: 1500.00,
    cards: [
      { name: 'Mastercard Debit Card', description: '10 transactions, $5000 spent' },
      { name: 'Red Credit Card', description: '5 transactions, $2000 spent' }
    ],
    clubs: [
      { name: 'Travel Hub', description: 'Silver, 2 more ticket or hotel bookings to next tier' }
    ]
  },
]

export default function Dashboard() {
  const [stats, setStats] = useState<OverviewStats | null>(null);
  const [topClients, setTopClients] = useState<Client[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [recentActivities, setRecentActivities] = useState<Activity[]>([]);
  const [marketInsights, setMarketInsights] = useState<MarketInsight[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDateRange, endDateRange] = dateRange;
  const [activeTab, setActiveTab] = useState('Overview');

  const formatDateRange = (start: Date | null, end: Date | null) => {
    if (start && end) {
      return `${format(start, 'MMM dd, yyyy')} - ${format(end, 'MMM dd, yyyy')}`;
    }
    return '';
  };

  const tabs = ['Overview', 'Analytics', 'Reports', 'Notifications'];


  useEffect(() => {
    // TODO: Replace with actual API calls
    setStats({
      totalAUM: 1000000000,
      clientCount: 50,
      avgPortfolioValue: 20000000,
      ytdPerformance: 7.5,
      aumBreakdown: {
        investment: 85,
        cash: 15,
      },
      clientBreakdown: {
        premier: 43,
        premierElite: 7,
      },
      historicalPortfolioValues: [
        { date: '2024-01-01', value: 19000000 },
        { date: '2024-02-01', value: 20000000 },
        { date: '2024-03-01', value: 21000000 },
        { date: '2024-04-01', value: 22000000 },
        { date: '2024-05-01', value: 23000000 },
        { date: '2024-06-01', value: 24000000 },
        { date: '2024-07-01', value: 25000000 },
        { date: '2024-08-01', value: 26000000 },
        { date: '2024-09-01', value: 27000000 },
      ],
      historicalYTDPerformance: [
        { date: '2024-01-01', value: 7.5 },
        { date: '2024-09-01', value: 7.5 },
        { date: '2024-10-01', value: 8.0 },
        { date: '2024-11-01', value: 8.2 },
        { date: '2024-12-01', value: 8.5 },
      ],
    });
    setTopClients([
      { id: 1, name: 'John Doe', portfolioValue: 50000000, recentChange: 2.3 },
      { id: 2, name: 'Jane Smith', portfolioValue: 45000000, recentChange: -1.1 },
      { id: 3, name: 'Bob Johnson', portfolioValue: 40000000, recentChange: 3.7 },
    ]);
    setTasks([
      { id: 1, title: 'Client meeting with John Doe', dueDate: '2024-03-15' },
      { id: 2, title: 'Portfolio review for Jane Smith', dueDate: '2024-03-18' },
    ]);
    setRecentActivities([
      { id: 1, description: 'Updated portfolio for Bob Johnson', date: '2024-03-10' },
      { id: 2, description: 'New client onboarding: Alice Brown', date: '2024-03-09' },
    ]);
    setMarketInsights([
      { id: 1, title: 'S&P 500', change: 0.5 },
      { id: 2, title: 'NASDAQ', change: -0.3 },
      { id: 3, title: 'DJIA', change: 0.2 },
    ]);
    setAlerts([
      { id: 1, type: 'compliance', message: 'Annual review due for 5 clients' },
      { id: 2, type: 'risk', message: 'High market volatility detected' },
    ]);
  }, []);

  if (!stats) return <div className="w-screen h-screen flex items-center justify-center text-gray-700">Loading...</div>;

  return (
    <Layout>

      {/* Dashboard title and date range picker */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        {/* Add Dashboard title */}
        <h1 className="text-2xl font-bold text-black">Dashboard</h1>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-[400px]">
            <DatePicker
              selectsRange={true}
              startDate={startDateRange || new Date()}
              endDate={endDateRange || new Date()}
              onChange={(update: [Date | null, Date | null]) => {
                setDateRange(update);
              }}
              dateFormat="MMM dd, yyyy"
              className="!w-full border border-gray-300 rounded-md px-3 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-gray-200 text-black"
              placeholderText="Select date range"
              isClearable={true}
              customInput={
                <input
                  type="text"
                  value={formatDateRange(startDateRange, endDateRange)}
                  readOnly
                  className="w-full cursor-pointer"
                  style={{ width: '100%', maxWidth: '100%' }}
                />
              }
              wrapperClassName="!w-full"
            />
            <FaCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <button className="bg-black text-white px-4 py-2 rounded-md flex items-center whitespace-nowrap">
            <FaDownload className="mr-2" />
            Download
          </button>
        </div>
      </div>

      {/* New Tab Button Row with enhanced shadows */}
      <div className="mb-6">
        <div className="inline-flex bg-gray-200 rounded-lg p-1 shadow-md">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === tab
                  ? 'bg-white text-black shadow-sm'
                  : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>


      <OverviewStats stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-2">
          <LeftColumn monthlyData={monthlyData} />
        </div>
        <div className="lg:col-span-2">
          <RightColumn recentSales={recentSales} />
        </div>
      </div>
    </Layout>
  );
}
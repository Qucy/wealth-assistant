'use client'

import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import OverviewStats from '../components/dashboard/OverviewStats';
import LeftColumn from '../components/dashboard/LeftColumn';
import RightColumn from '../components/dashboard/RightColumn';

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
  { id: 1, customerAvatar: 'https://i.pravatar.cc/40?img=1', customerName: 'John Doe', customerEmail: 'john@example.com', amount: 1500.00 },
  { id: 2, customerAvatar: 'https://i.pravatar.cc/40?img=2', customerName: 'Jane Smith', customerEmail: 'jane@example.com', amount: 2750.50 },
  { id: 3, customerAvatar: 'https://i.pravatar.cc/40?img=3', customerName: 'Bob Johnson', customerEmail: 'bob@example.com', amount: -500.25 },
  { id: 4, customerAvatar: 'https://i.pravatar.cc/40?img=4', customerName: 'Alice Brown', customerEmail: 'alice@example.com', amount: 3200.75 },
  { id: 5, customerAvatar: 'https://i.pravatar.cc/40?img=5', customerName: 'Charlie Wilson', customerEmail: 'charlie@example.com', amount: 1800.00 },
];

export default function Dashboard() {
  const [stats, setStats] = useState<OverviewStats | null>(null);
  const [topClients, setTopClients] = useState<Client[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [recentActivities, setRecentActivities] = useState<Activity[]>([]);
  const [marketInsights, setMarketInsights] = useState<MarketInsight[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);

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
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CustomerDetailPopup from '../CustomerDetailPopup'; // We'll create this component

interface Sale {
    id: number;
    customerName: string;
    customerEmail: string;
    phone: string;
    maritalStatus: string;
    annualIncome: number;
    education: string;
    totalAssets: number;
    investmentPreference: string;
    riskTolerance: string;
    gender: string;
    customerAvatar: string;
    age: number;
    jobTitle: string;
    interests: string[];
    netWorth: number;
    assets: { [key: string]: number };
    liabilities: { [key: string]: number };
    accountBalance: number;
    portfolio: { [key: string]: number };
    recentTransactions: { date: string; description: string; amount: number }[];
    recentActivities: { date: string; description: string }[];
    financialGoals: string[];
    relationshipManager: string;
    amount: number; // Keep this if it's still needed in the RightColumn component
    cards: { name: string, description: string }[];
    clubs: { name: string, description: string }[];
}

interface RightColumnProps {
    recentSales: Sale[];
}

export default function RightColumn({ recentSales }: RightColumnProps) {

    const [selectedCustomer, setSelectedCustomer] = useState<Sale | null>(null);

    return (
        <div className="lg:col-span-2">
            <section className="bg-white p-6 rounded-xl shadow-lg transition-transform transform hover:scale-[1.02] border border-gray-200 h-[calc(46vh-1rem)] flex flex-col">
                <h2 className="text-xl font-semibold mb-2 text-gray-800">Recent Sales</h2>
                <p className="text-sm text-gray-500 mb-4">You made 50 sales last week</p>
                <div className="space-y-4 overflow-y-auto flex-grow">
                    {recentSales.map(sale => (
                        <div
                            key={sale.id}
                            className="flex items-center justify-between p-4 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors duration-200"
                            onClick={() => setSelectedCustomer(sale)}
                        >
                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                                    <img src={sale.customerAvatar} alt={sale.customerName} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-800">{sale.customerName}</p>
                                    <p className="text-sm text-gray-500">{sale.customerEmail}</p>
                                </div>
                            </div>
                            <span className={`font-semibold ${sale.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {sale.amount >= 0 ? '+' : '-'}${Math.abs(sale.amount).toFixed(2)}
                            </span>
                        </div>
                    ))}
                </div>
            </section>
            <AnimatePresence>
                {selectedCustomer && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-50 flex items-center justify-center"
                    >
                        <div className="absolute inset-0 bg-black opacity-50" onClick={() => setSelectedCustomer(null)}></div>
                        <div className="relative z-10">
                            <CustomerDetailPopup
                                customer={selectedCustomer}
                                onClose={() => setSelectedCustomer(null)}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
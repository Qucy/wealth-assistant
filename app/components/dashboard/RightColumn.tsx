import { FaUser } from 'react-icons/fa';

interface Sale {
    id: number;
    customerName: string;
    customerEmail: string;
    amount: number;
}

interface RightColumnProps {
    recentSales: Sale[];
}

export default function RightColumn({ recentSales }: RightColumnProps) {
    return (
        <div className="lg:col-span-2">
            <section className="bg-white p-6 rounded-xl shadow-lg transition-transform transform hover:scale-105 border border-gray-200 h-full">
                <h2 className="text-xl font-semibold mb-2 text-gray-800">Recent Sales</h2>
                <p className="text-sm text-gray-500 mb-4">You made 50 sales last week</p>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <tbody>
                            {recentSales.map(sale => (
                                <tr key={sale.id} className="border-b border-gray-200 last:border-b-0">
                                    <td className="py-3 pr-4">
                                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                            <FaUser className="text-gray-500" size={20} />
                                        </div>
                                    </td>
                                    <td className="py-3">
                                        <p className="font-semibold text-gray-800">{sale.customerName}</p>
                                        <p className="text-sm text-gray-500">{sale.customerEmail}</p>
                                    </td>
                                    <td className="py-3 text-right">
                                        <span className={`font-semibold ${sale.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                            {sale.amount >= 0 ? '+' : '-'}${Math.abs(sale.amount).toFixed(2)}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}
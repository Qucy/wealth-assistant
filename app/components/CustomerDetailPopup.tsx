import { useEffect, useRef } from 'react';
import { FaBriefcase, FaHeart, FaBirthdayCake, FaRing, FaDollarSign, FaGraduationCap, FaLinkedin, FaTwitter, FaCalculator, FaUser, FaPhone, FaEnvelope, FaTimes, FaStar} from 'react-icons/fa';
import { PieChart, Pie, Cell, Tooltip, Text} from 'recharts';

interface CustomerDetailPopupProps {
    customer: {
        id: number;
        customerName: string;
        customerEmail: string;
        maritalStatus: string;
        annualIncome: number;
        education: string;
        phone: string;
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
        recentActivities: { date: string; type: string; description: string }[];
        financialGoals: string[];
        relationshipManager: string;
        cards: { name: string, description: string, type: string}[];
        clubs: { name: string, description: string, type: string}[];
        // Enhanced data structure for gain and loss
        realisticGainLoss: number;
        unrealisticGainLoss: number;
        realisticGainLossPercentage: number;
        unrealisticGainLossPercentage: number;
    };
    onClose: () => void;
}



export default function CustomerDetailPopup({ customer, onClose }: CustomerDetailPopupProps) {
    const popupRef = useRef<HTMLDivElement>(null);

    // Calculate total assets
    const totalAssets = Object.values(customer.assets).reduce((sum, value) => sum + value, 0);

    // Card images
    const cardImages = {
        'Premier Mastercard': '/cards/cards1.png',
        'EveryMile Credit Card': '/cards/cards2.png',
        'Red Credit Card': '/cards/cards3.png',
        'Visa Signature Card': '/cards/cards4.png',
        'Mastercard Debit Card': '/cards/cards5.png'
    };

    // Club images
    const clubImages = {
        'Forex Club' : '/clubs/forexclub.jpg',
        'Travel Hub' : '/clubs/travelhub.jpg',
        'Top Trade Club' : '/clubs/ttc.jpg'
    }

    // Calculate AUM ratio
    const investmentAssets = (customer.assets.stocks || 0) + (customer.assets.bonds || 0) + (customer.assets.realEstate || 0);
    const cashAssets = (customer.assets.cash || 0) + (customer.assets.deposit || 0);
    const aumRatio = [
        { name: 'Investments', value: investmentAssets },
        { name: 'Cash & Deposits', value: cashAssets },
    ];

    // Investment portfolio breakdown
    const investmentBreakdown = [
        { name: 'Stocks', value: customer.assets.stocks || 0 },
        { name: 'Bonds', value: customer.assets.bonds || 0 },
        { name: 'Real Estate', value: customer.assets.realEstate || 0 },
    ];

    // Cash breakdown
    const cashBreakdown = [
        { name: 'Cash', value: customer.assets.cash || 0 },
        { name: 'Deposit', value: customer.assets.deposit || 0 },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    // Function to format numbers concisely
    const formatCurrency = (value: number) => {
        if (value >= 1000000) {
            return `$${(value / 1000000).toFixed(1)}M`; // e.g., 2000000 -> $2.0M
        } else if (value >= 1000) {
            return `$${(value / 1000).toFixed(1)}K`; // e.g., 2000 -> $2.0K
        }
        return `$${value.toLocaleString()}`;
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
            <div ref={popupRef} className="bg-white rounded-xl shadow-lg p-4 border border-gray-200 w-11/12 m-4 max-h-[90vh] overflow-y-auto text-black"> {/* Changed width to 90% and reduced padding */}
                {/* Header Section */}
                <div className="flex justify-between items-center mb-2"> {/* Reduced bottom margin */}
                    <h1 className="text-2xl font-semibold">Customer Profile</h1>
                    <FaTimes className="cursor-pointer text-gray-600 hover:text-gray-800" onClick={onClose} /> {/* Close icon */}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div>
                        {/* Customer Basic Information */}
                        <div className="bg-white p-4 rounded-lg mb-4 border border-gray-200">
                            <div className="flex items-center mb-4">
                                <img src={customer.customerAvatar} alt={customer.customerName} className="w-24 h-24 rounded-full mr-4" />
                                <div>
                                    <div className="flex items-center">
                                        <h2 className="text-2xl font-bold mr-4">{customer.customerName}</h2>
                                        <FaPhone className="mr-2 text-green-600" />
                                        <FaEnvelope className="mr-2 text-red-600" />
                                        <FaLinkedin className="mr-2 text-blue-600" />
                                        <FaTwitter className="text-blue-400" />
                                    </div>
                                    <p className="text-sm text-gray-500">Premium Customer</p>
                                    <p className="text-sm text-gray-500">RM: {customer.relationshipManager}</p>
                                </div>
                                {/* RM Advice Box */}
                                <div className="bg-gray-100 p-4 rounded-lg w-2/3 ml-6">
                                    <div className="flex items-start">
                                        <FaStar className="text-yellow-500 mr-2" />
                                        <p className="text-sm text-gray-600">
                                            John Doe should maximize contributions to tax-advantaged retirement accounts, leveraging compound growth for early retirement by age 60.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div className="flex items-center">
                                    <FaBirthdayCake className="mr-2" />
                                    <p><span className="font-medium">Age:</span> {customer.age} years old</p>
                                </div>
                                <div className="flex items-center">
                                    <FaBriefcase className="mr-2" />
                                    <p><span className="font-medium">Job Title:</span> {customer.jobTitle}</p>
                                </div>
                                <div className="flex items-center">
                                    <FaHeart className="mr-2" />
                                    {customer.interests && customer.interests.length > 0 && (
                                        <p><span className="font-medium">Interests:</span> {customer.interests.join(', ')}</p>
                                    )}
                                </div>
                                <div className="flex items-center">
                                    <FaRing className="mr-2" />
                                    <p><span className="font-medium">Marital Status:</span> {customer.maritalStatus}</p>
                                </div>
                                <div className="flex items-center">
                                    <FaDollarSign className="mr-2" />
                                    <p><span className="font-medium">Annual Income:</span> ${customer.annualIncome.toLocaleString()}</p>
                                </div>
                                <div className="flex items-center">
                                    <FaGraduationCap className="mr-2" />
                                    <p><span className="font-medium">Education:</span> {customer.education}</p>
                                </div>
                                <div className="flex items-center">
                                    <FaCalculator className="mr-2" />
                                    <p>
                                        <span className="font-medium">Financial goal:</span> {customer.financialGoals && customer.financialGoals.length > 0 ? customer.financialGoals[0] : 'None'}
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* Wealth Profile Information */}
                        <div className="bg-white p-4 rounded-lg mb-4 border border-gray-200 relative">
                            <h3 className="text-lg font-semibold absolute -top-4 left-4 bg-white px-2 z-10">Wealth Overview</h3>
                            <div className="mt-4">
                                <div className="flex justify-between space-x-4">
                                    {/* AUM Ratio */}
                                    <div className="flex-1 border border-gray-200 rounded-lg p-1 flex flex-col"> {/* Changed padding from p-2 to p-1 */}
                                        <div className="flex justify-between items-center mb-2"> {/* Added flex container for icon and title */}
                                            <h4 className="font-medium text-sm">AUM Ratio</h4>
                                            <FaCalculator className="text-gray-400" title="show AUM ratio detail" /> {/* Added icon for AUM Ratio */}
                                        </div>
                                        <div className="flex justify-center">
                                            <PieChart width={380} height={150}>
                                                <Pie
                                                    data={aumRatio}
                                                    cx={180}
                                                    cy={70}
                                                    innerRadius={40}
                                                    outerRadius={60}
                                                    fill="#8884d8"
                                                    paddingAngle={2}
                                                    dataKey="value"
                                                    label={({ name, value, percent, x, y, index }: { name: string; value: number; percent: number; x: number; y: number, index: number }) => {
                                                        // Custom offsets based on index
                                                        let xOffset = 0;
                                                        let yOffset = 0;
                                                        if (index === 0) {
                                                            xOffset = -50;
                                                            yOffset = 30;
                                                        } else if (index === 1) {
                                                            xOffset = 50;
                                                            yOffset = -10;
                                                        } else {
                                                            xOffset = 0;
                                                            yOffset = 0;
                                                        }

                                                        return (
                                                            <>
                                                                <Text 
                                                                    x={x + xOffset} 
                                                                    y={y + yOffset} 
                                                                    fill={COLORS[index % COLORS.length]}
                                                                    textAnchor="middle" 
                                                                    dominantBaseline="central"
                                                                    style={{ fontSize: '12px' }}>
                                                                    {`${name}: ${(percent * 100).toFixed(0)}%`}
                                                                </Text>
                                                                {/* Display exact value on the second line */}
                                                                <Text
                                                                    x={x + xOffset}
                                                                    y={y + yOffset + 12} 
                                                                    fill={COLORS[index % COLORS.length]}
                                                                    textAnchor="middle"
                                                                    dominantBaseline="central"
                                                                    style={{ fontSize: '10px' }}
                                                                >
                                                                    {`${formatCurrency(value)}`}
                                                                </Text>
                                                            </>
                                                        );
                                                        
                                                    }}
                                                    labelLine={false}
                                                >
                                                    {aumRatio.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                    ))}
                                                </Pie>
                                                <Tooltip formatter={(value: number) => formatCurrency(value)} />
                                            </PieChart>
                                        </div>
                                    </div>

                                    {/* Investment Portfolio Breakdown */}
                                    <div className="flex-1 border border-gray-200 rounded-lg p-1 flex flex-col relative"> {/* Adjusted height by using minHeight */}
                                        <div className="flex justify-between items-center mb-2"> {/* Added flex container for icon and title */}
                                            <h4 className="font-medium text-sm">Investment Portfolio</h4>
                                            <FaBriefcase className="text-gray-400" title="show investment portfolio detail" /> {/* Added icon for Investment Portfolio */}
                                        </div>
                                        <div className="flex justify-center">
                                            <PieChart width={380} height={200}>
                                                <Pie
                                                    data={investmentBreakdown}
                                                    cx={180}
                                                    cy={70}
                                                    innerRadius={40}
                                                    outerRadius={60}
                                                    fill="#8884d8"
                                                    paddingAngle={2}
                                                    dataKey="value"
                                                    label={({ name, value, percent, x, y, index }: { name: string; value: number; percent: number; x: number; y: number, index: number }) => {
                                                        // Custom offsets based on index
                                                        let xOffset = 0;
                                                        let yOffset = 0;
                                                        if (index === 0) {
                                                            xOffset = 55;
                                                            yOffset = 20;
                                                        } else if (index === 1) {
                                                            xOffset = -20;
                                                            yOffset = -10;
                                                        } else if (index === 2) {
                                                            xOffset = 50;
                                                            yOffset = -15;
                                                        } 
                                                        else {
                                                            xOffset = 0;
                                                            yOffset = 0;
                                                        }
                                                        return (
                                                            <>  
                                                                {/* Display percentage on the first line */}
                                                                <Text 
                                                                    x={x + xOffset} 
                                                                    y={y + yOffset} 
                                                                    fill={COLORS[index % COLORS.length]}
                                                                    textAnchor="middle" 
                                                                    dominantBaseline="central"
                                                                    style={{ fontSize: '12px' }}
                                                                >
                                                                    {`${name}: ${(percent * 100).toFixed(0)}%`}
                                                                </Text>
                                                                {/* Display exact value on the second line */}
                                                                <Text
                                                                    x={x + xOffset}
                                                                    y={y + yOffset + 12} 
                                                                    fill={COLORS[index % COLORS.length]}
                                                                    textAnchor="middle"
                                                                    dominantBaseline="central"
                                                                    style={{ fontSize: '10px' }}
                                                                >
                                                                    {`${formatCurrency(value)}`}
                                                                </Text>
                                                            </>
                                                        )

                                                    }}
                                                    labelLine={false}
                                                >
                                                    {investmentBreakdown.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                    ))}
                                                </Pie>
                                                <Tooltip formatter={(value: number) => formatCurrency(value)} />
                                            </PieChart>
                                        </div>
                                    </div>

                                    {/* Cash Breakdown */}
                                    <div className="flex-1 border border-gray-200 rounded-lg p-1 flex flex-col relative"> {/* Changed padding from p-2 to p-1 and added relative */}
                                        <div className="flex justify-between items-center mb-2"> {/* Added flex container for icon and title */}
                                            <h4 className="font-medium text-sm">Cash Breakdown</h4>
                                            <FaDollarSign className="text-gray-400" title="show cash breakdown detail" /> {/* Replaced icon with dollar sign and added title */}
                                        </div>
                                        <div className="flex justify-center">
                                            <PieChart width={380} height={200}>
                                                <Pie
                                                    data={cashBreakdown}
                                                    cx={180}
                                                    cy={70}
                                                    innerRadius={40}
                                                    outerRadius={60}
                                                    fill="#82ca9d"
                                                    paddingAngle={2}
                                                    dataKey="value"
                                                    label={({ name, value, percent, x, y, index }: { name: string; value: number; percent: number; x: number; y: number, index: number }) => {
                                                        let xOffset = 0;
                                                        let yOffset = 0;
                                                        if (index === 0) {
                                                            xOffset = 75;
                                                            yOffset = 30;
                                                        } else if (index === 1) {
                                                            xOffset = -75;
                                                            yOffset = -30;
                                                        }
                                                        else {
                                                            xOffset = 0;
                                                            yOffset = 0;
                                                        }
                                                        return (
                                                            <>
                                                                <Text 
                                                                    x={x + xOffset} 
                                                                    y={y + yOffset} 
                                                                    fill={COLORS[index % COLORS.length]}
                                                                    textAnchor="middle" 
                                                                    dominantBaseline="central"
                                                                    style={{ fontSize: '12px' }}>
                                                                {`${name}: ${(percent * 100).toFixed(0)}%`}
                                                                </Text>
                                                                {/* Display exact value on the second line */}
                                                                <Text
                                                                    x={x + xOffset}
                                                                    y={y + yOffset + 12} 
                                                                    fill={COLORS[index % COLORS.length]}
                                                                    textAnchor="middle"
                                                                    dominantBaseline="central"
                                                                    style={{ fontSize: '10px' }}
                                                                >
                                                                    {`${formatCurrency(value)}`}
                                                                </Text>
                                                            </>
                                                        )
                                                    }}
                                                    labelLine={false}
                                                >
                                                    {cashBreakdown.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                    ))}
                                                </Pie>
                                                <Tooltip formatter={(value: number) => formatCurrency(value)} />
                                            </PieChart>
                                        </div>
                                    </div>
                                </div>

                                {/* Gain & Loss Section */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                                    {/* Realistic Gain & Loss Card */}
                                    <div className="bg-green-100 border border-green-300 rounded-lg p-4">
                                        <h4 className="font-medium text-sm">Realistic Gain & Loss</h4>
                                        <p className="text-lg font-bold text-green-600">
                                            ${customer.realisticGainLoss?.toLocaleString() || '0'}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            ({customer.realisticGainLossPercentage?.toFixed(2) || '0.00'}%)
                                        </p>
                                        <p className="text-xs text-gray-500">Reflects a solid market performance, indicating a positive trend in investment returns.</p>
                                    </div>
                                    {/* Unrealistic Gain & Loss Card */}
                                    <div className="bg-red-100 border border-red-300 rounded-lg p-4">
                                        <h4 className="font-medium text-sm">Unrealistic Gain & Loss</h4>
                                        <p className="text-lg font-bold text-red-600">
                                            ${customer.unrealisticGainLoss?.toLocaleString() || '0'}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            ({customer.unrealisticGainLossPercentage?.toFixed(2) || '0.00'}%)
                                        </p>
                                        <p className="text-xs text-gray-500">Suggests a high-risk investment strategy that may not be sustainable in the long term.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Right Column */}
                    <div>
                        {/* Cards Holding Section */}
                        <div className="bg-white p-4 rounded-lg border text-gray-600 relative mb-6"> {/* Added mb-6 for bottom margin */}
                            <h3 className="text-lg font-semibold absolute -top-4 left-4 bg-white px-2 z-10">Card Holdings & Recommendations</h3> {/* Title for Card Holdings */}
                            {customer.cards && customer.cards.length > 0 ? ( // Check if cards exist
                                <div className="flex flex-wrap gap-4"> {/* Added flex container for horizontal layout */}
                                    {customer.cards.map((card, index) => (
                                        <div key={index} className={`flex flex-col items-center border border-gray-300 p-2 rounded-lg relative ${card.type === 'unhold' ? 'bg-gray-100' : ''}`}> {/* Change background color for unhold cards */}
                                            <img 
                                                src={cardImages[card.name as keyof typeof cardImages] || '/cards/cards1.png'} // Use default image if not found
                                                alt={card.name}
                                                className="w-24 h-14 mb-2" // Adjust size as needed
                                            />
                                            <p className="text-sm font-semibold">{card.name}{card.type === 'unhold' ? ' (unhold)' : ''}</p> {/* Display card name directly */}
                                            <p className="text-xs text-gray-500 flex items-center">
                                                {card.type === 'unhold' ? <><FaStar className="text-yellow-500 mr-1" style={{ marginTop: '-2px' }} /></> : null}{card.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm">No cards held.</p> // Message if no cards
                            )}
                        </div>

                        {/* Clubs Joined Section */}
                        <div className="bg-white p-4 rounded-lg border text-gray-600 relative mb-6"> {/* Added mb-6 for bottom margin */}
                            <h3 className="text-lg font-semibold absolute -top-4 left-4 bg-white px-2 z-10">Clubs Joined & Recommendations</h3> {/* Title for Clubs Holding */}
                            {customer.clubs && customer.clubs.length > 0 ? ( // Check if clubs exist
                                <div className="flex flex-wrap gap-4"> {/* Added flex container for horizontal layout */}
                                    {customer.clubs.map((club, index) => (
                                        <div key={index} className={`flex items-center border border-gray-300 p-2 rounded-lg ${club.type === 'enrolled' ? '' : 'bg-gray-100'}`}> {/* Change background color based on enrollment status */}
                                            <img 
                                                src={clubImages[club.name as keyof typeof clubImages] || '/clubs/forexclub.jpg'} // Use default image if not found
                                                alt={club.name}
                                                className="w-18 h-14 mr-2" // Adjust size as needed
                                            />
                                            <div>
                                                <p className="text-sm font-semibold">{club.name}{club.type === 'not enrolled' ? ' (not enrolled)' : ''}</p> {/* Display club name directly */}
                                                <p className="text-xs text-gray-500 flex items-center">
                                                    {club.type === 'not enrolled' ? <><FaStar className="text-yellow-500 mr-1" style={{ marginTop: '-2px' }} /></> : null}{club.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm">No clubs joined.</p> // Message if no clubs
                            )}
                        </div>

                        {/* Customer Interaction/Engagement History */}
                        <div className="bg-white p-4 rounded-lg border border-gray-200 relative mb-6">
                            {/* Title */}
                            <h3 className="text-lg font-semibold absolute -top-4 left-4 bg-white px-2 z-10">Recent Activities</h3>
                            {/* Activity List */}
                            <div className="relative">
                                <div className="flex flex-col items-start">
                                    {customer.recentActivities && customer.recentActivities.map((activity, index) => (
                                        <div key={index} className="flex items-center mb-4 relative">
                                            
                                            {/* Activity Icon */}
                                            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200">
                                                {activity.type === 'Investment' && <FaBriefcase className="text-green-600" />}
                                                {activity.type === 'Normal Transaction' && <FaDollarSign className="text-blue-600" />}
                                                {activity.type === 'Normal Visit' && <FaUser className="text-yellow-600" />}
                                            </div>
                                            
                                            {/* Date and Description */}
                                            <div className="ml-4 flex items-center">
                                                <p className="text-sm font-semibold mr-4">{activity.date}</p>
                                                <div className="flex items-center">
                                                    <span>
                                                        {activity.type === 'Investment' && <strong>Investment: </strong>}
                                                        {activity.type === 'Normal Transaction' && <strong>Transaction: </strong>}
                                                        {activity.type === 'Normal Visit' && <strong>Visit: </strong>}
                                                    </span>
                                                    <p className="text-sm ml-1">{activity.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
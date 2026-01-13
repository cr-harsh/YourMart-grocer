import React from 'react'
import { TrendingUp, ShoppingBag, Wallet, Award, Clock } from 'lucide-react'

const About = () => {
    // Simulated User Data
    const stats = {
        totalSpent: 4250,
        orders: 12,
        saved: 380,
        favoriteCategory: 'Fresh Produce'
    }

    const spendingData = [
        { month: 'Jan', amount: 1200 },
        { month: 'Feb', amount: 900 },
        { month: 'Mar', amount: 2150 }, // Spike
        { month: 'Apr', amount: 1500 },
    ];
    
    const maxSpend = Math.max(...spendingData.map(d => d.amount));

    return (
        <div className='container mx-auto px-4 py-8 md:px-8 lg:px-12'>
            <div className='mb-8'>
                <h1 className='text-3xl font-bold text-gray-800'>My Insights</h1>
                <p className='text-gray-500'>Welcome back! Here's an analysis of your shopping habits.</p>
            </div>

            {/* Quick Stats Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10'>
                <div className='bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow'>
                    <div className='flex items-center gap-4'>
                        <div className='p-3 bg-green-100 text-green-600 rounded-lg'>
                           <Wallet />
                        </div>
                        <div>
                            <p className='text-xs text-gray-500 font-semibold uppercase'>Total Spent</p>
                            <h3 className='text-2xl font-bold text-gray-800'>₹{stats.totalSpent}</h3>
                        </div>
                    </div>
                </div>
                <div className='bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow'>
                    <div className='flex items-center gap-4'>
                        <div className='p-3 bg-blue-100 text-blue-600 rounded-lg'>
                           <ShoppingBag />
                        </div>
                        <div>
                            <p className='text-xs text-gray-500 font-semibold uppercase'>Total Orders</p>
                            <h3 className='text-2xl font-bold text-gray-800'>{stats.orders}</h3>
                        </div>
                    </div>
                </div>
                <div className='bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow'>
                    <div className='flex items-center gap-4'>
                        <div className='p-3 bg-purple-100 text-purple-600 rounded-lg'>
                           <Award />
                        </div>
                        <div>
                            <p className='text-xs text-gray-500 font-semibold uppercase'>Money Saved</p>
                            <h3 className='text-2xl font-bold text-gray-800'>₹{stats.saved}</h3>
                        </div>
                    </div>
                </div>
                <div className='bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow'>
                    <div className='flex items-center gap-4'>
                        <div className='p-3 bg-orange-100 text-orange-600 rounded-lg'>
                           <TrendingUp />
                        </div>
                        <div>
                            <p className='text-xs text-gray-500 font-semibold uppercase'>Top Category</p>
                            <h3 className='text-lg font-bold text-gray-800 line-clamp-1'>{stats.favoriteCategory}</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                {/* Spending Chart */}
                <div className='lg:col-span-2 bg-white p-6 rounded-xl border border-gray-100 shadow-sm'>
                    <div className="flex justify-between items-center mb-6">
                        <h3 className='text-lg font-bold text-gray-800'>Monthly Spending</h3>
                        <span className="text-sm text-green-600 font-medium flex items-center gap-1">+12% <TrendingUp className="w-3 h-3"/></span>
                    </div>
                    
                    <div className='h-64 flex items-end justify-between gap-4'>
                        {spendingData.map((data, idx) => (
                            <div key={idx} className='w-full flex flex-col items-center group'>
                                <div className="relative w-full flex justify-center h-full items-end">
                                    {/* Tooltip */}
                                    <div className="absolute -top-10 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity mb-2">
                                        ₹{data.amount}
                                    </div>
                                    {/* Bar */}
                                    <div 
                                        className='w-full max-w-[50px] bg-green-500 rounded-t-lg transition-all duration-500 hover:bg-green-600 group-hover:shadow-lg'
                                        style={{ height: `${(data.amount / maxSpend) * 100}%` }}
                                    ></div>
                                </div>
                                <p className='mt-3 text-sm font-medium text-gray-500'>{data.month}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column: Recommendations? History? */}
                 <div className='bg-green-50/50 p-6 rounded-xl border border-green-100'>
                    <h3 className='text-lg font-bold text-gray-800 mb-4'>Shopping Tip</h3>
                    <div className="p-4 bg-white rounded-lg shadow-sm border border-green-100 mb-4">
                        <p className="text-sm text-gray-600 italic">"Based on your history, you buy <strong>Milk</strong> every Tuesday. Don't forget to stock up!"</p>
                    </div>
                    <h3 className='text-lg font-bold text-gray-800 mb-4 mt-6'>Recent Activity</h3>
                    <ul className="space-y-4">
                        {[1,2,3].map((_, i) => (
                             <li key={i} className="flex gap-3 items-start pb-3 border-b border-green-100 last:border-0">
                                <div className="p-2 bg-white rounded-full text-green-600">
                                    <Clock className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-700">Order #{20240 + i}</p>
                                    <p className="text-xs text-gray-500">2 days ago • ₹1,200</p>
                                </div>
                             </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default About

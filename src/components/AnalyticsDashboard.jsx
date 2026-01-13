import React from 'react';
import { useSelector } from 'react-redux';
import { selectAnalyticsData, selectUserPersona } from '../Redux/UserBehaviorSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp, Eye, Activity, Award } from 'lucide-react';

const AnalyticsDashboard = ({ isOpen, onClose }) => {
    const data = useSelector(selectAnalyticsData);
    const persona = useSelector(selectUserPersona);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                />
                
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-violet-600 to-indigo-600 p-6 text-white text-center relative">
                        <button onClick={onClose} className="absolute top-4 right-4 p-1 hover:bg-white/20 rounded-full transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-md border border-white/30">
                            <Award className="w-8 h-8 text-yellow-300" />
                        </div>
                        <h2 className="text-2xl font-bold">Your Shopping DNA</h2>
                        <span className="inline-block mt-2 px-3 py-1 bg-black/20 rounded-full text-xs font-semibold uppercase tracking-wider border border-white/10">
                            {persona}
                        </span>
                    </div>

                    {/* Stats Grid */}
                    <div className="p-6 grid grid-cols-2 gap-4">
                        <div className="bg-violet-50 p-4 rounded-xl border border-violet-100 group hover:border-violet-300 transition-colors">
                            <div className="flex items-center gap-2 text-violet-600 mb-2">
                                <Activity className="w-4 h-4" />
                                <span className="text-xs font-bold uppercase">Engagement Score</span>
                            </div>
                            <h3 className="text-3xl font-bold text-gray-800 group-hover:scale-110 transition-transform origin-left">
                                {data.engagementScore}
                            </h3>
                            <p className="text-[10px] text-gray-500 mt-1">Points earned</p>
                        </div>

                        <div className="bg-pink-50 p-4 rounded-xl border border-pink-100 group hover:border-pink-300 transition-colors">
                            <div className="flex items-center gap-2 text-pink-600 mb-2">
                                <Eye className="w-4 h-4" />
                                <span className="text-xs font-bold uppercase">Top Interest</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 line-clamp-1">
                                {data.mostViewedCategory}
                            </h3>
                            <p className="text-[10px] text-gray-500 mt-1">Most viewed category</p>
                        </div>
                    </div>

                    {/* Chart Section (Simulated) */}
                    <div className="px-6 pb-6">
                        <div className="flex items-center gap-2 mb-4">
                            <TrendingUp className="w-4 h-4 text-green-600" />
                            <h4 className="font-bold text-gray-700 text-sm">Spending Activity</h4>
                        </div>
                        <div className="h-24 flex items-end gap-2 justify-between px-2">
                            {data.spendingTrend.map((val, idx) => (
                                <motion.div 
                                    key={idx}
                                    initial={{ height: 0 }}
                                    animate={{ height: `${(val / 800) * 100}%` }}
                                    transition={{ delay: idx * 0.1, type: 'spring' }}
                                    className="w-full bg-indigo-100 hover:bg-indigo-300 rounded-t-md relative group cursor-pointer"
                                >
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                        ₹{val}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        <div className="flex justify-between mt-2 text-[10px] text-gray-400 font-medium">
                            <span>Mon</span>
                            <span>Tue</span>
                            <span>Wed</span>
                            <span>Thu</span>
                            <span>Fri</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default AnalyticsDashboard;

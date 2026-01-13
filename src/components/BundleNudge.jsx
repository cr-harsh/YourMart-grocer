import React from 'react';
import { useSelector } from 'react-redux';
import { selectBundleOpportunities } from '../Redux/UserBehaviorSlice';
import { Zap, TrendingDown, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const BundleNudge = () => {
    const opportunities = useSelector(selectBundleOpportunities);

    if (opportunities.length === 0) return null;

    // Show only the top priority opportunity
    const topOffer = opportunities[0];

    return (
        <AnimatePresence>
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-4 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl p-4 text-white shadow-lg shadow-indigo-200 relative overflow-hidden"
            >
                {/* Decorative circles */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10 blur-xl"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full -ml-8 -mb-8 blur-lg"></div>

                <div className="relative z-10 flex items-start gap-3">
                    <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                        {topOffer.type === 'cross_sell' ? <Zap className="w-5 h-5 text-yellow-300 fill-yellow-300" /> : <TrendingDown className="w-5 h-5 text-yellow-300" />}
                    </div>
                    <div>
                        <h4 className="font-bold text-sm text-white/95">Unlock {topOffer.discountPercent}% Savings</h4>
                        <p className="text-xs text-indigo-100 mt-1 leading-relaxed">
                            {topOffer.message}
                        </p>
                    </div>
                </div>
                
                {/* Progress Bar or Action Hint */}
                <div className="mt-3 relative h-1.5 bg-black/20 rounded-full overflow-hidden">
                     <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: topOffer.type === 'cross_sell' ? '80%' : (topOffer.type === 'bulk_discount' ? '66%' : '50%') }}
                        className="h-full bg-yellow-400 rounded-full shadow-[0_0_10px_rgba(250,204,21,0.5)]"
                     />
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default BundleNudge;

import React from 'react';
import { useSelector } from 'react-redux';
import { Lock, Unlock, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DealUnlock = () => {
    const { cart } = useSelector(state => state.cart);
    
    const cartTotal = cart.reduce((total, item) => total + item.price * item.unit, 0);
    
    
    let target = 0;
    let reward = '';
    let discount = 0;

    if (cartTotal > 100 && cartTotal < 500) {
        target = 500;
        reward = '5% Extra Off';
        discount = 0.05;
    } else if (cartTotal >= 500 && cartTotal < 1000) {
        target = 1000;
        reward = '10% Extra Off';
        discount = 0.10;
    } else {
        return null; 
    }

    const progress = Math.min((cartTotal / target) * 100, 100);
    const amountNeeded = target - cartTotal;

    return (
        <div className="mb-4 relative overflow-hidden rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 p-4 text-white shadow-lg">
            <div className="flex items-center justify-between mb-2 z-10 relative">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-white/20 backdrop-blur-sm rounded-full">
                       <Zap className="w-4 h-4 text-yellow-300 fill-yellow-300" />
                    </div>
                    <span className="font-bold text-sm">Unlock {reward}</span>
                </div>
                <span className="text-xs font-medium bg-black/20 px-2 py-0.5 rounded-full">
                    Add ₹{amountNeeded.toFixed(0)} more
                </span>
            </div>
            
                        <div className="w-full bg-black/20 h-1.5 rounded-full overflow-hidden">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                />
            </div>
                        <div className="absolute -right-4 -bottom-8 w-24 h-24 bg-white/10 rounded-full blur-xl" />
            <div className="absolute -left-4 -top-8 w-20 h-20 bg-yellow-400/20 rounded-full blur-xl" />
        </div>
    );
};

export default DealUnlock;

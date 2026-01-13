import React from 'react';
import { useSelector } from 'react-redux';
import { selectContextualSuggestions, selectTopCategories } from '../Redux/UserBehaviorSlice';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Representative images for categories (mock data helper)
const categoryImages = {
    'Dairy': "https://cdn-icons-png.flaticon.com/512/2153/2153788.png",
    'Bakery': "https://cdn-icons-png.flaticon.com/512/992/992747.png",
    'Vegetables': "https://cdn-icons-png.flaticon.com/512/2153/2153786.png",
    'Fruits': "https://cdn-icons-png.flaticon.com/512/1625/1625048.png",
    'Snacks': "https://cdn-icons-png.flaticon.com/512/2553/2553691.png"
};

const HomeSmartNudge = () => {
    const navigate = useNavigate();
    const suggestions = useSelector(selectContextualSuggestions);
    const topCategories = useSelector(selectTopCategories);

    // Don't show if no data (new user) or no suggestions
    if (topCategories.length === 0) return null;

    const targetCategory = suggestions.length > 0 ? suggestions[0] : topCategories[0];

    return (
        <section className="py-8 bg-gradient-to-r from-indigo-50 to-violet-50 border-y border-indigo-100">
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md animate-pulse">
                            <Sparkles className="w-8 h-8 text-violet-500 fill-violet-200" />
                        </div>
                        <div>
                            <motion.h3 
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="text-xl font-bold text-gray-800"
                            >
                                {suggestions.length > 0 ? "Don't forget your essentials!" : "Pick up where you left off"}
                            </motion.h3>
                            <p className="text-gray-600 text-sm mt-1">
                                {suggestions.length > 0 
                                    ? `It looks like you usually buy ${targetCategory}. Add it now?`
                                    : `You seem to love ${targetCategory}. Check out what's new.`
                                }
                            </p>
                        </div>
                    </div>

                    <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="bg-white p-4 rounded-xl shadow-sm border border-indigo-100 flex items-center gap-4 cursor-pointer min-w-[300px]"
                        onClick={() => navigate(`/shop?category=${targetCategory}`)}
                    >
                        <img 
                            src={categoryImages[targetCategory] || categoryImages['Snacks']} 
                            alt={targetCategory} 
                            className="w-16 h-16 object-contain"
                        />
                        <div className="flex-1">
                            <h4 className="font-bold text-gray-800">Shop {targetCategory}</h4>
                            <span className="text-xs text-green-600 font-semibold bg-green-50 px-2 py-0.5 rounded-full">
                                Recommended for you
                            </span>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                            <ArrowRight className="w-4 h-4 text-indigo-600" />
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default HomeSmartNudge;

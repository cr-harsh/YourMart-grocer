import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const categories = [
    { name: "Vegetables", image: "https://cdn-icons-png.flaticon.com/512/2153/2153786.png", color: "bg-green-50" },
    { name: "Fruits", image: "https://cdn-icons-png.flaticon.com/512/1625/1625048.png", color: "bg-orange-50" },
    { name: "Dairy", image: "https://cdn-icons-png.flaticon.com/512/2153/2153788.png", color: "bg-blue-50" },
    { name: "Bakery", image: "https://cdn-icons-png.flaticon.com/512/992/992747.png", color: "bg-yellow-50" },
    { name: "Snacks", image: "https://cdn-icons-png.flaticon.com/512/2553/2553691.png", color: "bg-red-50" },
    { name: "Oil", image: "https://cdn-icons-png.flaticon.com/512/6004/6004940.png", color: "bg-yellow-50" },
    { name: "Besan", image: "https://cdn-icons-png.flaticon.com/512/5753/5753896.png", color: "bg-amber-50" },
    { name: "Meat", image: "https://cdn-icons-png.flaticon.com/512/1134/1134447.png", color: "bg-rose-50" },
];

const CategoryCarousel = () => {
    const scrollRef = useRef(null);
    const navigate = useNavigate();

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = 300;
            current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <section className="py-12 bg-white relative">
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800">Shop by Category</h2>
                        <p className="text-gray-500 mt-2">Find everything you need for your kitchen</p>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={() => scroll('left')} className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 hover:border-green-500 hover:text-green-600 transition-all">
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button onClick={() => scroll('right')} className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 hover:border-green-500 hover:text-green-600 transition-all">
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div 
                    ref={scrollRef}
                    className="flex gap-6 overflow-x-auto no-scrollbar pb-8 snap-x snap-mandatory"
                >
                    {categories.map((cat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.05 }}
                            onClick={() => navigate(`/shop?category=${cat.name}`)}
                            className="flex-shrink-0 w-36 md:w-44 flex flex-col items-center gap-4 cursor-pointer group snap-start"
                        >
                            <div className={`${cat.color} w-36 h-36 md:w-44 md:h-44 rounded-full flex items-center justify-center relative overflow-hidden transition-all duration-300 group-hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] group-hover:-translate-y-2 border border-transparent group-hover:border-green-200`}>
                                <div className="absolute inset-0 bg-white/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
                                <img 
                                    src={cat.image} 
                                    alt={cat.name} 
                                    className="w-20 h-20 md:w-24 md:h-24 object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-sm" 
                                />
                            </div>
                            <h3 className="text-gray-700 font-bold group-hover:text-green-600 transition-colors">{cat.name}</h3>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoryCarousel;

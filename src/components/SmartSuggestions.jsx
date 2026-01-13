import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Sparkles, Plus } from 'lucide-react';
import { selectContextualSuggestions } from '../Redux/UserBehaviorSlice';
import { setCart } from '../Redux/CartSlice';
import { toast } from 'react-toastify';
import api from '../services/api'; 

const SmartSuggestions = () => {
    const dispatch = useDispatch();
    const suggestions = useSelector(selectContextualSuggestions);
    const { cart } = useSelector(state => state.cart);
    
   
    
    const representativeProducts = useMemo(() => ({
        'Dairy': { id: 101, name: "Amul Gold Milk", price: 34, image: "https://via.placeholder.com/100?text=Milk" },
        'Vegetables': { id: 8, name: "Onion (Nashik)", price: 36, image: "https://via.placeholder.com/100?text=Onion" },
        'Fruits': { id: 15, name: "Baby Banana", price: 32, image: "https://via.placeholder.com/100?text=Banana" },
        'Bakery': { id: 25, name: "Modern Bread", price: 36, image: "https://via.placeholder.com/100?text=Bread" },
        'Meat': { id: 22, name: "Rohu Fish", price: 369, image: "https://via.placeholder.com/100?text=Fish" },
    }), []); // Static map
    const displaySuggestions = suggestions.slice(0, 2).map(cat => ({ 
        category: cat, 
        ...representativeProducts[cat] 
    })).filter(item => item.id); 

    const handleAdd = (product) => {
         
         const newCartItem = {
             id: product.id,
             name: product.name,
             price: product.price,
             image: product.image, 
             category: product.category,
             unit: 1
         };
         
         
         dispatch(setCart([...cart, newCartItem]));
         toast.success(`Added ${product.name} to your bundle!`);
    };

    if (displaySuggestions.length === 0) return null;

    return (
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 mb-4">
            <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <h4 className="text-sm font-bold text-indigo-900">You usually buy...</h4>
            </div>
            <div className="space-y-3">
                {displaySuggestions.map((item) => (
                    <div key={item.category} className="flex items-center justify-between bg-white p-2 rounded-lg shadow-sm">
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 rounded-md bg-indigo-100 flex items-center justify-center text-xs text-indigo-700 font-bold">
                               {item.category[0]}
                           </div>
                           <div>
                               <p className="text-xs font-semibold text-gray-800">{item.name}</p>
                               <p className="text-[10px] text-gray-500">Frequently bought</p>
                           </div>
                        </div>
                        <button 
                            onClick={() => handleAdd(item)}
                            className="p-1.5 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-full transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SmartSuggestions;

import { ChevronRight, Truck, PartyPopper, X } from 'lucide-react'
import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CgClose } from 'react-icons/cg'
import { GiShoppingBag } from 'react-icons/gi'
import { LuNotebookText } from 'react-icons/lu'
import { MdDeliveryDining } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { setCart, addToCart, removeFromCart, updateQuantity, selectCartTotal } from '../Redux/CartSlice'
import BundleNudge from './BundleNudge'
import SmartSuggestions from './SmartSuggestions'

const CartComp = ({ isOpen, onClose }) => {
    const { cart } = useSelector(store => store.cart)
    const { subtotal, savings, finalTotal, isDiscountApplied } = useSelector(selectCartTotal);
    const dispatch = useDispatch()

    const increaseQuantity = (item) => {
        dispatch(updateQuantity({ id: item.id, quantity: item.unit + 1 }));
    }

    const decreaseQuantity = (item) => {
        if (item.unit > 1) {
            dispatch(updateQuantity({ id: item.id, quantity: item.unit - 1 }));
        } else {
            dispatch(removeFromCart(item.id));
        }
    }

    // FREE SHIPPING LOGIC
    const FREE_SHIPPING_THRESHOLD = 50;
    const progress = Math.min((finalTotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
    const isFreeShipping = finalTotal >= FREE_SHIPPING_THRESHOLD;
    const amountNeeded = FREE_SHIPPING_THRESHOLD - finalTotal;

    return (
      <AnimatePresence>
        {isOpen && (
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className={`fixed top-0 right-0 h-full w-full md:w-[450px] bg-white shadow-2xl z-50 flex flex-col`}
            >
               {/* Header */}
               <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    Your Cart 
                    <span className="text-sm font-normal text-gray-500">({cart.length} items)</span>
                  </h2>
                  <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                    <CgClose className="w-5 h-5 text-gray-600"/>
                  </button>
               </div>

               {/* Scrollable Content */}
               <div className="p-5 h-[calc(100%-180px)] overflow-y-auto no-scrollbar">
                  
                  {/* SMART ASSISTANT MODULES */}
                  {cart.length > 0 && (
                      <>
                        <BundleNudge />
                        <SmartSuggestions />
                      </>
                  )}
                  
                  {/* Free Shipping Bar */}
                  {cart.length > 0 && (
                    <div className="mb-6 bg-green-50/50 p-4 rounded-xl border border-green-100">
                         <div className="flex justify-between items-center mb-2">
                            <span className={`text-sm font-semibold flex items-center gap-2 ${isFreeShipping ? 'text-green-700' : 'text-gray-700'}`}>
                                {isFreeShipping ? <PartyPopper className="w-4 h-4 text-green-600" /> : <Truck className="w-4 h-4 text-gray-500" />}
                                {isFreeShipping ? "Free Shipping Unlocked!" : "Add items for Free Shipping"}
                            </span>
                            <span className="text-xs font-bold text-gray-500">{Math.round(progress)}%</span>
                         </div>
                         <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                            <motion.div 
                               initial={{ width: 0 }}
                               animate={{ width: `${progress}%` }}
                               transition={{ duration: 0.5, ease: "easeOut" }}
                               className={`h-full ${isFreeShipping ? 'bg-gradient-to-r from-green-500 to-emerald-400' : 'bg-green-500'}`}
                            />
                         </div>
                         {!isFreeShipping && (
                            <p className="text-xs text-gray-500 mt-2">
                               Add <span className="font-bold text-gray-800">₹{amountNeeded.toFixed(2)}</span> more to qualify for free shipping.
                            </p>
                         )}
                    </div>
                  )}

                 {/* Cart Items */}
                 {cart.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-[50vh] text-center opacity-70">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <GiShoppingBag className="w-10 h-10 text-gray-400" />
                        </div>
                        <p className="text-gray-800 font-semibold text-lg">Your cart is empty</p>
                        <p className="text-sm text-gray-500 mt-2 max-w-[200px]">Looks like you haven't added anything to your cart yet.</p>
                        <button onClick={onClose} className="mt-6 px-6 py-2.5 bg-green-600 text-white rounded-full font-medium hover:bg-green-700 transition-colors shadow-lg shadow-green-200">
                            Start Shopping
                        </button>
                    </div>
                 ) : (
                    <div className="space-y-4">
                        {cart.map((product)=>{
                            return(
                                <motion.div 
                                    layout
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    key={product.id} 
                                    className="flex gap-4 p-3 bg-white border border-gray-100 rounded-xl hover:shadow-sm transition-shadow group"
                                >
                                    <div className="w-20 h-20 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                                       <img src={product.image} alt={product.name} className="w-full h-full object-cover mix-blend-multiply" />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-start">
                                                <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 leading-tight pr-2">{product.name}</h3>
                                                <button onClick={()=>dispatch(removeFromCart(product.id))} className="text-gray-400 hover:text-red-500 transition-colors p-1">
                                                    <X className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-0.5">{product.category}</p>
                                        </div>
                                        <div className="flex justify-between items-center mt-2">
                                            <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1">
                                                <button onClick={()=>decreaseQuantity(product)} className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm text-gray-600 hover:text-green-600 text-xs font-bold transition-colors">-</button>
                                                <span className="text-xs font-bold w-4 text-center">{product.unit}</span>
                                                <button onClick={()=>increaseQuantity(product)} className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm text-gray-600 hover:text-green-600 text-xs font-bold transition-colors">+</button>
                                            </div>
                                            <p className="font-bold text-gray-900">₹{(product.price * product.unit).toFixed(2)}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                 )}

                 {/* Bill Details */}
                 {cart.length > 0 && (
                     <div className='bg-gray-50/50 border border-gray-100 rounded-xl p-4 mt-6 space-y-3'>
                         <h1 className='text-gray-800 font-bold text-lg border-b border-gray-200 pb-2'>Bill Details</h1>
                         <div className='flex justify-between items-center text-sm'>
                             <div className='flex gap-2 items-center text-gray-600'><LuNotebookText className="text-gray-400" /> Item Total</div>
                             <p className='text-gray-800 font-medium'>₹{subtotal.toFixed(2)}</p>
                         </div>
                         
                         {/* Savings Row - Only show if savings exist */}
                         {isDiscountApplied && (
                             <div className='flex justify-between items-center text-sm animate-in fade-in slide-in-from-right-4'>
                                 <div className='flex gap-2 items-center text-green-600 font-semibold'><PartyPopper className="w-4 h-4" /> Total Savings</div>
                                 <p className='text-green-600 font-bold'>- ₹{savings.toFixed(2)}</p>
                             </div>
                         )}

                         <div className='flex justify-between items-center text-sm'>
                             <div className='flex gap-2 items-center text-gray-600'><MdDeliveryDining className="text-gray-400" /> Delivery Fee</div>
                             <p className={`${isFreeShipping ? 'text-green-600' : 'text-gray-800'} font-medium`}>
                                 {isFreeShipping ? <span className="font-bold">FREE</span> : `₹15.00`}
                             </p>
                         </div>
                         <div className='flex justify-between items-center text-sm'>
                             <div className='flex gap-2 items-center text-gray-600'><GiShoppingBag className="text-gray-400" /> Handling Fee</div>
                             <p className='text-gray-800 font-medium'>₹2.00</p>
                         </div>
                         <div className='border-t border-gray-200 pt-3 flex justify-between items-center'>
                             <h1 className='font-bold text-lg text-gray-800'>Grand Total</h1>
                             <p className='font-bold text-lg text-green-600'>₹{(finalTotal + (isFreeShipping ? 0 : 15) + 2).toFixed(2)}</p>
                         </div>
                     </div>
                 )}
               </div>
                
               {
                   cart.length > 0 && (
                       <div className='p-4 bg-white border-t border-gray-200'>
                           <button className='w-full bg-green-600 hover:bg-green-700 text-white py-3.5 px-4 rounded-xl flex justify-between items-center shadow-lg shadow-green-200 active:scale-[0.98] transition-all group'>
                               <div className="text-left">
                                   <p className="text-xs font-medium opacity-90 text-green-100">Total Payable</p>
                                   <h1 className='font-bold text-lg'>₹{(finalTotal + (isFreeShipping ? 0 : 15) + 2).toFixed(2)}</h1>
                               </div>
                               <div className='flex gap-2 items-center font-bold text-sm bg-white/20 py-1.5 px-3 rounded-lg group-hover:bg-white/30 transition-colors'>
                                   <span>Checkout</span>
                                   <ChevronRight className="w-4 h-4" />
                               </div>
                           </button>
                       </div>
                   )
               }
            </motion.div>
        )}
      </AnimatePresence>
    )
}

export default CartComp
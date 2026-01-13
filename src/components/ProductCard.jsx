import { ShoppingCart } from 'lucide-react'
import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { setCart } from '../Redux/CartSlice'
import { logInteraction } from '../Redux/UserBehaviorSlice'
import { toast } from 'react-toastify'

const ProductCard = ({product}) => {

  const dispatch = useDispatch()
  const {cart} = useSelector(store => store.cart)
  const imgRef = useRef(null)
  const cardRef = useRef(null)

  // Track 'view' interaction
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
           // Log view after 500ms of visibility to avoid fast scroll noise
           const timer = setTimeout(() => {
              dispatch(logInteraction({ type: 'view', product }));
           }, 500);
           
           return () => clearTimeout(timer);
        }
      },
      { threshold: 0.5 } // Trigger when 50% visible
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [product, dispatch]);

  const addToCart = (product)=>{
    // Log 'add' interaction
    dispatch(logInteraction({ type: 'add', product }));

    // Trigger Fly Animation
    if (imgRef.current) {
      const rect = imgRef.current.getBoundingClientRect();
      window.dispatchEvent(new CustomEvent('fly-to-cart', {
        detail: {
          startRect: rect,
          image: product.image
        }
      }));
    }

    const productExists = cart.some(item => item.id === product.id);
    if(productExists){
      const updatedCart = cart.map(item => 
        item.id === product.id 
          ? { ...item, unit: (item.unit || 1) + 1 }
          : item
      );
      dispatch(setCart(updatedCart));
      toast.info("Product quantity updated!")
    }else {
      dispatch(setCart([...cart, { ...product, unit: 1 }])); //Add product if not already in cart
      toast.success("Added to cart!")
    }
  }
  return (
    <motion.div 
      ref={cardRef}
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
      transition={{ duration: 0.3 }}
      className='overflow-hidden border border-gray-100 rounded-xl bg-white group shadow-sm hover:shadow-lg transition-all'
    >
      <div>
        <div className='aspect-square relative bg-gray-50 overflow-hidden'>
            <motion.img 
              ref={imgRef}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.5 }}
              src={product.image} 
              alt={product.name} 
              className='object-cover w-full h-[195px] mix-blend-multiply'
            />
            {/* Quick Badge */}
            <div className="absolute top-2 left-2 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-md text-[10px] font-bold text-gray-600 border border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity">
               {product.category}
            </div>
        </div>
        <div className='px-4 pt-3 pb-1 bg-white'>
            <p className='text-xs font-semibold text-green-600 uppercase tracking-wider mb-1'>{product.category}</p>
            <h3 className='font-bold text-sm h-[40px] text-gray-800 line-clamp-2 leading-tight group-hover:text-green-700 transition-colors'>{product.name}</h3>
            {/* <p className='text-xs text-gray-500 mt-1'>{product.quantity || "1 Unit"}</p> */}
            <div className="flex items-center justify-between mt-2">
               <p className='font-bold text-lg text-gray-900'>₹{product.price?.toFixed(2)}</p>
               {/* Rating or Review count could go here */}
            </div>
        </div>
      </div>
      <div className='p-4 pt-2 bg-white'>
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={()=>addToCart(product)} 
          className='w-full bg-gray-900 hover:bg-green-600 text-white flex items-center justify-center py-2.5 rounded-lg cursor-pointer transition-all shadow-md hover:shadow-green-200 font-medium text-sm gap-2'
        >
          <ShoppingCart className='w-4 h-4'/> Add to Cart
        </motion.button>
      </div>
    </motion.div>
  )
}

export default ProductCard
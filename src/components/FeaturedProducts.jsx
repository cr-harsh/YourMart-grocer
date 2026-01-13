import React from 'react'
import { products } from '../Utilities/Data'
import ProductCard from './ProductCard'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Flame } from 'lucide-react'

const FeaturedProducts = () => {
  return (
    <section className='py-16 px-4 md:px-0 bg-gray-50/50'>
      <div className='max-w-6xl mx-auto'>
        <div className='flex items-center gap-2 mb-8'>
            <div className='bg-orange-100 p-2 rounded-full animate-pulse'>
                <Flame className='w-6 h-6 text-orange-500 fill-orange-500' />
            </div>
            <h2 className='text-3xl font-bold text-gray-800 tracking-tight'>Weekly Best Sellers</h2>
        </div>
        
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6'>
            {
                products.slice(0,5).map((product, idx) => {
                    return (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <ProductCard product={product}/>
                        </motion.div>
                    )
                })
            }
        </div>
        <div className='mt-12 text-center'>
            <Link to={'/shop'}>
                <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className='rounded-full cursor-pointer bg-green-600 text-white py-3 px-8 font-semibold shadow-lg hover:shadow-green-200 transition-all'
                >
                    View Categories
                </motion.button>
            </Link>
        </div>
      </div>
    </section>
  )
}

export default FeaturedProducts;
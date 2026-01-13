import React from 'react'
import { motion } from 'framer-motion'
import HeroImg from "../assets/Hero1.png"
import { Link } from 'react-router-dom'

const Hero = () => {
    return (
        <section className='relative bg-gradient-to-br from-green-600 via-green-500 to-emerald-600 text-white mt-12 md:mt-15 overflow-hidden'>
            <div className='max-w-6xl mx-auto py-16 flex flex-col md:flex-row items-center px-6 md:px-0 gap-7'>
                <motion.div 
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className='md:w-1/2 mb-8 md:mb-0 z-10'
                >
                    <h1 className='text-4xl md:text-5xl font-bold mb-4'>Fresh <span className='text-yellow-300 font-extrabold'>Groceries</span> Delivered to Your Door</h1>
                    <p className='text-lg mb-6 text-green-50'>Shop from our wide selection of fresh fruits, vegetables, dairy, and more. Get same-day delivery!</p>
                    <div className='flex flex-wrap gap-4 items-center'>
                        <Link to={'/shop'}><button className='cursor-pointer bg-white text-green-600 hover:bg-green-50 rounded-full px-8 py-3 font-bold transition-all shadow-lg hover:shadow-xl hover:scale-105'>Shop Now</button></Link>
                        <Link to={'/about'}><button className='text-white cursor-pointer border-2 border-white bg-transparent hover:bg-white/20 rounded-full px-8 py-3 font-semibold transition-all hover:scale-105'>Learn More</button></Link>
                    </div>
                </motion.div>
                <div className='relative flex justify-center'>
                    <motion.div 
                       initial={{ opacity: 0, scale: 0.8 }}
                       animate={{ opacity: 1, scale: 1 }}
                       transition={{ duration: 0.8, delay: 0.2 }}
                       className='relative'
                    >
                         <div className='absolute inset-0 bg-white/10 rounded-full blur-3xl transform -translate-y-4'></div>
                         <motion.img 
                            src={HeroImg} 
                            alt="Fresh Groceries" 
                            className='z-10 relative drop-shadow-2xl'
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                         />
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default Hero
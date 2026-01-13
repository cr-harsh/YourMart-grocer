import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import HeroImg from "../assets/Hero1.png"
import { Link } from 'react-router-dom'
import { ArrowRight, Star, Clock, ShieldCheck, ShoppingBag } from 'lucide-react'

const Hero = () => {
    // Parallax effect for the image
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 300], [0, 100]);
    const y2 = useTransform(scrollY, [0, 300], [0, -50]);

    return (
        <section className='relative bg-gradient-to-br from-green-600 via-green-500 to-emerald-700 text-white pt-24 pb-20 md:pt-32 md:pb-24 overflow-hidden'>
            
            {/* Background Texture/Blobs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-[20%] -right-[10%] w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl opacity-50"
                />
                <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[40%] -left-[10%] w-[400px] h-[400px] bg-yellow-300/10 rounded-full blur-3xl opacity-30"
                />
            </div>

            <div className='container mx-auto px-6 relative z-10'>
                <div className='flex flex-col md:flex-row items-center gap-10 lg:gap-20'>
                    
                    {/* Left Content */}
                    <div className='md:w-1/2 text-center md:text-left'>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-green-50 text-sm font-semibold mb-6 border border-white/20"
                        >
                            <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
                            <span>Rated #1 Smart Grocery App</span>
                        </motion.div>

                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className='text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 tracking-tight'
                        >
                            Smart Shopping <br/>
                            <span className='text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-100'>Fresh Living</span>
                        </motion.h1>

                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className='text-lg md:text-xl text-green-50/90 mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed'
                        >
                            Experience the future of grocery shopping with AI-powered suggestions and dynamic bundle savings.
                        </motion.p>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className='flex flex-wrap gap-4 justify-center md:justify-start'
                        >
                            <Link to={'/shop'}>
                                <button className='group relative px-8 py-4 bg-white text-green-700 rounded-full font-bold text-lg shadow-lg hover:shadow-green-900/20 hover:scale-105 transition-all flex items-center gap-2'>
                                    Start Shopping
                                    <ShoppingBag className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                                </button>
                            </Link>
                            <Link to={'/about'}>
                                <button className='px-8 py-4 bg-green-700/30 hover:bg-green-700/50 backdrop-blur-md border border-white/20 text-white rounded-full font-semibold text-lg transition-all flex items-center gap-2'>
                                    How it Works
                                </button>
                            </Link>
                        </motion.div>

                        {/* Trust Badges */}
                        <motion.div 
                           initial={{ opacity: 0 }}
                           animate={{ opacity: 1 }}
                           transition={{ delay: 0.8 }}
                           className="md:pt-12 pt-8 flex items-center justify-center md:justify-start gap-8 text-green-100/60"
                        >
                            <div className="flex items-center gap-2">
                                <Clock className="w-5 h-5" />
                                <span className="text-sm font-medium">30 Min Delivery</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5" />
                                <span className="text-sm font-medium">100% Secure</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Image Area */}
                    <div className='md:w-1/2 relative flex justify-center'>
                        <motion.div 
                            style={{ y: y1 }}
                            className="relative z-10"
                        >
                             <motion.div
                                animate={{ rotate: [0, 5, -5, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                className="relative"
                             >
                                <img 
                                    src={HeroImg} 
                                    alt="Fresh Groceries" 
                                    className='w-[400px] md:w-[500px] drop-shadow-2xl z-20 relative'
                                />
                             </motion.div>

                             {/* Floating Cards */}
                             <motion.div 
                                style={{ y: y2 }}
                                animate={{ y: [-10, 10, -10] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -top-10 -right-4 md:right-0 bg-white p-3 rounded-2xl shadow-xl z-30 flex items-center gap-3 animate-wiggle"
                             >
                                 <div className="bg-green-100 p-2 rounded-full">
                                     <Star className="w-5 h-5 text-green-600 fill-green-600" />
                                 </div>
                                 <div className="pr-4">
                                     <p className="text-xs text-gray-400 font-bold uppercase">Rating</p>
                                     <p className="text-sm font-bold text-gray-800">4.9/5 stars</p>
                                 </div>
                             </motion.div>

                             <motion.div 
                                animate={{ y: [10, -10, 10] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute bottom-10 -left-6 bg-white p-3 rounded-2xl shadow-xl z-30 flex items-center gap-3"
                             >
                                 <div className="bg-yellow-100 p-2 rounded-full">
                                     <ShoppingBag className="w-5 h-5 text-yellow-600" />
                                 </div>
                                 <div className="pr-4">
                                     <p className="text-xs text-gray-400 font-bold uppercase">Daily Orders</p>
                                     <p className="text-sm font-bold text-gray-800">10k+ Delivered</p>
                                 </div>
                             </motion.div>
                        </motion.div>

                        {/* Orbiting Elements (Optional visual flair) */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-white/10 rounded-full z-0 animate-[spin_20s_linear_infinite]" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] border border-white/20 rounded-full z-0 animate-[spin_15s_linear_infinite_reverse]" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero
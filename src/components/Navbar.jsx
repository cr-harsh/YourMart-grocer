import React, { useState, useEffect, useRef } from 'react'
import Logo from "../assets/Logo.png"
import { ShoppingCart, Search, X, Clock, TrendingUp, ChevronRight, BarChart2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import CartComp from './CartComp'
import { useSelector } from 'react-redux'
import { HiMenuAlt1, HiMenuAlt3 } from 'react-icons/hi'
import ResponsiveMenu from './ResponsiveMenu'
import useSmartSearch from '../hooks/useSmartSearch'
import AnalyticsDashboard from './AnalyticsDashboard'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [isDashboardOpen, setIsDashboardOpen] = useState(false)
  const { cart } = useSelector(store => store.cart)

  const onClose = () => setIsOpen(false)
  const toggleNav = () => setIsNavOpen(!isNavOpen)

  // Smart Search Hook
  const { 
    query, 
    setQuery, 
    results, 
    isSearching, 
    history, 
    addToHistory, 
    suggestions 
  } = useSmartSearch();

  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e?.preventDefault()
    if(query.trim()){
      addToHistory(query);
      setShowSearchDropdown(false);
      navigate(`/shop?search=${query}`)
    }
  }

  const handleResultClick = (productName) => {
    setQuery(productName);
    addToHistory(productName);
    setShowSearchDropdown(false);
    navigate(`/shop?search=${productName}`);
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchRef]);

  // Cart Shake Animation
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    const handleCartArrival = () => {
       setIsShaking(true);
       setTimeout(() => setIsShaking(false), 300); // Shake duration
    };

    window.addEventListener('cart-item-arrived', handleCartArrival);
    return () => window.removeEventListener('cart-item-arrived', handleCartArrival);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto"
    return () => (document.body.style.overflow = "auto")
  }, [isOpen])

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-green-50 shadow-sm transition-all duration-300">
        <div className="container mx-auto flex justify-between items-center px-4 py-3 md:px-8 lg:px-12">

          {/* LOGO */}
          <Link to="/" className="flex items-center group">
            <img
              src={Logo}
              alt="YourMart Logo"
              className="h-14 md:h-16 w-auto object-contain hover:scale-105 transition-transform duration-300 transform origin-left"
            />
          </Link>

          {/* SMART SEARCH BAR - Desktop */}
          <div ref={searchRef} className='hidden lg:block flex-1 max-w-2xl mx-12 relative z-50'>
            <form onSubmit={handleSearch} className='relative group'>
               <div className={`flex items-center w-full transition-all duration-300 border ${showSearchDropdown ? 'border-green-500 ring-4 ring-green-500/10 rounded-t-2xl' : 'border-gray-200 rounded-full'} bg-gray-50/50 hover:bg-white`}>
                 <Search className={`ml-4 w-5 h-5 ${showSearchDropdown ? 'text-green-500' : 'text-gray-400'} transition-colors`} />
                 <input 
                   type="text" 
                   placeholder="Search for 'milk', 'bread'..." 
                   value={query}
                   onFocus={() => setShowSearchDropdown(true)}
                   onChange={(e) => setQuery(e.target.value)}
                   className='w-full py-3 px-4 bg-transparent focus:outline-none text-sm text-gray-700 placeholder-gray-400'
                 />
                 {query && (
                   <button type="button" onClick={() => setQuery('')} className='p-2 hover:bg-gray-100 rounded-full mr-2 transition-colors'>
                     <X className='w-4 h-4 text-gray-400' />
                   </button>
                 )}
                 <button type="submit" className={`mr-1.5 py-2 px-6 rounded-full text-xs font-semibold transition-all duration-300 ${query ? 'bg-green-600 text-white shadow-md hover:bg-green-700 hover:shadow-lg transform hover:-translate-y-0.5' : 'bg-gray-200 text-gray-400 cursor-not-allowed hidden'}`}>
                   Search
                 </button>
               </div>
            </form>

            {/* SEARCH DROPDOWN */}
            {showSearchDropdown && (
              <div className="absolute top-full left-0 right-0 bg-white border border-t-0 border-gray-100 rounded-b-2xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="p-2">
                  
                  {/* Loading State */}
                  {isSearching && (
                    <div className="p-4 flex items-center justify-center space-x-2 text-green-600">
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-sm font-medium">Searching...</span>
                    </div>
                  )}

                  {/* Empty State / Suggestions */}
                  {!query && !isSearching && (
                    <div className="p-2">
                      {history.length > 0 && (
                        <div className="mb-4">
                          <h4 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                            <Clock className="w-3 h-3" /> Recent Searches
                          </h4>
                          <div className="flex flex-wrap gap-2 px-2">
                            {history.map((term, idx) => (
                              <button 
                                key={idx}
                                onClick={() => handleResultClick(term)}
                                className="px-3 py-1.5 bg-gray-50 hover:bg-green-50 text-gray-600 hover:text-green-700 text-sm rounded-lg transition-colors border border-transparent hover:border-green-100"
                              >
                                {term}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div>
                        <h4 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                          <TrendingUp className="w-3 h-3 text-red-400" /> Trending Now
                        </h4>
                        <div className="space-y-1">
                          {suggestions.map((item) => (
                            <div 
                              key={item.id}
                              onClick={() => handleResultClick(item.name)}
                              className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer group transition-colors"
                            >
                               <div className="w-8 h-8 rounded-md bg-gray-100 overflow-hidden">
                                 <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                               </div>
                               <span className="text-sm text-gray-700 group-hover:text-green-700 font-medium">{item.name}</span>
                               <ChevronRight className="w-4 h-4 text-gray-300 ml-auto group-hover:text-green-400 group-hover:translate-x-1 transition-all" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Live Results */}
                  {query && !isSearching && results.length > 0 && (
                    <div>
                      <h4 className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider bg-gray-50/50">
                        Products
                      </h4>
                      {results.slice(0, 5).map((product) => (
                         <div 
                           key={product.id}
                           onClick={() => handleResultClick(product.name)}
                           className="flex items-center gap-4 p-3 hover:bg-green-50/50 cursor-pointer border-b border-gray-50 last:border-0 transition-colors group"
                         >
                            <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover shadow-sm group-hover:shadow transition-all" />
                            <div>
                              <p className="text-sm font-medium text-gray-800 group-hover:text-green-700">{product.name}</p>
                              <p className="text-xs text-gray-500">{product.category}</p>
                            </div>
                            <span className="ml-auto text-sm font-bold text-green-600">₹{product.price}</span>
                         </div>
                      ))}
                      <button 
                        onClick={handleSearch}
                        className="w-full py-3 text-center text-sm text-green-600 font-medium hover:bg-green-50 transition-colors border-t border-gray-100"
                      >
                        View all results for "{query}"
                      </button>
                    </div>
                  )}

                  {/* No Results */}
                  {query && !isSearching && results.length === 0 && (
                     <div className="p-8 text-center">
                        <p className="text-gray-500 text-sm">No products found for "{query}"</p>
                     </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* MENU */}
          <nav className="flex items-center gap-6">
            <ul className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-600 tracking-wide">
              <Link to="/"><li className="hover:text-green-600 transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-green-600 after:transition-all hover:after:w-full">Home</li></Link>
              <Link to="/shop"><li className="hover:text-green-600 transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-green-600 after:transition-all hover:after:w-full">Shop</li></Link>
              <Link to="/about"><li className="hover:text-green-600 transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-green-600 after:transition-all hover:after:w-full">About</li></Link>
              <Link to="/contact"><li className="hover:text-green-600 transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-green-600 after:transition-all hover:after:w-full">Contact</li></Link>
            </ul>

            {/* ICONS */}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsDashboardOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors group hidden md:block" // Hidden on mobile for space
                title="Your Stats"
              >
                <BarChart2 className="w-6 h-6 text-gray-600 group-hover:text-indigo-600 transition-colors" />
              </button>

              <button
                id="cart-icon-btn"
                onClick={() => setIsOpen(true)}
                className={`relative p-2 hover:bg-gray-100 rounded-full transition-all group ${isShaking ? 'animate-[wiggle_0.3s_ease-in-out]' : ''}`}
              >
                <ShoppingCart className={`w-6 h-6 text-gray-700 group-hover:text-green-600 transition-colors ${isShaking ? 'text-green-600' : ''}`} />
                {cart.length > 0 && (
                  <span className="absolute top-0 right-0 bg-green-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-sm animate-bounce">
                    {cart.length}
                  </span>
                )}
              </button>

              <button
                onClick={toggleNav}
                className="md:hidden p-2 text-gray-700 hover:text-green-600 hover:bg-gray-100 rounded-full transition-all focus:outline-none"
              >
                {isNavOpen ? (
                  <HiMenuAlt3 className="h-6 w-6" />
                ) : (
                  <HiMenuAlt1 className="h-6 w-6" />
                )}
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isNavOpen && (
        <ResponsiveMenu
          isNavOpen={isNavOpen}
          setIsNavOpen={setIsNavOpen}
        />
      )}

      {/* CART OVERLAY */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      <CartComp isOpen={isOpen} onClose={onClose} />
      
      <AnalyticsDashboard isOpen={isDashboardOpen} onClose={() => setIsDashboardOpen(false)} />
    </>
  )
}

export default Navbar

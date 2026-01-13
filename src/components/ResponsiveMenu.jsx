import React from 'react'
import { FaChevronRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const ResponsiveMenu = ({isNavOpen, setIsNavOpen}) => {
  return (
    <div className={`${isNavOpen ? "left-0":"-left-[100%]"} fixed bottom-0 top-0 z-20 flex h-screen w-[75%] flex-col justify-between bg-white border-r border-green-100 px-8 pb-6 pt-16 text-gray-800 md:hidden rounded-r-xl shadow-lg transition-all`}>
      <div>
        <div>
            <h1 className='text-green-600 text-3xl font-bold'>YourMart</h1>
        </div>
        <nav className='mt-12'>
            <ul className='flex flex-col gap-7 text-xl font-semibold'>
            <Link to={'/'} className="cursor-pointer hover:text-green-600 transition-colors" onClick={()=>setIsNavOpen(false)}><li>Home</li></Link>
                <Link to={'/shop'} className="cursor-pointer hover:text-green-600 transition-colors" onClick={()=>setIsNavOpen(false)}><li>Shop</li></Link>
                <Link to={'/about'} className="cursor-pointer hover:text-green-600 transition-colors" onClick={()=>setIsNavOpen(false)}><li>About</li></Link>
                <Link to={'/contact'} className="cursor-pointer hover:text-green-600 transition-colors" onClick={()=>setIsNavOpen(false)}><li>Contact</li></Link>
                <Link><button onClick={()=>setIsNavOpen(false)} className='px-3 py-1 w-max rounded-md bg-green-600 hover:bg-green-700 text-white flex items-center gap-1 transition-colors'>Login<FaChevronRight/></button></Link>
            </ul>
        </nav>
      </div>
      <div>
        <h1>
            Made with ❤️ by Harsh Bhuteja
        </h1>
      </div>
    </div>
  )
}

export default ResponsiveMenu
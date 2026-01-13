import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-12 px-4 md:px-0">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">YourMart</h3>
                        <p className="mb-4">Your one stop shop for fresh groceries delivered to your doorstep.</p>
                        <div className="mt-3">
                            <h3 className="font-medium mb-4">Follow Us</h3>
                            <div className="flex space-x-4">
                                <FaFacebook className="w-5 h-5 text-white cursor-pointer hover:text-green-400 transition-colors" />  
                                <FaInstagram className="w-5 h-5 text-white cursor-pointer hover:text-green-400 transition-colors" />  
                                <FaTwitter className="w-5 h-5 text-white cursor-pointer hover:text-green-400 transition-colors" />  
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold mb-4">Quick links</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-green-400 transition-colors">Home</a></li>
                            <li><a href="#" className="hover:text-green-400 transition-colors">Shop</a></li>
                            <li><a href="#" className="hover:text-green-400 transition-colors">About</a></li>
                            <li><a href="#" className="hover:text-green-400 transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold mb-4">Customer Service</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-green-400 transition-colors">Contact Us</a></li>
                            <li><a href="#" className="hover:text-green-400 transition-colors">Shipping Information</a></li>
                            <li><a href="#" className="hover:text-green-400 transition-colors">Returns & Refunds</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-4">Newsletter</h3>
                        <p className="text-sm mb-4">123 grocery St , Food City</p>
                        <p className="text-sm mb-4">phone : (123) 456-7890</p>
                        <p className="text-sm mb-4">Email : info@yourmart.com</p>
                        
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-700 text-center">
                    <p>&copy; {new Date().getFullYear()} YourMart. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
import React from 'react';
import { motion } from 'framer-motion';

const Policy = () => {
  return (
    <div className='max-w-4xl mx-auto my-28 px-4 lg:px-0'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className='text-3xl font-bold mb-8 text-gray-800 text-center'>Store Policies</h1>

        <div className='space-y-8'>
            {/* Shipping Policy */}
            <section id="shipping" className='bg-white p-6 rounded-lg border border-gray-200 shadow-sm'>
                <h2 className='text-xl font-semibold mb-4 text-green-600'>Shipping Policy</h2>
                <div className='space-y-2 text-gray-600 leading-relaxed'>
                    <p>At GroCart, we strive to deliver your groceries as fresh as possible.</p>
                    <ul className='list-disc pl-5 mt-2 space-y-1'>
                        <li><strong>Free Shipping:</strong> Valid on all orders above ₹500.</li>
                        <li><strong>Delivery Timing:</strong> Orders placed before 5 PM are eligible for same-day delivery.</li>
                        <li><strong>Areas Covered:</strong> We currently serve all major metro areas. Check your pin code at checkout.</li>
                    </ul>
                </div>
            </section>

             {/* Return Policy */}
             <section id="returns" className='bg-white p-6 rounded-lg border border-gray-200 shadow-sm'>
                <h2 className='text-xl font-semibold mb-4 text-green-600'>Return & Refund Policy</h2>
                <div className='space-y-2 text-gray-600 leading-relaxed'>
                    <p>We have a "no questions asked" return policy for perishable items at the time of delivery.</p>
                     <ul className='list-disc pl-5 mt-2 space-y-1'>
                        <li><strong>Perishables:</strong> Please check fruits and vegetables at the doorstep. Returns are accepted immediately if quality is not satisfactory.</li>
                        <li><strong>Packaged Goods:</strong> Easy returns within 10 days of purchase if the seal is unbroken.</li>
                        <li><strong>Refunds:</strong> Processed to original payment method within 5-7 business days.</li>
                    </ul>
                </div>
            </section>

            {/* Security Policy */}
             <section id="security" className='bg-white p-6 rounded-lg border border-gray-200 shadow-sm'>
                <h2 className='text-xl font-semibold mb-4 text-green-600'>Secure Payments</h2>
                <div className='space-y-2 text-gray-600 leading-relaxed'>
                    <p>Your security is our top priority.</p>
                     <ul className='list-disc pl-5 mt-2 space-y-1'>
                        <li>All transactions are encrypted with 256-bit SSL technology.</li>
                        <li>We do not store your credit/debit card details on our servers.</li>
                        <li>We support all major cards, UPI, and Net Banking.</li>
                    </ul>
                </div>
            </section>
        </div>
      </motion.div>
    </div>
  );
};

export default Policy;

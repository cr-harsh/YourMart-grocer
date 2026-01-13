import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Truck, ShieldCheck, Headset, CreditCard } from 'lucide-react';

const ServiceInfo = () => {
  const services = [
    {
      id: 1,
      icon: <Truck className="w-10 h-10 text-green-600" />,
      title: "Free Shipping",
      description: "On all orders over ₹500",
    },
    {
      id: 2,
      icon: <ShieldCheck className="w-10 h-10 text-green-600" />,
      title: "Secure Payment",
      description: "100% secure payment",
    },
    {
      id: 3,
      icon: <Headset className="w-10 h-10 text-green-600" />,
      title: "24/7 Support",
      description: "Dedicated support",
    },
    {
      id: 4,
      icon: <CreditCard className="w-10 h-10 text-green-600" />,
      title: "Easy Returns",
      description: "10 days return policy",
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
             <Link 
                to={service.title === "24/7 Support" ? "/contact" : `/policy#${service.title === "Free Shipping" ? "shipping" : service.title === "Easy Returns" ? "returns" : "security"}`} 
                key={service.id}
             >
                <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center text-center p-6 bg-green-50/50 rounded-xl hover:bg-green-50 transition-colors border border-green-100/50 hover:border-green-200 hover:shadow-lg h-full cursor-pointer"
                >
                <div className="mb-4 bg-white p-4 rounded-full shadow-sm">
                    {service.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
                </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceInfo;

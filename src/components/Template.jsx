import React from "react";

const Template = () => {
  return (
    <section className="py-12 bg-gradient-to-r from-green-50 to-emerald-50">
      <div className="container px-4 mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          Free Delivery on Your First Order
        </h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto text-gray-600">
          use code FRESH10 at checkout for free delivery on orders over 300
        </p>
      </div>
      <div className="flex justify-center mt-6">
        <button className="px-8 py-3 rounded-full bg-green-600 text-white font-semibold text-lg shadow-lg hover:bg-green-700 transition-all">
          Shop Now
        </button>
      </div>
    </section>
  );
};
export default Template;

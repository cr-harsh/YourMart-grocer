import React from "react";

const CategoryCard = ({ name, image }) => {
  return (
    <div className="overflow-hidden transition-all hover:shadow-lg hover:shadow-green-200 border border-gray-200 rounded-xl bg-white hover:border-green-500 hover:scale-105">
      <div className="">
        <div className="aspect-square relative bg-gray-100">
          <img src={image} alt={name} className="object-cover w-full h-full" />
        </div>
        <div className="p-4 text-center bg-white">
          <h3 className="font-medium text-gray-800">{name}</h3>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;

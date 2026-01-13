import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import SkeletonCard from "../components/SkeletonCard";
import api from "../services/api";
import { useSearchParams } from "react-router-dom";
import { Filter, X } from "lucide-react";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");

  // Filter State
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  
  const categories = ["All", "Vegetables", "Fruits", "Dairy", "Besan", "Oil", "Snacks", "Bakery", "Meat"];

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        let data;
        if (searchQuery) {
          data = await api.searchProducts(searchQuery);
        } else {
          data = await api.getProducts();
        }
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [searchQuery]);

  // Handle Filtering
  useEffect(() => {
    if (selectedCategory === "All") {
        setFilteredProducts(products);
    } else {
        setFilteredProducts(products.filter(p => p.category === selectedCategory));
    }
  }, [selectedCategory, products]);

  return (
    <div className="container mx-auto px-4 py-8 md:px-8 lg:px-12 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
           <h1 className="text-2xl font-bold text-gray-800">
             {searchQuery ? `Results for "${searchQuery}"` : "Shop"}
           </h1>
           <p className="text-gray-500 text-sm mt-1">
             {isLoading ? "Searching best deals..." : `Showing ${filteredProducts.length} products`}
           </p>
        </div>
        
        {/* Filter Controls */}
        <div className="relative">
             <button 
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-2 border rounded-full text-sm font-medium transition-colors ${showFilters || selectedCategory !== "All" ? 'border-green-600 text-green-700 bg-green-50' : 'border-gray-200 text-gray-600 hover:border-green-600 hover:text-green-600'}`}
             >
                <Filter className="w-4 h-4" /> {selectedCategory === "All" ? "Filter Category" : selectedCategory}
                {selectedCategory !== "All" && <X className="w-3 h-3 ml-1 p-0.5 bg-green-200 rounded-full hover:bg-green-300" onClick={(e) => { e.stopPropagation(); setSelectedCategory("All"); }} />}
             </button>

             {/* Filter Dropdown */}
             {showFilters && (
                <div className="absolute right-0 top-12 w-48 bg-white border border-gray-100 shadow-xl rounded-xl z-20 overflow-hidden animate-in fade-in slide-in-from-top-2">
                    <div className="p-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => { setSelectedCategory(cat); setShowFilters(false); }}
                                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedCategory === cat ? 'bg-green-50 text-green-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
             )}
        </div>
      </div>
      
      {/* Category Pills (Optional Quick Filters for mobile) */}
      <div className="md:hidden flex gap-2 overflow-x-auto pb-4 mb-2 no-scrollbar">
          {categories.slice(1).map(cat => (
              <button 
                key={cat} 
                onClick={() => setSelectedCategory(selectedCategory === cat ? "All" : cat)}
                className={`flex-shrink-0 px-3 py-1 text-xs border rounded-full ${selectedCategory === cat ? 'bg-green-600 text-white border-green-600' : 'border-gray-200 text-gray-600'}`}
              >
                  {cat}
              </button>
          ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
        
        {/* Loading State: Skeletons */}
        {isLoading && (
           Array(10).fill(0).map((_, index) => (
             <SkeletonCard key={index} />
           ))
        )}

        {/* Success State: Products */}
        {!isLoading && filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}

        {/* Empty State */}
        {!isLoading && filteredProducts.length === 0 && (
          <div className="col-span-full py-20 text-center">
            <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
               <span className="text-4xl">🥦</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">No products found</h3>
            <p className="text-gray-500 mt-2">Try selecting a different category or clear filters.</p>
            <button onClick={() => setSelectedCategory("All")} className="mt-4 text-green-600 font-medium hover:underline">Clear all filters</button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Shop;

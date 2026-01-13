import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FlyToCartAnimation = () => {
  const [flyingItems, setFlyingItems] = useState([]);

  useEffect(() => {
    const handleAddToCart = (e) => {
      const { startRect, image } = e.detail;
      const newItem = {
        id: Date.now(),
        startRect,
        image,
      };
      setFlyingItems((prev) => [...prev, newItem]);

      // Cleanup after animation
      setTimeout(() => {
        setFlyingItems((prev) => prev.filter((item) => item.id !== newItem.id));
      }, 1000);
    };

    window.addEventListener('fly-to-cart', handleAddToCart);
    return () => window.removeEventListener('fly-to-cart', handleAddToCart);
  }, []);

  // Target: Cart Icon position (Fixed approx position or dynamic)
  // For simplicity and robustness, we'll aim for top-right area where cart usually is.
  // In a real app we'd use a ref from the Navbar, but hardcoded percentages or 
  // checking DOM element ".cart-icon-ref" is better.
  // Let's assume cart is at top: 20px, right: 80px (approx based on Navbar)
  // Or better, logic to find the cart icon.
  
  const getTargetPosition = () => {
      // Try to find the cart icon element by ID or class if possible
      // I'll add an id="cart-icon-btn" to the Navbar cart button later.
      const cartBtn = document.getElementById('cart-icon-btn');
      if (cartBtn) {
          const rect = cartBtn.getBoundingClientRect();
          return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
      }
      return { x: window.innerWidth - 80, y: 40 }; // Fallback
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
      <AnimatePresence>
        {flyingItems.map((item) => {
            const target = getTargetPosition();
            return (
              <motion.img
                key={item.id}
                src={item.image}
                initial={{
                  position: 'absolute',
                  top: item.startRect.top,
                  left: item.startRect.left,
                  width: item.startRect.width,
                  height: item.startRect.height,
                  opacity: 1,
                  scale: 1,
                }}
                animate={{
                  top: target.y,
                  left: target.x,
                  width: 20,
                  height: 20,
                  opacity: 0.5,
                  scale: 0.5,
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }} // Slower for effect
                className="rounded-lg object-cover shadow-xl"
                style={{ zIndex: 1000 }}
              />
            );
        })}
      </AnimatePresence>
    </div>
  );
};

export default FlyToCartAnimation;

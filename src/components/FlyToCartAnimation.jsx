import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FlyToCartAnimation = () => {
  const [flyingItems, setFlyingItems] = useState([]);

  useEffect(() => {
    const handleAddToCart = (e) => {
      const { startRect, image } = e.detail;
      const target = getTargetPosition();
      
      const newItem = {
        id: Date.now(),
        startRect,
        target, // Lock target at start of animation to avoid mid-flight shifts if user scrolls
        image,
      };
      setFlyingItems((prev) => [...prev, newItem]);

      // Cleanup after animation
      setTimeout(() => {
        setFlyingItems((prev) => prev.filter((item) => item.id !== newItem.id));
        // optional: dispatch 'cart-arrival' event here if we want exact timing
        window.dispatchEvent(new CustomEvent('cart-item-arrived')); 
      }, 800); // Match duration
    };

    window.addEventListener('fly-to-cart', handleAddToCart);
    return () => window.removeEventListener('fly-to-cart', handleAddToCart);
  }, []);

  const getTargetPosition = () => {
      const cartBtn = document.getElementById('cart-icon-btn');
      if (cartBtn) {
          const rect = cartBtn.getBoundingClientRect();
          // Center of the cart icon
          return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
      }
      return { x: window.innerWidth - 50, y: 30 }; // Fallback
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
      <AnimatePresence>
        {flyingItems.map((item) => (
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
                  borderRadius: '0px'
                }}
                animate={{
                  top: item.target.y - 10, // Adjust to center
                  left: item.target.x - 10,
                  width: 20,
                  height: 20,
                  opacity: 0, // Fade out as it hits
                  scale: 0.2,
                  borderRadius: '50%'
                }}
                transition={{ 
                    duration: 0.8, 
                    ease: [0.16, 1, 0.3, 1] // Apple-style ease-out
                }}
                className="object-cover z-[1000] shadow-2xl mix-blend-multiply"
              />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default FlyToCartAnimation;

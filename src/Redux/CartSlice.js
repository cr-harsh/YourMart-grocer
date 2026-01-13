import { createSlice } from '@reduxjs/toolkit';

// Load cart from localStorage
const loadCartFromStorage = () => {
  try {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  } catch (error) {
    console.error("Failed to load cart from storage", error);
    return [];
  }
};

const initialState = {
  cart: loadCartFromStorage(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    addToCart: (state, action) => {
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.unit += 1;
      } else {
        state.cart.push({ ...action.payload, unit: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(item => item.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cart.find(item => item.id === id);
      if (item) {
        item.unit = quantity;
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    clearCart: (state) => {
      state.cart = [];
      localStorage.removeItem("cart");
    },
  },
});

export const { setCart, addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

// --- CART SELECTORS ---

export const selectCartTotal = (state) => {
  const cart = state.cart.cart;
  let subtotal = 0;
  let savings = 0;
  const categoryCounts = {};
  const categoryTotals = {};

  // 1. Calculate Subtotal and gather metrics
  cart.forEach(item => {
    const itemTotal = item.price * item.unit;
    subtotal += itemTotal;

    categoryCounts[item.category] = (categoryCounts[item.category] || 0) + item.unit;
    categoryTotals[item.category] = (categoryTotals[item.category] || 0) + itemTotal;
  });

  // 2. Apply "Bulk Category" Discount
  // Rule: Buy 3+ items of same category, get 5% off that category
  Object.keys(categoryCounts).forEach(cat => {
    if (categoryCounts[cat] >= 3) {
      savings += categoryTotals[cat] * 0.05;
    }
  });

  // 3. Apply "Big Spender" Discount
  // Rule: Total Cart > 1000, get flat 10% off EVERYTHING (stacks with category discount? Let's say yes for max wow)
  if (subtotal > 1000) {
    savings += subtotal * 0.10;
  }

  return {
    subtotal,
    savings,
    finalTotal: subtotal - savings,
    isDiscountApplied: savings > 0
  };
};

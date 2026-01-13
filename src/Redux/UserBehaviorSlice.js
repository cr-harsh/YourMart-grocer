import { createSlice, createSelector } from '@reduxjs/toolkit';

// Helper to load from storage
const loadBehavior = () => {
    try {
        const stored = localStorage.getItem('user_behavior');
        return stored ? JSON.parse(stored) : { history: [], lastSession: null };
    } catch {
        return { history: [], lastSession: null };
    }
};

const initialState = loadBehavior();

const userBehaviorSlice = createSlice({
    name: 'userBehavior',
    initialState,
    reducers: {
        logInteraction: (state, action) => {
            // Action Payload: { type: 'view' | 'add', product: { id, price, category, ... } }
            const { type, product } = action.payload;

            // Add to history with timestamp
            state.history.push({
                action: type, // 'view' or 'add'
                productId: product.id,
                category: product.category,
                price: product.price,
                timestamp: Date.now()
            });

            // Limit history to last 100 interactions to prevent bloat
            if (state.history.length > 100) {
                state.history = state.history.slice(-100);
            }

            // Save to local storage
            localStorage.setItem('user_behavior', JSON.stringify(state));
            localStorage.setItem('last_session_ts', Date.now());
        },
        restoreSession: (state) => {
            const stored = loadBehavior();
            state.history = stored.history;
            state.lastSession = localStorage.getItem('last_session_ts');
        }
    }
});

export const { logInteraction, restoreSession } = userBehaviorSlice.actions;
export default userBehaviorSlice.reducer;

// --- INTELLIGENCE SELECTORS (The Brain) ---

// 1. Get User Persona (Saver vs Premium)
export const selectUserPersona = createSelector(
    (state) => state.userBehavior.history,
    (history) => {
        if (history.length < 3) return 'Neutral';

        const addedItems = history.filter(h => h.action === 'add');
        if (addedItems.length === 0) return 'Window Shopper';

        const avgPrice = addedItems.reduce((sum, item) => sum + item.price, 0) / addedItems.length;

        if (avgPrice < 40) return 'Smart Saver'; // Buys cheaper items
        if (avgPrice > 100) return 'Premium Shopper'; // Buys expensive items
        return 'Balanced Shopper';
    }
);

// 2. Get Top 2 Favorite Categories
export const selectTopCategories = createSelector(
    (state) => state.userBehavior.history,
    (history) => {
        const categoryCounts = {};
        history.forEach(h => {
            // Weight: 'add' is worth 3 points, 'view' is worth 1
            const points = h.action === 'add' ? 3 : 1;
            categoryCounts[h.category] = (categoryCounts[h.category] || 0) + points;
        });

        return Object.entries(categoryCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 2)
            .map(entry => entry[0]);
    }
);

// 3. Smart "You Forgot This" Suggestions
// Logic: If user bought from Category A often but hasn't added it to current Cart
export const selectContextualSuggestions = createSelector(
    [selectTopCategories, (state) => state.cart.cart],
    (topCategories, currentCart) => {
        // Find categories that are favorites but NOT in current cart
        const cartCategories = new Set(currentCart.map(i => i.category));
        const missingCategories = topCategories.filter(cat => !cartCategories.has(cat));

        return missingCategories;
    }
);

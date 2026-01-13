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

// 4. Bundle Opportunities (Dynamic Nudges)
// Logic: Suggest adding more items to reach a discount threshold
export const selectBundleOpportunities = createSelector(
    (state) => state.cart.cart,
    (cart) => {
        const opportunities = [];
        const categoryCounts = {};

        // Count items per category
        cart.forEach(item => {
            categoryCounts[item.category] = (categoryCounts[item.category] || 0) + item.unit;
        });

        // Define simple rules (could be dynamic/remote in future)
        // Rule: Buy 3 items of same category, get small discount
        Object.entries(categoryCounts).forEach(([category, count]) => {
            const remainder = count % 3;
            if (remainder !== 0) {
                opportunities.push({
                    type: 'bulk_discount',
                    category,
                    currentCount: count,
                    needed: 3 - remainder,
                    discountPercent: 5,
                    message: `Add ${3 - remainder} more ${category} to save 5%!`
                });
            }
        });

        // Rule: Cross-Category Bundles (The "Smartness" Upgrade)
        const has = (cat) => categoryCounts[cat] > 0;

        // Bundle 1: Breakfast Special (Dairy + Bakery)
        if (has('Dairy') && !has('Bakery')) {
            opportunities.push({
                type: 'cross_sell',
                missingCategory: 'Bakery',
                partnerCategory: 'Dairy',
                discountPercent: 8,
                message: "Add Bakery items with your Dairy to save 8%!"
            });
        }

        // Bundle 2: Healthy Living (Vegetables + Fruits)
        if (has('Vegetables') && !has('Fruits')) {
            opportunities.push({
                type: 'cross_sell',
                missingCategory: 'Fruits',
                partnerCategory: 'Vegetables',
                discountPercent: 6,
                message: "Add Fruits to your Vegetables for a complete diet & 6% OFF!"
            });
        }

        // Rule: If total cart value > 500 but < 1000
        const totalValue = cart.reduce((sum, item) => sum + (item.price * item.unit), 0);
        if (totalValue > 500 && totalValue < 1000) {
            opportunities.push({
                type: 'threshold_discount',
                neededAmount: 1000 - totalValue,
                discountPercent: 10,
                message: `Add products worth ₹${(1000 - totalValue).toFixed(0)} more to get Flat 10% OFF!`
            });
        }

        return opportunities;
    }
);

// 5. Analytics Selectors (Dashboard Data)
export const selectAnalyticsData = createSelector(
    (state) => state.userBehavior.history,
    (state) => state.cart.cart, // cart might be needed for current session spend
    (history, cart) => {
        // Mock Spending Trend (in real app, this would be from Order History)
        // We'll simulate it based on history timestamps
        const spendingTrend = [450, 120, 800, 320, 150];

        // Most Viewed Category
        const viewCounts = {};
        history.filter(h => h.action === 'view').forEach(h => {
            viewCounts[h.category] = (viewCounts[h.category] || 0) + 1;
        });
        const mostViewed = Object.entries(viewCounts).sort((a, b) => b[1] - a[1])[0] || ['None', 0];

        // Engagement Score (Fun Metric)
        // 10 pts per add, 1 pt per view
        const score = history.reduce((acc, curr) => acc + (curr.action === 'add' ? 10 : 1), 0);

        return {
            mostViewedCategory: mostViewed[0],
            engagementScore: score,
            spendingTrend,
            totalInteractions: history.length
        };
    }
);

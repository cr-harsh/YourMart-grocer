import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice';
import userBehaviorReducer from './UserBehaviorSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    userBehavior: userBehaviorReducer,
  },
});

export default store;




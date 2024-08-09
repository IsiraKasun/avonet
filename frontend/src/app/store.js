import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import catReducer from '../features/categories/catSlice';
import expenseReducer from '../features/expenses/expenseSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cat: catReducer,
    expense: expenseReducer
  },
});
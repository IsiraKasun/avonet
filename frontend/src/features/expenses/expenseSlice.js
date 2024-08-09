import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  expenses: [],
};

const expenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {
    fill: (state, action) => {
      state.expenses = action.payload;
    },
    empty: (state) => {
        state.expenses = [];
    },
  },
});

export const { fill, empty } = expenseSlice.actions;
export default expenseSlice.reducer;

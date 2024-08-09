import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [],
};

const catSlice = createSlice({
  name: 'cat',
  initialState,
  reducers: {
    fill: (state, action) => {
      state.categories = action.payload;
    },
    empty: (state) => {
        state.categories = [];
    },
  },
});

export const { fill, empty } = catSlice.actions;
export default catSlice.reducer;

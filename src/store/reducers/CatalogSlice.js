import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

const initialState = {
  category: [],
  selectedCategory: null,
  error: null,
};
// Action
export const fetchTodos = createAsyncThunk('fetchTodos', async () => {
  const response = await fetch('https://dummyjson.com/products/categories');
  return response.json();
});
export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
});
export const {setSelectedCategory} = categorySlice.actions;
export default categorySlice.reducer;

import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

const initialState = {
  catalog: [],
  loading: false,
  error: null,
};
// Action
export const fetchProducts = createAsyncThunk('fetchTodos', async () => {
  const response = await fetch('https://dummyjson.com/products?limit=10');
  return response.json();
});
export const ProductSlice = createSlice({
  name: 'products',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      console.log('Error', action.payload);
      state.isError = true;
    });
  },
});

export default ProductSlice.reducer;

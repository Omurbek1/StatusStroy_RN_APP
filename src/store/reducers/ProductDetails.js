import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  product: [],
  loading: false,
  error: null,
};
// Action
export const fetchProductDetails = createAsyncThunk(
  'fetchProductDetails',
  async itemId => {
    const response = await fetch(`https://dummyjson.com/products/${itemId}`);
    return response.json();
  },
);
export const ProductDetails = createSlice({
  name: 'productdetails',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchProductDetails.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProductDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
    });
    builder.addCase(fetchProductDetails.rejected, (state, action) => {
      console.log('Error', action.payload);
      state.isError = true;
    });
  },
});

export default ProductDetails.reducer;

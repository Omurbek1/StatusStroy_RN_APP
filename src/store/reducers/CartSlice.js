import {createSlice} from '@reduxjs/toolkit';
import {useToast} from 'react-native-toast-notifications';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
    quantity: 0,
    favorites: [],
  },

  reducers: {
    addToCart: (state, action) => {
      const iteminCart = state.cart.find(item => item.id === action.payload.id);
      if (iteminCart) {
        iteminCart.quantity += 1;
      } else {
        state.cart.push({...action.payload, quantity: 1});
      }
    },
    addFavoriteProduct: (state, action) => {
      state.cart.push(action.payload);
    },
    removeFavoriteProduct: (state, action) => {
      return state.filter(product => product.id !== action.payload.id);
    },
    removeFromCart: (state, action) => {
      const removeFromCart = state.cart.filter(
        item => item.id !== action.payload.id,
      );
      state.cart = removeFromCart;
    },
    incrementQuantity: (state, action) => {
      const {productId} = action.payload;
      const iteminCart = state.cart.find(item => item.id === action.payload.id);
      if (iteminCart) {
        iteminCart.quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const iteminCart = state.cart.find(item => item.id === action.payload.id);
      if (iteminCart) {
        iteminCart.quantity = Math.max(0, iteminCart.quantity - 1);
      }
    },
    removeAllItemsFromCart(state) {
      state.cart = [];
    },
    addFavorite: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(
        favorite => favorite.id !== action.payload.id,
      );
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  addFavoriteProduct,
  addFavorite,
  removeFavorite,
  removeAllItemsFromCart,
} = cartSlice.actions;
export default cartSlice.reducer;

import {configureStore} from '@reduxjs/toolkit';
import CartReducer from './reducers/CartSlice';
import FavoriteSlice from './reducers/FavoriteSlice';
import CatalogSlice from './reducers/CatalogSlice';
import ProductDetails from './reducers/ProductDetails';
import ProductSlice from './reducers/ProductSlice';
import registerUserSlice from './reducers/registerUserSlice';
import authSlice from './reducers/authSlice';

export const store = configureStore({
  reducer: {
    cart: CartReducer,
    registerUserSlice: registerUserSlice,
    fav: FavoriteSlice,
    category: CatalogSlice,
    products: ProductSlice,
    productdetails: ProductDetails,
    auth: authSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

import {createSlice} from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'fav',
  initialState: {
    items: [],
  },
  reducers: {
    addFavorite: (state, action) => {
      const item = action.payload;

      if (!state.items.includes(item)) {
        state.items.push(item);
        // const uniqueItems = state.items.filter(
        //   (value, index, array) => array.indexOf(value) === index,
        // );
        // state.items = [...uniqueItems, item];
      } else {
        state.items.push({...action.payload, quantity: 1});
      }
      console.log(state.items, 'added products to fav');
    },
    removeFavorite: (state, action) => {
      const removeFromCart = state.items.filter(
        item => item.id !== action.payload.id,
      );
      state.items = removeFromCart;
    },
  },
});

export const {addFavorite, removeFavorite} = favoritesSlice.actions;
export default favoritesSlice.reducer;

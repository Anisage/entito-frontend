import { configureStore } from '@reduxjs/toolkit'
import wishlistReducer from './wishlistSlice'

import productsReducer from '../slices/productsSlice';
import categoryReducer from '../slices/categorySlice';
import recentViewsReducer from '../slices/recentViewsSlice';
import cartReducer from '../slices/cartSlice';
import searchReducer from '../slices/searchSlice';
import ordersReducer from '../slices/ordersSlice';
import { savePersistedState } from '../persist';

export const store = configureStore({
  reducer: {
    wishlist: wishlistReducer,
    products: productsReducer,
    categories: categoryReducer,
    recentViews: recentViewsReducer,
    cart: cartReducer,
    search: searchReducer,
    orders: ordersReducer,
  },
})

// Write the basket and wishlist back whenever they change. (They are read
// back in each slice's own initial state, so there is nothing to restore
// here.)
//
// The store notifies on every dispatch, including all the product and order
// fetches, so compare the two slices by reference first and write only when
// one of them actually moved. Redux Toolkit's reducers return the same
// object when nothing changed, which makes that check exact and cheap - far
// better than serialising the state on every keystroke in the search box.
let lastCart = store.getState().cart;
let lastWishlist = store.getState().wishlist;

store.subscribe(() => {
  const { cart, wishlist } = store.getState();
  if (cart === lastCart && wishlist === lastWishlist) return;

  lastCart = cart;
  lastWishlist = wishlist;
  savePersistedState({ cart, wishlist });
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

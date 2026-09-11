import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { WishlistItem, WishlistState } from '../../types/wishlist';
import { loadPersistedWishlist } from '../persist';

const emptyWishlist: WishlistState = {
    items: [],
    loading: false,
    error: null,
};

// Saved pieces survive a reload for the same reason the basket does.
const initialState: WishlistState = loadPersistedWishlist() ?? emptyWishlist;

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addToWishlist: (state, action: PayloadAction<WishlistItem>) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (!existingItem) {
                state.items.push({
                    ...action.payload,
                    dateAdded: new Date().toISOString(),
                });
            }
        },
        removeFromWishlist: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        clearWishlist: (state) => {
            state.items = [];
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
});

export const {
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    setLoading,
    setError,
} = wishlistSlice.actions;

// Selector for wishlist items (works with WishlistState directly)
export const selectWishlistItems = (state: WishlistState): WishlistItem[] => state.items;

// Selector for wishlist items (works with RootState)
export const selectWishlistItemsFromRoot = (state: { wishlist: WishlistState }): WishlistItem[] => {
    return state.wishlist?.items || [];
};

// Selector for in-stock items (works with WishlistState directly)
export const selectInStockItems = (state: WishlistState): WishlistItem[] => {
    if (!state.items || !Array.isArray(state.items)) {
        return [];
    }
    return state.items.filter(item => item.units_in_stock > 0);
};

// Selector for in-stock items (works with RootState)
export const selectInStockItemsFromRoot = (state: { wishlist: WishlistState }): WishlistItem[] => {
    if (!state.wishlist?.items || !Array.isArray(state.wishlist.items)) {
        return [];
    }
    return state.wishlist.items.filter(item => item.units_in_stock > 0);
};

// Selector for out-of-stock items (works with WishlistState directly)
export const selectOutOfStockItems = (state: WishlistState): WishlistItem[] => {
    if (!state.items || !Array.isArray(state.items)) {
        return [];
    }
    return state.items.filter(item => item.units_in_stock === 0);
};

// Selector for out-of-stock items (works with RootState)
export const selectOutOfStockItemsFromRoot = (state: { wishlist: WishlistState }): WishlistItem[] => {
    if (!state.wishlist?.items || !Array.isArray(state.wishlist.items)) {
        return [];
    }
    return state.wishlist.items.filter(item => item.units_in_stock === 0);
};

// Legacy selectors (kept for backward compatibility)
export const selectedWishlistItems = selectWishlistItems;
export const inStockWishlistItems = selectInStockItems;
export const outOfStockWishlistItems = selectOutOfStockItems;


export default wishlistSlice.reducer;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../../types/product";
import type { RecentViewState } from "../../types/recentViews";
import { get } from "../../api";

const intialState: RecentViewState = {
    items: [],
    loading: false,
    error: null,
};

export const fetchRecentViews = createAsyncThunk(
    'recentViews/fetchRecentViews',
    async (_, { rejectWithValue }) => {
        try {
            const response = await get<Product[]>('/products/recent/');
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)

const recentViewsSlice = createSlice({
    name: 'recentViews',
    initialState: intialState,
    reducers: {
        clearRecentViews: (state) => {
            state.items = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRecentViews.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchRecentViews.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchRecentViews.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false,
                state.error = action.payload;
            })
    }
})

export const { clearRecentViews } = recentViewsSlice.actions;

export const selectRecentProducts = (state: { recentViews: RecentViewState }): Product[] =>  {
    return state.recentViews?.items || [];
};

export const selectLoading = (state: { recentViews: RecentViewState }): boolean => {
    return state.recentViews.loading;
};

export const selectFetchError = (state: { recentViews: RecentViewState }):  string | null => {
    return state.recentViews.error;
}

export const selectRecentsInStock = (state: { recentViews: RecentViewState }): Product[] => {
    return state.recentViews.items.filter(item => item.units_in_stock > 0);
}

export const selectRecentsOutOfStock = (state: { recentViews: RecentViewState }): Product[] => {
    return state.recentViews.items.filter(item => item.units_in_stock === 0);
};

export default recentViewsSlice.reducer;
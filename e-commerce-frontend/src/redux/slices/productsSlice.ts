import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Product, ProductsResponse, ProductState } from "../../types/product";
import { get } from "../../api";

const ProductState: ProductState = {
    products: [],
    pagination: {},
    selectedProduct: null,
    loading: false,
    error: null,
    total: 0
}


export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (params: { 
        page?: number; pageSize?: number; limit?: number; 
        category?: string; search?: string; minPrice?: number; 
        maxPrice?: number; sizeFilter?: string; colorFilter?: string; 
        ratingsFilter?: number; categoryFilter?: string; ordering?: string;
    } = {}, { rejectWithValue }) => {
        try {
            const query = new URLSearchParams();
            if (params.page) query.append('page', params.page.toString());
            if (params.pageSize) query.append('page_size', params.pageSize.toString());
            if (params.limit) query.append('limit', params.limit.toString());
            if (params.category) query.append('category_name', params.category.toString());
            if (params.search) query.append('search', params.search);
            if (params.minPrice) query.append('min_price', params.minPrice.toString());
            if (params.maxPrice) query.append('max_price', params.maxPrice.toString());
            if (params.sizeFilter) query.append('size', params.sizeFilter.toString());
            if (params.colorFilter) query.append('color', params.colorFilter.toString());
            if (params.ratingsFilter) query.append('rating', params.ratingsFilter.toString());
            if (params.categoryFilter) query.append('category_name', params.categoryFilter.toString());
            if (params.ordering) query.append('ordering', params.ordering);

            const queryString = query.toString();
            const url = queryString ? `/products?${queryString}` : '/products';
            
            const response = await get<ProductsResponse>(url);
            return response;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to fetch products'
            )
        }
    }
);

export const fetchProductById = createAsyncThunk(
    'products/fetchProductById',
    async (id: number, { rejectWithValue }) => {
        try {
            const response = await get<Product>(`/products/${id}`);
            return response;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to fetch product'
            );
        }
    }
);


const productsSlice = createSlice({
    name: 'products',
    initialState: ProductState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.products;
                state.pagination = action.payload.pagination;
                state.total = action.payload.pagination.count;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchProductById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedProduct = action.payload;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    }
});

export const selectProducts = (state: { products: ProductState }) => state.products.products;
export const selectTotalProducts = (state: { products: ProductState }) => state.products.total;
export const selectedProduct = (state: { products: ProductState }) => state.products.selectedProduct
export const selectIsLoading = (state: { products: ProductState }) => state.products.loading;
export const selectError = (state: { products: ProductState }) => state.products.error;

export const {} = productsSlice.actions;
export default productsSlice.reducer;
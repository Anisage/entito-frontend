import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { get, post } from '../../api';
import type {
    CreateOrderPayload,
    DeliveryZone,
    Order,
    OrdersState,
} from '../../types/order';

const initialState: OrdersState = {
    orders: [],
    lastCreated: null,
    deliveryZones: [],
    loading: false,
    submitting: false,
    error: null,
};

/** Pull a usable message out of a DRF error body. */
const apiMessage = (error: any, fallback: string): string => {
    const data = error?.response?.data;
    if (typeof data === 'string') return data;
    if (Array.isArray(data)) return String(data[0]);
    if (data && typeof data === 'object') {
        const first = Object.values(data)[0];
        if (Array.isArray(first)) return String(first[0]);
        if (typeof first === 'string') return first;
    }
    return fallback;
};

/**
 * Delivery areas, each with its methods already priced for it.
 *
 * Fetched rather than hardcoded, and fetched as zones rather than methods:
 * the price shown must be the one the server will charge, and that depends
 * on where the parcel is going. One request gives the whole grid, so
 * changing zone re-prices without another round trip.
 */
export const fetchDeliveryZones = createAsyncThunk<DeliveryZone[]>(
    'orders/fetchDeliveryZones',
    async (_, { rejectWithValue }) => {
        try {
            return await get<DeliveryZone[]>('/delivery-zones/');
        } catch (error: any) {
            return rejectWithValue(apiMessage(error, 'Could not load delivery options.'));
        }
    },
);

/** The signed-in shopper's own orders. The API scopes this server-side. */
export const fetchOrders = createAsyncThunk<Order[]>(
    'orders/fetchOrders',
    async (_, { rejectWithValue }) => {
        try {
            return await get<Order[]>('/orders/');
        } catch (error: any) {
            return rejectWithValue(apiMessage(error, 'Could not load your orders.'));
        }
    },
);

export const createOrder = createAsyncThunk<Order, CreateOrderPayload>(
    'orders/createOrder',
    async (payload, { rejectWithValue }) => {
        try {
            return await post<Order, CreateOrderPayload>('/orders/', payload);
        } catch (error: any) {
            // A 400 here is usually "not enough stock for X" - worth showing
            // verbatim, because it tells the shopper exactly what to change.
            return rejectWithValue(apiMessage(error, 'We could not place your order.'));
        }
    },
);

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        clearOrderError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDeliveryZones.fulfilled, (state, action: PayloadAction<DeliveryZone[]>) => {
                state.deliveryZones = action.payload;
            })
            .addCase(fetchDeliveryZones.rejected, (state, action) => {
                state.error = action.payload as string;
            })

            .addCase(fetchOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(createOrder.pending, (state) => {
                state.submitting = true;
                state.error = null;
            })
            .addCase(createOrder.fulfilled, (state, action: PayloadAction<Order>) => {
                state.submitting = false;
                state.lastCreated = action.payload;
                state.orders.unshift(action.payload);
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.submitting = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearOrderError } = ordersSlice.actions;

export const selectOrders = (s: { orders: OrdersState }) => s.orders.orders;
export const selectLastCreatedOrder = (s: { orders: OrdersState }) => s.orders.lastCreated;
export const selectDeliveryZones = (s: { orders: OrdersState }) => s.orders.deliveryZones;
export const selectOrdersLoading = (s: { orders: OrdersState }) => s.orders.loading;
export const selectOrderSubmitting = (s: { orders: OrdersState }) => s.orders.submitting;
export const selectOrdersError = (s: { orders: OrdersState }) => s.orders.error;

export default ordersSlice.reducer;

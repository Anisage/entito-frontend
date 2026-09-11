import type { Product } from './product';

export interface DeliveryMethod {
    id: number;
    name: string;
    description: string;
    /** Decimal string, e.g. "300.00" - never a float, to avoid rounding money. */
    price: string;
}

/** A delivery area, with every method already priced for it. */
export interface DeliveryZone {
    id: number;
    name: string;
    description: string;
    /** Only the methods that actually reach this zone. */
    methods: DeliveryMethod[];
}

export interface OrderItem {
    id: number;
    product: number;
    product_name: string;
    quantity: number;
    description: string;
    price: string;
    line_total: string;
}

export interface Order {
    id: number;
    status: string;
    created_at: string;
    cart_items: OrderItem[];
    /** All server-computed. The client never sends an amount. */
    subtotal: string;
    discount: string;
    delivery_fee: string;
    total_amount: string;
    delivery_method: number | null;
    delivery_method_detail: DeliveryMethod | null;
    delivery_zone: number | null;
    delivery_zone_name: string | null;
    /** 'unpaid' until Entito confirms payment. Read-only over the API. */
    payment_status: 'unpaid' | 'paid' | 'refunded';
    paid_at: string | null;
    shipping_full_name: string;
    shipping_phone: string;
    shipping_address: string;
    shipping_city: string;
    shipping_postal_code: string;
    delivery_notes: string;
}

/** What the client is allowed to send: items, and which delivery option. */
export interface CreateOrderPayload {
    cart_items: Array<{
        product: number;
        quantity: number;
        description?: string;
    }>;
    delivery_method?: number | null;
    delivery_zone?: number | null;
    shipping_full_name: string;
    shipping_phone: string;
    shipping_address: string;
    shipping_city: string;
    shipping_postal_code?: string;
    delivery_notes?: string;
}

export interface OrdersState {
    orders: Order[];
    lastCreated: Order | null;
    deliveryZones: DeliveryZone[];
    loading: boolean;
    submitting: boolean;
    error: string | null;
}

/** Cart line -> order line. Note what is NOT sent: any price or total. */
export const toOrderItem = (item: { item: Product; quantity: number; size?: string; color?: string }) => ({
    product: item.item.id,
    quantity: item.quantity,
    // Size and colour live on the order line's description until the schema
    // has proper variant fields. Better here than lost entirely - without it
    // nobody packing the order knows which size to put in the box.
    description: [item.size, item.color].filter(Boolean).join(' / ') || 'No description provided',
});

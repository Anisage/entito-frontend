import { useState } from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import CartItem from '../components/cart/CartItem';
import CheckoutSteps from '../components/cart/CheckoutSteps';
import OrderSummary from '../components/cart/OrderSummary';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../redux/store';
import {
  cartDeliveryFee,
  cartDiscount,
  cartError,
  cartIsLoading,
  cartItems,
  cartPercentageDiscount,
  cartSubtotal,
  cartTotalAmount,
  clearCart,
  removeItemFromCart,
  updateItemQuantity,
} from '../redux/slices/cartSlice';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isLoading = useSelector(cartIsLoading);
  const error = useSelector(cartError);
  const cartList = useSelector(cartItems);
  const subtotal = useSelector(cartSubtotal);
  const totalAmount = useSelector(cartTotalAmount);
  const discount = useSelector(cartDiscount);
  const discountPercentage = useSelector(cartPercentageDiscount);
  const deliveryFee = useSelector(cartDeliveryFee);

  const [selectAll, setSelectAll] = useState(false);
  const [couponCode, setCouponCode] = useState('');

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity >= 1) {
      dispatch(
        updateItemQuantity({
          id,
          quantity: newQuantity,
        }) as any
      );
    }
  };

  const handleRemoveItem = (id: number) => {
    dispatch(removeItemFromCart(id) as any);
  };

  const deleteSelectedItems = () => {
    dispatch(clearCart() as any);
  };

  return (
    <div className="bg-page">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <div className="text-center mb-10">
          <h1 className="font-display text-5xl md:text-6xl text-ink-1 leading-tight mb-6">
            Your shopping bag
          </h1>
          <CheckoutSteps currentStep={1} />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {isLoading ? (
              <div className="bg-surface border border-line-soft rounded-card-lg py-20 text-center text-ink-muted">
                Loading cart…
              </div>
            ) : error ? (
              <div className="bg-coral-soft text-coral rounded-card-lg p-6 text-center">
                {error}
              </div>
            ) : cartList.length === 0 ? (
              <div className="bg-surface border border-line-soft rounded-card-lg py-20 text-center">
                <div className="w-16 h-16 rounded-full bg-surface-2 mx-auto flex items-center justify-center mb-5">
                  <ShoppingBag size={24} className="text-ink-muted" />
                </div>
                <h2 className="font-display text-3xl text-ink-1 mb-2">Your bag is empty</h2>
                <p className="text-ink-muted mb-6">
                  Find something you love — we'll take care of the rest.
                </p>
                <button
                  onClick={() => navigate('/products')}
                  className="btn-pill btn-primary mx-auto"
                >
                  Start shopping
                  <ArrowRight size={16} />
                </button>
              </div>
            ) : (
              <>
                <div className="bg-surface border border-line-soft rounded-card p-4 flex items-center justify-between">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={() => setSelectAll(!selectAll)}
                      className="w-4 h-4 rounded border-line text-ink-1 focus:ring-ink-1 focus:ring-1"
                    />
                    <span className="text-sm text-ink-1">
                      Select all <span className="text-ink-muted">({cartList.length})</span>
                    </span>
                  </label>
                  <button
                    onClick={deleteSelectedItems}
                    className="btn-pill btn-ghost text-xs"
                  >
                    Clear bag
                  </button>
                </div>

                {cartList.map((item) => (
                  <CartItem
                    key={item.item.id}
                    item={item}
                    updateQuantity={updateQuantity}
                    removeItem={handleRemoveItem}
                  />
                ))}
              </>
            )}
          </div>

          {/* Summary */}
          <div>
            <OrderSummary
              subtotal={subtotal}
              discount={discount}
              discountPercentage={discountPercentage}
              deliveryFee={deliveryFee}
              total={totalAmount}
              couponCode={couponCode}
              setCouponCode={setCouponCode}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default CartPage;

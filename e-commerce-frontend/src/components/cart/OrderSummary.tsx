import { ArrowRight, ShieldCheck } from 'lucide-react';
import type React from 'react';
import { useNavigate } from 'react-router-dom';
import { money } from '../../utils/money';

interface OrderSummaryProps {
  subtotal: number;
  discount: number;
  discountPercentage: number;
  deliveryFee: number;
  total: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  subtotal,
  discount,
  discountPercentage,
  deliveryFee,
  total,
}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-surface border border-line-soft rounded-card-lg p-6 sticky top-28">
      <h2 className="font-display text-2xl text-ink-1 mb-6">Order summary</h2>

      {/* A coupon box stood here. Typing a code and pressing Apply
          popped a browser alert saying "Applying coupon: <code>" and
          cleared the field - there are no coupons, in the UI or in the
          backend, where `discount` is documented as always 0 until they
          exist. Put it back alongside real ones. */}

      {/* Breakdown */}
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-ink-muted">Subtotal</span>
          <span className="text-ink-1">{money(subtotal)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between">
            <span className="text-ink-muted">Discount ({discountPercentage}%)</span>
            <span className="text-coral">- {money(discount)}</span>
          </div>
        )}
        {/* The fee depends on the area she picks, which happens at
            checkout. Showing "Ksh 0" here reads as free delivery. */}
        <div className="flex justify-between">
          <span className="text-ink-muted">Delivery</span>
          <span className="text-ink-1">
            {deliveryFee > 0 ? money(deliveryFee) : 'Set at checkout'}
          </span>
        </div>
        <div className="border-t border-line pt-4 flex justify-between items-baseline">
          <span className="font-medium text-ink-1">Total</span>
          <span className="font-display text-2xl text-ink-1">
            {money(total)}
          </span>
        </div>
      </div>

      <button
        onClick={() => navigate('/checkout')}
        className="w-full btn-pill btn-primary py-4 mt-6"
      >
        Continue to checkout
        <ArrowRight size={16} />
      </button>

      <div className="flex items-center gap-2 mt-4 text-xs text-ink-muted">
        <ShieldCheck size={14} />
        {/* Online payment is not connected yet - saying cards are
            accepted here would be untrue at the very moment a shopper
            is deciding to trust the shop. */}
        <span>Place your order and we&rsquo;ll arrange payment with you</span>
      </div>
    </div>
  );
};

export default OrderSummary;

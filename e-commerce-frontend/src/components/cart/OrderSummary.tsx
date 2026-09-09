import { ArrowRight, ShieldCheck } from 'lucide-react';
import type React from 'react';
import { useNavigate } from 'react-router-dom';

interface OrderSummaryProps {
  subtotal: number;
  discount: number;
  discountPercentage: number;
  deliveryFee: number;
  total: number;
  couponCode: string;
  setCouponCode: (code: string) => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  subtotal,
  discount,
  discountPercentage,
  deliveryFee,
  total,
  couponCode,
  setCouponCode,
}) => {
  const navigate = useNavigate();

  const applyCoupon = () => {
    alert(`Applying coupon: ${couponCode}`);
    setCouponCode('');
  };

  return (
    <div className="bg-surface border border-line-soft rounded-card-lg p-6 sticky top-28">
      <h2 className="font-display text-2xl text-ink-1 mb-6">Order summary</h2>

      {/* Coupon */}
      <div className="flex items-center bg-surface-3 rounded-full p-1 mb-6">
        <input
          type="text"
          placeholder="Coupon code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          className="flex-1 px-4 py-2 text-sm bg-transparent focus:outline-none"
        />
        <button
          onClick={applyCoupon}
          className="btn-pill btn-primary text-xs px-5 py-2"
        >
          Apply
        </button>
      </div>

      {/* Breakdown */}
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-ink-muted">Subtotal</span>
          <span className="text-ink-1">Ksh {subtotal.toLocaleString()}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between">
            <span className="text-ink-muted">Discount ({discountPercentage}%)</span>
            <span className="text-coral">- Ksh {discount.toLocaleString()}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-ink-muted">Delivery</span>
          <span className="text-ink-1">Ksh {deliveryFee.toLocaleString()}</span>
        </div>
        <div className="border-t border-line pt-4 flex justify-between items-baseline">
          <span className="font-medium text-ink-1">Total</span>
          <span className="font-display text-2xl text-ink-1">
            Ksh {total.toLocaleString()}
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
        <span>Secure checkout · M-Pesa &amp; card accepted</span>
      </div>
    </div>
  );
};

export default OrderSummary;

import { useState } from 'react';
import {
  ChevronRight,
  ArrowLeft,
  Truck,
  Package,
  Clock,
  MapPin,
  ArrowRight,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PaymentCard from '../components/checkout/PaymentCard';
import PaymentMethodOption from '../components/checkout/PaymentMethodOption';
import DeliveryMethodOption from '../components/checkout/DeliveryMethodOption';
import CheckoutSteps from '../components/cart/CheckoutSteps';

const Checkout = () => {
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState('mpesa');
  const [selectedDelivery, setSelectedDelivery] = useState('same-day');

  const subtotal = 581.0;
  const discount = 100;
  const discountPercentage = 15;
  const deliveryFee = 30;
  const total = subtotal - discount + deliveryFee;
  const itemCount = 36;

  return (
    <div className="bg-page">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <div className="text-center mb-10">
          <button
            onClick={() => navigate('/cart')}
            className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-ink-1 mb-6"
          >
            <ArrowLeft size={14} /> Back to bag
          </button>
          <h1 className="font-display text-5xl md:text-6xl text-ink-1 leading-tight mb-6">
            Checkout
          </h1>
          <CheckoutSteps currentStep={2} />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">
          {/* Form */}
          <div className="lg:col-span-2 space-y-10">
            {/* Contact */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="w-8 h-8 rounded-full bg-ink-1 text-white text-xs font-medium flex items-center justify-center">
                  1
                </span>
                <h2 className="text-lg font-medium text-ink-1">Contact information</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field label="First name" defaultValue="Fredrik jr." />
                <Field label="Last name" defaultValue="Ivarsson" />
                <Field label="Phone number" defaultValue="+254 711 223 721" />
                <Field
                  label="Email"
                  type="email"
                  defaultValue="hello@example.com"
                />
              </div>
            </div>

            {/* Delivery */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="w-8 h-8 rounded-full bg-ink-1 text-white text-xs font-medium flex items-center justify-center">
                  2
                </span>
                <h2 className="text-lg font-medium text-ink-1">Delivery method</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                <DeliveryMethodOption
                  icon={<Truck size={18} />}
                  label="Same-day"
                  sub="Within Nairobi"
                  selected={selectedDelivery === 'same-day'}
                  onClick={() => setSelectedDelivery('same-day')}
                />
                <DeliveryMethodOption
                  icon={<Package size={18} />}
                  label="Express"
                  sub="2–3 days"
                  selected={selectedDelivery === 'express'}
                  onClick={() => setSelectedDelivery('express')}
                />
                <DeliveryMethodOption
                  icon={<Clock size={18} />}
                  label="Standard"
                  sub="4–7 days"
                  selected={selectedDelivery === 'normal'}
                  onClick={() => setSelectedDelivery('normal')}
                />
              </div>
              <div className="flex items-center gap-3 bg-surface border border-line rounded-card p-4">
                <MapPin size={18} className="text-ink-muted" />
                <div className="flex-1">
                  <label className="block text-xs text-ink-muted">Postal code</label>
                  <input
                    type="text"
                    defaultValue="00100"
                    className="w-full bg-transparent text-sm focus:outline-none text-ink-1"
                  />
                </div>
              </div>
            </div>

            {/* Payment */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="w-8 h-8 rounded-full bg-ink-1 text-white text-xs font-medium flex items-center justify-center">
                  3
                </span>
                <h2 className="text-lg font-medium text-ink-1">Payment method</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <PaymentMethodOption
                  selected={selectedPayment === 'mpesa'}
                  onClick={() => setSelectedPayment('mpesa')}
                >
                  <span className="text-sm font-medium">M-Pesa</span>
                </PaymentMethodOption>
                <PaymentMethodOption
                  selected={selectedPayment === 'card'}
                  onClick={() => setSelectedPayment('card')}
                >
                  <span className="text-sm font-medium">Card</span>
                </PaymentMethodOption>
                <PaymentMethodOption
                  selected={selectedPayment === 'apple'}
                  onClick={() => setSelectedPayment('apple')}
                >
                  <span className="text-sm font-medium">Apple Pay</span>
                </PaymentMethodOption>
                <PaymentMethodOption
                  selected={selectedPayment === 'google'}
                  onClick={() => setSelectedPayment('google')}
                >
                  <span className="text-sm font-medium">G Pay</span>
                </PaymentMethodOption>
              </div>
            </div>
          </div>

          {/* Summary */}
          <aside className="bg-surface border border-line-soft rounded-card-lg p-6 self-start sticky top-28">
            <PaymentCard
              cardNumber="5478"
              expiryDate="07 / 27"
              cardholderName="Mr. Fredrik Ivarsson"
            />
            <button className="w-full flex justify-between items-center mt-4 text-sm text-ink-muted hover:text-ink-1">
              <span>Manage cards</span>
              <ChevronRight size={14} />
            </button>

            <div className="border-t border-line my-6" />

            <p className="text-center font-display text-3xl text-ink-1 mb-6">
              {itemCount} items
            </p>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-ink-muted">Subtotal</span>
                <span className="text-ink-1">$ {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-muted">Discount</span>
                <span className="text-coral">
                  - $ {discount.toFixed(2)} ({discountPercentage}%)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-muted">Delivery</span>
                <span className="text-ink-1">+ $ {deliveryFee.toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t border-line my-6 pt-4 flex justify-between items-baseline">
              <span className="font-medium text-ink-1">Total</span>
              <span className="font-display text-3xl text-ink-1">
                $ {total.toFixed(2)}
              </span>
            </div>

            <button className="w-full btn-pill btn-primary py-4 mt-2">
              Pay now
              <ArrowRight size={16} />
            </button>
          </aside>
        </div>
      </section>
    </div>
  );
};

const Field: React.FC<{
  label: string;
  defaultValue?: string;
  type?: string;
}> = ({ label, defaultValue, type = 'text' }) => (
  <label className="block">
    <span className="block text-xs text-ink-muted mb-1">{label}</span>
    <input
      type={type}
      defaultValue={defaultValue}
      className="w-full px-4 py-3 bg-surface border border-line rounded-card text-sm focus:outline-none focus:border-ink-1 transition-colors"
    />
  </label>
);

export default Checkout;

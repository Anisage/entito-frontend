import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Truck, Clock, MapPin, Package } from "lucide-react";

import type { AppDispatch } from "../redux/store";
import {
  fetchDeliveryZones,
  selectDeliveryZones,
} from "../redux/slices/ordersSlice";
import { money } from "../utils/money";

/*
 * Delivery rates.
 *
 * These used to be a hard-coded table - "Nairobi metro KSh 200", an
 * international tier "coming late 2026", and a footnote offering free
 * delivery over KSh 7,500. None of it matched the shop: the real zones cost
 * 300, 450 and 700, there is no international delivery, and there is no
 * free threshold anywhere in the checkout. A customer who read KSh 200 here
 * and was charged 300 at checkout would be right to be annoyed.
 *
 * So the page now reads the same delivery zones and rates the checkout
 * charges from, which Entito edits in Django admin. The two cannot drift
 * apart, because there is only one of them.
 */
const Delivery = () => {
  const dispatch = useDispatch<AppDispatch>();
  const zones = useSelector(selectDeliveryZones);

  useEffect(() => {
    dispatch(fetchDeliveryZones() as any);
  }, [dispatch]);

  return (
    <div className="bg-page">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <div className="bg-surface-2 rounded-card-lg p-8 md:p-12">
          <nav className="text-xs text-ink-muted mb-4 flex items-center gap-2">
            <Link to="/" className="hover:text-ink-1">Home</Link>
            <span>/</span>
            <Link to="/help" className="hover:text-ink-1">Help</Link>
            <span>/</span>
            <span className="text-ink-1">Delivery</span>
          </nav>
          <span className="chip mb-4">
            <Truck size={12} /> Shipping &amp; delivery
          </span>
          <h1 className="font-display text-5xl md:text-6xl text-ink-1 leading-tight mt-3">
            Across Kenya,<br /> priced by where you are.
          </h1>
          <p className="text-ink-muted mt-4 max-w-xl">
            Pick your area at checkout and the fee appears before you place the
            order. Nothing is added afterwards.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-surface border border-line-soft rounded-card-lg p-6">
            <Clock size={16} className="text-ink-1 mb-3" />
            <p className="font-display text-xl text-ink-1">When it ships</p>
            <p className="text-sm text-ink-muted mt-2">
              Once payment is arranged and confirmed. Until then your order is
              held — nothing leaves us unpaid.
            </p>
          </div>
          <div className="bg-surface border border-line-soft rounded-card-lg p-6">
            <Package size={16} className="text-ink-1 mb-3" />
            <p className="font-display text-xl text-ink-1">Packaging</p>
            <p className="text-sm text-ink-muted mt-2">
              Plain mailers, nothing on the outside to say what is inside.
            </p>
          </div>
          <div className="bg-surface border border-line-soft rounded-card-lg p-6">
            <MapPin size={16} className="text-ink-1 mb-3" />
            <p className="font-display text-xl text-ink-1">Staying in touch</p>
            <p className="text-sm text-ink-muted mt-2">
              We confirm the delivery window with you directly when we arrange
              payment, and your order is always visible in your account.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <p className="font-display text-3xl text-ink-1 mb-6">Rates by area</p>

        {zones.length === 0 ? (
          <div className="bg-surface border border-line-soft rounded-card-lg py-14 text-center">
            <p className="text-ink-muted text-sm">
              Delivery rates are loading. If they do not appear, you will still
              see the fee for your area at checkout.
            </p>
          </div>
        ) : (
          <div className="bg-surface border border-line-soft rounded-card-lg overflow-hidden">
            <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-surface-2 text-xs uppercase tracking-wider text-ink-muted">
              <div className="col-span-5">Area</div>
              <div className="col-span-7">Options</div>
            </div>
            {zones.map((zone, i) => (
              <div
                key={zone.id}
                className={`grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 px-6 py-5 ${
                  i !== zones.length - 1 ? "border-b border-line-soft" : ""
                }`}
              >
                <div className="md:col-span-5">
                  <p className="text-ink-1 font-medium">{zone.name}</p>
                  {zone.description && (
                    <p className="text-sm text-ink-muted mt-1">{zone.description}</p>
                  )}
                </div>
                <div className="md:col-span-7 space-y-2">
                  {/* The API only returns the methods that actually reach a
                      zone, so an option listed here is an option the
                      shopper can really choose. */}
                  {zone.methods.length === 0 ? (
                    <p className="text-sm text-ink-muted">
                      No delivery options set for this area yet.
                    </p>
                  ) : (
                    zone.methods.map((method) => (
                      <div
                        key={method.id}
                        className="flex items-baseline justify-between gap-4 text-sm"
                      >
                        <span className="text-ink-1">
                          {method.name}
                          {method.description && (
                            <span className="text-ink-muted"> · {method.description}</span>
                          )}
                        </span>
                        <span className="text-ink-1 tabular-nums shrink-0">
                          {money(method.price)}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <p className="text-xs text-ink-muted mt-4">
          We deliver within Kenya only. Your fee is confirmed at checkout
          before you place the order.
        </p>
      </section>
    </div>
  );
};

export default Delivery;

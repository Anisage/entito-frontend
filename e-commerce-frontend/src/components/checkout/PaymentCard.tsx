interface PaymentCardProps {
  cardNumber: string;
  expiryDate: string;
  cardholderName: string;
}

const PaymentCard: React.FC<PaymentCardProps> = ({
  cardNumber,
  expiryDate,
  cardholderName,
}) => (
  <div className="relative overflow-hidden bg-ink-1 text-white rounded-card-lg p-6 h-44 flex flex-col justify-between">
    {/* Decorative rings */}
    <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full border border-white/10" />
    <div className="absolute -bottom-16 -left-16 w-44 h-44 rounded-full border border-white/10" />

    <div className="flex items-start justify-between relative z-10">
      <div className="w-12 h-9 bg-white/10 rounded-md" />
      <span className="text-xs text-white/60">BR.F · Pay</span>
    </div>

    <div className="relative z-10">
      <p className="text-xs text-white/60">Exp · {expiryDate}</p>
      <p className="text-base tracking-[0.2em] mt-1">
        •••• {cardNumber.substring(cardNumber.length - 4)}
      </p>
      <p className="text-sm mt-2">{cardholderName}</p>
    </div>
  </div>
);

export default PaymentCard;

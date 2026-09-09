import { Heart, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const WishlistEmptyState: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-surface border border-line-soft rounded-card-lg py-20 px-6 text-center">
      <div className="w-16 h-16 rounded-full bg-coral-soft mx-auto flex items-center justify-center mb-6">
        <Heart size={24} className="text-coral fill-coral" />
      </div>
      <h2 className="font-display text-3xl text-ink-1 mb-3">
        Your wishlist is empty
      </h2>
      <p className="text-ink-muted max-w-md mx-auto mb-8">
        Save your favorite pieces here and they'll be waiting whenever you're
        ready to add them to the bag.
      </p>
      <button
        onClick={() => navigate('/products')}
        className="btn-pill btn-primary mx-auto"
      >
        Start shopping
        <ArrowRight size={16} />
      </button>
    </div>
  );
};

export default WishlistEmptyState;

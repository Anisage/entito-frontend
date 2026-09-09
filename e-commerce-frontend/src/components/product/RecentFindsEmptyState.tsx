import { Eye, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RecentFindsEmptyState = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-surface border border-line-soft rounded-card-lg py-20 px-6 text-center">
      <div className="w-16 h-16 rounded-full bg-surface-2 mx-auto flex items-center justify-center mb-6">
        <Eye size={22} className="text-ink-muted" />
      </div>
      <h2 className="font-display text-3xl text-ink-1 mb-3">No recent views yet</h2>
      <p className="text-ink-muted max-w-md mx-auto mb-8">
        Browse around — anything you peek at will show up here for easy return.
      </p>
      <button
        onClick={() => navigate('/products')}
        className="btn-pill btn-primary mx-auto"
      >
        Browse the shop
        <ArrowRight size={16} />
      </button>
    </div>
  );
};

export default RecentFindsEmptyState;

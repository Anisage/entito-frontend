import { ChevronDown, Star, MessageCircle, ThumbsUp } from 'lucide-react';
import type { Review } from '../../types/product';
import type React from 'react';

interface ReviewContentProps {
  reviews: Review[];
}

const ReviewsContent: React.FC<ReviewContentProps> = () => {
  const testReviews = [
    { author: 'Helen M.', date: 'Yesterday', rating: 5, comment: 'Excellent shoes. They turn very sharply on the foot. Perfect for runs around Karura.', likes: 42, replies: 0 },
    { author: 'Ann D.', date: '2 days ago', rating: 4, comment: 'Good shoes, runs slightly small. Order half a size up.', likes: 16, replies: 2 },
    { author: 'Andrew G.', date: '2 days ago', rating: 5, comment: 'Is it suitable for long-distance running?', likes: 8, replies: 1 },
  ];

  const ratingCounts = [
    { stars: 5, count: 28 },
    { stars: 4, count: 9 },
    { stars: 3, count: 4 },
    { stars: 2, count: 1 },
    { stars: 1, count: 1 },
  ];

  const total = ratingCounts.reduce((acc, r) => acc + r.count, 0);
  const averageRating = 4.8;

  const starCls = (filled: boolean) => (filled ? 'text-sun fill-sun' : 'text-line fill-line');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
      <aside className="lg:col-span-4">
        <div className="bg-surface-2 rounded-card-lg p-6">
          <p className="text-sm text-ink-muted">Average rating</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="font-display text-5xl text-ink-1">{averageRating.toFixed(1)}</span>
            <span className="text-ink-muted text-sm">/ 5</span>
          </div>
          <div className="flex items-center gap-0.5 mt-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={14} className={starCls(i < Math.round(averageRating))} />
            ))}
          </div>
          <p className="text-xs text-ink-muted mt-2">{total} reviews</p>

          <div className="mt-6 space-y-2">
            {ratingCounts.map((row) => (
              <div key={row.stars} className="flex items-center gap-3">
                <span className="text-xs w-3 text-ink-muted">{row.stars}</span>
                <div className="flex-1 h-1.5 bg-white rounded-full overflow-hidden">
                  <div className="h-full bg-ink-1" style={{ width: ((row.count / total) * 100) + '%' }} />
                </div>
                <span className="text-xs w-6 text-right text-ink-muted">{row.count}</span>
              </div>
            ))}
          </div>
        </div>
      </aside>

      <div className="lg:col-span-8">
        <div className="flex items-center justify-between mb-6">
          <button className="btn-pill btn-ghost text-xs">
            Newest <ChevronDown size={12} />
          </button>
          <button className="btn-pill btn-primary text-xs">Write a review</button>
        </div>

        <div className="divide-y divide-line">
          {testReviews.map((review, index) => (
            <article key={index} className="py-6 first:pt-0">
              <header className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full bg-surface-2 flex items-center justify-center text-xs font-medium text-ink-1">
                  {review.author.split(' ').map((s) => s[0]).join('')}
                </div>
                <div>
                  <p className="text-sm font-medium text-ink-1">{review.author}</p>
                  <p className="text-xs text-ink-muted">{review.date}</p>
                </div>
                <div className="ml-auto flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={12} className={starCls(i < review.rating)} />
                  ))}
                </div>
              </header>
              <p className="text-sm text-ink-1 leading-relaxed">{review.comment}</p>
              <div className="flex items-center gap-5 mt-3 text-xs text-ink-muted">
                <button className="flex items-center gap-1.5 hover:text-ink-1 transition-colors">
                  <ThumbsUp size={12} /> {review.likes}
                </button>
                <button className="flex items-center gap-1.5 hover:text-ink-1 transition-colors">
                  <MessageCircle size={12} /> {review.replies}
                </button>
                <button className="hover:text-ink-1 transition-colors">Reply</button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewsContent;

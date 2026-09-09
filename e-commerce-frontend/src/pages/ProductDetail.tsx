import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import ProductImages from '../components/product-details/ProductImages';
import ProductDetails from '../components/product-details/ProductDetails';
import ProductTabs from '../components/product-details/ProductTabs';
import RelatedProductsCarousel from '../components/product-details/RelatedProductsCarousel';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProductById,
  selectedProduct,
  selectIsLoading,
} from '../redux/slices/productsSlice';
import type { AppDispatch } from '../redux/store';

const ProductDetail = () => {
  const { id } = useParams<string>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const product = useSelector(selectedProduct);
  const loading = useSelector(selectIsLoading);
  const productImages = product?.product_images || [];

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(parseInt(id)));
    }
  }, [id, dispatch]);

  if (loading || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <p className="text-ink-muted">Loading product details…</p>
      </div>
    );
  }

  return (
    <div className="bg-page">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-ink-muted mb-10">
          <button onClick={() => navigate('/')} className="hover:text-ink-1">
            Home
          </button>
          <ChevronRight size={12} />
          <button
            onClick={() => navigate('/products')}
            className="hover:text-ink-1"
          >
            Shop
          </button>
          <ChevronRight size={12} />
          <span className="text-ink-1">{product.name}</span>
        </nav>

        {/* Main split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <ProductImages productImages={productImages} />
          <ProductDetails product={product} />
        </div>

        {/* Tabs */}
        <ProductTabs product={product} />

        {/* Related */}
        <RelatedProductsCarousel />
      </section>
    </div>
  );
};

export default ProductDetail;

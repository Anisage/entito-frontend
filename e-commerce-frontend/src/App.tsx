import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Index from './pages/Index';
import ProductDetail from './pages/ProductDetail';
import MainLayout from './components/layouts/MainLayout';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import Products from './pages/Products';
import WishlistPage from './pages/WishlistPage';
import RecentFindsPage from './pages/RecentFindsPage';
import VisualSearch from './pages/VisualSearch';
import VisualSearchUnavailable from './pages/VisualSearchUnavailable';
import { getConfig } from './Config';

// Accounts
import { AuthProvider } from './auth/AuthProvider';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Account from './pages/Account';
import OrderConfirmation from './pages/OrderConfirmation';

// Shop
import Lookbook from './pages/Lookbook';

// Company
import AboutUs from './pages/AboutUs';
import Stores from './pages/Stores';
import Careers from './pages/Careers';
import Press from './pages/Press';

// Support
import HelpCenter from './pages/HelpCenter';
import Delivery from './pages/Delivery';
import Returns from './pages/Returns';
import SizeGuide from './pages/SizeGuide';
import Contact from './pages/Contact';

// Connect
import Newsletter from './pages/Newsletter';
import GiftCards from './pages/GiftCards';

// Legal
import Privacy from './pages/legal/Privacy';
import Terms from './pages/legal/Terms';
import Cookies from './pages/legal/Cookies';

function App() {
  // Visual search is gated: its backend endpoint is not deployed yet.
  const { VITE_ENABLE_VISUAL_SEARCH } = getConfig();

  return (
    <Router>
      {/* AuthProvider sits inside Router so its children can navigate, and
          wraps every route so the token provider is registered before any
          page fires an API call. */}
      <AuthProvider>

      <Routes>
        <Route path="/" element={<MainLayout><Index /></MainLayout>} />
        <Route path="/product/:id" element={<MainLayout><ProductDetail /></MainLayout>} />
        <Route path="/cart" element={<MainLayout><CartPage /></MainLayout>} />
        <Route
          path="/checkout"
          element={
            <MainLayout>
              {/* Checkout creates an order against the signed-in shopper, so
                  the API requires an account. Guarding here means a visitor
                  is sent to sign in rather than hitting a 403 after filling
                  in the whole form. */}
              <ProtectedRoute><Checkout /></ProtectedRoute>
            </MainLayout>
          }
        />
        <Route path="/products" element={<MainLayout><Products /></MainLayout>} />
        <Route path="/wishlist" element={<MainLayout><WishlistPage /></MainLayout>} />
        <Route path='/recent-views' element={<MainLayout><RecentFindsPage /></MainLayout>} />
        <Route
          path='/visual-search'
          element={
            <MainLayout>
              {VITE_ENABLE_VISUAL_SEARCH ? <VisualSearch /> : <VisualSearchUnavailable />}
            </MainLayout>
          }
        />

        {/* Shop */}
        <Route path='/lookbook' element={<MainLayout><Lookbook /></MainLayout>} />

        {/* Company */}
        <Route path='/about' element={<MainLayout><AboutUs /></MainLayout>} />
        <Route path='/stores' element={<MainLayout><Stores /></MainLayout>} />
        <Route path='/careers' element={<MainLayout><Careers /></MainLayout>} />
        <Route path='/press' element={<MainLayout><Press /></MainLayout>} />

        {/* Support */}
        <Route path='/help' element={<MainLayout><HelpCenter /></MainLayout>} />
        <Route path='/delivery' element={<MainLayout><Delivery /></MainLayout>} />
        <Route path='/returns' element={<MainLayout><Returns /></MainLayout>} />
        <Route path='/size-guide' element={<MainLayout><SizeGuide /></MainLayout>} />
        <Route path='/contact' element={<MainLayout><Contact /></MainLayout>} />

        {/* Connect */}
        <Route path='/newsletter' element={<MainLayout><Newsletter /></MainLayout>} />
        <Route path='/gift-cards' element={<MainLayout><GiftCards /></MainLayout>} />

        {/* Accounts */}
        <Route path='/login' element={<MainLayout><Login /></MainLayout>} />
        <Route path='/register' element={<MainLayout><Register /></MainLayout>} />
        <Route
          path='/order-confirmation/:id'
          element={
            <MainLayout>
              <ProtectedRoute><OrderConfirmation /></ProtectedRoute>
            </MainLayout>
          }
        />
        <Route
          path='/account'
          element={
            <MainLayout>
              <ProtectedRoute><Account /></ProtectedRoute>
            </MainLayout>
          }
        />

        {/* Legal */}
        <Route path='/privacy' element={<MainLayout><Privacy /></MainLayout>} />
        <Route path='/terms' element={<MainLayout><Terms /></MainLayout>} />
        <Route path='/cookies' element={<MainLayout><Cookies /></MainLayout>} />
      </Routes>
      </AuthProvider>

    </Router>
  )
}

export default App

import { Link } from "react-router-dom";
import { FaTwitter, FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";
import { ArrowUpRight } from "lucide-react";

interface FooterLink {
  label: string;
  to: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

const Footer = () => {
  const columns: FooterColumn[] = [
    {
      title: "Shop",
      links: [
        { label: "Women", to: "/products?category-name=women" },
        { label: "Men", to: "/products?category-name=men" },
        { label: "New Arrivals", to: "/products?category-name=new-arrivals" },
        { label: "Sale", to: "/products?category-name=sale" },
        { label: "Lookbook", to: "/lookbook" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About us", to: "/about" },
        { label: "Stores", to: "/stores" },
        { label: "Sustainability", to: "/sustainability" },
        { label: "Careers", to: "/careers" },
        { label: "Press", to: "/press" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Help center", to: "/help" },
        { label: "Delivery", to: "/delivery" },
        { label: "Returns", to: "/returns" },
        { label: "Size guide", to: "/size-guide" },
        { label: "Contact", to: "/contact" },
      ],
    },
    {
      title: "Connect",
      links: [
        { label: "Newsletter", to: "/newsletter" },
        { label: "Affiliates", to: "/affiliates" },
        { label: "Wholesale", to: "/wholesale" },
        { label: "Gift cards", to: "/gift-cards" },
      ],
    },
  ];

  return (
    <footer className="bg-ink-1 text-white mt-20 rounded-t-[2.5rem]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Brand block */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="flex items-baseline">
              <span className="font-display text-5xl">BR.</span>
              <span className="font-display text-5xl text-white/40">F</span>
            </Link>
            <p className="text-sm text-white/60 max-w-xs leading-relaxed">
              Modern wardrobe staples, made to last. Try-on at home, M-Pesa
              checkout, and same-day boda delivery across Nairobi.
            </p>
            <div className="flex items-center gap-3 text-white/70">
              <a href="#" aria-label="Twitter" className="w-10 h-10 rounded-full border border-white/15 hover:border-white/40 flex items-center justify-center transition-colors"><FaTwitter size={14} /></a>
              <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full border border-white/15 hover:border-white/40 flex items-center justify-center transition-colors"><FaInstagram size={14} /></a>
              <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full border border-white/15 hover:border-white/40 flex items-center justify-center transition-colors"><FaFacebook size={14} /></a>
              <a href="#" aria-label="YouTube" className="w-10 h-10 rounded-full border border-white/15 hover:border-white/40 flex items-center justify-center transition-colors"><FaYoutube size={14} /></a>
            </div>
          </div>

          {/* Link columns */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="text-xs uppercase tracking-wider text-white/40 mb-5">{col.title}</h3>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="text-sm text-white/80 hover:text-white transition-colors inline-flex items-center group"
                      >
                        {link.label}
                        <ArrowUpRight
                          size={14}
                          className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-white/50">
          <span>© {new Date().getFullYear()} BR.F — Made in Nairobi.</span>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link to="/cookies" className="hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

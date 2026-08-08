import { 
  Facebook, Youtube, Twitter, Instagram, Mail, Phone, MapPin, 
  Shield, Truck, RefreshCw, CreditCard, Globe, Heart,
  ArrowRight, Send, CheckCircle, Gift, Clock, Award
} from "lucide-react";

function Footer() {

  const quickLinks = [
    { label: "All Products", path: "/products" },
    { label: "New Arrivals", path: "/products?category=new" },
    { label: "Best Sellers", path: "/products?category=bestseller" },
    { label: "Limited Editions", path: "/products?category=limited" },
    { label: "Gift Sets", path: "/products?category=gifts" },
    { label: "Sale", path: "/products?category=sale" },
  ];

  const customerService = [
    { label: "Contact Us", path: "/contact" },
    { label: "Shipping Policy", path: "/shipping" },
    { label: "Returns & Exchanges", path: "/returns" },
    { label: "Order Tracking", path: "/track-order" },
    { label: "FAQ", path: "/faq" },
  ];

  const companyInfo = [
    { label: "About Us", path: "/about" },
    { label: "Our Story", path: "/story" },
    { label: "Careers", path: "/careers" },
    { label: "Press", path: "/press" },
    { label: "Wholesale", path: "/wholesale" },
  ];

  const policies = [
    { label: "Privacy Policy", path: "/privacy" },
    { label: "Terms of Service", path: "/terms" },
    { label: "Cookie Policy", path: "/cookies" },
    { label: "Accessibility", path: "/accessibility" },
    { label: "Supply Chain", path: "/supply-chain" },
  ];

  const socialLinks = [
    { icon: Instagram, href: "https://instagram.com", color: "hover:text-pink-500", label: "Instagram" },
    { icon: Facebook, href: "https://facebook.com", color: "hover:text-blue-500", label: "Facebook" },
    { icon: Twitter, href: "https://twitter.com", color: "hover:text-sky-400", label: "Twitter" },
    { icon: Youtube, href: "https://youtube.com", color: "hover:text-red-500", label: "YouTube" },
  ];

 
  const paymentMethods = [
    "Visa", "PayPal", "UPI", "Net Banking"
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-50 to-white border-t border-gray-200">
    

      <div className="max-w-7xl mx-auto px-5 py-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <div className="mb-8" >
              <h2 className="font-serif text-4xl font-bold mb-3 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                ZafaF
              </h2>
              
            </div>

           
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-900">
                <Phone className="w-5 h-5 text-gray-600" />
                Contact Us
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">+91 98765 43210</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">support@zafafragrance.com</span>
                </div>
                <div className="flex items-start gap-3 text-gray-600">
                  <MapPin className="w-4 h-4 mt-0.5" />
                  <span className="text-sm">123 Luxury Street, Mumbai 400001, India</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold text-base mb-4 text-gray-900">Shop</h3>
              <ul className="space-y-2.5">
                {quickLinks.map((link, idx) => (
                  <li key={idx}>
                    <a
                      href={link.path}
                      className="text-gray-600 hover:text-gray-900 transition-colors text-sm flex items-center gap-2 group"
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-base mb-4 text-gray-900">Help</h3>
              <ul className="space-y-2.5">
                {customerService.map((link, idx) => (
                  <li key={idx}>
                    <a
                      href={link.path}
                      className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-base mb-4 text-gray-900">Company</h3>
              <ul className="space-y-2.5">
                {companyInfo.map((link, idx) => (
                  <li key={idx}>
                    <a
                      href={link.path}
                      className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-base mb-4 text-gray-900">Legal</h3>
              <ul className="space-y-2.5">
                {policies.map((link, idx) => (
                  <li key={idx}>
                    <a
                      href={link.path}
                      className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-sm font-semibold mb-4 text-gray-900">Follow Us</h4>
              <div className="flex gap-3">
                {socialLinks.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-gray-600 ${social.color} transition-all p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 hover:shadow-sm`}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-4 text-gray-900">We Accept</h4>
              <div className="flex flex-wrap gap-2">
                {paymentMethods.map((method, idx) => (
                  <div
                    key={idx}
                    className="px-3 py-1.5 bg-gray-100 rounded-lg text-xs text-gray-700 font-medium border border-gray-200"
                  >
                    {method}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-4 text-gray-900">Get Our App</h4>
              <div className="flex gap-2">
                <button className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-xs font-medium transition-all shadow-sm hover:shadow-md">
                  App Store
                </button>
                <button className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-xs font-medium transition-all shadow-sm hover:shadow-md">
                  Google Play
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-10 pt-2">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-600" />
                <span className="text-sm text-gray-600">Luxury Fragrance Award 2024</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-green-600" />
                <span className="text-sm text-gray-600">Cruelty-Free Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <Gift className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-gray-600">Eco-Friendly Packaging</span>
              </div>
            </div>
            <div className="text-sm text-gray-600 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Mon-Sun: 9AM - 9PM
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-2">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-600 text-sm">
              © {new Date().getFullYear()} ZafaF Haute Parfum. All rights reserved.
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <a href="/sitemap" className="hover:text-gray-900 transition-colors">
                Sitemap
              </a>
              <a href="/affiliate" className="hover:text-gray-900 transition-colors">
                Affiliate Program
              </a>
              <a href="/contact" className="hover:text-gray-900 transition-colors">
                Contact
              </a>
              <div className="flex items-center gap-1">
                <span>Made with</span>
                <Heart className="w-3 h-3 text-red-500 fill-red-500" />
                <span>in India</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
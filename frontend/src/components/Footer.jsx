import { 
  Facebook, Youtube, Twitter, Instagram, Mail, Phone, MapPin, 
  Shield, Truck, RefreshCw, CreditCard, Globe, Heart,
  ArrowRight, Send, CheckCircle, Gift, Clock, Award
} from "lucide-react";
// import { useState } from "react";

function Footer() {
  // const [email, setEmail] = useState("");
  // const [subscriptionSuccess, setSubscriptionSuccess] = useState(false);

  // const handleSubscribe = () => {
  //   if (email) {
  //     setSubscriptionSuccess(true);
  //     setEmail("");
  //     setTimeout(() => setSubscriptionSuccess(false), 3000);
  //   }
  // };

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
    // { label: "Size Guide", path: "/size-guide" },
  ];

  const companyInfo = [
    { label: "About Us", path: "/about" },
    { label: "Our Story", path: "/story" },
    { label: "Careers", path: "/careers" },
    { label: "Press", path: "/press" },
    // { label: "Store Locator", path: "/stores" },
    { label: "Wholesale", path: "/wholesale" },
  ];

  const policies = [
    { label: "Privacy Policy", path: "/privacy" },
    { label: "Terms of Service", path: "/terms" },
    { label: "Cookie Policy", path: "/cookies" },
    { label: "Accessibility", path: "/accessibility" },
    // { label: "Modern Slavery Statement", path: "/slavery-statement" },
    { label: "Supply Chain", path: "/supply-chain" },
  ];

  const socialLinks = [
    { icon: Instagram, href: "https://instagram.com", color: "hover:text-pink-500", label: "Instagram" },
    { icon: Facebook, href: "https://facebook.com", color: "hover:text-blue-500", label: "Facebook" },
    { icon: Twitter, href: "https://twitter.com", color: "hover:text-sky-400", label: "Twitter" },
    { icon: Youtube, href: "https://youtube.com", color: "hover:text-red-500", label: "YouTube" },
  ];

  // const features = [
  //   { icon: Shield, title: "100% Authentic", description: "Guaranteed original products" },
  //   { icon: Truck, title: "Free Shipping", description: "On orders over ₹2,000" },
  //   { icon: RefreshCw, title: "Easy Returns", description: "30-day return policy" },
  //   { icon: CreditCard, title: "Secure Payment", description: "SSL encrypted checkout" },
  // ];

  const paymentMethods = [
    "Visa", "PayPal", "UPI", "Net Banking"
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-50 to-white border-t border-gray-200">
      {/* Top Features */}
      {/* <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-50 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                  <feature.icon className="w-6 h-6 text-gray-700" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">{feature.title}</h4>
                  <p className="text-xs text-gray-500">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-5 py-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column - Brand & Newsletter */}
          <div>
            {/* Brand */}
            <div className="mb-8" >
              <h2 className="font-serif text-4xl font-bold mb-3 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                ZafaF
              </h2>
              {/* <p className="text-gray-600 text-sm mb-4 font-medium tracking-wide">
                HAUTE PARFUM • SINCE 2010
              </p>
              <p className="text-gray-600 max-w-md leading-relaxed">
                Crafting exceptional fragrances for those who appreciate the art of scent. 
                Each bottle is a masterpiece of luxury perfumery.
              </p> */}
            </div>

            {/* Newsletter */}
            {/* <div className="mb-10 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2 text-gray-900">
                <Mail className="w-5 h-5 text-gray-600" />
                Stay Updated
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Subscribe to receive exclusive offers and new arrivals
              </p>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSubscribe()}
                    placeholder="Enter your email"
                    className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                  />
                  <button
                    onClick={handleSubscribe}
                    className="bg-gray-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-all shadow-sm hover:shadow-md flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Join
                  </button>
                </div>
                {subscriptionSuccess && (
                  <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
                    <CheckCircle className="w-4 h-4" />
                    Successfully subscribed!
                  </div>
                )}
              </div>
            </div> */}

            {/* Contact Info */}
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

          {/* Right Column - Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Shop */}
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

            {/* Customer Service */}
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

            {/* Company */}
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

            {/* Policies */}
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

        {/* Social Media & Payment Methods */}
        <div className="border-t border-gray-200 mt-12 pt-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Social Media */}
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

            {/* Payment Methods */}
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

            {/* App Store Badges */}
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

        {/* Awards & Certifications */}
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

        {/* Copyright */}
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
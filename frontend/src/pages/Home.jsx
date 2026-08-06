import { 
  Sparkles, Star, Truck, Shield, Heart, Zap, ArrowRight, Package, 
  Clock, CheckCircle, Gift, Leaf, Crown, TrendingUp, ChevronDown,
  Users, Award, Globe, ShoppingBag, ArrowUpRight, StarHalf,
  Search, ShoppingCart, Tag, Percent, Award as AwardIcon,
  TrendingUp as TrendingUpIcon, RefreshCw, Clock as ClockIcon,
  Play, Instagram, Facebook, Twitter, Youtube, Plus, Minus,
  Gem, Palette, Droplets, Sunset, Moon, Sunrise, Eye,
  Scissors, Sparkle, Target, Cpu, BadgeCheck, Lock,
  MessageCircle, ThumbsUp, Award as AwardIcon2, Gift as GiftIcon,
  Truck as TruckIcon, Headphones, ShieldCheck, TreePine,
  PhoneCall, Mail, MapPin, CreditCard, Shield as ShieldIcon,
  RotateCcw, Smile, Flower2, Waves, Mountain, Sun,
  Snowflake, Flower2 as FlowerIcon, Thermometer, Droplet,
  Sprout, Recycle, Battery, Zap as ZapIcon, Verified,
  CheckCircle2, BadgeCheck as BadgeCheck2, Star as StarIcon,
  Gift as GiftIcon2, Truck as TruckIcon2, Clock as ClockIcon2,
  Package as PackageIcon, RefreshCw as RefreshCwIcon, Phone,
  MapPin as MapPinIcon, Mail as MailIcon
} from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [activeFragrance, setActiveFragrance] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [activeSale, setActiveSale] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeSeason, setActiveSeason] = useState(0);
  const [activeFeature, setActiveFeature] = useState(0);

  const handleNavigateToProducts = () => {
    navigate('/products');
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    // Auto-rotate testimonials
    const testimonialInterval = setInterval(() => {
      setTestimonialIndex(prev => (prev + 1) % testimonials.length);
    }, 5000);

    // Auto-rotate sale items
    const saleInterval = setInterval(() => {
      setActiveSale(prev => (prev + 1) % saleItems.length);
    }, 4000);

    // Auto-rotate gallery images
    const galleryInterval = setInterval(() => {
      setActiveImageIndex(prev => (prev + 1) % galleryImages.length);
    }, 3000);

    // Auto-rotate seasons
    const seasonInterval = setInterval(() => {
      setActiveSeason(prev => (prev + 1) % seasons.length);
    }, 7000);

    // Auto-rotate features
    const featureInterval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % features.length);
    }, 6000);
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(testimonialInterval);
      clearInterval(saleInterval);
      clearInterval(galleryInterval);
      clearInterval(seasonInterval);
      clearInterval(featureInterval);
    };
  }, []);

  const fragrances = [
    { 
      name: "Velvet Noir", 
      note: "Oud & Leather", 
      color: "from-amber-900 via-yellow-800 to-orange-900", 
      // description: "Bold, luxurious, enigmatic", 
      // price: "₹6,999", 
      // originalPrice: "₹9,999",
      discount: 30,
      image: "https://i.pinimg.com/736x/22/67/17/226717c70a74bfd8c4e30be5ade5d4e9.jpg",
      category: "Premium",
      rating: 4.9,
      reviews: 234,
      bestseller: true,
      new: false,
      size: "100ml",
      intensity: "Strong",
      season: "Winter"
    },
    { 
      name: "Midnight Rose", 
      note: "Rose & Amber", 
      color: "from-rose-900 via-pink-800 to-red-900", 
      // description: "Seductive, elegant, timeless", 
      // price: "₹5,999", 
      // originalPrice: "₹7,999",
      discount: 25,
      image: "https://i.pinimg.com/1200x/47/bd/8a/47bd8a11ce1e478d86dc636d6e497db7.jpg",
      category: "Best Seller",
      rating: 4.8,
      reviews: 189,
      bestseller: true,
      new: false,
      size: "90ml",
      intensity: "Medium",
      season: "All Season"
    },
    { 
      name: "Azure Dream", 
      note: "Marine & Citrus", 
      color: "from-cyan-900 via-blue-800 to-indigo-900", 
      // description: "Crisp, refreshing, modern", 
      // price: "₹5,499", 
      // originalPrice: "₹6,999",
      discount: 21,
      image: "https://i.pinimg.com/736x/75/d9/d1/75d9d114af71a3a9a4c2e8ab8547fb58.jpg",
      category: "New Arrival",
      rating: 4.7,
      reviews: 156,
      bestseller: false,
      new: true,
      size: "120ml",
      intensity: "Light",
      season: "Summer"
    },
    { 
      name: "Golden Aura", 
      note: "Vanilla & Musk", 
      color: "from-yellow-800 via-amber-700 to-orange-800", 
      // description: "Warm, sophisticated, lasting", 
      // price: "₹6,499", 
      // originalPrice: "₹8,999",
      discount: 28,
      image: "https://i.pinimg.com/1200x/65/f8/f1/65f8f14b2af28574eae2fcad1ff0e969.jpg",
      category: "Limited Edition",
      rating: 4.9,
      reviews: 198,
      bestseller: true,
      new: false,
      size: "100ml",
      intensity: "Strong",
      season: "Autumn"
    }
  ];

  const saleItems = [
    { 
      name: "Summer Breeze", 
      discount: 40, 
      endsIn: "2 days", 
      image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&h=500&fit=crop&q=80",
      category: "Summer Collection",
      price: "₹4,499",
      originalPrice: "₹7,499"
    },
    { 
      name: "Winter Woods", 
      discount: 35, 
      endsIn: "3 days", 
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=500&fit=crop&q=80",
      category: "Winter Special",
      price: "₹5,199",
      originalPrice: "₹7,999"
    },
    { 
      name: "Spring Bloom", 
      discount: 45, 
      endsIn: "1 day", 
      image: "https://images.unsplash.com/photo-1531214159280-079b95d26139?w=400&h=500&fit=crop&q=80",
      category: "Spring Collection",
      price: "₹3,999",
      originalPrice: "₹7,299"
    },
  ];

  const benefits = [
    { 
      icon: Gem, 
      title: "Premium Ingredients", 
      description: "Sourced from world's finest producers", 
      color: "bg-gradient-to-br from-amber-50 to-amber-100 text-amber-600",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop&q=80"
    },
    { 
      icon: ShieldCheck, 
      title: "Quality Guarantee", 
      description: "100% authentic & certified products", 
      color: "bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600",
      image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=300&fit=crop&q=80"
    },
    { 
      icon: TruckIcon, 
      title: "Express Delivery", 
      description: "Free shipping on orders above ₹2999", 
      color: "bg-gradient-to-br from-emerald-50 to-emerald-100 text-emerald-600",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop&q=80"
    },
    { 
      icon: Gift, 
      title: "Luxury Packaging", 
      description: "Elegant gift boxes with customization", 
      color: "bg-gradient-to-br from-pink-50 to-pink-100 text-pink-600",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop&q=80"
    },
    { 
      icon: Leaf, 
      title: "Eco-Friendly", 
      description: "Sustainable & cruelty-free practices", 
      color: "bg-gradient-to-br from-green-50 to-green-100 text-green-600",
      image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=300&fit=crop&q=80"
    },
    { 
      icon: Sparkle, 
      title: "Long Lasting", 
      description: "12-14 hours fragrance retention", 
      color: "bg-gradient-to-br from-purple-50 to-purple-100 text-purple-600",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop&q=80"
    }
  ];

  const features = [
    { 
      icon: Users, 
      title: "Personal Consultation", 
      description: "Get expert fragrance recommendations tailored to your style",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=500&fit=crop&q=80"
    },
    { 
      icon: Award, 
      title: "Award Winning", 
      description: "Recognized by International Fragrance Foundation 2024",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=500&fit=crop&q=80"
    },
    { 
      icon: Globe, 
      title: "Global Shipping", 
      description: "Free international delivery on orders above ₹15,000",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=500&fit=crop&q=80"
    },
    { 
      icon: StarHalf, 
      title: "Custom Blending", 
      description: "Create your unique signature scent with our master perfumers",
      image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&h=500&fit=crop&q=80"
    }
  ];

  const stats = [
    { icon: AwardIcon, value: "25+", label: "Industry Awards", color: "text-amber-600" },
    { icon: Globe, value: "60+", label: "Countries Served", color: "text-blue-600" },
    { icon: Users, value: "75K+", label: "Happy Customers", color: "text-emerald-600" },
    { icon: ThumbsUp, value: "99%", label: "Satisfaction Rate", color: "text-purple-600" },
  ];

  const testimonials = [
    { 
      name: "Aisha Khan", 
      role: "Fashion Influencer", 
      content: "ZafaF perfumes transformed my entire scent wardrobe. The quality is unmatched and the longevity is incredible!", 
      rating: 5,
      // image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&q=80",
      purchase: "Velvet Noir"
    },
    { 
      name: "Rohan Mehta", 
      role: "Business Executive", 
      content: "Golden Aura has become my signature scent. Compliments every single day! The packaging alone is worth it.", 
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&q=80",
      purchase: "Golden Aura"
    },
    { 
      name: "Sophia Chen", 
      role: "Luxury Blogger", 
      content: "The attention to detail is remarkable. From the packaging to the fragrance itself - pure perfection!", 
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&q=80",
      purchase: "Midnight Rose"
    }
  ];

  const galleryImages = [
    { 
      url: "https://in.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-afternoon-swim--LP0313_PM1_Interior%20view.png?wid=1090&hei=1090", 
      title: "Luxury Collection",
      description: "Premium craftsmanship in every bottle"
    },
    { 
      url: "https://in.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-rhapsody--LP0245_PM1_Detail%20view.png?wid=1090&hei=1090", 
      title: "Elegant Packaging",
      description: "Artisanal boxes for the perfect gift"
    },
    { 
      url: "https://in.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-on-the-beach--LP0226_PM1_Other%20view.png?wid=1090&hei=1090", 
      title: "Fragrance Art",
      description: "Master perfumers at work"
    },
    { 
      url: "https://in.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-myriad--LP0350_PM1_Cropped%20view.png?wid=1090&hei=1090", 
      title: "Premium Ingredients",
      description: "Sourced from nature's finest"
    }
  ];

  const seasons = [
    {
      name: "Summer Fresh",
      icon: Sun,
      // color: "from-cyan-500 to-blue-600",
      image: "https://i.pinimg.com/1200x/ae/80/62/ae8062997aefbd1643312e26e498c74c.jpg",
      description: "Light & Refreshing Scents"
    },
    {
      name: "Winter Warmth",
      icon: Snowflake,
      // color: "from-blue-500 to-indigo-600",
      image: "https://static.zara.net/assets/public/460f/3e22/ec484797b10e/062266cd13ea/20110466999-e7/20110466999-e7.jpg?ts=1727333595429&w=750",
      description: "Rich & Spicy Fragrances"
    },
    {
      name: "Spring Bloom",
      icon: FlowerIcon,
      // color: "from-pink-500 to-rose-500",
      image: "https://i.pinimg.com/736x/8b/22/61/8b226132ea6e8d873c8632de6d88445b.jpg",
      description: "Floral & Fresh Notes"
    },
    {
      name: "Autumn Gold",
      icon: TreePine,
      // color: "from-amber-500 to-orange-600",
      image: "https://i.pinimg.com/1200x/8d/20/9b/8d209b58236b636386de6c84ba1ac1d8.jpg",
      description: "Woody & Warm Accords"
    }
  ];

  const newsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      alert(`Thank you for subscribing with ${newsletterEmail}! You'll receive our exclusive offers.`);
      setNewsletterEmail("");
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700;800&display=swap');
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes shimmer { 0% { background-position: -1000px 0; } 100% { background-position: 1000px 0; } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        @keyframes slideIn { from { transform: translateX(-20px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes gradient { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-fadeIn { animation: fadeIn 0.8s ease-out forwards; }
        .animate-pulse { animation: pulse 2s ease-in-out infinite; }
        .animate-slideIn { animation: slideIn 0.5s ease-out forwards; }
        .animate-gradient { animation: gradient 3s ease infinite; background-size: 200% 200%; }
        .shimmer { background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent); background-size: 1000px 100%; animation: shimmer 2.5s infinite; }
        .gradient-text { background: linear-gradient(135deg, #d4af37 0%, #b8860b 50%, #d4af37 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-size: 200% auto; animation: gradient 3s ease infinite; }
        .hover-lift { transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
        .hover-lift:hover { transform: translateY(-8px) scale(1.02); box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15); }
        .glass-effect { background: rgba(255, 255, 255, 0.15); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.2); }
        .hover-glow { transition: all 0.3s ease; }
        .hover-glow:hover { box-shadow: 0 0 30px rgba(212, 175, 55, 0.3); }
      `}</style>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-amber-50/30 to-orange-50/30">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-amber-200/30 to-orange-200/30 rounded-full mix-blend-multiply blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-yellow-200/30 to-amber-200/30 rounded-full mix-blend-multiply blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left space-y-8 animate-fadeIn">
              {/* Premium Badge */}
              <div className="inline-flex items-center gap-3 glass-effect text-gray-800 px-6 py-3 rounded-full shadow-lg hover-glow">
                <div className="relative">
                  <Gem className="w-5 h-5 text-gray-600" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-gray-500 rounded-full animate-pulse" />
                </div>
                <span className="text-sm font-bold tracking-wider">ARTISANAL PERFUMERY</span>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse" />
              </div>

              {/* Main Headline */}
              <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl leading-tight font-bold">
                <span className="block text-gray-800 opacity-90">Discover Your</span>
                <span className="block text-gray-800 mt-2">Signature Scent</span>
              </h1>

              {/* Description */}
              <p className="font-inter text-lg text-gray-600/90 max-w-xl leading-relaxed">
                Experience the art of fine fragrance. Each bottle is meticulously crafted using rare ingredients and traditional techniques perfected over generations.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button 
                  onClick={handleNavigateToProducts}
                  className="group relative overflow-hidden bg-gradient-to-r from-gray-900 to-black text-white px-8 py-4 rounded-full font-bold text-lg hover:from-amber-700 hover:to-amber-800 transition-all duration-300 hover-lift shadow-xl flex items-center justify-center gap-3"
                >
                  <span className="relative z-10">Shop Collection</span>
                  <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-2 transition-transform" />
                </button>
                <button className="glass-effect text-gray-800 px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/30 transition-all hover-lift border border-amber-200/30">
                  Book Consultation
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-12 border-t border-amber-100/30">
                <div className="text-center group">
                  <div className="text-3xl font-bold text-black mb-2 group-hover:scale-110 transition-transform">250+</div>
                  <div className="text-sm text-gray-600/80 font-medium">Premium Scents</div>
                </div>
                <div className="text-center group">
                  <div className="text-3xl font-bold text-black mb-2 group-hover:scale-110 transition-transform">50K+</div>
                  <div className="text-sm text-gray-600/80 font-medium">Happy Clients</div>
                </div>
                <div className="text-center group">
                  <div className="text-3xl font-bold text-black mb-2 group-hover:scale-110 transition-transform">4.9</div>
                  <div className="flex items-center justify-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Image - Rearranged for better layout */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative group animate-float">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-orange-400/20 rounded-3xl blur-3xl scale-110 group-hover:scale-125 transition-transform duration-700" />
                
                <div className="relative overflow-hidden rounded-3xl shadow-2xl border-8 border-white/70 backdrop-blur-sm">
                  <img 
                    src="https://i.pinimg.com/1200x/bc/00/dc/bc00dc2acd7648848c829276b65f58ae.jpg" 
                    alt="Luxury Perfume"
                    className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  
                  {/* Floating Badge */}
                  <div className="absolute top-6 right-6 bg-gray-500 to-orange-500 text-white rounded-full px-4 py-2 shadow-lg animate-pulse">
                    <span className="text-sm font-bold">Best Seller</span>
                  </div>
                  
                  {/* Product Info */}
                  {/* <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-8">
                    <h3 className="font-playfair text-2xl text-white mb-2">Midnight Rose</h3>
                    <p className="text-amber-200/90 mb-3">Rose & Amber | 90ml</p>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-white">₹5,999</div>
                      <button className="glass-effect text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-white/20 transition-all">
                        Add to Cart
                      </button>
                    </div>
                  </div> */}
                </div>
                
                {/* Additional Floating Elements */}
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-amber-300/30 to-orange-300/30 rounded-full blur-xl" />
                <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-gradient-to-tr from-rose-300/30 to-pink-300/30 rounded-full blur-xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Flash Sale Banner - Improved Layout */}
      <section className="bg-gradient-to-r from-red-50 via-orange-50 to-amber-50 py-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold animate-pulse shadow-lg">
                  FLASH SALE
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-ping"></div>
              </div>
              <div className="text-lg font-semibold text-gray-900">
                Up to <span className="text-red-600 font-bold">45% OFF</span> selected items
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <ClockIcon className="w-5 h-5 text-red-500 animate-pulse" />
                <span className="text-gray-700 font-medium">Ends in: <span className="font-bold">{saleItems[activeSale].endsIn}</span></span>
              </div>
              <button 
                onClick={handleNavigateToProducts}
                className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-8 py-3 rounded-full font-semibold hover:from-red-700 hover:to-orange-700 transition-all hover-lift shadow-lg flex items-center gap-2"
              >
                <Zap className="w-4 h-4" />
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Seasonal Collections - Enhanced Layout */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-black to-gray-500 px-6 py-3 rounded-full mb-6">
              <TreePine className="w-5 h-5 text-white" />
              <span className="font-semibold text-white">SEASONAL FAVORITES</span>
            </div>
            <h2 className="font-playfair text-4xl md:text-5xl mb-6">
              Scents for Every <span className="gradient-text">Season</span>
            </h2>
            <p className="font-inter text-gray-600 text-lg max-w-2xl mx-auto">
              Discover the perfect fragrance that complements each season's unique character
            </p>
          </div>

          {/* Seasons Grid with Enhanced Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {seasons.map((season, idx) => (
              <div 
                key={idx}
                className={`relative overflow-hidden rounded-3xl group cursor-pointer transition-all duration-500 hover-lift ${
                  idx === activeSeason ? 'ring-4 ring-amber-500 shadow-2xl' : 'shadow-lg'
                }`}
                onClick={() => setActiveSeason(idx)}
              >
                {/* Image Container */}
                <div className="relative h-72 overflow-hidden">
                  <img 
                    src={season.image}
                    alt={season.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${season.color} opacity-70 group-hover:opacity-60 transition-opacity`} />
                  
                  {/* Season Icon */}
                  <div className="absolute top-6 left-6 w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
                    <season.icon className="w-7 h-7 text-white" />
                  </div>
                </div>
                
                {/* Content */}
                {/* <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                  <h3 className="text-2xl font-bold text-white mb-2">{season.name}</h3>
                  <p className="text-amber-100/90 text-sm mb-4">{season.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-white/80 text-sm">Explore Collection</span>
                    <ArrowRight className="w-5 h-5 text-amber-300 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div> */}
                
                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            ))}
          </div>

          {/* Active Season Details */}
          {/* <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl p-8 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-playfair text-2xl font-bold text-gray-900">{seasons[activeSeason].name}</h3>
                <p className="text-gray-600">{seasons[activeSeason].description}</p>
              </div>
              <button className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-3 rounded-full font-semibold hover-lift">
                View Collection
              </button>
            </div>
          </div> */}
        </div>
      </section>

      {/* Featured Fragrances - Professional Grid Layout */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
              <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
              <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
            </div>
            <h2 className="font-playfair text-4xl md:text-5xl mb-6">
              Curated <span className="gradient-text">Collections</span>
            </h2>
            <p className="font-inter text-gray-600 text-lg max-w-2xl mx-auto">
              Discover our handpicked selection of exceptional fragrances, each telling its own story
            </p>
          </div>
          {/* Collection Grid - Enhanced Elephant Look */}
<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
  {fragrances.map((fragrance, idx) => (
    <div 
      key={idx} 
      className="group relative bg-gradient-to-b from-white to-gray-50 rounded-3xl overflow-hidden shadow-lg hover:shadow-3xl transition-all duration-500 border border-gray-200 hover:border-gray-300"
      onMouseEnter={() => setActiveFragrance(idx)}
      onClick={handleNavigateToProducts}
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${fragrance.color} opacity-5`} />
      
      {/* Elephant Pattern Overlay */}
      {/* <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0c16.569 0 30 13.431 30 30 0 16.569-13.431 30-30 30C13.431 60 0 46.569 0 30 0 13.431 13.431 0 30 0zm0 5C16.193 5 5 16.193 5 30c0 13.807 11.193 25 25 25 13.807 0 25-11.193 25-25C55 16.193 43.807 5 30 5zm-5 25a5 5 0 110-10 5 5 0 010 10zm20 0a5 5 0 110-10 5 5 0 010 10z' fill='%23000' fill-rule='evenodd'/%3E%3C/svg%3E")`,
             backgroundSize: '60px 60px'
           }} 
      /> */}

      {/* Product Image Container */}
      <div className="relative h-72 overflow-hidden">
        {/* Image with Elegant Frame */}
        <div className="absolute inset-4 rounded-2xl overflow-hidden">
          <img 
            src={fragrance.image} 
            alt={fragrance.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        </div>
        
        {/* Luxury Badge - Elephant Inspired */}
        <div className="absolute top-4 left-4">
          <div className="bg-gradient-to-r from-amber-900 to-amber-700 text-white px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
            <span className="text-xs font-bold tracking-wider">PREMIUM</span>
          </div>
        </div>
        
        {/* Discount Badge - Elegant Design */}
        {fragrance.discount > 0 && (
          <div className="absolute top-4 right-4 bg-gradient-to-br from-red-600 to-rose-600 text-white px-4 py-2 rounded-xl shadow-lg transform -rotate-3">
            <div className="text-center">
              <div className="text-xs font-light">SAVE</div>
              <div className="text-lg font-black leading-none">{fragrance.discount}%</div>
            </div>
          </div>
        )}
        
        {/* Quick View Button */}
        <button className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white transform hover:scale-110">
          <div className="relative">
            <ShoppingBag className="w-5 h-5 text-amber-700" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
          </div>
        </button>
      </div>

      {/* Product Info */}
      <div className="p-6 pt-8 relative">
        {/* Scent Notes Indicators */}
        <div className="flex items-center justify-center gap-1 mb-6">
          {[1, 2, 3].map((dot) => (
            <div 
              key={dot} 
              className={`w-2 h-2 rounded-full ${fragrance.color} opacity-${20 + dot * 20}`}
            />
          ))}
        </div>
        
        {/* Product Name */}
        <div className="text-center mb-4">
          <h3 className="font-serif text-2xl font-bold text-gray-900 mb-2 group-hover:text-amber-800 transition-colors">
            {fragrance.name}
          </h3>
          <p className="text-sm text-gray-500 italic font-light tracking-wider">{fragrance.note}</p>
        </div>
        
        {/* Price Section */}
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-3xl font-black text-gray-900">{fragrance.price}</span>
            {fragrance.originalPrice && (
              <span className="text-sm text-gray-400 line-through">{fragrance.originalPrice}</span>
            )}
          </div>
          {/* <div className="text-xs text-gray-500 font-medium">INCLUDES FREE SHIPPING</div> */}
        </div>
        
        {/* Action Bar */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-4 h-4 ${i < Math.floor(fragrance.rating) ? 'fill-amber-500 text-amber-500' : 'fill-gray-300 text-gray-300'}`}
                />
              ))}
            </div>
            <span className="text-sm font-semibold text-gray-700">{fragrance.rating}</span>
          </div>
          
          {/* Details Button */}
          <button className="group relative overflow-hidden bg-gradient-to-r from-amber-800 to-amber-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all hover:from-amber-700 hover:to-amber-500 shadow-md hover:shadow-lg">
            <span>Explore</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-300" />
          </button>
        </div>
      </div>
      
      {/* Hover Effect Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    </div>
  ))}
</div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <button 
              onClick={handleNavigateToProducts}
              className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full font-bold hover:from-amber-700 hover:to-amber-800 transition-all hover-lift shadow-lg"
            >
              View All Fragrances
              <ArrowUpRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Image Gallery Section */}
     {/* Image Gallery Section - Fixed Layout */}
<section className="py-20 bg-gradient-to-b from-white to-amber-50/20">
  <div className="max-w-7xl mx-auto px-4 sm:px-6">
    <div className="text-center mb-16">
      <h2 className="font-playfair text-4xl md:text-5xl mb-6">
        Experience <span className="gradient-text">Luxury</span>
      </h2>
      <p className="font-inter text-gray-600 text-lg max-w-2xl mx-auto">
        Immerse yourself in the world of fine fragrances and artisanal craftsmanship
      </p>
    </div>

    {/* Main Gallery Image - Fixed */}
    <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl mb-8">
      <img 
        src={galleryImages[activeImageIndex].url} 
        alt={galleryImages[activeImageIndex].title}
        className="w-full h-full object-cover transition-all "
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent">
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <h3 className="text-3xl md:text-4xl font-playfair font-bold text-white mb-3">
            {galleryImages[activeImageIndex].title}
          </h3>
          <p className="text-amber-100/90 text-lg max-w-2xl">
            {galleryImages[activeImageIndex].description}
          </p>
        </div>
      </div>
      
      {/* Navigation Arrows */}
      <button 
        onClick={() => setActiveImageIndex((prev) => prev === 0 ? galleryImages.length - 1 : prev - 1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
      >
        <ArrowRight className="w-6 h-6 text-white rotate-180" />
      </button>
      <button 
        onClick={() => setActiveImageIndex((prev) => (prev + 1) % galleryImages.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
      >
        <ArrowRight className="w-6 h-6 text-white" />
      </button>
    </div>

    {/* Thumbnail Gallery - Fixed Grid */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {galleryImages.map((img, idx) => (
        <button
          key={idx}
          onClick={() => setActiveImageIndex(idx)}
          className={`relative aspect-square rounded-xl overflow-hidden transition-all duration-300 group ${
            activeImageIndex === idx 
              ? 'ring-3 ring-amber-500 shadow-lg scale-[1.02]' 
              : 'ring-1 ring-gray-200 hover:ring-amber-300'
          }`}
        >
          <img 
            src={img.url} 
            alt={img.title} 
            className="w-90 h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className={`absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
            activeImageIndex === idx ? 'opacity-100' : ''
          }`}>
            <div className="absolute bottom-2 left-2 right-2">
              <h4 className="text-white text-sm font-semibold truncate">{img.title}</h4>
            </div>
          </div>
          
          {/* Active Indicator */}
          {activeImageIndex === idx && (
            <div className="absolute top-2 right-2 w-3 h-3 bg-amber-500 rounded-full animate-pulse"></div>
          )}
        </button>
      ))}
    </div>
  </div>
</section>

{/* Video Section - Enhanced Layout */}
<section className="py-20 bg-gray-500 via-black to-gray-900 text-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6">
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <div className="space-y-6">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full mb-4">
          <Play className="w-4 h-4" />
          <span className="text-sm font-semibold">BEHIND THE SCENES</span>
        </div>
        
        <h2 className="font-playfair text-4xl md:text-5xl">
          The Art of <span className="text-amber-400">Perfumery</span>
        </h2>
        <p className="text-gray-300 text-lg leading-relaxed">
          Watch our master perfumers craft the perfect blend. Every drop is a testament to our commitment to excellence and centuries-old artistry.
        </p>
        
        <div className="space-y-3 pt-4">
          {[
            "Handcrafted by Master Perfumers",
            "Traditional Techniques Preserved",
            "Premium Quality Assurance",
            "Sustainable Sourcing"
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-black flex-shrink-0" />
              <span className="text-gray-200">{item}</span>
            </div>
          ))}
        </div>
        
        <button className="mt-6 bg-gray-900 to-orange-600 text-white px-8 py-3 rounded-full font-semibold hover:from-amber-700 hover:to-orange-700 transition-all hover-lift flex items-center gap-2">
          <Play className="w-4 h-4" />
          Watch Documentary
        </button>
      </div>
      
      {/* Video Container - Fixed */}
      <div className="relative group">
        <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-700"></div>
        
        <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10">
          <img 
            src="https://i.pinimg.com/1200x/f3/43/59/f3435938903bd6e2d27e506bef5a7d94.jpg" 
            alt="Master Perfumer at work"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-center justify-center">
            <button className="w-20 h-20 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-2xl group/play">
              <Play className="w-8 h-8 text-white ml-1" />
              <div className="absolute inset-0 rounded-full border-4 border-white/30 animate-ping opacity-0 group-hover/play:opacity-100"></div>
            </button>
          </div>
          
          {/* Play Indicator */}
          <div className="absolute bottom-6 right-6 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full">
            <span className="text-sm text-amber-200">Watch Now</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Stats Section */}
      <section className="py-16 bg-amber-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                    <stat.icon className="w-8 h-8 text-amber-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl mb-6">
              Why Choose <span className="gradient-text">ZafaF</span>
            </h2>
            <p className="font-inter text-gray-600 text-lg max-w-2xl mx-auto">
              Experience the difference with our premium offerings and exceptional service
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-lg hover-lift transition-all duration-300 group border border-gray-100">
                <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="font-playfair text-xl font-bold mb-3">{feature.title}</h3>
                <p className="font-inter text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Benefits */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-sm hover-lift border border-gray-100">
                <div className={`w-12 h-12 ${benefit.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <benefit.icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">{benefit.title}</h4>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Feed Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm mb-4">
              <Instagram className="w-4 h-4 text-pink-600" />
              <span className="text-sm font-semibold">@ZAFAF_PERFUMES</span>
            </div>
            <h2 className="font-playfair text-4xl md:text-5xl mb-4">
              Follow Our <span className="gradient-text">Journey</span>
            </h2>
            <p className="text-gray-600 text-lg">Join our community of fragrance lovers</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "https://i.pinimg.com/736x/61/cc/34/61cc34b26464ecfa9d1a69ed60b1f911.jpg",
              "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=400&h=400&fit=crop",
              "https://i.pinimg.com/1200x/ad/5f/ce/ad5fcef1603db426f88d3131c70e8ffc.jpg",
              "https://i.pinimg.com/736x/c0/99/ad/c099adcdc080b0d52c608ee897874ce9.jpg"
            ].map((img, idx) => (
              <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden group cursor-pointer hover-lift">
                <img src={img} alt={`Instagram ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <Instagram className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all hover-lift">
              <Instagram className="w-5 h-5" />
              Follow Us on Instagram
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl mb-6">
              Loved by <span className="gradient-text">Thousands</span>
            </h2>
            <p className="font-inter text-gray-600 text-lg">Hear what our customers have to say</p>
          </div>

          {/* Testimonial Carousel */}
          <div className="relative bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-8 md:p-12 shadow-lg">
            <div className="flex items-start gap-6">
              <img 
                src={testimonials[testimonialIndex].image} 
                alt={testimonials[testimonialIndex].name}
                className="w-20 h-20 rounded-full object-cover flex-shrink-0 border-4 border-white shadow-md"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(testimonials[testimonialIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <p className="text-lg text-gray-700 italic mb-6">"{testimonials[testimonialIndex].content}"</p>
                <div>
                  <div className="font-bold text-gray-900 text-lg">{testimonials[testimonialIndex].name}</div>
                  <div className="text-gray-600 text-sm">{testimonials[testimonialIndex].role}</div>
                </div>
              </div>
            </div>
            
            {/* Navigation Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setTestimonialIndex(idx)}
                  className={`w-3 h-3 rounded-full transition-all ${testimonialIndex === idx ? 'bg-amber-600 scale-125' : 'bg-gray-300'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gradient-to-r from-amber-50 to-orange-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm text-black px-6 py-3 rounded-full shadow-sm mb-8">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold tracking-wide">EXCLUSIVE OFFERS</span>
          </div>
          
          <h2 className="font-playfair text-4xl md:text-5xl mb-6">
            Join Our <span className="gradient-text">Exclusive</span> Club
          </h2>
          <p className="font-inter text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Subscribe to receive updates on new arrivals, exclusive offers, and fragrance tips
          </p>
          
          <form onSubmit={newsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-full border border-gray-300 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
              required
            />
            <button
              type="submit"
              className="bg-black text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-800 transition-colors hover-lift shadow-lg"
            >
              Subscribe
            </button>
          </form>
          
          <p className="text-sm text-gray-500 mt-4">
            By subscribing, you agree to our Privacy Policy
          </p>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="py-8 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-8">
            <div className="flex items-center gap-2">
              <Instagram className="w-5 h-5" />
              <span className="font-semibold">50K+ Followers</span>
            </div>
            <div className="flex items-center gap-2">
              <Facebook className="w-5 h-5" />
              <span className="font-semibold">30K+ Likes</span>
            </div>
            <div className="flex items-center gap-2">
              <Twitter className="w-5 h-5" />
              <span className="font-semibold">20K+ Followers</span>
            </div>
            <div className="flex items-center gap-2">
              <Youtube className="w-5 h-5" />
              <span className="font-semibold">15K+ Subscribers</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
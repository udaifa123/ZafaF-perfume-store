import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  CheckCircle, Truck, Package, Gift, Clock, 
  Sparkles, ArrowRight, Home, ShoppingBag, 
  CreditCard, Shield, Award
} from "lucide-react";

export default function OrderSuccess() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);
  const [orderNumber] = useState(`ORD-${Math.floor(100000 + Math.random() * 900000)}`);
  
  // Clear cart and redirect after 3 seconds
  useEffect(() => {
    localStorage.removeItem("cart");
    
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/orders");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  // Animation styles
  const animationStyles = `
    @keyframes confetti {
      0% { transform: translateY(-100px) rotate(0deg); opacity: 1; }
      100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
    }
    @keyframes shimmer {
      0% { background-position: -1000px 0; }
      100% { background-position: 1000px 0; }
    }
    .animate-confetti { animation: confetti 3s ease-in forwards; }
    .animate-float { animation: float 3s ease-in-out infinite; }
    .animate-pulse { animation: pulse 2s ease-in-out infinite; }
    .animate-shimmer {
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
      background-size: 1000px 100%;
      animation: shimmer 3s infinite;
    }
  `;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50 overflow-hidden relative">
      <style>{animationStyles}</style>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-200/30 to-emerald-200/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-amber-200/30 to-orange-200/30 rounded-full blur-3xl" />
        
        {/* Confetti Animation */}
        {[...Array(15)].map((_, i) => (
          <div 
            key={i}
            className="absolute animate-confetti"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              width: `${Math.random() * 20 + 10}px`,
              height: `${Math.random() * 20 + 10}px`,
              background: ['#10b981', '#f59e0b', '#3b82f6', '#8b5cf6', '#ec4899'][Math.floor(Math.random() * 5)],
              borderRadius: Math.random() > 0.5 ? '50%' : '0%',
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-16 text-center">
        
        {/* Success Icon */}
        <div className="relative mb-8">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full blur-xl opacity-70" />
            <div className="relative w-32 h-32 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl animate-float">
              <CheckCircle className="w-20 h-20 text-white" />
            </div>
            {/* Pulse Ring */}
            <div className="absolute inset-0 border-4 border-green-300 rounded-full animate-ping opacity-20" />
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Order <span className="text-green-600">Confirmed</span>
        </h1>
        
        {/* Order Number */}
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-100 to-emerald-100 px-6 py-3 rounded-full mb-6">
          <Shield className="w-5 h-5 text-green-600" />
          <span className="font-mono font-bold text-gray-800">Order #{orderNumber}</span>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        </div>

        {/* Success Message */}
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          Thank you for your purchase! Your order has been confirmed and is now being processed.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <Truck className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Fast Delivery</h3>
            <p className="text-sm text-gray-600">2-4 business days</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-amber-50 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <Gift className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Gift Ready</h3>
            <p className="text-sm text-gray-600">Premium packaging included</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Secure Order</h3>
            <p className="text-sm text-gray-600">100% payment protection</p>
          </div>
        </div>

        {/* Auto Redirect Message */}
        <div className="bg-gradient-to-r from-gray-900 to-black text-white rounded-2xl p-6 mb-8 shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-amber-300" />
              <div className="text-left">
                <p className="font-medium">Redirecting to Orders Page</p>
                <p className="text-sm text-gray-300">In {countdown} second{countdown !== 1 ? 's' : ''}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-green-400">{countdown}</div>
            </div>
          </div>
          <div className="mt-4 h-1 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-400 to-emerald-500 animate-shimmer transition-all duration-1000"
              style={{ width: `${(3 - countdown) * 33.33}%` }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => navigate("/")}
            className="group relative overflow-hidden bg-gradient-to-r from-gray-900 to-black text-white px-8 py-4 rounded-full font-semibold hover:from-amber-700 hover:to-orange-700 transition-all duration-300 hover:shadow-xl flex items-center justify-center gap-3"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </button>

          <button 
            onClick={() => navigate("/orders")}
            className="group bg-white border-2 border-gray-900 text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-900 hover:text-white transition-all duration-300 flex items-center justify-center gap-3"
          >
            <ShoppingBag className="w-5 h-5" />
            <span>View My Orders</span>
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              <span>You'll receive a confirmation email shortly</span>
            </div>
            <div className="hidden md:block w-1 h-1 bg-gray-300 rounded-full" />
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              <span>Order details will appear in your account</span>
            </div>
          </div>
        </div>

        {/* Celebration Message */}
        <div className="mt-8 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-600" />
            <span className="text-amber-700 font-medium">Welcome to the ZafaF Family!</span>
          </div>
          <p className="text-sm text-amber-600 mt-1">
            You've earned 150 loyalty points with this purchase
          </p>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
          <path fill="#10b981" fillOpacity="0.1" d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,138.7C672,128,768,160,864,181.3C960,203,1056,213,1152,202.7C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </div>
  );
}
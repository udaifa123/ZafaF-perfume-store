import { useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { CheckCircle, ShoppingBag, Home, Package, Clock } from "lucide-react";

export default function PayPalSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId, orderDetails } = location.state || {};

  useEffect(() => {
    if (!orderId) {
      navigate("/");
    }
    
    // Clear cart
    localStorage.removeItem("cartItems");
  }, [orderId, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          {/* Success Icon */}
          <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Payment Successful! 🎉
          </h1>
          <p className="text-gray-600 mb-6">
            Thank you for your order. Your PayPal payment has been processed successfully.
          </p>

          {/* Order Details */}
          {orderDetails && (
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <div className="flex items-center justify-center mb-4">
                <ShoppingBag className="w-6 h-6 text-gray-500 mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">Order Details</h2>
              </div>
              
              <div className="space-y-3 text-left">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order ID:</span>
                  <span className="font-medium">{orderId?.slice(-8)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Amount:</span>
                  <span className="font-bold text-green-600">
                    ₹{orderDetails.totalPrice?.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method:</span>
                  <span className="font-medium">PayPal</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-medium text-green-600">Paid</span>
                </div>
              </div>
              
              {/* PayPal Info */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-center mb-2">
                  <Package className="w-4 h-4 text-blue-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">PayPal Transaction</span>
                </div>
                <p className="text-xs text-gray-600">
                  Payment verified via PayPal Sandbox. Order will be processed shortly.
                </p>
              </div>
            </div>
          )}

          {/* Next Steps */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center justify-center">
              <Clock className="w-5 h-5 mr-2" />
              What's Next?
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>✓ PayPal payment confirmation received</p>
              <p>✓ Order will be processed within 24 hours</p>
              <p>✓ Shipping updates will be sent to your email</p>
              <p>✓ You can track your order from your account</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link
              to="/orders"
              className="block w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              View My Orders
            </Link>
            
            <Link
              to="/products"
              className="block w-full py-3 px-4 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Continue Shopping
            </Link>

            <Link
              to="/"
              className="inline-flex items-center justify-center w-full py-2 text-gray-500 hover:text-gray-700"
            >
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </div>

          {/* Sandbox Notice */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800 font-medium mb-1">Sandbox Mode Active</p>
              <p className="text-xs text-yellow-700">
                This was a test transaction using PayPal Sandbox. No real money was transferred.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
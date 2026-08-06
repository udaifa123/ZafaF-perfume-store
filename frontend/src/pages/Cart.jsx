import { useEffect, useState } from "react";
import API from "../api/axios";
import { ShoppingBag, ArrowLeft, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { successAlert, errorAlert, confirmAlert } from "../utils/alert";

const BASE_URL = "http://localhost:5000";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [updatingItem, setUpdatingItem] = useState(null);
  const [applyingCoupon, setApplyingCoupon] = useState(false);

  const navigate = useNavigate();

  // Fetch cart
useEffect(() => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  if (!userInfo?.token) {
    errorAlert("Login Required", "Please login to view cart");
    navigate("/login");
    return;
  }

  fetchCart();
}, [navigate]);


  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await API.get("/cart");
      setCartItems(res.data.items || []);
    } catch (error) {
      console.error(error);
      errorAlert(error.response?.data?.message || "Failed to load cart");
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  // Calculate total
  useEffect(() => {
    const t = cartItems.reduce((sum, item) => sum + item.quantity * (item.product?.price || 0), 0);
    setTotal(t);
  }, [cartItems]);

//   const handleUpdateQuantity = async (cartItemId, newQty) => {
//   if (newQty < 1) return;

//   try {
//     setUpdatingItem(cartItemId);
//     const res = await API.put(`/cart/${cartItemId}`, {
//       quantity: newQty,
//     });
//     setCartItems(res.data.items);
//   } catch (error) {
//     console.error("Update error", error);
//     errorAlert(error.response?.data?.message || "Failed to update quantity");
//   } finally {
//     setUpdatingItem(null);
//   }
// };

const handleUpdateQuantity = async (productId, newQty) => {
  try {
    setUpdatingItem(productId);
    const res = await API.put(`/cart/${productId}`, {
      quantity: newQty,
    });
    setCartItems(res.data.items);
  } catch (error) {
    errorAlert("Failed to update quantity", error);
  } finally {
    setUpdatingItem(null);
  }
};



//  const handleIncrease = (item) => {
//   handleUpdateQuantity(item._id, item.quantity + 1);
// };

// const handleDecrease = (item) => {
//   if (item.quantity <= 1) return;
//   handleUpdateQuantity(item._id, item.quantity - 1);
// };

const handleIncrease = (item) => {
  handleUpdateQuantity(item.product._id, item.quantity + 1);
};

const handleDecrease = (item) => {
  if (item.quantity <= 1) return;
  handleUpdateQuantity(item.product._id, item.quantity - 1);
};


// const handleRemove = async (item) => {
//   const result = await confirmAlert(
//     "Remove Item?",
//     "This item will be permanently removed from your cart"
//   );

//   if (!result.isConfirmed) return;

//   try {
//     const res = await API.delete(`/cart/${item._id}`);
//     setCartItems(res.data.items);
//     successAlert("Removed!", "Item removed from cart");
//   } catch (error) {
//     console.error("Remove error", error);
//     errorAlert(error.response?.data?.message || "Failed to remove item");
//   }
// };

const handleRemove = async (item) => {
  const result = await confirmAlert("Remove Item?", "Remove from cart?");
  if (!result.isConfirmed) return;

  try {
    const res = await API.delete(`/cart/${item.product._id}`);
    setCartItems(res.data.items);
    successAlert("Removed", "Item removed");
  } catch (error) {
    errorAlert("Failed to remove item", error);
  }
};



  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return errorAlert("Empty", "Enter a coupon code");

    setApplyingCoupon(true);
    const code = couponCode.trim().toUpperCase();
    setTimeout(() => {
      if (code === "SAVE10") setDiscount(total * 0.1);
      else if (code === "SAVE20") setDiscount(total * 0.2);
      else {
        setDiscount(0);
        errorAlert("Invalid", "Coupon code is not valid");
      }
      setApplyingCoupon(false);
    }, 500);
  };

  const shipping = total > 500 ? 0 : 50;
  const finalTotal = Math.max(0, total - discount + shipping);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <button onClick={() => navigate("/products")} className="flex items-center gap-2 mb-8">
          <ArrowLeft size={16} /> Continue Shopping
        </button>

        {cartItems.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingBag size={64} className="mx-auto mb-6" />
            <h2 className="text-xl font-light mb-4">Your cart is empty</h2>
            <button onClick={() => navigate("/products")} className="bg-black text-white px-10 py-4">
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <div key={item._id} className="border-b pb-6 flex gap-6">
                  <img
                    src={item.product?.image ? `${BASE_URL}/uploads/${item.product.image}` : "/placeholder.jpg"}
                    alt={item.product?.name}
                    className="w-32 h-40 object-cover cursor-pointer"
                    onClick={() => navigate(`/product/${item.product._id}`)}
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="uppercase font-medium">{item.product?.name}</h3>
                      <p className="text-gray-500 text-sm">{item.product?.category}</p>
                      <p className="mt-2 text-lg font-medium">
                        ₹{(item.product.price * item.quantity).toFixed(2)}{" "}
                        <span className="text-gray-500 text-sm">(₹{item.product.price} each)</span>
                      </p>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center border border-gray-300">
                        <button
                          onClick={() => handleDecrease(item)}
                          disabled={item.quantity <= 1 || updatingItem === item._id}
                          className="px-4 py-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          −
                        </button>
                        <span className="px-4 py-2 border-x border-gray-300">{item.quantity}</span>
                        <button
                          onClick={() => handleIncrease(item)}
                          disabled={updatingItem === item._id}
                          className="px-4 py-2 hover:bg-gray-50 disabled:opacity-50"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => handleRemove(item)}
                        className="flex items-center gap-1 text-red-600 hover:text-red-800 transition-colors text-sm"
                      >
                        <Trash2 size={16} /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="pt-6 flex gap-2">
                <input
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="ENTER COUPON CODE"
                  className="flex-1 border px-4 py-2"
                  onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
                />
                <button
                  onClick={handleApplyCoupon}
                  disabled={applyingCoupon || !couponCode.trim()}
                  className="bg-black text-white px-6 py-2"
                >
                  {applyingCoupon ? "Applying..." : "Apply"}
                </button>
              </div>
            </div>

            <div className="border p-6 h-fit sticky top-24 space-y-4">
              <h3>Order Summary</h3>
              <div className="flex justify-between"><span>Subtotal:</span><span>₹{total}</span></div>
              <div className="flex justify-between"><span>Discount:</span><span>₹{discount}</span></div>
              <div className="flex justify-between"><span>Shipping:</span><span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span></div>
              <hr />
              <div className="flex justify-between font-bold"><span>Total:</span><span>₹{finalTotal}</span></div>
              <button onClick={() => navigate("/checkout")} className="w-full bg-black text-white py-3">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// import { useEffect, useState } from "react";
// import API from "../api/axios";

// function Wishlist() {
//   const [wishlist, setWishlist] = useState([]);

//   useEffect(() => {
//     API.get("/wishlist", {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     })
//       .then((res) => setWishlist(res.data))
//       .catch((err) => console.error(err));
//   }, []);

//   const removeFromWishlist = async (id) => {
//     await API.delete(`/wishlist/${id}`, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     });

//     setWishlist((prev) => prev.filter((item) => item._id !== id));
//   };

//   return (
//     <div>
//       <h1>Wishlist</h1>

//       {wishlist.length === 0 ? (
//         <p>Your wishlist is empty</p>
//       ) : (
//         wishlist.map((item) => (
//           <div key={item._id}>
//             <h3>{item.product?.name}</h3>
//             <p>₹{item.product?.price}</p>
//             <button onClick={() => removeFromWishlist(item._id)}>
//               Remove
//             </button>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

// export default Wishlist;






import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";
import {
  Heart,
  ShoppingBag,
  Trash2,
  ChevronRight,
  Package,
  Plus,
  Eye,
  Star,
  Sparkles
} from "lucide-react";
import { successAlert, errorAlert, confirmAlert } from "../utils/alert";

const IMAGE_URL = "http://localhost:5000/uploads";

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  if (!userInfo?.token) {
    navigate("/login");
    return;
  }

  const fetchWishlist = async () => {
    try {
      const res = await API.get("/wishlist"); // ✅ NO HEADERS
      setWishlistItems(res.data);
    } catch (error) {
      console.error(error);
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  fetchWishlist();
}, [navigate]);


  const removeFromWishlist = async (wishlistId, productName) => {
    const result = await confirmAlert(
      "Remove from Wishlist?",
      `Remove "${productName}" from your wishlist?`
    );
    
    if (!result.isConfirmed) return;

    try {
      const token = localStorage.getItem("token");
      await API.delete(`/wishlist/${wishlistId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setWishlistItems(prev => prev.filter(item => item._id !== wishlistId));
      successAlert("Removed", "Item removed from wishlist");
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      errorAlert("Error", "Failed to remove item");
    }
  };
const addToCart = async (wishlistId, productId, productName) => {
  setAddingToCart(productId);
  try {
    const token = localStorage.getItem("token");

    // 1️⃣ Add to cart
    await API.post(
      "/cart",
      { productId, quantity: 1 },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // 2️⃣ Remove from wishlist
    await API.delete(`/wishlist/${wishlistId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    // 3️⃣ Update UI
    setWishlistItems(prev =>
      prev.filter(item => item._id !== wishlistId)
    );

    successAlert(
      "Moved to Cart",
      `"${productName}" moved from wishlist to cart`
    );
  } catch (error) {
    console.error(error);
    errorAlert("Error", "Failed to move item to cart");
  } finally {
    setAddingToCart(null);
  }
};

  const addAllToCart = async () => {
    if (wishlistItems.length === 0) return;

    const result = await confirmAlert(
      "Add All to Cart?",
      `Add all ${wishlistItems.length} items to your shopping cart?`
    );
    
    if (!result.isConfirmed) return;

    try {
      const token = localStorage.getItem("token");
      const promises = wishlistItems.map(item =>
        API.post("/cart", 
          { productId: item.product._id, quantity: 1 },
          { headers: { Authorization: `Bearer ${token}` } }
        )
      );

      await Promise.all(promises);
      successAlert("Success", "All items added to your cart");
    } catch (error) {
      console.error("Error adding all to cart:", error);
      errorAlert("Error", "Some items couldn't be added to cart");
    }
  };

  const moveAllToCart = async () => {
    if (wishlistItems.length === 0) return;

    const result = await confirmAlert(
      "Move All to Cart?",
      `Move all items from wishlist to cart and clear wishlist?`
    );
    
    if (!result.isConfirmed) return;

    try {
      const token = localStorage.getItem("token");
      
      // Add all to cart
      const cartPromises = wishlistItems.map(item =>
        API.post("/cart", 
          { productId: item.product._id, quantity: 1 },
          { headers: { Authorization: `Bearer ${token}` } }
        )
      );

      // Remove all from wishlist
      const wishlistPromises = wishlistItems.map(item =>
        API.delete(`/wishlist/${item._id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      );

      await Promise.all([...cartPromises, ...wishlistPromises]);
      
      setWishlistItems([]);
      successAlert("Success", "All items moved to cart");
    } catch (error) {
      console.error("Error moving items:", error);
      errorAlert("Error", "Could not move all items");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-2 border-gray-200 rounded-full"></div>
          <div className="w-16 h-16 border-2 border-black border-t-transparent rounded-full animate-spin absolute top-0"></div>
        </div>
        <p className="mt-6 text-sm font-light tracking-widest text-gray-500">LOADING WISHLIST</p>
      </div>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div>
                <h1 className="text-3xl font-light tracking-tight text-gray-900 mb-2">
                  MY WISHLIST
                </h1>
                <p className="text-gray-500 text-sm">
                  Save your favorite items for later
                </p>
              </div>
              <button
                onClick={() => navigate("/products")}
                className="text-sm text-gray-600 hover:text-black font-medium tracking-wide uppercase flex items-center gap-1 group self-start"
              >
                CONTINUE SHOPPING
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center py-24 px-6">
          <div className="w-32 h-32 bg-pink-50 rounded-full flex items-center justify-center mb-8">
            <Heart className="w-16 h-16 text-pink-300" />
          </div>
          <h2 className="text-2xl font-light text-gray-900 mb-4">YOUR WISHLIST IS EMPTY</h2>
          <p className="text-gray-500 text-center max-w-md mb-10">
            Save items you love by clicking the heart icon. They'll appear here for you to purchase later.
          </p>
          <button
            onClick={() => navigate("/products")}
            className="bg-black text-white px-10 py-3.5 text-sm tracking-widest font-medium hover:bg-gray-900 transition-all duration-200 uppercase"
          >
            DISCOVER PRODUCTS
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-light tracking-tight text-gray-900 mb-2">
                MY WISHLIST
              </h1>
              <p className="text-gray-500 text-sm font-light">
                {wishlistItems.length} ITEM{wishlistItems.length !== 1 ? 'S' : ''} • TOTAL: ₹
                {wishlistItems.reduce((sum, item) => sum + item.product.price, 0).toLocaleString('en-IN')}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={addAllToCart}
                className="px-6 py-3 text-sm font-medium tracking-wider uppercase border border-black text-black hover:bg-black hover:text-white transition-all duration-200 flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                ADD ALL TO CART
              </button>
              <button
                onClick={moveAllToCart}
                className="px-6 py-3 text-sm font-medium tracking-wider uppercase bg-black text-white hover:bg-gray-900 transition-all duration-200 flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                MOVE ALL TO CART
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Wishlist Items */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {wishlistItems.map((item) => (
                <div
                  key={item._id}
                  className="border border-gray-200 bg-white hover:shadow-md transition-all duration-300 group"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Product Image */}
                    <div className="md:w-48 lg:w-56 bg-gray-50 relative overflow-hidden">
                      <Link to={`/product/${item.product._id}`}>
                        <img
                          src={`${IMAGE_URL}/${item.product.image}`}
                          alt={item.product.name}
                          className="w-full h-64 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.target.src = "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=600&fit=crop";
                          }}
                        />
                      </Link>
                      <button
                        onClick={() => removeFromWishlist(item._id, item.product.name)}
                        className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                        title="Remove from wishlist"
                      >
                        <Trash2 className="w-4 h-4 text-gray-600 hover:text-red-600" />
                      </button>
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 p-6">
                      <div className="flex flex-col h-full">
                        <div className="mb-4">
                          <Link 
                            to={`/product/${item.product._id}`}
                            className="text-lg font-light text-gray-900 hover:text-black transition-colors mb-2 block"
                          >
                            {item.product.name}
                          </Link>
                          <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                            {item.product.description?.slice(0, 100)}...
                          </p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <Star className="w-4 h-4 text-gray-300" />
                              <span className="ml-2">4.0</span>
                            </div>
                            <span>•</span>
                            <span>In Stock</span>
                          </div>
                        </div>

                        <div className="mt-auto">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-2xl font-light text-gray-900">
                                ₹{item.product.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                              </p>
                              {item.product.originalPrice && (
                                <p className="text-sm text-gray-400 line-through">
                                  ₹{item.product.originalPrice.toLocaleString('en-IN')}
                                </p>
                              )}
                            </div>

                            <div className="flex items-center gap-3">
                              <Link
                                to={`/product/${item.product._id}`}
                                className="px-4 py-2 text-sm font-medium tracking-wider uppercase border border-gray-300 text-gray-600 hover:border-black hover:text-black transition-all duration-200 flex items-center gap-2"
                                title="View details"
                              >
                                <Eye className="w-4 h-4" />
                                VIEW
                              </Link>
                              <button
  onClick={() =>
    addToCart(item._id, item.product._id, item.product.name)
  }
                                disabled={addingToCart === item.product._id}
                                className="px-6 py-2.5 text-sm font-medium tracking-wider uppercase bg-black text-white hover:bg-gray-900 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                              >
                                {addingToCart === item.product._id ? (
                                  <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                    ADDING...
                                  </>
                                ) : (
                                  <>
                                    <Plus className="w-4 h-4" />
                                    ADD TO CART
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="mt-10 pt-8 border-t border-gray-200">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="text-sm text-gray-500">
                  Showing {wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''} in your wishlist
                </div>
                <button
                  onClick={() => navigate("/products")}
                  className="text-sm text-gray-600 hover:text-black font-medium tracking-wide uppercase flex items-center gap-2 group self-start"
                >
                  CONTINUE SHOPPING
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar - Quick Stats & Actions */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              {/* Wishlist Summary */}
              <div className="border border-gray-200 p-6">
                <h3 className="text-sm font-medium text-gray-900 tracking-wider uppercase mb-4">
                  WISHLIST SUMMARY
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Items</span>
                    <span className="font-medium">{wishlistItems.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total Value</span>
                    <span className="font-medium text-lg">
                      ₹{wishlistItems.reduce((sum, item) => sum + item.product.price, 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Package className="w-4 h-4" />
                      <span>Free shipping on orders over ₹3000</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="border border-gray-200 p-6">
                <h3 className="text-sm font-medium text-gray-900 tracking-wider uppercase mb-4">
                  QUICK ACTIONS
                </h3>
                <div className="space-y-3">
                  <button
                    onClick={addAllToCart}
                    className="w-full px-4 py-3 text-sm font-medium tracking-wider uppercase border border-black text-black hover:bg-black hover:text-white transition-all duration-200 text-left flex items-center gap-3"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Add All to Cart
                  </button>
                  <button
                    onClick={moveAllToCart}
                    className="w-full px-4 py-3 text-sm font-medium tracking-wider uppercase bg-black text-white hover:bg-gray-900 transition-all duration-200 text-left flex items-center gap-3"
                  >
                    <Sparkles className="w-4 h-4" />
                    Move All to Cart
                  </button>
                  <button
                    onClick={() => navigate("/products")}
                    className="w-full px-4 py-3 text-sm font-medium tracking-wider uppercase border border-gray-300 text-gray-600 hover:border-black hover:text-black transition-all duration-200 text-left flex items-center gap-3"
                  >
                    <Plus className="w-4 h-4" />
                    Continue Shopping
                  </button>
                </div>
              </div>

              {/* Recently Viewed (Optional - can be fetched from localStorage) */}
              <div className="border border-gray-200 p-6">
                <h3 className="text-sm font-medium text-gray-900 tracking-wider uppercase mb-4">
                  TIPS
                </h3>
                <div className="space-y-3 text-sm text-gray-500">
                  <p className="flex items-start gap-2">
                    <Heart className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Items in your wishlist are saved for 90 days</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <ShoppingBag className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Get notified when items go on sale</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <Package className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Free returns within 30 days</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
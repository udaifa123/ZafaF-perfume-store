import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { ShoppingCart, Heart, Star, Truck, Shield, Package, Share2, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { successAlert, errorAlert } from "../utils/alert";

const IMAGE_URL = "http://localhost:5000/uploads";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedImage, setSelectedImage] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/products/${id}`);
        setProduct(res.data);
setReviews(res.data.reviews || []);

      } catch (err) {
        errorAlert("Error", "Failed to load product",err);
      }
    };
    fetchProduct();
  }, [id]);

  const handleMouseMove = (e) => {
    if (!isZoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Share cancelled",err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      successAlert("Link Copied!", "Product link copied to clipboard");
    }
  };

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-gray-200 border-t-black mx-auto mb-4"></div>
          <p className="text-gray-600 text-sm uppercase tracking-wide">Loading...</p>
        </div>
      </div>
    );
  }

const handleAddToCart = async () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (!userInfo?.token) {
    errorAlert("Login Required", "Please login first");
    return navigate("/login");
  }

  try {
    await API.post("/cart", {
      productId: product._id,
      quantity,
    });
    successAlert("Added!", "Added to cart");
  } catch (err) {
    errorAlert("Error", err.response?.data?.message);
  }
};

 const handleBuyNow = async () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (!userInfo?.token) {
    errorAlert("Login Required", "Please login first");
    return navigate("/login");
  }

  try {
    await API.post("/cart", { productId: product._id, quantity });
    successAlert("Success!", "Proceeding to checkout");
    navigate("/checkout");
  } catch (error) {
    console.error("Buy now error:", error);
    errorAlert("Error", error.response?.data?.message || "Failed to process order");
  }
};

const handleAddToWishlist = async () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (!userInfo?.token) {
    errorAlert("Login Required", "Please login first");
    return navigate("/login");
  }

  try {
    await API.post("/wishlist", { productId: product._id });
    successAlert("Saved!", "Added to wishlist");
  } catch (error) {
    console.error(error.response?.data || error);
    errorAlert(
      "Error",
      error.response?.data?.message || "Failed to add to wishlist"
    );
  }
};



  
  const images = [product.image, product.image, product.image];

  return (
    <div className="min-h-screen bg-white">
    
      <div className="max-w-7xl mx-auto px-6 py-6">
        <nav className="flex items-center space-x-2 text-xs tracking-wide uppercase text-gray-500">
          <button onClick={() => navigate("/")} className="hover:text-black transition-colors">
            Home
          </button>
          <span>/</span>
          <button onClick={() => navigate("/products")} className="hover:text-black transition-colors">
            Products
          </button>
          <span>/</span>
          <span className="text-black">{product.name}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          
          <div className="space-y-3">
            <div 
              className="relative bg-gray-50 overflow-hidden group"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
            >
              <div className="relative aspect-[3/4] flex items-center justify-center">
                <img
                  src={`${IMAGE_URL}/${images[selectedImage]}`}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300"
                  style={
                    isZoomed
                      ? {
                          transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                          transform: "scale(2)",
                        }
                      : {}
                  }
                />

                
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 transition-all opacity-0 group-hover:opacity-100"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      onClick={() => setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 transition-all opacity-0 group-hover:opacity-100"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </>
                )}
              </div>
            </div>

          
            <div className="flex gap-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`flex-1 bg-gray-50 overflow-hidden transition-all ${
                    selectedImage === idx ? "opacity-100" : "opacity-40 hover:opacity-70"
                  }`}
                >
                  <img
                    src={`${IMAGE_URL}/${img}`}
                    alt={`${product.name} ${idx + 1}`}
                    className="w-full aspect-square object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

        
          <div className="space-y-8">
            
            <div className="border-b border-gray-200 pb-8">
              <div className="flex justify-between items-start mb-6">
                <h1 className="text-3xl font-light tracking-wide text-gray-900 uppercase">{product.name}</h1>
                <button
                  onClick={handleShare}
                  className="p-2 hover:bg-gray-50 transition-colors"
                  title="Share product"
                >
                  <Share2 size={18} className="text-gray-600" />
                </button>
              </div>

            
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-2xl font-light text-gray-900">₹{product.price}</span>
                <span className="text-sm text-gray-400 line-through">₹{Math.round(product.price * 1.3)}</span>
              </div>

            
              <p className="text-xs text-gray-500 tracking-widest">{product._id?.slice(-12).toUpperCase()}</p>
            </div>

            
            <div className="border-b border-gray-200 pb-8">
              <h3 className="text-xs font-medium mb-3 text-gray-900 uppercase tracking-wider">Description</h3>
              <p className="text-sm text-gray-600 leading-relaxed font-light">{product.description}</p>
            </div>

            
            <div className="space-y-3 border-b border-gray-200 pb-8">
              <h3 className="text-xs font-medium text-gray-900 uppercase tracking-wider mb-4">Product Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500 text-xs uppercase tracking-wide">Aroma</span>
                  <span className="text-gray-900 font-light">Luminous, subtle and modern</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500 text-xs uppercase tracking-wide">Olfactory Family</span>
                  <span className="text-gray-900 font-light">Floral</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500 text-xs uppercase tracking-wide">Main Notes</span>
                  <span className="text-gray-900 font-light">Bergamot, Rose and Musk</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-500 text-xs uppercase tracking-wide">Availability</span>
                  <span className={`font-light ${product.stock > 0 ? "text-gray-900" : "text-red-600"}`}>
                    {product.stock > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
              </div>
            </div>

            
            <div>
              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center border border-gray-300">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-5 py-3 hover:bg-gray-50 transition-colors text-sm"
                  >
                    −
                  </button>
                  <span className="px-8 py-3 text-sm border-x border-gray-300">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-5 py-3 hover:bg-gray-50 transition-colors text-sm"
                  >
                    +
                  </button>
                </div>
              </div>

              
              <div className="space-y-3">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-black text-white py-4 text-sm uppercase tracking-widest font-light hover:bg-gray-800 transition-colors"
                >
                  Add to Cart
                </button>

                <button
                  onClick={handleBuyNow}
                  className="w-full border border-black text-black py-4 text-sm uppercase tracking-widest font-light hover:bg-black hover:text-white transition-colors"
                >
                  Buy Now
                </button>

                <button
                  onClick={handleAddToWishlist}
                  className="w-full border border-gray-300 py-4 text-sm uppercase tracking-widest font-light hover:border-black transition-colors flex items-center justify-center gap-2"
                >
                  <Heart size={16} />
                  Add to Wishlist
                </button>
              </div>
              
          
              {(!product.stock || product.stock === 0) && (
                <div className="mt-4 bg-gray-50 border border-gray-200 text-gray-700 px-4 py-3 text-xs text-center uppercase tracking-wide">
                  Currently Out of Stock
                </div>
              )}
            </div>

            
            <div className="grid grid-cols-3 gap-4 pt-8">
              <div className="text-center">
                <Truck size={20} className="text-gray-700 mx-auto mb-2" />
                <p className="text-xs uppercase tracking-wide text-gray-600">Free Shipping</p>
              </div>

              <div className="text-center">
                <Shield size={20} className="text-gray-700 mx-auto mb-2" />
                <p className="text-xs uppercase tracking-wide text-gray-600">Secure Payment</p>
              </div>

              <div className="text-center">
                <Package size={20} className="text-gray-700 mx-auto mb-2" />
                <p className="text-xs uppercase tracking-wide text-gray-600">Easy Returns</p>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="mt-20 pt-12 border-t border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-medium text-gray-900 uppercase tracking-wide">Customer Reviews</h2>
                <button onClick={() => navigate(`/product/${product._id}/add-review`)}
                  className="px-4 py-2 bg-black text-white text-xs uppercase tracking-widest hover:bg-gray-800">
                  Add Review
                </button>
              </div>

              {reviews.length === 0 ? (
                <p className="text-gray-500 text-sm">No reviews yet. Be the first to review this product.</p>
              ) : (
                <div className="space-y-4">
                  {reviews.map((review) => {
                    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
                    const isOwner = userInfo?.user?._id === review.user?._id;

                    return (
                      <div key={review._id} className="border border-gray-200 p-4 rounded">
                        <div className="flex justify-between items-center mb-2">
                          <p className="text-sm font-medium text-gray-900">{review.user?.name || "User"}</p>
                          <div className="flex gap-2">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} size={14} className="text-yellow-500" />
                            ))}

                            {isOwner && (
                              <div className="flex gap-2 ml-4">
                                <button onClick={() => navigate(`/product/${product._id}/edit-review/${review._id}`,{state:{review} })}
                                  className="text-blue-500 text-xs uppercase">
                                  Edit
                                </button>
                                <button onClick={async () => {
                                  if (!confirm("Are you sure you want to delete this review?")) return;
                                  try {
                                    await API.delete(`/reviews/${review._id}`, {
                                      headers: { Authorization: `Bearer ${userInfo.token}` },
                                    });
                                    setReviews(reviews.filter((r) => r._id !== review._id));
                                    successAlert("Deleted!", "Review has been deleted");
                                  } catch (error) {
                                    errorAlert("Error", error.response?.data?.message || "Failed to delete review");
                                  }
                                }}
                                className="text-red-500 text-xs uppercase">Delete</button>
                              </div>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">{review.comment}</p>
                        <p className="text-xs text-gray-400 mt-1">{new Date(review.createdAt).toLocaleDateString()}</p>

          </div>
        );
      })}
    </div>
  )}
</div>


            
          </div>
        </div>
        

        
        <div className="mt-20 pt-12 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-xs font-medium mb-4 text-gray-900 uppercase tracking-wider">Shipping Information</h3>
              <ul className="space-y-2 text-xs text-gray-600 leading-relaxed">
                <li>Free delivery on orders above ₹500</li>
                <li>Standard delivery: 3-5 business days</li>
                <li>Express delivery: 1-2 business days</li>
                <li>International shipping available</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-medium mb-4 text-gray-900 uppercase tracking-wider">Return Policy</h3>
              <ul className="space-y-2 text-xs text-gray-600 leading-relaxed">
                <li>7-day return policy</li>
                <li>Product must be unused</li>
                <li>Original packaging required</li>
                <li>Free return pickup</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-medium mb-4 text-gray-900 uppercase tracking-wider">Customer Care</h3>
              <ul className="space-y-2 text-xs text-gray-600 leading-relaxed">
                <li>24/7 customer support</li>
                <li>Email: support@zafaf.com</li>
                <li>Phone: +91 1800-XXX-XXXX</li>
                <li>Live chat available</li>
              </ul>
            </div>

          </div>
        </div>
        
      </div>
    </div>
  );
}
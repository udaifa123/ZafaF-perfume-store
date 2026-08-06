// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../api/axios";
// import {
//   Heart,
//   Search,
//   Sparkles,
//   ShoppingBag,
//   Filter,
//   Star,
//   Eye,
// } from "lucide-react";

// function ProductList() {
//   const [products, setProducts] = useState([]);
//   const [wishlist, setWishlist] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("All");

//   const navigate = useNavigate();

//   const categories = ["All", "Men", "Women"];

//   useEffect(() => {
//     API.get("/products")
//       .then((res) => setProducts(res.data))
//       .catch((err) => console.error(err));

//     API.get("/wishlist")
//       .then((res) =>
//         setWishlist(res.data.items.map((i) => i.product._id))
//       )
//       .catch(() => {});
//   }, []);

//   const toggleWishlist = async (id) => {
//     const exists = wishlist.includes(id);

//     try {
//       if (exists) {
//         await API.post("/wishlist/remove", { productId: id });
//         setWishlist(wishlist.filter((pid) => pid !== id));
//       } else {
//         await API.post("/wishlist/add", { productId: id });
//         setWishlist([...wishlist, id]);
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const addToCart = async (id) => {
//     try {
//       await API.post("/cart/add", { productId: id, quantity: 1 });
//       alert("Added to cart!");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to add to cart");
//     }
//   };

//   const filteredProducts = products.filter((item) => {
//     const matchesSearch = item.name
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase());

//     const matchesCategory =
//       selectedCategory === "All" ||
//       item.category === selectedCategory;

//     return matchesSearch && matchesCategory;
//   });

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
//       {/* HEADER */}
//       <div className="bg-white shadow-sm border-b border-gray-100">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           {/* Premium Badge */}
//           <div className="flex justify-center items-center gap-2 mb-3">
//             <div className="relative">
//               {/* <Sparkles className="w-5 h-5 text-amber-500 animate-pulse" /> */}
//               {/* <div className="absolute inset-0 blur-sm">
//                 <Sparkles className="w-5 h-5 text-amber-500" />
//               </div> */}
//             </div>
//             {/* <span className="text-sm font-semibold bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
//               PREMIUM COLLECTION
//             </span> */}
//           </div>

//           {/* Main Title */}
//           {/* <h1 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-2">
//             Discover Amazing Products
//           </h1>
//           <p className="text-center text-gray-600 text-sm mb-6">
//             Curated collection of premium fashion items
//           </p> */}

//           {/* SEARCH */}
//           <div className="max-w-2xl mx-auto mt-6 relative">
//             <div className="relative group">
//               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-gray-600 transition-colors pointer-events-none" />
//               <input
//                 type="text"
//                 placeholder="Search for products, brands, and more..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-gray-900 focus:ring-4 focus:ring-gray-100 transition-all outline-none shadow-sm"
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* CATEGORY FILTER */}
//       <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10 shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex items-center gap-3 overflow-x-auto">
//             <div className="flex items-center gap-2 text-gray-700 font-medium whitespace-nowrap">
//               <Filter className="w-5 h-5" />
//               <span className="text-sm">Filter:</span>
//             </div>
//             <div className="flex gap-2">
//               {categories.map((cat) => (
//                 <button
//                   key={cat}
//                   onClick={() => setSelectedCategory(cat)}
//                   className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
//                     selectedCategory === cat
//                       ? "bg-gray-900 text-white shadow-lg scale-105"
//                       : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105"
//                   }`}
//                 >
//                   {cat}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* PRODUCTS */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
//         {filteredProducts.length === 0 ? (
//           <div className="text-center py-20">
//             <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-4">
//               <ShoppingBag className="w-10 h-10 text-gray-400" />
//             </div>
//             <h3 className="text-xl font-semibold text-gray-900 mb-2">
//               No products found
//             </h3>
//             <p className="text-gray-500">
//               Try adjusting your filter to find what you're looking for
//             </p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {filteredProducts.map((item) => {
//               const isWishlisted = wishlist.includes(item._id);

//               return (
//                 <div
//                   key={item._id}
//                   className="group bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
//                 >
//                   <div className="relative overflow-hidden">
//                     <img
//                       src={
//                         item.image
//                           ? `http://localhost:5000/uploads/${item.image}`
//                           : "/placeholder.png"
//                       }
//                       alt={item.name}
//                       className="w-full h-72 object-cover transition-transform duration-700 ease-out group-hover:scale-125"
//                     />
                    
//                     {/* Dark Overlay on hover */}
//                     <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

//                     {/* Wishlist Button */}
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         toggleWishlist(item._id);
//                       }}
//                       className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2.5 rounded-full shadow-lg hover:scale-110 transition-transform duration-200 z-10"
//                     >
//                       <Heart
//                         size={20}
//                         className={
//                           isWishlisted
//                             ? "fill-red-500 text-red-500"
//                             : "text-gray-700 hover:text-red-500"
//                         }
//                       />
//                     </button>

//                     {/* Action Buttons - Show on hover */}
//                     <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex gap-2">
//                       <button
//                         onClick={() => navigate(`/product/${item._id}`)}
//                         className="flex-1 bg-white/95 backdrop-blur-sm text-gray-900 py-3 rounded-lg font-semibold hover:bg-white transition-colors shadow-lg flex items-center justify-center gap-2"
//                       >
//                         <Eye size={18} />
//                         View
//                       </button>
//                       <button
//                         onClick={() => addToCart(item._id)}
//                         className="flex-1 bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors shadow-lg flex items-center justify-center gap-2"
//                       >
//                         <ShoppingBag size={18} />
//                         Add
//                       </button>
//                     </div>
//                   </div>

//                   {/* Product Info */}
//                   <div className="p-5">
//                     <h3 className="font-bold text-gray-900 text-lg mb-3">
//                       {item.name}
//                     </h3>
                    
//                     <div className="flex items-center justify-between mb-3">
//                       <span className="text-2xl font-bold text-gray-900">
//                         ₹{item.price}
//                       </span>
//                       <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 uppercase tracking-wide">
//                         {item.category}
//                       </span>
//                     </div>

//                     <div className="flex items-center gap-1 pt-3 border-t border-gray-100">
//                       {[1, 2, 3, 4, 5].map((star) => (
//                         <Star
//                           key={star}
//                           className="w-4 h-4 text-yellow-400 fill-yellow-400"
//                         />
//                       ))}
//                       <span className="text-sm font-semibold text-gray-700 ml-2">
//                         4.8
//                       </span>
//                       <span className="text-sm text-gray-500 ml-1">
//                         (120)
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ProductList;





import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { Heart, Search, Filter } from "lucide-react";

const IMAGE_URL = "http://localhost:5000/uploads";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  const navigate = useNavigate();

  const categories = ["All", "Men", "Women"];
useEffect(() => {
  const fetchProducts = async () => {
    try {
      const res = await API.get("/products"); // public API
      setProducts(res.data.products || []); // must be array
    } catch (err) {
      console.error("Products fetch failed", err);
      setProducts([]);
    }
  };

 const fetchWishlist = async () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (!userInfo?.token) return;

  try {
    const res = await API.get("/wishlist");
    setWishlist(res.data.items.map(i => i.product._id));
  } catch {
    setWishlist([]);
  }
};


  fetchProducts();
  fetchWishlist();
}, []);

  

  const toggleWishlist = async (id) => {
    const exists = wishlist.includes(id);
    try {
      if (exists) {
        await API.post("/wishlist/remove", { productId: id });
        setWishlist(wishlist.filter((pid) => pid !== id));
      } else {
        await API.post("/wishlist/add", { productId: id });
        setWishlist([...wishlist, id]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 🔍 Filter
  const filteredProducts = products.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // 🔃 Sort
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "priceLowHigh") return a.price - b.price;
    if (sortBy === "priceHighLow") return b.price - a.price;
    // if (sortBy === "nameAZ") return a.name.localeCompare(b.name);
    // if (sortBy === "nameZA") return b.name.localeCompare(a.name);
    return 0;
  });

  return (
    <div className="min-h-screen bg-[#f6f5f3]">
      {/* HEADER */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <h1 className="text-center text-2xl font-light tracking-wide mb-6">
            ZafaF PERFUME
          </h1>

          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-none focus:outline-none focus:border-black"
            />
          </div>
        </div>
      </div>

      {/* FILTER + SORT */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4 overflow-x-auto">
          <Filter size={18} className="text-gray-600" />

          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-sm tracking-wide ${
                selectedCategory === cat
                  ? "text-black border-b border-black"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              {cat}
            </button>
          ))}

          {/* SORT DROPDOWN */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="ml-auto border border-gray-300 px-3 py-1 text-sm focus:outline-none"
          >
            <option value="default">Sort</option>
            <option value="priceLowHigh">Price: Low → High</option>
            <option value="priceHighLow">Price: High → Low</option>
            {/* <option value="nameAZ">Name: A → Z</option>
            <option value="nameZA">Name: Z → A</option> */}
          </select>
        </div>
      </div>

      {/* PRODUCT GRID */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {sortedProducts.length === 0 ? (
          <p className="text-center text-gray-500">No products found</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-14 gap-y-20">
            {sortedProducts.map((item) => (
              <div
                key={item._id}
                onClick={() => navigate(`/product/${item._id}`)}
                className="cursor-pointer group"
              >
                <div className="relative bg-gray-100">
                  <img
                    src={
                      item.image
                        ? `${IMAGE_URL}/${item.image}`
                        : "/placeholder.png"
                    }
                    alt={item.name}
                    onError={(e) =>
                      (e.target.src = "/placeholder.png")
                    }
                    className="w-full h-[320px] object-contain"
                  />

                  {/* <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(item._id);
                    }}
                    className="absolute top-5 right-5"
                  >
                    <Heart
                      size={22}
                      className={
                        wishlist.includes(item._id)
                          ? "fill-black text-black"
                          : "text-gray-600 hover:text-black"
                      }
                    />
                  </button> */}
                </div>

                <div className="pt-5">
                  <h3 className="text-sm font-light text-gray-900 mb-1">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-700">
                    ₹{item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

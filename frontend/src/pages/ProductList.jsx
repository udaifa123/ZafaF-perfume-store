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
        const res = await API.get("/products");
        setProducts(res.data.products || []);
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
        setWishlist(res.data.items.map((i) => i.product._id));
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
        await API.post("/wishlist/remove", {
          productId: id,
        });

        setWishlist(wishlist.filter((pid) => pid !== id));
      } else {
        await API.post("/wishlist/add", {
          productId: id,
        });

        setWishlist([...wishlist, id]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredProducts = products.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "priceLowHigh") {
      return a.price - b.price;
    }

    if (sortBy === "priceHighLow") {
      return b.price - a.price;
    }

   

    return 0;
  });

  return (
    <div className="min-h-screen bg-white">

      <div className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-6 py-8">

          <h1 className="text-2xl font-serif tracking-wide mb-6">
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

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="ml-auto border border-gray-300 px-3 py-1 text-sm focus:outline-none"
          >
            <option value="default">Sort</option>
            <option value="priceLowHigh">
              Price: Low → High
            </option>
            <option value="priceHighLow">
              Price: High → Low
            </option>

         
          </select>

        </div>
      </div>

     
      <div className="max-w-7xl mx-auto px-6 py-16">

        {sortedProducts.length === 0 ? (
          <p className="text-center text-gray-500">
            No products found
          </p>
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
                    onError={(e) => {
                      e.target.src = "/placeholder.png";
                    }}
                    className="w-full h-[320px] object-contain"
                  />

                  <button
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
                  </button>

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
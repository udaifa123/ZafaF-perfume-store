import { useEffect, useState, useRef ,useCallback} from "react";
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Search, 
  Filter, 
  ChevronLeft, 
  ChevronRight,
  X,
  Upload,
  Package,
  DollarSign,
  Tag,
  FileText,
  Image as ImageIcon,
  MoreVertical,
  Eye,
  AlertCircle,
  Download,
  RefreshCw,
  ChevronDown,
  BarChart3
} from "lucide-react";
import API from "../../api/axios";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [categories, setCategories] = useState([]);
  
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    stock: "",
    image: null,
  });
  
  const [editId, setEditId] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);
  // const [activeMenu, setActiveMenu] = useState(null);

  // Fetch products with filters
 const fetchProducts = useCallback(async (p = page) => {
  setLoading(true);
  try {
    let url = `/admin/products?page=${p}`;
    if (searchTerm) url += `&search=${searchTerm}`;
    if (categoryFilter !== "all") url += `&category=${categoryFilter}`;

    const res = await API.get(url);

    setProducts(res.data.products);
    setPage(res.data.page);
    setPages(res.data.pages);
    setTotalProducts(res.data.total);

    if (res.data.products?.length > 0) {
      const uniqueCategories = [
        ...new Set(res.data.products.map(p => p.category))
      ];
      setCategories(uniqueCategories);
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  } finally {
    setLoading(false);
  }
}, [page, searchTerm, categoryFilter]);


  // Initial load
  useEffect(() => {
    fetchProducts(1);
  }, [fetchProducts]);

  // Handle search and filter changes - reset to page 1
 useEffect(() => {
  const timeoutId = setTimeout(() => {
    setPage(1);
    fetchProducts(1);
  }, 300);

  return () => clearTimeout(timeoutId);
}, [searchTerm, categoryFilter, fetchProducts]);


  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle file input
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm(prev => ({ ...prev, image: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // Open form for editing
  const openEditForm = (product) => {
    setEditId(product._id);
    setForm({
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description,
      stock: product.stock || "",
      image: null,
    });
    setPreviewImage(product.image ? `http://localhost:5000/uploads/${product.image}` : null);
    setShowForm(true);
  };

  // Reset form
  const resetForm = () => {
    setForm({
      name: "",
      price: "",
      category: "",
      description: "",
      stock: "",
      image: null,
    });
    setEditId(null);
    setPreviewImage(null);
    setShowForm(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Submit form
  const submitHandler = async (e) => {
    e.preventDefault();
    
    if (!form.name || !form.price || !form.category || !form.description || !form.stock) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);

    try {
      const fd = new FormData();
      Object.keys(form).forEach((key) => {
        if (form[key] !== null && form[key] !== "") {
          fd.append(key, form[key]);
        }
      });

      if (editId) {
        await API.put(`/admin/products/${editId}`, fd);
        alert("Product updated successfully!");
      } else {
        await API.post("/admin/products", fd);
        alert("Product added successfully!");
      }

      resetForm();
      fetchProducts(page);
    } catch (error) {
      console.error("Error saving product:", error);
      alert(error.response?.data?.message || "Error saving product");
    } finally {
      setLoading(false);
    }
  };

  // Delete product
  const deleteHandler = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    setLoading(true);
    try {
      await API.delete(`/admin/products/${id}`);
      alert("Product deleted successfully!");
      
      // If current page becomes empty after deletion, go to previous page
      if (products.length === 1 && page > 1) {
        fetchProducts(page - 1);
      } else {
        fetchProducts(page);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Error deleting product");
    } finally {
      setLoading(false);
    }
  };

  // View product details
  const viewProduct = (product) => {
    alert(`Viewing: ${product.name}\nPrice: ₹${product.price}\nStock: ${product.stock}\nCategory: ${product.category}`);
  };

  // Pagination handlers
  const goToPage = (pageNum) => {
    if (pageNum >= 1 && pageNum <= pages) {
      setPage(pageNum);
      fetchProducts(pageNum);
    }
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= pages; i++) {
      if (i === 1 || i === pages || (i >= page - delta && i <= page + delta)) {
        range.push(i);
      }
    }

    range.forEach((i) => {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      l = i;
    });

    return rangeWithDots;
  };

  // Statistics
  const totalValue = products.reduce((sum, p) => sum + (p.price * (p.stock || 0)), 0);
  const averagePrice = products.length > 0 
    ? products.reduce((sum, p) => sum + p.price, 0) / products.length 
    : 0;

  return (
    <div className="flex min-h-screen bg-gray-900">
      <main className="flex-1 p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">Product Management</h1>
              <p className="text-gray-400 mt-1">Manage your inventory and products</p>
            </div>
            <button
              onClick={() => fetchProducts(page)}
              className="inline-flex items-center justify-center px-4 py-2.5 bg-gray-900 border border-gray-800 rounded-lg text-gray-300 hover:bg-gray-800 transition-all duration-200"
              disabled={loading}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Total Products</p>
                <p className="text-2xl font-bold text-white mt-1">{totalProducts}</p>
              </div>
              <div className="p-3 bg-blue-900/30 rounded-lg">
                <Package className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Categories</p>
                <p className="text-2xl font-bold text-white mt-1">{categories.length}</p>
              </div>
              <div className="p-3 bg-green-900/30 rounded-lg">
                <Tag className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Avg. Price</p>
                <p className="text-2xl font-bold text-white mt-1">
                  ₹{averagePrice.toFixed(2)}
                </p>
              </div>
              <div className="p-3 bg-purple-900/30 rounded-lg">
                <DollarSign className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Total Value</p>
                <p className="text-2xl font-bold text-white mt-1">
                  ₹{totalValue.toFixed(2)}
                </p>
              </div>
              <div className="p-3 bg-orange-900/30 rounded-lg">
                <BarChart3 className="w-6 h-6 text-orange-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-white"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <div className="relative">
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="appearance-none bg-gray-800 border border-gray-700 rounded-lg py-2.5 pl-4 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-white"
                >
                  <option value="all">All Categories</option>
                  {categories.map((cat, index) => (
                    <option key={index} value={cat}>{cat}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4 pointer-events-none" />
              </div>

              <button className="inline-flex items-center px-4 py-2.5 border border-gray-700 rounded-lg text-gray-300 hover:bg-gray-800 transition-all">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </button>

              <button className="inline-flex items-center px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Add Product Button */}
        {!showForm && (
          <div className="mb-6">
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add New Product
            </button>
          </div>
        )}

        {/* Product Form */}
        {showForm && (
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-white">
                  {editId ? "Edit Product" : "Add New Product"}
                </h3>
                <p className="text-gray-400 text-sm mt-1">
                  {editId ? "Update product information" : "Add a new product to your inventory"}
                </p>
              </div>
              <button
                onClick={resetForm}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <form onSubmit={submitHandler} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <span className="flex items-center">
                        <Package className="w-4 h-4 mr-2" />
                        Product Name *
                      </span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleInputChange}
                      placeholder="Enter product name"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <span className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-2" />
                        Price (₹) *
                      </span>
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={form.price}
                      onChange={handleInputChange}
                      placeholder="Enter price"
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <span className="flex items-center">
                        <Tag className="w-4 h-4 mr-2" />
                        Category *
                      </span>
                    </label>
                    <input
                      type="text"
                      name="category"
                      value={form.category}
                      onChange={handleInputChange}
                      placeholder="Enter category"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Stock Quantity *
                    </label>
                    <input
                      type="number"
                      name="stock"
                      value={form.stock}
                      onChange={handleInputChange}
                      placeholder="Enter stock quantity"
                      min="0"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-white"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <span className="flex items-center">
                        <FileText className="w-4 h-4 mr-2" />
                        Description *
                      </span>
                    </label>
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleInputChange}
                      placeholder="Enter product description"
                      rows="6"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-white resize-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <span className="flex items-center">
                        <ImageIcon className="w-4 h-4 mr-2" />
                        Product Image
                        <span className="text-gray-500 text-xs ml-2">
                          {editId ? "(Leave empty to keep current image)" : "(Optional)"}
                        </span>
                      </span>
                    </label>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                          id="product-image"
                        />
                        <label
                          htmlFor="product-image"
                          className="flex-1 cursor-pointer px-4 py-3 border-2 border-dashed border-gray-700 rounded-lg hover:border-blue-500 hover:bg-blue-900/20 transition-all text-center"
                        >
                          <Upload className="w-6 h-6 mx-auto mb-2 text-gray-500" />
                          <p className="text-sm text-gray-400">
                            Click to upload image or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            PNG, JPG, WEBP up to 5MB
                          </p>
                        </label>
                      </div>
                      
                      {previewImage && (
                        <div className="mt-3">
                          <p className="text-sm font-medium text-gray-300 mb-2">Preview:</p>
                          <div className="relative w-32 h-32">
                            <img
                              src={previewImage}
                              alt="Preview"
                              className="w-full h-full object-cover rounded-lg border border-gray-700"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setPreviewImage(null);
                                setForm(prev => ({ ...prev, image: null }));
                                if (fileInputRef.current) {
                                  fileInputRef.current.value = "";
                                }
                              }}
                              className="absolute -top-2 -right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Processing...
                    </>
                  ) : editId ? (
                    "Update Product"
                  ) : (
                    "Add Product"
                  )}
                </button>

                <button
                  type="button"
                  onClick={resetForm}
                  className="px-8 py-3 bg-gray-800 text-gray-300 font-medium rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Products Table */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">Products List</h3>
                <p className="text-sm text-gray-400 mt-1">
                  Showing {products.length} of {totalProducts} products
                </p>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : products.length === 0 ? (
            <div className="py-16 text-center">
              <Package className="w-16 h-16 text-gray-700 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No products found</h3>
              <p className="text-gray-500 mb-6">
                {searchTerm || categoryFilter !== "all" 
                  ? "Try adjusting your search or filter" 
                  : "Add your first product to get started"}
              </p>
              {!showForm && (
                <button
                  onClick={() => setShowForm(true)}
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Product
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-800 border-b border-gray-700">
                    <tr>
                      <th className="py-4 px-6 text-left text-sm font-semibold text-white">
                        Product
                      </th>
                      <th className="py-4 px-6 text-left text-sm font-semibold text-white">
                        Category
                      </th>
                      <th className="py-4 px-6 text-left text-sm font-semibold text-white">
                        Price
                      </th>
                      <th className="py-4 px-6 text-left text-sm font-semibold text-white">
                        Stock
                      </th>
                      <th className="py-4 px-6 text-left text-sm font-semibold text-white">
                        Status
                      </th>
                      <th className="py-4 px-6 text-left text-sm font-semibold text-white">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {products.map((product) => (
                      <tr 
                        key={product._id} 
                        className="hover:bg-gray-800 transition-colors duration-150"
                      >
                        <td className="py-4 px-6">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-12 w-12 mr-4">
                              {product.image ? (
                                <img
                                  src={`http://localhost:5000/uploads/${product.image}`}
                                  alt={product.name}
                                  className="h-12 w-12 object-cover rounded-lg border border-gray-700"
                                />
                              ) : (
                                <div className="h-12 w-12 bg-gray-800 rounded-lg flex items-center justify-center border border-gray-700">
                                  <Package className="w-6 h-6 text-gray-400" />
                                </div>
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-white">{product.name}</p>
                              <p className="text-sm text-gray-400 truncate max-w-xs">
                                {product.description}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-900/30 text-blue-400">
                            {product.category}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="font-medium text-white">
                            ₹{product.price.toFixed(2)}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`font-medium ${
                            (product.stock || 0) <= 5 
                              ? 'text-red-400' 
                              : (product.stock || 0) <= 20 
                                ? 'text-orange-400' 
                                : 'text-green-400'
                          }`}>
                            {product.stock || 0} units
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            (product.stock || 0) > 0
                              ? 'bg-green-900/30 text-green-400'
                              : 'bg-red-900/30 text-red-400'
                          }`}>
                            {(product.stock || 0) > 0 ? 'In Stock' : 'Out of Stock'}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => viewProduct(product)}
                              className="p-2 text-gray-500 hover:text-blue-400 hover:bg-blue-900/30 rounded-lg transition-colors"
                              title="View"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => openEditForm(product)}
                              className="p-2 text-gray-500 hover:text-green-400 hover:bg-green-900/30 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteHandler(product._id)}
                              className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-900/30 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                            <div className="relative">
                              {/* <button
                                onClick={() => setActiveMenu(activeMenu === product._id ? null : product._id)}
                                className="p-2 text-gray-500 hover:text-gray-300 hover:bg-gray-800 rounded-lg transition-colors"
                              >
                                <MoreVertical className="w-4 h-4" />
                              </button> */}
{/*                               
                              {activeMenu === product._id && (
                                <div className="absolute right-0 mt-1 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700 z-10">
                                  <div className="py-1">
                                    <button
                                      onClick={() => {
                                        viewProduct(product);
                                        setActiveMenu(null);
                                      }}
                                      className="flex items-center w-full px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-700 transition-colors"
                                    >
                                      <Eye className="w-4 h-4 mr-3" />
                                      View Details
                                    </button>
                                    <button
                                      onClick={() => {
                                        openEditForm(product);
                                        setActiveMenu(null);
                                      }}
                                      className="flex items-center w-full px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-700 transition-colors"
                                    >
                                      <Edit2 className="w-4 h-4 mr-3" />
                                      Edit Product
                                    </button>
                                    <div className="border-t border-gray-700 my-1"></div>
                                    <button
                                      onClick={() => {
                                        deleteHandler(product._id);
                                        setActiveMenu(null);
                                      }}
                                      className="flex items-center w-full px-4 py-2.5 text-sm text-red-400 hover:bg-gray-700 transition-colors"
                                    >
                                      <Trash2 className="w-4 h-4 mr-3" />
                                      Delete Product
                                    </button>
                                  </div>
                                </div>
                              )} */}
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {pages > 1 && (
                <div className="border-t border-gray-800 px-6 py-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="text-sm text-gray-400">
                      Showing page {page} of {pages}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => goToPage(page - 1)}
                        disabled={page === 1}
                        className={`p-2 rounded-lg transition-colors ${
                          page === 1
                            ? 'text-gray-700 cursor-not-allowed'
                            : 'text-gray-400 hover:bg-gray-800'
                        }`}
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>

                      <div className="flex items-center gap-1">
                        {getPageNumbers().map((pageNum, index) => (
                          pageNum === "..." ? (
                            <span key={index} className="px-3 py-1 text-gray-600">
                              ...
                            </span>
                          ) : (
                            <button
                              key={index}
                              onClick={() => goToPage(pageNum)}
                              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                                page === pageNum
                                  ? 'bg-blue-600 text-white'
                                  : 'text-gray-400 hover:bg-gray-800'
                              }`}
                            >
                              {pageNum}
                            </button>
                          )
                        ))}
                      </div>

                      <button
                        onClick={() => goToPage(page + 1)}
                        disabled={page === pages}
                        className={`p-2 rounded-lg transition-colors ${
                          page === pages
                            ? 'text-gray-700 cursor-not-allowed'
                            : 'text-gray-400 hover:bg-gray-800'
                        }`}
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
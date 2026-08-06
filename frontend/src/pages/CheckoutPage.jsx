// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../api/axios";
// import { 
//   ArrowLeft, Shield, Lock, Truck, CreditCard, 
//   MapPin, User, Phone, Home, Package, Tag, 
//   CheckCircle, AlertCircle, ChevronRight, Gift,
//   Image as ImageIcon, Plus, Edit2, Trash2, Radio,
//   Check
// } from "lucide-react";
// import { successAlert, errorAlert } from "../utils/alert";

// const BASE_URL = "http://localhost:5000";

// export default function CheckoutPage() {
//   const navigate = useNavigate();
//   const [cartItems, setCartItems] = useState([]);
//   const [subtotal, setSubtotal] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [paymentMethod, setPaymentMethod] = useState("card");
//   const [couponCode, setCouponCode] = useState("");
//   const [appliedCoupon, setAppliedCoupon] = useState(null);
//   const [discount, setDiscount] = useState(0);
//   const [address, setAddress] = useState({
//     fullName: "", 
//     phone: "", 
//     street: "", 
//     city: "", 
//     state: "", 
//     pincode: "", 
//     landmark: ""
//   });
  
//   // Address states
//   const [savedAddresses, setSavedAddresses] = useState([]);
//   const [selectedAddressId, setSelectedAddressId] = useState(null);
//   const [showAddressForm, setShowAddressForm] = useState(false);
//   const [addressForm, setAddressForm] = useState({
//     fullName: "",
//     phone: "",
//     address: "",
//     city: "",
//     state: "",
//     zipCode: "",
//     country: "India",
//     addressType: "home",
//     isDefault: false
//   });

//   // Load saved addresses from localStorage
//   useEffect(() => {
//     const loadSavedAddresses = () => {
//       const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//       if (userInfo) {
//         const addresses = userInfo.user?.addresses || [];
//         setSavedAddresses(addresses);
        
//         // Set default address or first address as selected
//         if (addresses.length > 0) {
//           const defaultAddress = addresses.find(addr => addr.isDefault) || addresses[0];
//           if (defaultAddress) {
//             setSelectedAddressId(defaultAddress.id);
//             // IMPORTANT: Extract phone number and remove any non-digit characters
//             const phoneNumber = defaultAddress.phone ? defaultAddress.phone.replace(/\D/g, '').slice(-10) : "";
//             setAddress({
//               fullName: defaultAddress.fullName || "",
//               phone: phoneNumber,
//               street: defaultAddress.address || "",
//               city: defaultAddress.city || "",
//               state: defaultAddress.state || "",
//               pincode: defaultAddress.zipCode || "",
//               landmark: ""
//             });
//           }
//         }
//       }
//     };
    
//     loadSavedAddresses();
//   }, []);

//   useEffect(() => {
//     const fetchCart = async () => {
//       try {
//         const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//         if (!userInfo?.token) {
//           navigate("/login");
//           return;
//         }
//         const res = await API.get("/cart");
//         setCartItems(Array.isArray(res.data.items) ? res.data.items : []);
//       } catch (err) {
//         console.error(err);
//         setCartItems([]);
//       }
//     };
//     fetchCart();
//   }, [navigate]);

//   useEffect(() => {
//     const t = cartItems.reduce((sum, item) => sum + (item.quantity * (item.product?.price || 0)), 0);
//     setSubtotal(t);
//   }, [cartItems]);

//   const shipping = subtotal > 2000 ? 0 : 99;
//   const tax = subtotal * 0.18;
//   const total = subtotal + shipping + tax - discount;

//   const handleChange = (e) => { 
//     setAddress(prev => ({ ...prev, [e.target.name]: e.target.value })); 
//   };

//   const handleAddressSelect = (address) => {
//     setSelectedAddressId(address.id);
//     // Extract phone number and remove any non-digit characters, keep only last 10 digits
//     const phoneNumber = address.phone ? address.phone.replace(/\D/g, '').slice(-10) : "";
    
//     setAddress({
//       fullName: address.fullName || "",
//       phone: phoneNumber,
//       street: address.address || "",
//       city: address.city || "",
//       state: address.state || "",
//       pincode: address.zipCode || "",
//       landmark: ""
//     });
    
//     // Update localStorage with selected address
//     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//     if (userInfo) {
//       userInfo.selectedAddress = address;
//       localStorage.setItem("userInfo", JSON.stringify(userInfo));
//     }
    
//     successAlert("Address Selected", "Address selected successfully!");
//   };

//   const handleNewAddress = () => {
//     setShowAddressForm(true);
//   };

//   const handleAddressFormChange = (e) => {
//     const { name, value } = e.target;
//     setAddressForm(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSaveNewAddress = () => {
//     // Validation
//     if (!addressForm.fullName.trim() || !addressForm.address.trim() || 
//         !addressForm.city.trim() || !addressForm.state.trim() || !addressForm.zipCode.trim()) {
//       errorAlert("Error", "Please fill all required fields");
//       return;
//     }

//     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//     if (!userInfo) return;

//     const newId = Date.now().toString();
//     const newAddress = {
//       ...addressForm,
//       id: newId,
//       isDefault: savedAddresses.length === 0
//     };

//     const updatedAddresses = [...savedAddresses, newAddress];
    
//     // If set as default, update all addresses
//     if (addressForm.isDefault) {
//       updatedAddresses.forEach(addr => {
//         addr.isDefault = addr.id === newId;
//       });
//     }

//     setSavedAddresses(updatedAddresses);
    
//     // Update localStorage
//     userInfo.user.addresses = updatedAddresses;
//     localStorage.setItem("userInfo", JSON.stringify(userInfo));

//     // Select the new address
//     handleAddressSelect(newAddress);
//     setShowAddressForm(false);
//     setAddressForm({
//       fullName: "",
//       phone: "",
//       address: "",
//       city: "",
//       state: "",
//       zipCode: "",
//       country: "India",
//       addressType: "home",
//       isDefault: false
//     });
    
//     successAlert("Success", "Address added successfully!");
//   };

//   const applyCoupon = () => {
//     const coupons = { "WELCOME10": 10, "LUXURY15": 15, "PREMIUM20": 20 };
//     if (coupons[couponCode.toUpperCase()]) {
//       const discountPercent = coupons[couponCode.toUpperCase()];
//       const discountAmount = (subtotal * discountPercent) / 100;
//       setDiscount(discountAmount);
//       setAppliedCoupon(couponCode.toUpperCase());
//       successAlert("Coupon Applied!", `You got ${discountPercent}% off!`);
//     } else {
//       errorAlert("Invalid Coupon", "Please enter a valid coupon code");
//     }
//   };

//   const removeCoupon = () => {
//     setCouponCode("");
//     setAppliedCoupon(null);
//     setDiscount(0);
//   };

//   const validatePhoneNumber = (phone) => {
//     // Remove all non-digit characters and check if exactly 10 digits
//     const cleanedPhone = phone.replace(/\D/g, '');
//     return cleanedPhone.length === 10;
//   };

//   const handlePlaceOrder = async () => {
//     // Validate phone number
//     if (!validatePhoneNumber(address.phone)) {
//       errorAlert("Invalid Phone", "Please enter a valid 10-digit phone number");
//       return;
//     }

//     // If no address selected, show error
//     if (!selectedAddressId && !address.fullName) {
//       return errorAlert("Address Required", "Please select or enter a shipping address");
//     }

//     if (!address.fullName || !address.street || !address.city || !address.state || !address.pincode) {
//       return errorAlert("Missing details", "Please fill all required address fields");
//     }

//     setLoading(true);
//     try {
//       const token = localStorage.getItem("token");
//       const orderData = { 
//         address: {
//           ...address,
//           phone: address.phone.replace(/\D/g, ''), // Clean phone number
//           addressId: selectedAddressId
//         }, 
//         paymentMethod, 
//         discount, 
//         shipping, 
//         tax, 
//         total,
//         items: cartItems.map(item => ({
//           productId: item.product?._id,
//           quantity: item.quantity,
//           price: item.product?.price
//         }))
//       };
      
//       const response = await API.post("/orders", orderData, { 
//         headers: { 
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         } 
//       });
      
//       successAlert("Order Placed!", "Your order was placed successfully");
      
//       // Clear cart after successful order
//       await API.delete("/cart/clear");
      
//       navigate("/order-success", { 
//         state: { 
//           orderId: response.data.order?._id,
//           orderDetails: response.data.order
//         } 
//       });
//     } catch (err) {
//       console.error("Order error:", err);
//       errorAlert("Error", err.response?.data?.message || "Order failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Function to get product image URL
//   const getProductImage = (item) => {
//     if (!item.product) {
//       return "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop";
//     }
    
//     if (item.product.image) {
//       if (item.product.image.startsWith('http')) {
//         return item.product.image;
//       } else {
//         return `${BASE_URL}/uploads/${item.product.image}`;
//       }
//     }
    
//     const fallbackImages = [
//       "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop",
//       "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400&h=400&fit=crop",
//       "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=400&h=400&fit=crop",
//       "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&h=400&fit=crop",
//       "https://images.unsplash.com/photo-1531214159280-079b95d26139?w=400&h=400&fit=crop"
//     ];
    
//     if (item.product._id) {
//       const index = parseInt(item.product._id.slice(-1), 16) % fallbackImages.length;
//       return fallbackImages[index];
//     }
    
//     return fallbackImages[0];
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6">
//         {/* Navigation & Progress */}
//         <div className="mb-12">
//           <button onClick={() => navigate("/cart")} className="flex items-center gap-2 text-gray-600 hover:text-black mb-6">
//             <div className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-black">
//               <ArrowLeft size={16} />
//             </div>
//             <span className="text-sm font-medium uppercase tracking-wide">Back to Cart</span>
//           </button>
          
//           <div className="flex items-center justify-between mb-8">
//             <h1 className="text-3xl font-light text-gray-900">Checkout</h1>
//             <div className="hidden md:flex items-center gap-1">
//               <div className="flex flex-col items-center">
//                 <div className="w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center">1</div>
//                 <span className="text-xs mt-1 text-gray-600">Cart</span>
//               </div>
//               <ChevronRight size={12} className="text-gray-400" />
//               <div className="flex flex-col items-center">
//                 <div className="w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center">2</div>
//                 <span className="text-xs mt-1 font-medium">Checkout</span>
//               </div>
//               <ChevronRight size={12} className="text-gray-400" />
//               <div className="flex flex-col items-center">
//                 <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-500 text-xs flex items-center justify-center">3</div>
//                 <span className="text-xs mt-1 text-gray-600">Complete</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left Column */}
//           <div className="lg:col-span-2 space-y-8">
//             {/* Shipping Address Card */}
//             <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
//               <div className="p-6 border-b border-gray-100">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
//                       <MapPin className="w-5 h-5 text-amber-600" />
//                     </div>
//                     <div>
//                       <h2 className="font-medium text-gray-900">Shipping Address</h2>
//                       <p className="text-sm text-gray-500">Choose delivery address</p>
//                     </div>
//                   </div>
//                   <button
//                     onClick={handleNewAddress}
//                     className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
//                   >
//                     <Plus className="w-4 h-4" />
//                     New Address
//                   </button>
//                 </div>
//               </div>
              
//               <div className="p-6">
//                 {/* Saved Addresses with Selection */}
//                 {savedAddresses.length > 0 && !showAddressForm && (
//                   <div className="mb-6">
//                     <h3 className="text-sm font-medium text-gray-700 mb-4">Saved Addresses</h3>
//                     <div className="space-y-3">
//                       {savedAddresses.map((addr) => (
//                         <div 
//                           key={addr.id}
//                           className={`p-4 border rounded-lg cursor-pointer transition-all ${
//                             selectedAddressId === addr.id 
//                               ? 'border-amber-500 bg-amber-50' 
//                               : 'border-gray-200 hover:border-gray-300'
//                           }`}
//                           onClick={() => handleAddressSelect(addr)}
//                         >
//                           <div className="flex items-start gap-3">
//                             <div className="flex items-center mt-1">
//                               <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
//                                 selectedAddressId === addr.id 
//                                   ? 'border-amber-500 bg-amber-500' 
//                                   : 'border-gray-300'
//                               }`}>
//                                 {selectedAddressId === addr.id && (
//                                   <div className="w-2 h-2 rounded-full bg-white"></div>
//                                 )}
//                               </div>
//                             </div>
//                             <div className="flex-1">
//                               <div className="flex items-center gap-2 mb-2">
//                                 <span className="font-medium text-gray-900">{addr.fullName}</span>
//                                 {addr.isDefault && (
//                                   <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
//                                     Default
//                                   </span>
//                                 )}
//                                 <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
//                                   {addr.addressType === 'home' ? 'Home' : 
//                                    addr.addressType === 'work' ? 'Work' : 'Other'}
//                                 </span>
//                               </div>
//                               <p className="text-sm text-gray-600">{addr.address}</p>
//                               <p className="text-sm text-gray-600">
//                                 {addr.city}, {addr.state} {addr.zipCode}
//                               </p>
//                               {addr.phone && (
//                                 <p className="text-sm text-gray-600 mt-1">
//                                   <Phone className="w-3 h-3 inline mr-1" />
//                                   {addr.phone}
//                                 </p>
//                               )}
//                             </div>
//                             {selectedAddressId === addr.id && (
//                               <Check className="w-5 h-5 text-amber-600" />
//                             )}
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                     <p className="text-sm text-gray-500 mt-4 text-center">
//                       Selected address will be used for delivery
//                     </p>
//                   </div>
//                 )}

//                 {/* New Address Form */}
//                 {showAddressForm ? (
//                   <div className="mb-6 bg-gray-50 p-4 rounded-lg">
//                     <h3 className="text-sm font-medium text-gray-700 mb-4">Add New Address</h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
//                         <input
//                           type="text"
//                           name="fullName"
//                           value={addressForm.fullName}
//                           onChange={handleAddressFormChange}
//                           className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
//                           required
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
//                         <input
//                           type="tel"
//                           name="phone"
//                           value={addressForm.phone}
//                           onChange={handleAddressFormChange}
//                           className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
//                           placeholder="10-digit number"
//                           required
//                         />
//                       </div>
//                       <div className="md:col-span-2">
//                         <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
//                         <input
//                           type="text"
//                           name="address"
//                           value={addressForm.address}
//                           onChange={handleAddressFormChange}
//                           className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
//                           required
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
//                         <input
//                           type="text"
//                           name="city"
//                           value={addressForm.city}
//                           onChange={handleAddressFormChange}
//                           className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
//                           required
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
//                         <input
//                           type="text"
//                           name="state"
//                           value={addressForm.state}
//                           onChange={handleAddressFormChange}
//                           className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
//                           required
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code *</label>
//                         <input
//                           type="text"
//                           name="zipCode"
//                           value={addressForm.zipCode}
//                           onChange={handleAddressFormChange}
//                           className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
//                           required
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">Address Type</label>
//                         <select
//                           name="addressType"
//                           value={addressForm.addressType}
//                           onChange={handleAddressFormChange}
//                           className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
//                         >
//                           <option value="home">Home</option>
//                           <option value="work">Work</option>
//                           <option value="other">Other</option>
//                         </select>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <input
//                           type="checkbox"
//                           id="setDefault"
//                           checked={addressForm.isDefault}
//                           onChange={(e) => setAddressForm(prev => ({ ...prev, isDefault: e.target.checked }))}
//                           className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500"
//                         />
//                         <label htmlFor="setDefault" className="text-sm text-gray-700">
//                           Set as default address
//                         </label>
//                       </div>
//                     </div>
//                     <div className="flex gap-3 mt-4">
//                       <button
//                         onClick={handleSaveNewAddress}
//                         className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
//                       >
//                         Save Address
//                       </button>
//                       <button
//                         onClick={() => setShowAddressForm(false)}
//                         className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                   </div>
//                 ) : null}

//                 {/* Delivery Details Form */}
//                 <div className="mt-4">
//                   <h3 className="text-sm font-medium text-gray-700 mb-4">Delivery Details</h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div className="md:col-span-2">
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
//                       <input 
//                         name="fullName" 
//                         value={address.fullName} 
//                         onChange={handleChange}
//                         className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500" 
//                         placeholder="Enter your full name"
//                         required
//                       />
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
//                       <input 
//                         name="phone" 
//                         value={address.phone} 
//                         onChange={handleChange}
//                         className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500" 
//                         placeholder="10-digit mobile number"
//                         required
//                       />
//                       {address.phone && !validatePhoneNumber(address.phone) && (
//                         <p className="mt-1 text-sm text-red-600">Please enter a valid 10-digit phone number</p>
//                       )}
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Pincode *</label>
//                       <input 
//                         name="pincode" 
//                         value={address.pincode} 
//                         onChange={handleChange}
//                         className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500" 
//                         placeholder="6-digit pincode"
//                         required
//                       />
//                     </div>
                    
//                     <div className="md:col-span-2">
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Street Address *</label>
//                       <input 
//                         name="street" 
//                         value={address.street} 
//                         onChange={handleChange}
//                         className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500" 
//                         placeholder="House no, Building, Street"
//                         required
//                       />
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
//                       <input 
//                         name="city" 
//                         value={address.city} 
//                         onChange={handleChange}
//                         className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500" 
//                         placeholder="City"
//                         required
//                       />
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
//                       <input 
//                         name="state" 
//                         value={address.state} 
//                         onChange={handleChange}
//                         className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500" 
//                         placeholder="State"
//                         required
//                       />
//                     </div>
                    
//                     <div className="md:col-span-2">
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Landmark (Optional)</label>
//                       <input 
//                         name="landmark" 
//                         value={address.landmark} 
//                         onChange={handleChange}
//                         className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500" 
//                         placeholder="Nearby landmark"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Payment Method Card */}
//             <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
//               <div className="p-6 border-b border-gray-100">
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
//                     <CreditCard className="w-5 h-5 text-blue-600" />
//                   </div>
//                   <div>
//                     <h2 className="font-medium text-gray-900">Payment Method</h2>
//                     <p className="text-sm text-gray-500">Choose payment option</p>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="p-6">
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
//                   {[
//                     { id: "card", label: "Card", icon: CreditCard },
//                     { id: "upi", label: "UPI", icon: CreditCard },
//                     { id: "netbanking", label: "Net Banking", icon: CreditCard },
//                     { id: "cod", label: "COD", icon: Package },
//                   ].map((method) => (
//                     <button 
//                       key={method.id}
//                       onClick={() => setPaymentMethod(method.id)}
//                       className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
//                         paymentMethod === method.id 
//                           ? "border-black bg-black text-white" 
//                           : "border-gray-200 text-gray-700 hover:border-gray-300"
//                       }`}
//                     >
//                       {method.label}
//                     </button>
//                   ))}
//                 </div>
                
//                 <div className="p-4 bg-gray-50 rounded-lg">
//                   <div className="flex items-center gap-2 mb-3">
//                     <Shield className="w-4 h-4 text-green-600" />
//                     <span className="text-sm font-medium">Secure Payment</span>
//                   </div>
//                   <p className="text-xs text-gray-600">
//                     Your payment information is encrypted and secure. We never store your card details.
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Items Preview */}
//             <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
//               <div className="p-6 border-b border-gray-100">
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
//                     <Package className="w-5 h-5 text-emerald-600" />
//                   </div>
//                   <div>
//                     <h2 className="font-medium text-gray-900">Order Items</h2>
//                     <p className="text-sm text-gray-500">{cartItems.length} items</p>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="p-6">
//                 <div className="space-y-4">
//                   {cartItems.map((item) => (
//                     <div key={item._id} className="flex items-center gap-4 p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
//                       <div className="relative flex-shrink-0">
//                         <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
//                           <img 
//                             src={getProductImage(item)} 
//                             alt={item.product?.name || "Product"} 
//                             className="w-full h-full object-cover"
//                             onError={(e) => {
//                               e.target.onerror = null;
//                               e.target.src = "https://images.unsplash.com/photo-1541643600914-78b084683601?w=200&h=200&fit=crop";
//                             }}
//                           />
//                         </div>
//                         {item.quantity > 1 && (
//                           <div className="absolute -top-2 -right-2 w-6 h-6 bg-black text-white text-xs rounded-full flex items-center justify-center">
//                             {item.quantity}
//                           </div>
//                         )}
//                       </div>
//                       <div className="flex-1">
//                         <h4 className="font-medium text-gray-900">{item.product?.name || "Premium Fragrance"}</h4>
//                         <p className="text-sm text-gray-500">{item.product?.category || "Luxury Perfume"}</p>
//                         <div className="flex items-center gap-4 mt-2">
//                           <span className="text-sm text-gray-600">Size: {item.product?.size || "100ml"}</span>
//                           <span className="text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded">In Stock</span>
//                         </div>
//                       </div>
//                       <div className="text-right">
//                         <p className="font-bold text-lg">₹{((item.product?.price || 0) * item.quantity).toLocaleString()}</p>
//                         <p className="text-sm text-gray-500">₹{(item.product?.price || 0).toLocaleString()} each</p>
//                       </div>
//                     </div>
//                   ))}
//                   {cartItems.length === 0 && (
//                     <div className="text-center py-8">
//                       <Package className="w-12 h-12 text-gray-400 mx-auto mb-3" />
//                       <p className="text-gray-500">No items in cart</p>
//                       <button 
//                         onClick={() => navigate("/products")}
//                         className="mt-4 text-amber-600 hover:text-amber-700 font-medium"
//                       >
//                         Continue Shopping
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Column - Order Summary */}
//           <div className="space-y-6">
//             <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-6">
//               <h2 className="font-medium text-gray-900 mb-6">Order Summary</h2>
              
//               {/* Items Preview */}
//               <div className="mb-4">
//                 <div className="flex items-center gap-2 mb-3">
//                   <ImageIcon className="w-4 h-4 text-gray-500" />
//                   <span className="text-sm font-medium text-gray-700">Your Items</span>
//                 </div>
//                 <div className="flex flex-wrap gap-2 mb-4">
//                   {cartItems.slice(0, 4).map((item, index) => (
//                     <div key={index} className="relative">
//                       <div className="w-12 h-12 rounded-lg border border-gray-200 overflow-hidden">
//                         <img 
//                           src={getProductImage(item)} 
//                           alt={item.product?.name || "Item"} 
//                           className="w-full h-full object-cover"
//                         />
//                       </div>
//                       {item.quantity > 1 && (
//                         <div className="absolute -top-1 -right-1 w-4 h-4 bg-black text-white text-[10px] rounded-full flex items-center justify-center">
//                           {item.quantity}
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                   {cartItems.length > 4 && (
//                     <div className="w-12 h-12 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center">
//                       <span className="text-xs font-medium text-gray-600">+{cartItems.length - 4}</span>
//                     </div>
//                   )}
//                 </div>
//               </div>
              
//               {/* Coupon Section */}
//               <div className="mb-6">
//                 <div className="flex gap-2 mb-3">
//                   <input 
//                     type="text" 
//                     placeholder="Coupon code" 
//                     value={couponCode}
//                     onChange={(e) => setCouponCode(e.target.value)}
//                     className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
//                   />
//                   <button 
//                     onClick={appliedCoupon ? removeCoupon : applyCoupon}
//                     className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
//                       appliedCoupon 
//                         ? "bg-red-100 text-red-700 hover:bg-red-200" 
//                         : "bg-gray-900 text-white hover:bg-black"
//                     }`}
//                   >
//                     {appliedCoupon ? "Remove" : "Apply"}
//                   </button>
//                 </div>
//                 {appliedCoupon && (
//                   <div className="flex items-center gap-2 text-sm text-green-600">
//                     <CheckCircle className="w-4 h-4" />
//                     <span>Coupon {appliedCoupon} applied • Saved ₹{discount.toLocaleString()}</span>
//                   </div>
//                 )}
//               </div>
              
//               {/* Price Breakdown */}
//               <div className="space-y-3 mb-6">
//                 <div className="flex justify-between text-sm">
//                   <span className="text-gray-600">Subtotal</span>
//                   <span>₹{subtotal.toLocaleString()}</span>
//                 </div>
//                 <div className="flex justify-between text-sm">
//                   <span className="text-gray-600">Shipping</span>
//                   <span className={shipping === 0 ? "text-green-600 font-medium" : ""}>
//                     {shipping === 0 ? "FREE" : `₹${shipping}`}
//                   </span>
//                 </div>
//                 <div className="flex justify-between text-sm">
//                   <span className="text-gray-600">Tax (GST)</span>
//                   <span>₹{tax.toFixed(0).toLocaleString()}</span>
//                 </div>
//                 {discount > 0 && (
//                   <div className="flex justify-between text-sm text-green-600">
//                     <span>Discount</span>
//                     <span>-₹{discount.toLocaleString()}</span>
//                   </div>
//                 )}
//                 <div className="border-t pt-4 flex justify-between font-medium">
//                   <span className="text-gray-900">Total Amount</span>
//                   <div className="text-right">
//                     <div className="text-xl font-bold text-gray-900">₹{total.toLocaleString()}</div>
//                     <div className="text-xs text-gray-500">Incl. all taxes</div>
//                   </div>
//                 </div>
//               </div>
              
//               {/* Delivery Info */}
//               <div className="mb-6 p-4 bg-gray-50 rounded-lg">
//                 <div className="flex items-center gap-2 mb-2">
//                   <Truck className="w-4 h-4 text-amber-600" />
//                   <span className="text-sm font-medium">Delivery Estimate</span>
//                 </div>
//                 <p className="text-xs text-gray-600">2-4 business days • Free shipping over ₹2000</p>
//               </div>
              
//               {/* Place Order Button */}
//               <button 
//                 onClick={handlePlaceOrder} 
//                 disabled={loading || cartItems.length === 0 || !validatePhoneNumber(address.phone)}
//                 className={`w-full py-4 rounded-lg font-medium text-white transition-all ${
//                   loading || cartItems.length === 0 || !validatePhoneNumber(address.phone)
//                     ? "bg-gray-400 cursor-not-allowed" 
//                     : "bg-black hover:bg-gray-800"
//                 }`}
//               >
//                 {loading ? "Processing..." : `Place Order • ₹${total.toLocaleString()}`}
//               </button>
              
//               {/* Security Assurance */}
//               <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
//                 <Lock className="w-3 h-3" />
//                 <span>Secure 256-bit SSL encryption</span>
//               </div>
//             </div>

//             {/* Gift Options */}
//             <div className="bg-white rounded-xl border border-gray-200 p-6">
//               <div className="flex items-center gap-2 mb-3">
//                 <Gift className="w-5 h-5 text-amber-600" />
//                 <h3 className="font-medium text-gray-900">Gift Options</h3>
//               </div>
//               <p className="text-sm text-gray-600 mb-4">
//                 Add premium gift wrapping and personal message for ₹199
//               </p>
//               <button className="w-full border border-gray-300 rounded-lg py-2 text-sm hover:bg-gray-50 transition-colors">
//                 Add Gift Wrapping
//               </button>
//             </div>

//             {/* Return Policy */}
//             <div className="bg-white rounded-xl border border-gray-200 p-6">
//               <div className="flex items-center gap-2 mb-2">
//                 <CheckCircle className="w-5 h-5 text-green-600" />
//                 <h3 className="font-medium text-gray-900">Return Policy</h3>
//               </div>
//               <p className="text-xs text-gray-600">
//                 30-day easy returns • Free return shipping • Full refund guarantee
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }







import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

import { 
  ArrowLeft, Shield, Lock, Truck, CreditCard, 
  MapPin, User, Phone, Home, Package, Tag, 
  CheckCircle, AlertCircle, ChevronRight, Gift,
  Image as ImageIcon, Plus, Edit2, Trash2, Radio,
  Check
} from "lucide-react";
import { successAlert, errorAlert } from "../utils/alert";


const BASE_URL = "http://localhost:5000";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [address, setAddress] = useState({
    fullName: "", 
    phone: "", 
    street: "", 
    city: "", 
    state: "", 
    pincode: "", 
    landmark: ""
  });
  
  // Address states
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressForm, setAddressForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India",
    addressType: "home",
    isDefault: false
  });

  // Load saved addresses from localStorage
  useEffect(() => {
    const loadSavedAddresses = () => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (userInfo) {
        const addresses = userInfo.user?.addresses || [];
        setSavedAddresses(addresses);
        
        // Set default address or first address as selected
        if (addresses.length > 0) {
          const defaultAddress = addresses.find(addr => addr.isDefault) || addresses[0];
          if (defaultAddress) {
            setSelectedAddressId(defaultAddress.id);
            // IMPORTANT: Extract phone number and remove any non-digit characters
            const phoneNumber = defaultAddress.phone ? defaultAddress.phone.replace(/\D/g, '').slice(-10) : "";
            setAddress({
              fullName: defaultAddress.fullName || "",
              phone: phoneNumber,
              street: defaultAddress.address || "",
              city: defaultAddress.city || "",
              state: defaultAddress.state || "",
              pincode: defaultAddress.zipCode || "",
              landmark: ""
            });
          }
        }
      }
    };
    
    loadSavedAddresses();
  }, []);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (!userInfo?.token) {
          navigate("/login");
          return;
        }
        const res = await API.get("/cart");
        setCartItems(Array.isArray(res.data.items) ? res.data.items : []);
      } catch (err) {
        console.error(err);
        setCartItems([]);
      }
    };
    fetchCart();
  }, [navigate]);

  useEffect(() => {
    const t = cartItems.reduce((sum, item) => sum + (item.quantity * (item.product?.price || 0)), 0);
    setSubtotal(t);
  }, [cartItems]);

  const shipping = subtotal > 2000 ? 0 : 99;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax - discount;

  const handleChange = (e) => { 
    setAddress(prev => ({ ...prev, [e.target.name]: e.target.value })); 
  };

  const handleAddressSelect = (address) => {
    setSelectedAddressId(address.id);
    // Extract phone number and remove any non-digit characters, keep only last 10 digits
    const phoneNumber = address.phone ? address.phone.replace(/\D/g, '').slice(-10) : "";
    
    setAddress({
      fullName: address.fullName || "",
      phone: phoneNumber,
      street: address.address || "",
      city: address.city || "",
      state: address.state || "",
      pincode: address.zipCode || "",
      landmark: ""
    });
    
    // Update localStorage with selected address
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      userInfo.selectedAddress = address;
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    }
    
    successAlert("Address Selected", "Address selected successfully!");
  };

  const handleNewAddress = () => {
    setShowAddressForm(true);
  };

  const handleAddressFormChange = (e) => {
    const { name, value } = e.target;
    setAddressForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveNewAddress = () => {
    // Validation
    if (!addressForm.fullName.trim() || !addressForm.address.trim() || 
        !addressForm.city.trim() || !addressForm.state.trim() || !addressForm.zipCode.trim()) {
      errorAlert("Error", "Please fill all required fields");
      return;
    }

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo) return;

    const newId = Date.now().toString();
    const newAddress = {
      ...addressForm,
      id: newId,
      isDefault: savedAddresses.length === 0
    };

    const updatedAddresses = [...savedAddresses, newAddress];
    
    // If set as default, update all addresses
    if (addressForm.isDefault) {
      updatedAddresses.forEach(addr => {
        addr.isDefault = addr.id === newId;
      });
    }

    setSavedAddresses(updatedAddresses);
    
    // Update localStorage
    userInfo.user.addresses = updatedAddresses;
    localStorage.setItem("userInfo", JSON.stringify(userInfo));

    // Select the new address
    handleAddressSelect(newAddress);
    setShowAddressForm(false);
    setAddressForm({
      fullName: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "India",
      addressType: "home",
      isDefault: false
    });
    
    successAlert("Success", "Address added successfully!");
  };

  const applyCoupon = () => {
    const coupons = { "WELCOME10": 10, "LUXURY15": 15, "PREMIUM20": 20 };
    if (coupons[couponCode.toUpperCase()]) {
      const discountPercent = coupons[couponCode.toUpperCase()];
      const discountAmount = (subtotal * discountPercent) / 100;
      setDiscount(discountAmount);
      setAppliedCoupon(couponCode.toUpperCase());
      successAlert("Coupon Applied!", `You got ${discountPercent}% off!`);
    } else {
      errorAlert("Invalid Coupon", "Please enter a valid coupon code");
    }
  };

  const removeCoupon = () => {
    setCouponCode("");
    setAppliedCoupon(null);
    setDiscount(0);
  };

  const validatePhoneNumber = (phone) => {
    // Remove all non-digit characters and check if exactly 10 digits
    const cleanedPhone = phone.replace(/\D/g, '');
    return cleanedPhone.length === 10;
  };


  const handlePayPalOrderSuccess = async (paypalData) => {
  setLoading(true);
  try {
    const token = localStorage.getItem("token");

    const orderData = {
      address: {
        ...address,
        phone: address.phone.replace(/\D/g, ""),
        addressId: selectedAddressId,
      },
      paymentMethod: "paypal",
      discount,
      shipping,
      tax,
      total,
      paypalPayment: paypalData,
      items: cartItems.map((item) => ({
        productId: item.product?._id,
        quantity: item.quantity,
        price: item.product?.price,
      })),
    };

    const response = await API.post("/orders", orderData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    successAlert("Payment Successful 🎉", "Order placed successfully");
    await API.delete("/cart/clear");

    navigate("/order-success", {
      state: {
        orderId: response.data.order?._id,
        orderDetails: response.data.order,
      },
    });
  } catch (err) {
    console.error(err);
    errorAlert("Error", "Order creation failed after PayPal payment");
  } finally {
    setLoading(false);
  }
};


 const handlePlaceOrder = async () => {

  if (paymentMethod === "paypal") {
    return errorAlert(
      "PayPal Payment",
      "Please complete PayPal payment below"
    );
  }


  
  

    // If no address selected, show error
    if (!selectedAddressId && !address.fullName) {
      return errorAlert("Address Required", "Please select or enter a shipping address");
    }

    if (!address.fullName || !address.street || !address.city || !address.state || !address.pincode) {
      return errorAlert("Missing details", "Please fill all required address fields");
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const orderData = { 
        address: {
          ...address,
          phone: address.phone.replace(/\D/g, ''), // Clean phone number
          addressId: selectedAddressId
        }, 
        paymentMethod, 
        discount, 
        shipping, 
        tax, 
        total,
        items: cartItems.map(item => ({
          productId: item.product?._id,
          quantity: item.quantity,
          price: item.product?.price
        }))
      };
      
      const response = await API.post("/orders", orderData, { 
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        } 
      });
      
      successAlert("Order Placed!", "Your order was placed successfully");
      
      // Clear cart after successful order
      await API.delete("/cart/clear");
      
      navigate("/order-success", { 
        state: { 
          orderId: response.data.order?._id,
          orderDetails: response.data.order
        } 
      });
    } catch (err) {
      console.error("Order error:", err);
      errorAlert("Error", err.response?.data?.message || "Order failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Function to get product image URL
  const getProductImage = (item) => {
    if (!item.product) {
      return "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop";
    }
    
    if (item.product.image) {
      if (item.product.image.startsWith('http')) {
        return item.product.image;
      } else {
        return `${BASE_URL}/uploads/${item.product.image}`;
      }
    }
    
    const fallbackImages = [
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1531214159280-079b95d26139?w=400&h=400&fit=crop"
    ];
    
    if (item.product._id) {
      const index = parseInt(item.product._id.slice(-1), 16) % fallbackImages.length;
      return fallbackImages[index];
    }
    
    return fallbackImages[0];
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Navigation & Progress */}
        <div className="mb-12">
          <button onClick={() => navigate("/cart")} className="flex items-center gap-2 text-gray-600 hover:text-black mb-6">
            <div className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-black">
              <ArrowLeft size={16} />
            </div>
            <span className="text-sm font-medium uppercase tracking-wide">Back to Cart</span>
          </button>
          
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-light text-gray-900">Checkout</h1>
            <div className="hidden md:flex items-center gap-1">
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center">1</div>
                <span className="text-xs mt-1 text-gray-600">Cart</span>
              </div>
              <ChevronRight size={12} className="text-gray-400" />
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center">2</div>
                <span className="text-xs mt-1 font-medium">Checkout</span>
              </div>
              <ChevronRight size={12} className="text-gray-400" />
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-500 text-xs flex items-center justify-center">3</div>
                <span className="text-xs mt-1 text-gray-600">Complete</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Address Card */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <h2 className="font-medium text-gray-900">Shipping Address</h2>
                      <p className="text-sm text-gray-500">Choose delivery address</p>
                    </div>
                  </div>
                  <button
                    onClick={handleNewAddress}
                    className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    New Address
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                {/* Saved Addresses with Selection */}
                {savedAddresses.length > 0 && !showAddressForm && (
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-4">Saved Addresses</h3>
                    <div className="space-y-3">
                      {savedAddresses.map((addr) => (
                        <div 
                          key={addr.id}
                          className={`p-4 border rounded-lg cursor-pointer transition-all ${
                            selectedAddressId === addr.id 
                              ? 'border-amber-500 bg-amber-50' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => handleAddressSelect(addr)}
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex items-center mt-1">
                              <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                                selectedAddressId === addr.id 
                                  ? 'border-amber-500 bg-amber-500' 
                                  : 'border-gray-300'
                              }`}>
                                {selectedAddressId === addr.id && (
                                  <div className="w-2 h-2 rounded-full bg-white"></div>
                                )}
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="font-medium text-gray-900">{addr.fullName}</span>
                                {addr.isDefault && (
                                  <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                                    Default
                                  </span>
                                )}
                                <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                                  {addr.addressType === 'home' ? 'Home' : 
                                   addr.addressType === 'work' ? 'Work' : 'Other'}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600">{addr.address}</p>
                              <p className="text-sm text-gray-600">
                                {addr.city}, {addr.state} {addr.zipCode}
                              </p>
                              {addr.phone && (
                                <p className="text-sm text-gray-600 mt-1">
                                  <Phone className="w-3 h-3 inline mr-1" />
                                  {addr.phone}
                                </p>
                              )}
                            </div>
                            {selectedAddressId === addr.id && (
                              <Check className="w-5 h-5 text-amber-600" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-4 text-center">
                      Selected address will be used for delivery
                    </p>
                  </div>
                )}

                {/* New Address Form */}
                {showAddressForm ? (
                  <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-700 mb-4">Add New Address</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                        <input
                          type="text"
                          name="fullName"
                          value={addressForm.fullName}
                          onChange={handleAddressFormChange}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                        <input
                          type="tel"
                          name="phone"
                          value={addressForm.phone}
                          onChange={handleAddressFormChange}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                          placeholder="10-digit number"
                          required
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
                        <input
                          type="text"
                          name="address"
                          value={addressForm.address}
                          onChange={handleAddressFormChange}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                        <input
                          type="text"
                          name="city"
                          value={addressForm.city}
                          onChange={handleAddressFormChange}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                        <input
                          type="text"
                          name="state"
                          value={addressForm.state}
                          onChange={handleAddressFormChange}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code *</label>
                        <input
                          type="text"
                          name="zipCode"
                          value={addressForm.zipCode}
                          onChange={handleAddressFormChange}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Address Type</label>
                        <select
                          name="addressType"
                          value={addressForm.addressType}
                          onChange={handleAddressFormChange}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        >
                          <option value="home">Home</option>
                          <option value="work">Work</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="setDefault"
                          checked={addressForm.isDefault}
                          onChange={(e) => setAddressForm(prev => ({ ...prev, isDefault: e.target.checked }))}
                          className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500"
                        />
                        <label htmlFor="setDefault" className="text-sm text-gray-700">
                          Set as default address
                        </label>
                      </div>
                    </div>
                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={handleSaveNewAddress}
                        className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                      >
                        Save Address
                      </button>
                      <button
                        onClick={() => setShowAddressForm(false)}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : null}

                {/* Delivery Details Form */}
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-4">Delivery Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                      <input 
                        name="fullName" 
                        value={address.fullName} 
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500" 
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                      <input 
                        name="phone" 
                        value={address.phone} 
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500" 
                        placeholder="10-digit mobile number"
                        required
                      />
                      {address.phone && !validatePhoneNumber(address.phone) && (
                        <p className="mt-1 text-sm text-red-600">Please enter a valid 10-digit phone number</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Pincode *</label>
                      <input 
                        name="pincode" 
                        value={address.pincode} 
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500" 
                        placeholder="6-digit pincode"
                        required
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Street Address *</label>
                      <input 
                        name="street" 
                        value={address.street} 
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500" 
                        placeholder="House no, Building, Street"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                      <input 
                        name="city" 
                        value={address.city} 
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500" 
                        placeholder="City"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                      <input 
                        name="state" 
                        value={address.state} 
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500" 
                        placeholder="State"
                        required
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Landmark (Optional)</label>
                      <input 
                        name="landmark" 
                        value={address.landmark} 
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500" 
                        placeholder="Nearby landmark"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method Card */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="font-medium text-gray-900">Payment Method</h2>
                    <p className="text-sm text-gray-500">Choose payment option</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {[
  { id: "paypal", label: "PayPal", icon: CreditCard },
  { id: "cod", label: "COD", icon: Package },
].map((method) => (

                    <button 
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                        paymentMethod === method.id 
                          ? "border-black bg-black text-white" 
                          : "border-gray-200 text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      {method.label}
                    </button>
                  ))}
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium">Secure Payment</span>
                  </div>
                  <p className="text-xs text-gray-600">
                    Your payment information is encrypted and secure. We never store your card details.
                  </p>
                </div>
              </div>
            </div>

            {/* Items Preview */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <Package className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h2 className="font-medium text-gray-900">Order Items</h2>
                    <p className="text-sm text-gray-500">{cartItems.length} items</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item._id} className="flex items-center gap-4 p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="relative flex-shrink-0">
                        <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
                          <img 
                            src={getProductImage(item)} 
                            alt={item.product?.name || "Product"} 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "https://images.unsplash.com/photo-1541643600914-78b084683601?w=200&h=200&fit=crop";
                            }}
                          />
                        </div>
                        {item.quantity > 1 && (
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-black text-white text-xs rounded-full flex items-center justify-center">
                            {item.quantity}
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{item.product?.name || "Premium Fragrance"}</h4>
                        <p className="text-sm text-gray-500">{item.product?.category || "Luxury Perfume"}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-sm text-gray-600">Size: {item.product?.size || "100ml"}</span>
                          <span className="text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded">In Stock</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">₹{((item.product?.price || 0) * item.quantity).toLocaleString()}</p>
                        <p className="text-sm text-gray-500">₹{(item.product?.price || 0).toLocaleString()} each</p>
                      </div>
                    </div>
                  ))}
                  {cartItems.length === 0 && (
                    <div className="text-center py-8">
                      <Package className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-500">No items in cart</p>
                      <button 
                        onClick={() => navigate("/products")}
                        className="mt-4 text-amber-600 hover:text-amber-700 font-medium"
                      >
                        Continue Shopping
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-6">
              <h2 className="font-medium text-gray-900 mb-6">Order Summary</h2>
              
              {/* Items Preview */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <ImageIcon className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Your Items</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {cartItems.slice(0, 4).map((item, index) => (
                    <div key={index} className="relative">
                      <div className="w-12 h-12 rounded-lg border border-gray-200 overflow-hidden">
                        <img 
                          src={getProductImage(item)} 
                          alt={item.product?.name || "Item"} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {item.quantity > 1 && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-black text-white text-[10px] rounded-full flex items-center justify-center">
                          {item.quantity}
                        </div>
                      )}
                    </div>
                  ))}
                  {cartItems.length > 4 && (
                    <div className="w-12 h-12 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center">
                      <span className="text-xs font-medium text-gray-600">+{cartItems.length - 4}</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Coupon Section */}
              <div className="mb-6">
                <div className="flex gap-2 mb-3">
                  <input 
                    type="text" 
                    placeholder="Coupon code" 
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <button 
                    onClick={appliedCoupon ? removeCoupon : applyCoupon}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      appliedCoupon 
                        ? "bg-red-100 text-red-700 hover:bg-red-200" 
                        : "bg-gray-900 text-white hover:bg-black"
                    }`}
                  >
                    {appliedCoupon ? "Remove" : "Apply"}
                  </button>
                </div>
                {appliedCoupon && (
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span>Coupon {appliedCoupon} applied • Saved ₹{discount.toLocaleString()}</span>
                  </div>
                )}
              </div>
              
              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className={shipping === 0 ? "text-green-600 font-medium" : ""}>
                    {shipping === 0 ? "FREE" : `₹${shipping}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax (GST)</span>
                  <span>₹{tax.toFixed(0).toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount</span>
                    <span>-₹{discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="border-t pt-4 flex justify-between font-medium">
                  <span className="text-gray-900">Total Amount</span>
                  <div className="text-right">
                    <div className="text-xl font-bold text-gray-900">₹{total.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">Incl. all taxes</div>
                  </div>
                </div>
              </div>
              
              {/* Delivery Info */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Truck className="w-4 h-4 text-amber-600" />
                  <span className="text-sm font-medium">Delivery Estimate</span>
                </div>
                <p className="text-xs text-gray-600">2-4 business days • Free shipping over ₹2000</p>
              </div>
              
              {/* Place Order Button */}
              <button 
                onClick={handlePlaceOrder} 
                disabled={loading || cartItems.length === 0 || !validatePhoneNumber(address.phone)}
                className={`w-full py-4 rounded-lg font-medium text-white transition-all ${
                  loading || cartItems.length === 0 || !validatePhoneNumber(address.phone)
                    ? "bg-gray-400 cursor-not-allowed" 
                    : "bg-black hover:bg-gray-800"
                }`}
              >
                {loading ? "Processing..." : `Place Order • ₹${total.toLocaleString()}`}
              </button>


              {/* PayPal Button */}
{paymentMethod === "paypal" && (
  <div className="mt-4">
   <PayPalScriptProvider
  options={{
    "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
    currency: "USD",
  }}
>

      <PayPalButtons
        style={{ layout: "vertical" }}

        createOrder={async () => {
          const res = await API.post("/paypal/create-order", {
            amount: total, // ✅ INR only
          });
          return res.data.id;
        }}

        onApprove={async (data) => {
          const res = await API.post(
            `/paypal/capture-order/${data.orderID}`
          );

          await handlePayPalOrderSuccess({
            orderID: data.orderID,
            capture: res.data,
          });
        }}

        onError={(err) => {
          console.error(err);
          errorAlert("PayPal Error", "Payment failed. Try again.");
        }}
      />
    </PayPalScriptProvider>
  </div>
)}



              
              
              {/* Security Assurance */}
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
                <Lock className="w-3 h-3" />
                <span>Secure 256-bit SSL encryption</span>
              </div>
            </div>

            {/* Gift Options */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Gift className="w-5 h-5 text-amber-600" />
                <h3 className="font-medium text-gray-900">Gift Options</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Add premium gift wrapping and personal message for ₹199
              </p>
              <button className="w-full border border-gray-300 rounded-lg py-2 text-sm hover:bg-gray-50 transition-colors">
                Add Gift Wrapping
              </button>
            </div>

            {/* Return Policy */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <h3 className="font-medium text-gray-900">Return Policy</h3>
              </div>
              <p className="text-xs text-gray-600">
                30-day easy returns • Free return shipping • Full refund guarantee
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
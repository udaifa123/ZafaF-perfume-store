// import API from "../api/axios";

// export const checkout = async (cartItems, amount) => {
//   try {
    
//     const { data } = await API.post(
//       "/orders", 
//       {
//         items: cartItems.map((item) => ({
//           product: item.product._id,
//           quantity: item.quantity,
//           price: item.product.price,
//         })),
//         totalAmount: amount,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`, 
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     const { paymentOrder } = data;

    
//     const options = {
//       key: import.meta.env.VITE_RAZORPAY_KEY_ID, 
//       amount: paymentOrder.amount,
//       currency: paymentOrder.currency,
//       name: "E-commerce Shop",
//       description: "Test Payment",
//       order_id: paymentOrder.id,

//       handler: function (response) {
//         alert(
//           `Payment Successful 🎉\nPayment ID: ${response.razorpay_payment_id}`
//         );
//       },

//       theme: { color: "#3399cc" },
//     };

    
//     const rzp = new window.Razorpay(options);
//     rzp.open();
//   } catch (error) {
//     console.error(error);
//     alert("Payment failed!");
//   }
// };

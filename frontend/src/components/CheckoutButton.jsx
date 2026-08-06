// import axios from "axios";

// const CheckoutButton = () => {

//   const handlePayment = async () => {
//     try {
//       const { data } = await axios.post(
//         "https://node-backend-project-zafaf.onrender.com/api/orders/create",
//         { amount: 500 } 
//       );

//       const options = {
//         key: "rzp_test_xxxxx", 
//         amount: data.order.amount,
//         currency: "INR",
//         name: "My Shop",
//         description: "Test Payment",
//         order_id: data.order.id,

//         handler: async function (response) {
//           await axios.post(
//             "https://node-backend-project-zafaf.onrender.com/api/payment/verify",
//             response
//           );
//           alert("Payment Success ✅");
//         },

//         theme: { color: "#000" }
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();

//     } catch (error) {
//       console.error(error);
//       alert("Payment failed ❌");
//     }
//   };

//   return (
//     <button onClick={handlePayment}>
//       Pay with Razorpay
//     </button>
//   );
// };

// export default CheckoutButton;

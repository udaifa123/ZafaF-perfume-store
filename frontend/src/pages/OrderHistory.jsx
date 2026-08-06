// import { useEffect, useState } from "react";
// import API from "../api/axios";

// export default function Orders() {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     API.get("/orders/my").then(res => setOrders(res.data));
//   }, []);

//   return (
//     <div>
//       <h2>My Orders</h2>

//       {orders.length === 0 && <p>No orders yet</p>}

//       {orders.map(order => (
//         <div key={order._id}>
//           <p>Order ID: {order._id}</p>
//           <p>Total: ₹{order.totalAmount}</p>
//           <p>Status: {order.paymentStatus}</p>

//           {order.items.map(i => (
//             <div key={i._id}>
//               {i.product.name} × {i.quantity}
//             </div>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// }

// import { useEffect, useState } from "react";
// import API from "../api/axios";

// export default function MyOrders() {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     API.get("/orders/my").then((res) => setOrders(res.data));
//   }, []);

//   return (
//     <div>
//       <h2>My Orders</h2>
//       {orders.map((o) => (
//         <div key={o._id}>
//           <p>Total: ₹{o.totalAmount}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

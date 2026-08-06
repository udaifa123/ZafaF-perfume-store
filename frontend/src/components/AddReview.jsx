// import { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import API from "../api/axios";

// export default function AddReview() {
//   const { id } = useParams(); // product ID
//   const navigate = useNavigate();
//   const [rating, setRating] = useState(5);
//   const [comment, setComment] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//       const token = userInfo?.token;

//       await API.post(
//         `/products/${id}/reviews`,
//         { rating, comment },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       alert("Review added successfully!");
//       navigate(`/product/${id}`);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to add review");
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow">
//       <h2 className="text-2xl font-bold mb-4">Add Review</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block font-medium mb-1">Rating (1-5)</label>
//           <input
//             type="number"
//             min="1"
//             max="5"
//             value={rating}
//             onChange={(e) => setRating(e.target.value)}
//             className="w-full border px-3 py-2 rounded"
//             required
//           />
//         </div>
//         <div>
//           <label className="block font-medium mb-1">Comment</label>
//           <textarea
//             value={comment}
//             onChange={(e) => setComment(e.target.value)}
//             className="w-full border px-3 py-2 rounded"
//             required
//           />
//         </div>
//         <button className="px-6 py-2 bg-blue-500 text-white rounded">Submit</button>
//       </form>
//     </div>
//   );
// }

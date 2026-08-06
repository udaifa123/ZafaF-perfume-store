// import { useEffect, useState } from "react";
// import API from "../api/axios";

// export default function MyReviews() {
//   const [reviews, setReviews] = useState([]);

//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//         const token = userInfo?.token;
//         const res = await API.get("/reviews/my-reviews", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setReviews(res.data);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchReviews();
//   }, []);

//   if (!reviews.length) {
//     return <p className="text-center mt-10">You have not added any reviews yet.</p>;
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-6 space-y-4">
//       <h2 className="text-2xl font-bold mb-4">My Reviews</h2>
//       {reviews.map((review) => (
//         <div key={review._id} className="p-4 border rounded shadow-sm">
//           <p className="font-semibold">{review.productName}</p>
//           <p>Rating: {review.rating} ⭐</p>
//           <p>{review.comment}</p>
//           <p className="text-gray-500 text-sm">Date: {new Date(review.createdAt).toLocaleDateString()}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

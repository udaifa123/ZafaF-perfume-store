import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function AddReview() {
  const { id } = useParams(); // product id
  const navigate = useNavigate();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const submitReview = async (e) => {
    e.preventDefault();
    try {
await API.post(`/reviews/${id}`, { rating, comment });
      alert("Review added successfully");
      navigate("/my-reviews");
    } catch (err) {
      console.error(err);
      alert("Failed to add review");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Add Review</h1>
      <form onSubmit={submitReview} className="space-y-4">
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full border p-2 rounded"
        >
          {[5,4,3,2,1].map((r) => (
            <option key={r} value={r}>{r} Stars</option>
          ))}
        </select>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your review..."
          className="w-full border p-2 rounded"
          required
        />

        <button className="bg-black text-white px-4 py-2 rounded">
          Submit Review
        </button>
      </form>
    </div>
  );
}

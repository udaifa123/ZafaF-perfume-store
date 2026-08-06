import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { successAlert, errorAlert } from "../utils/alert";

export default function EditReview() {
  const { productId, reviewId } = useParams();
  const navigate = useNavigate();

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchReview = async () => {
    try {
      const res = await API.get(`/reviews/review/${reviewId}`);

      // check ownership
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (!userInfo || userInfo.user._id !== res.data.user._id) {
        errorAlert("Unauthorized", "You cannot edit this review");
        return navigate(`/product/${productId}`);
      }

      setRating(res.data.rating);
      setComment(res.data.comment);
      setLoading(false);
    } catch (err) {
      console.error(err);
      errorAlert(
        "Error",
        err.response?.data?.message || "Failed to load review"
      );
      navigate(`/product/${productId}`);
    }
  };

  fetchReview();
}, [reviewId, productId, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/reviews/${reviewId}`, { rating, comment });
      successAlert("Updated!", "Review updated successfully");
      navigate(`/product/${productId}`);
    } catch (err) {
      console.error(err);
      errorAlert(
        "Error",
        err.response?.data?.message || "Failed to update review"
      );
    }
  };

  if (loading) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white mt-10 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Edit Review</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Rating</label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full border px-3 py-2 rounded"
          >
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>
                {r} Star{r > 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            rows={4}
            placeholder="Write your review..."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 uppercase text-sm tracking-widest hover:bg-gray-800 transition-colors"
        >
          Update Review
        </button>
      </form>
    </div>
  );
}

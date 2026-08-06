import { useEffect, useState } from "react";
import API from "../../api/axios";

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  // ✅ NO id used here
  const fetchReviews = async () => {
    try {
      const { data } = await API.get("/reviews/admin/all");
      setReviews(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  // ✅ id is ONLY used here
  const deleteReview = async (id) => {
    if (!window.confirm("Delete this review?")) return;

    try {
      await API.delete(`/reviews/admin/${id}`);
      fetchReviews(); // reload list
    } catch (err) {
      console.error(err);
      alert("Failed to delete review");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-white">All Reviews (Admin)</h1>

      {reviews.length === 0 ? (
        <p>No reviews found</p>
      ) : (
        <table className="w-full border text-white">
          <thead>
            <tr className="border-b">
              <th className="p-2">User</th>
              <th className="p-2">Product</th>
              <th className="p-2">Rating</th>
              <th className="p-2">Comment</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((r) => (
              <tr key={r._id} className="border-b">
                <td className="p-2">{r.user?.name}</td>
                <td className="p-2">{r.product?.name}</td>
                <td className="p-2">{r.rating} ⭐</td>
                <td className="p-2">{r.comment}</td>
                <td className="p-2">
                  <button
                    onClick={() => deleteReview(r._id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

import { useEffect, useState } from "react";
import API from "../api/axios";
import { Star } from "lucide-react";

export default function MyReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
const { data } = await API.get("/reviews/my");
      setReviews(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Reviews</h1>

      {reviews.length === 0 ? (
        <p>No reviews found</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review._id} className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-center">
                <h2 className="font-semibold">{review.product?.name}</h2>
                <div className="flex gap-1">
                  {[1,2,3,4,5].map((i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i <= review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                      }
                    />
                  ))}
                </div>
              </div>
              <p className="mt-2 text-gray-700">{review.comment}</p>
              <p className="text-xs text-gray-400 mt-1">{new Date(review.createdAt).toDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

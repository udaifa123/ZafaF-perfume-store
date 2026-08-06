import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  
  if (!product) return null;

  return (
    <div className="border p-4 shadow hover:shadow-lg transition">
      <Link to={`/products/${product._id}`}>
        <img
          src={
            product.image
              ? `http://localhost:5000/uploads/${product.image}`
              : "/placeholder.png"
          }
          alt={product.name}
          className="w-full h-48 object-cover mb-2"
        />
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p>₹{product.price}</p>
      </Link>
    </div>
  );
}

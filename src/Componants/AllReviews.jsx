import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

const AllReviews = () => {
  const [reviews, setReviews] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/reviews") 
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.error(err));
  }, []);

  const handleViewDetails = (id) => {
    if (user) navigate(`/reviews/${id}`);
    else navigate("/login");
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-8 text-orange-600">
        All Reviews
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {reviews.map((review) => (
          <motion.div
            key={review._id}
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <img
              src={review.photo}
              alt={review.foodName}
              className="h-48 w-full object-cover"
            />
            <div className="p-4 space-y-2">
              <h3 className="text-xl font-semibold">{review.foodName}</h3>
              <p className="text-sm text-gray-500">
                {review.restaurantName} — {review.location}
              </p>
              <p className="text-sm text-gray-700">{review.reviewerName}</p>
              <div className="flex gap-1">
                <FaStar className="text-yellow-500 mt-1" />
                <FaStar className="text-yellow-500 mt-1" />
                <FaStar className="text-yellow-500 mt-1" />
                <p className="text-yellow-500"> {review.rating}/5</p>
              </div>
              <button
                onClick={() => handleViewDetails(review._id)}
                className="inline-block mt-3 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
              >
                View Details
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default AllReviews;

import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const TopRatedReviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/top-reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-8 text-orange-600">
        Featured Reviews
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
              <p className="text-sm text-gray-700">
                 {review.reviewerName}
              </p>
             <div className="flex gap-1">
                 <FaStar className="text-yellow-500 mt-1"></FaStar>
                 <FaStar className="text-yellow-500 mt-1"></FaStar>
                 <FaStar className="text-yellow-500 mt-1"></FaStar>
              <p className="text-yellow-500"> {review.rating}/5</p>
             </div>
              <Link
                to={`/reviews/${review._id}`}
                className="inline-block mt-3 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
              >
                View Details
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Show All Button */}
      <div className="text-center mt-10">
        <Link
          to="/reviews"
          className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition"
        >
          Show All Reviews
        </Link>
      </div>
    </section>
  );
};

export default TopRatedReviews;

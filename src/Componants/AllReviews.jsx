import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

const AllReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("date"); 
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

  
  const filteredReviews = reviews
    .filter(
      (r) =>
        r.foodName.toLowerCase().includes(search.toLowerCase()) ||
        r.restaurantName.toLowerCase().includes(search.toLowerCase()) ||
        r.location.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "date") return new Date(b.date) - new Date(a.date);
      if (sort === "rating") return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="pt-8">
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-8 text-orange-600">
          All Reviews
        </h2>

    
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <input
            type="text"
            placeholder="Search by food, restaurant, or location..."
            className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="date">Sort by Date (Newest)</option>
            <option value="rating">Sort by Rating</option>
          </select>
        </div>

        {filteredReviews.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No reviews found 😔</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {filteredReviews.map((review) => (
              <motion.div
                key={review._id}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <img
                  src={review.photo}
                  alt={review.foodName}
                  className="h-48 w-full object-cover"
                />
                <div className="p-5 space-y-2">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {review.foodName}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {review.restaurantName} — {review.location}
                  </p>
                  <p className="text-sm text-gray-700 font-medium">
                    By: {review.reviewerName}
                  </p>

                  {/* Rating Section */}
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`mt-1 ${
                          i < review.rating ? "text-yellow-500" : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="text-yellow-600 font-semibold ml-1">
                      {review.rating}/5
                    </span>
                  </div>

                  {/* Date */}
                  {review.date && (
                    <p className="text-xs text-gray-400">
                      Posted on: {new Date(review.date).toLocaleDateString()}
                    </p>
                  )}

                  <button
                    onClick={() => handleViewDetails(review._id)}
                    className="inline-block mt-3 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
                  >
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default AllReviews;

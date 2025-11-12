import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const TopFoodies = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/users") // server endpoint
      .then((res) => res.json())
      .then((data) => {
        // sort by number of reviews descending, take top 10
        const sorted = data
          .sort((a, b) => (b.reviews?.length || 0) - (a.reviews?.length || 0))
          .slice(0, 10);
        setUsers(sorted);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <p className="text-center mt-20 text-gray-500 text-lg">Loading top foodies...</p>
    );

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-center mb-12 text-orange-600">
        Top Foodies
      </h2>

      {users.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No foodies found 😔</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {users.map((user) => (
            <motion.div
              key={user._id}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden p-6 text-center"
            >
              <img
                src={user.photo || "https://via.placeholder.com/150"}
                alt={user.name}
                className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">{user.name}</h3>
              <p className="text-gray-500 mb-2">
                {user.reviews?.length || 0} Reviews
              </p>
              <div className="flex justify-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`${
                      i < Math.round(user.averageRating || 0)
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default TopFoodies;

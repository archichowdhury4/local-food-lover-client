import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const MyFavorites = () => {
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/favorites/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setFavorites(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [user]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Remove from favorites?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:3000/favorites/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setFavorites((prev) => prev.filter((f) => f._id !== id));
        toast.info("Removed from favorites ");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove favorite.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-600">
        Loading favorites...
      </div>
    );
  }

  return (
  <div className="pt-8">
      <div className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-10 text-orange-600">
        My Favorite Reviews 
      </h2>

      {favorites.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          You haven’t added any favorites yet 
        </p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {favorites.map((fav) => (
            <motion.div
              key={fav._id}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden relative"
            >
              <img
                src={fav.photo}
                alt={fav.foodName}
                className="h-48 w-full object-cover"
              />

              {/* Delete button */}
              <button
                onClick={() => handleDelete(fav._id)}
                className="absolute top-3 right-3 bg-white/80 hover:bg-red-500 hover:text-white text-gray-700 rounded-full p-2 transition"
                title="Remove from Favorites"
              >
                <FaTrash />
              </button>

              <div className="p-5 space-y-2">
                <h3 className="text-xl font-semibold text-gray-800">
                  {fav.foodName}
                </h3>
                <p className="text-sm text-gray-500">
                  {fav.restaurantName} — {fav.location}
                </p>
                <p className="text-sm text-gray-700 font-medium">
                  Rating:  {fav.rating}/5
                </p>
                {fav.date && (
                  <p className="text-xs text-gray-400">
                    Posted on: {new Date(fav.date).toLocaleDateString()}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  </div>
  );
};

export default MyFavorites;

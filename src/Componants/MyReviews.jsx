import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const MyReviews = () => {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/my-reviews/${user.email}`)
        .then(res => res.json())
        .then(data => setReviews(data))
        .catch(err => console.error(err));
    }
  }, [user]);

  const handleDelete = (id) => {
    setSelectedReview(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    fetch(`http://localhost:3000/reviews/${selectedReview}`, { method: "DELETE" })
      .then(res => res.json())
      .then(() => {
        setReviews(prev => prev.filter(r => r._id !== selectedReview));
        setShowModal(false);
      });
  };

  const handleEdit = (id) => navigate(`/edit-review/${id}`);

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-8 text-orange-600">My Reviews</h2>
      {reviews.length === 0 ? (
        <p className="text-center text-gray-500">You haven’t added any reviews yet 😔</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border">
            <thead className="bg-orange-500 text-white">
              <tr>
                <th>Food Image</th>
                <th>Food Name</th>
                <th>Restaurant</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map(r => (
                <tr key={r._id}>
                  <td><img src={r.photo} alt={r.foodName} className="h-16 w-16 object-cover rounded" /></td>
                  <td>{r.foodName}</td>
                  <td>{r.restaurantName}</td>
                  <td>{new Date(r.date).toLocaleDateString()}</td>
                  <td className="flex gap-2">
                    <button onClick={() => handleEdit(r._id)} className="bg-blue-500 text-white px-2 py-1 rounded flex items-center gap-1 hover:bg-blue-600"><FaEdit /> Edit</button>
                    <button onClick={() => handleDelete(r._id)} className="bg-red-500 text-white px-2 py-1 rounded flex items-center gap-1 hover:bg-red-600"><FaTrashAlt /> Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold mb-4">Are you sure you want to delete this review?</h3>
            <div className="flex justify-center gap-4">
              <button onClick={confirmDelete} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Confirm</button>
              <button onClick={() => setShowModal(false)} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MyReviews;

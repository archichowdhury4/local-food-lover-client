import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";

const AddReview = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Protected check
  if (!user) {
    navigate("/login"); // user না থাকলে login page এ redirect
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const reviewData = {
      foodName: form.foodName.value,
      photo: form.photo.value,
      restaurantName: form.restaurantName.value,
      location: form.location.value,
      rating: parseFloat(form.rating.value),
      reviewText: form.reviewText.value,
      email: user.email, 
      reviewerName: user.displayName || "Anonymous", // <-- ইউজারের নাম
      date: new Date().toISOString(), 
    };

    try {
      const res = await fetch("http://localhost:3000/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData),
      });

      const data = await res.json();
      if (data.insertedId) {
        toast.success("Review added successfully!");
        form.reset();
        navigate("/reviews");
      } else {
        toast.error("Failed to add review. Try again!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-16">
      <div className="max-w-3xl mx-auto py-10 px-4">
        <h2 className="text-3xl font-bold text-orange-600 mb-6 text-center">
          Add Your Review
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-lg">
          {/* Food Name */}
          <div>
            <label className="label">Food Name</label>
            <input
              type="text"
              name="foodName"
              placeholder="Enter food name"
              className="input w-full"
              required
            />
          </div>

          {/* Food Image */}
          <div>
            <label className="label">Food Image URL</label>
            <input
              type="text"
              name="photo"
              placeholder="Enter image URL"
              className="input w-full"
              required
            />
          </div>

          {/* Restaurant Name */}
          <div>
            <label className="label">Restaurant Name</label>
            <input
              type="text"
              name="restaurantName"
              placeholder="Enter restaurant name"
              className="input w-full"
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className="label">Location</label>
            <input
              type="text"
              name="location"
              placeholder="Enter restaurant location"
              className="input w-full"
              required
            />
          </div>

          {/* Star Rating */}
          <div>
            <label className="label">Star Rating (1-5)</label>
            <input
              type="number"
              name="rating"
              min="1"
              max="5"
              step="0.1"
              placeholder="Rate 1 to 5"
              className="input w-full"
              required
            />
          </div>

          {/* Review Text */}
          <div>
            <label className="label">Review</label>
            <textarea
              name="reviewText"
              rows="4"
              placeholder="Write your review..."
              className="input w-full resize-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 w-full"
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </form>

        <ToastContainer position="top-center" />
      </div>
    </div>
  );
};

export default AddReview;

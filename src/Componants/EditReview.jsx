import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const EditReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [review, setReview] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/reviews/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.email !== user.email) {
          toast.error("You are not allowed to edit this review");
          navigate("/my-reviews");
        } else {
          setReview(data);
        }
      });
  }, [id, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updated = {
      foodName: form.foodName.value,
      restaurantName: form.restaurantName.value,
      photo: form.photo.value,
      location: form.location.value,
      rating: parseFloat(form.rating.value),
      reviewText: form.reviewText.value,
    };

    try {
      const res = await fetch(`http://localhost:3000/reviews/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      const data = await res.json();
      if (data.modifiedCount > 0) {
        toast.success("Review updated successfully!");
        navigate("/my-reviews");
      } else {
        toast.info("No changes were made.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Update failed!");
    }
  };

  if (!review) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Review</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="foodName" defaultValue={review.foodName} className="w-full p-2 border rounded" placeholder="Food Name" />
        <input name="restaurantName" defaultValue={review.restaurantName} className="w-full p-2 border rounded" placeholder="Restaurant Name" />
        <input name="photo" defaultValue={review.photo} className="w-full p-2 border rounded" placeholder="Photo URL" />
        <input name="location" defaultValue={review.location} className="w-full p-2 border rounded" placeholder="Location" />
        <input name="rating" type="number" min="1" max="5" step="0.1" defaultValue={review.rating} className="w-full p-2 border rounded" placeholder="Rating 1-5" />
        <textarea name="reviewText" defaultValue={review.reviewText} className="w-full p-2 border rounded resize-none" rows="4" placeholder="Review"></textarea>
        <button type="submit" className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600">Update Review</button>
      </form>
    </div>
  );
};

export default EditReview;

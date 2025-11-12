import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { toast } from "react-toastify";

const EditReview = () => {
  const { id } = useParams();
  const [review, setReview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/reviews/${id}`)
      .then((res) => res.json())
      .then((data) => setReview(data));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const updated = {
      foodName: form.foodName.value,
      restaurantName: form.restaurantName.value,
      photo: form.photo.value,
    };

    fetch(`http://localhost:3000/reviews/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Review updated successfully!");
        navigate("/my-reviews");
      });
  };

  if (!review) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Review</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="foodName"
          defaultValue={review.foodName}
          className="w-full p-2 border rounded"
          placeholder="Food Name"
        />
        <input
          name="restaurantName"
          defaultValue={review.restaurantName}
          className="w-full p-2 border rounded"
          placeholder="Restaurant Name"
        />
        <input
          name="photo"
          defaultValue={review.photo}
          className="w-full p-2 border rounded"
          placeholder="Photo URL"
        />
        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
        >
          Update Review
        </button>
      </form>
    </div>
  );
};

export default EditReview;

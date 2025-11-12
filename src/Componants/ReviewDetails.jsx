import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

const ReviewDetails = () => {
  const { id } = useParams();
  const [review, setReview] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/reviews/${id}`)
      .then((res) => res.json())
      .then((data) => setReview(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!review) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4 text-orange-600">
        {review.foodName}
      </h2>

      <img
        src={review.photo}
        alt={review.foodName}
        className="w-full h-96 md:h-[500px] object-cover rounded-lg mb-4"
      />

      <p className="text-gray-700 mb-2">
        <strong>Restaurant:</strong> {review.restaurantName} — {review.location}
      </p>

      <p className="text-gray-700 mb-2">
        <strong>Reviewer:</strong> {review.reviewerName}
      </p>

      <p className="text-yellow-500 mb-4">
        <strong>Rating:</strong> {review.rating}/5
      </p>

      <p className="text-gray-800 mb-6">{review.reviewText}</p>

    
      <p className="text-xs text-gray-400 text-right mt-8">
        Posted on: {new Date(review.date).toLocaleDateString()}
      </p>

      <div className="text-center mt-6">
        <Link
          to="/"
          className="inline-block bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition"
        >
          Back
        </Link>
      </div>
    </div>
  );
};

export default ReviewDetails;

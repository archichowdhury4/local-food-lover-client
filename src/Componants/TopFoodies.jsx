import { useEffect, useState } from "react";

const TopFoodies = () => {
  const [foodies, setFoodies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // backend থেকে top foodies data fetch
    fetch("http://localhost:3000/top-foodies")
      .then(res => res.json())
      .then(data => {
        setFoodies(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-10">Loading top foodies...</p>;

  return (
    <section className="max-w-6xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-8 text-orange-600">
        Top Foodies
      </h2>
      {foodies.length === 0 ? (
        <p className="text-center text-gray-500">No foodies found 😔</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {foodies.map((user, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-6 text-center hover:scale-105 transition-transform">
              <img
                src={user.photo || "https://via.placeholder.com/150"}
                alt={user.name}
                className="w-24 h-24 mx-auto rounded-full mb-4 object-cover"
              />
              <h3 className="font-semibold text-lg">{user.name}</h3>
              <p className="text-gray-500">{user.reviewsCount} Reviews</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default TopFoodies;

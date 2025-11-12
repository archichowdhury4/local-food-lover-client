import img1 from "../../public/assets/65d2fbcc303531708325836.jpg";
import img2 from "../../public/assets/0.jpg";
import img3 from "../../public/assets/istockphoto-1135530884-612x612.jpg";
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../context/AuthContext"; // ✅ import AuthContext

const slides = [
  {
    id: 1,
    image: img1,
    title: "Discover Local Flavors",
    text: "Explore and share your favorite street food and hidden gems around you.",
    button: "Explore Now",
    link: "/reviews",
  },
  {
    id: 2,
    image: img2,
    title: "Join The Food Lovers Community",
    text: "Share your food experiences and connect with other foodies!",
    button: "Join Us",
    link: "/register",
  },
  {
    id: 3,
    image: img3,
    title: "Taste. Share. Repeat.",
    text: "Celebrate the joy of local food with honest reviews and great photos.",
    button: "Add Review",
    link: "/add-review",
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const { user } = useContext(AuthContext); // ✅ get user info
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleButtonClick = (link) => {
    if (!user) {
      navigate("/login"); // ✅ if not logged in → go to login
    } else {
      navigate(link); // ✅ if logged in → go to intended page
    }
  };

  const variants = {
    enter: { opacity: 0, scale: 1.05 },
    center: { opacity: 1, scale: 1, transition: { duration: 1 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 1 } },
  };

  return (
    <div className="relative w-full h-[80vh] overflow-hidden mt-16">
      <AnimatePresence>
        <motion.div
          key={slides[current].id}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          <img
            src={slides[current].image}
            alt={slides[current].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center text-white px-6">
            <motion.h2
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold mb-4"
            >
              {slides[current].title}
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-lg md:text-xl mb-6 max-w-2xl"
            >
              {slides[current].text}
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <button
                onClick={() => handleButtonClick(slides[current].link)}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg"
              >
                {slides[current].button}
              </button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === current ? "bg-orange-500 scale-110" : "bg-gray-300"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Hero;

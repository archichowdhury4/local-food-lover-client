import { Link } from "react-router";
import { motion } from "framer-motion";
import errorImg from "../../public/assets/404.jpg"
const Error404 = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 to-white px-4">
      
      
      <motion.img
        src={errorImg}
        alt="404 Error"
        className="w-64 md:w-80 mb-6"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      />

      
      <motion.h1
        className="text-5xl md:text-6xl font-bold text-orange-600 mb-4"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        404
      </motion.h1>

      
      <motion.p
        className="text-center text-gray-700 text-lg md:text-xl mb-6 max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Oops! The page you are looking for does not exist. Don’t worry, it happens to the best of us.
      </motion.p>

    
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Link
          to="/"
          className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition font-medium"
        >
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default Error404;

import { motion } from "framer-motion";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import DocumentTitle from "./DocumentTitle";

const AboutContact = () => {
  DocumentTitle('About | MyWeb');
  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      
    <div className="pt-8">
          <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center"
      >
        <h2 className="text-4xl font-bold text-orange-600 mb-6">About Us</h2>
       <p className="text-gray-700 max-w-3xl mx-auto text-lg leading-relaxed">
  <span className="font-semibold">Local Food Lovers Network</span> is a community where food enthusiasts can share their favorite local food experiences. Here, you can explore new restaurants, street food, or home-cooked dishes, and share your honest reviews with others.
</p>
<p className="text-gray-600 mt-4 max-w-3xl mx-auto">
  We believe that food doesn’t just fill the stomach — it fills the heart. Our mission is to spread the joy of food and celebrate local culture together.
</p>

      </motion.div>
    </div>

      
     <div className="">
         <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white shadow-lg rounded-2xl p-8"
      >
        <h3 className="text-3xl font-bold text-orange-600 text-center mb-8">
          Contact Us
        </h3>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <FaEnvelope className="text-orange-500 text-3xl mx-auto mb-2" />
            <h4 className="font-semibold text-gray-800">Email</h4>
            <p className="text-gray-600">support@localfoodlovers.com</p>
          </div>

          <div>
            <FaPhoneAlt className="text-orange-500 text-3xl mx-auto mb-2" />
            <h4 className="font-semibold text-gray-800">Phone</h4>
            <p className="text-gray-600">+880 1234-567890</p>
          </div>

          <div>
            <FaMapMarkerAlt className="text-orange-500 text-3xl mx-auto mb-2" />
            <h4 className="font-semibold text-gray-800">Address</h4>
            <p className="text-gray-600">Dhaka, Bangladesh</p>
          </div>
        </div>

        
        <form className="mt-10 max-w-2xl mx-auto">
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Your Name"
              className="border rounded-lg px-4 py-2 w-full focus:outline-orange-400"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="border rounded-lg px-4 py-2 w-full focus:outline-orange-400"
              required
            />
          </div>
          <textarea
            placeholder="Your Message..."
            className="border rounded-lg px-4 py-2 w-full h-32 focus:outline-orange-400"
            required
          ></textarea>
          <button
            type="submit"
            className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition"
          >
            Send Message
          </button>
        </form>
      </motion.div>
     </div>
    </section>
  );
};

export default AboutContact;

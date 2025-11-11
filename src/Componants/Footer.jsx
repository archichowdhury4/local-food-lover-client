import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
        {/* Logo & Info */}
        <div>
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold">
              FL
            </div>
            <span className="text-xl font-bold text-white">
              Local Food Lovers
            </span>
          </Link>
          <p className="mt-3 text-sm text-gray-400">
            A community of food lovers discovering and sharing the best local flavors.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-orange-500">Home</Link></li>
            <li><Link to="/explore" className="hover:text-orange-500">Explore</Link></li>
            <li><Link to="/restaurants" className="hover:text-orange-500">Restaurants</Link></li>
            <li><Link to="/about" className="hover:text-orange-500">Contact / About</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4 text-xl">
            <a href="#" className="hover:text-orange-500"><FaFacebook /></a>
            <a href="#" className="hover:text-orange-500"><FaInstagram /></a>
            <a href="#" className="hover:text-orange-500"><FaTwitter /></a>
            <a href="#" className="hover:text-orange-500"><FaYoutube /></a>
          </div>
          <p className="text-sm text-gray-400 mt-3">
            © {new Date().getFullYear()} Local Food Lovers. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

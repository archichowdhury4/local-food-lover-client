import { useState, use } from "react";

import { FaBars, FaTimes, FaUser } from "react-icons/fa";

import { Link } from "react-router";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logOut } = use(AuthContext);

  const handleLogout = () => {
    logOut()
      .then(() => console.log("Logged out"))
      .catch((err) => console.error(err));
  };

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-orange-600 flex gap-2">
           <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold">FL</div> Local Food Lovers
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 font-medium">
          <li><Link to="/" className="hover:text-orange-500"> Home</Link></li>
          <li><Link to="/explore" className="hover:text-orange-500"> Explore</Link></li>
          <li><Link to="/restaurants" className="hover:text-orange-500"> Restaurants</Link></li>
          <li><Link to="/foodies" className="hover:text-orange-500"> Top Foodies</Link></li>
          <li><Link to="/about" className="hover:text-orange-500"> Contact / About</Link></li>
        </ul>

        {/* User / Login */}
        <div className="relative">
         {user ? (
  <div className="group inline-block">
    <img
      src={user.photoURL || "https://i.ibb.co/0yP2NQy/default-user.png"}
      alt="User"
      className="w-10 h-10 rounded-full cursor-pointer border-2 border-orange-400"
    />
    <div className="absolute right-0 hidden group-hover:block bg-white shadow-lg rounded-lg mt-2 w-40">
      <Link to="/add-review" className="block px-4 py-2 hover:bg-orange-50">Add Review</Link>
      <Link to="/my-reviews" className="block px-4 py-2 hover:bg-orange-50">My Reviews</Link>
      <button
        onClick={handleLogout}
        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
      >
         Logout
      </button>
    </div>
  </div>
) : (
  <div className="flex gap-2">
    <Link
      to="/login"
      className="bg-orange-500 text-white px-3 py-2 rounded-lg hover:bg-orange-600 flex items-center gap-2"
    >
      <FaUser /> Login
    </Link>
    <Link
      to="/register"
      className="border border-orange-500 text-orange-600 px-3 py-2 rounded-lg hover:bg-orange-50 flex items-center gap-2"
    >
       Register
    </Link>
  </div>
)}

        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl text-orange-600"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="md:hidden bg-white shadow-md flex flex-col items-center space-y-4 py-4 font-medium">
          <Link to="/" onClick={() => setMenuOpen(false)}> Home</Link>
          <Link to="/explore" onClick={() => setMenuOpen(false)}> Explore</Link>
          <Link to="/restaurants" onClick={() => setMenuOpen(false)}> Restaurants</Link>
          <Link to="/foodies" onClick={() => setMenuOpen(false)}> Top Foodies</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}> Contact / About</Link>
          {user ? (
  <>
    <Link to="/add-review" onClick={() => setMenuOpen(false)}>
       Add Review
    </Link>
    <Link to="/my-reviews" onClick={() => setMenuOpen(false)}>
       My Reviews
    </Link>
    <button
      onClick={() => {
        handleLogout();
        setMenuOpen(false);
      }}
      className="text-red-600"
    >
       Logout
    </button>
  </>
) : (
  <div className="flex flex-col gap-2 items-center">
    <Link
      to="/login"
      onClick={() => setMenuOpen(false)}
      className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 flex items-center gap-2 w-40 justify-center"
    >
      <FaUser /> Login
    </Link>
    <Link
      to="/register"
      onClick={() => setMenuOpen(false)}
      className="border border-orange-500 text-orange-600 px-4 py-2 rounded-lg hover:bg-orange-50 flex items-center gap-2 w-40 justify-center"
    >
       Register
    </Link>
  </div>
)}

        </ul>
      )}
    </nav>
  );
};

export default Navbar;

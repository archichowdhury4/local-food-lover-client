import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { signInWithGoogle, createUser, setUser, updateUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  // Toggle password visibility
  const handleTogglePasswordShow = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  // 🔹 Google Sign-In
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(result => {
        const user = result.user;

        // MongoDB তে save করা
        fetch('http://localhost:3000/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: user.displayName || "",
            email: user.email,
            photo: user.photoURL || ""
          })
        })
          .then(res => res.json())
          .then(() => {
            toast.success("Google login successful!");
            navigate(location.state?.from || '/');
          });

      })
      .catch(error => {
        console.error(error);
        toast.error("Google login failed!");
      });
  };

  // 🔹 Email & Password Registration
  const handleRegister = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    // Name validation
    if (name.length < 5) {
      setNameError("Name should be more than 5 characters");
      return;
    } else {
      setNameError("");
    }

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError("Password must have at least 6 characters, including uppercase & lowercase letters.");
      toast.error("Invalid password format!");
      return;
    }

    // Confirm password check
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match!");
      toast.error("Passwords do not match!");
      return;
    }

    setPasswordError("");

    // 🔹 Firebase এ ইউজার তৈরি
    createUser(email, password)
      .then(result => {
        const user = result.user;

        // Firebase এ প্রোফাইল আপডেট
        updateUser({ displayName: name, photoURL: photo })
          .then(() => {
            const newUser = { ...user, displayName: name, photoURL: photo };
            setUser(newUser);

            // 🔹 MongoDB তে ইউজার save করা
            fetch('http://localhost:3000/users', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                name,
                email,
                photo
              })
            })
              .then(res => res.json())
              .then(() => {
                toast.success("Registration successful!");
                navigate("/");
              })
              .catch(() => toast.error("Failed to save user in database!"));
          })
          .catch(err => {
            console.error(err);
            toast.warn("User created but profile not updated!");
            navigate("/");
          });
      })
      .catch(error => {
        console.error(error.code);
        toast.error(error.code);
      });
  };

  return (
    <div>
      <div className="flex justify-center min-h-screen items-center">
        <div className="card bg-base-100 w-full max-w-sm shadow-2xl py-5">
          <h2 className="font-semibold text-3xl text-center">Register your account</h2>
          <p className="text-center pt-2">
            Already Have An Account?{" "}
            <Link to="/login" className="text-secondary">
              Login
            </Link>
          </p>

          {/* 🔹 Registration Form */}
          <form onSubmit={handleRegister} className="card-body">
            <label className="label">Your Name</label>
            <input name="name" type="text" className="input input-bordered" placeholder="Enter your name" required />
            {nameError && <p className="text-xs text-error">{nameError}</p>}

            <label className="label">Photo URL</label>
            <input name="photo" type="text" className="input input-bordered" placeholder="Photo URL" required />

            <label className="label">Email</label>
            <input name="email" type="email" className="input input-bordered" placeholder="Enter your email" required />

            <label className="label">Password</label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                className="input input-bordered w-full"
                placeholder="Password"
                required
              />
              <button onClick={handleTogglePasswordShow} className="btn btn-xs absolute top-2 right-3">
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>

            <label className="label">Confirm Password</label>
            <div className="relative">
              <input
                name="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                className="input input-bordered w-full"
                placeholder="Confirm Password"
                required
              />
            </div>
            {passwordError && <p className="text-xs text-error">{passwordError}</p>}

            {/* 🔹 Submit button */}
            <button type="submit" className="btn gradient-btn btn-neutral mt-4 w-full">Register</button>

            {/* 🔹 Google Sign-In button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="btn bg-white text-black border border-gray-300 mt-2 w-full flex items-center justify-center gap-2"
            >
              Google Sign-In
            </button>
          </form>
        </div>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default Register;

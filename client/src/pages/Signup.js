import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = ({ handleLogin }) => { // Accept handleLogin function as a prop
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const API_URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000" // Local backend
      : process.env.REACT_APP_API_BASE_URL; // Deployed backend

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call the backend API for signup
      const response = await axios.post(`${API_URL}/register`, {
        username, // Include username in the request
        email,
        password,
      });

      // If successful, set success message and login the user automatically
      setSuccess(response.data.message);
      setError(null);

      // Store the token in localStorage
      localStorage.setItem("authToken", response.data.token);

      // Log the user in immediately
      handleLogin({ token: response.data.token, username }); // Pass username and token to handleLogin

      setTimeout(() => navigate("/"), 2000); // Redirect after 2 seconds
    } catch (err) {
      // Handle errors
      setError(err.response?.data?.message || "Something went wrong!");
      setSuccess(null);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white bg-opacity-20 backdrop-blur-lg p-8 rounded-xl shadow-xl w-80 m-16 text-[#357b57]">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h2 className="text-center text-3xl font-bold text-[#357b57]">SIGN UP</h2>

          {/* Success Message */}
          {success && <p className="text-green-500 text-center">{success}</p>}

          {/* Error Message */}
          {error && <p className="text-red-500 text-center">{error}</p>}

          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 rounded-lg bg-white bg-opacity-50 border border-transparent focus:ring-2 focus:ring-[#357b57] focus:border-transparent outline-none"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-white bg-opacity-50 border border-transparent focus:ring-2 focus:ring-[#357b57] focus:border-transparent outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-white bg-opacity-50 border border-transparent focus:ring-2 focus:ring-[#357b57] focus:border-transparent outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full py-3 bg-[#357b57] text-white rounded-lg font-semibold hover:bg-[#2e6e4e] transition"
          >
            SIGN UP
          </button>

          <p className="text-center text-sm mt-4">
            Already signed up?{" "}
            <Link to="/pages/login" className="text-[#357b57] hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;

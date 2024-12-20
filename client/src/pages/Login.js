import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
   const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  
  const API_URL =
  process.env.NODE_ENV === "development"
    ? 'http://localhost:5000' // Local backend
    : process.env.REACT_APP_API_BASE_URL; // Deployed backend

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Call the backend API for login
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      setSuccess("Login successfull");
      setError(null);
  
      // Save the token in localStorage
      localStorage.setItem("authToken", response.data.token);

      // Update the username state in App.js
      handleLogin({ username: response.data.username, token: response.data.token });
      
      // Navigate to the home or dashboard page after successful login
      setTimeout(() => navigate("/"), 2000); 
  
    } catch (err) {
      // Handle errors (e.g., invalid credentials)
      setError(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white bg-opacity-20 backdrop-blur-lg p-8 rounded-xl shadow-xl w-80 m-16 text-[#357b57]">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h2 className="text-center text-3xl font-bold text-[#357b57]">LOGIN</h2>
          {success && <p className="text-green-500 text-center">{success}</p>}
          {/* Error Message */}
          {error && <p className="text-red-500 text-center">{error}</p>}

          {/* Email Input */}
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-white bg-opacity-50 border border-transparent focus:ring-2 focus:ring-[#357b57] focus:border-transparent outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password Input */}
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-white bg-opacity-50 border border-transparent focus:ring-2 focus:ring-[#357b57] focus:border-transparent outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-[#357b57] text-white rounded-lg font-semibold hover:bg-[#2e6e4e] transition"
          >
            SIGN IN
          </button>

          {/* Signup Redirect */}
          <p className="text-center text-sm mt-4">
            New User? <Link to="/pages/signup" className="text-[#357b57] hover:underline">Signup</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

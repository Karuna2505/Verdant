import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  const API_URL = process.env.REACT_APP_API_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Call the backend API for login
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
  
      // Log the response to check if the token is being returned
      console.log("Login response:", response);
  
      // Save the token in localStorage
      localStorage.setItem("authToken", response.data.token);
      console.log("Token saved in localStorage:", localStorage.getItem("authToken"));
  
      // Navigate to the home or dashboard page after successful login
      navigate("/");
  
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

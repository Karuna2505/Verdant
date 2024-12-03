import React from "react";

const Signup = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="bg-white bg-opacity-20 backdrop-blur-lg p-8 rounded-xl shadow-xl w-80 m-16 text-[#357b57]">
        <form className="space-y-6">
          <h2 className="text-center text-3xl font-bold text-[#357b57]">SIGN UP</h2>
          
          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 rounded-lg bg-white bg-opacity-50 border border-transparent focus:ring-2 focus:ring-[#357b57] focus:border-transparent outline-none"
            required
          />
          
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-white bg-opacity-50 border border-transparent focus:ring-2 focus:ring-[#357b57] focus:border-transparent outline-none"
            required
          />

          <button
            type="submit"
            className="w-full py-3 bg-[#357b57] text-white rounded-lg font-semibold hover:bg-[#2e6e4e] transition"
          >
            SIGN UP
          </button>

          <p className="text-center text-sm mt-4">
            Already signed up? <a href="/pages/login" className="text-[#357b57] hover:underline">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;

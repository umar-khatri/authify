"use client";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    try {
      await axios.post("/api/users/forgotpassword", { email });
      toast.success("Password reset email sent!");
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Failed to send email");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F172A] px-4">
      <div className="bg-[#1E293B] text-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-[#38bdf8] mb-4">
          Forgot your password?
        </h2>
        <p className="text-sm text-gray-300 mb-6 text-center">
          Enter your email and we’ll send you a link to reset your password.
        </p>
        <input
          type="email"
          placeholder="Email address"
          className="w-full p-3 rounded-lg mb-4 border border-gray-600 bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 transition duration-200 text-white py-2 rounded-lg font-medium cursor-pointer"  
        >
          Send Reset Link
        </button>
      </div>
    </div>
  );
}

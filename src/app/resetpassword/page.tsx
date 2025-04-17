"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      await axios.post("/api/users/resetpassword", { token, password });
      toast.success("Password reset successfully!");
      setSuccess(true);
    } catch (err: any) {
      toast.error(err?.response?.data?.error || "Error resetting password");
    }
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        router.replace("/login");
      }, 3000);
    }
  }, [success]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] px-4">
      <div className="bg-[#1e293b] text-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-[#38bdf8] mb-4">
          Reset Your Password
        </h2>
        {!success ? (
          <>
            <input
              type="password"
              value={password}
              placeholder="New Password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mb-4 rounded-lg border border-gray-700 bg-[#0f172a] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              value={confirmPassword}
              placeholder="Confirm New Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 mb-6 rounded-lg border border-gray-700 bg-[#0f172a] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSubmit}
              className="w-full bg-green-600 hover:bg-green-700 transition duration-200 text-white py-3 rounded-lg font-medium"
            >
              Reset Password
            </button>
          </>
        ) : (
          <p className="text-green-500 text-center font-semibold">
            Password reset successfully! Redirecting to login...
          </p>
        )}
      </div>
    </div>
  );
}

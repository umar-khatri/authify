"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      if (response.data.success) {
        toast.success(
          "Signup successful! Please check your email to verify your account."
        );
        router.push("/verifyprompt"); // Redirect to the verification prompt
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.error || "Signup failed!");
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisabled(!(user.username && user.email && user.password));
  }, [user]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0f172a] px-4">
      <div className="w-full max-w-md bg-[#1e293b] rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-[#38bdf8] mb-2">
          {loading ? "Signing up..." : "Signup"}
        </h2>
        <p className="text-sm text-center text-gray-400 mb-6">
          Create your account by filling the information below
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
              className="mt-1 w-full p-3 border border-gray-700 bg-[#0f172a] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="mt-1 w-full p-3 border border-gray-700 bg-[#0f172a] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              className="mt-1 w-full p-3 border border-gray-700 bg-[#0f172a] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <button
          onClick={onSignup}
          disabled={buttonDisabled || loading}
          className={`mt-6 w-full py-3 px-4 rounded-lg font-semibold text-white transition duration-300 ${
            buttonDisabled || loading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
          }`}
        >
          {loading ? "Please wait..." : "Signup"}
        </button>

        <div className="flex justify-center items-center mt-4 text-sm text-gray-400">
          <Link href="/login" className="hover:text-blue-400">
            Already have an account?
          </Link>
        </div>
      </div>
    </div>
  );
}
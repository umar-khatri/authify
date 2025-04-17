"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function VerifyEmailPage() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get("token");
    if (urlToken) {
      setToken(urlToken);
    } else {
      setError(true);
    }
  }, []);

  useEffect(() => {
    const verifyUserEmail = async () => {
      if (!token) return;
      try {
        const response = await axios.post("/api/users/verifyemail", { token });
        setVerified(true);
        toast.success("Email verified successfully!");
        console.log("Verification success:", response.data);
      } catch (err: any) {
        console.error("Verification failed:", err.response?.data || err.message);
        setError(true);
        toast.error(err.response?.data?.error || "Verification failed!");
      }
    };

    if (token) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0f172a] px-4">
      <div className="w-full max-w-md bg-[#1e293b] rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-[#38bdf8] mb-4">
          {verified ? "Email Verified!" : "Email Verification"}
        </h2>
        <p className="text-sm text-center text-gray-400 mb-6">
          {verified
            ? "Your email has been successfully verified!"
            : "We are verifying your email. Please wait..."}
        </p>

        {verified && (
          <Link
            href="/login"
            className="text-center text-blue-500 hover:text-blue-700 block mt-4"
          >
            Go to Login
          </Link>
        )}

        {error && (
          <p className="text-red-600 text-center mt-4">
            Verification failed or token is invalid.
          </p>
        )}
      </div>
    </div>
  );
}

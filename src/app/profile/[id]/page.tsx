"use client";

import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { LogOut } from "lucide-react";

export default function UserProfile() {
  const router = useRouter();
  const params = useParams();
  const userId = params.id as string;
  const [lastLogin, setLastLogin] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get("/api/users/me");
        const now = new Date();
        setLastLogin(`${now.toLocaleDateString()} ${now.toLocaleTimeString()}`);
      } catch {
        router.replace("/login");
      }
    };
    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logged out successfully");
      router.replace("/login");
    } catch (error: any) {
      toast.error("Logout failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 px-4 py-8 flex items-center justify-center">
      <div className="w-full max-w-xl bg-[#1e293b] text-white p-8 rounded-3xl shadow-2xl relative">
        <div className="absolute top-4 right-4">
          <button
            onClick={handleLogout}
            className="text-red-400 hover:text-red-600 transition cursor-pointer"
            title="Logout"
          >
            <LogOut className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-3xl font-bold">
            {userId?.slice(0, 2).toUpperCase()}
          </div>
          <h1 className="mt-4 text-3xl font-bold text-[#38bdf8]">Welcome Back!</h1>
          <p className="text-gray-400 mt-2">Your unique ID:</p>
          <p className="font-mono text-blue-300 break-all">{userId}</p>

          <div className="mt-6 w-full grid grid-cols-2 gap-4 text-center">
            <div className="bg-gray-700 p-4 rounded-xl">
              <p className="text-2xl font-bold text-green-400">4</p>
              <p className="text-sm text-gray-300">Projects</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-xl">
              <p className="text-2xl font-bold text-yellow-400">98%</p>
              <p className="text-sm text-gray-300">Profile Complete</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-xl col-span-2">
              <p className="text-sm text-gray-400 mb-1">Last login:</p>
              <p className="text-md font-mono text-blue-400">{lastLogin}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="mt-8 w-full bg-red-500 hover:bg-red-600 transition py-2 px-4 rounded-xl font-semibold cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

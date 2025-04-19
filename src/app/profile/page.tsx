"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function ProfileRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    const redirectToUserProfile = async () => {
      try {
        const response = await axios.get("/api/users/me");
        const userId = response.data.data._id;
        router.replace(`/profile/${userId}`);
      } catch {
        toast.error("Failed to fetch user. Redirecting to login...");
        router.replace("/login");
      }
    };

    redirectToUserProfile();
  }, [router]); // Added router to the dependency array

  return (
    <div className="text-white flex justify-center items-center h-screen">
      Redirecting...
    </div>
  );
}
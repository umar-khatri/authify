"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col">
      {/* Navbar */}
      <nav className="w-full flex justify-between items-center px-4 md:px-8 py-4 shadow-md bg-black/50 backdrop-blur-md">
        <h1 className="text-xl md:text-2xl font-bold text-white">🔐 Authify</h1>
        <div className="space-x-2 md:space-x-4">
          <Link
            href="/login"
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 md:px-4 py-2 rounded-lg transition duration-300 text-sm md:text-base"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="bg-green-500 hover:bg-green-600 text-white px-3 md:px-4 py-2 rounded-lg transition duration-300 text-sm md:text-base"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center flex-grow text-center px-4">
        <h2 className="text-3xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
          Secure & Simple Authentication
        </h2>
        <p className="text-gray-300 max-w-lg md:max-w-xl mb-6 text-sm md:text-base">
          A modern authentication system built with Next.js, protecting your users while keeping it fast and simple.
        </p>
        <div className="space-y-2 md:space-y-0 md:space-x-4 flex flex-col md:flex-row">
          <Link
            href="/signup"
            className="bg-green-500 hover:bg-green-600 px-5 md:px-6 py-3 rounded-lg font-medium text-white text-sm md:text-base"
          >
            Get Started
          </Link>
          <Link
            href="/login"
            className="border border-white hover:bg-white hover:text-black px-5 md:px-6 py-3 rounded-lg font-medium text-sm md:text-base"
          >
            Already have an account?
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-gray-500 text-xs md:text-sm py-4 border-t border-gray-700">
        &copy; {new Date().getFullYear()} Authify. All rights reserved.
      </footer>
    </main>
  );
}
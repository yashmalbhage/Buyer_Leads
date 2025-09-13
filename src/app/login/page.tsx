"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn("credentials", {
      email,
      callbackUrl: "/buyers", // redirect after login
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow">
        <h1 className="text-xl mb-4">Demo Login</h1>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded w-full mb-3"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}

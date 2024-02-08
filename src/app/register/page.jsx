"use client";
import { FormEvent, useState } from "react";
import axios, { AxiosError } from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

function RegisterPage() {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);
      const response = await axios.post("/api/auth/signup", {
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
      });

      console.log(response.data);

      router.push("/login");
    } catch (error) {
      console.error("Error during registration:", error);
      if (error.response?.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white px-8 py-10 max-w-md w-96 mx-auto shadow-lg  rounded-lg"
      >
        {error && <div className="bg-red-400 text-white p-2 mb-2">{error}</div>}
        <h1 className="text-4xl font-bold mb-7 text-slate-700">Signup</h1>

        <label className="text-slate-500">Username:</label>
        <input
          type="text"
          placeholder="Username"
          name="username"
          className="bg-slate-100 px-4 py-2 block mb-2 w-full"
        />

        <label className="text-slate-500">Email:</label>
        <input
          type="email"
          placeholder="email@example.com"
          name="email"
          className="bg-slate-100 px-4 py-2 block mb-2 w-full"
        />

        <label className="text-slate-500">Password:</label>
        <input
          type="password"
          placeholder="*******"
          name="password"
          className="bg-slate-100 px-4 py-2 block mb-2 w-full"
        />

        <button className="rounded-lg border border-indigo-500 bg-indigo-500 text-white shadow-sm transition-all hover:border-indigo-700 hover:bg-indigo-700 focus:ring focus:ring-indigo-200 disabled:cursor-not-allowed disabled:border-indigo-500 disabled:bg-indigo-500 disabled:opacity-80 px-4 py-2 block w-full mt-4">
          Signup
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;

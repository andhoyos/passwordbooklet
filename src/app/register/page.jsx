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
    <div className="flex justify-center items-center md:mt-auto mt-20">
      <form
        onSubmit={handleSubmit}
        className="bg-white text-slate-500 px-8 py-10 max-w-md w-96 mx-auto shadow-lg  rounded-lg"
      >
        {error && (
          <div className="bg-red-400 text-white p-2 mb-2 rounded-md">
            {error}
          </div>
        )}
        <h1 className="md:text-4xl text-2xl font-bold mb-7 ">Signup</h1>

        <label className="text-slate-400">Username:</label>
        <input
          type="text"
          placeholder="Username"
          name="username"
          className="bg-slate-100 px-4 py-2 block mb-2 w-full rounded-md"
        />

        <label className="text-slate-400">Email:</label>
        <input
          type="email"
          placeholder="email@example.com"
          name="email"
          className="bg-slate-100 px-4 py-2 block mb-2 w-full rounded-md"
        />

        <label className="text-slate-400">Password:</label>
        <input
          type="password"
          placeholder="*******"
          name="password"
          className="bg-slate-100 px-4 py-2 block mb-2 w-full rounded-md"
        />

        <button className="rounded-lg border border-indigo-500 bg-indigo-500 text-white font-semibold shadow-sm transition-all hover:border-indigo-700 hover:bg-indigo-700 focus:ring focus:ring-indigo-200 disabled:cursor-not-allowed disabled:border-indigo-500 disabled:bg-indigo-500 disabled:opacity-80 px-4 py-2 block w-full mt-4">
          Signup
        </button>

        <p className="pt-5 px-3">
          Already have an acount ?
          <a className="font-semibold text-indigo-500  px-3" href="/login">
            Sign in
          </a>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;

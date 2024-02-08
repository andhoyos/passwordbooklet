"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

function LoginPage() {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const res = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    });

    if (res.error) setError(res.error);

    if (res?.ok) return router.push("/dashboard/keys");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white px-8 py-10 max-w-md  w-96 mx-auto shadow-lg  rounded-lg"
      >
        {error && <div className="bg-red-400 text-white p-2 mb-2">{error}</div>}
        <h1 className="text-4xl font-bold mb-7 text-slate-700">Signin</h1>

        <label className="text-slate-300">Username:</label>
        <input
          type="text"
          placeholder="Username"
          className="bg-slate-100 px-4 py-2 block mb-2 w-full"
          name="username"
        />

        <label className="text-slate-300">Password:</label>
        <input
          type="password"
          placeholder="Password"
          className="bg-slate-100 px-4 py-2 block mb-2 w-full"
          name="password"
        />

        <button className="rounded-lg border border-indigo-500 bg-transparent  text-indigo-500 shadow-sm transition-all hover:border-indigo-700 hover:bg-indigo-50 focus:ring focus:ring-indigo-200 disabled:cursor-not-allowed disabled:border-indigo-300 disabled:bg-indigo-300 px-4 py-2 block w-full mt-4">
          Signin
        </button>
      </form>
    </div>
  );
}

export default LoginPage;

"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

function LoginPage() {
  const [message, setMessage] = useState({ type: "", content: "" });
  const router = useRouter();

  const bgError = "bg-red-400";
  const bgSuccess = "bg-green-400";

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const res = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    });

    if (res.error) setMessage({ type: "error", content: res.error });

    if (res?.ok) return router.push("/dashboard/keys");
  };

  return (
    <div className="flex justify-center items-center md:mt-20 mt-24">
      <form
        onSubmit={handleSubmit}
        className="bg-white  text-slate-500 px-8 py-10 max-w-md  w-96 mx-auto shadow-lg  rounded-lg"
      >
        {message.content && (
          <div
            className={`${
              message.type === "error" ? `${bgError}` : `${bgSuccess}`
            } text-white p-2 mb-2 rounded-md`}
          >
            {message.content}
          </div>
        )}
        <h1 className="md:text-3xl text-2xl font-bold mb-7">Sign in</h1>

        <label className="text-slate-400">Username:</label>
        <input
          type="text"
          placeholder="Username"
          className="bg-slate-100 px-4 py-2 block mb-2 w-full rounded-md"
          name="username"
        />

        <label className=" text-slate-400">Password:</label>
        <input
          type="password"
          placeholder="*******"
          className="bg-slate-100 px-4 py-2 block mb-2 w-full rounded-md"
          name="password"
        />
        <p className="text-right">
          <a className="font-semibold" href="/forgot-password">
            Forgot Password ?
          </a>
        </p>

        <button className="rounded-lg border border-indigo-500 bg-indigo-500 text-white font-semibold shadow-sm transition-all hover:border-indigo-700 hover:bg-indigo-700 focus:ring focus:ring-indigo-200 disabled:cursor-not-allowed disabled:border-indigo-500 disabled:bg-indigo-500 disabled:opacity-80 px-4 py-2 block w-full mt-4">
          Login
        </button>

        <p className="pt-5 px-3">
          Don&apos;t have an account?
          <a className="font-semibold text-indigo-500  px-3" href="/register">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;

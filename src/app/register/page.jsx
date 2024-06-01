"use client";
import { FormEvent, useState } from "react";
import axios, { AxiosError } from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Notification from "@/components/Notification";

function RegisterPage() {
  const [message, setMessage] = useState({ type: "", content: "" });
  const router = useRouter();

  const closeNotification = () => {
    setMessage({ type: "", content: "" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);

      const response = await axios.post("/api/auth/signup", {
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
      });

      if (response.data) {
        setMessage({
          type: "success",
          content: "Usuario registrado correctamente",
        });
        setTimeout(() => {
          setMessage({ type: "", content: "" });
          router.push("/login");
        }, "1000");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      if (error.response?.data.message) {
        setMessage({ type: "error", content: error.response.data.message });
      } else {
        setMessage({ type: "error", content: "An error occurred" });
      }
    }
  };

  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white text-slate-500 px-8 py-10 max-w-md w-96 mx-auto shadow-lg  rounded-lg"
      >
        <h1 className="md:text-3xl text-2xl font-bold mb-7 ">Registro</h1>

        <label className="text-slate-400">Username:</label>
        <input
          type="text"
          placeholder="Username"
          name="username"
          required
          className="bg-slate-100 px-4 py-2 block mb-2 w-full rounded-md"
        />

        <label className="text-slate-400">Email:</label>
        <input
          type="email"
          placeholder="email@example.com"
          name="email"
          required
          className="bg-slate-100 px-4 py-2 block mb-2 w-full rounded-md"
        />

        <label className="text-slate-400">Password:</label>
        <input
          type="password"
          placeholder="*******"
          name="password"
          required
          className="bg-slate-100 px-4 py-2 block mb-2 w-full rounded-md"
        />

        <button className="rounded-lg border border-indigo-500 bg-indigo-500 text-white font-semibold shadow-sm transition-all hover:border-indigo-700 hover:bg-indigo-700 focus:ring focus:ring-indigo-200 disabled:cursor-not-allowed disabled:border-indigo-500 disabled:bg-indigo-500 disabled:opacity-80 px-4 py-2 block w-full mt-4">
          Registro
        </button>

        <p className="pt-5 px-3">
          ¿Ya tienes una cuenta?
          <a className="font-semibold text-indigo-500  px-3" href="/login">
            Iniciar sesión
          </a>
        </p>
      </form>
      {message.content && (
        <Notification
          message={message.content}
          type={message.type}
          onClose={closeNotification}
        />
      )}
      <div className="bg-asymmetric h-screen" style={{ zIndex: -99999 }}></div>
    </div>
  );
}

export default RegisterPage;

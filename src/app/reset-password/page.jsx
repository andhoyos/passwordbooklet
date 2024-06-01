"use client";

import { useState } from "react";
import axios from "axios";
import { getTokenFromURL } from "@/helpers/resetLink";
import { useRouter } from "next/navigation";
import Notification from "@/components/Notification";

export default function ResetPasswordPage() {
  const [message, setMessage] = useState("");
  const router = useRouter();

  const closeNotification = () => {
    setMessage({ type: "", content: "" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);
      const confirmPassword = formData.get("confirmpassword");
      const password = formData.get("password");

      if (!password || !confirmPassword) {
        setMessage({
          type: "error",
          content: "por favor completa todos los campos",
        });
        return;
      } else if (password !== confirmPassword) {
        setMessage({
          type: "error",
          content: "las contraseñas no coinciden",
        });
        return;
      }

      const response = await axios.put("/api/auth/reset-password", {
        password: formData.get("password"),
        token: getTokenFromURL(),
      });

      if (response.data) {
        setMessage({
          type: "success",
          content: "Se actualizo la contraseña correctamente",
        });
        setTimeout(() => {
          setMessage({ type: "", content: "" });
          router.push("/login");
        }, "1000");
      }
    } catch (error) {
      console.error("Error during change password:", error);
      if (error.response?.data.message) {
        setMessage({ type: "error", content: error.response.data.message });
      } else {
        setMessage({ type: "error", content: "An error occurred" });
      }
    }
  };

  return (
    <div className="flex justify-center items-center md:mt-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white text-slate-500 px-8 py-10 max-w-md w-96 mx-auto shadow-lg  rounded-lg"
      >
        <h1 className="md:text-3xl text-2xl font-bold mb-7 ">
          Change Password
        </h1>

        <label className="text-slate-400">New Password:</label>
        <input
          type="password"
          placeholder="*******"
          name="password"
          className="bg-slate-100 px-4 py-2 block mb-2 w-full rounded-md"
        />
        <label className="text-slate-400">Confirm Password:</label>
        <input
          type="password"
          placeholder="*******"
          name="confirmpassword"
          className="bg-slate-100 px-4 py-2 block mb-2 w-full rounded-md"
        />

        <button className="rounded-lg border border-indigo-500 bg-indigo-500 text-white font-semibold shadow-sm transition-all hover:border-indigo-700 hover:bg-indigo-700 focus:ring focus:ring-indigo-200 disabled:cursor-not-allowed disabled:border-indigo-500 disabled:bg-indigo-500 disabled:opacity-80 px-4 py-2 block w-full mt-4">
          Cambiar contraseña
        </button>
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

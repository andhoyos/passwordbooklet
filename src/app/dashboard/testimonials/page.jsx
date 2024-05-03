"use client";

import { useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";

const TestimonialsForm = () => {
  const { data: session } = useSession();
  const [message, setMessage] = useState({ type: "", content: "" });
  const router = useRouter();

  const formRef = useRef(null);

  const bgError = "bg-red-400";
  const bgSuccess = "bg-green-400";

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(session);
    if (!session) {
      router.push("/login");
      return;
    }

    try {
      const formData = new FormData(event.currentTarget);
      const description = formData.get("descripcion");

      if (!description) {
        setMessage({
          type: "error",
          content: "Por favor completa todos los campos",
        });
        return;
      }

      const response = await axios.post("/api/auth/testimonial", {
        description,
        user: session.user,
      });

      if (formRef.current) {
        formRef.current.reset();
      }
      if (response.data) {
        setMessage({
          type: "success",
          content: "Calificacion guardada correctamente",
        });
        setTimeout(() => {
          setMessage({ type: "", content: "" });
          router.push("/dashboard/keys");
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
        ref={formRef}
        className="bg-white text-slate-500 px-8 py-10 max-w-md  w-96 mx-auto shadow-lg  rounded-lg"
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
        <h1 className="md:text-3xl text-2xl font-bold mb-7">Calificación</h1>

        <label className="text-slate-400">Descripcion:</label>
        <textarea
          placeholder="descripcion"
          name="descripcion"
          className="bg-slate-100 px-4 py-2 block mb-2 w-full"
          maxLength={100}
        />
        <button className="rounded-lg border border-indigo-500 bg-indigo-500 text-white shadow-sm transition-all hover:border-indigo-700 hover:bg-indigo-700 focus:ring focus:ring-indigo-200 disabled:cursor-not-allowed disabled:border-indigo-500 disabled:bg-indigo-500 disabled:opacity-80 px-4 py-2 block w-full mt-4">
          Guardar
        </button>
      </form>
    </div>
  );
};

export default TestimonialsForm;

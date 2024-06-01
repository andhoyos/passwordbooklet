import { useState } from "react";
import axios from "axios";
import Notification from "@/components/Notification";

const ForgotPassword = () => {
  const [message, setMessage] = useState({ type: "", content: "" });

  const closeNotification = () => {
    setMessage({ type: "", content: "" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      const response = await axios.post("/api/auth/send", {
        email: formData.get("email"),
      });

      if (response.data) {
        setMessage({
          type: "success",
          content: "Se ha enviado el link al email ingresado",
        });
      }
    } catch (error) {
      console.error("Error during sending mail:", error);
      if (error.response?.data.message) {
        setMessage({ type: "error", content: error.response.data.message });
      } else {
        setMessage({
          type: "error",
          content: "Error al enviar el correo electrónico",
        });
      }
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-white text-slate-500 px-8 py-10 max-w-md w-96 mx-auto shadow-lg  rounded-lg"
      >
        <h1 className="md:text-3xl text-2xl font-bold mb-7 ">
          Olvidé mi contraseña
        </h1>
        <label className="text-slate-400">Email:</label>
        <input
          type="email"
          name="email"
          placeholder="email@example.com"
          className="bg-slate-100 px-4 py-2 block mb-2 w-full rounded-md"
        />
        <button className="rounded-lg border border-indigo-500 bg-indigo-500 text-white font-semibold shadow-sm transition-all hover:border-indigo-700 hover:bg-indigo-700 focus:ring focus:ring-indigo-200 disabled:cursor-not-allowed disabled:border-indigo-500 disabled:bg-indigo-500 disabled:opacity-80 px-4 py-2 block w-full mt-4">
          Enviar enlace de restablecimiento
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
    </>
  );
};

export default ForgotPassword;

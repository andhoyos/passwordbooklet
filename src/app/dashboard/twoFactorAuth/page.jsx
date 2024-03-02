"use client"
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from "axios";
import VerificationModalCode from "@/components/VerificationModal";

const FormPhoneNumber = () => {
  const { data: session } = useSession();
  const [message, setMessage] = useState({ type: "", content: "" });
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showVerificationModal, setShowVerificationModal] = useState(false); // Estado para controlar la visibilidad del modal
  const router = useRouter();

  const formRef = useRef(null);

  const bgError = "bg-red-400";
  const bgSuccess = "bg-green-400";

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!session) {
      router.push("/login");
      return;
    }


    try {

      const formData = new FormData(event.currentTarget);
      const phoneNumber = formData.get("phone");

      if (!phoneNumber) {
        setMessage({
          type: "error",
          content: "Por favor completa todos los campos",
        });
        return;
      }
      setPhoneNumber(phoneNumber);
      // Llamar a la API de Twilio para enviar un código de verificación
      const response = await axios.post("/api/auth/send-verification-code", {
        phoneNumber,
      });

      if (formRef.current) {
        formRef.current.reset();
      }

      if (response.data) {
        setMessage({
          type: "success",
          content: "Se envió un código de verificación a tu número de teléfono",
        });
        setShowVerificationModal(true); // Mostrar el modal para ingresar el código de verificación
      }
    } catch (error) {
      console.error("Error during sending verification code:", error);
      if (error.response?.data.message) {
        setMessage({ type: "error", content: error.response.data.message });
      } else {
        setMessage({ type: "error", content: "Ocurrió un error" });
      }
    }
  };

  return (
    <div className="flex justify-center items-center md:mt-14 mt-20">
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
        <h1 className="md:text-3xl text-2xl font-bold mb-7">Two Factor Auth</h1>

        <label className="text-slate-400">Phone Number:</label>
        <input
          type="number"
          placeholder="Phone Number"
          name="phone"
          className="bg-slate-100 px-4 py-2 block mb-2 w-full"
        />
        <button className="rounded-lg border border-indigo-500 bg-indigo-500 text-white shadow-sm transition-all hover:border-indigo-700 hover:bg-indigo-700 focus:ring focus:ring-indigo-200 disabled:cursor-not-allowed disabled:border-indigo-500 disabled:bg-indigo-500 disabled:opacity-80 px-4 py-2 block w-full mt-4">
          Guardar
        </button>
      </form>

      {showVerificationModal && (
        <VerificationModalCode 
        phoneNumber={phoneNumber}
         />
      )}
    </div>
  );
};

export default FormPhoneNumber;

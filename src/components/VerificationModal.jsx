import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { authenticator } from "otplib";
import axios from "axios";
import Notification from "@/components/Notification";

function VerificationTOTP({ onSuccess }) {
  const { data: session } = useSession();
  const [totpSecret, setTotpSecret] = useState("");
  const [message, setMessage] = useState({ type: "", content: "" });
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const inputRefs = useRef([]);

  const closeNotification = () => {
    setMessage({ type: "", content: "" });
  };

  useEffect(() => {
    const fetchTOTPSecret = async () => {
      try {
        const response = await axios.get("/api/auth/profile", {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        });
        const secretFromDB = response.data;

        setTotpSecret(secretFromDB);
      } catch (error) {
        console.error("Error fetching TOTP secret:", error);
      }
    };

    if (session) {
      fetchTOTPSecret();
    }
  }, [session]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace") {
      handleInputChange(index, "");
      if (index > 0) {
        const prevIndex = index - 1;
        const prevInputElement = inputRefs.current[prevIndex];
        if (prevInputElement) {
          prevInputElement.focus();
          prevInputElement.select();
        }
      }
    } else if (event.key === "ArrowLeft" && index > 0) {
      const prevIndex = index - 1;
      const prevInputElement = inputRefs.current[prevIndex];
      if (prevInputElement) {
        prevInputElement.focus();
        prevInputElement.select();
      }
    } else if (
      event.key === "ArrowRight" &&
      index < verificationCode.length - 1
    ) {
      const nextIndex = index + 1;
      const nextInputElement = inputRefs.current[nextIndex];
      if (nextInputElement) {
        nextInputElement.focus();
        nextInputElement.select();
      }
    }
  };

  const handleInputChange = (index, value) => {
    const updatedVerificationCode = [...verificationCode];
    updatedVerificationCode[index] = value;

    const inputElement = inputRefs.current[index];
    if (inputElement) {
      inputElement.value = value;
    }

    setVerificationCode(updatedVerificationCode);

    if (value && index < inputRefs.current.length - 1) {
      const nextIndex = index + 1;
      const nextInputElement = inputRefs.current[nextIndex];
      if (nextInputElement) {
        nextInputElement.focus();
        nextInputElement.select(); // Seleccionar todo el texto para que se pueda escribir sin borrar el valor existente
      }
    }
  };

  const handlePaste = (e, index) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    // Dividir el texto pegado en caracteres individuales y asignarlos a los campos de entrada correspondientes
    pastedData.split("").forEach((char, i) => {
      if (index + i < inputRefs.current.length) {
        inputRefs.current[index + i].value = char;
        // Mover el foco al siguiente campo
        if (index + i < inputRefs.current.length - 1) {
          inputRefs.current[index + i + 1].focus();
        }
      }
    });
  };

  // Verificar el código de autenticación ingresado por el usuario
  const verifyAuthCode = () => {
    const verificationCodeValue = verificationCode.join("");
    if (!verificationCodeValue) {
      setMessage({
        type: "error",
        content: "Por favor ingresa el código de verificación",
      });
      return;
    }
    console.log(verificationCodeValue);
    const isValid = authenticator.check(verificationCodeValue, totpSecret);
    if (isValid) {
      setMessage({
        type: "success",
        content: "¡Código de autenticación válido!",
      });
      setTimeout(() => {
        onSuccess();
      }, "1000");
    } else {
      setMessage({
        type: "error",
        content: "¡Código de autenticación inválido!",
      });
    }
  };

  return (
    <div className="flex  justify-center items-center py-5">
      <div className="bg-white text-slate-500 px-8 max-w-md  w-96 mx-auto  rounded-lg">
        <h1 className="text-3xl font-bold py-2">Verification code</h1>

        <label className="text-slate-400">
          Ingresa el codigo generado por la aplicación de autenticación
        </label>
        <div className="flex justify-between mt-2">
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <div key={index} className="w-10 h-12">
              <input
                ref={(ref) => (inputRefs.current[index] = ref)}
                className="w-full h-full flex flex-col items-center justify-center text-center px-3 outline-none rounded-xl border border-gray-300 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={verificationCode[index]}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onPaste={(e) => handlePaste(e, index)}
                onKeyDown={(e) => handleKeyDown(index, e)}
              />
            </div>
          ))}
        </div>
        <div className="flex  items-center gap-4 md:w-80 w-full text-sm md:py-6 py-10">
          <button
            className="flex-1 rounded-lg border border-indigo-500 bg-indigo-500 py-2.5 md:py-1.5 text-center text-sm font-semibold text-white shadow-sm transition-all hover:border-indigo-700 hover:bg-indigo-700 focus:ring focus:ring-indigo-200 disabled:cursor-not-allowed disabled:border-indigo-500 disabled:bg-indigo-500 disabled:opacity-80"
            onClick={verifyAuthCode}
          >
            Verificar código
          </button>
        </div>
      </div>
      {message.content && (
        <Notification
          message={message.content}
          type={message.type}
          onClose={closeNotification}
        />
      )}
    </div>
  );
}

export default VerificationTOTP;

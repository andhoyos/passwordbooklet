import { useState, useEffect, useRef } from "react";
import { authenticator } from "otplib";

function VerificationTOTP({ onSuccess }) {
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

  const bgError = "bg-red-400";
  const bgSuccess = "bg-green-400";

  // Simulando la obtención de la clave secreta desde la base de datos
  useEffect(() => {
    const secretFromDB = "EFJCCPCNNYHF2OA6";
    setTotpSecret(secretFromDB);
  }, []);

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
    <div className="flex  justify-center items-center md:mt-14 mt-20">
      <div className="bg-white text-slate-500 px-8 max-w-md  w-96 mx-auto  rounded-lg">
        {message.content && (
          <div
            className={`${
              message.type === "error" ? `${bgError}` : `${bgSuccess}`
            } text-white p-2 mb-2 rounded-md`}
          >
            {message.content}
          </div>
        )}
        <h1 className="text-3xl font-bold py-2">Verification code</h1>

        <label className="text-slate-400">Code:</label>
        <div className="flex justify-between">
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <div key={index} className="w-10 h-12">
              <input
                ref={(ref) => (inputRefs.current[index] = ref)}
                className="w-full h-full flex flex-col items-center justify-center text-center px-3 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={verificationCode[index]}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onPaste={(e) => handlePaste(e, index)}
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
    </div>
  );
}

export default VerificationTOTP;

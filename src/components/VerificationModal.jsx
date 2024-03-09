import { useSession } from "next-auth/react";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const VerificationModalCode = ({ phoneNumber, closeModal, context }) => {
  const { data: session } = useSession();
  const [message, setMessage] = useState({ type: "", content: "" });
  const [phoneNumberUpdate, setPhoneNumberUpdate] = useState("");
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const inputRefs = useRef([]);
  const router = useRouter();

  const bgError = "bg-red-400";
  const bgSuccess = "bg-green-400";

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

  const handleVerificationSubmit = async (event) => {
    event.preventDefault();
    const verificationCodeValue = verificationCode.join("");
    if (!verificationCodeValue) {
      setMessage({
        type: "error",
        content: "Por favor ingresa el código de verificación",
      });
      return;
    }
    try {
      setPhoneNumberUpdate(phoneNumber);
      const response = await axios.post("/api/auth/verification-code", {
        verificationCode: verificationCodeValue,
        phoneNumberVerification: phoneNumber,
      });

      if (response.data.status === 200) {
        setMessage({
          type: "success",
          content: response.data.message,
        });

        if (context !== "login") {
          // Realiza la acción de guardar el número de teléfono en la base de datos
          const responseUpdate = await axios.patch("/api/auth/profile", {
            phoneNumber: phoneNumberUpdate,
            user: session,
          });

          if (responseUpdate.data) {
            setMessage({
              type: "success",
              content:
                "la proxima vez que inicies session te pediremos el codigo de verificacion",
            });
            setTimeout(() => {
              setMessage({ type: "", content: "" });
              closeModal();
              router.push("/dashboard/profile");
            }, "2000");
          }
        } else {
          setMessage({
            type: "success",
            content:
              "Se verifico el codigo correctamente",
          });
          setTimeout(() => {
            setMessage({ type: "", content: "" });
            closeModal();
            router.push("/dashboard/profile");
          }, "2000");
        }
      } else {
        setMessage({
          type: "error",
          content: response.data.message,
        });
      }
    } catch (error) {
      console.error("Error during verification:", error);
      if (error.response?.data.message) {
        setMessage({ type: "error", content: error.response.data.message });
      } else {
        setMessage({ type: "error", content: "Ocurrió un error" });
      }
    }
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center  pt-28 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3  sm:mt-0 sm:ml-4 sm:text-left w-full">
                <form
                  onSubmit={handleVerificationSubmit}
                  className="bg-white text-slate-500 md:px-8 px-4 py-6 max-w-md md:w-96 w-full mx-auto  rounded-lg"
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
                  <h1 className="text-3xl font-bold py-2">Verification code</h1>

                  <label className="text-slate-400">Code:</label>
                  <div className="flex justify-between">
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                      <div key={index} className="w-10 h-12">
                        <input
                          ref={(ref) => (inputRefs.current[index] = ref)}
                          className="w-full h-full flex flex-col items-center justify-center text-center px-3 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                          type="text"
                          maxLength={1}
                          value={verificationCode[index]}
                          onChange={(e) =>
                            handleInputChange(index, e.target.value)
                          }
                          onPaste={(e) => handlePaste(e, index)}
                        />
                      </div>
                    ))}
                  </div>

                  {/* <input
                    type="number"
                    name="verificationCode"
                    className="bg-slate-100 px-4 py-2 block mb-2 w-full"
                  /> */}

                  <div className="flex  items-center gap-4 md:w-80 w-full text-sm md:py-6 py-10">
                    <button className="flex-1 rounded-lg border border-indigo-500 bg-indigo-500 py-2.5 md:py-1.5 text-center text-sm font-semibold text-white shadow-sm transition-all hover:border-indigo-700 hover:bg-indigo-700 focus:ring focus:ring-indigo-200 disabled:cursor-not-allowed disabled:border-indigo-500 disabled:bg-indigo-500 disabled:opacity-80">
                      Verificar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationModalCode;

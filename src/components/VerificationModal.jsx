import { useSession } from "next-auth/react";
import { useState} from "react";
import axios from "axios";

const VerificationModalCode = ({  phoneNumber}) => {
  const { data: session } = useSession();
  const [message, setMessage] = useState({ type: "", content: "" });

  const bgError = "bg-red-400";
  const bgSuccess = "bg-green-400";  

  const handleVerificationSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const verificationCode = formData.get("verificationCode");
    if (!verificationCode) {
      setMessage({
        type: "error",
        content: "Por favor ingresa el código de verificación",
      });
      return;
    }
    try {
      const response = await axios.post("/api/auth/verification-code", {
        verificationCode,
        phoneNumberVerification:phoneNumber
      });

      if (response.data) {
        // Cerrar el modal de verificación
        setMessage({
          type: "success",
          content: "Se verifico correctamente",
        });
        // Realizar la acción de guardar el número de teléfono en la base de datos
        // Puedes hacer esto llamando a la función handleSubmit nuevamente con los datos necesarios
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
                  <input
                    type="number"
                    name="verificationCode"
                    className="bg-slate-100 px-4 py-2 block mb-2 w-full"
                  />

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

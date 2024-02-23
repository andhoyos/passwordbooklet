import { useSession } from "next-auth/react";
import { useState } from "react";
import axios from "axios";

const DeleteCompanyPage = ({
  company,
  companyId,
  closeModal,
  updateKeyInList,
}) => {
  const { data: session } = useSession();
  const [message, setMessage] = useState({ type: "", content: "" });

  const deleteAccount = async () => {
    try {
      const response = await axios.delete("/api/auth/keys", {
        data: { companyId: companyId, user: session },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
      });

      console.log(response.data);
      if (response.data) {
        setMessage({
          type: "success",
          content: "Compañia eliminada correctamente",
        });
        setTimeout(() => {
          setMessage({ type: "", content: "" });
          closeModal();
          updateKeyInList();
        }, "1000");
      }
    } catch (error) {
      console.error("Error during deleted:", error);
      if (error.response?.data.message) {
        setMessage({ type: "error", content: error.response.data.message });
      } else {
        setMessage({ type: "error", content: "An error occurred" });
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
                <div className="bg-white text-slate-500 md:px-8 px-4 py-6 max-w-md md:w-96 w-full mx-auto  rounded-lg">
                  {message.content && (
                    <div
                      className={`bg-${
                        message.type === "error" ? "red" : "green"
                      }-400 text-white p-2 mb-2 rounded-md`}
                    >
                      {message.content}
                    </div>
                  )}
                  <div className="text-center text-2xl">
                    <h1>
                      Vamos a eliminar la compañia <strong>{company}</strong>
                    </h1>
                    <p className="text-xl">
                      se eliminaran tambien sus cuentas asociadas, desea
                      confirmar la operacion?
                    </p>
                    <p className="text-lg">
                      esta acción no la podemos revertir!
                    </p>
                  </div>
                  <div className="flex  items-center gap-4 md:w-80 w-auto text-sm md:py-6 py-10">
                    <button
                      onClick={closeModal}
                      className="flex-1 rounded-lg border border-indigo-500 bg-indigo-500 py-2.5 md:py-1.5 text-center text-sm font-semibold text-white shadow-sm transition-all hover:border-indigo-700 hover:bg-indigo-700 focus:ring focus:ring-indigo-200 disabled:cursor-not-allowed disabled:border-indigo-500 disabled:bg-indigo-500 disabled:opacity-80"
                    >
                      Cancelar
                    </button>
                    <button
                      className="flex-1 rounded-lg border border-red-500 bg-red-500 py-2.5 md:py-1.5 text-center text-sm font-semibold text-white shadow-sm transition-all hover:border-red-700 hover:bg-red-700 focus:ring focus:ring-red-200 disabled:cursor-not-allowed disabled:border-red-500 disabled:bg-red-500 disabled:opacity-80"
                      onClick={deleteAccount}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={closeModal}
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-zinc-800 text-base font-medium text-white hover:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-800 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteCompanyPage;

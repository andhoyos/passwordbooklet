import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import axios from "axios";

const DeleteProfilePage = ({ username, userId, closeModal }) => {
  const { data: session } = useSession();
  const [message, setMessage] = useState({ type: "", content: "" });

  const bgError = "bg-red-400";
  const bgSuccess = "bg-green-400";

  const deleteUser = async () => {
    console.log("esta es la session", session);
    try {
      const response = await axios.delete("/api/auth/profile", {
        data: { userId: userId, user: session },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
      });
      if (response.data) {
        setMessage({
          type: "success",
          content: "El usuario se elimino correctamente",
        });
        setTimeout(() => {
          setMessage({ type: "", content: "" });
          signOut();
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
          <div className="px-4 pt-5 text-end">
            <button
              type="button"
              className=" text-gray-200 hover:bg-zinc-900 bg-zinc-800 rounded-lg text-sm w-8 h-8  inline-flex justify-center items-center hover:text-white"
              data-modal-hide="popup-modal"
              onClick={closeModal}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="bg-white px-4 pt-3 pb-6">
            <div className="sm:flex sm:items-start">
              <div className="mt-3  sm:mt-0  sm:text-left w-full">
                <div className="bg-white text-slate-500 md:px-8 px-4 py-6 max-w-md md:w-96 w-full mx-auto  rounded-lg">
                  {message.content && (
                    <div
                      className={`${
                        message.type === "error" ? `${bgError}` : `${bgSuccess}`
                      } text-white p-2 mb-2 rounded-md`}
                    >
                      {message.content}
                    </div>
                  )}
                  <div className="text-center text-2xl">
                    <h1>
                      Vamos a eliminar el Usuario <strong>{username}</strong>
                    </h1>
                    <p className="text-xl">
                      se eliminaran tambien las cuentas y contraseñas asociadas,
                      desea confirmar la operación?
                    </p>
                    <p className="text-lg">
                      esta acción no la podemos revertir!
                    </p>
                  </div>
                  <div className="flex items-center gap-4 md:w-80 w-auto text-sm md:py-6 py-10">
                    <button
                      onClick={closeModal}
                      className="flex-1 rounded-lg border border-indigo-500 bg-indigo-500 py-2.5 md:py-1.5 text-center text-sm font-semibold text-white shadow-sm transition-all hover:border-indigo-700 hover:bg-indigo-700 focus:ring focus:ring-indigo-200 disabled:cursor-not-allowed disabled:border-indigo-500 disabled:bg-indigo-500 disabled:opacity-80"
                    >
                      Cancelar
                    </button>
                    <button
                      className="flex-1 rounded-lg border border-red-500 bg-red-500 py-2.5 md:py-1.5 text-center text-sm font-semibold text-white shadow-sm transition-all hover:border-red-700 hover:bg-red-700 focus:ring focus:ring-red-200 disabled:cursor-not-allowed disabled:border-red-500 disabled:bg-red-500 disabled:opacity-80"
                      onClick={deleteUser}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteProfilePage;

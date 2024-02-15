import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState, useRef } from "react";
import axios from "axios";

const ProfileModalEdit = ({ username, userId, email, closeModal }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const formRef = useRef(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [datosFormulario, setDatosFormulario] = useState({
    username: username,
    email: email,
  });

  const handleChangeUsername = (nuevoUsername) => {
    setDatosFormulario({ ...datosFormulario, username: nuevoUsername });
  };

  const handleChangeEmail = (nuevoEmail) => {
    setDatosFormulario({ ...datosFormulario, email: nuevoEmail });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const datosAEnviar = new FormData(event.target);
      const username = datosAEnviar.get("username");
      const email = datosAEnviar.get("email");
      if (!username || !email) {
        setError("Por favor completa todos los campos");
        return;
      }
      const response = await axios.put("/api/auth/profile", {
        updatedData: {
          username: username,
          email: email,
        },
        user: session,
      });

      session.user = response.data;

      console.log(response.data);

      if (response.data) {
        setMessage("Datos actualizados correctamente");

        setTimeout(() => {
          closeModal();
        }, "2000");
      }
    } catch (error) {
      console.error("Error during updated:", error);
      if (error.response?.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred");
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
                  onSubmit={handleSubmit}
                  ref={formRef}
                  className="bg-white text-slate-500 md:px-8 px-4 py-6 max-w-md md:w-96 w-full mx-auto  rounded-lg"
                >
                  {error && (
                    <div className="bg-red-500 text-white p-2 mb-2 rounded-md">
                      {error}
                    </div>
                  )}
                  {message && (
                    <p className="message bg-green-500 text-white p-2 mb-2 rounded-md">
                      {message}
                    </p>
                  )}
                  <h1 className="text-3xl font-bold py-2">Profile Edit</h1>

                  <label className="text-slate-400">Username:</label>
                  <input
                    type="text"
                    name="username"
                    defaultValue={datosFormulario.username}
                    onChange={handleChangeUsername}
                    className="bg-slate-100 px-4 py-2 block mb-2 w-full"
                  />

                  <label className="text-slate-400">Email:</label>
                  <input
                    type="text"
                    name="email"
                    defaultValue={datosFormulario.email}
                    onChange={handleChangeEmail}
                    className="bg-slate-100 px-4 py-2 block mb-2 w-full"
                  />

                  <div className="flex  items-center gap-4 md:w-80 w-full text-sm md:py-6 py-10">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="flex-1 rounded-lg border border-red-500 bg-red-500 py-2.5 md:py-1.5 text-center text-sm font-semibold text-white shadow-sm transition-all hover:border-red-700 hover:bg-red-700 focus:ring focus:ring-red-200 disabled:cursor-not-allowed disabled:border-red-500 disabled:bg-red-500 disabled:opacity-80"
                    >
                      Cancelar
                    </button>

                    <button className="flex-1 rounded-lg border border-indigo-500 bg-indigo-500 py-2.5 md:py-1.5 text-center text-sm font-semibold text-white shadow-sm transition-all hover:border-indigo-700 hover:bg-indigo-700 focus:ring focus:ring-indigo-200 disabled:cursor-not-allowed disabled:border-indigo-500 disabled:bg-indigo-500 disabled:opacity-80">
                      Guardar
                    </button>
                  </div>
                </form>
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

export default ProfileModalEdit;

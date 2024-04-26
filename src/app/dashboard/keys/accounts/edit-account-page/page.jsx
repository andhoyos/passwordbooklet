"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState, useRef } from "react";
import axios from "axios";

const EditAccountPage = () => {
  const [message, setMessage] = useState({ type: "", content: "" });
  const [newPassword, setNewPassword] = useState("");
  const { data: session } = useSession();
  const router = useRouter();
  const params = useSearchParams();

  const formRef = useRef(null);

  const searchAccount = params.get("account");
  const searchAccountId = params.get("accountId");
  const searchCompany = params.get("company");

  const [datosFormulario, setDatosFormulario] = useState({
    account: searchAccount,
  });

  const bgError = "bg-red-400";
  const bgSuccess = "bg-green-400";

  const handleChangeAccount = (newAccount) => {
    setDatosFormulario({ ...datosFormulario, account: newAccount });
  };

  const editAccount = async (event) => {
    event.preventDefault();
    try {
      const datosAEnviar = new FormData(event.target);
      const accountName = datosAEnviar.get("account");

      if (!accountName) {
        setMessage({
          type: "error",
          content: "Por favor completa todos los campos",
        });
        return;
      }

      const updatedData = { name: accountName };

      // Si se proporciona una nueva contraseña, agregarla a los datos actualizados
      if (newPassword) {
        updatedData.password = newPassword;
        updatedData.iv = "";
      }

      const response = await axios.put("/api/auth/keys", {
        accountId: searchAccountId,
        updatedData,
        user: session,
      });

      if (response.data) {
        setMessage({
          type: "success",
          content: "Los datos han sido actualizados correctamente",
        });
        setTimeout(() => {
          setMessage({ type: "", content: "" });
          router.push("/dashboard/keys");
        }, "1000");
      }
    } catch (error) {
      console.error("Error during updated:", error);
      if (error.response?.data.message) {
        setMessage({ type: "error", content: error.response.data.message });
      } else {
        setMessage({ type: "error", content: "An error occurred" });
      }
    }
  };
  const handleCancel = () => {
    router.push("/dashboard/keys");
  };

  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={editAccount}
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
        <h1 className="md:text-3xl text-2xl font-bold  ">Editar Cuenta</h1>
        <p className="md:text-2xl text-xl font-bold mb-7">{searchCompany}</p>

        <label className="text-slate-400">Cuenta:</label>
        <input
          type="text"
          name="account"
          defaultValue={datosFormulario.account}
          onChange={handleChangeAccount}
          className="bg-slate-100 px-4 py-2 block mb-2 w-full"
        />

        <label className="text-slate-400">Password:</label>
        <input
          type="password"
          name="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="*******"
          className="bg-slate-100 px-4 py-2 block mb-2 w-full"
        />

        <div className="flex  items-center gap-4 w-80 text-sm md:py-6 py-10">
          <button
            type="button"
            onClick={handleCancel}
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
  );
};

export default EditAccountPage;

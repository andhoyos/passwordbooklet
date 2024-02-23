"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState, useRef } from "react";
import axios from "axios";

const EditAccountPage = () => {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const { data: session } = useSession();
  const router = useRouter();
  const params = useSearchParams();

  const formRef = useRef(null);

  const searchAccount = params.get("account");
  const searchAccountId = params.get("accountId");
  const searchAccountPassword = params.get("accountPassword");
  const searchCompany = params.get("company");

  const [datosFormulario, setDatosFormulario] = useState({
    account: searchAccount,
    accountPassword: searchAccountPassword,
  });

  const handleChangeAccount = (newAccount) => {
    setDatosFormulario({ ...datosFormulario, account: newAccount });
  };

  const handleChangePassword = (newPassword) => {
    setDatosFormulario({ ...datosFormulario, accountPassword: newPassword });
  };

  const editAccount = async (event) => {
    event.preventDefault();
    try {
      const datosAEnviar = new FormData(event.target);
      const accountName = datosAEnviar.get("account");
      const accountPassword = datosAEnviar.get("password");

      let newData;

      {
        accountPassword != ""
          ? (newData = {
              name: accountName,
              password: accountPassword,
              iv: "",
            })
          : (newData = {
              name: accountName,
            });
      }

      const response = await axios.put("/api/auth/keys", {
        accountId: searchAccountId,
        updatedData: newData,
        user: session,
      });

      if (response.data) {
        setMessage("Datos actualizados correctamente");
        setTimeout(() => {
          router.push("/dashboard/keys");
        }, "1000");
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
  const handleCancel = () => {
    router.push("/dashboard/keys");
  };

  return (
    <div className="flex justify-center items-center md:mt-14 mt-20">
      <form
        onSubmit={editAccount}
        ref={formRef}
        className="bg-white text-slate-500 px-8 py-10 max-w-md  w-96 mx-auto shadow-lg  rounded-lg"
      >
        {error && (
          <div className="bg-red-400 text-white p-2 mb-2 rounded-md">
            {error}
          </div>
        )}
        {message && (
          <p className="message bg-green-400 text-white p-2 mb-2 rounded-md">
            {message}
          </p>
        )}
        <h1 className="md:text-3xl text-2xl font-bold  ">Account Edit</h1>
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
          defaultValue={datosFormulario.accountPassword}
          onChange={handleChangePassword}
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

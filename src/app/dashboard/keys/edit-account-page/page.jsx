"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState, useRef } from "react";
import axios from "axios";

const EditAccountPage = () => {
  const [error, setError] = useState("");
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
      const response = await axios.put("/api/auth/keys", {
        accountId: searchAccountId,
        updatedData: {
          name: accountName,
          password: accountPassword,
        },
        user: session,
      });

      console.log(response.data);

      router.push("/dashboard/keys");
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
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={editAccount}
        ref={formRef}
        className="bg-white px-8 py-10 max-w-md  w-96 mx-auto shadow-lg  rounded-lg"
      >
        {error && <div className="bg-red-500 text-white p-2 mb-2">{error}</div>}
        <h1 className="text-4xl font-bold  text-slate-700">Account Edit</h1>
        <p className="text-2xl font-bold mb-7 text-slate-700">
          {searchCompany}
        </p>

        <label className="text-slate-500">Cuenta:</label>
        <input
          type="text"
          name="account"
          defaultValue={datosFormulario.account}
          onChange={handleChangeAccount}
          className="bg-slate-100 px-4 py-2 block mb-2 w-full"
        />

        <label className="text-slate-500">Password:</label>
        <input
          type="text"
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

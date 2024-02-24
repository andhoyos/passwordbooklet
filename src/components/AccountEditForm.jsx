"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from "axios";
import Link from "next/link";

export default function AccountEditForm({
  company,
  companyId,
  usuario,
  contrasena,
  idCuenta,
}) {
  const { data: session } = useSession();
  const [message, setMessage] = useState({ type: "", content: "" });
  const router = useRouter();

  console.log(session);

  const formRef = useRef(null);

  const [datosFormulario, setDatosFormulario] = useState({
    usuario: usuario,
    contrasena: contrasena,
  });

  const bgError = "bg-red-400";
  const bgSuccess = "bg-green-400";

  const handleChangeUsuario = (nuevoUsuario) => {
    setDatosFormulario({ ...datosFormulario, usuario: nuevoUsuario });
  };

  const handleChangeContrasena = (nuevaContrasena) => {
    setDatosFormulario({ ...datosFormulario, contrasena: nuevaContrasena });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(session);
    if (!session) {
      router.push("/login");
      return;
    }

    try {
      const datosAEnviar = new FormData(event.target);
      const nombre = datosAEnviar.get("account");
      const contrasena = datosAEnviar.get("password");

      const response = await axios.put("/api/auth/keys", {
        companyId: companyId,
        accountId: idCuenta,
        updatedData: {
          name: nombre,
          password: contrasena,
        },
        user: session,
      });

      console.log(response.data);
      if (formRef.current) {
        formRef.current.reset();
      }
      router.push("/dashboard/keys");
    } catch (error) {
      console.error("Error during updating:", error);
      if (error.response?.data.message) {
        setMessage({ type: "error", content: error.response.data.message });
      } else {
        setMessage({ type: "error", content: "An error occurred" });
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        ref={formRef}
        className="bg-white px-8 py-10 max-w-md  w-96 mx-auto shadow-lg  rounded-lg"
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
        <h1 className="text-4xl font-bold  text-slate-700">Account Edit</h1>
        <p className="text-2xl font-bold mb-7 text-slate-700">{company}</p>

        <label className="text-slate-500">Cuenta:</label>
        <input
          type="text"
          name="account"
          defaultValue={datosFormulario.usuario}
          onChange={handleChangeUsuario}
          className="bg-slate-100 px-4 py-2 block mb-2 w-full"
        />

        <label className="text-slate-500">Password:</label>
        <input
          type="text"
          name="password"
          defaultValue={datosFormulario.contrasena}
          onChange={handleChangeContrasena}
          className="bg-slate-100 px-4 py-2 block mb-2 w-full"
        />

        <div className="flex  items-center gap-4 w-80 text-sm md:py-6 py-10">
          <Link
            href={`/dashboard/keys/`}
            className="flex-1 rounded-lg border border-red-500 bg-red-500 py-2.5 md:py-1.5 text-center text-sm font-semibold text-white shadow-sm transition-all hover:border-red-700 hover:bg-red-700 focus:ring focus:ring-red-200 disabled:cursor-not-allowed disabled:border-red-500 disabled:bg-red-500 disabled:opacity-80"
          >
            Cancelar
          </Link>

          <button className="flex-1 rounded-lg border border-indigo-500 bg-indigo-500 py-2.5 md:py-1.5 text-center text-sm font-semibold text-white shadow-sm transition-all hover:border-indigo-700 hover:bg-indigo-700 focus:ring focus:ring-indigo-200 disabled:cursor-not-allowed disabled:border-indigo-500 disabled:bg-indigo-500 disabled:opacity-80">
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}

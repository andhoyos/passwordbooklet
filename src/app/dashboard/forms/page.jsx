"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import axios, { AxiosError } from "axios";
import Notification from "@/components/Notification";

const KeyForm = () => {
  const params = useSearchParams();
  const searchCompanyName = params.get("company");
  const searchCompanyId = params.get("companyId");

  const isCompanyId = !!searchCompanyId;
  const companyNameReadonly = isCompanyId;

  const { data: session } = useSession();
  const [message, setMessage] = useState({ type: "", content: "" });
  const [company, setCompany] = useState("");
  const router = useRouter();

  const formRef = useRef(null);

  const closeNotification = () => {
    setMessage({ type: "", content: "" });
  };

  useEffect(() => {
    if (searchCompanyName) {
      setCompany(searchCompanyName);
    }
  }, [searchCompanyName]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(session);
    if (!session) {
      router.push("/login");
      return;
    }

    try {
      const formData = new FormData(event.currentTarget);
      const account = formData.get("account");
      const password = formData.get("password");

      if (!account || !password || !company) {
        setMessage({
          type: "error",
          content: "Por favor completa todos los campos",
        });
        return;
      }
      const capitalizedCompany =
        company.charAt(0).toUpperCase() + company.slice(1);
      formData.get("company", capitalizedCompany);

      const response = await axios.post("/api/auth/keys", {
        companyId: searchCompanyId,
        company: capitalizedCompany,
        accounts: [
          {
            name: formData.get("account"),
            password: formData.get("password"),
            iv: "",
          },
        ],
        user: session,
      });

      if (formRef.current) {
        formRef.current.reset();
      }
      if (response.data) {
        setMessage({
          type: "success",
          content: "Los datos han sido guardados correctamente",
        });
        setTimeout(() => {
          setMessage({ type: "", content: "" });
          router.push("/dashboard/keys");
        }, "1000");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      if (error.response?.data.message) {
        setMessage({ type: "error", content: error.response.data.message });
      } else {
        setMessage({ type: "error", content: "An error occurred" });
      }
    }
  };

  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        ref={formRef}
        className="bg-white text-slate-500 px-8 py-10 max-w-md  w-96 mx-auto shadow-lg  rounded-lg"
      >
        <h1 className="md:text-3xl text-2xl font-bold mb-7">
          {isCompanyId ? "Actualizar Registro" : "Nuevo Registro"}
        </h1>

        <label className="text-slate-400">Compañia:</label>
        <input
          type="text"
          placeholder="company"
          name="company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="bg-slate-100 px-4 py-2 block mb-2 w-full"
          readOnly={companyNameReadonly}
        />

        <label className="text-slate-400">Cuenta:</label>
        <input
          type="text"
          placeholder="email@example.com"
          name="account"
          className="bg-slate-100 px-4 py-2 block mb-2 w-full"
        />

        <label className="text-slate-400">Password:</label>
        <input
          type="text"
          placeholder="*******"
          name="password"
          className="bg-slate-100 px-4 py-2 block mb-2 w-full"
        />

        <button className="rounded-lg border border-indigo-500 bg-indigo-500 text-white shadow-sm transition-all hover:border-indigo-700 hover:bg-indigo-700 focus:ring focus:ring-indigo-200 disabled:cursor-not-allowed disabled:border-indigo-500 disabled:bg-indigo-500 disabled:opacity-80 px-4 py-2 block w-full mt-4">
          Guardar
        </button>
      </form>
      {message.content && (
        <Notification
          message={message.content}
          type={message.type}
          onClose={closeNotification}
        />
      )}
      <div className="bg-asymmetric h-screen" style={{ zIndex: -99999 }}></div>
    </div>
  );
};

export default KeyForm;

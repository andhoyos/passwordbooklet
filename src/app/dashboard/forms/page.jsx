"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import axios, { AxiosError } from "axios";

const KeyForm = () => {
  const params = useSearchParams();
  const searchCompanyName = params.get("company");
  const searchCompanyId = params.get("companyId");

  const isCompanyId = !!searchCompanyId;
  const companyNameReadonly = isCompanyId;

  const { data: session } = useSession();
  const [error, setError] = useState("");
  const [company, setCompany] = useState("");
  const router = useRouter();

  const formRef = useRef(null);

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
      const response = await axios.post("/api/auth/keys", {
        companyId: searchCompanyId,
        company: formData.get("company"),
        accounts: [
          { name: formData.get("account"), password: formData.get("password") },
        ],
        user: session,
      });

      console.log(response.data);
      // event.currentTarget.reset();
      if (formRef.current) {
        formRef.current.reset();
      }
      router.push("/dashboard/keys");
    } catch (error) {
      console.error("Error during registration:", error);
      if (error.response?.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred");
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
        {error && <div className="bg-red-500 text-white p-2 mb-2">{error}</div>}
        <h1 className="text-4xl font-bold mb-7 text-slate-700">Keys</h1>

        <label className="text-slate-500">Empresa:</label>
        <input
          type="text"
          placeholder="company"
          name="company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="bg-slate-100 px-4 py-2 block mb-2 w-full"
          readOnly={companyNameReadonly}
        />

        <label className="text-slate-500">Cuenta:</label>
        <input
          type="text"
          placeholder="email@example.com"
          name="account"
          className="bg-slate-100 px-4 py-2 block mb-2 w-full"
        />

        <label className="text-slate-500">Password:</label>
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
    </div>
  );
};

export default KeyForm;

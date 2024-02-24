"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import axios from "axios";

const DeleteAccountPage = () => {
  const [message, setMessage] = useState({ type: "", content: "" });
  const { data: session } = useSession();
  const router = useRouter();
  const params = useSearchParams();

  const searchAccountCompany = params.get("account");
  const searchAccountId = params.get("accountId");
  const searchCompany = params.get("company");

  const bgError = "bg-red-400";
  const bgSuccess = "bg-green-400";

  const deleteAccount = async () => {
    try {
      const response = await axios.delete("/api/auth/keys", {
        data: { accountId: searchAccountId, user: session },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
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
      console.error("Error during deleted:", error);
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
    <div className="flex flex-col gap-y-10 items-center justify-center mt-28">
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
          Vamos a eliminar la cuenta <strong>{searchAccountCompany}</strong>
        </h1>
        <p>
          de <strong>{searchCompany} </strong> está seguro?
        </p>
      </div>
      <p>esta acción no la podemos revertir!</p>
      <div className="flex  items-center gap-4 w-80 text-sm md:py-6 py-10">
        <button
          onClick={handleCancel}
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
  );
};

export default DeleteAccountPage;

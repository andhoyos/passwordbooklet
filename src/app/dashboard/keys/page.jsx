"use client";
import axios from "axios";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import KeyModal from "@/components/KeyModal";

function KeysPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [keysList, setKeysList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCompany, setSelectedCompany] = useState(null);

  useEffect(() => {
    const fetchKeys = async () => {
      try {
        const response = await axios.get("/api/auth/keys", {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        });

        const data = response.data;
        setKeysList(data);
      } catch (error) {
        console.error(error.response.data.message, error);
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated") {
      fetchKeys();
    }
  }, [status, session]);

  let isVerificationValidated = false;

  if (typeof window !== "undefined") {
    isVerificationValidated = sessionStorage.getItem("isVerificationValidated");
    if (isVerificationValidated === null) {
      isVerificationValidated = false;
    } else {
      isVerificationValidated = isVerificationValidated === "true";
    }
  }

  const handleCompanyClick = (company) => {
    setSelectedCompany(company);
    console.log(company);
  };

  const closeModal = () => {
    setSelectedCompany(null);
  };

  const handleNewKey = () => {
    router.push("/dashboard/forms");
  };

  const colors = [
    "bg-gradient-to-r from-purple-500 to-pink-500",
    "bg-gradient-to-r from-blue-500 to-teal-500",
    "bg-gradient-to-r from-green-500 to-lime-500",
    "bg-gradient-to-r from-orange-500 to-amber-500",
  ];
  let colorIndex = 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center  h-80">
        <div className="flex items-center justify-center gap-5 flex-col">
          <div className="loader "></div>
          <div>estamos procesando los datos ...</div>
        </div>
      </div>
    );
  }

  if (!session) {
    router.push("/login");
    return null;
  }

  if (keysList.length === 0) {
    return (
      <div className="h-[calc(100vh-4rem)] flex flex-col gap-y-10 items-center justify-center">
        <h1 className="font-bold md:text-3xl text-2xl">Keys</h1>
        <p>No hay claves registradas.</p>
        <button
          className="rounded-lg border border-indigo-500 bg-indigo-500 text-white shadow-sm transition-all hover:border-indigo-700 hover:bg-indigo-700 focus:ring focus:ring-indigo-200 disabled:cursor-not-allowed disabled:border-indigo-500 disabled:bg-indigo-500 disabled:opacity-80 px-4 py-2 block mt-4"
          onClick={() => {
            router.push("/dashboard/forms");
          }}
        >
          Crear Registro
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-10 items-center justify-center md:pb-auto pb-5">
      <h1 className="font-bold text-3xl">Keys</h1>

      <div className="grid grid-cols-3 w-full md:w-auto gap-2 max-[500px]:grid-cols-1 px-3 ">
        {keysList.map((key) => (
          <div
            key={key._id}
            onClick={() => handleCompanyClick(key)}
            className={`group w-full rounded-lg text-white ${
              colors[colorIndex++ % colors.length]
            } p-5 transition relative duration-300 cursor-pointer hover:translate-y-[3px] hover:shadow-[0_-8px_0px_0px_red]`}
          >
            <p className="cursor-pointer text-xl">{key.company}</p>
            <p>
              {key.accounts.length}{" "}
              {key.accounts.length === 1 ? "cuenta" : "cuentas"}
            </p>
          </div>
        ))}
      </div>

      {selectedCompany && (
        <KeyModal
          company={selectedCompany.company}
          companyId={selectedCompany._id}
          accounts={
            keysList.find((key) => key.company === selectedCompany.company)
              .accounts
          }
          closeModal={closeModal}
          isValidated={isVerificationValidated}
        />
      )}

      <button
        className="rounded-lg border border-slate-500 bg-slate-500 text-white shadow-sm transition-all hover:border-slate-700 hover:bg-slate-700 focus:ring focus:ring-slate-200 disabled:cursor-not-allowed disabled:border-slate-500 disabled:bg-slate-500 disabled:opacity-80 px-4 py-2   mt-4"
        onClick={() => {
          handleNewKey();
        }}
      >
        Add new
      </button>
    </div>
  );
}

export default KeysPage;

"use client";
import axios from "axios";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import KeyModal from "../../../components/keyModal";

function KeysPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [keysList, setKeysList] = useState([]);
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
        console.error("Error fetching keys:", error);
      }
    };

    if (status === "authenticated") {
      fetchKeys();
    }
  }, [status, session]);

  const handleCompanyClick = (company) => {
    setSelectedCompany(company);
    console.log(company);
  };

  const closeModal = () => {
    setSelectedCompany(null);
  };

  const colors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-red-500",
    "bg-purple-500",
  ];
  let colorIndex = 0;

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader"></div>
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
        <h1 className="font-bold text-3xl">Keys</h1>
        <p>No hay claves registradas.</p>
        <button
          className="rounded-lg border border-indigo-500 bg-indigo-500 text-white shadow-sm transition-all hover:border-indigo-700 hover:bg-indigo-700 focus:ring focus:ring-indigo-200 disabled:cursor-not-allowed disabled:border-indigo-500 disabled:bg-indigo-500 disabled:opacity-80 px-4 py-2 block mt-4"
          onClick={() => {
            router.push("/dashboard/forms");
          }}
        >
          Crear Registro
        </button>

        <button
          className="rounded-lg border border-slate-500 bg-slate-500 text-white shadow-sm transition-all hover:border-slate-700 hover:bg-slate-700 focus:ring focus:ring-slate-200 disabled:cursor-not-allowed disabled:border-slate-500 disabled:bg-slate-500 disabled:opacity-80 px-4 py-2   mt-4"
          onClick={() => {
            signOut();
          }}
        >
          Signout
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-10 items-center justify-center">
      <h1 className="font-bold text-3xl">Keys</h1>

      <div className="grid grid-cols-3 w-full md:w-auto gap-2 max-[500px]:grid-cols-1 px-3 ">
        {keysList.map((key) => (
          <div
            key={key._id}
            onClick={() => handleCompanyClick(key)}
            className={`group w-full rounded-lg ${
              colors[colorIndex++ % colors.length]
            } p-5 transition relative duration-300 cursor-pointer hover:translate-y-[3px] hover:shadow-[0_-8px_0px_0px_red]`}
          >
            <p className="cursor-pointer text-white text-2xl ">{key.company}</p>
          </div>
        ))}
        {/* 
        {keysList.map((key) => (
          <div
            key={key._id}
            onClick={() => handleCompanyClick(key.company)}
            className="border text-gray-50  duration-300 relative group cursor-pointer w-full h-20 overflow-hidden  rounded-lg bg-neutral-800 p-5  font-extrabold hover:bg-sky-700"
          >
            <div className="absolute group-hover:-top-1 group-hover:-right-2 z-10 w-16 h-16 rounded-full group-hover:scale-150  duration-700 right-12 top-12 bg-yellow-500"></div>
            <div className="absolute group-hover:-top-1 group-hover:-right-2 z-10 w-12 h-12 rounded-full group-hover:scale-150  duration-700 right-20 -top-6 bg-orange-500"></div>
            <div className="absolute group-hover:-top-1 group-hover:-right-2 z-10 w-8 h-8   rounded-full group-hover:scale-150  duration-700 right-32 top-6 bg-pink-500"></div>
            <div className="absolute group-hover:-top-1 group-hover:-right-2 z-10 w-4 h-4   rounded-full group-hover:scale-150  duration-700 right-2 top-12 bg-red-600"></div>
            <p className="z-10 absolute bottom-2 left-2">{key.company}</p>
          </div>
        ))} */}
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
        />
      )}

      <button
        className="rounded-lg border border-slate-500 bg-slate-500 text-white shadow-sm transition-all hover:border-slate-700 hover:bg-slate-700 focus:ring focus:ring-slate-200 disabled:cursor-not-allowed disabled:border-slate-500 disabled:bg-slate-500 disabled:opacity-80 px-4 py-2   mt-4"
        onClick={() => {
          signOut();
        }}
      >
        Signout
      </button>
    </div>
  );
}

export default KeysPage;

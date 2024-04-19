"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import CompanyModalEdit from "@/components/CompanyModalEdit";
import CompanyModalDelete from "@/components/CompanyModalDelete";

function KeysPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [keysList, setKeysList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedCompanyDelete, setSelectedCompanyDelete] = useState(null);

  const updateKeyInList = async () => {
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
      } finally {
        setLoading(false);
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

  const handleCompanyClickDelete = (company) => {
    setSelectedCompanyDelete(company);
  };

  const closeModal = () => {
    setSelectedCompany(null);
    setSelectedCompanyDelete(null);
  };

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
        <h1 className="font-bold md:text-3xl text-2xl">Mis Claves</h1>
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
      <div className="container mx-auto  p-4 shadow-md bg-white rounded-md md:w-3/4 w-auto">
        <h1 className="text-2xl font-bold mb-4">Compañias </h1>
        <table className="min-w-full divide-y divide-slate-500 table-auto">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider border-b">
                Compañia
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider border-b">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {keysList.map((key) => (
              <tr
                key={key._id}
                className={`group w-full  px-5 py-3 transition relative duration-300 `}
              >
                <td className="px-6 py-2 break-words border-b">
                  {key.company}
                </td>
                <td className="px-6 py-2 whitespace-nowrap border-b">
                  <button
                    className=" py-2.5 md:py-1.5 mx-2 text-green-500"
                    onClick={() => handleCompanyClick(key)}
                  >
                    Editar
                  </button>
                  <button
                    className=" py-2.5 md:py-1.5 mx-2 text-red-500"
                    onClick={() => handleCompanyClickDelete(key)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            <tr className="w-full  px-5 py-3">
              <td></td>
              <td className="px-6 py-2 whitespace-nowrap ">
                <a
                  href="/dashboard/forms"
                  className=" px-4 py-2.5 text-indigo-500"
                >
                  Agregar
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {selectedCompany && (
        <CompanyModalEdit
          company={selectedCompany.company}
          companyId={selectedCompany._id}
          closeModal={closeModal}
          updateKeyInList={updateKeyInList}
        />
      )}

      {selectedCompanyDelete && (
        <CompanyModalDelete
          company={selectedCompanyDelete.company}
          companyId={selectedCompanyDelete._id}
          closeModal={closeModal}
          updateKeyInList={updateKeyInList}
        />
      )}
    </div>
  );
}

export default KeysPage;

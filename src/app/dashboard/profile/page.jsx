"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import axios from "axios";
import ProfileModalEdit from "@/components/ProfileModalEdit";
import ProfileModalDelete from "@/components/ProfileModalDelete";

function ProfilePage() {
  const { data: session, status } = useSession();
  const [keysList, setKeysList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserDelete, setSelectedUserDelete] = useState(null);

  const totalAccounts = keysList.reduce(
    (acc, key) => acc + key.accounts.length,
    0
  );

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

  const handleProfileClick = (profile) => {
    setSelectedUser(profile);
  };
  const handleProfileClickDelete = (profile) => {
    setSelectedUserDelete(profile);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setSelectedUserDelete(null);
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

  return (
    <div className=" flex flex-col gap-y-10 items-center justify-center">
      <h1 className="font-bold md:text-3xl text-2xl">Administrar</h1>

      {status === "authenticated" && (
        <div className="flex flex-wrap justify-center w-full">
          <div className="p-4 max-w-sm w-full">
            <div className="flex rounded-lg h-full bg-white p-8 flex-col shadow-lg">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full dark:bg-indigo-500 bg-indigo-500 text-white flex-shrink-0">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                </div>
                <h2 className=" text-xl font-medium">Perfil</h2>
              </div>
              <div className="flex flex-col justify-between flex-grow">
                <div className="leading-relaxed text-base ">
                  <h3>
                    <span className=" font-medium">Username:</span>{" "}
                    {session.user.username}
                  </h3>
                  <h3>
                    <span className=" font-medium">Email:</span>{" "}
                    {session.user.email}
                  </h3>
                  <h3>
                    <span className=" font-medium">Autenticacion 2FA:</span>{" "}
                    {session.user.twoFactorAuthEnabled
                      ? "Activado"
                      : "Desactivado"}
                  </h3>
                </div>
                <div className="flex justify-between">
                  <button
                    onClick={() => handleProfileClick(session)}
                    className="mt-3 font-semibold hover:text-indigo-500 inline-flex items-center"
                  >
                    Editar Perfil
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </button>
                  <button
                    onClick={() => handleProfileClickDelete(session)}
                    className="mt-3 font-semibold hover:text-red-500 inline-flex items-center"
                  >
                    Eliminar
                  </button>
                </div>
                {selectedUser && (
                  <ProfileModalEdit
                    username={selectedUser.user.username}
                    email={selectedUser.user.email}
                    userId={selectedUser.user._id}
                    closeModal={closeModal}
                  />
                )}
                {selectedUserDelete && (
                  <ProfileModalDelete
                    username={selectedUserDelete.user.username}
                    userId={selectedUserDelete.user._id}
                    closeModal={closeModal}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="p-4 max-w-sm w-full">
            <div className="flex rounded-lg h-full bg-white p-8 flex-col shadow-lg">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full dark:bg-indigo-500 bg-indigo-500 text-white flex-shrink-0">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                </div>
                <h2 className=" text-xl font-medium">Compañias</h2>
              </div>
              <div className="flex flex-col justify-between flex-grow ">
                <div className="leading-relaxed text-base ">
                  <div className=" h-24  w-24 rounded-full bg-gradient-to-r  from-rose-400 via-fuchsia-500 to-indigo-500 p-1.5 m-auto">
                    <div className="flex h-full bg-slate-50 rounded-full items-center justify-center ">
                      <h1 className="md:text-2xl text-3xl font-bold ">
                        {keysList.length}{" "}
                      </h1>
                    </div>
                  </div>
                </div>
                <a
                  href="/dashboard/keys/companies/company-edit-page"
                  className="mt-3 font-semibold hover:text-indigo-500 inline-flex items-center"
                >
                  Administrar
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="p-4 max-w-sm w-full">
            <div className="flex rounded-lg h-full bg-white p-8 flex-col shadow-lg">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full dark:bg-indigo-500 bg-indigo-500 text-white flex-shrink-0">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                </div>
                <h2 className=" text-xl font-medium">Cuentas</h2>
              </div>
              <div className="flex flex-col justify-between flex-grow">
                <div className="leading-relaxed text-base ">
                  <div className="h-24  w-24 rounded-full bg-gradient-to-r  from-rose-400 via-fuchsia-500 to-indigo-500 p-1.5 m-auto">
                    <div className="flex h-full  rounded-full items-center justify-center bg-slate-50 ">
                      <h1 className="md:text-2xl text-3xl font-bold ">
                        {totalAccounts}{" "}
                      </h1>
                    </div>
                  </div>
                </div>
                <a
                  href="/dashboard/keys"
                  className="mt-3 font-semibold hover:text-indigo-500 inline-flex items-center"
                >
                  Administrar
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;

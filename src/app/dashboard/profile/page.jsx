"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import axios from "axios";
import ProfileModalEdit from "@/components/ProfileModalEdit";

function ProfilePage() {
  const { data: session, status } = useSession();
  const [keysList, setKeysList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

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
      }
    };

    if (status === "authenticated") {
      fetchKeys();
    }
  }, [status, session]);

  const handleProfileClick = (profile) => {
    setSelectedUser(profile);
  };

  const closeModal = () => {
    setSelectedUser(null);
  };

  return (
    <div className=" flex flex-col gap-y-10 items-center justify-center">
      <h1 className="font-bold md:text-3xl text-2xl">Profile</h1>

      {status === "authenticated" && (
        <div className="flex flex-wrap justify-center mt-10 w-full">
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
                <h2 className=" text-lg font-medium">Perfil</h2>
              </div>
              <div className="flex flex-col justify-between flex-grow">
                <div className="leading-relaxed text-base ">
                  <h3>Username: {session.user.username}</h3>
                  <h3>Email: {session.user.email}</h3>
                  <h3>Status: {status}</h3>
                  <h3>Id: {session.user._id}</h3>
                </div>
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
                {selectedUser && (
                  <ProfileModalEdit
                    username={selectedUser.user.username}
                    email={selectedUser.user.email}
                    userId={selectedUser.user._id}
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
                <h2 className=" text-lg font-medium">Keys</h2>
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
                <h2 className=" text-lg font-medium">Accounts</h2>
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

      <pre className="bg-zinc-800 md:p-4 p-1.5">
        {JSON.stringify(
          {
            session,
            status,
          },
          null,
          2
        )}
      </pre>
    </div>
  );
}

export default ProfilePage;

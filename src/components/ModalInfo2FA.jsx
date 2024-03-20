"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import playLogo from "@/images/playLogo.svg";
import axios from "axios";

const Info2FA = ({ closeModal }) => {
  const [user2FA, setUser2FA] = useState(false);
  const [message, setMessage] = useState("");
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    setUser2FA(session.user.twoFactorAuthEnabled);
  }, [session]);

  if (user2FA) {
    closeModal = () => {
      router.push("/dashboard/keys");
    };
  } else {
    closeModal = closeModal;
  }

  const bgError = "bg-red-400";
  const bgSuccess = "bg-green-400";

  const delete2FA = async () => {
    try {
      const responseUpdate = await axios.patch("/api/auth/profile", {
        totpSecret: "",
        // iv: "",
        twoFactorAuthEnabled: false,
        user: session,
      });

      session.user = responseUpdate.data;

      if (responseUpdate.data) {
        setMessage({
          type: "success",
          content: "Se desactivo la doble autenticacion",
        });
        setTimeout(() => {
          setMessage({ type: "", content: "" });
          router.push("/dashboard/keys");
        }, 2000);
      }
    } catch (error) {
      console.error("Error during updated:", error);
      if (error.response?.data.message) {
        setMessage({ type: "error", content: error.response.data.message });
      } else {
        setMessage({ type: "error", content: "Ocurrió un error" });
      }
    }
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center  pt-28 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3  sm:mt-0 sm:ml-4 sm:text-left w-full">
                <div className="bg-white text-slate-500 md:px-8 px-4 py-6 max-w-md md:w-96 w-full mx-auto  rounded-lg">
                  {message.content && (
                    <div
                      className={`${
                        message.type === "error" ? `${bgError}` : `${bgSuccess}`
                      } text-white p-2 mb-2 rounded-md`}
                    >
                      {message.content}
                    </div>
                  )}
                  {user2FA ? (
                    <>
                      <p className="text-center pt-5">
                        Ya tienes activada la autenticacion de dos factores para
                        visializar tus contraseñas, Se recomienda mantenerla
                        activada para una mayor seguridad.
                        <br />
                        Puedes desactivarla haciendo click en el boton de abajo.
                      </p>
                      <div className="flex  items-center gap-4 md:w-80 w-auto text-sm md:py-6 py-10">
                        <button
                          className="flex-1 rounded-lg border border-red-500 bg-red-500 py-2.5 md:py-1.5 text-center text-sm font-semibold text-white shadow-sm transition-all hover:border-red-700 hover:bg-red-700 focus:ring focus:ring-red-200 disabled:cursor-not-allowed disabled:border-red-500 disabled:bg-red-500 disabled:opacity-80"
                          onClick={delete2FA}
                        >
                          Desactivar
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-center pt-5">
                        Vas a necesitar una aplicacion de autenticacion, abajo
                        encontraras dos opciones disponibles para Android.
                      </p>
                      <div className="flex justify-around md:flex-row md:gap-0 gap-2 flex-col items-center pt-4">
                        <Link
                          className="inline-flex items-center gap-1 border-2 rounded-md px-4 py-2"
                          href="https://play.google.com/store/apps/details?id=com.authy.authy&hl=es_419&gl=US"
                        >
                          <Image
                            src={playLogo}
                            width={20}
                            height={20}
                            alt="playLogo"
                          />
                          Authy{" "}
                        </Link>
                        <Link
                          className="inline-flex items-center gap-1 border-2 rounded-md px-4 py-2"
                          href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=es&gl=US"
                        >
                          <Image
                            src={playLogo}
                            width={20}
                            height={20}
                            alt="playLogo"
                          />
                          Google Authenticator{" "}
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={closeModal}
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-zinc-800 text-base font-medium text-white hover:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-800 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info2FA;

import Link from "next/link";
import Image from "next/image";
import playLogo from "@/images/playLogo.svg";

const Info2FA = ({ closeModal }) => {
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
                  <p className="text-center pt-5">
                    Vas a necesitar una aplicacion de autenticacion, abajo
                    encontraras dos opciones disponibles para Android.
                  </p>
                  <div className="flex justify-around md:flex-row md:gap-0 gap-2 flex-col items-center pt-4">
                    <Link
                      className="inline-flex items-center gap-1 border-2 rounded-md px-4 py-2"
                      href="https://play.google.com/store/apps/details?id=com.authy.authy&hl=es_419&gl=US"
                    >
                      Authy{" "}
                      <Image
                        src={playLogo}
                        width={20}
                        height={20}
                        alt="playLogo"
                      />
                    </Link>
                    <Link
                      className="inline-flex items-center gap-1 border-2 rounded-md px-4 py-2"
                      href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=es&gl=US"
                    >
                      Google Authenticator{" "}
                      <Image
                        src={playLogo}
                        width={20}
                        height={20}
                        alt="playLogo"
                      />
                    </Link>
                  </div>
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

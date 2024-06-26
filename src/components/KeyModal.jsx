import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import lock from "@/images/lock.svg";
import unlock from "@/images/unlock.svg";
import copy from "@/images/copy.svg";
import VerificationTOTP from "@/components/VerificationModal";

const KeyModal = ({
  company,
  companyId,
  accounts,
  closeModal,
  isValidated,
}) => {
  const { data: session } = useSession();
  const [showPassword, setShowPassword] = useState({});
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showAccountsModal, setShowAccountsModal] = useState(true);
  const [message, setMessage] = useState("");
  const [isVerificationValidated, setIsVerificationValidated] =
    useState(isValidated);

  const handleVerificationSuccess = () => {
    setIsVerificationValidated(true);
    setShowAccountsModal(true);
    setShowVerificationModal(false);
    sessionStorage.setItem("isVerificationValidated", "true");
  };

  const toggleShowPassword = (accountId) => {
    if (!session?.user?.twoFactorAuthEnabled) {
      setShowPassword({
        ...showPassword,
        [accountId]: !showPassword[accountId],
      });
    } else {
      if (!isVerificationValidated) {
        setShowVerificationModal(true);
        setShowAccountsModal(false);
      } else {
        setShowPassword({
          ...showPassword,
          [accountId]: !showPassword[accountId],
        });
      }
    }
  };

  const copyToClipboard = (pass) => {
    navigator.clipboard.writeText(pass);
    setMessage({ content: "Texto copiado" });
    setTimeout(() => {
      setMessage({ content: "" });
    }, "2000");
  };

  const router = useRouter();
  const handleNewAccount = (companyId, company) => {
    router.push(
      `/dashboard/forms?company=${encodeURIComponent(
        company
      )}&companyId=${encodeURIComponent(companyId)}`
    );
  };

  const handleEditAccount = (accountId, account, company) => {
    router.push(
      `/dashboard/keys/accounts/edit-account-page?accountId=${encodeURIComponent(
        accountId
      )}&account=${encodeURIComponent(account)}&company=${encodeURIComponent(
        company
      )}`
    );
  };

  const handleDeleteAccount = (company, account, accountId) => {
    router.push(
      `/dashboard/keys/accounts/delete-account-page?accountId=${encodeURIComponent(
        accountId
      )}&account=${encodeURIComponent(account)}&company=${encodeURIComponent(
        company
      )}`
    );
  };
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center pt-32 px-4 pb-20 text-center sm:block sm:p-0">
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
          <div className="px-4 pt-5 text-end">
            <button
              type="button"
              className=" text-gray-200 hover:bg-zinc-900 bg-zinc-800 rounded-lg text-sm w-8 h-8  inline-flex justify-center items-center hover:text-white"
              data-modal-hide="popup-modal"
              onClick={closeModal}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {showVerificationModal && (
            <VerificationTOTP onSuccess={handleVerificationSuccess} />
          )}
          {showAccountsModal && (
            <div className="bg-white px-4 pt-3 pb-6">
              {message.content && (
                <div className="bg-slate-50 p-2 mb-2 rounded-md absolute left-0 bottom-0">
                  {message.content}
                </div>
              )}

              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <h3 className="w-fit text-xl leading-6 font-bold bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent pb-2">
                    {company}
                  </h3>
                  <div>
                    {accounts.map((account) => (
                      <div
                        key={account._id}
                        className="text-gray-900 border-b-2 border-neutral-700 p-2"
                      >
                        <div className="flex justify-between items-end text-left ">
                          <div className="w-full">
                            <div>Usuario: {account.name}</div>
                            <div className="flex justify-between items-end">
                              <p className="break-all">
                                Contraseña:{" "}
                                {showPassword[account._id]
                                  ? account.password
                                  : account.password.replace(/./g, "*")}
                              </p>
                            </div>
                          </div>
                          <div className="flex justify-end items-end gap-2 pt-3 pb-1">
                            <button
                              onClick={() => toggleShowPassword(account._id)}
                              className="text-gray-600 hover:scale-110 duration-200 hover:cursor-pointer min-w-fit"
                            >
                              {showPassword[account._id] ? (
                                <Image
                                  title="Ocultar"
                                  src={unlock}
                                  width={30}
                                  height={30}
                                  alt="ocultar"
                                />
                              ) : (
                                <Image
                                  title="Mostrar"
                                  src={lock}
                                  width={30}
                                  height={30}
                                  alt="mostrar"
                                />
                              )}
                            </button>
                            <button
                              onClick={() => copyToClipboard(account.password)}
                              className="text-gray-600 hover:scale-110 duration-200 hover:cursor-pointer min-w-fit py-1 disabled:cursor-not-allowed disabled:opacity-50"
                              disabled={
                                session.user.twoFactorAuthEnabled &&
                                !isVerificationValidated
                              }
                            >
                              <Image
                                src={copy}
                                width={20}
                                height={20}
                                alt="copy"
                                title="Copiar"
                              />
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-end items-end gap-2 pt-3 pb-1">
                          {/* <Link
                            href={`/dashboard/keys/${encodeURIComponent(
                              account._id
                            )}`}
                            className=" text-gray-600 hover:scale-110 duration-200 hover:cursor-pointer"
                          >
                            <svg
                              className="w-6 stroke-green-700"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                          </Link> */}
                          <button
                            onClick={() =>
                              handleEditAccount(
                                account._id,
                                account.name,
                                company
                              )
                            }
                            className="flex gap-1 rounded-md bg-green-500 py-1 px-2 hover:scale-110 duration-200 hover:cursor-pointer"
                          >
                            Editar
                            <svg
                              className="w-6 stroke-green-900"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                          </button>
                          <button
                            onClick={() =>
                              handleDeleteAccount(
                                company,
                                account.name,
                                account._id
                              )
                            }
                            className="flex gap-1 rounded-md bg-red-500 py-1 px-2 hover:scale-110 duration-200 hover:cursor-pointer"
                          >
                            Eliminar
                            <svg
                              className="w-6 stroke-red-900"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                              <line x1="10" y1="11" x2="10" y2="17"></line>
                              <line x1="14" y1="11" x2="14" y2="17"></line>
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="text-end pt-5">
                    <button
                      onClick={() => handleNewAccount(companyId, company)}
                      title="Add New"
                      className="group cursor-pointer outline-none hover:rotate-90 duration-300"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="w-8 stroke-pink-400 fill-none group-hover:fill-pink-600 group-active:stroke-pink-200 group-active:fill-pink-600 group-active:duration-0 duration-300"
                        strokeWidth="1.5"
                      >
                        <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"></path>
                        <path d="M8 12H16"></path>
                        <path d="M12 16V8"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KeyModal;

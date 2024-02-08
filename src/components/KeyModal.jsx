import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const KeyModal = ({ company, companyId, accounts, closeModal }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const handleNewAccount = (companyId, company) => {
    router.push(
      `/dashboard/forms?company=${encodeURIComponent(
        company
      )}&companyId=${encodeURIComponent(companyId)}`
    );
  };

  const handleEditAccount = (accountId) => {
    router.push(`/dashboard/keys/${encodeURIComponent(accountId)}`);
  };

  const handleDeleteAccount = (company, account, accountId) => {
    router.push(
      `/dashboard/keys/delete-account-page?accountId=${encodeURIComponent(
        accountId
      )}&account=${encodeURIComponent(account)}&company=${encodeURIComponent(
        company
      )}`
    );
  };
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center  pt-56 px-4 pb-20 text-center sm:block sm:p-0">
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
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {company}
                </h3>
                <div>
                  {accounts.map((account) => (
                    <div
                      key={account._id}
                      className="text-gray-900 border-b-2 border-neutral-700 p-2"
                    >
                      <div className="flex justify-between items-center text-left">
                        <div>
                          <div>Usuario: {account.name}</div>
                          <div>Contraseña: {account.password}</div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditAccount(account._id)}
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
                          </button>
                          <button
                            onClick={() =>
                              handleDeleteAccount(
                                company,
                                account.name,
                                account._id
                              )
                            }
                            className=" text-gray-600 hover:scale-110 duration-200 hover:cursor-pointer"
                          >
                            <svg
                              className="w-6 stroke-red-700"
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
                    </div>
                  ))}
                </div>
                <div className="text-end pt-5">
                  <button
                    onClick={() => handleNewAccount(companyId, company)}
                    className=" text-gray-600 hover:scale-110 duration-200 hover:cursor-pointer"
                  >
                    new
                  </button>
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

export default KeyModal;

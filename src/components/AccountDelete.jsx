// "use client";

// import { useRouter, useSearchParams } from "next/navigation";
// import { useSession } from "next-auth/react";
// import { useState } from "react";
// import axios from "axios";

// return (
//   <div className="flex flex-col gap-y-10 items-center justify-center mt-28">
//     {error && (
//       <div className="bg-red-400 text-white p-2 mb-2 text-center rounded-md w-6/12">
//         {error}
//       </div>
//     )}
//     <div className="text-center text-2xl">
//       <h1>
//         Vamos a eliminar la cuenta <strong>{searchAccountUser}</strong>
//       </h1>
//       <p>
//         de <strong>{searchCompany} </strong> esta seguro?
//       </p>
//     </div>
//     <p>esta accion no la podemos revertir!</p>
//     <div className="flex  items-center gap-4 w-80 text-sm md:py-6 py-10">
//       <button
//         onClick={handleCancel}
//         className="flex-1 rounded-lg border border-indigo-500 bg-indigo-500 py-2.5 md:py-1.5 text-center text-sm font-semibold text-white shadow-sm transition-all hover:border-indigo-700 hover:bg-indigo-700 focus:ring focus:ring-indigo-200 disabled:cursor-not-allowed disabled:border-indigo-500 disabled:bg-indigo-500 disabled:opacity-80"
//       >
//         Cancelar
//       </button>
//       <button
//         className="flex-1 rounded-lg border border-red-500 bg-red-500 py-2.5 md:py-1.5 text-center text-sm font-semibold text-white shadow-sm transition-all hover:border-red-700 hover:bg-red-700 focus:ring focus:ring-red-200 disabled:cursor-not-allowed disabled:border-red-500 disabled:bg-red-500 disabled:opacity-80"
//         onClick={deleteAccount}
//       >
//         Eliminar
//       </button>
//     </div>
//   </div>
// );

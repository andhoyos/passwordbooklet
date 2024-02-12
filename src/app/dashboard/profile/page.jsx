"use client";
import { useSession, signOut } from "next-auth/react";

function ProfilePage() {
  const { data: session, status } = useSession();

  return (
    <div className=" flex flex-col gap-y-10 items-center justify-center">
      <h1 className="font-bold text-3xl">Profile</h1>

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

export default ProfilePage;

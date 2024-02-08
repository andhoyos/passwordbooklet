import Link from "next/link";
import Image from "next/image";
import { getServerSession } from "next-auth";
import logo from "./logo.png";

async function Navbar() {
  const session = await getServerSession();

  return (
    <nav className="bg-slate-50 py-4 px-8">
      <div className="container mx-auto flex justify-between">
        <Link
          href="/"
          className="z-10 inline-flex items-center gap-2 text-lg font-bold md:text-2xl "
        >
          <Image src={logo} width={40} height={40} alt="logo" />
          <h1 className="font-bold text-2x1 bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent">
            PasswordBooklet
          </h1>
        </Link>

        <ul className="flex gap-x-2">
          {session ? (
            <>
              <li className="px-3 py-1">
                <Link href="/dashboard/profile">{session.user.email}</Link>
              </li>
            </>
          ) : (
            <>
              <li className="rounded-lg border border-indigo-500 bg-indigo-500 text-white shadow-sm transition-all hover:border-indigo-700 hover:bg-indigo-700 focus:ring focus:ring-indigo-200 disabled:cursor-not-allowed disabled:border-indigo-500 disabled:bg-indigo-500 disabled:opacity-80 px-4 py-2">
                <Link href="/login">Login</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

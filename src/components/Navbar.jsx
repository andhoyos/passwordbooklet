import Link from "next/link";
import Image from "next/image";
import { getServerSession } from "next-auth";
import logo from "./logo.png";
import user from "./user.svg";

async function Navbar() {
  const session = await getServerSession();

  return (
    <nav className="bg-slate-50 py-4 px-8">
      <div className="container mx-auto flex justify-between">
        <Link
          href="/"
          className="z-10 inline-flex items-center gap-2  font-bold text-2xl md:text-3xl "
        >
          <Image src={logo} width={40} height={40} alt="logo" />
          <h1 className="font-bold  bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent">
            PasswordBooklet
          </h1>
        </Link>

        <ul className="flex gap-x-2">
          {session ? (
            <>
              <li className="px-3 py-1 pointer">
                <Link href="/dashboard/profile">
                  <Image src={user} width={40} height={40} alt="user" />
                </Link>
              </li>
            </>
          ) : (
            <></>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

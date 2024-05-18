"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import logo from "@/images/logo.png";
import user from "@/images/user.svg";

export default function Navbar() {
  const { data: session, status } = useSession();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".menu")) {
        setIsOpen(false);
      }
    });
  }, [isOpen]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-slate-50 py-4 md:px-8 px-4">
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
        {status === "authenticated" ? (
          <div className="relative menu">
            <button
              onClick={toggleDropdown}
              className="flex text-sm bg-slate-500 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              type="button"
            >
              <Image src={user} width={40} height={40} alt="user" />
            </button>
            {isOpen && (
              <div className=" absolute right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                  <div>{session.user.username}</div>
                  <div className="font-medium truncate">
                    {session.user.email}
                  </div>
                </div>
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                  <li>
                    <Link
                      href="/dashboard/profile"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={handleItemClick}
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <details>
                      <summary className="cursor-pointer px-4 py-2">
                        <span>Mis Claves</span>
                      </summary>
                      <Link
                        href="/dashboard/keys"
                        className="block pl-8 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={handleItemClick}
                      >
                        Ver Todas
                      </Link>
                      <Link
                        href="/dashboard/forms"
                        className="block pl-8 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={handleItemClick}
                      >
                        Agregar
                      </Link>
                    </details>
                  </li>
                  <li>
                    <Link
                      href="/dashboard/twoFactorAuth"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={handleItemClick}
                    >
                      Autenticación 2FA
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard/testimonials"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={handleItemClick}
                    >
                      Calificar
                    </Link>
                  </li>
                </ul>
                <div className="py-2">
                  <p
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer"
                    onClick={() => {
                      sessionStorage.removeItem("isVerificationValidated");
                      signOut();
                    }}
                  >
                    Cerrar Sesion
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="relative menu">
            <button
              onClick={toggleDropdown}
              className="flex text-sm bg-slate-500 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              type="button"
            >
              <svg
                className="w-10"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14M12 5l7 7m-7 7l7-7"
                />
              </svg>
            </button>
            <div
              className={`absolute right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}
              style={{ display: isOpen ? "block" : "none" }}
            >
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                <li>
                  <Link
                    href="/login"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={handleItemClick}
                  >
                    Iniciar Sesion
                  </Link>
                </li>
                <li>
                  <Link
                    href="/register"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={handleItemClick}
                  >
                    Crear Cuenta
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

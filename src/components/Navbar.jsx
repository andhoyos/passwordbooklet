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
                      className="flex gap-1 items-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={handleItemClick}
                    >
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="15" height="15" fill="none" />
                        <rect
                          x="1"
                          y="1"
                          width="5"
                          height="5"
                          rx="1"
                          ry="1"
                          fill="#cccccc"
                        />
                        <rect
                          x="9"
                          y="1"
                          width="5"
                          height="2.5"
                          rx="1"
                          ry="1"
                          fill="#cccccc"
                        />
                        <rect
                          x="9"
                          y="6.5"
                          width="5"
                          height="5"
                          rx="1"
                          ry="1"
                          fill="#cccccc"
                        />
                        <rect
                          x="1"
                          y="9"
                          width="5"
                          height="2.5"
                          rx="1"
                          ry="1"
                          fill="#cccccc"
                        />
                      </svg>
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
                        className="flex gap-1 items-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={handleItemClick}
                      >
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 5C7 5 2.73 8.11 1 12C2.73 15.89 7 19 12 19C17 19 21.27 15.89 23 12C21.27 8.11 17 5 12 5ZM12 17C8.69 17 6 14.31 6 11C6 7.69 8.69 5 12 5C15.31 5 18 7.69 18 11C18 14.31 15.31 17 12 17ZM12 7C9.79 7 8 8.79 8 11C8 13.21 9.79 15 12 15C14.21 15 16 13.21 16 11C16 8.79 14.21 7 12 7ZM12 13C10.9 13 10 12.1 10 11C10 9.9 10.9 9 12 9C13.1 9 14 9.9 14 11C14 12.1 13.1 13 12 13Z"
                            fill="#cccccc"
                          />
                        </svg>
                        Ver Todas
                      </Link>
                      <Link
                        href="/dashboard/forms"
                        className="flex gap-1 items-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={handleItemClick}
                      >
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M19 11H13V5C13 4.45 12.55 4 12 4C11.45 4 11 4.45 11 5V11H5C4.45 11 4 11.45 4 12C4 12.55 4.45 13 5 13H11V19C11 19.55 11.45 20 12 20C12.55 20 13 19.55 13 19V13H19C19.55 13 20 12.55 20 12C20 11.45 19.55 11 19 11Z"
                            fill="#cccccc"
                          />
                        </svg>
                        Agregar
                      </Link>
                    </details>
                  </li>
                  <li>
                    <Link
                      href="/dashboard/twoFactorAuth"
                      className="flex gap-1 items-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={handleItemClick}
                    >
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 2C9.79 2 8 3.79 8 6V9H6C5.45 9 5 9.45 5 10V20C5 20.55 5.45 21 6 21H18C18.55 21 19 20.55 19 20V10C19 9.45 18.55 9 18 9H16V6C16 3.79 14.21 2 12 2ZM10 6C10 4.9 10.9 4 12 4C13.1 4 14 4.9 14 6V9H10V6ZM7 11H17V19H7V11ZM12 13C11.45 13 11 13.45 11 14V16C11 16.55 11.45 17 12 17C12.55 17 13 16.55 13 16V14C13 13.45 12.55 13 12 13Z"
                          fill="#cccccc"
                        />
                      </svg>
                      Autenticación 2FA
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard/testimonials"
                      className="flex gap-1 items-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={handleItemClick}
                    >
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 2L14.09 8.26L20 9.27L15.64 13.14L16.91 19.02L12 16.24L7.09 19.02L8.36 13.14L4 9.27L9.91 8.26L12 2Z"
                          fill="#cccccc"
                        />
                      </svg>
                      Calificar
                    </Link>
                  </li>
                </ul>
                <div className="py-2">
                  <p
                    className="flex gap-1 items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer"
                    onClick={() => {
                      sessionStorage.removeItem("isVerificationValidated");
                      signOut();
                    }}
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 2H14V4H10V2ZM4 12L10 6V10H14V14H10V18L4 12ZM10 20H14V22H10V20ZM16 2H20V22H16V20H18V4H16V2Z"
                        fill="#cccccc"
                      />
                    </svg>
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
                    className="flex gap-1 items-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={handleItemClick}
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 20H8V4H10M21 12L17 16V13H13V11H17V8L21 12ZM10 17H3V7H10V17Z"
                        fill="#cccccc"
                      />
                    </svg>
                    Iniciar Sesion
                  </Link>
                </li>
                <li>
                  <Link
                    href="/register"
                    className="flex gap-1 items-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={handleItemClick}
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 11H15V13H12V16H10V13H7V11H10V8H12V11ZM12 2C7.03 2 3 6.03 3 11C3 15.97 7.03 20 12 20C16.97 20 21 15.97 21 11C21 6.03 16.97 2 12 2ZM12 18C8.13 18 5 14.87 5 11C5 7.13 8.13 4 12 4C15.87 4 19 7.13 19 11C19 14.87 15.87 18 12 18Z"
                        fill="#cccccc"
                      />
                    </svg>
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

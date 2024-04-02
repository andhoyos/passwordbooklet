"use client";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import SessionClosed from "@/components/InfoModalSession";

function LoginPage() {
  const [message, setMessage] = useState({ type: "", content: "" });
  const [logoutMessage, setLogoutMessage] = useState("");
  const [showModalSession, setShowModalSession] = useState(false);
  const router = useRouter();

  const closeModal = () => {
    localStorage.removeItem("logoutMessage");
    setShowModalSession(false);
    setLogoutMessage("");
  };

  const bgError = "bg-red-400";
  const bgSuccess = "bg-green-400";

  useEffect(() => {
    const sessionMessage = localStorage.getItem("logoutMessage");
    if (sessionMessage) {
      setLogoutMessage(sessionMessage);
      setShowModalSession(true);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const res = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    });

    if (res.error) {
      setMessage({ type: "error", content: res.error });
    }

    if (res.ok) {
      router.push("/dashboard/keys");
    }
  };

  return (
    <div className="flex justify-center items-center md:mt-20 mt-24">
      <form
        onSubmit={handleSubmit}
        className="bg-white  text-slate-500 px-8 py-10 max-w-md  w-96 mx-auto shadow-lg  rounded-lg"
      >
        {message.content && (
          <div
            className={`${
              message.type === "error" ? `${bgError}` : `${bgSuccess}`
            } text-white p-2 mb-2 rounded-md`}
          >
            {message.content}
          </div>
        )}
        <h1 className="md:text-3xl text-2xl font-bold mb-7">Iniciar sesión</h1>

        <label className="text-slate-400">Username:</label>
        <input
          type="text"
          placeholder="Username"
          className="bg-slate-100 px-4 py-2 block mb-2 w-full rounded-md"
          name="username"
          required
        />

        <label className=" text-slate-400">Password:</label>
        <input
          type="password"
          placeholder="*******"
          className="bg-slate-100 px-4 py-2 block mb-2 w-full rounded-md"
          name="password"
          required
        />
        <p className="text-right">
          <a className="font-semibold" href="/forgot-password">
            Has olvidado tu contraseña ?
          </a>
        </p>

        <button className="rounded-lg border border-indigo-500 bg-indigo-500 text-white font-semibold shadow-sm transition-all hover:border-indigo-700 hover:bg-indigo-700 focus:ring focus:ring-indigo-200 disabled:cursor-not-allowed disabled:border-indigo-500 disabled:bg-indigo-500 disabled:opacity-80 px-4 py-2 block w-full mt-4">
          Ingresar
        </button>

        <p className="pt-5 px-3">
          ¿No tienes una cuenta?
          <a className="font-semibold text-indigo-500  px-3" href="/register">
            Crear Cuenta
          </a>
        </p>
      </form>
      {showModalSession && (
        <SessionClosed contentMessage={logoutMessage} closeModal={closeModal} />
      )}
    </div>
  );
}

export default LoginPage;

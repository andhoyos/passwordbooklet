import responsive from "@/images/responsive.svg";
import secure from "@/images/secure.svg";
import setting from "@/images/settings.svg";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-20">
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4 text-slate-500">Bienvenido a PasswordBooklet</h1>
        <p className="text-lg px-5">Guarda y administra de forma segura tus cuentas y contraseñas</p>
      </section>

      <section className="flex flex-wrap justify-center  w-full gap-8 mb-16">
        <div className="bg-white text-slate-500 px-8 py-10 max-w-md  w-96 md:mx-auto mx-3 shadow-lg  rounded-lg text-center">
        <Image src={secure} width={80} height={80} alt="Secure" className=" mx-auto mb-4"/>
           
          <h2 className="text-xl font-semibold mb-2">Gestión segura de contraseñas</h2>
          <p className="text-base">Almacena tus contraseñas de forma segura y protegida.</p>
        </div>
        <div className="bg-white text-slate-500 px-8 py-10 max-w-md  w-96 md:mx-auto mx-3 shadow-lg  rounded-lg text-center">
        <Image src={responsive} width={80} height={80} alt="Devices" className=" mx-auto mb-4"/>
          <h2 className="text-xl font-semibold mb-2">Acceso desde cualquier dispositivo</h2>
          <p className="text-base">Accede a tus cuentas desde tu computador o dispositivo movil.</p>
        </div>
        <div className="bg-white text-slate-500 px-8 py-10 max-w-md  w-96 md:mx-auto mx-3 shadow-lg  rounded-lg text-center">
        <Image src={setting} width={80} height={80} alt="Settings" className=" mx-auto mb-4"/>
          <h2 className="text-xl font-semibold mb-2">Control total sobre tus claves</h2>
          <p className="text-base">Administra y organiza tus claves como quieras.</p>
        </div>
      </section>

      <section className="text-center mb-12">
        <h2 className="text-2xl font-bold mb-4 px-5">¿Por qué elegir PasswordBooklet?</h2>
        <p className="text-lg px-5">Descubre cómo nuestros usuarios están protegiendo sus cuentas con PasswordBooklet.</p>
        {/* Aquí testimonios de usuarios */}
        <p className="text-lg pt-2 text-indigo-300">Coming soon...</p>
      </section>

      <div className="flex items-center gap-4 w-80 text-sm ">
        <a
          href="/register"
          className="flex-1 rounded-lg border border-indigo-500 bg-indigo-500 py-2.5 md:py-1.5 text-center text-sm font-semibold text-white shadow-sm transition-all hover:border-indigo-700 hover:bg-indigo-700 focus:ring focus:ring-indigo-200 disabled:cursor-not-allowed disabled:border-indigo-500 disabled:bg-indigo-500 disabled:opacity-80"
          
          rel="noopener noreferrer"
        >Crear Cuenta
        
        </a>

        <a
          href="/login"
          className="flex-1 rounded-lg border border-indigo-500 bg-transparent  py-2.5 md:py-1.5 text-center text-sm font-semibold text-indigo-500 shadow-sm transition-all hover:border-indigo-700 hover:bg-indigo-50 focus:ring focus:ring-indigo-200 disabled:cursor-not-allowed disabled:border-indigo-300 disabled:bg-indigo-300"
          
          rel="noopener noreferrer"
        >Iniciar Sesion
        </a>
      </div>
    </main>
    
  );
}

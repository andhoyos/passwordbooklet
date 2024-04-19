import SectionIndex from "@/components/SectionInfoIndex"

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4 text-slate-500">Bienvenido a PasswordBooklet</h1>
        <p className="text-lg px-5">Guarda y administra de forma segura tus cuentas y contraseñas</p>
      </section>
      <SectionIndex/>

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

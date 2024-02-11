export default function Home() {

  return (
    <main className="flex  h-96 flex-col items-center md:justify-between justify-around p-10 md:p-24 mt-16 md:m-auto ">
      <div className="max-w-5xl w-full items-center justify-center  text-sm lg:flex ">
        <div className="flex h-48 w-full flex-col justify-center text-center lg:static lg:h-auto lg:w-auto lg:bg-none">
          <h1 className=" mb-2 text-xl md:text-3xl  font-semibold">Bienvenido a Mi Libreta de Claves</h1>
          <p className=" mb-2 text-base md:text-xl  ">Guarda de forma segura tus cuentas y contraseñas</p>
        </div>
        
      </div>


      <div className="flex items-center gap-4 w-80 text-sm md:py-14 py-20">
        <a
          href="/register"
          className="flex-1 rounded-lg border border-indigo-500 bg-indigo-500 py-2.5 md:py-1.5 text-center text-sm font-semibold text-white shadow-sm transition-all hover:border-indigo-700 hover:bg-indigo-700 focus:ring focus:ring-indigo-200 disabled:cursor-not-allowed disabled:border-indigo-500 disabled:bg-indigo-500 disabled:opacity-80"
          
          rel="noopener noreferrer"
        >Registro
        
        </a>

        <a
          href="/login"
          className="flex-1 rounded-lg border border-indigo-500 bg-transparent  py-2.5 md:py-1.5 text-center text-sm font-semibold text-indigo-500 shadow-sm transition-all hover:border-indigo-700 hover:bg-indigo-50 focus:ring focus:ring-indigo-200 disabled:cursor-not-allowed disabled:border-indigo-300 disabled:bg-indigo-300"
          
          rel="noopener noreferrer"
        >Login
        </a>

      </div>
    </main>
  )
}

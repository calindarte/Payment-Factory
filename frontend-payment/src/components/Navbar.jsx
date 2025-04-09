import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const inicialDarkMode= localStorage.getItem('theme') === 'dark';


const Navbar = () => {
  const [darkMode, setDarkMode] = useState(inicialDarkMode)


  useEffect(()=>{
    if(darkMode){
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme','dark');
    }else{
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme','light');
    }
  },[darkMode])

  return (
    <nav className="bg-blue-500 dark:bg-zinc-800  text-white py-3 flex justify-between items-center px-20">
      <h1 className="font-bold text-lg">💳 Gestor de Pagos</h1>
      <div className="flex items-center gap-5 ">
        <Link to="/" className="hover:underline">
          Inicio
        </Link>
        <Link to="/gestionar" className="hover:underline">
          Gestionar Pagos
        </Link>
          <button onClick={() => setDarkMode(!darkMode)} className="flex  ">
            {darkMode? (
                <span className="material-symbols-outlined">light_mode</span>
            ) : (
                <span className="material-symbols-outlined">dark_mode</span>
            )}
          </button>
        </div>
    </nav>
  );
};

export default Navbar;

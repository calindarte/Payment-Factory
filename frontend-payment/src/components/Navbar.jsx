import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpentheme, setIsOpenTheme] = useState(true);

  return (
    <nav className="bg-blue-500 text-white py-3 flex justify-between items-center px-20">
      <h1 className="font-bold text-lg">💳 Gestor de Pagos</h1>
      <div className="flex items-center gap-5 ">
        <Link to="/" className="hover:underline">
          Inicio
        </Link>
        <Link to="/gestionar" className="hover:underline">
          Gestionar Pagos
        </Link>
          <button onClick={() => setIsOpenTheme(!isOpentheme)} className="flex ">
            {isOpentheme ? (
              <span className="material-symbols-outlined">dark_mode</span>
            ) : (
              <span className="material-symbols-outlined">light_mode</span>
            )}
          </button>
        </div>
    </nav>
  );
};

export default Navbar;

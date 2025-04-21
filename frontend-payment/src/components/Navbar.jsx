import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const inicialDarkMode = localStorage.getItem("theme") === "dark";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(inicialDarkMode);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  useEffect(() => {
    // Aquí simulas obtener notificaciones desde el backend
    const fetchNotifications = async () => {
      try {
        const res = await fetch("http://localhost:3000/notification"); // ajusta tu ruta
        const data = await res.json();
        setNotifications(data || []);
      } catch (error) {
        console.error("Error al obtener notificaciones:", error);
      }
    };

    if (showNotifications) {
      fetchNotifications();
    }
  }, [showNotifications]);

  console.log(notifications)
  return (
    <nav className="bg-blue-500 dark:bg-zinc-800 text-white py-3 flex justify-between items-center px-20 relative">
      <h1 className="font-bold text-lg">💳 Gestor de Pagos</h1>

      <div className="flex items-center gap-5 relative">
        <Link to="/" className="hover:underline">
          Inicio
        </Link>
        <Link to="/gestionar" className="hover:underline">
          Gestionar Pagos
        </Link>
        <button onClick={() => setDarkMode(!darkMode)} className="flex">
          {darkMode ? (
            <span className="material-symbols-outlined">light_mode</span>
          ) : (
            <span className="material-symbols-outlined">dark_mode</span>
          )}
        </button>

        <div className="relative">
  <button
    onClick={() => setShowNotifications(!showNotifications)}
    className="relative"
  >
    <i className="fa fa-bell text-xl"></i>

    {notifications.length > 0 && (
      <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
        {notifications.length}
      </span>
    )}
  </button>

  {showNotifications && (
    <div className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto bg-white text-black dark:bg-zinc-700 dark:text-white border rounded-lg shadow-lg z-50">
      <div className="p-4 font-semibold border-b dark:border-zinc-600">
        📬 Notificaciones
      </div>
      {notifications.length === 0 ? (
        <div className="p-4 text-sm text-gray-500 dark:text-gray-300">
          No hay notificaciones.
        </div>
      ) : (
        notifications.map((notif, index) => (
          <div
            key={index}
            className="p-3 border-b hover:bg-gray-100 dark:hover:bg-zinc-600 text-sm"
          >
            <div className="font-semibold">{notif.type}</div>
            <div>{notif.message || notif.body ||  notif.title}</div>
            <div className="text-xs text-gray-500 mt-1">
              {new Date().toLocaleString()}
            </div>
          </div>
        ))
      )}
    </div>
  )}
</div>

      </div>
    </nav>
  );
};

export default Navbar;

import { useState } from "react";
import {
  FaCar,
  FaWalking,
  FaBicycle,
  FaBus,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

const API_BASE_URL = "http://localhost:4000/api";

const Home = () => {
  const [route, setRoute] = useState([]);
  const [strategy, setStrategy] = useState("car");
  const [origin, setOrigin] = useState("Ciudad A");
  const [destination, setDestination] = useState("Ciudad B");

  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);

  const fetchRoute = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/route`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ origin, destination, mode: strategy }),
      });

      const data = await res.json();

      if (data.route) {
        setRoute(data.route);

        // Simulación de distancia y duración según el modo
        let simulatedDistance = 0; // km (puedes ajustar esto dinámicamente si quieres)
        let simulatedDuration = 0;

        switch (strategy) {
          case "car":
            simulatedDuration = 12;
            simulatedDistance = 5.8;
            break;
          case "walk":
            simulatedDuration = 52;
            simulatedDistance = 4.2;
            break;
          case "bike":
            simulatedDuration = 22;
            simulatedDistance = 5.1;
            break;
          case "public":
            simulatedDuration = 25;
            simulatedDistance = 6.5;
            break;
          default:
            simulatedDuration = 15;
        }

        setDistance(`${simulatedDistance} km`);
        setDuration(`${simulatedDuration} minutos`);
      } else {
        console.error(data.error);
      }
    } catch (err) {
      console.error("Error al obtener la ruta", err);
    }
  };

  const transportButtons = [
    {
      id: "car",
      icon: <FaCar />,
      label: "Carro",
      desc: "Rutas para viajes en carro, utilizando carreteras principales.",
    },
    {
      id: "walk",
      icon: <FaWalking />,
      label: "Caminando",
      desc: "Rutas para desplazamiento a pie, evitando carreteras.",
    },
    {
      id: "bike",
      icon: <FaBicycle />,
      label: "Bicicleta",
      desc: "Vías ciclables o caminos secundarios.",
    },
    {
      id: "public",
      icon: <FaBus />,
      label: "Transporte Público",
      desc: "Conexiones mediante buses o metro.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="mb-6">
        <h1 className="text-4xl font-bold flex items-center justify-center gap-2">
          <span className="flex  items-center gap-2">
            {" "}
            <FaMapMarkerAlt className="text-red-600" />
            Aplicación de Navegación{" "}
          </span>
        </h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Panel Izquierdo */}
        <div className="space-y-6">
          <div className="bg-white p-5 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Planificar Ruta</h2>
            <p className="text-sm text-gray-500 mb-4">
              Selecciona el tipo de ruta y tu destino
            </p>
            <input
              type="text"
              className="w-full mb-3 p-2 border rounded text-sm"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              placeholder="Origen"
            />
            <input
              type="text"
              className="w-full mb-4 p-2 border rounded text-sm"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Destino"
            />
            <button
              onClick={fetchRoute}
              className="w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-800 transition"
            >
              Calcular Ruta
            </button>
          </div>

          <div className="bg-white p-5 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Modo de Transporte</h2>
            <p className="text-sm text-gray-500 mb-4">
              Elige cómo quieres llegar a tu destino
            </p>
            <div className="flex justify-between items-center gap-2 mb-3">
              {transportButtons.map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => setStrategy(btn.id)}
                  className={`p-2 border rounded w-10 h-10 flex items-center justify-center text-lg transition ${
                    strategy === btn.id
                      ? "bg-gray-800 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {btn.icon}
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-600">
              {transportButtons.find((b) => b.id === strategy)?.desc}
            </p>
          </div>
        </div>

        {/* Mapa o Resultado */}
        <div className="md:col-span-2 bg-white p-6 rounded shadow flex items-center justify-center min-h-[300px] text-center">
          {route.length === 0 ? (
            <div>
              <p className="text-3xl mb-2">🧭</p>
              <h3 className="text-lg font-semibold mb-2">Mapa de Navegación</h3>
              <p className="text-sm text-gray-500">
                Introduce un destino y selecciona un modo de transporte para ver
                la ruta en el mapa.
              </p>
            </div>
          ) : (
            <div className="text-left w-full">
              {route.length > 0 && (
                <div className="mx-20">
                  <h2 className="text-xl font-bold flex items-center justify-center gap-2 mb-14">
                    Detalles de la Ruta Generada
                  </h2>
                  <p className="flex justify-between border-b pb-1 text-sm text-gray-700">
                    <span className="flex  items-center gap-2">
                      {" "}
                      <FaMapMarkerAlt className="text-red-600" />
                      Distancia
                    </span>
                    <span className="font-semibold">{distance}</span>
                  </p>
                  <p className="flex justify-between  border-b pb-3 text-sm text-gray-700">
                    <span className="flex  items-center gap-2">
                      <FaClock className="text-gray-600 " />
                      Duración
                    </span>
                    <span className="font-semibold">{duration}</span>
                  </p>
                  <div className="pt-2">
                    <p className="font-medium mb-1">Indicaciones:</p>
                    <ol className="list-decimal ml-5 text-sm space-y-1 text-gray-800">
                      {route.map((step, idx) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Home;

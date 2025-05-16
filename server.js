// server.js
const express = require('express');
const cors = require('cors')

const CarRouteStrategy = require("./src/strategies/CarRouteStrategy");
const WalkingRouteStrategy = require("./src/strategies/WalkingRouteStrategy");
const PublicTransportRouteStrategy = require("./src/strategies/PublicTransportRouteStrategy");
const RoutePlanner = require("./src/context/RoutePlanner");
const Bicycle = require('./src/strategies/Bicycle');

const app = express();
app.use(cors())
app.use(express.json());

app.post("/api/route", (req, res) => {
  const { origin, destination, mode } = req.body;
  let strategy;

  switch (mode) {
    case "car":
      strategy = new CarRouteStrategy();
      break;
    case "walk":
      strategy = new WalkingRouteStrategy();
      break;
    case "bike":
      strategy = new Bicycle();
      break;
    case "public":
      strategy = new PublicTransportRouteStrategy();
      break;
    default:
      return res.status(400).json({ error: "Modo no soportado" });
  }

  const planner = new RoutePlanner(strategy);
  const route = planner.generateRoute(origin, destination);
  res.json({ route });
});

app.listen(4000, () => {
  console.log("Servidor corriendo en http://localhost:4000");
})
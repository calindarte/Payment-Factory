const RouteStrategy = require("./RouteStrategy");

class Bicycle extends RouteStrategy {
  createRoute(origin, destination) {
    return [`Ruta en Bicicleta desde ${origin} hasta ${destination}`];
  }
}

module.exports = Bicycle;
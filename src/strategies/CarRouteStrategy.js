const RouteStrategy = require("./RouteStrategy");

class CarRouteStrategy extends RouteStrategy {
  createRoute(origin, destination) {
    return [`Ruta en carro desde ${origin} hasta ${destination}`];
  }
}

module.exports = CarRouteStrategy;
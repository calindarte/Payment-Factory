const RouteStrategy = require("./RouteStrategy");

class PublicTransportRouteStrategy extends RouteStrategy {
  createRoute(origin, destination) {
    return [`Ruta en transporte público desde ${origin} hasta ${destination}`];
  }
}

module.exports = PublicTransportRouteStrategy;
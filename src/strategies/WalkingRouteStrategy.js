const RouteStrategy = require("./RouteStrategy");

class WalkingRouteStrategy extends RouteStrategy {
  createRoute(origin, destination) {
    return [`Ruta a pie desde ${origin} hasta ${destination}`];
  }
}

module.exports = WalkingRouteStrategy;
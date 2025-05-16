class RouteStrategy {
  createRoute(origin, destination) {
    throw new Error("Este método debe ser implementado por la subclase");
  }
}

module.exports = RouteStrategy;

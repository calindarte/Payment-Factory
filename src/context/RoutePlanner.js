class RoutePlanner {
  constructor(strategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  generateRoute(origin, destination) {
    return this.strategy.createRoute(origin, destination);
  }
}

module.exports = RoutePlanner;
// Simple input provider abstraction. In real use this could read
// from sensors, CSV, a database, or an HTTP API.

class InputData {
  constructor(seed = null) {
    this.seed = seed;
  }

  // Returns array of { id, totalSpots?, openSpots? }
  async fetch() {
    if (Array.isArray(this.seed)) return this.seed;
    // Demo payload: small fluctuations
    return [
      { id: 'A', openSpots: 42 },
      { id: 'B', openSpots: 18 },
      { id: 'C', openSpots: 3 },
    ];
  }
}

module.exports = { InputData };


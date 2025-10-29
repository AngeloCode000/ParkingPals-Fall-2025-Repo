const { ParkingLot } = require('./ParkingLot');

class ParkingLotData {
  constructor() {
    this.lots = new Map(); // id -> ParkingLot
  }

  addLot(lot) {
    const instance = lot instanceof ParkingLot ? lot : new ParkingLot(lot);
    this.lots.set(instance.id, instance);
    return instance;
  }

  removeLot(id) {
    return this.lots.delete(id);
  }

  getLot(id) {
    return this.lots.get(id);
  }

  listLots() {
    return Array.from(this.lots.values());
  }

  summary() {
    const lots = this.listLots();
    const totalSpots = lots.reduce((s, l) => s + l.totalSpots, 0);
    const openSpots = lots.reduce((s, l) => s + l.openSpots, 0);
    const filledSpots = lots.reduce((s, l) => s + l.filledSpots, 0);
    return { totalSpots, openSpots, filledSpots, lots: lots.map((l) => ({ id: l.id, name: l.name, openSpots: l.openSpots, totalSpots: l.totalSpots })) };
  }
}

module.exports = { ParkingLotData };


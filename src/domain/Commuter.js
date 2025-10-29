const { User } = require('./User');

class Commuter extends User {
  constructor({ name, campusID, licensePlate = '', parkingPass = [], lot = [] }) {
    super(name, campusID, false);
    this.licensePlate = licensePlate;
    this.parkingPass = Array.isArray(parkingPass) ? parkingPass : [parkingPass];
    this.lot = Array.isArray(lot) ? lot : [lot];
  }

  updateLicensePlate(plate) {
    this.licensePlate = plate;
  }

  getLicensePlate() {
    return this.licensePlate;
  }

  updateParkingPass(passList) {
    this.parkingPass = Array.isArray(passList) ? passList : [passList];
  }

  getParkingPass() {
    return this.parkingPass.slice();
  }

  chooseLot(parkingData) {
    const lots = parkingData.listLots();
    if (lots.length === 0) return null;
    const eligible = lots.filter((l) => this.parkingPass.length === 0 || this.parkingPass.includes(l.id));
    const pickFrom = eligible.length ? eligible : lots;
    pickFrom.sort((a, b) => b.openSpots - a.openSpots);
    const choice = pickFrom[0];
    this.lot = [choice.id];
    return choice.id;
  }

  exitLot() {
    this.lot = [];
  }

  viewParkingData(parkingData) {
    return super.viewLots(parkingData);
  }

  checkIn(lotId, parkingData) {
    const lot = parkingData.getLot(lotId);
    if (!lot) return false;
    const filled = lot.fillSpot(1);
    if (filled) {
      this.lot = [lotId];
    }
    return filled;
  }

  checkOut(lotId, parkingData) {
    const lot = parkingData.getLot(lotId);
    if (!lot) return false;
    const emptied = lot.emptySpot(1);
    if (emptied) {
      this.exitLot();
    }
    return emptied;
  }

  sendFeedback(message) {
    return { from: this.campusID, message, ts: new Date().toISOString() };
  }
}

module.exports = { Commuter };


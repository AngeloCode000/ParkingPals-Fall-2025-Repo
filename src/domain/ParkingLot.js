class ParkingLot {
  constructor({ id, name, color = [], totalSpots = 0, openSpots = 0 }) {
    this.id = id; // e.g., lot code like "A1"
    this.name = name || id;
    this.color = Array.isArray(color) ? color : [color];
    this.totalSpots = Number(totalSpots) || 0;
    this.openSpots = Math.min(Number(openSpots) || 0, this.totalSpots);
    this.filledSpots = this.totalSpots - this.openSpots;
  }

  setSpotInfo(total, open) {
    this.totalSpots = Math.max(0, Number(total) || 0);
    this.openSpots = Math.max(0, Math.min(Number(open) || 0, this.totalSpots));
    this.filledSpots = this.totalSpots - this.openSpots;
  }

  fillSpot(n = 1) {
    const qty = Math.max(0, Number(n) || 0);
    if (this.openSpots < qty) return false;
    this.openSpots -= qty;
    this.filledSpots += qty;
    return true;
  }

  emptySpot(n = 1) {
    const qty = Math.max(0, Number(n) || 0);
    if (this.filledSpots < qty) return false;
    this.openSpots += qty;
    this.filledSpots -= qty;
    this.openSpots = Math.min(this.openSpots, this.totalSpots);
    return true;
  }

  updateTotalSpots(newTotal) {
    const total = Math.max(0, Number(newTotal) || 0);
    const used = this.filledSpots;
    this.totalSpots = Math.max(total, used);
    this.openSpots = this.totalSpots - used;
  }
}

module.exports = { ParkingLot };


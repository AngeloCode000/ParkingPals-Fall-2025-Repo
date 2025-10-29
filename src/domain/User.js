class User {
  constructor(name, campusID, admin = false) {
    this.name = name;
    this.campusID = campusID;
    this.admin = Boolean(admin);
  }

  updateName(newName) {
    this.name = newName;
  }

  getName() {
    return this.name;
  }

  updateID(newID) {
    this.campusID = newID;
  }

  getID() {
    return this.campusID;
  }

  checkAdmin() {
    return this.admin === true;
  }

  viewLots(parkingData) {
    return parkingData.listLots().map((l) => ({
      id: l.id,
      name: l.name,
      openSpots: l.openSpots,
      totalSpots: l.totalSpots,
    }));
  }
}

module.exports = { User };


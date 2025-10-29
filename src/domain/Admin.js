const { User } = require('./User');

class Admin extends User {
  constructor({ name, campusID }) {
    super(name, campusID, true);
  }

  updateUserData(userData, user) {
    userData.addOrUpdateUser(user);
  }

  getUserData(userData) {
    return userData.listUsers();
  }

  sendAlert(message) {
    return { admin: this.campusID, message, ts: new Date().toISOString() };
  }

  updateParkingData(parkingData, lotId, updater) {
    const lot = parkingData.getLot(lotId);
    if (!lot) return false;
    updater(lot);
    return true;
  }

  viewParkingData(parkingData) {
    return parkingData.summary();
  }
}

module.exports = { Admin };


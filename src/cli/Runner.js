const { ParkingLotData } = require('../domain/ParkingLotData');
const { ParkingLot } = require('../domain/ParkingLot');
const { UserData } = require('../domain/UserData');
const { Commuter } = require('../domain/Commuter');
const { Admin } = require('../domain/Admin');
const { Authorization } = require('../services/Authorization');
const { Algorithm } = require('../services/Algorithm');
const { InputData } = require('../services/InputData');
const { Menu } = require('../services/Menu');

async function main() {
  const parkingData = new ParkingLotData();
  // Seed some lots
  parkingData.addLot(new ParkingLot({ id: 'A', name: 'Alpha', totalSpots: 50, openSpots: 40 }));
  parkingData.addLot(new ParkingLot({ id: 'B', name: 'Bravo', totalSpots: 30, openSpots: 20 }));
  parkingData.addLot(new ParkingLot({ id: 'C', name: 'Charlie', totalSpots: 10, openSpots: 5 }));

  // Seed users
  const userData = new UserData();
  userData.addOrUpdateUser(new Commuter({ name: 'Casey Commuter', campusID: '1001', licensePlate: 'ABC123', parkingPass: ['A', 'B'] }));
  userData.addOrUpdateUser(new Commuter({ name: 'Riley Rider', campusID: '1002', licensePlate: 'XYZ789', parkingPass: ['B', 'C'] }));
  userData.addOrUpdateUser(new Admin({ name: 'Alex Admin', campusID: '9999' }));

  const authorization = new Authorization();
  const algorithm = new Algorithm();
  const inputData = new InputData();

  const menu = new Menu({ userData, parkingData, authorization, algorithm, inputData });
  await menu.start();
}

module.exports = { main };


const { User } = require('./User');
const { Commuter } = require('./Commuter');
const { Admin } = require('./Admin');

class UserData {
  constructor() {
    this.users = new Map(); // campusID -> User
  }

  addOrUpdateUser(user) {
    // Coerce plain objects to class instances
    let instance = user;
    if (!(user instanceof User)) {
      if (user.admin === true) instance = new Admin(user);
      else instance = new Commuter(user);
    }
    this.users.set(instance.campusID, instance);
    return instance;
  }

  getUser(campusID) {
    return this.users.get(campusID);
  }

  removeUser(campusID) {
    return this.users.delete(campusID);
  }

  listUsers() {
    return Array.from(this.users.values());
  }
}

module.exports = { UserData };


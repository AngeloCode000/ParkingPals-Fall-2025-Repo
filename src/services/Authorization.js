class Authorization {
  login(campusID, userData) {
    const id = typeof campusID === 'string' ? campusID.trim() : campusID;
    return userData.getUser(id) || null;
  }

  isAdmin(user) {
    return Boolean(user && user.admin === true);
  }
}

module.exports = { Authorization };


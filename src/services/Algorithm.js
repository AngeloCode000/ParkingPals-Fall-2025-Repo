class Algorithm {
  // Update lots from input data and return a summary.
  async predictOccupancy(parkingData, inputData) {
    const updates = await inputData.fetch();
    for (const u of updates) {
      const lot = parkingData.getLot(u.id);
      if (!lot) continue;
      if (typeof u.totalSpots === 'number') lot.updateTotalSpots(u.totalSpots);
      if (typeof u.openSpots === 'number') lot.setSpotInfo(lot.totalSpots, Math.max(0, Math.min(u.openSpots, lot.totalSpots)));
    }
    return parkingData.summary();
  }

  // Pick the lot with the most open spots that the user is eligible for.
  recommendLot(user, parkingData) {
    const lots = parkingData.listLots();
    if (lots.length === 0) return null;
    const eligible = lots.filter((l) => user.parkingPass?.length ? user.parkingPass.includes(l.id) : true);
    const pickFrom = eligible.length ? eligible : lots;
    pickFrom.sort((a, b) => b.openSpots - a.openSpots);
    return pickFrom[0]?.id ?? null;
  }
}

module.exports = { Algorithm };


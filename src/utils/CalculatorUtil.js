export function calculateCourtOccupancy(playerCount, courtCount) {
  return playerCount/courtCount;
}

export function calculateCostPerPlayer(courtCost, playerCount, courtCount) {
  return courtCost*courtCount/playerCount;
}

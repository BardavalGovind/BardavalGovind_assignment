import distances from "../data/distances.js";


export function calculateRouteCost(route, weightMap) {
  let totalCost = 0;

  for (let i = 0; i < route.length - 1; i++) {
    const from = route[i];
    const to = route[i + 1];

    const distance = distances[from][to] || 0;

    let weight = 0;
    if (from !== "L1") weight = weightMap[from] || 0;

    totalCost += distance * getCostPerDistance(weight);
  }

  return totalCost;
}

function getCostPerDistance(weightKg) {
  if (weightKg <= 5) return 10;
  const extraSlabs = Math.ceil((weightKg - 5) / 5);
  return 10 + extraSlabs * 8;
}

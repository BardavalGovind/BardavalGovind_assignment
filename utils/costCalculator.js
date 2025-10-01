import distances from "../data/distances.js";

// Cost slabs per weight
// 0-5kg: 10 per unit distance, every extra 5kg: +8 per unit distance

export function calculateRouteCost(route, weightMap) {
  let totalCost = 0;

  for (let i = 0; i < route.length - 1; i++) {
    const from = route[i];
    const to = route[i + 1];

    const distance = distances[from][to] || 0;

    // Weight carried on this leg
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

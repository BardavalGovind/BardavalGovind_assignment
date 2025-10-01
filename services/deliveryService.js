import products from "../data/products.js";
import { calculateRouteCost } from "../utils/costCalculator.js";

const warehouses = ["C1", "C2", "C3"];

export function calculateMinCost(order) {
  const warehouseProducts = { C1: [], C2: [], C3: [] };
  const weightMap = { C1: 0, C2: 0, C3: 0 };

  for (let item in order) {
    if (!products[item]) throw new Error(`Invalid product: ${item}`);
    const wList = products[item].warehouses;

    wList.forEach((w) => {
      warehouseProducts[w].push({ item, qty: order[item] });
      weightMap[w] += products[item].weight * order[item];
    });
  }

  const activeWarehouses = Object.keys(weightMap).filter(w => weightMap[w] > 0);

  const possibleRoutes = generateRoutes(activeWarehouses);

  let minCost = Infinity;

  possibleRoutes.forEach(route => {
    const cost = calculateRouteCost(route, weightMap);
    if (cost < minCost) minCost = cost;
  });

  return minCost;
}

function generateRoutes(activeWarehouses) {
  const permutations = getPermutations(activeWarehouses);
  const routes = [];

  permutations.forEach(p => {
    const route = [];
    p.forEach(w => {
      route.push(w);
      route.push("L1");
    });
    routes.push(route);
  });

  return routes;
}

function getPermutations(array) {
  if (array.length === 0) return [[]];
  const result = [];

  array.forEach((item, index) => {
    const rest = [...array.slice(0, index), ...array.slice(index + 1)];
    const perms = getPermutations(rest);
    perms.forEach(p => result.push([item, ...p]));
  });

  return result;
}

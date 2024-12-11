/**
 * Calculates the total hours required to cover the given houses at a specified speed.
 * @param {Array<Array<number>>} houses - example: [1, 2].
 * @param {number} speed - km/h
 * @returns {number} Hours it takes to cover the distance
 */
const calculateDeliveryTime = (houses, speed) =>
  houses.flat().reduce((total, distance) => total + distance * 2, 0) / speed;

const houses = [
  [1, 2],
  [3, 4],
  [5, 6],
];
const speed = 10;
console.log(`${calculateDeliveryTime(houses, speed)}h`);

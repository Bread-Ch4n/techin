const data = require("./data.json");

const getItemPriceByName = (name) =>
  data.find((item) => item.name === name).price;

let price = getItemPriceByName("Candy Canes");
console.log(price);

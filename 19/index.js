const fs = require("fs");

// extracts the number and unit from strings like: 58yd, would output: {"58", "yd"}.
function getUnit(input) {
  const numbers = parseFloat(input.match(/^\d+/)?.[0]) || 0;
  const unit = input.match(/[a-zA-Z]+$/)?.[0] || "";
  return { numbers, unit };
}

// converts the freedom units to cm by multiplying the cm in 1 of that unit, example: (1 foot => 30.48).
function freedomToMetric(line) {
  const { numbers, unit } = getUnit(line);
  switch (unit) {
    case "ft":
      return 30.48 * numbers;
    case "in":
      return 2.54 * numbers;
    case "mil":
      return 160934 * numbers;
    case "yd":
      return 91.44 * numbers;
    case "wm":
      return 60 * numbers;
    default:
      return 0;
  }
}

try {
  // reads data into 1 string.
  const content = fs.readFileSync("./input.txt", "utf8");

  // splits the data by new lines.
  let data = content.trimEnd().split("\n");

  // sum up all the converted units.
  let cm = data.reduce((acc, cur) => acc + freedomToMetric(cur), 0).toFixed(2);

  // print out the result.
  console.log(cm);
} catch (err) {
  console.error("Error reading file:", err);
}

const fs = require("fs");

try {
  const content = fs.readFileSync("./data.txt", "utf8");

  // Process data.
  let data = [];
  content.split("\n").forEach((line) =>
    data.push({
      name: line.split(": ")[0],
      deed_points: line.split(": ")[1],
    }),
  );

  // Sorts the data by deed points descending and returns only 3 top ones.
  data = data.sort((a, b) => b.deed_points - a.deed_points).slice(0, 3);

  // Print out the data.
  data.forEach((person) =>
    console.log(`${person.name}: ${person.deed_points}`),
  );
} catch (err) {
  console.error("Error reading file:", err);
}

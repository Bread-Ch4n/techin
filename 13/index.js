const data = require("./data.json");

const greetCustomer = () =>
  Object.entries(data).forEach(([customer, { visits }]) =>
    console.log(
      visits === 1
        ? `Ho ho ho! Welcome back, ${customer}! We’re glad you enjoyed your first visit! 🎅`
        : visits > 1
          ? `Merry greetings, ${customer}! So wonderful to see you again! 🎄`
          : "Welcome to the North Pole Café! Is this your first time? ❄",
    ),
  );

greetCustomer();

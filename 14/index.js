const sqlite3 = require("sqlite3");
const fs = require("fs");

let filename = fs
  .readdirSync("./")
  .find((file) => file.startsWith("exchange") && file.endsWith(".sqlite"));

let db = new sqlite3.Database(filename, (err) => {
  if (err) return console.error(err.message);
  console.log("Connected to the database.");
});

async function getUserWishlists() {
  const sql = `SELECT *
                 FROM user_wishlists`;

  return new Promise((resolve, reject) => {
    db.all(sql, [], (err, results) => {
      if (!err) return resolve(results);

      console.error(err.message);
      reject(err);
    });
  });
}

async function getExchanges() {
  const sql = `SELECT *
                 FROM gift_exchanges`;

  return new Promise((resolve, reject) => {
    db.all(sql, [], (err, results) => {
      if (!err) return resolve(results);

      console.error(err.message);
      reject(err);
    });
  });
}

(async () => {
  try {
    const [wishlists, exchanges] = await Promise.all([
      getUserWishlists(),
      getExchanges(),
    ]);

    const groupedExchangesMap = new Map();

    exchanges.forEach((exchange) => {
      let group = groupedExchangesMap.get(exchange.receiver_id);

      if (!group) {
        group = {
          id: exchange.receiver_id,
          exchanges: [],
          wishlist: wishlists.filter(
            (wish) => wish.user_id === exchange.receiver_id,
          ),
          gotWish: false,
        };

        groupedExchangesMap.set(exchange.receiver_id, group);
      }

      group.exchanges.push({ ...exchange });

      group.gotWish = group.wishlist.some((wish) =>
        group.exchanges.some((exch) => exch.gift_name === wish.gift_name),
      );
    });

    const answer = Array.from(groupedExchangesMap.values()).filter(
      (group) => group.gotWish,
    ).length;
    console.log(answer);
  } catch (error) {
    console.error(error);
  } finally {
    db.close((err) => {
      if (!err) {
        console.log("Database connection closed.");
      } else {
        console.error("Error closing the database:", err.message);
      }
    });
  }
})();

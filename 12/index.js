const sqlite3 = require("sqlite3");
const fs = require("fs");

let filename = fs
  .readdirSync("./")
  .find((file) => file.startsWith("gift") && file.endsWith(".sqlite"));

let db = new sqlite3.Database(filename, (err) => {
  if (err) {
    console.error(err.message);
    return;
  }
  console.log("Connected to the database.");
});

async function getPurchases() {
  const sql = `SELECT *
                 FROM customer_gift_purchases`;

  return new Promise((resolve, reject) => {
    db.all(sql, [], (err, results) => {
      if (err) {
        console.error(err.message);
        reject(err);
        return;
      }
      resolve(results);
    });
  });
}

async function getGifts() {
  const sql = `SELECT *
                 FROM gifts`;

  return new Promise((resolve, reject) => {
    db.all(sql, [], (err, results) => {
      if (err) {
        console.error(err.message);
        reject(err);
        return;
      }
      resolve(results);
    });
  });
}

async function getGiftCategories() {
  const sql = `SELECT *
                 FROM gift_categories`;

  return new Promise((resolve, reject) => {
    db.all(sql, [], (err, results) => {
      if (err) {
        console.error(err.message);
        reject(err);
        return;
      }
      resolve(results);
    });
  });
}

const getSumOfCategory = (customer_purchases, gift_category_id) =>
  customer_purchases.reduce(
    (total, purchase) =>
      purchase.gift_category.gift_category_id == gift_category_id
        ? total + parseFloat(purchase.retail_price)
        : total,
    0,
  );

(async () => {
  try {
    const purchasesGrouped = [];

    const [purchases, gifts, gift_categories] = await Promise.all([
      getPurchases(),
      getGifts(),
      getGiftCategories(),
    ]);

    purchases.forEach((purchases) =>
      (purchasesGrouped[purchases.customer_id] ??= []).push({
        ...purchases,
        gift: (g = gifts.find((g) => g.gift_id === purchases.gift_id)),
        gift_category: gift_categories.find(
          (c) => c.gift_category_id === g?.gift_category_id,
        ),
      }),
    );

    // 6 = leisure
    const selectedCategory = 6;
    console.log(getSumOfCategory(purchasesGrouped[24], selectedCategory));
  } catch (error) {
    console.error(error);
  } finally {
    db.close((err) => {
      if (err) {
        console.error("Error closing the database:", err.message);
      } else {
        console.log("Database connection closed.");
      }
    });
  }
})();

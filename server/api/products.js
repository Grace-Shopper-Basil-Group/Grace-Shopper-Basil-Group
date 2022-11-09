const router = require("express").Router();
const Product = require("../db/models/Product");

module.exports = router;

// GET /api/products
router.get("/", async (req, res, next) => {
  try {
    console.log("Product");
    const products = await Product.findAll();
    res.send(products);
  } catch (err) {
    next(err);
  }
});

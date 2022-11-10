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

//GET /api/products/:id
router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    res.send(product);
  } catch (e) {
    next(e);}
});

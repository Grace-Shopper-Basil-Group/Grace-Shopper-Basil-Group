const router = require('express').Router();
const {
  models: { Product },
} = require('../db');

module.exports = router;

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    res.send(product);
  } catch (e) {
    next(e);
  }
});

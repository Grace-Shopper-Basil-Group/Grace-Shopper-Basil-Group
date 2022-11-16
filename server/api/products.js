const router = require('express').Router();
const Product = require('../db/models/Product');
const User = require('../db/models/User')

module.exports = router;

const requireAdminToken = async (req, res, next) => {
  try {
    const token = (req.body.headers.authorization) || (req.headers.authorization);
    const user = await User.findByToken(token);
    if (user.accessRights === "admin") {
    req.user = user;
    next();
    } else {
      throw new Error("You do not have access to view this information")
    }
  } catch (error) {
    next(error);
  }
};

const requireDeleteAdminToken = async (req, res, next) => {
  console.log(req)
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    if (user.accessRights === "admin") {
    req.user = user;
    next();
    } else {
      throw new Error("You do not have access to view this information")
    }
  } catch (error) {
    next(error);
  }
};

// GET /api/products
router.get('/', async (req, res, next) => {
  try {
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
    next(e);
  }
});

// POST /api/products
router.post('/', requireAdminToken, async (req, res, next) => {
  try {
    res.status(201).send(await Product.create(req.body.product));
  } catch (error) {
    console.log(error);
  }
});

// PUT /api/products/:id
router.put('/:id', requireAdminToken, async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    res.send(await product.update(req.body.product));
  } catch (error) {
    next(error);
  }
});

//DELETE /api/products/:id
router.delete('/:id', requireDeleteAdminToken, async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    await product.destroy();
    res.send(product);
  } catch (error) {
    next(error);
  }
});

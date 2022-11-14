const router = require('express').Router()
// const { default: auth } = require('../../client/store/auth');
const { models: { Order, User, OrderItem, Product }} = require('../db');
module.exports = router

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch(error) {
    next(error);
  }
};

const requireTokenForPosts = async (req, res, next) => {
  try {
    const token = req.body.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch(error) {
    next(error);
  }
};

router.get('/cart', requireToken, async (req, res, next) => {
  try {
    const cart = await Order.findOne({
      where: {
        complete: false,
        userId: req.user.id,
      },
      include: [{
        model: OrderItem,
        model: Product }]
    })
    res.send(cart)
  } catch(error) {
    next(error)
  }
})

router.post('/cart', requireTokenForPosts, async (req, res, next) => {
  try {
    const [orderItem, created] = await OrderItem.findOrCreate({
      where: {
        orderId: req.body.cartId,
        productId: req.body.item.id,
      },
    })
    orderItem.price = req.body.item.price;
    if (!created) {
      orderItem.quantity += 1;
    } else {
      orderItem.quantity = 1;
    }
    await orderItem.save()
    res.send(orderItem)
  } catch(error) {
    next(error)
  }
})

router.delete('/cart', requireToken, async (req, res, next) => {
  try {
    const deletedItem = await OrderItem.findOne({
      where: {
        orderId: req.body.cartId,
        productId: req.body.itemId,
      }
    })
    await deletedItem.destroy()
    res.sendStatus(200)
  } catch(error) {
    next(error)
  }
})

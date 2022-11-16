const router = require('express').Router();
const {
  models: { User },
} = require('../db');
module.exports = router;

const requireAdminToken = async (req, res, next) => {
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

router.get('/', requireAdminToken, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'firstName', 'lastName', 'username', 'email'],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

//GET /api/users/:id
router.get('/:id', requireAdminToken, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.send(user);
  } catch (e) {
    next(e);
  }
});

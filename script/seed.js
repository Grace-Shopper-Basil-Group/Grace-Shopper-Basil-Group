'use strict'
const { faker } = require('@faker-js/faker');
const {db, models: {User, Product, Order, OrderItem} } = require('../server/db')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  const users = [...Array(10)].map((user) => {
    return {
      username: faker.internet.userName(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      password: faker.internet.password(8),
      email: faker.internet.email(),
    }
})

    const dbUsers = await Promise.all(
      users.map((user) => {
        return User.create(user)
      }))

    const products = [...Array(10)].map((product) => {
      return {
        name: faker.commerce.product(),
        price: faker.commerce.price(),
        description: faker.commerce.productDescription(),
        imageUrl: faker.image.business(),
      }
    })

    const dbProducts = await Promise.all(
      products.map((product) => {
        return Product.create(product)
      }))
}


/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
 */
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed

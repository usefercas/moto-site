const mongoose = require('mongoose');
const Rider = require('../models/Rider.model');
const User = require('../models/User.model');
const { riders } = require('../public/js/riders.json');
require('../config/db.config');

mongoose.connection.once('open', () => {
  mongoose.connection.dropCollection('riders')
    .then(() => {
      console.log('DB cleared');
    })
    .then(() => {
      return Rider.create(riders);
    })
    .then((ridersCB) => {
      ridersCB.forEach(rider => console.log(`${rider.name} has been created`));
    })
    .then(() => {
      // console.log("Vamos a create el user");
      // let email = "admin@admin.com";
      // let username = "admin";
      // let password = "12345678";
      // let isAdmin = true;
      
      // User.create({
      //   username,
      //   password,
      //   email,
      //   isAdmin
      // }).then((userCreated) => console.log("Usuario creado ", userCreated))
      // .catch(err => console.log("Error de creacion del user", err));
    })
    .catch(err => console.error(err))
    .finally(() => {
      mongoose.connection.close()
        .then(() => {
          console.log('End of seeds');
        })
        .catch((err) => console.error('Error while disconnecting', err))
        .finally(() => process.exit(0))
    })
})

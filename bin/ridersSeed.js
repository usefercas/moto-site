const mongoose = require('mongoose');
const Rider = require('../models/Rider.model');
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

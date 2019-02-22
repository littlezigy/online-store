require('dotenv').config();

module.exports = {
  MONGODB_URI='',
  /***************************************************************************
   * Set the default database connection for models in the development       *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/
  models: {
    datastore: 'productionMongo',
    attributes: {
      createdAt: { type: 'number', autoCreatedAt: true, },
      updatedAt: { type: 'number', autoUpdatedAt: true, },
      id: { type: 'number', columnName: '_id'}, // <-- for MongoDB
    },
    schema: true,
  },

  //   /****** twilio ******/

  url: {
    appURL: "http://localhost:1337",
    applicationURL: "http://localhost:1337",
  },

  mode: "development",
};

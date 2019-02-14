require('dotenv').config();

module.exports = {
  /***************************************************************************
   * Set the default database connection for models in the development       *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/
  models: {},

  //   /****** twilio ******/

  url: {
    appURL: "http://localhost:1337",
    applicationURL: "http://localhost:1337",
  },

  mode: "development",
};

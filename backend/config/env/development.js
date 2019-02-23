require('dotenv').config();

MONGODB_URI="mongodb://littlezigy:kaysie12@ds161190.mlab.com:61190/heroku_81sqfrx3"


module.exports = {
  /***************************************************************************
   * Set the default database connection for models in the development       *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/
  models: {
    schema: true,
  },

  //   /****** twilio ******/

  url: {
    appURL: "http://localhost:1337",
    applicationURL: "http://localhost:1337",
  },

  mode: "development",
};

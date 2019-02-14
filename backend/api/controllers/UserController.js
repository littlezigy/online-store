/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

/*              Basic User login              *
*--------------------------------------------*/
  login: async function(req, res) {
    req.session.user = {};
    console.log("\n******User Login *********\nChecking if user is logged in and session id: " + req.session.user.loggedin + " " + req.session.user.id);
    //look for username in User model entries
    var finduser = await User.findOne({
      where: {
        username: req.body.username, 
        password: req.body.password 
      }
    });
    //console.log(finduser.id);

    if (finduser == false) {
      res.notFound();
    } else {
      console.log('--running else--');
      req.session.user.id = finduser.id;
      req.session.user.loggedin = true; 
      console.log("User " + req.session.user.id + "logged in: " + req.session.user.loggedin);
      
      console.log("Checking cart...");
      if (req.session.cart != false) {
        console.log("Session cart exists.", req.session.cart);
      }

      res.send({loggedin: true, uname: req.body.username, loginid: finduser.id});
    }
  },

  
/*                  Admin Login                 *
*----------------------------------------------*/
  adminlogin: async function (req, res) {
    req.session.user = {};
    var logindetails = req.body;
    var adminusers = await Usertype.find(
        {id: 1}).
        populate('users', {
        where: {
            username: logindetails.username,
            password: logindetails.password
        }
    })
    console.log(adminusers);

    if (adminusers == false || adminusers === undefined || adminusers === []) {
        console.log("No admin users or Admin account with those details do not exist on this server. Create some now");
        res.send(false);
    } else {        
        req.session.user.isadmin = true; console.log("Session isadmin boolean checker has been set. " + req.session.user.isadmin, req.session.user);
        res.send(true);
    }
  },


/*            Logout user             *
*-----------------------------------*/
  logout: function(req, res) {
    console.log("\n******Log out*******", req.session.user);
    if(req.session.user == true) {
      console.log("Logging you out, user " + req.session.user.id);
    } else {
      console.log("You aren't logged in.");
    }
    delete req.session.user;
    console.log("Checking if user is logged in ", req.session.user);
    res.send("Logged out");
  }
};

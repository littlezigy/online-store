/**
 * UsertypeController
 *
 * @description :: Server-side actions for handling user level functions, ie admin user functions.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    adminlogin: async function (req, res) {
        var logindetails = req.body;
        var uid;
        var adminusers = await Usertype.find(
            {id: 1}).
            populate('users', {
            where: {
                username: logindetails.username,
                password: logindetails.password
            }
        });

        if (adminusers == null) {
            console.log("No admin users");
            res.send('NO admin type account on this server')
        } else {        
            console.log("Logging in as admin!");

            //Cookies and session properties
            req.session.isadmin = true; console.log("Session isadmin boolean checker has been set. " + req.session.isadmin);
            req.session.userid = uid;
            res.send(logindetails.username + " with user ID " + uid + " is logged in!");
        }
    }
}
module.exports = function (req, res, proceed) {
    if(req.session.user.isadmin == true) {
        console.log("Admin user recognized");
        return proceed();
    }
    else {
        console.log("You're not an admin...How did you get here?");
        return res.forbidden('You are not permitted to perform this action.');
    }
}
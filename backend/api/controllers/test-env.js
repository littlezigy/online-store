module.exports = function testenv(req, res) {
    
    var tester = process.env.TESTERV;
    console.log("Testing this function. To change console and response messages, change environment variable TESTERV");
    console.log(tester);
    res.send(tester);
}
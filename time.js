const moment = require("moment")
module.exports = (req, res) => {
  var time = moment().format('LT');
  res.send({time: time})
}

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MechanicSchema = new Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true }
});

module.exports = mongoose.model('Mechanic', MechanicSchema);

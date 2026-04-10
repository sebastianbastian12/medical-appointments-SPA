const mongoose = require('mongoose');

const medicalCenterSchema = mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  phone: { type: String, required: true },
  specialty: { type: String, required: true },
});

module.exports = mongoose.model('MedicalCenter', medicalCenterSchema);

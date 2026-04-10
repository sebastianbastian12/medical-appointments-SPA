const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema({
  specialistId: { type: String, required: true },
  specialistName: { type: String, required: true },
  date: { type: String, required: true },
  hour: { type: String, required: true },
});

module.exports = mongoose.model('Appointment', appointmentSchema);

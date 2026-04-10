const mongoose = require('mongoose');

const slotSchema = mongoose.Schema({
  date: { type: String, required: true },
  hour: { type: String, required: true },
});

const specialistSchema = mongoose.Schema({
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  medicalCenter: { type: mongoose.Schema.Types.ObjectId, ref: 'MedicalCenter' },
  imageUrl: { type: String, required: true },
  availableSlots: [slotSchema],
});

module.exports = mongoose.model('Specialist', specialistSchema);

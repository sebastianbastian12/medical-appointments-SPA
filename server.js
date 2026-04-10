const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Specialist = require('./server/models/specialist');
const Appointment = require('./server/models/appointment');

const app = express();

mongoose
  .connect('mongodb://localhost:27017/medical-app')
  .then(() => {
    console.log('Connected to MongoDB local');
  })
  .catch(() => {
    console.log('Connection failed');
  });

app.use(express.json());
app.use(cors());

//Ruts of the app

//Rut to get the list of specialists
app.get('/specialists', (req, res, next) => {
  Specialist.find().then((documents) => {
    res.status(200).json({
      message: 'Specialists fetched successfully',
      specialists: documents,
    });
  });
});


//Rut to get the detail of the booked appointments
app.get('/appointments', (req, res) => {
  const Appointment = require('./server/models/appointment');

  Appointment.find()
    .then((documents) => {
      res.status(200).json({
        message: 'Appointments fetched successfully',
        appointments: documents,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to fetch appointments' });
    });
});

//Rut to book an appointment
app.post('/specialists/book', (req, res) => {
  console.log('Data from Angular');
  console.log(req.body);

  const appointment = new Appointment({
    specialistId: req.body.specialistId,
    specialistName: req.body.specialistName,
    date: req.body.date,
    hour: req.body.hour,
  });

  appointment
    .save()
    .then((result) => {
      res.status(201).json({
        message: 'Appointment booked successfully!',
        appointmentId: result._id,
      });
    })
    .catch((err) => {
      console.error('Error saving in MongoDB:', err.message);
      res.status(500).json({
        error: 'Failed to book appointment',
        message: err.message,
      });
    });
});

//Rut to delete an appointment
app.delete('/appointments/:id', (req, res) => {
  const appointmentId = req.params.id;
  console.log('Server receved request to delete ID:', appointmentId);

  Appointment.deleteOne({ _id: appointmentId })
    .then((result) => {
      console.log('MongoDB Delete Result:', result);
      if (result.deletedCount > 0) {
        res.status(200).json({ message: 'Appointment deleted successfully!' });
      } else {
        res.status(404).json({ message: 'Appointment not found' });
      }
    })
    .catch((err) => {
      console.error('Database Error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

//Rut to update an appointment
app.put('/appointments/:id', (req, res) => {
  const id = req.params.id;

  const { date, hour } = req.body;

  console.log('Updating ID:', id, 'New Date:', date, 'New Hour:', hour);

  Appointment.updateOne({ _id: id }, { $set: { date: date, hour: hour } })
    .then((result) => {
      console.log('DB Result:', result);
      res.status(200).json({ message: 'Update successful!' });
    })
    .catch((err) => {
      res.status(500).json({ error: 'Update failed' });
    });
});

//Rut to get the medical centers
const MedicalCenter = require('./server/models/medicalCenter');

app.get('/medical-centers', (req, res) => {
  MedicalCenter.find()
    .then((documents) => {
      res.status(200).json({
        message: 'Centers fetched successfully',
        centers: documents,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to fetch medical centers' });
    });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

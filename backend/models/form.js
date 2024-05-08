// models/Form.js
const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  country: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  gender: { type: String, required: true },
  dob: { type: Date, required: true },
  age: { type: Number, required: true }
});

const Form = mongoose.model('Form', formSchema);

module.exports = Form;

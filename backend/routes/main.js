const express = require("express");
const {
  isAlphabetic,
  isEmailValid,
  isAgeValid,
  isDOBAlignedWithAge,
} = require("../utils/validators");
const Form = require("../models/form");

const router = express.Router();

router.post("/submit", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      country,
      state,
      city,
      gender,
      dob,
      age,
    } = req.body;

    // Validate first name and last name
    if (!isAlphabetic(firstName) || !isAlphabetic(lastName)) {
      return res
        .status(400)
        .json({
          message:
            "First name and last name must contain only alphabetic characters",
        });
    }

    // Validate email format
    if (!isEmailValid(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const existingFormData = await Form.findOne({ email });
    if (existingFormData) {
      return res.status(400).json({ message: "Email already exists" });
    }
    // Validate age
    if (!isAgeValid(age)) {
      return res
        .status(400)
        .json({ message: "Age must be between 14 and 99 years" });
    }

    // Validate age and date of birth alignment
    if (!isDOBAlignedWithAge(dob, age)) {
      return res
        .status(400)
        .json({
          message: "Date of birth does not align with the provided age",
        });
    }

    const formData = new Form({
      firstName,
      lastName,
      email,
      country,
      state,
      city,
      gender,
      dob,
      age,
    });

    await formData.save();

    res.status(201).json({ message: "Form data saved successfully" });
  } catch (error) {
    console.error("Error saving form data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/all", async (req, res) => {
  try {
    const formData = await Form.find();
    res.status(200).json(formData);
  } catch (error) {
    console.error("Error fetching form data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;

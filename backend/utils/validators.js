

// Alphabetic Characters Validation for First Name and Last Name
const isAlphabetic = (value) => /^[A-Za-z]+$/.test(value);

// Email Format Validation
const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Age Validation
const isAgeValid = (age) => age >= 14 && age <= 99;

// Age and Date of Birth Alignment Validation
const isDOBAlignedWithAge = (dateOfBirth, age) => {
  const today = new Date();
  const dob = new Date(dateOfBirth);
  const ageFromDOB = today.getFullYear() - dob.getFullYear();
  return ageFromDOB === age;
};

module.exports = { isAlphabetic, isEmailValid, isAgeValid, isDOBAlignedWithAge };

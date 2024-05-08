export const validateFirstName = (value) => {
  if (!value.match(/^[A-Za-z]+$/)) {
    return "First Name must contain only alphabets";
  }
  return "";
};

export const validateLastName = (value) => {
  if (!value.match(/^[A-Za-z]+$/)) {
    return "Last Name must contain only alphabets";
  }
  return "";
};

export const validateEmail = (value) => {
  if (!value.match(/^\S+@\S+$/i)) {
    return "Invalid email address";
  }
  return "";
};

export const validateAge = (dob) => {
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  if (age < 14 || age >= 99) {
    return "Age must be older than 14 years and less than 99 years";
  }
  return "";
};

export const validateCountry = (value, countries) => {
  if (!value) {
    return "Country is required";
  }

  const countryExists = countries.some(
    (country) => country.country_name === value
  );
  if (!countryExists) {
    return "Invalid country";
  }

  return "";
};

export const validateState = (value, states) => {
  if (!value) {
    return "State is required";
  }

  const stateExists = states.some((state) => state === value);
  if (!stateExists) {
    return "Invalid state";
  }

  return "";
};

export const validateCity = (value, cities) => {
  if (!value) {
    return "City is required";
  }
  console.log("cities", cities);

  const cityExists = cities.some((city) => city === value);
  if (!cityExists) {
    return "Invalid city";
  }

  return "";
};

export const validateGender = (value) => {
  if (!value) {
    return "Gender is required";
  }
  return "";
};

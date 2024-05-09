import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  validateFirstName,
  validateLastName,
  validateEmail,
  validateAge,
  validateCountry,
  validateState,
  validateCity,
  validateGender,
} from "../validation/validators";
import { Toast } from "react-bootstrap";
import { url } from "../api";

const FormComponent = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    state: "",
    city: "",
    gender: "",
    dob: "",
    age: "",
  });
  const [errors, setErrors] = useState({});
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [age, setAge] = useState(0);
  const [authToken, setAuthToken] = useState("");
  const [backendError, setBackendError] = useState("");

  useEffect(() => {
    // Step 1: Get Access Token
    axios
      .get("https://www.universal-tutorial.com/api/getaccesstoken", {
        headers: {
          Accept: "application/json",
          "api-token":
            "ZWzAg7l0QKKJxzbd67kfKWEN5BVP7_fSbAiEf8lxw8szFT0AN0fWgA3LmOdvGaWj6IQ",
          "user-email": "abhishek14kl@gmail.com",
        },
      })
      .then((response) => {
        console.log("token1", response.data.auth_token);
        setAuthToken(response.data.auth_token);

        // Step 2: Get Countries
        axios
          .get("https://www.universal-tutorial.com/api/countries/", {
            headers: {
              Authorization: `Bearer ${response.data.auth_token}`,
              Accept: "application/json",
            },
          })
          .then((response) => {
            const countries = response.data;
            setCountries(countries);
          })
          .catch((error) => {
            console.error("Error fetching countries:", error);
          });
      })
      .catch((error) => {
        console.error("Error getting access token:", error);
      });
  }, [window.location.pathname]);

  useEffect(() => {
   
    const timeout = setTimeout(() => {
      setBackendError("");
    }, 4000);

  
    return () => clearTimeout(timeout);
  }, [backendError]);

  const handleFirstNameChange = (e) => {
    console.log("token", authToken);
    const value = e.target.value;
    setFormData({ ...formData, firstName: value });
    setErrors({ ...errors, firstName: validateFirstName(value) });
  };

  const handleLastNameChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, lastName: value });
    setErrors({ ...errors, lastName: validateLastName(value) });
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, email: value });
    setErrors({ ...errors, email: validateEmail(value) });
  };

  const handleCountryChange = (e) => {
    const value = e.target.value;
    console.log("Selected Country:", value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      country: value,
      state: "", 
      city: "", 
    }));
    // Fetch list of states based on selected country
    axios
      .get(`https://www.universal-tutorial.com/api/states/${value}`, {
        headers: {
          Authorization: `Bearer ${authToken}`, 
          Accept: "application/json",
        },
      })
      .then((response) => {
        const states = response.data.map((state) => state.state_name);
        setStates(states);
      })
      .catch((error) => {
        console.error("Error fetching states:", error);
      });
  };

  const handleStateChange = (e) => {
    const value = e.target.value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      state: value,
      city: "", 
    }));
    // Fetch list of cities based on selected state
    axios
      .get(`https://www.universal-tutorial.com/api/cities/${value}`, {
        headers: {
          Authorization: `Bearer ${authToken}`, 
          Accept: "application/json",
        },
      })
      .then((response) => {
        const cities = response.data.map((city) => city.city_name);
        setCities(cities);
      })
      .catch((error) => {
        console.error("Error fetching cities:", error);
      });
  };

  const handleGenderChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, gender: value });
  };

  const handleDateOfBirthChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, dob: value });
    // Validate age
    setErrors({ ...errors, dob: validateAge(value) });
    // Calculate age based on date of birth
    const today = new Date();
    const birthDate = new Date(value);
    const age = today.getFullYear() - birthDate.getFullYear();
    setAge(age);
    setFormData((prevFormData) => ({
      ...prevFormData,
      age,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // Validate form before submitting
    const formErrors = {};
    formErrors.firstName = validateFirstName(formData.firstName);
    formErrors.lastName = validateLastName(formData.lastName);
    formErrors.email = validateEmail(formData.email);
    formErrors.dob = validateAge(formData.dob);
    formErrors.country = validateCountry(formData.country, countries);
    formErrors.state = validateState(formData.state, states);
    formErrors.city = validateCity(formData.city, cities);
    formErrors.gender = validateGender(formData.gender);
    setErrors(formErrors);

    // Submit the form if there are no errors
    if (Object.values(formErrors).every((error) => error === "")) {
      // Perform post request to save the data
      axios
        .post(`${url}/api/submit`, formData)
        .then((response) => {
          console.log("Data saved successfully:", response.data);
          window.location.href = "/dashboard";
        })
        .catch((error) => {
          setBackendError(error.response.data.message);
          console.error("Error saving data:", error);
        });
    } else {
      console.log("sorry", formErrors);
    }
  };

  return (
    <>
      <h2>Fill Form</h2>

      <form onSubmit={onSubmit} className="container mt-5">
        <div className="form-group mb-3">
          <input
            className="form-control"
            value={formData.firstName}
            onChange={handleFirstNameChange}
            placeholder="First Name"
          />
          {errors.firstName && (
            <span className="text-danger">{errors.firstName}</span>
          )}
        </div>

        <div className="form-group mb-3">
          <input
            className="form-control"
            value={formData.lastName}
            onChange={handleLastNameChange}
            placeholder="Last Name"
          />
          {errors.lastName && (
            <span className="text-danger">{errors.lastName}</span>
          )}
        </div>

        <div className="form-group mb-3">
          <input
            className="form-control"
            value={formData.email}
            onChange={handleEmailChange}
            placeholder="E-Mail"
          />
          {errors.email && <span className="text-danger">{errors.email}</span>}
        </div>

        <div className="form-group mb-3">
          <select
            className="form-control"
            value={formData.country}
            onChange={handleCountryChange}
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option
                key={country.country_short_name}
                value={country.country_name}
              >
                {country.country_name}
              </option>
            ))}
          </select>
          {errors.country && (
            <span className="text-danger">{errors.country}</span>
          )}
        </div>

        <div className="form-group mb-3">
          <select
            className="form-control"
            value={formData.state}
            onChange={handleStateChange}
          >
            <option value="">Select State</option>
            {states.map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ))}
          </select>
          {errors.state && <span className="text-danger">{errors.state}</span>}
        </div>

        <div className="form-group mb-3">
          <select
            className="form-control"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          >
            <option value="">Select City</option>
            {cities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
          {errors.city && <span className="text-danger">{errors.city}</span>}
        </div>

        <div className="form-group mb-3">
          <label>Gender : </label>
          <div className="form-group form-check-inline">
            <label className="mr-3 form-check-label">
              <input
                type="radio"
                value="male"
                checked={formData.gender === "male"}
                onChange={handleGenderChange}
                className="form-check-input"
              />{" "}
              Male
            </label>
            <label className="mr-3 form-check-label">
              <input
                type="radio"
                value="female"
                checked={formData.gender === "female"}
                onChange={handleGenderChange}
                className="form-check-input"
              />{" "}
              Female
            </label>
            <label className="mr-3 form-check-label">
              <input
                type="radio"
                value="other"
                checked={formData.gender === "other"}
                onChange={handleGenderChange}
                className="form-check-input"
              />{" "}
              Other
            </label>
          </div>
        </div>

        <div className="form-group mb-3">
          <input
            type="date"
            className="form-control"
            value={formData.dob}
            onChange={handleDateOfBirthChange}
            placeholder="Date of Birth"
          />
        </div>

        <div className="form-group mb-3">
          <input
            type="text"
            className="form-control"
            value={age}
            readOnly
            placeholder="Age"
          />
          {errors.dob && <span className="text-danger">{errors.dob}</span>}
        </div>

        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
      <Toast
        show={!!backendError}
        onClose={() => setBackendError("")}
        delay={4000}
        autohide
        className="bg-danger text-white"
        style={{ position: "fixed", bottom: "20px", right: "20px" }}
      >
        <Toast.Body>{backendError}</Toast.Body>
      </Toast>
    </>
  );
};

export default FormComponent;

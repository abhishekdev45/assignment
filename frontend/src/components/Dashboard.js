import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { url } from "../api";

const FormDataTable = () => {
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    // Fetch form data from the backend API
    axios
      .get(`${url}/api/all`)
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching form data:", error);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h2>Form Data</h2>
      <Link to="/" className="btn btn-link mb-3">
        Go Back to Form
      </Link>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Country</th>
              <th>State</th>
              <th>City</th>
              <th>Gender</th>
              <th>Date of Birth</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {formData.map((data, index) => (
              <tr key={index}>
                <td>{data.firstName}</td>
                <td>{data.lastName}</td>
                <td>{data.email}</td>
                <td>{data.country}</td>
                <td>{data.state}</td>
                <td>{data.city}</td>
                <td>{data.gender}</td>
                <td>{new Date(data.dob).toLocaleDateString()}</td>
                <td>{data.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FormDataTable;

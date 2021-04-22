import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";

const Signup = () => {
  // State
  // Used for storing the input fields data for temporary till use click submit
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  // Destructuring of values state object
  const { name, email, password, error, success } = values;

  // Handling changes (Higher order function syntax)
  // One method for all values in values state object where "value" represents individual value
  const handleChange = (value) => (event) => {
    setValues({ ...values, error: false, [value]: event.target.value });
  };

  // Handling onSubmit
  // We are sending the values in the input field to signup method and on success (.then()) we are making input fileds empty again
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch((error) => console.log("Error while signup data filling !!"));
  };

  // Signup Form method
  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-4 offset-sm-4 text-left">
          <form>
            <div className="form-group mt-3">
              <label className="text-light">Name</label>
              <input
                className="form-control"
                onChange={handleChange("name")}
                type="text"
                value={name}
              />
            </div>
            <div className="form-group mt-3">
              <label className="text-light">Email</label>
              <input
                className="form-control"
                onChange={handleChange("email")}
                type="email"
                value={email}
              />
            </div>
            <div className="form-group mt-3">
              <label className="text-light">Password</label>
              <input
                className="form-control"
                onChange={handleChange("password")}
                type="password"
                value={password}
              />
            </div>
            <div class="d-grid gap-2 col-6 mx-auto mt-3">
              <button class="btn btn-success" onClick={onSubmit} type="button">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Success message for client
  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-4 offset-sm-4 text-center">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New Account created successfully. Please login here
            <Link to="/signin">Login</Link>
          </div>
        </div>
      </div>
    );
  };

  // Error message
  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-4 offset-sm-4 text-center">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            Failed to create new account !!
            {error}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Base title="Signup page">
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
      <p className="text-white text-center">{JSON.stringify(values)}</p>
    </Base>
  );
};

export default Signup;

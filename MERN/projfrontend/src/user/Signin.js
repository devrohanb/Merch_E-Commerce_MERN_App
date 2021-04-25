import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Base from "../core/Base";

import { signin, authenticate, isAuthenticated } from "../auth/helper";

const Signin = () => {
  // State
  // Used for storing the input fields data for temporary till use click submit
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });

  // Destructuring the values state object
  const { email, password, error, loading, didRedirect } = values;
  const { user } = isAuthenticated();

  // Handling changes (Higher order function syntax)
  // One method for all values in values state object where "value" represents individual value
  const handleChange = (value) => (event) => {
    setValues({ ...values, error: false, [value]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true,
            });
          });
        }
      })
      .catch((error) => console.log("Signin failed!! "));
  };

  // redirecting a user
  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  // Loading message for client
  const loadingMessage = () => {
    return (
      loading && (
        <div className="row">
          <div className="col-md-4 offset-sm-4 text-center">
            <div className="alert alert-info">Loading...</div>
          </div>
        </div>
      )
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
            Failed to login !! {error}
          </div>
        </div>
      </div>
    );
  };

  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-4 offset-sm-4 text-left">
          <form>
            <div className="form-group mt-3">
              <label className="text-light">Email</label>
              <input
                className="form-control"
                onChange={handleChange("email")}
                value={email}
                type="email"
              />
            </div>
            <div className="form-group mt-3">
              <label className="text-light">Password</label>
              <input
                className="form-control"
                onChange={handleChange("password")}
                value={password}
                type="password"
              />
            </div>
            <div class="d-grid gap-2 col-6 mx-auto mt-3">
              <button
                class="btn bg-purple text-white "
                onClick={onSubmit}
                type="button"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="Sign In page">
      {loadingMessage()}
      {errorMessage()}
      {signInForm()}
      {performRedirect()}
      <p className="text-white text-center">{JSON.stringify(values)}</p>
    </Base>
  );
};

export default Signin;

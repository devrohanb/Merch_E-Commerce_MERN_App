import React, { useState } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { createCategory } from "./helper/adminapicall";

const AddCategory = () => {
  // States
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  // Destructuring from isAuthenticated
  const { user, token } = isAuthenticated();

  const goBack = () => {
    return (
      <div className="mx-3 mt-3">
        <Link
          to="/admin/dashboard"
          className="btn btn-small bg-purple text-white mb-3"
        >
          Admin Dashboard
        </Link>
      </div>
    );
  };

  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    // backend request
    createCategory(user._id, token, { name })
      .then((data) => {
        if (data.error) {
          setError(true);
        } else {
          setError("");
          setSuccess(true);
          setName("");
        }
      })
      .catch((err) => console.error(err));
  };

  // Success message
  const successMessage = () => {
    if (success) {
      return (
        <div className="alert alert-success mt-3">
          Category Created Successfully
        </div>
      );
    }
  };

  // Warning message
  const warningMessage = () => {
    if (error) {
      return (
        <div className="alert alert-danger mt-3">
          Failed to create Category !!
        </div>
      );
    }
  };

  const myCategoryForm = () => {
    return (
      <div className="m-3">
        <form>
          <div className="form-group">
            <h4>Enter Category : </h4>
            <input
              id="inp_category"
              type="text"
              className="form-control my-3"
              onChange={handleChange}
              value={name}
              autoFocus
              required
              placeholder="Category"
            />
            <button onClick={onSubmit} className="btn bg-purple text-white">
              Create Category
            </button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <Base
      className="container p-4"
      title="Create Category"
      description="Add a new category"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {warningMessage()}
          {myCategoryForm()}
          {goBack()}
        </div>
      </div>
    </Base>
  );
};

export default AddCategory;

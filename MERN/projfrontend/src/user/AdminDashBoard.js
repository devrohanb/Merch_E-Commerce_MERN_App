import React from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper/index";
import { Link } from "react-router-dom";

const AdminDashBoard = () => {
  // Destructuring from isAutheticated (one level deep)
  const {
    user: { name, email, role },
  } = isAuthenticated();

  const adminLeftSide = () => {
    return (
      <div className="card border-none">
        <h4 className="card-header bg-purple text-white">Admin Navigation</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/admin/create/category" className="nav-link text-dark">
              Create category
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/create/product" className="nav-link text-dark">
              Create Product
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/products" className="nav-link text-dark">
              Manage Products
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/orders" className="nav-link text-dark">
              Manage Orders
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminRightSide = () => {
    return (
      <div className="card border-none">
        <h4 className="card-header bg-purple ">Application Details</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="badge bg-danger">Admin Area</span>
          </li>
          <li className="list-group-item">
            <span className="badge bg-purple mr-2">Name : </span> {name}
          </li>
          <li className="list-group-item">
            <span className="badge bg-purple mr-2">Email : </span> {email}
          </li>
        </ul>
      </div>
    );
  };

  return (
    <>
      <Base title="Admin Dashboard" description="Manage All you products here">
        <div className="row">
          <div className="col-3">{adminLeftSide()}</div>
          <div className="col-9">{adminRightSide()}</div>
        </div>
      </Base>
    </>
  );
};

export default AdminDashBoard;

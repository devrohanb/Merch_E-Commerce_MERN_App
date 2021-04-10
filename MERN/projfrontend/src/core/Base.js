import React from "react";

function Base({
  title = "My title",
  description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus soluta.",
  className = "bg-dark text-white p-4",
  children,
}) {
  return (
    <div>
      <div className="container-fluid">
        <div className="jumbotron bg-dark text-white text-center">
          <h2 className="display-4">{title}</h2>
          <p className="lead">{description}</p>
        </div>
        <div className={className}>{children}</div>
      </div>
      <footer className="footer bg-dark mt-auto py-3">
        <div className="container-fluid bg-success text-white text-center py-3">
          <h4>If you have any questions, feel free to react out. </h4>
          <button className="btn btn-warning btn-lg rounded">Contact Us</button>
        </div>
        <div className="container">
          <span className="text-muted">
            An Amazing <span className="text-white">MERN</span> Project
          </span>
        </div>
      </footer>
    </div>
  );
}

export default Base;
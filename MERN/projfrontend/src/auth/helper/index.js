import { API } from "../../backend";

// API = http://localhost:8000/api/

// Signup
export const signup = (user) => {
  return fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.error(err));
};

//Signin
export const signin = (user) => {
  return fetch(`${API}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.error(err));
};

// Authenticate
// Storing JWT into users local storage / browser
export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

// Signout
// It is easy we just have to remove JWT from local storage
export const signout = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    next();

    //hitting the signout route
    return fetch(`${API}/signout`, {
      method: "GET",
    })
      .then((response) => console.log("Signout successfully."))
      .cathc((err) => console.error(err));
  }
};

// isAuthenticated
export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    // chacking if stored JWT value and user passing JWT value is matching or not
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};

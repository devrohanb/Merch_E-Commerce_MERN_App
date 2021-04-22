import React from "react";
import "../styles.css";

import { API } from "../backend";
import Base from "./Base";

function Home() {
  console.log("API IS ", API);
  return (
    <Base title="Home Page" description="Welcome to the T-Shirt store">
      <h1 className="text-white">Home Component</h1>
    </Base>
  );
}

export default Home;

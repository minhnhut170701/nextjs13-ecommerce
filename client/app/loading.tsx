import React from "react";
import "../styles/custom.css";

const loading = () => {
  return <div className="loading-container">
            <p>☃️ Bạn đợi chút nhé</p>
            <div className="loader"></div>
        </div>;
};

export default loading;

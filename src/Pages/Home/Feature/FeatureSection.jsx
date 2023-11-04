import React, { useEffect } from "react";
import VanillaTilt from "vanilla-tilt";
import "./FeatureSection.css";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../AxiosAPI/axiosInstance";
import CustomLoading from "../../../Components/CustomLoading";

function FeatureSection({ feature }) {
  const { date, title, description, image } = feature;
  useEffect(() => {
    VanillaTilt.init(document.querySelectorAll(".card"), {
      glare: true,
      reverse: true,
      "max-glare": 0.5,
    });
  }, []);

  let cardStyle = {
    backgroundImage: `url(${image})`,
  };

  return (
    <div className="cards-container">
      <div className="card">
        <div style={cardStyle} className="card-image quiz-image"></div>
        <div className="card-text">
          <span className="date">{date}</span>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default FeatureSection;

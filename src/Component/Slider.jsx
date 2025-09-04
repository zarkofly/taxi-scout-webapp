
import React, { useEffect, useState, useRef } from "react";
import "./Slider.css";
import { useTranslation } from "react-i18next";
const Slider = ({ isLadyTaxi }) => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sliderRef = useRef(null);

  
  // Function to format image URLs
  const getImageUrl = (image) => {
    if (!image) return "https://via.placeholder.com/100?text=No+Image";
    const fileName = image.split("/").pop();
    return `https://admin.taxiscout24.com/storage/uploads/user/profile-picture/${fileName}`;
  };
  const { t } = useTranslation();
  // Fetch data from the API
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch("https://admin.taxiscout24.com/storage/partners.php");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        // Duplicate data for seamless looping
        setCompanies([...(data.data || []), ...(data.data || [])]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-4">Error: {error}</div>;
  }

  if (companies.length === 0) {
    return <div className="text-center py-4">No companies available</div>;
  }

  return (
    <div className="slider-container">
      <h2 className="slider-title">{t("our_partners")}</h2>
      <div className="slider-wrapper">
        {companies.map((company, index) => (
          <div key={`${company.id}-${index}`} className="slider-slide">
            <img
              src={getImageUrl(company.image)}
              alt={company.company_name}
              className="slider-image"
              onError={(e) => (e.target.src = "https://via.placeholder.com/100?text=Image+Error")}
            />
            <p className="slider-caption">{company.company_name}</p>
          </div>
        ))}
      </div>
      <button className="slider-button prev">&larr;</button>
      <button className="slider-button next">&rarr;</button>
    </div>
  );
};


export default Slider;

import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Skeleton } from "antd";
import { useTranslation } from "react-i18next";
import { LadyTaxiContext } from "./LadyTaxiContext"; // Pretpostavlja se da je u src/Component

const Our_Partner = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [partners, setPartners] = useState([]);
  const { isLadyTaxi } = useContext(LadyTaxiContext); // Koristi LadyTaxiContext, ukloni setIsLadyTaxi ako nije potreban

  const url = "https://admin.taxiscout24.com/storage/partners.php"; // PHP API

  useEffect(() => {
    const handlePartner = async () => {
      try {
        setLoading(true);
        const response = await axios.get(url);
        if (response && response.data && response.data.data) {
          setPartners(response.data.data);
        }
      } catch (error) {
        console.error("Greška pri učitavanju partnera:", error);
      } finally {
        setLoading(false);
      }
    };
    handlePartner();
  }, []);

  const getImageUrl = (image) => {
    if (!image) return ""; // ako nema slike
    const fileName = image.split("/").pop(); // uzmi samo ime fajla
    return `https://admin.taxiscout24.com/storage/uploads/user/profile-picture/${fileName}`;
  };

  return (
    <>
      {loading ? (
        <div className="container mx-auto px-0 sm:px-2">
          <Skeleton active />
        </div>
      ) : (
     
        <div className={`flex flex-col items-center justify-center ${isLadyTaxi ? "bg-pink-500/30" : "bg-white"}`}>
          {/* Naslov */}
          <div className="p-5 h-1/2 grid grid-cols-1 mt-16 sm:grid-cols-1">
            <div>
              <div className="flex flex-col justify-center gap-10">
                <div className="font-semibold text-center">
                  <h1>{t("our_partners")}</h1>
                </div>
              </div>
              <div>
                <div className="font-bold text-center text-xl">
                  <span>{t("partners_text1")}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Lista partnera */}
          <div className="w-fit grid place-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-2 justify-center">
            {partners.map(({ id, company_name, phone, image }) => (
              <div
                className="overflow-hidden rounded shadow-lg bg-white p-4 w-72"
                key={id}
              >
                {/* Logo */}
                <img
                  className="w-full h-52 object-contain mb-4"
                  src={getImageUrl(image)}
                  alt={company_name}
                />
                {/* Ime firme */}
                <h2 className="text-lg font-semibold text-center">
                  {company_name}
                </h2>
                {/* Broj telefona */}
                <p className="text-center text-gray-600">{phone}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Our_Partner;

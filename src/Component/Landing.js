import React, { useContext, useEffect, useState } from "react";
import InputItem from "./InputItem";
import LocationButton from "./LocationButton";
import { useNavigate } from "react-router-dom";
import banner from "../Images/3adb4519-1285-4d49-89ac-fae6820278d2.avif";
import taxi from "../Images/taxi.png";
import { SourceContext } from "../Context/SourceContext";
import { DestinationContext } from "../Context/DestinationContext";
import CarListOption from "./CarListOption";
import bg_1 from "../Images/header_image.png";
import bg_2 from "../Images/IMG-20241005-WA0037.jpg";
import bg_3 from "../Images/IMG-20241005-WA0039.jpg";
import bg_4 from "../Images/IMG-20241027-WA0004.jpg";
import bg_5 from "../Images/serve_globally2.jpg";
import bg_22 from "../Images/widget1img1.jpg";
import bg_11 from "../Images/widget1img2.jpg";
import bg_01 from "../Images/slika1.jpg";
import bg_31 from "../Images/slika2.jpg";
import bg_21 from "../Images/slika3.jpg";
import city from "../Images/footer_city.png";
import app_store from "../Images/app-store-live.jpg";
import google_play from "../Images/play-store-live.jpg";
import bgImage from "../Images/map_bg.jpg";
import ChatPopup from "./chatPopup";
import AppDownloadButtons from "./AppDownloadButtons";
import { useTranslation } from "react-i18next";
import { toast, ToastContainer } from "react-toastify";
import LoginPopup from "./LoginPopup";
import "./landing.css";

const Landing = () => {
  
  const { t } = useTranslation();
  const [distance, setDistance] = useState();
  const [carFetchFunc, setCarFetchFunc] = useState(null);
  const [hoverSection, setHoverSection] = useState(null); // State to track hover section

  const [options, setOptions] = useState({
    option1: null,
    option2: null,
    option3: null,
    option4: null,
  });
  const handleCheckboxChange = (option) => {
    setOptions({
      ...options,
      [option]: !options[option],
    });
  };
  const [showPopup, setShowPopup] = useState(true);
  const { source, setSource } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext);
  const [address, setAddress] = useState("");
  const calculateDistance = () => {
    const distance =
      window.google.maps.geometry.spherical.computeDistanceBetween(
        { lat: source.lat, lng: source.lng },
        { lat: destination.lat, lng: destination.lng }
      );
    setDistance(distance * 0.000621374);
    setCarFetchFunc(true);
  };
  const token = sessionStorage.getItem("token");
  const history = useNavigate();
  const handleRedirect = () => {
    token != null || undefined ? history("/home") : history("/login");
  };
  const content = [
    {
      number: "01",
      title: t("doNotCall"),
      text: t("doNotCallDescription")
    },
    {
      number: "02",
      title: t("noExtraWaitingTime"),
      text: t("noExtraWaitingTimeDescription")
    },
    {
      number: "03",
      title: t("clearAndTransparent"),
      text: t("clearAndTransparentDescription")
    },
    {
      number: "04",
      title: t("specialRequests"),
      text: t("specialRequestsDescription")
    },
    {
      number: "05",
      title: t("paymentOptions"),
      text: t("paymentOptionsDescription")
    }
  ];
  

  return (
    <>
      {showPopup && <LoginPopup onClose={() => setShowPopup(false)} />}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
      <div className="bg-gray-100 pt-3 sm:pt-5 sm:mt-0 md:py-1">
        <div className="pb-5 sm:pb-6 md:container px-2 flex justify-center items-center gap-10 container">
          <div className="px-2 flex flex-col-reverse justify-center items-center lg:container lg:w-1/2 lg:flex-col gap-3">
            <div className="flex flex-col">
              <h1 className="uppercase font-semibold text-lg sm:text-xl md:text-2xl lg:text-4xl">
                {t(`landing.title1.1`)}
              </h1>
              <p className="px-4 text-justify text-xs sm:px-20 sm:text-md md:text-xl lg:px-10 lg:text-xl">
                {t("description")}
              </p>
            </div>
            <div className="w-4/5 p-3 border-2 border-black rounded-lg bg-white">
              <div id="upper-box">
                <img
                  src={taxi}
                  alt="taxi"
                  className="w-10 lg:w-20 object-cover rounded-lg"
                />
                <span className="text-2xl font-semibold">{t("ride")}</span>
                <div className="bg-black h-1 w-10"></div>
              </div>
              <div className="">
                <div className="text-sm sm:text-2xl lg:text-4xl font-semibold">
                  {t("requestRide")}
                </div>
                <div>
                  <div className="flex flex-col h-full w-full gap-2">
                    {/* Source Input Field */}
                    <div className="flex flex-row items-center gap-2">
                      <div className="flex-1">
                        <InputItem type="source" />
                      </div>
                      <div className="translate-x-[-2.5rem]">
                        <LocationButton setAddress={setAddress} />
                      </div>
                    </div>

                    {/* Destination Input Field */}
                    <div className="flex flex-row items-center gap-2">
                      <div className="flex-1">
                        <InputItem type="destination" />
                      </div>
                      <div className="opacity-0 invisible">
                        <LocationButton setAddress={setAddress} />
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  id="btn_hover_main"
                  className="w-1/2 my-2 px-10 py-2 font-semibold rounded-lg bg-black text-white hover:bg-white hover:text-black"
                  onClick={handleRedirect}
                >
                  {t("searchButton")}
                </button>
              </div>
            </div>
          </div>

          <div
            className="hidden xl:block items-center justify-center xl:w-1/2"
          >
            <img
              className="rounded-lg w-3/5 slika"
              
              src={bg_1}
            ></img>
         <div className="flex flex-row justify-center items-center gap-4">
  <a href="https://play.google.com/store/apps/details?id=com.taxiscout.driver" target="_blank" rel="noopener noreferrer">
    <img className="p-0 m-0 w-40 sm:w-52 h-fit hover:cursor-pointer" src={google_play} alt="Google Play Store" />
  </a>
  <a href="https://apps.apple.com/ch/app/taxiscout24-fahrer-mehrfahrten/id6736903762" target="_blank" rel="noopener noreferrer">
  <img className="p-0 m-0 w-40 sm:w-52 h-fit hover:cursor-pointer" src={app_store} alt="App Store" />
  </a>
</div>

          </div>



        </div>

        {/* New Widget Section */}
        <div className="bg-white flex justify-center items-center">
  <div className="flex w-full bg-white">
    <img
      src={hoverSection === "taxifahrer" ? bg_22 : bg_11}
      alt="Left Image"
      className="w-1/2 h- object-cover"
    />
    <div className="w-1/2 flex flex-row gap-4 p-4">
      <div
        className={`p-4 cursor-pointer ${
          hoverSection === "kunde" ? "bg-[#fae914]" : "bg-white"
        } transition-colors duration-300 flex-1 flex flex-col items-center`}
        onMouseEnter={() => setHoverSection("kunde")}
        onMouseLeave={() => setHoverSection(hoverSection)}
      >
        <i className="fas fa-user fa-3x mb-2"></i>
        <h2 className="text-lg font-semibold razmakg">{t("home_text1")}</h2>
        <p className="text-sm razmakg">{t("home_text3")}</p>
        <div
          className={`mt-2 w-10 h-10 rounded-full razmakg flex items-center justify-center ${
            hoverSection === "kunde"
              ? "bg-[#fae914] text-white"
              : "bg-white text-black"
          } transition-colors duration-300`}
        >
          <i className="fas fa-arrow-right velicinaf"></i>
        </div>
      </div>
      <div
        className={`p-4 cursor-pointer ${
          hoverSection === "taxifahrer" ? "bg-[#fae914]" : "bg-white"
        } transition-colors duration-300 flex-1 flex flex-col items-center`}
        onMouseEnter={() => setHoverSection("taxifahrer")}
        onMouseLeave={() => setHoverSection(hoverSection)}
      >
        <i className="fas fa-taxi fa-3x mb-2"></i>
        <h2 className="text-lg font-semibold razmakg">{t("home_text2")}</h2>
        <p className="text-sm razmakg" >{t("home_text4")}</p>
        <div
          className={`mt-2 w-10 h-10 rounded-full  razmakg flex items-center justify-center ${
            hoverSection === "taxifahrer"
              ? "bg-[#fae914] text-white"
              : "bg-white text-black"
          } transition-colors duration-300`}
        >
          <i className="fas fa-arrow-right velicinaf"></i>
        </div>
      </div>
      <div className="flex-1 bg-white"></div>
    </div>
  </div>
</div>
<div
  className="bg-gray-100 pt-3 sm:pt-4 rounded-2xl flex flex-col justify-center items-center"
  style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
>
 <div className="max-w-8xl w-full px-6 py-20 text-black space-y-28 ">


  {/* Gornji red – 3 kolone */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:w-5/5 mx-[15%]">


      {[0, 1, 2].map((i) => (
        <div key={i} className="relative text-center">
          <div className="relative">
            <div className="text-9xl font-extrabold text-[#fae914]">
              {content[i].number}
            </div>
            <h3 className="absolute inset-0 flex items-center justify-center font-bold uppercase text-[19px] text-black whitespace-nowrap px-2">
  {content[i].title}
</h3>


          </div>
          <p className="mt-8 text-base">{content[i].text}</p>
        </div>
      ))}
    </div>

{/* Donji red – 2 kolone */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:w-5/5 mx-[25%]">


      {[3, 4].map((i) => (
        <div key={i} className="relative text-center">
          <div className="relative">
            <div className="text-9xl font-extrabold text-[#fae914]">
              {content[i].number}
            </div>
            <h3 className="absolute inset-0 flex items-center justify-center font-bold uppercase text-[19px] text-black whitespace-nowrap px-2">
  {content[i].title}
</h3>
          </div>
          <p className="mt-8 text-base">{content[i].text}</p>
        </div>
      ))}
    </div>
  </div>
</div>
<div className="bg-white py-10 flex justify-center items-center relative">
  <div className="container mx-auto px-4 flex flex-col md:flex-row items-start w-full">
    {/* Left Section (3/5 width, divided into two parts) */}
<div className="w-full md:w-3/5 flex flex-col md:flex-row gap-4">
  {/* Left Part (Two Images Stacked) */}
  <div className="w-full md:w-1/2 flex flex-col gap-4 relative">
  <img
    src={bg_01}
    alt="Taxi Booking"
    className="rounded-lg object-cover w-full h-[400px] md:h-[600px] absolute top-[-200px] z-10"
  />
<img
  src={bg_21}
  alt="Mobile App"

 className="rounded-lg object-cover w-80 h-80 md:h-60 relative z-0 mt-[370px] md:mt-[420px] self-end"
/>

</div>

  {/* Right Part (One Image aligned to right and top, 5px from bg_21) */}
  <div className="w-full md:w-1/2 flex justify-end items-start">
    <img src={bg_31} alt="Wheelchair Access" className="rounded-lg object-cover h-48 md:h-[40rem]" />
  </div>
</div>

    {/* Right Section (2/5 width) */}
    <div className="w-full h-full  md:w-2/5 flex justify-center items-center ml-4 md:ml-6">
  <div className="text-center md:text-left max-w-md">
    <h2 className="text-3xl font-bold mb-4">ORDER TAXI TODAY</h2>
    <p className="text-gray-600 mb-4">
      With the taxiout app, you can travel safely from A to B – wherever you are. Are
      you traveling by wheelchair or need help elsewhere? No problem, we take your
      individual requests into account.
    </p>
    <button className="bg-yellow-400 text-black font-semibold py-2 px-6 rounded-lg hover:bg-yellow-500">
      LEARN MORE
    </button>
  </div>
</div>

  </div>
</div>
<div className="bg-white  w-full  flex justify-center items-center">
  <img src={city} alt="TaxiScout24" className="max-w-full h-auto" />
</div>

        <AppDownloadButtons />
      </div>
    </>
  );
};

export default Landing;

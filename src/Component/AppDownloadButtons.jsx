import React, { useState } from "react";
import appStore from "../Images/app_store.png";
import googlePlay from "../Images/google_play.png";
import olaIcon from "../Images/logo2.png"; // Update this with your actual logo path

const AppDownloadButtons = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null); // store full app object

  const handleOpenPopup = (app) => {
    setSelectedApp(app);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedApp(null);
  };
  
  const appCards = [
    {
      id: "user",
      title: "TaxiScout User",
      description: "Your smart way to get a ride",
      icon: olaIcon,
      appStoreUrl: "https://apps.apple.com/ch/app/taxiscout24-user/id6738945898",
      playStoreUrl: "https://play.google.com/store/apps/details?id=com.taxiscout.user",
    },
    {
      id: "driver",
      title: "TaxiScout Driver",
      description: "The modern way to connect with passengers",
      icon: olaIcon,
      appStoreUrl: "https://apps.apple.com/ch/app/taxiscout24-driver/id6736903762",
      playStoreUrl: "https://play.google.com/store/apps/details?id=com.taxiscout.driver",
    },
  ];
  

  return (
    <div className="py-10 bg-white flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8 text-center">
      Download our apps to get the best experience
      </h1>

      <div className="flex flex-wrap gap-6 justify-center">
        {appCards.map((app) => (
          <div
            key={app.id}
            onClick={() => handleOpenPopup(app)}
            className="cursor-pointer bg-yellow-100 transition rounded-lg shadow-md p-6 w-72 flex flex-col justify-between"
          >
            <div className="flex items-center gap-4">
              <img src={app.icon} alt={`${app.title} Icon`} className="w-12 h-12 rounded" />
              <div>
                <h2 className="font-semibold text-xl">{app.title}</h2>
                <p className="text-sm text-gray-700 mt-1">{app.description}</p>
              </div>
            </div>
            <div className="text-right mt-4 text-xl font-bold">→</div>
          </div>
        ))}
      </div>

      {/* Modal Popup */}
      {showPopup && selectedApp && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-2xl w-96 relative">
      {/* Close Button */}
      <button
        onClick={handleClosePopup}
        className="absolute top-3 right-3 text-gray-500 text-xl font-bold hover:text-black"
      >
        ×
      </button>

      {/* Title */}
      <h2 className="text-lg font-semibold text-black mb-2">
        Get {selectedApp.title} app on
      </h2>

      {/* Subheading */}
      <p className="text-sm text-gray-700 mb-5">
        Download the {selectedApp.title} today for a 100% mobile experience. Available on iOS and Android.
      </p>

      {/* Store Buttons */}
      <div className="flex justify-center items-center gap-4">
        <a
          href={selectedApp.appStoreUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={appStore}
            alt="App Store"
            className="w-32 hover:scale-105 transition-transform"
          />
        </a>
        <a
          href={selectedApp.playStoreUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={googlePlay}
            alt="Google Play"
            className="w-32 hover:scale-105 transition-transform"
          />
        </a>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default AppDownloadButtons;

import React, { useContext, useEffect, useRef, useState } from "react";
import "./signup.css";
import img from "../Images/user.jpg";
import img1 from "../Images/logo.png";
import { useTranslation } from "react-i18next";
import { loadStripe } from "@stripe/stripe-js"; // Import Stripe
import { Space } from "antd";

// Initialize Stripe with your public key
const stripePromise = loadStripe("pk_test_51O9jy1GfF3OAAcfctj2mX8cH68Zy92PlUW0Ougdbcd12z3P6K8UdRIWIkxcaaIbwESILwaqqMBWu4vfKsSCFab6U00Mgfid3sa");
const SignupPage = () => {
  let url = "https://admin.taxiscout24.com/";
  const { t } = useTranslation();
  const [selectedPackageId, setSelectedPackageId] = useState(1);
  const [activeStep, setActiveStep] = useState(0);
  const [isLoadingPayment, setIsLoadingPayment] = useState(false); // New state for payment loading
  const [driverName, setDriverName] = useState("");
  const [driverEmail, setDriverEmail] = useState("");
  const [driverPhone, setDriverPhone] = useState("");
  const [driverImage, setDriverImage] = useState(null);
  const [companyImage, setCompanyImage] = useState(null);
  const [licenseFrontImage, setLicenseFrontImage] = useState(null);
  const [licenseBackImage, setLicenseBackImage] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [vehicleType, setVehicleType] = useState("");
  const [seatsCount, setSeatsCount] = useState("");
  const [luggageCount, setLuggageCount] = useState("");
  const [childSeat, setChildSeat] = useState(false);
  const [wheelchairAccessible, setWheelchairAccessible] = useState(false);
  const [petsAllowed, setPetsAllowed] = useState(false);
  const [trafficLicenseImage, setTrafficLicenseImage] = useState(null);
  const [carMake, setCarMake] = useState("");
  const [carMakes, setCarMakes] = useState([]);
  const [carMakesLoading, setCarMakesLoading] = useState(false); // New loading state
  const [carMakesError, setCarMakesError] = useState(null); // New error state
  const [errors, setErrors] = useState({});
  const [companyName, setCompanyName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [startCena, setStartCena] = useState("");
  const [cenaTarifa1, setCenaTarifa1] = useState("");
  const [startVremeTarifa1, setStartVremeTarifa1] = useState("");
  const [krajVremeTarifa1, setKrajVremeTarifa1] = useState("");
  const [cenaTarifa2, setCenaTarifa2] = useState("");
  const [startVremeTarifa2, setStartVremeTarifa2] = useState("");
  const [krajVremeTarifa2, setKrajVremeTarifa2] = useState("");
  const [showNum, setShowNum] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [showPackage, setShowPackage] = useState(false);
  const [showStart, setShowStart] = useState(true);
  const [showInfoReg, setShowInfoReg] = useState(false);
  const [showInfoDriver, setShowInfoDriver] = useState(false);
  const [showInfoVehicle, setShowInfoVehicle] = useState(false);
  const [showPrice, setShowPrice] = useState(false);
  const [image, setImage] = useState(null);
  const [selectedState, setSelectedState] = useState("");
  const [STATE, setSTATE] = useState([]);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userConfirmPassword, setUserConfirmPassword] = useState("");
  const [userMobile, setUserMobile] = useState("");
  const [userProfilePicture, setUserProfilePicture] = useState(null);
  const [userErrors, setUserErrors] = useState({});
  const [showOTPForm, setShowOTPForm] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [isCompanyRegistration, setIsCompanyRegistration] = useState(false);
  const [imageError, setImageError] = useState({});
// Map package IDs to prices (in EUR)
const packagePrices = {
  1: 0, // Free package
  2: 89, // Small to Mid-Sized
  3: 199, // Mid to Large
  4: 289, // Large
};
  const validateImageFile = (file) => {
    if (!file) {
      return { valid: false, error: t("no_file_selected") };
    }
    if (file.size === 0) {
      return { valid: false, error: t("empty_file") };
    }
    if (file.size > 5 * 1024 * 1024) {
      return { valid: false, error: t("image_too_large") };
    }
    const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!validImageTypes.includes(file.type)) {
      return { valid: false, error: t("invalid_image_format") };
    }
    const validExtensions = [".jpg", ".jpeg", ".png", ".gif"];
    const fileExtension = file.name.toLowerCase().slice(file.name.lastIndexOf("."));
    if (!validExtensions.includes(fileExtension)) {
      return { valid: false, error: t("invalid_image_extension") };
    }
    return { valid: true, error: "" };
  };

  const isValidBase64Image = (data) => {
    return typeof data === "string" && data.startsWith("data:image/");
  };

  const handleFileChange1 = (e, type) => {
    const file = e.target.files[0];
    setImageError((prev) => ({ ...prev, [type]: "" }));
    const validation = validateImageFile(file);
    if (!validation.valid) {
      setImageError((prev) => ({ ...prev, [type]: validation.error }));
      return;
    }

    console.log(`Processing file for ${type}:`, { name: file.name, type: file.type, size: file.size });

    try {
      const objectUrl = URL.createObjectURL(file);
      setTrafficLicenseImage(objectUrl);
    } catch (error) {
      console.error(`Error creating object URL for ${type}:`, error);
      setImageError((prev) => ({ ...prev, [type]: t("invalid_image_data") }));
    }
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    setImageError((prev) => ({ ...prev, [type]: "" }));
    const validation = validateImageFile(file);
    if (!validation.valid) {
      setImageError((prev) => ({ ...prev, [type]: validation.error }));
      return;
    }

    console.log(`Processing file for ${type}:`, { name: file.name, type: file.type, size: file.size });

    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.error) {
        console.error(`FileReader error for ${type}:`, reader.error);
        setImageError((prev) => ({ ...prev, [type]: t("invalid_image_data") }));
        return;
      }
      const result = reader.result;
      console.log(`Base64 length for ${type}:`, result.length);
      switch (type) {
        case "driver":
          setDriverImage(result);
          break;
        case "licenseFront":
          setLicenseFrontImage(result);
          break;
        case "licenseBack":
          setLicenseBackImage(result);
          break;
          case "trafficLicense":
            setTrafficLicenseImage(result);
            break;
            case "companyImage":
              setImage(result);
              break;
        default:
          break;
      }
    };
    reader.onerror = () => {
      console.error(`FileReader onerror for ${type}`);
      setImageError((prev) => ({ ...prev, [type]: t("invalid_image_data") }));
    };
    reader.onabort = () => {
      console.error(`FileReader aborted for ${type}`);
      setImageError((prev) => ({ ...prev, [type]: t("file_read_aborted") }));
    };
    try {
      reader.readAsDataURL(file);
    } catch (error) {
      console.error(`Error reading file for ${type}:`, error);
      setImageError((prev) => ({ ...prev, [type]: t("invalid_image_data") }));
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageError((prev) => ({ ...prev, companyImage: "" }));
    const validation = validateImageFile(file);
    if (!validation.valid) {
      setImageError((prev) => ({ ...prev, companyImage: validation.error }));
      return;
    }

    console.log("Processing company image:", { name: file.name, type: file.type, size: file.size });

    try {
      const objectUrl = URL.createObjectURL(file);
      setImage(objectUrl);
    } catch (error) {
      console.error("Error creating object URL for company image:", error);
      setImageError((prev) => ({ ...prev, companyImage: t("invalid_image_data") }));
    }
  };

  const handleUserImageChange = (event) => {
    const file = event.target.files[0];
    setImageError((prev) => ({ ...prev, userImage: "" }));
    const validation = validateImageFile(file);
    if (!validation.valid) {
      setImageError((prev) => ({ ...prev, userImage: validation.error }));
      return;
    }

    console.log("Processing user image:", { name: file.name, type: file.type, size: file.size });

    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.error) {
        console.error("FileReader error for user image:", reader.error);
        setImageError((prev) => ({ ...prev, userImage: t("invalid_image_data") }));
        return;
      }
      const result = reader.result;
      console.log("Base64 length for user image:", result.length);
      setUserProfilePicture(result);
      try {
        setImage(URL.createObjectURL(file));
      } catch (error) {
        console.error("Error creating object URL for user image:", error);
        setImageError((prev) => ({ ...prev, userImage: t("invalid_image_data") }));
      }
    };
    reader.onerror = () => {
      console.error("FileReader onerror for user image");
      setImageError((prev) => ({ ...prev, userImage: t("invalid_image_data") }));
    };
    reader.onabort = () => {
      console.error("FileReader aborted for user image");
      setImageError((prev) => ({ ...prev, userImage: t("file_read_aborted") }));
    };
    try {
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error reading file for user image:", error);
      setImageError((prev) => ({ ...prev, userImage: t("invalid_image_data") }));
    }
  };

  useEffect(() => {
    return () => {
      if (image) URL.revokeObjectURL(image);
      if (trafficLicenseImage) URL.revokeObjectURL(trafficLicenseImage);
    };
  }, [image, trafficLicenseImage]);

  const goShowStart = () => {
    setShowNum(false);
  };

  const handleTaxiClick = () => {
    setShowNum(true);
    setShowPackage(true);
    setShowStart(false);
    setActiveStep(0);
    setShowUser(false);
    setShowInfoReg(false);
    setShowInfoDriver(false);
    setShowInfoVehicle(false);
    setShowPrice(false);
  };

  const goToUser = () => {
    setShowUser(true);
    setShowStart(false);
    setIsCompanyRegistration(false);
  };

  const validateInfoReg = () => {
    const newErrors = {};
    if (!companyName) newErrors.companyName = t("field_required");
    if (!contactPerson) newErrors.contactPerson = t("field_required");
    if (!email) newErrors.email = t("field_required");
    if (!password) newErrors.password = t("field_required");
    if (!confirmPassword) newErrors.confirmPassword = t("field_required");
    if (password !== confirmPassword) newErrors.confirmPassword = t("passwords_must_match");
    if (!selectedState) newErrors.selectedState = t("field_required");
    if (!address) newErrors.address = t("field_required");
    if (!mobile) newErrors.mobile = t("field_required");
    if (!postalCode) newErrors.postalCode = t("field_required");
    if (!image) newErrors.image = t("field_required");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const goToInfo = () => {
    setShowNum(true);
    setShowInfoReg(true);
    setShowStart(false);
    setShowPackage(false);
    setActiveStep(1);
    setShowInfoDriver(false);
    setShowInfoVehicle(false);
    setShowPrice(false);
  };

  const validateInfoDriver = () => {
    const newErrors = {};
    if (!driverName) newErrors.driverName = t("field_required");
    if (!driverEmail) newErrors.driverEmail = t("field_required");
    if (!driverPhone) newErrors.driverPhone = t("field_required");
    if (!driverImage) newErrors.driverImage = t("field_required");
    if (!isValidBase64Image(driverImage)) newErrors.driverImage = t("invalid_image_data");
    if (!licenseFrontImage) newErrors.licenseFrontImage = t("field_required");
    if (!isValidBase64Image(licenseFrontImage)) newErrors.licenseFrontImage = t("invalid_image_data");
    if (!licenseBackImage) newErrors.licenseBackImage = t("field_required");
    if (!isValidBase64Image(licenseBackImage)) newErrors.licenseBackImage = t("invalid_image_data");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const goToDriver = () => {
    if (validateInfoReg()) {
      setShowNum(true);
      setShowInfoReg(false);
      setShowStart(false);
      setShowPackage(false);
      setShowInfoDriver(true);
      setShowInfoVehicle(false);
      setShowPrice(false);
      setActiveStep(2);
    }
  };

  const validateInfoVehicle = () => {
    const newErrors = {};
    if (!vehicleType) newErrors.vehicleType = t("field_required");
    if (!seatsCount) newErrors.seatsCount = t("field_required");
    if (!luggageCount) newErrors.luggageCount = t("field_required");
    if (!trafficLicenseImage) newErrors.trafficLicenseImage = t("field_required");
    if (!carMake) newErrors.carMake = t("field_required");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const goToVehicle = () => {
    if (validateInfoDriver()) {
      setShowNum(true);
      setShowInfoReg(false);
      setShowStart(false);
      setShowPackage(false);
      setShowInfoDriver(false);
      setShowInfoVehicle(true);
      setShowPrice(false);
      setActiveStep(3);
    }
  };

  const validatePrice = () => {
    const newErrors = {};
    if (!startCena) newErrors.startCena = t("field_required");
    if (!cenaTarifa1) newErrors.cenaTarifa1 = t("field_required");
    if (!startVremeTarifa1) newErrors.startVremeTarifa1 = t("field_required");
    if (!krajVremeTarifa1) newErrors.krajVremeTarifa1 = t("field_required");
    if (!cenaTarifa2) newErrors.cenaTarifa2 = t("field_required");
    if (!startVremeTarifa2) newErrors.startVremeTarifa2 = t("field_required");
    if (!krajVremeTarifa2) newErrors.krajVremeTarifa2 = t("field_required");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCompanyRegistration = async () => {
    if (!validatePrice()) {
      return;
    }
  
    const companyData = {
      action: "register",
      companyName,
      package_id: selectedPackageId,
      contactPerson,
      email,
      password,
      mobile,
      address,
      postalCode,
      country: selectedState,
      profile_picture: isValidBase64Image(image) ? image : null,
      driver: {
        name: driverName,
        email: driverEmail,
        phone: driverPhone,
        image: isValidBase64Image(driverImage) ? driverImage : null,
        licenseFront: isValidBase64Image(licenseFrontImage) ? licenseFrontImage : null,
        licenseBack: isValidBase64Image(licenseBackImage) ? licenseBackImage : null,
      },
      vehicle: {
        make: carMake,
        type: vehicleType,
        seats: seatsCount,
        luggage: luggageCount,
        childSeat,
        wheelchairAccessible,
        petsAllowed,
        trafficLicense: trafficLicenseImage,
      },
      pricing: {
        startCena,
        tarifa1: {
          cena: cenaTarifa1,
          startVreme: startVremeTarifa1,
          krajVreme: krajVremeTarifa1,
        },
        tarifa2: {
          cena: cenaTarifa2,
          startVreme: startVremeTarifa2,
          krajVreme: krajVremeTarifa2,
        },
      },
    };
  
    try {
      const response = await fetch("https://admin.taxiscout24.com/storage/registerCompany.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(companyData),
      });
  
      const result = await response.json();
      if (result.message) {
        alert("OTP sent to your email. Please verify.");
        setShowOTPForm(true);
        setShowPrice(false);
        setIsCompanyRegistration(true);
      } else {
        alert("Error7: " + (result.error || "Registration failed"));
      }
    } catch (error) {
      alert("Error1: " + error.message);
    }
  };
  const goToPrice = () => {
    if (validateInfoVehicle()) {
      setShowNum(true);
      setShowInfoReg(false);
      setShowStart(false);
      setShowPackage(false);
      setShowInfoDriver(false);
      setShowInfoVehicle(false);
      setShowPrice(true);
      setActiveStep(4);
    }
  };

  const validateUserForm = () => {
    const newErrors = {};
    if (!userName) newErrors.userName = t("field_required");
    if (!userEmail) newErrors.userEmail = t("field_required");
    if (!userPassword) newErrors.userPassword = t("field_required");
    if (!userConfirmPassword) newErrors.userConfirmPassword = t("field_required");
    if (userPassword !== userConfirmPassword) newErrors.userConfirmPassword = t("passwords_must_match");
    if (!selectedCountry) newErrors.selectedCountry = t("field_required");
    if (!userMobile) newErrors.userMobile = t("field_required");
    if (!userProfilePicture) newErrors.userProfilePicture = t("field_required");
    if (!isValidBase64Image(userProfilePicture)) newErrors.userProfilePicture = t("invalid_image_data");
    setUserErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUserRegistration = async () => {
    if (!validateUserForm()) {
      return;
    }

    const userData = {
      action: "register",
      name: userName,
      email: userEmail,
      password: userPassword,
      mobile: userMobile,
      country: selectedCountry,
      profile_picture: isValidBase64Image(userProfilePicture) ? userProfilePicture : null,
    };

    try {
      const response = await fetch("https://admin.taxiscout24.com/storage/register_user.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const result = await response.json();
      if (result.message) {
        alert("OTP sent to your email. Please verify.");
        setShowOTPForm(true);
        setShowUser(false);
      } else {
        alert("Error3: " + (result.error || "Registration failed"));
      }
    } catch (error) {
      alert("Error4: " + error.message);
    }
  };

  const handleOTPVerification = async () => {
    if (!otp || otp.length !== 6) {
      setOtpError(t("otp_required"));
      return;
    }
  
    const otpData = {
      action: "verify_otp",
      email: isCompanyRegistration ? email : userEmail,
      otp: otp,
    };
  
    try {
      const response = await fetch(
        isCompanyRegistration
          ? "https://admin.taxiscout24.com/storage/registerCompany.php"
          : "https://taxiscout.ch/zarkoPHP/register_user.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(otpData),
        }
      );
  
      const result = await response.json();
      if (result.message) {
        alert("Email verified successfully!");
  
        // Ako je company registration i paket nije besplatan (2, 3, ili 4), pokreni Stripe plaćanje
        if (isCompanyRegistration && selectedPackageId !== 1) {
          setIsLoadingPayment(true);
          try {
            const paymentResponse = await fetch("https://taxiscout.ch/zarkoPHP/create-checkout-session.php", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                cena: packagePrices[selectedPackageId],
                packageId: selectedPackageId,
                email: email, // Email za identifikaciju korisnika
              }),
            });
  
            const paymentResult = await paymentResponse.json();
            if (paymentResult.error) {
              alert("Error2: " + paymentResult.error);
              setIsLoadingPayment(false);
              return;
            }
  
            const stripe = await stripePromise;
            const { error } = await stripe.redirectToCheckout({
              sessionId: paymentResult.id,
            });
  
            if (error) {
              alert("Error redirecting to Stripe Checkout: " + error.message);
              setIsLoadingPayment(false);
            }
          } catch (error) {
            alert("Error creating Stripe session: " + error.message);
            setIsLoadingPayment(false);
          }
        } else {
          // Za besplatni paket (1) ili korisničku registraciju, završi proces
          alert("Registration completed successfully!");
          if (isCompanyRegistration) {
            setCompanyName("");
            setContactPerson("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setAddress("");
            setMobile("");
            setPostalCode("");
            setSelectedState("");
            setImage(null);
            setDriverName("");
            setDriverEmail("");
            setDriverPhone("");
            setDriverImage(null);
            setLicenseFrontImage(null);
            setLicenseBackImage(null);
            setVehicleType("");
            setSeatsCount("");
            setLuggageCount("");
            setChildSeat(false);
            setWheelchairAccessible(false);
            setPetsAllowed(false);
            setTrafficLicenseImage(null);
            setCarMake("");
            setStartCena("");
            setCenaTarifa1("");
            setStartVremeTarifa1("");
            setKrajVremeTarifa1("");
            setCenaTarifa2("");
            setStartVremeTarifa2("");
            setKrajVremeTarifa2("");
            setErrors({});
            setSelectedPackageId(1);
          } else {
            setUserName("");
            setUserEmail("");
            setUserPassword("");
            setUserConfirmPassword("");
            setUserMobile("");
            setSelectedCountry("");
            setUserProfilePicture(null);
            setImage(null);
          }
          setOtp("");
          setShowOTPForm(false);
          setShowStart(true);
          setIsCompanyRegistration(false);
        }
      } else {
        setOtpError(result.error || "Invalid OTP");
      }
    } catch (error) {
      setOtpError("Error: " + error.message);
    }
  };
  useEffect(() => {
    setActiveStep(0);
    setShowNum(false);
    setShowUser(false);
    setShowPackage(false);
    setShowStart(true);
    setShowInfoReg(false);
    setShowInfoDriver(false);
    setShowInfoVehicle(false);
    setShowPrice(false);
    setDriverName("");
    setDriverEmail("");
    setDriverPhone("");
    setDriverImage(null);
    setLicenseFrontImage(null);
    setLicenseBackImage(null);
    setSelectedCountry("");
    setVehicleType("");
    setSeatsCount("");
    setLuggageCount("");
    setChildSeat(false);
    setWheelchairAccessible(false);
    setPetsAllowed(false);
    setTrafficLicenseImage(null);
    setCarMake("");
    setImage(null);
    setSelectedState("");
    setCompanyName("");
    setContactPerson("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setAddress("");
    setMobile("");
    setPostalCode("");
    setStartCena("");
    setCenaTarifa1("");
    setStartVremeTarifa1("");
    setKrajVremeTarifa1("");
    setCenaTarifa2("");
    setStartVremeTarifa2("");
    setKrajVremeTarifa2("");
    setErrors({});
    setImageError({});
  }, []);

  useEffect(() => {
    const countryMethod = async () => {
      try {
        let response = await fetch(`${url}api/v1/countries`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        let data = await response.json();
        setCountries(data.data);
      } catch (err) {
        console.error("Error fetching countries:", err);
      }
    };
    countryMethod();

    const stateMethod = async () => {
      try {
        let response = await fetch(`${url}api/v1/servicelocation`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        let data = await response.json();
        setSTATE(data.data);
      } catch (err) {
        console.error("Error fetching service locations:", err);
      }
    };
    stateMethod();

    const carMakesMethod = async () => {
      setCarMakesLoading(true);
      setCarMakesError(null);
      try {
        let response = await fetch(`${url}api/v1/common/car/makes`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        let data = await response.json();
        console.log("Car makes API response:", data); // Debug the response
        // Adjust based on actual API response structure
        const makes = data.data || data.car_makes || data; // Fallback to handle different structures
        if (Array.isArray(makes)) {
          setCarMakes(makes);
        } else {
          throw new Error("Car makes data is not an array");
        }
      } catch (err) {
        console.error("Error fetching car makes:", err);
        setCarMakesError(t("failed_to_load_car_makes"));
      } finally {
        setCarMakesLoading(false);
      }
    };
    carMakesMethod();
  }, [url, t]);

  return (
    <>
      <div className="glavna">
        {showNum && (
          <div className="container spad" style={{ marginTop: "100px" }}>
            <div className="container1">
              <div
                className={`circle ${activeStep >= 1 ? "completed" : "first-circle"}`}
                id="num1"
              >
                {activeStep >= 1 ? (
                  <svg
                    className="h-6 w-6 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  "1"
                )}
              </div>
              <div
                className={`label ${activeStep >= 1 ? "text-green-500" : "first-label"}`}
                id="text1"
                onClick={handleTaxiClick}
              >
                Wählen
              </div>
              <div className="line" id="line2"></div>

              <div
                className={`circle ${activeStep >= 2 ? "completed" : ""}`}
                id="num2"
              >
                {activeStep >= 2 ? (
                  <svg
                    className="h-6 w-6 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  "2"
                )}
              </div>
              <div
                className={`label ${activeStep >= 2 ? "text-green-500" : ""}`}
                id="text2"
                onClick={goToInfo}
              >
                Firmeninfo
              </div>
              <div className="line"></div>

              <div
                className={`circle ${activeStep >= 3 ? "completed" : ""}`}
                id="num3"
              >
                {activeStep >= 3 ? (
                  <svg
                    className="h-6 w-6 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  "3"
                )}
              </div>
              <div
                className={`label ${activeStep >= 3 ? "text-green-500" : ""}`}
                id="text3"
                onClick={goToDriver}
              >
                Fahrerdaten
              </div>
              <div className="line"></div>

              <div
                className={`circle ${activeStep >= 4 ? "completed" : ""}`}
                id="num4"
              >
                {activeStep >= 4 ? (
                  <svg
                    className="h-6 w-6 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  "4"
                )}
              </div>
              <div
                className={`label ${activeStep >= 4 ? "text-green-500" : ""}`}
                id="text4"
                onClick={goToVehicle}
              >
                Fahrzeugdaten
              </div>
              <div className="line"></div>

              <div
                className={`circle ${activeStep >= 5 ? "completed" : ""}`}
                id="num5"
              >
                {activeStep >= 5 ? (
                  <svg
                    className="h-6 w-6 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  "5"
                )}
              </div>
              <div
                className={`label ${activeStep >= 5 ? "text-green-500" : ""}`}
                id="text5"
              >
                Fahrpreise
              </div>
            </div>
          </div>
        )}

        {showStart && (
          <div className="rounded-div" id="start" style={{ marginTop: "100px" }}>
            
            <div className="title">  {t("reg1_text")}</div>
            <div className="description">
            {t("reg2_text")}
            </div>

            <div className="button-container">
              <button className="signup-button" onClick={goToUser}>
                <img src={img} alt="User" className="button-icon" />
                Fahrgast
              </button>
              <button
                className="signup-button"
                onClick={() => {
                  handleTaxiClick();
                }}
              >
                <img src={img1} alt="Taxi Company" className="button-icon" />
                Taxiunternehmen
              </button>
            </div>
          </div>
        )}

        {showPackage && (
         <div className="rounded-div" id="paket"  style={{ height: '100%' }}>
  <section className="intro">
    <h1>TaxiScout24 – Paketübersicht (CHF)</h1>
    <p>Attraktive Preise und klare Vorteile für Schweizer Taxiunternehmen.</p>
    <p><strong>TaxiScout24</strong> – Die Schweizer Plattform für smarte Taxiunternehmen</p>
    <p>Mehr Fahrgäste, weniger Leerlauf. Verwalten Sie Fahrer, Fahrzeuge und Bestellungen – alles in einer App.</p>
    <p><strong>Jetzt starten – und mit Jahreszahlung bis zu CHF 600.– sparen!</strong></p>
  </section>

  <section className="pricing">
    {/* Paket 1: Starter */}
    <div className="plan">
      <h2>Starter 🟢</h2>
      <p className="price">CHF 1. <span class = "spanclass" >– / Monat</span><br /><span>CHF 1.– / Monat bei <br/> Jahreszahlung (CHF 12.– / Jahr)</span></p>
     
      <ul >
        <li>✅ 1 Fahrer</li>
        <li>✅ 1 Fahrzeug</li>
        <li>✅ App-Zugang</li>
        <li>❌ Erweiterte Berichte</li>
        <li>❌ Telefonischer Support</li>
        <li>❌ Individuelle Einrichtung</li>
        <li>❌ API / Drittanbieter</li>
      </ul >
      <div className="buttons">
  <button className="btn-monthly" onClick={() => { setSelectedPackageId(1); goToInfo(); }}>
  💳  Monatlich wählen
  </button>
  <button className="btn-yearly" onClick={() => { setSelectedPackageId(2); goToInfo(); }}>
  🎁  Jährlich wählen
  </button>
</div>
    </div>

    {/* Paket 2: Basic */}
    <div className="plan">
      <h2>Basic 🔵</h2>
      <p className="price">CHF 89.<span class = "spanclass" >– / Monat</span><br /><span>CHF 69.– / Monat bei <br/> Jahreszahlung (CHF 828.– / Jahr)</span></p>
      <ul>
        <li>✅ 5 Fahrer</li>
        <li>✅ 5 Fahrzeuge</li>
        <li>✅ App-Zugang</li>
        <li>✅ Erweiterte Berichte</li>
        <li>✅ Telefonischer Support</li>
        <li>❌ Individuelle Einrichtung</li>
        <li>❌ API / Drittanbieter</li>
      </ul>
      <div className="buttons">
  <button className="btn-monthly" onClick={() => { setSelectedPackageId(3); goToInfo(); }}>
  💳  Monatlich wählen
  </button>
  <button className="btn-yearly" onClick={() => { setSelectedPackageId(4); goToInfo(); }}>
  🎁 Jährlich wählen
  </button>
</div>
</div>

    {/* Paket 3: Pro */}
    <div className="plan">
      <h2>Pro 🟠</h2>
      <p className="price">CHF 199.<span class = "spanclass" >– / Monat</span><br /><span>CHF 149.– / Monat bei Jahreszahlung (CHF 1'788.– / Jahr)</span></p>
      <ul>
        <li>✅ 20 Fahrer</li>
        <li>✅ 20 Fahrzeuge</li>
        <li>✅ App-Zugang</li>
        <li>✅ Erweiterte Berichte</li>
        <li>✅ Telefonischer Support</li>
        <li>✅ Individuelle Einrichtung</li>
        <li>✅ API / Drittanbieter</li>
      </ul>
      <div className="buttons">
  <button className="btn-monthly" onClick={() => { setSelectedPackageId(5); goToInfo(); }}>
  💳  Monatlich wählen
  </button>
  <button className="btn-yearly" onClick={() => { setSelectedPackageId(6); goToInfo(); }}>
  🎁  Jährlich wählen
  </button>
</div>

    </div>

    {/* Paket 4: Enterprise */}
    <div className="plan">
      <h2>Enterprise 🔴</h2>
      <p className="price">CHF 289.<span class = "spanclass" >– / Monat</span><br /><span>CHF 229.– / Monat bei Jahreszahlung (CHF 2'748.– / Jahr)</span></p>
      <ul>
        <li>✅ 99 Fahrer</li>
        <li>✅ Unbegrenzte Fahrzeuge</li>
        <li>✅ App-Zugang</li>
        <li>✅ Erweiterte Berichte</li>
        <li>✅ Telefonischer Support</li>
        <li>✅ Individuelle Einrichtung</li>
        <li>✅ API / Drittanbieter</li>
      </ul>
      <div className="buttons">
  <button className="btn-monthly" onClick={() => { setSelectedPackageId(7); goToInfo(); }}>
  💳  Monatlich wählen
  </button>
  <button className="btn-yearly" onClick={() => { setSelectedPackageId(8); goToInfo(); }}>
  🎁  Jährlich wählen
  </button>
</div>
    </div>
  </section>
</div>

    
        )}

{showInfoReg && (
  <div className="rounded-div" id="infoReg">
    <div id="nekrektine2">
      <div className="title">Izaberite tip registracije</div>
      <div className="description">
        Ako ste taksi kompanija, registrujte se za korišćenje naše platforme.
      </div>
      <div className="form-container p-4 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              className={`input-field p-2 border rounded ${errors.companyName ? "border-red-500" : ""}`}
              placeholder={t("company_name")}
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
            {errors.companyName && <p className="text-red-500 text-sm">{errors.companyName}</p>}
          </div>
          <div>
            <input
              type="text"
              className={`input-field p-2 border rounded ${errors.contactPerson ? "border-red-500" : ""}`}
              placeholder={t("contact_person")}
              value={contactPerson}
              onChange={(e) => setContactPerson(e.target.value)}
            />
            {errors.contactPerson && <p className="text-red-500 text-sm">{errors.contactPerson}</p>}
          </div>
          <div>
            <input
              type="email"
              className={`input-field p-2 border rounded ${errors.email ? "border-red-500" : ""}`}
              placeholder={t("email")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div>
            <input
              type="password"
              className={`input-field p-2 border rounded ${errors.password ? "border-red-500" : ""}`}
              placeholder={t("password")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
          <div>
            <input
              type="password"
              className={`input-field p-2 border rounded ${errors.confirmPassword ? "border-red-500" : ""}`}
              placeholder={t("cpassword")}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
          </div>
          <div>
            <select
              id="countrySelect"
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className={`input-field p-2 border rounded ${errors.selectedState ? "border-red-500" : ""}`}
            >
              <option value="">{t("select_a_country")}</option>
              {STATE?.map((state, index) => (
                <option key={index} name="service_location_id" value={state.id}>
                  {state.name}
                </option>
              ))}
            </select>
            {errors.selectedState && <p className="text-red-500 text-sm">{errors.selectedState}</p>}
          </div>
          <div>
            <input
              type="text"
              className={`input-field p-2 border rounded ${errors.address ? "border-red-500" : ""}`}
              placeholder={t("address")}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
          </div>
          <div>
            <input
              type="text"
              className={`input-field p-2 border rounded ${errors.mobile ? "border-red-500" : ""}`}
              placeholder={t("mobile")}
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
            {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
          </div>
          <div>
            <input
              type="text"
              className={`input-field p-2 border rounded ${errors.postalCode ? "border-red-500" : ""}`}
              placeholder={t("postal_code")}
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
            {errors.postalCode && <p className="text-red-500 text-sm">{errors.postalCode}</p>}
          </div>
          <div className="col-span-2 flex items-center gap-4">
            <div className="flex-1">
              <label className="block mb-1 font-medium">Slika kompanije</label>
              <input
                type="file"
                accept="image/jpeg,image/png,image/gif"
                onChange={(e) => handleFileChange(e, "companyImage")} // Promenjeno sa handleImageChange
                className={`p-2 border rounded w-full ${errors.companyImage || imageError.companyImage ? "border-red-500" : ""}`}
              />
              {errors.companyImage && <p className="text-red-500 text-sm">{errors.companyImage}</p>}
              {imageError.companyImage && <p className="text-red-500 text-sm">{imageError.companyImage}</p>}
            </div>
            {companyImage && isValidBase64Image(companyImage) && (
              <img
                src={companyImage}
                alt="Slika kompanije"
                className="w-24 h-24 object-cover rounded-lg border"
                onError={() => setImageError((prev) => ({ ...prev, companyImage: t("failed_to_load_image") }))}
              />
            )}
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            onClick={goToDriver}
          >
            {t("next")}
          </button>
        </div>
      </div>
    </div>
  </div>
)}

        {showInfoDriver && (
          <div className="rounded-div" id="infoDriver">
            <div id="nekrektine2">
              <div className="title">Fahrerdaten eingeben</div>
              <div className="description">
                Bitte geben Sie die Informationen des Taxifahrers ein, einschließlich seines Namens, seiner E-Mail-Adresse, seiner Fahrerlaubnis und anderer relevanter Details.
              </div>
              <div className="form-container p-4 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      className={`input-field p-2 border rounded ${errors.driverName ? "border-red-500" : ""}`}
                      placeholder="Ime"
                      value={driverName}
                      onChange={(e) => setDriverName(e.target.value)}
                    />
                    {errors.driverName && <p className="text-red-500 text-sm">{errors.driverName}</p>}
                  </div>
                  <div>
                    <input
                      type="email"
                      className={`input-field p-2 border rounded ${errors.driverEmail ? "border-red-500" : ""}`}
                      placeholder="Email"
                      value={driverEmail}
                      onChange={(e) => setDriverEmail(e.target.value)}
                    />
                    {errors.driverEmail && <p className="text-red-500 text-sm">{errors.driverEmail}</p>}
                  </div>
                  <div>
                    <input
                      type="text"
                      className={`input-field p-2 border rounded ${errors.driverPhone ? "border-red-500" : ""}`}
                      placeholder="Broj telefona"
                      value={driverPhone}
                      onChange={(e) => setDriverPhone(e.target.value)}
                    />
                    {errors.driverPhone && <p className="text-red-500 text-sm">{errors.driverPhone}</p>}
                  </div>
                  <div className="col-span-2 flex items-center gap-4">
                    <div className="flex-1">
                      <label className="block mb-1 font-medium">Slika vozača</label>
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/gif"
                        onChange={(e) => handleFileChange(e, "driver")}
                        className={`p-2 border rounded w-full ${errors.driverImage || imageError.driver ? "border-red-500" : ""}`}
                      />
                      {errors.driverImage && <p className="text-red-500 text-sm">{errors.driverImage}</p>}
                      {imageError.driver && <p className="text-red-500 text-sm">{imageError.driver}</p>}
                    </div>
                    {driverImage && isValidBase64Image(driverImage) && (
                      <img
                        src={driverImage}
                        alt="Vozač"
                        className="w-24 h-24 object-cover rounded-lg border"
                        onError={() => setImageError((prev) => ({ ...prev, driver: t("failed_to_load_image") }))}
                      />
                    )}
                  </div>
                  <div className="col-span-2 flex items-center gap-4">
                    <div className="flex-1">
                      <label className="block mb-1 font-medium">Dozvola (prednja strana)</label>
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/gif"
                        onChange={(e) => handleFileChange(e, "licenseFront")}
                        className={`p-2 border rounded w-full ${errors.licenseFrontImage || imageError.licenseFront ? "border-red-500" : ""}`}
                      />
                      {errors.licenseFrontImage && (
                        <p className="text-red-500 text-sm">{errors.licenseFrontImage}</p>
                      )}
                      {imageError.licenseFront && <p className="text-red-500 text-sm">{imageError.licenseFront}</p>}
                    </div>
                    {licenseFrontImage && isValidBase64Image(licenseFrontImage) && (
                      <img
                        src={licenseFrontImage}
                        alt="Prednja strana dozvole"
                        className="w-24 h-24 object-cover rounded-lg border"
                        onError={() => setImageError((prev) => ({ ...prev, licenseFront: t("failed_to_load_image") }))}
                      />
                    )}
                  </div>
                  <div className="col-span-2 flex items-center gap-4">
                    <div className="flex-1">
                      <label className="block mb-1 font-medium">Dozvola (zadnja strana)</label>
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/gif"
                        onChange={(e) => handleFileChange(e, "licenseBack")}
                        className={`p-2 border rounded w-full ${errors.licenseBackImage || imageError.licenseBack ? "border-red-500" : ""}`}
                      />
                      {errors.licenseBackImage && (
                        <p className="text-red-500 text-sm">{errors.licenseBackImage}</p>
                      )}
                      {imageError.licenseBack && <p className="text-red-500 text-sm">{imageError.licenseBack}</p>}
                    </div>
                    {licenseBackImage && isValidBase64Image(licenseBackImage) && (
                      <img
                        src={licenseBackImage}
                        alt="Zadnja strana dozvole"
                        className="w-24 h-24 object-cover rounded-lg border"
                        onError={() => setImageError((prev) => ({ ...prev, licenseBack: t("failed_to_load_image") }))}
                      />
                    )}
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    className="bg-blue Organize-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                    onClick={goToVehicle}
                  >
                    {t("next")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showInfoVehicle && (
          <div className="rounded-div" id="infoVehicle">
            <div id="nekrektine2">
              <div className="title">Fahrzeugdaten</div>
              <div className="description">
                Bitte geben Sie alle relevanten Informationen zu dem Fahrzeug ein, das für den Taxidienst verwendet wird.
              </div>
              <div className="form-container p-4 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block mb-1 font-medium">Tip vozila</label>
                      <select
                        value={vehicleType}
                        onChange={(e) => setVehicleType(e.target.value)}
                        className={`input-field p-2 border rounded w-full ${
                          errors.vehicleType ? "border-red-500" : ""
                        }`}
                      >
                        <option value="">Select Vehicle Type</option>
                        <option value="Car">Car</option>
                        <option value="Van">Van</option>
                        <option value="MiniVan">MiniVan</option>
                        <option value="Handicap Car">Handicap Car</option>
                        <option value="Limousine">Limousine</option>
                        <option value="Long Limousine">Long Limousine</option>
                        <option value="Electric Car">Electric Car</option>
                      </select>
                      {errors.vehicleType && <p className="text-red-500 text-sm">{errors.vehicleType}</p>}
                    </div>
                    <div className="flex-1">
                      <label className="block mb-1 font-medium">Broj sedišta</label>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={seatsCount}
                        onChange={(e) => setSeatsCount(e.target.value)}
                        className={`input-field p-2 border rounded w-full ${
                          errors.seatsCount ? "border-red-500" : ""
                        }`}
                      />
                      {errors.seatsCount && <p className="text-red-500 text-sm">{errors.seatsCount}</p>}
                    </div>
                    <div className="flex-1">
                      <label className="block mb-1 font-medium">Broj kofera</label>
                      <input
                        type="number"
                        min="1"
                        max="50"
                        value={luggageCount}
                        onChange={(e) => setLuggageCount(e.target.value)}
                        className={`input-field p-2 border rounded w-full ${
                          errors.luggageCount ? "border-red-500" : ""
                        }`}
                      />
                      {errors.luggageCount && <p className="text-red-500 text-sm">{errors.luggageCount}</p>}
                    </div>
                  </div>
                  <div className="col-span-2">
                    <label className="block mb-1 font-medium">Marka vozila</label>
                    <select
                      value={carMake}
                      onChange={(e) => setCarMake(e.target.value)}
                      className={`input-field p-2 border rounded w-full ${
                        errors.carMake ? "border-red-500" : ""
                      }`}
                    >
                      <option value="">{t("select_a_car_make")}</option>
                      {carMakes?.map((make, index) => (
                        <option key={index} value={make.name}>
                          {make.name}
                        </option>
                      ))}
                    </select>
                    {errors.carMake && <p className="text-red-500 text-sm">{errors.carMake}</p>}
                  </div>
                  <div className="col-span-2">
                    <label className="block mb-1 font-medium">Opcije</label>
                    <div className="flex flex-col gap-4 justify-start">
                      <div>
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            checked={childSeat}
                            onChange={(e) => setChildSeat(e.target.checked)}
                            className="form-checkbox"
                          />
                          <span className="ml-2">Sediste za decu</span>
                        </label>
                      </div>
                      <div>
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            checked={wheelchairAccessible}
                            onChange={(e) => setWheelchairAccessible(e.target.checked)}
                            className="form-checkbox"
                          />
                          <span className="ml-2">Invalidska kolica</span>
                        </label>
                      </div>
                      <div>
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            checked={petsAllowed}
                            onChange={(e) => setPetsAllowed(e.target.checked)}
                            className="form-checkbox"
                          />
                          <span className="ml-2">Kućni ljubimci dozvoljeni</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2 flex items-center gap-4">
                    <div className="flex-1">
                      <label className="block mb-1 font-medium">Slika saobraćajne dozvole</label>
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/gif"
                        onChange={(e) => handleFileChange(e, "trafficLicense")}
                        className={`p-2 border rounded w-full ${
                          errors.trafficLicenseImage || imageError.trafficLicense ? "border-red-500" : ""
                        }`}
                      />
                      {errors.trafficLicenseImage && (
                        <p className="text-red-500 text-sm">{errors.trafficLicenseImage}</p>
                      )}
                      {imageError.trafficLicense && <p className="text-red-500 text-sm">{imageError.trafficLicense}</p>}
                    </div>
                    {trafficLicenseImage && (
                      <img
                        src={trafficLicenseImage}
                        alt="Saobraćajna dozvola"
                        className="w-24 h-24 object-cover rounded-lg border"
                        onError={() => setImageError((prev) => ({ ...prev, trafficLicense: t("failed_to_load_image") }))}
                      />
                    )}
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                    onClick={goToPrice}
                  >
                    Dalje
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

{showPrice && (
  <div className="rounded-div" id="infoPrice">
    <div id="nekrektine2">
      <div className="title">Fahrpreise eingeben</div>
      <div className="description">
        Tragen Sie hier den Startpreis und den Kilometerpreis für beide Tarife ein, die für Ihren Taxiservice gelten.
        {selectedPackageId !== 1 && (
          <p className="mt-2">You will be redirected to Stripe to complete the payment of {packagePrices[selectedPackageId]} EUR.</p>
        )}
      </div>
      <div className="form-container p-4 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
              <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2" htmlFor="startCena">
                    Start Cena
                  </label>
                  <input
                    type="number"
                    id="startCena"
                    name="startCena"
                    className={`w-full border rounded px-3 py-2 focus:outline-none ${
                      errors.startCena ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Unesite početnu cenu"
                    value={startCena}
                    onChange={(e) => setStartCena(e.target.value)}
                  />
                  {errors.startCena && <p className="text-red-500 text-sm">{errors.startCena}</p>}
             
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Tarifa 1</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  <div>
                    <input
                      type="number"
                      name="cenaTarifa1"
                      className={`border rounded px-3 py-2 w-full ${
                        errors.cenaTarifa1 ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Cena Tarife"
                      value={cenaTarifa1}
                      onChange={(e) => setCenaTarifa1(e.target.value)}
                    />
                    {errors.cenaTarifa1 && <p className="text-red-500 text-sm">{errors.cenaTarifa1}</p>}
                  </div>
                  <div>
                    <input
                      type="time"
                      name="startVremeTarifa1"
                      className={`border rounded px-3 py-2 w-full ${
                        errors.startVremeTarifa1 ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Start vreme"
                      value={startVremeTarifa1}
                      onChange={(e) => setStartVremeTarifa1(e.target.value)}
                    />
                    {errors.startVremeTarifa1 && (
                      <p className="text-red-500 text-sm">{errors.startVremeTarifa1}</p>
                    )}
                  </div>
                  <div>
                    <input
                      type="time"
                      name="krajVremeTarifa1"
                      className={`border rounded px-3 py-2 w-full ${
                        errors.krajVremeTarifa1 ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Kraj vreme"
                      value={krajVremeTarifa1}
                      onChange={(e) => setKrajVremeTarifa1(e.target.value)}
                    />
                    {errors.krajVremeTarifa1 && (
                      <p className="text-red-500 text-sm">{errors.krajVremeTarifa1}</p>
                    )}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Tarifa 2</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  <div>
                    <input
                      type="number"
                      name="cenaTarifa2"
                      className={`border rounded px-3 py-2 w-full ${
                        errors.cenaTarifa2 ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Cena Tarife"
                      value={cenaTarifa2}
                      onChange={(e) => setCenaTarifa2(e.target.value)}
                    />
                    {errors.cenaTarifa2 && <p className="text-red-500 text-sm">{errors.cenaTarifa2}</p>}
                  </div>
                  <div>
                    <input
                      type="time"
                      name="startVremeTarifa2"
                      className={`border rounded px-3 py-2 w-full ${
                        errors.startVremeTarifa2 ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Start vreme"
                      value={startVremeTarifa2}
                      onChange={(e) => setStartVremeTarifa2(e.target.value)}
                    />
                    {errors.startVremeTarifa2 && (
                      <p className="text-red-500 text-sm">{errors.startVremeTarifa2}</p>
                    )}
                  </div>
                  <div>
                    <input
                      type="time"
                      name="krajVremeTarifa2"
                      className={`border rounded px-3 py-2 w-full ${
                        errors.krajVremeTarifa2 ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Kraj vreme"
                      value={krajVremeTarifa2}
                      onChange={(e) => setKrajVremeTarifa2(e.target.value)}
                    />
                    {errors.krajVremeTarifa2 && (
                      <p className="text-red-500 text-sm">{errors.krajVremeTarifa2}</p>
                    )}
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
            onClick={handleCompanyRegistration}
            disabled={isLoadingPayment}
          >
            {isLoadingPayment ? "Processing..." : t("register")}
          </button>
        </div>
      </div>
    </div>
  </div>
)}

        {showUser && (
          <div className="rounded-div" id="infoUser" style={{ marginTop: "100px" }}>
            <div id="nekrektine2">
              <div className="title">Registrierungstyp auswählen</div>
              <div className="description">
                Wenn Sie ein Taxiunternehmen sind, registrieren Sie sich für die Nutzung unserer Plattform.
              </div>
              <div className="form-container p-4 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      className={`input-field p-2 border rounded ${userErrors.userName ? "border-red-500" : ""}`}
                      placeholder={t("name")}
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                    {userErrors.userName && <p className="text-red-500 text-sm">{userErrors.userName}</p>}
                  </div>
                  <div>
                    <input
                      type="email"
                      className={`input-field p-2 border rounded ${userErrors.userEmail ? "border-red-500" : ""}`}
                      placeholder={t("email")}
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                    />
                    {userErrors.userEmail && <p className="text-red-500 text-sm">{userErrors.userEmail}</p>}
                  </div>
                  <div>
                    <input
                      type="password"
                      className={`input-field p-2 border rounded ${userErrors.userPassword ? "border-red-500" : ""}`}
                      placeholder={t("password")}
                      value={userPassword}
                      onChange={(e) => setUserPassword(e.target.value)}
                    />
                    {userErrors.userPassword && (
                      <p className="text-red-500 text-sm">{userErrors.userPassword}</p>
                    )}
                  </div>
                  <div>
                    <input
                      type="password"
                      className={`input-field p-2 border rounded ${
                        userErrors.userConfirmPassword ? "border-red-500" : ""
                      }`}
                      placeholder={t("cpassword")}
                      value={userConfirmPassword}
                      onChange={(e) => setUserConfirmPassword(e.target.value)}
                    />
                    {userErrors.userConfirmPassword && (
                      <p className="text-red-500 text-sm">{userErrors.userConfirmPassword}</p>
                    )}
                  </div>
                  <div>
                    <select
                      id="countrySelect"
                      value={selectedCountry}
                      onChange={(e) => setSelectedCountry(e.target.value)}
                      className={`input-field p-2 border rounded ${
                        userErrors.selectedCountry ? "border-red-500" : ""
                      }`}
                    >
                      <option value="">{t("select_a_country")}</option>
                      {[...countries]
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((country, index) => (
                          <option key={index} name="country" value={country.dial_code}>
                            {country.name}
                          </option>
                        ))}
                    </select>
                    {userErrors.selectedCountry && (
                      <p className="text-red-500 text-sm">{userErrors.selectedCountry}</p>
                    )}
                  </div>
                  <div>
                    <input
                      type="text"
                      className={`input-field p-2 border rounded ${userErrors.userMobile ? "border-red-500" : ""}`}
                      placeholder={t("mobile")}
                      value={userMobile}
                      onChange={(e) => setUserMobile(e.target.value)}
                    />
                    {userErrors.userMobile && <p className="text-red-500 text-sm">{userErrors.userMobile}</p>}
                  </div>
                  <div>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/gif"
                      className={`input-field p-2 border rounded ${
                        userErrors.userProfilePicture || imageError.userImage ? "border-red-500" : ""
                      }`}
                      onChange={handleUserImageChange}
                    />
                    {userErrors.userProfilePicture && (
                      <p className="text-red-500 text-sm">{userErrors.userProfilePicture}</p>
                    )}
                    {imageError.userImage && <p className="text-red-500 text-sm">{imageError.userImage}</p>}
                  </div>
                </div>
                {image && (
                  <div className="mt-4 flex justify-center">
                    <img
                      src={image}
                      alt="Selected"
                      className="w-32 h-32 object-cover rounded-lg border"
                      onError={() => setImageError((prev) => ({ ...prev, userImage: t("failed_to_load_image") }))}
                    />
                  </div>
                )}
                <div className="mt-6 flex justify-end">
                  <button
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                    onClick={handleUserRegistration}
                  >
                    Registruj User
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showOTPForm && (
          <div className="rounded-div" id="otpForm" style={{ marginTop: "100px" }}>
            <div id="nekrektine2">
              <div className="title">Verify Your Email</div>
              <div className="description">
                An OTP has been sent to {isCompanyRegistration ? email : userEmail}. Please enter the 6-digit code below to verify your email.
              </div>
              <div className="form-container p-4 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
                <div className="mb-4">
                  <input
                    type="text"
                    className={`input-field p-2 border rounded w-full ${otpError ? "border-red-500" : ""}`}
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => {
                      setOtp(e.target.value);
                      setOtpError("");
                    }}
                    maxLength="6"
                  />
                  {otpError && <p className="text-red-500 text-sm">{otpError}</p>}
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                    onClick={handleOTPVerification}
                  >
                    Verify OTP
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SignupPage;

import React, { useContext, useEffect, useRef, useState } from "react";
import "./signup.css";
import img from "../Images/user_passanger.png";
import img1 from "../Images/logo2.png";
import { useTranslation } from "react-i18next";
import i18n from './i18n'; // Adjust the path to your i18n.js file
import { loadStripe } from "@stripe/stripe-js"; // Import Stripe
import { Space } from "antd";

// Initialize Stripe with your public key
const stripePromise = loadStripe("pk_test_51O9jy1GfF3OAAcfctj2mX8cH68Zy92PlUW0Ougdbcd12z3P6K8UdRIWIkxcaaIbwESILwaqqMBWu4vfKsSCFab6U00Mgfid3sa");


const SignupPage = () => {
  const containerRef = useRef(null);

const scrollToTop = () => {
  if (containerRef.current) {
    containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};
  let url = "https://admin.taxiscout24.com/";
  const { t } = useTranslation();
  const [startVremeTarifa1, setStartVremeTarifa1] = useState("07:00");
const [krajVremeTarifa1, setKrajVremeTarifa1] = useState("18:59");

const [startVremeTarifa2, setStartVremeTarifa2] = useState("19:00");
const [krajVremeTarifa2, setKrajVremeTarifa2] = useState("06:59");
const [isCheckingEmail, setIsCheckingEmail] = useState(false);
const [isCheckingDriverEmail, setIsCheckingDriverEmail] = useState(false);
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
  const [seatsCount, setSeatsCount] = useState(4);
  const [luggageCount, setLuggageCount] = useState(4);
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
  const [startCena, setStartCena] = useState(3);
  const [cenaTarifa1, setCenaTarifa1] = useState(3);

  const [cenaTarifa2, setCenaTarifa2] = useState(4);

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
  1: 1, // Free package
  2: 12, // Small to Mid-Sized
  3: 89, // Mid to Large
  4: 828,
  5: 199,
  6: 1788,
  7: 289,
  8: 2748, // Large
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
              setCompanyImage(result); // Ispravljeno
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
    if (showPrice) {
      setStartVremeTarifa1("07:00");
      setKrajVremeTarifa1("18:59");
      setStartVremeTarifa2("19:00");
      setKrajVremeTarifa2("06:59");
      setLuggageCount(4);
      setSeatsCount(4);
      setStartCena(3);
      setCenaTarifa1(3);
      setCenaTarifa2(4);
    }
  }, [showPrice]);
  function isTimeAfter(t1, t2) {
    // t1 i t2 su stringovi u formatu "HH:MM"
    const [h1, m1] = t1.split(":").map(Number);
    const [h2, m2] = t2.split(":").map(Number);
    return h1 > h2 || (h1 === h2 && m1 > m2);
  }
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeStep]);
  
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
    scrollToTop();
  };

  const goToUser = () => {
    setShowUser(true);
    setShowStart(false);
    setIsCompanyRegistration(false);
  };

  // Ažurirana funkcija checkDriverEmailExists
const checkDriverEmailExists = async (driverEmail) => {
  setIsCheckingDriverEmail(true); // Dodaj novu promenljivu stanja za driverEmail
  console.log("Checking driverEmail:", driverEmail);
  try {
    const response = await fetch("https://admin.taxiscout24.com/storage/check-email.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: driverEmail.trim().toLowerCase() }),
    });

    if (!response.ok) {
      console.error("API request failed with status:", response.status, response.statusText);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log("API response for driverEmail check:", result);

    if (typeof result.exists !== "boolean") {
      console.error("Unexpected API response format:", result);
      throw new Error("Invalid API response format");
    }

    return result.exists;
  } catch (error) {
    console.error("Error during driverEmail check:", error.message);
    throw error;
  } finally {
    setIsCheckingDriverEmail(false);
  }
};
 // Ažurirana funkcija checkEmailExists
const checkEmailExists = async (email) => {
  setIsCheckingEmail(true);
  try {
    const response = await fetch("https://admin.taxiscout24.com/storage/check-email.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      console.error("API request failed with status:", response.status);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("API response for email check:", result); // Loguj odgovor za debagovanje

    // Proveri da li je odgovor u očekivanom formatu
    if (result.error) {
      console.error("Greška u API odgovoru:", result.error);
      return false; // Ako postoji greška u API-ju, ne dozvoli dalje
    }

    return result.exists === true; // Pretpostavljamo da API vraća { exists: true/false }
  } catch (error) {
    console.error("Greška prilikom provere email-a:", error);
    return false; // U slučaju greške, ne dozvoli dalje
  } finally {
    setIsCheckingEmail(false);
  }
};

  // Ažurirana funkcija validateInfoReg
const validateInfoReg = async () => {
  const newErrors = {};
  if (!companyName) newErrors.companyName = t("field_required");
  if (!contactPerson) newErrors.contactPerson = t("field_required");
  if (!email) newErrors.email = t("field_required");
  if (!password) newErrors.password = t("field_required");
  if (!confirmPassword) newErrors.confirmPassword = t("field_required");
  if (password !== confirmPassword) newErrors.confirmPassword = t("passwords_must_match");
  if (password && password.length < 8) newErrors.password = t("password_too_short");
  if (!selectedState) newErrors.selectedState = t("field_required");
  if (!address) newErrors.address = t("field_required");
  if (!mobile) newErrors.mobile = t("field_required");
  if (!postalCode) newErrors.postalCode = t("field_required");
  if (!image) newErrors.image = t("field_required");

  // Provera email-a samo ako nema drugih grešaka sa email-om
  if (email && !newErrors.email) {
    try {
      const emailExists = await checkEmailExists(email);
      if (emailExists) {
        newErrors.email = t("email_already_taken");
      }
    } catch (error) {
      newErrors.email = t("email_check_failed");
      console.error("Error during email validation:", error);
    }
  }

  console.log("Validation errors:", newErrors);
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
    scrollToTop();
  };

 // Ažurirana funkcija validateInfoDriver (pretpostavljam da postoji ili je nova)
const validateInfoDriver = async () => {
  const newErrors = {};

  // Osnovna validacija polja za driver (prilagodi prema potrebi)
  if (!driverName) newErrors.driverName = t("field_required"); // Pretpostavljeni polj
  if (!driverEmail) newErrors.driverEmail = t("field_required");
  if (!driverPhone) newErrors.driverPhone = t("field_required"); // Pretpostavljeni polj

  // Validacija formata driverEmail-a
  if (driverEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(driverEmail)) {
    newErrors.driverEmail = t("invalid_email_format");
  }

  // Provera dupliranog driverEmail-a
  if (driverEmail && !newErrors.driverEmail) {
    try {
      const driverEmailExists = await checkDriverEmailExists(driverEmail);
      console.log("Driver email exists result:", driverEmailExists);
      if (driverEmailExists) {
        newErrors.driverEmail = t("email_already_taken");
      }
    } catch (error) {
      newErrors.driverEmail = t("email_check_failed");
      console.error("Driver email validation error:", error);
    }
  }

  // Provera da email ne sme biti isti kao email kompanije
  if (email && driverEmail && email.trim().toLowerCase() === driverEmail.trim().toLowerCase()) {
    newErrors.driverEmail = t("email_same_as_company");
  }

  console.log("Validation errors for driver:", newErrors);
  setErrors(newErrors); // Ispravljeno na setDriverErrors umesto setErrors
  return Object.keys(newErrors).length === 0;
};

// Ažurirana funkcija goToDriver
// Ažurirana funkcija goToDriver
const goToDriver = async () => {
  const isValid = await validateInfoReg();
  if (isValid) {
    setShowNum(true);
    setShowInfoReg(false);
    setShowStart(false);
    setShowPackage(false);
    setShowInfoDriver(true);
    setShowInfoVehicle(false);
    setShowPrice(false);
    setActiveStep(2);
    scrollToTop();
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

// Ažurirana funkcija goToVehicle (pretpostavljam sledeći korak posle driver-a)
const goToVehicle = async () => {
  console.log("Starting goToVehicle");
  const isValid = await validateInfoDriver();
  console.log("Validation result for driver:", isValid);
  if (isValid) {
    console.log("Proceeding to vehicle info step");
    setShowNum(true);
    setShowInfoReg(false);
    setShowInfoDriver(false);
    setShowInfoVehicle(true);
    setShowPrice(false);
    setActiveStep(3); // Prilagođeno prema vašem koraku
    scrollToTop();
  } else {
    console.log("Validation failed, staying on current step");
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
      language: i18n.language,
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
        alert(t("reg20_text"));
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
      scrollToTop();
    }
  };

  const validateUserForm = () => {
    const newErrors = {};
    if (!userName) newErrors.userName = t("field_required");
    if (!userEmail) newErrors.userEmail = t("field_required");
    if (!userPassword) newErrors.userPassword = t("field_required");
    if (!userConfirmPassword) newErrors.userConfirmPassword = t("field_required");
    if (userPassword !== userConfirmPassword) newErrors.userConfirmPassword = t("passwords_must_match");
    if (userPassword && userPassword.length < 8) newErrors.userPassword = t("password_too_short");

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
        alert(t("email_verified_successfully"));
  
        // Ako je company registration i paket nije besplatan (2, 3, ili 4), pokreni Stripe plaćanje
        if (isCompanyRegistration && selectedPackageId !== 0) {
          setIsLoadingPayment(true);
          try {
            const paymentResponse = await fetch("https://admin.taxiscout24.com/storage/create-checkout-session.php", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                cena: packagePrices[selectedPackageId],
                packageId: selectedPackageId,
                email: email, // Email za identifikaciju korisnika
                driverEmail: driverEmail,
                password: password,
                name: companyName,
               contact: contactPerson,
                mob: mobile,
                adress: address,
                language: i18n.language,
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
          scrollToTop();
          
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
    scrollToTop();
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
    setSeatsCount(4);
    setLuggageCount(4);
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
      <div  ref={containerRef} className="glavna">
        {showNum && (
          <div className="container spad" style={{ marginTop: "10px" }}>
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
              {t('select' )}
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
                 {t('company_info' )}
           
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
                {t('driver_data' )}
                
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
                   {t('vehicle_data')}
               
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
                {t('fares')}
         
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
                {t("passenger")}
              </button>
              <button
                className="signup-button"
                onClick={() => {
                  handleTaxiClick();
                }}
              >
                <img src={img1} alt="Taxi Company" className="button-icon" />
                {t("taxi_company")}
              </button>
            </div>
          </div>
        )}

        {showPackage && (
         <div className="rounded-div" id="paket"  style={{ height: '100%' }}>
  <section className="intro">
    <h1>TaxiScout24 –  {t("reg3_text")} (CHF)</h1>
    <p>{t("reg4_text")}</p>
    <p><strong>TaxiScout24</strong> – {t("reg5_text")}</p>
    <p>{t("reg6_text")}</p>
    <p><strong>{t("reg7_text")}</strong></p>
  </section>

  <section className="pricing">
    {/* Paket 1: Starter */}
    <div className="plan">
      <h2>Starter 🟢</h2>
      <p className="price">CHF 1. <span class = "spanclass" >– / {t("month")} </span><br /><span>CHF 1.– / {t("plan_price_line2")} <br/>  {t("plan_price_line3")} (CHF 12.– / {t("year")})</span></p>
     
      <ul >
        <li>✅ 1 {t("pricing_text4")}</li>
        <li>✅ 1 {t("plan_feature_vehicle")}</li>
        <li>✅  {t("plan_feature_app_access")}</li>
        <li>❌ {t("plan_feature_no_reports")}</li>
        <li>❌ {t("plan_feature_no_support")}</li>
        <li>❌ {t("plan_feature_no_setup")}</li>
        <li>❌ {t("plan_feature_no_api")}</li>
      </ul >
      <div className="buttons">
  <button className="btn-monthly" onClick={() => { setSelectedPackageId(1); goToInfo(); }}>
  💳  {t("button_monthly")}
  </button>
  <button className="btn-yearly" onClick={() => { setSelectedPackageId(2); goToInfo(); }}>
  🎁  {t("button_yearly")}
  </button>
</div>
    </div>

    {/* Paket 2: Basic */}
    <div className="plan">
      <h2>Basic 🔵</h2>
      <p className="price">CHF 89.<span class = "spanclass" >– / {t("month")}</span><br /><span>CHF 69.– / {t("plan_price_line2")} <br /> {t("plan_price_line3")} (CHF 828.– / {t("year")})</span></p>
      <ul>
        <li>✅ 5 {t("pricing_text4")}</li>
        <li>✅ 5 {t("plan_feature_vehicle")}</li>
        <li>✅ {t("plan_feature_app_access")}</li>
        <li>✅ {t("plan_feature_no_reports")}</li>
        <li>✅ {t("plan_feature_no_support")}</li>
        <li>❌ {t("plan_feature_no_setup")}</li>
        <li>❌ {t("plan_feature_no_api")}</li>
      </ul>
      <div className="buttons">
  <button className="btn-monthly" onClick={() => { setSelectedPackageId(3); goToInfo(); }}>
  💳  {t("button_monthly")}
  </button>
  <button className="btn-yearly" onClick={() => { setSelectedPackageId(4); goToInfo(); }}>
  🎁  {t("button_yearly")}
  </button>
</div>
</div>

    {/* Paket 3: Pro */}
    <div className="plan">
      <h2>Pro 🟠</h2>
      <p className="price">CHF 199.<span class = "spanclass" >– / {t("month")}</span><br /><span>CHF 149.– / {t("plan_price_line2")} <br /> {t("plan_price_line3")} (CHF 1'788.– / {t("year")})</span></p>
      <ul>
        <li>✅ 20 {t("pricing_text4")}</li>
        <li>✅ 20 {t("plan_feature_vehicle")}</li>
        <li>✅ {t("plan_feature_app_access")}</li>
        <li>✅ {t("plan_feature_no_reports")}</li>
        <li>✅ {t("plan_feature_no_support")}</li>
        <li>✅ {t("plan_feature_no_setup")}</li>
        <li>✅ {t("plan_feature_no_api")}</li>
      </ul>
      <div className="buttons">
  <button className="btn-monthly" onClick={() => { setSelectedPackageId(5); goToInfo(); }}>
  💳  {t("button_monthly")}
  </button>
  <button className="btn-yearly" onClick={() => { setSelectedPackageId(6); goToInfo(); }}>
  🎁  {t("button_yearly")}
  </button>
</div>

    </div>

    {/* Paket 4: Enterprise */}
    <div className="plan">
      <h2>Enterprise 🔴</h2>
      <p className="price">CHF 289.<span class = "spanclass" >– / {t("month")}</span><br /><span>CHF 229.– / {t("plan_price_line2")} <br /> {t("plan_price_line3")} (CHF 2'748.– / {t("year")})</span></p>
      <ul>
        <li>✅ 99 {t("pricing_text4")}</li>
        <li>✅ {t("unlimited_vehicles")}</li>
        <li>✅ {t("plan_feature_app_access")}</li>
        <li>✅ {t("plan_feature_no_reports")}</li>
        <li>✅ {t("plan_feature_no_support")}</li>
        <li>✅ {t("plan_feature_no_setup")}</li>
        <li>✅ {t("plan_feature_no_api")}</li>
      </ul>
      <div className="buttons">
  <button className="btn-monthly" onClick={() => { setSelectedPackageId(7); goToInfo(); }}>
  💳  {t("button_monthly")}
  </button>
  <button className="btn-yearly" onClick={() => { setSelectedPackageId(8); goToInfo(); }}>
  🎁  {t("button_yearly")}
  </button>
</div>
    </div>
  </section>
</div>

    
        )}

{showInfoReg && (
  <div className="rounded-div" id="infoReg">
    <div id="nekrektine2">
      <div className="title">{t("reg8_text")}</div>
      <div className="description">
      {t("reg9_text")}
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
              minLength={8}
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
                minLength={8}
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
              <label className="block mb-1 font-medium">Logo</label>
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
            disabled={isCheckingEmail}
          >
           {isCheckingEmail ? t("checking") : t("next")}
          </button>
        </div>
      </div>
    </div>
  </div>
)}

        {showInfoDriver && (
          <div className="rounded-div" id="infoDriver">
            <div id="nekrektine2">
              <div className="title">{t("reg10_text")}</div>
              <div className="description">
              {t("reg11_text")}
               </div>
              <div className="form-container p-4 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      className={`input-field p-2 border rounded ${errors.driverName ? "border-red-500" : ""}`}
                      placeholder={t("name")} 
                      value={driverName}
                      onChange={(e) => setDriverName(e.target.value)}
                    />
                    {errors.driverName && <p className="text-red-500 text-sm">{errors.driverName}</p>}
                  </div>
                  <div>
                    <input
                      type="email"
                      className={`input-field p-2 border rounded ${errors.driverEmail ? "border-red-500" : ""}`}
                      placeholder= {t("email")} 
                      value={driverEmail}
                      onChange={(e) => setDriverEmail(e.target.value)}
                    />
                    {errors.driverEmail && <p className="text-red-500 text-sm">{errors.driverEmail}</p>}
                  </div>
                  <div>
                    <input
                      type="text"
                      className={`input-field p-2 border rounded ${errors.driverPhone ? "border-red-500" : ""}`}
                      placeholder= {t("mobile")} 
                      value={driverPhone}
                      onChange={(e) => setDriverPhone(e.target.value)}
                    />
                    {errors.driverPhone && <p className="text-red-500 text-sm">{errors.driverPhone}</p>}
                  </div>
                  <div className="col-span-2 flex items-center gap-4">
                    <div className="flex-1">
                      <label className="block mb-1 font-medium">{t("driver_picture")}</label>
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
                      <label className="block mb-1 font-medium">{t("reg12_text")}</label>
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
                      <label className="block mb-1 font-medium">{t("reg13_text")}</label>
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
                     className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                    onClick={goToVehicle}
                    disabled={isCheckingEmail}
                    >
                     {isCheckingEmail ? t("checking") : t("next")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showInfoVehicle && (
          <div className="rounded-div" id="infoVehicle">
            <div id="nekrektine2">
              <div className="title">{t("reg14_text")}</div>
              <div className="description">
              {t("reg15_text")}
              </div>
              <div className="form-container p-4 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block mb-1 font-medium">{t("vehicle_type")}</label>
                      <select
                        value={vehicleType}
                        onChange={(e) => setVehicleType(e.target.value)}
                        className={`input-field p-2 border rounded w-full ${
                          errors.vehicleType ? "border-red-500" : ""
                        }`}
                      >
                       <option value="">{t("select_vehicle_type")}</option>
      <option value="Car">{t("vehicle_type_car")}</option>
      <option value="Van">{t("vehicle_type_van")}</option>
      <option value="MiniVan">{t("vehicle_type_minivan")}</option>
      <option value="Handicap Car">{t("vehicle_type_handicap_car")}</option>
      <option value="Limousine">{t("vehicle_type_limousine")}</option>
      <option value="Long Limousine">{t("vehicle_type_long_limousine")}</option>
      <option value="Electric Car">{t("vehicle_type_electric_car")}</option>
                      </select>
                      {errors.vehicleType && <p className="text-red-500 text-sm">{errors.vehicleType}</p>}
                    </div>
                    <div className="flex-1">
                      <label className="block mb-1 font-medium">  {t("seats_count")}</label>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={seatsCount || 4}
                        onChange={(e) => setSeatsCount(Number(e.target.value))}
                        className={`input-field p-2 border rounded w-full ${
                          errors.seatsCount ? "border-red-500" : ""
                        }`}
                      />
                      {errors.seatsCount && <p className="text-red-500 text-sm">{errors.seatsCount}</p>}
                    </div>
                    <div className="flex-1">
                      <label className="block mb-1 font-medium"> {t("luggage_count")}</label>
                      <input
                        type="number"
                        min="1"
                        max="50"
                        value={luggageCount || 4}
                        onChange={(e) => setLuggageCount(Number(e.target.value))}
                    
                        className={`input-field p-2 border rounded w-full ${
                          errors.luggageCount ? "border-red-500" : ""
                        }`}
                      />
                      {errors.luggageCount && <p className="text-red-500 text-sm">{errors.luggageCount}</p>}
                    </div>
                  </div>
                  <div className="col-span-2">
                    <label className="block mb-1 font-medium">{t("select_a_car_make")}</label>
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
                    <label className="block mb-1 font-medium">{t("options")}</label>
                    <div className="flex flex-col gap-4 justify-start">
                      <div>
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            checked={childSeat}
                            onChange={(e) => setChildSeat(e.target.checked)}
                            className="form-checkbox"
                          />
                          <span className="ml-2">{t("child_seat")}</span>
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
                          <span className="ml-2">{t("wheelchair_accessible")}</span>
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
                          <span className="ml-2">{t("pets_allowed")}</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2 flex items-center gap-4">
                    <div className="flex-1">
                      <label className="block mb-1 font-medium"> {t("traffic_license_image")}</label>
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
                        alt={t("traffic_license_image")}
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
                     {t("next")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

{showPrice && (
  <div className="rounded-div" id="infoPrice">
    <div id="nekrektine2">
      <div className="title">{t("enter_fares")}</div>
      <div className="description">
          {t("fares_description")}
          {selectedPackageId !== 0 && (
            <p className="mt-2">
              {t("stripe_redirect", { amount: packagePrices[selectedPackageId] })}
            </p>
          )}
        </div>
      <div className="form-container p-4 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
              <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2" htmlFor="startCena">
                  {t("start_price")}
                  </label>
                  <input
                    type="number"
                    id="startCena"
                    name="startCena"
                    className={`w-full border rounded px-3 py-2 focus:outline-none ${
                      errors.startCena ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder={t("enter_start_price")}
                    value={startCena}
                    onChange={(e) => setStartCena(e.target.value)}
                  />
                  {errors.startCena && <p className="text-red-500 text-sm">{errors.startCena}</p>}
             
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2"> {t("tariff", { n: 1 })}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  <div>
                    <input
                      type="number"
                      name="cenaTarifa1"
                      className={`border rounded px-3 py-2 w-full ${
                        errors.cenaTarifa1 ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder={t("fare_price")}
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
                      placeholder={t("start_time")}
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
                      placeholder={t("end_time")}
                      value={krajVremeTarifa1}
                     
  onChange={(e) => {
    const newVal = e.target.value;
    if (isTimeAfter(newVal, startVremeTarifa2)) {
      alert("Tarifa 1 ne sme da se preklapa sa Tarifa 2!");
      return;
    }
    setKrajVremeTarifa1(newVal);
  }}
                    />
                    {errors.krajVremeTarifa1 && (
                      <p className="text-red-500 text-sm">{errors.krajVremeTarifa1}</p>
                    )}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">  {t("tariff", { n: 2 })}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  <div>
                    <input
                      type="number"
                      name="cenaTarifa2"
                      className={`border rounded px-3 py-2 w-full ${
                        errors.cenaTarifa2 ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder={t("fare_price")}
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
                      placeholder={t("start_time")}
                      value={startVremeTarifa2}
                      onChange={(e) => {
                        const newVal = e.target.value;
                        if (isTimeAfter(krajVremeTarifa1, newVal)) {
                          alert("Tarifa 2 ne sme da počinje pre završetka Tarifa 1!");
                          return;
                        }
                        setStartVremeTarifa2(newVal);
                      }}
                      
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
                      placeholder={t("end_time")}
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
            {isLoadingPayment ? t("processing") : t("register")}
          </button>
        </div>
      </div>
    </div>
  </div>
)}

        {showUser && (
          <div className="rounded-div" id="infoUser" style={{ marginTop: "100px" }}>
            <div id="nekrektine2">
              <div className="title"> {t("title_user")}</div>
              <div className="description">
               {t("desc_user")}
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
                      style={{ width: "100%" }}

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
                    {t("register")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showOTPForm && (
          <div className="rounded-div" id="otpForm" style={{ marginTop: "100px" }}>
            <div id="nekrektine2">
              <div className="title">{t("reg16_text")}</div>
              <div className="description">
              {t("reg17_text")} {isCompanyRegistration ? email : userEmail}. {t("reg18_text")}
              </div>
              <div className="form-container p-4 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
                <div className="mb-4">
                  <input
                    type="text"
                    className={`input-field p-2 border rounded w-full ${otpError ? "border-red-500" : ""}`}
                    placeholder= {t("reg19_text")}
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
                    {t("reg21_text")}
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

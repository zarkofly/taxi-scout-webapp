import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css"; // Import your CSS file for styling
import loader from "../Images/Spinner@1x-1.0s-200px-200px (1).gif";
import OtpVerify_Login from "./OtpVerify_Login";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";

function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [otpVisible, setOtpVisible] = useState(false);
  const [userType, setUserType] = useState("user"); // Default userType is user
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { executeRecaptcha } = useGoogleReCaptcha(); // Use the reCAPTCHA hook

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!executeRecaptcha) {
      console.error("Execute reCAPTCHA not yet available");
      return;
    }

    if (userType === "user") {
      setLoading(true);

      try {
        
        const recaptchaToken = await executeRecaptcha("login");

        console.log("reCAPTCHA Token:", recaptchaToken); // Optional: For debugging

        const response = await fetch("https://admin.taxiscout24.com/api/v1/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
            token: recaptchaToken, 
          }),
        });

        const json = await response.json();

        if (response.ok) {
          sessionStorage.setItem("email", credentials.email);
          setOtpVisible(true);
        } else {
          alert("Invalid credentials");
        }
      } catch (err) {
        console.error("Login failed", err);
      } finally {
        setLoading(false);
      }
    } else if (userType === "company") {
      navigate("https://admin.taxiscout24.com/");
    }
  };

  return (
    <div id="banner_img_home" className="relative mt-10">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-lg"></div>
      <div className="relative container flex justify-center items-center md:justify-end min-h-[100vh] min-w-full">
        {otpVisible ? (
          <div id="otp_verify">
            <OtpVerify_Login />
          </div>
        ) : (
          <div className="login-container flex justify-center items-center">
            <h1>Login</h1>
            <div className="login-options">
              <div
                className={`option ${userType === "user" ? "active" : ""}`}
                onClick={() => setUserType("user")}
              >
                User
              </div>
              <div
                className={`option ${userType === "company" ? "active" : ""}`}
                onClick={() => setUserType("company")}
              >
                Company
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={credentials.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  required
                />
              </div>

              {loading ? (
                <div className="flex justify-center">
                  <img className="w-20" src={loader} alt="Loading..." />
                </div>
              ) : (
                <button
                  id="btn_hover_main"
                  className="w-full my-2 py-3 font-semibold rounded-lg text-sm lg:px-10 md:py-2"
                  type="submit"
                >
                  Login as {userType}
                </button>
              )}
              
              {(userType == "user")?<Link to = "/forget-password"><button className="text-white transition-all hover:scale-105">Forget Password ?</button> </Link>:null}
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <GoogleReCaptchaProvider reCaptchaKey="6LeExWoqAAAAABvfj4hxT9GHLXKpeYBzAfjILAgM">
      <LoginPage />
    </GoogleReCaptchaProvider>
  );
}

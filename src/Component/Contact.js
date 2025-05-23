// src/ContactUs.js
import axios from "axios";
import React, { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    country: "",
    address: "",
    state: "",
    pincode: "",
    subject: "",
    message: "",
  });

  const [responseMessage, setResponseMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  let url = "https://admin.taxiscout24.com";
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage(null);

    try {
      const response = await axios.post(`${url}/api/v1/contact`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("response", response);
      if (response.success) {
        setResponseMessage({
          type: "success",
          text: "Your message has been sent successfully!",
        });
        setFormData({
          name: "",
          email: "",
          mobile: "",
          country: "",
          address: "",
          state: "",
          pincode: "",
          subject: "",
          message: "",
        });
      } else {
        const errorData = await response.json();
        setResponseMessage({
          type: "error",
          text: errorData.message || "Something went wrong.",
        });
      }
    } catch (error) {
      setResponseMessage({ type: "error", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id="banner_img_home"
      className="relative bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center min-h-screen py-5 w-full "
    >
      <div className="absolute inset-0 bg-black/20 backdrop-blur-lg"></div>
      <div className="relative p-5 bg-[#00000080]  shadow-lg rounded-lg mt-5 w-full max-w-lg animate-fade-in ">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          Contact Us
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            
          
          <div>
            <label
              htmlFor="name"
              className="hidden sm:block text-sm font-semibold text-gray-100"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Your Name"
            />
          </div>
          <div className="mt-0">
            <label
              htmlFor="email"
              className="hidden sm:block text-sm font-semibold text-gray-100"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="you@example.com"
            />
          </div>

          {/* Mobile Field */}
          <div>
            <label
              htmlFor="mobile"
              className="hidden sm:block text-sm font-semibold text-gray-100"
            >
              Mobile
            </label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              required
              pattern="[0-9]{9,15}"
              value={formData.mobile}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Mobile"
            />
          </div>

          {/* Country Field */}
          <div>
            <label
              htmlFor="country"
              className="hidden sm:block text-sm font-semibold text-gray-100"
            >
              Country
            </label>
            <input
              type="text"
              id="country"
              name="country"
              required
              value={formData.country}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Country"
            />
          </div>

          {/* Address Field */}
          <div>
            <label
              htmlFor="address"
              className="hidden sm:block text-sm font-semibold text-gray-100"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              required
              value={formData.address}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Address"
            />
          </div>

          {/* State Field */}
          <div>
            <label
              htmlFor="state"
              className="hidden sm:block text-sm font-semibold text-gray-100"
            >
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              required
              value={formData.state}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="State"
            />
          </div>

          {/* Pincode Field */}
          <div>
            <label
              htmlFor="pincode"
              className="hidden sm:block text-sm font-semibold text-gray-100"
            >
              Pincode
            </label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              required
              pattern="[0-9]{6}"
              value={formData.pincode}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Pincode"
            />
          </div>

          {/* Subject Field */}
          <div>
            <label
              htmlFor="subject"
              className="hidden sm:block text-sm font-semibold text-gray-100"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              required
              value={formData.subject}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Subject"
            />
          </div>
         
          </div>
          <div className="">
            {/* Message Field */}
            <div className="flex flex-col justify-center items-center  my-4 ">
              <label
                htmlFor="message"
                className="hidden sm:block text-sm font-semibold text-gray-100"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                required
                value={formData.message}
                onChange={handleChange}
                className="mt-1 w-full  px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Message"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="">
              <button
                type="submit"
                disabled={loading}
                id="btn_hover_main"
                  className="w-fit my-2 px-10 py-2 font-semibold rounded-lg bg-black text-white hover:bg-white hover:text-black "
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </div>
          </div>
        </form>
        {/* Success/Error Message */}
        {responseMessage && (
          <div
            className={`mt-4 text-center ${
              responseMessage.type === "success"
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {responseMessage.text}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactUs;

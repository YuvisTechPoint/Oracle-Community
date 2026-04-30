import { useState } from "react";
import OracelContact from "../assets/OracleContactus.png";

const GOOGLE_SCRIPT_URL =
  import.meta.env.VITE_GOOGLE_SCRIPT_URL ||
  'https://script.google.com/macros/s/AKfycbyAM1uSscNggqKBbK73Gfgi3s5m0DVM_O60Z0fP1Uh7pygaqNmET-xhb7Kbf6XcYkTT/exec';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitMessage("");

    try {
      // Use GET with query params — the only reliable way to call Apps Script from a browser
      const params = new URLSearchParams({
        name:    formData.name,
        email:   formData.email,
        subject: formData.subject,
        message: formData.message,
        type:    'contact',
      });

      await fetch(`${GOOGLE_SCRIPT_URL}?${params.toString()}`, {
        method: 'GET',
        mode: 'no-cors',
      });

      // no-cors gives opaque response — treat completed fetch as success
      setSubmitMessage("✓ Thank you! Your message has been sent successfully.");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitMessage(""), 3000);
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setSubmitMessage("Failed to send message. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h1>
          <p className="text-gray-500 max-w-lg mx-auto text-sm leading-relaxed">
            Membership is free and open to everyone — students, developers,
            architects, DBAs, and managers. Fill out the form and someone from our
            team will reach out within 48 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div className="flex flex-col gap-4">
            <div className="relative">
              <label className="absolute -top-2 left-3 text-xs text-gray-400 bg-white px-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-red-200 bg-red-50 rounded-md px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-300 placeholder-gray-400"
              />
            </div>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full border border-red-200 bg-red-50 rounded-md px-4 py-3 text-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-300 placeholder-gray-400"
            />

            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              className="w-full border border-red-200 bg-red-50 rounded-md px-4 py-3 text-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-300 placeholder-gray-400"
            />

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message"
              rows={6}
              className="w-full border border-red-200 bg-red-50 rounded-md px-4 py-3 text-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-300 placeholder-gray-400 resize-none"
            />

            {submitMessage && (
              <div
                className={`p-3 rounded-md text-sm ${
                  submitMessage.includes("successfully")
                    ? "bg-green-100 text-green-700 border border-green-300"
                    : "bg-red-100 text-red-700 border border-red-300"
                }`}
              >
                {submitMessage}
              </div>
            )}

            <div>
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white text-sm font-medium px-6 py-3 rounded-md shadow-md transition-colors duration-200 disabled:cursor-not-allowed"
              >
                {isLoading ? "Sending..." : "Send Message"}
              </button>
            </div>
          </div>

          <img src={OracelContact} alt="Contact Oracle Kolkata" />
        </div>
      </div>
    </section>
  );
}

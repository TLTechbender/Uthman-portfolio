import React, { useState } from "react";

import "../assets/styles/contactForm.css";

interface FormData {
  fullName: string;
  email: string;
  contactReason: string[];
  budget: number;
  message: string;
}

const ContactForm:React.FC = ()=> {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    contactReason: [],
    budget: 2800,
    message: "",
  });

  const contactOptions = [
    { id: "web-design", label: "Web Design" },
    { id: "mobile-app", label: "Mobile App Design" },
    { id: "collaboration", label: "Collaboration" },
    { id: "others", label: "Others" },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (optionId: string) => {
    setFormData((prev) => ({
      ...prev,
      contactReason: prev.contactReason.includes(optionId)
        ? prev.contactReason.filter((id) => id !== optionId)
        : [...prev.contactReason, optionId],
    }));
  };

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      budget: parseInt(e.target.value),
    }));
  };

  const handleSubmit = () => {
   
    // Handle form submission here
  };

  return (
    <div className=" flex items-center justify-center p-4">
      <div className="w-full max-w-4xl rounded-2xl p-6 sm:p-8 md:p-10">
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border p-3.5 md:p-6 rounded-lg border-[#1C1C21]">
            <div>
              <label
                htmlFor="fullName"
                className="block text-white text-sm font-medium mb-3"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Full Name"
                className="w-full border-b border-gray-600 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border focus:border-white focus:rounded-2xl transition-all"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-white text-sm font-medium mb-3"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Type here"
                className="w-full border-b border-gray-600 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border focus:border-white focus:rounded-2xl transition-all"
                required
              />
            </div>
          </div>

          {/* Contact Reason */}
          <div className="pb-6 border p-3.5 md:p-6 rounded-lg border-[#1C1C21]">
            <label className="block text-white text-sm font-medium mb-4">
              Why are you contacting us?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {contactOptions.map((option) => (
                <label
                  key={option.id}
                  className="flex items-center space-x-3 cursor-pointer group"
                >
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={formData.contactReason.includes(option.id)}
                      onChange={() => handleCheckboxChange(option.id)}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                        formData.contactReason.includes(option.id)
                          ? "bg-emerald-500 border-emerald-500"
                          : "border-gray-500 group-hover:border-emerald-400"
                      }`}
                    >
                      {formData.contactReason.includes(option.id) && (
                        <svg
                          className="w-3 h-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                  <span className="text-white text-sm group-hover:text-emerald-400 transition-colors">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Budget Slider */}
          <div className="pb-6 border  p-3.5 md:p-6 rounded-lg border-[#1C1C21]">
            <label className="block text-white text-sm font-medium mb-4">
              Your Budget
            </label>
            <div className="mb-4">
              <p className="text-gray-400 text-sm mb-6">
                Slide to indicate your budget range
              </p>
              <div className="relative">
                <input
                  type="range"
                  min="100"
                  max="10000"
                  step="100"
                  value={formData.budget}
                  onChange={handleBudgetChange}
                  className="w-full h-0.5 bg-[#333333] rounded-lg appearance-none cursor-pointer slider focus:outline-none focus:ring-2 focus:ring-white focus:rounded-2xl"
                />
                <div className="flex justify-between text-emerald-400 text-sm mt-2">
                  <span>$100</span>
                  <span className="font-medium">${formData.budget}</span>
                  <span>$10000</span>
                </div>
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="pb-6  p-3.5 md:p-6 rounded-lg border border-[#1C1C21]">
            <label
              htmlFor="message"
              className="block text-white text-sm font-medium mb-3"
            >
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Type here"
              rows={5}
              className="w-full resize-none border-b border-gray-600 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border focus:border-white focus:rounded-2xl transition-all resize-vertical"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-4">
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 px-8 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


export default ContactForm;
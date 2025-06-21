import axios from "axios";
import React, { useState } from "react";
import { ToastContainer } from "react-bootstrap";
import { toast } from "react-toastify";

const bgFormData = [
  { name: "A(+)", value: "A+" },
  { name: "B(+)", value: "B+" },
  { name: "O(+)", value: "O+" },
  { name: "AB(+)", value: "AB+" },
  // Add more blood groups if needed
];

const CustomForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    blood_group_select: "",
    phone_number: "",
    ssc_batch: "",
    permanent_address: "",
    present_address: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    // Handle form submission here
    try {
      const response = await axios.post(
        "https://rswa-server.vercel.app/add-blood-group",
        formData,
      );
      alert("afsd adsfafsd fads");
      console.log("Data submitted successfully:", response.data);
      // Optionally reset form here
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const onReset = () => {
    setFormData({
      name: "",
      blood_group_select: "",
      phone_number: "",
      ssc_batch: "",
      permanent_address: "",
      present_address: "",
      agree: false,
    });
  };

  return (
    <>
      <form
        onSubmit={onSubmit}
        onReset={onReset}
        className="mx-auto max-w-3xl space-y-8 rounded-lg bg-white p-8 shadow-md"
      >
        {/* Name */}
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-2 font-medium text-gray-700">
            Name <span className="text-red-600">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="rounded-md border border-gray-300 px-4 py-3 shadow-sm transition duration-150 focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>

        {/* Blood Group Select */}
        <div className="flex flex-col">
          <label
            htmlFor="blood_group_select"
            className="mb-2 font-medium text-gray-700"
          >
            Blood Group <span className="text-red-600">*</span>
          </label>
          <select
            id="blood_group_select"
            name="blood_group_select"
            required
            value={formData.blood_group_select}
            onChange={handleChange}
            className="rounded-md border border-gray-300 bg-white px-4 py-3 capitalize shadow-sm transition duration-150 focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            <option value="" disabled>
              Select your blood group
            </option>
            {bgFormData.map((item) => (
              <option
                key={item.value}
                value={item.value}
                className="capitalize"
              >
                {item.name}
              </option>
            ))}
          </select>
        </div>

        {/* Phone Number */}
        <div className="flex flex-col">
          <label
            htmlFor="phone_number"
            className="mb-2 font-medium text-gray-700"
          >
            Phone Number <span className="text-red-600">*</span>
          </label>
          <input
            id="phone_number"
            name="phone_number"
            type="tel"
            required
            minLength={1}
            maxLength={11}
            value={formData.phone_number}
            onChange={handleChange}
            placeholder="Enter your phone number"
            className="rounded-md border border-gray-300 px-4 py-3 shadow-sm transition duration-150 focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>

        {/* SSC Batch */}
        <div className="flex flex-col">
          <label htmlFor="ssc_batch" className="mb-2 font-medium text-gray-700">
            SSC Batch <span className="text-red-600">*</span>
          </label>
          <input
            id="ssc_batch"
            name="ssc_batch"
            type="text"
            required
            value={formData.ssc_batch}
            onChange={handleChange}
            placeholder="Enter your SSC batch"
            className="rounded-md border border-gray-300 px-4 py-3 shadow-sm transition duration-150 focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>

        {/* Permanent Address */}
        <div className="flex flex-col">
          <label
            htmlFor="permanent_address"
            className="mb-2 font-medium text-gray-700"
          >
            Permanent Address <span className="text-red-600">*</span>
          </label>
          <input
            id="permanent_address"
            name="permanent_address"
            type="text"
            required
            value={formData.permanent_address}
            onChange={handleChange}
            placeholder="Enter your permanent address"
            className="rounded-md border border-gray-300 px-4 py-3 shadow-sm transition duration-150 focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>

        {/* Present Address */}
        <div className="flex flex-col">
          <label
            htmlFor="present_address"
            className="mb-2 font-medium text-gray-700"
          >
            Present Address <span className="text-red-600">*</span>
          </label>
          <select
            id="present_address"
            name="present_address"
            required
            value={formData.present_address}
            onChange={handleChange}
            className="rounded-md border border-gray-300 bg-white px-4 py-3 capitalize shadow-sm transition duration-150 focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            <option value="" disabled>
              Select your location
            </option>
            <option value="rowmari">Rowmari</option>
            <option value="dhaka">Dhaka</option>
            <option value="gazipur">Gazipur</option>
            <option value="rangpur">Rangpur</option>
            <option value="rajshahi">Rajshahi</option>
            <option value="mymensingh">Mymensingh</option>
            <option value="sylhet">Sylhet</option>
            <option value="chottogram">Chottogram</option>
            <option value="barishal">Barishal</option>
            <option value="khulna">Khulna</option>
          </select>
        </div>

        {/* Agreement Checkbox */}
        <div className="flex items-center space-x-3">
          <input
            id="agree"
            type="checkbox"
            name="agree"
            checked={formData.agree}
            onChange={handleChange}
            required
            className="form-checkbox h-5 w-5 rounded text-green-600 focus:ring-green-600"
          />
          <label htmlFor="agree" className="font-semibold text-green-700">
            অন্যের জীবন বাঁচানোর প্রয়োজনে রক্ত দানে সচেষ্ট হব
          </label>
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            type="reset"
            className="rounded-md border border-red-600 px-6 py-3 text-red-600 transition duration-200 hover:bg-red-600 hover:text-white"
          >
            Clear Form
          </button>
          <button
            type="submit"
            className="rounded-md bg-green-600 px-6 py-3 text-white transition duration-200 hover:bg-green-700"
          >
            Submit
          </button>
        </div>
        <ToastContainer />
      </form>{" "}
    </>
  );
};

export default CustomForm;

import axios from "axios";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const bgFormData = [
  { name: "A(+)", value: "A(+)ve" },
  { name: "B(+)", value: "B(+)ve" },
  { name: "O(+)", value: "O(+)ve" },
  { name: "AB(+)", value: "AB(+)ve" },
  { name: "A(-)", value: "A(-)ve" },
  { name: "B(-)", value: "B(-)ve" },
  { name: "O(-)", value: "O(-)ve" },
  { name: "AB(-)", value: "AB(-)ve" },
];

const CustomForm = () => {
  const [formData, setFormData] = useState({
    Name: "",
    Blood_Group: "",
    Phone_Number: "",
    SSC_Batch: "",
    Permanent_Address: "",
    Present_Address: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
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
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    // Handle form submission here

    try {
      const response = await axios.post(
        "https://rswa-server.vercel.app/add-blood-group",
        formData,
      );
      toast("Data added successfully");
      // Optionally reset form here
      onReset();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  //
  return (
    <div className="mx-auto md:w-11/12">
      <button className="pageTitle">Blood Group Form</button>
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
            id="Name"
            name="Name"
            type="text"
            required
            value={formData.Name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="rounded-md border border-gray-300 px-4 py-3 shadow-sm transition duration-150 focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>

        {/* Blood Group Select */}
        <div className="flex flex-col">
          <label
            htmlFor="Blood_Group"
            className="mb-2 font-medium text-gray-700"
          >
            Blood Group <span className="text-red-600">*</span>
          </label>
          <select
            id="Blood_Group"
            name="Blood_Group"
            required
            value={formData.Blood_Group}
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
            htmlFor="Phone_Number"
            className="mb-2 font-medium text-gray-700"
          >
            Phone Number <span className="text-red-600">*</span>
          </label>
          <input
            id="Phone_Number"
            name="Phone_Number"
            type="tel"
            required
            minLength={11}
            maxLength={11}
            pattern="^01[3-9][0-9]{8}$"
            value={formData.Phone_Number}
            onChange={handleChange}
            placeholder="e.g. 017XXXXXXXX"
            className="rounded-md border border-gray-300 px-4 py-3 shadow-sm transition duration-150 focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>

        {/* SSC Batch */}
        <div className="flex flex-col">
          <label htmlFor="SSC_Batch" className="mb-2 font-medium text-gray-700">
            SSC Batch <span className="text-red-600">*</span>
          </label>
          <input
            id="SSC_Batch"
            name="SSC_Batch"
            type="text"
            required
            value={formData.SSC_Batch}
            onChange={handleChange}
            placeholder="Enter your SSC batch"
            className="rounded-md border border-gray-300 px-4 py-3 shadow-sm transition duration-150 focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>
        {/* Present Address */}
        <div className="flex flex-col">
          <label
            htmlFor="Present_Address"
            className="mb-2 font-medium text-gray-700"
          >
            Present Address
            <span className="text-red-600">*</span>
          </label>
          <select
            id="Present_Address"
            name="Present_Address"
            required
            value={formData.Present_Address}
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

        {/* Permanent Address */}
        <div className="flex flex-col">
          <label
            htmlFor="Permanent_Address"
            className="mb-2 font-medium text-gray-700"
          >
            Permanent Address <span className="text-red-600">*</span>
          </label>
          <input
            id="Permanent_Address"
            name="Permanent_Address"
            type="text"
            required
            value={formData.Permanent_Address}
            onChange={handleChange}
            placeholder="Enter your permanent address"
            className="rounded-md border border-gray-300 px-4 py-3 shadow-sm transition duration-150 focus:outline-none focus:ring-2 focus:ring-green-600"
          />
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
    </div>
  );
};

export default CustomForm;

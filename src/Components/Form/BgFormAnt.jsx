import React, { useState } from "react";

const MyForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bloodGroup: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Collected form data:", formData);
    // send formData to backend or process it as needed
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-md space-y-6 rounded-md bg-white p-6 shadow-md"
    >
      <div>
        <label
          htmlFor="name"
          className="mb-1 block font-semibold text-gray-700"
        >
          Name
        </label>
        <input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
          required
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-1 block font-semibold text-gray-700"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
          required
        />
      </div>

      <div>
        <label
          htmlFor="bloodGroup"
          className="mb-1 block font-semibold text-gray-700"
        >
          Blood Group
        </label>
        <select
          id="bloodGroup"
          name="bloodGroup"
          value={formData.bloodGroup}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
          required
        >
          <option value="" disabled>
            Select Blood Group
          </option>
          <option value="A+">A(+)</option>
          <option value="A-">A(-)</option>
          <option value="B+">B(+)</option>
          <option value="B-">B(-)</option>
          <option value="O+">O(+)</option>
          <option value="O-">O(-)</option>
          <option value="AB+">AB(+)</option>
          <option value="AB-">AB(-)</option>
          
        </select>
      </div>

      <button
        type="submit"
        className="w-full rounded-md bg-green-700 py-2 font-semibold text-white transition-colors duration-300 hover:bg-green-700"
      >
        Submit
      </button>
    </form>
  );
};

export default MyForm;

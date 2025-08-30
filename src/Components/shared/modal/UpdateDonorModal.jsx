import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";

const UpdateDonorModal = ({ isOpen, onClose, donor, onUpdate }) => {
  const [formData, setFormData] = useState({
    Name: "",
    Blood_Group: "",
    Phone_Number: "",
    Present_Address: "",
    Permanent_Address: "",
    SSC_Batch: "",
  });

  useEffect(() => {
    if (donor) setFormData(donor);
  }, [donor]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const hasChanges = Object.keys(formData).some(
      (key) => formData[key] !== donor[key],
    );
    if (!hasChanges) {
      alert("No changes detected!");
      return;
    }
    onUpdate(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-96 rounded-lg bg-white p-5">
        <button
          onClick={onClose}
          className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
        >
          <MdClose size={24} />
        </button>
        <h2 className="mb-4 text-xl font-semibold">Update Donor</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            name="Name"
            value={formData.Name}
            onChange={handleChange}
            placeholder="Name"
            className="rounded border px-3 py-2"
          />
          <input
            type="text"
            name="Blood_Group"
            value={formData.Blood_Group}
            onChange={handleChange}
            placeholder="Blood Group"
            className="rounded border px-3 py-2"
          />
          <input
            type="text"
            name="Phone_Number"
            value={formData.Phone_Number}
            onChange={handleChange}
            placeholder="Phone Number"
            className="rounded border px-3 py-2"
          />
          <input
            type="text"
            name="Present_Address"
            value={formData.Present_Address}
            onChange={handleChange}
            placeholder="Present Address"
            className="rounded border px-3 py-2"
          />
          <input
            type="text"
            name="Permanent_Address"
            value={formData.Permanent_Address}
            onChange={handleChange}
            placeholder="Permanent Address"
            className="rounded border px-3 py-2"
          />
          <input
            type="text"
            name="SSC_Batch"
            value={formData.SSC_Batch}
            onChange={handleChange}
            placeholder="SSC Batch"
            className="rounded border px-3 py-2"
          />

          <button
            type="submit"
            className="mt-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateDonorModal;

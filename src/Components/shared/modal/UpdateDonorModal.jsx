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
    <div className="backdrop-blur-xs fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
      <div className="relative w-full max-w-md rounded-2xl border border-slate-200   p-6 shadow-2xl transition-colors dark:border-slate-800 dark:bg-slate-900">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
        >
          <MdClose size={20} />
        </button>
        <h2 className="mb-4 text-xl font-bold text-slate-800 dark:text-white">
          Update Donor Record
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-500 dark:text-slate-400">
              Full Name
            </label>
            <input
              type="text"
              name="Name"
              value={formData.Name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full rounded-xl border border-slate-300  px-3.5 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-500 dark:text-slate-400">
              Blood Group
            </label>
            <input
              type="text"
              name="Blood_Group"
              value={formData.Blood_Group}
              onChange={handleChange}
              placeholder="Blood Group (e.g. A+)"
              className="w-full rounded-xl border border-slate-300  px-3.5 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-500 dark:text-slate-400">
              Phone Number
            </label>
            <input
              type="text"
              name="Phone_Number"
              value={formData.Phone_Number}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full rounded-xl border border-slate-300  px-3.5 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-500 dark:text-slate-400">
              Present Address
            </label>
            <input
              type="text"
              name="Present_Address"
              value={formData.Present_Address}
              onChange={handleChange}
              placeholder="Present Address"
              className="w-full rounded-xl border border-slate-300   px-3.5 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-500 dark:text-slate-400">
              Permanent Address
            </label>
            <input
              type="text"
              name="Permanent_Address"
              value={formData.Permanent_Address}
              onChange={handleChange}
              placeholder="Permanent Address"
              className="w-full rounded-xl border border-slate-300  px-3.5 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-500 dark:text-slate-400">
              SSC Batch
            </label>
            <input
              type="text"
              name="SSC_Batch"
              value={formData.SSC_Batch}
              onChange={handleChange}
              placeholder="SSC Batch (e.g. 2018)"
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </div>

          <div className="mt-3 flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="shadow-xs rounded-xl bg-emerald-600 px-5 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateDonorModal;

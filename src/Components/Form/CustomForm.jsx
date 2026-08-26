import axios from "axios";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { API_ENDPOINTS } from "../../config/api";

const bgFormData = [
  { name: "A(+)", value: "A(+)ve" },
  { name: "A(-)", value: "A(-)ve" },
  { name: "B(+)", value: "B(+)ve" },
  { name: "B(-)", value: "B(-)ve" },
  { name: "O(+)", value: "O(+)ve" },
  { name: "O(-)", value: "O(-)ve" },
  { name: "AB(+)", value: "AB(+)ve" },
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
      Name: "",
      Blood_Group: "",
      Phone_Number: "",
      SSC_Batch: "",
      Permanent_Address: "",
      Present_Address: "",
      agree: false,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(API_ENDPOINTS.BLOOD_GROUP, formData);
      toast.success(response?.data?.message || "Data added successfully");
      onReset();
    } catch (error) {
      console.error("Error submitting form:", error);
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.errorSources?.[0]?.message ||
        "Failed to submit blood group data. Please check required fields.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="mx-auto md:w-11/12" >
      <button className="me-1 ms-1 w-full rounded-md bg-emerald-600 py-3 text-center text-2xl font-bold capitalize text-white shadow-sm hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700">
        Blood Group Form
      </button>
      <form 
        onSubmit={onSubmit}
        onReset={onReset}
        className="mx-auto max-w-3xl space-y-6 rounded-xl border border-slate-200 p-6 shadow-md transition-colors dark:border-slate-800 dark:bg-slate-900 my-12"
      >
        {/* Name */}
        <div className="flex flex-col ">
          <label htmlFor="Name" className="mb-1 text-sm font-semibold text-slate-700 dark:text-slate-200">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            id="Name"
            name="Name"
            type="text"
            required
            value={formData.Name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="rounded-md border border-slate-200 px-4 py-2 text-slate-900 shadow-xs focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
          />
        </div>

        {/* Blood Group Select */}
        <div className="flex flex-col">
          <label htmlFor="Blood_Group" className="mb-1 text-sm font-semibold text-slate-700 dark:text-slate-200">
            Blood Group <span className="text-red-500">*</span>
          </label>
          <select
            id="Blood_Group"
            name="Blood_Group"
            required
            value={formData.Blood_Group}
            onChange={handleChange}
            className="rounded-md border border-slate-200 px-4 py-2 text-slate-900 shadow-xs focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
          >
            <option value="" disabled>
              Select your blood group
            </option>
            {bgFormData.map((item) => (
              <option
                key={item.value}
                value={item.value}
                className="capitalize dark:bg-slate-900 dark:text-slate-100"
              >
                {item.name}
              </option>
            ))}
          </select>
        </div>

        {/* Phone Number */}
        <div className="flex flex-col">
          <label htmlFor="Phone_Number" className="mb-1 text-sm font-semibold text-slate-700 dark:text-slate-200">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            id="Phone_Number"
            name="Phone_Number"
            type="tel"
            required
            minLength={11}
            maxLength={11}
            value={formData.Phone_Number}
            onChange={handleChange}
            placeholder="e.g. 017XXXXXXXX"
            className="rounded-md border border-slate-200 px-4 py-2 text-slate-900 shadow-xs focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
          />
        </div>

        {/* SSC Batch */}
        <div className="flex flex-col">
          <label htmlFor="SSC_Batch" className="mb-1 text-sm font-semibold text-slate-700 dark:text-slate-200">
            SSC Batch
          </label>
          <input
            id="SSC_Batch"
            name="SSC_Batch"
            type="text"
            value={formData.SSC_Batch}
            onChange={handleChange}
            placeholder="Enter your SSC batch"
            className="rounded-md border border-slate-200 px-4 py-2 text-slate-900 shadow-xs focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
          />
        </div>

        {/* Present Address */}
        <div className="flex flex-col">
          <label
            htmlFor="Present_Address"
            className="mb-1 text-sm font-semibold text-slate-700 dark:text-slate-200"
          >
            Present Address
          </label>
          <select
            id="Present_Address"
            name="Present_Address"
            value={formData.Present_Address}
            onChange={handleChange}
            className="rounded-md border border-slate-200 px-4 py-2 text-slate-900 shadow-xs focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
          >
            <option value="" className="dark:bg-slate-900 dark:text-slate-100">
              Select location or leave empty
            </option>
            <option value="rowmari" className="dark:bg-slate-900 dark:text-slate-100">Rowmari</option>
            <option value="dhaka" className="dark:bg-slate-900 dark:text-slate-100">Dhaka</option>
            <option value="gazipur" className="dark:bg-slate-900 dark:text-slate-100">Gazipur</option>
            <option value="rangpur" className="dark:bg-slate-900 dark:text-slate-100">Rangpur</option>
            <option value="rajshahi" className="dark:bg-slate-900 dark:text-slate-100">Rajshahi</option>
            <option value="mymensingh" className="dark:bg-slate-900 dark:text-slate-100">Mymensingh</option>
            <option value="sylhet" className="dark:bg-slate-900 dark:text-slate-100">Sylhet</option>
            <option value="chottogram" className="dark:bg-slate-900 dark:text-slate-100">Chottogram</option>
            <option value="barishal" className="dark:bg-slate-900 dark:text-slate-100">Barishal</option>
            <option value="khulna" className="dark:bg-slate-900 dark:text-slate-100">Khulna</option>
          </select>
        </div>

        {/* Permanent Address */}
        <div className="flex flex-col">
          <label
            htmlFor="Permanent_Address"
            className="mb-1 text-sm font-semibold text-slate-700 dark:text-slate-200"
          >
            Permanent Address
          </label>
          <input
            id="Permanent_Address"
            name="Permanent_Address"
            type="text"
            value={formData.Permanent_Address}
            onChange={handleChange}
            placeholder="Enter your permanent address"
            className="rounded-md border border-slate-200 px-4 py-2 text-slate-900 shadow-xs focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
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
            className="h-4 w-4 cursor-pointer rounded border-slate-300 bg-white accent-emerald-600 focus:ring-emerald-600 dark:border-slate-700 dark:bg-slate-950 dark:accent-emerald-500"
          />
          <label htmlFor="agree" className="cursor-pointer text-sm font-medium text-slate-700 dark:text-slate-300">
            অন্যের জীবন বাঁচাতে রক্তদানে এগিয়ে আসবো
          </label>
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            type="reset"
            className="rounded-md border border-red-500 px-5 py-2 text-sm font-semibold text-red-600 transition duration-200 hover:bg-red-600 hover:text-white dark:border-red-600 dark:text-red-400 dark:hover:bg-red-600 dark:hover:text-white"
          >
            Clear Form
          </button>
          <button
            type="submit"
            className="rounded-md bg-emerald-600 px-5 py-2 text-sm font-semibold text-white transition duration-200 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700"
          >
            Submit
          </button>
        </div>

        <ToastContainer />
      </form>
    </div>
  );
};

export default CustomForm;

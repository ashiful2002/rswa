import React from "react";
import { MdClose } from "react-icons/md";

const ConfirmDeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  itemName,
  itemBlood,
}) => {
  if (!isOpen) return null;

  return (
    <div className="backdrop-blur-xs fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
      <div className="relative w-full max-w-md rounded-2xl border border-slate-200  p-6 shadow-2xl transition-colors dark:border-slate-800 dark:bg-slate-900">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
        >
          <MdClose size={20} />
        </button>
        <h2 className="mb-3 text-xl font-bold text-slate-800 dark:text-white">
          Confirm Deletion
        </h2>
        <p className="mb-6 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          Are you sure you want to delete donor{" "}
          <span className="font-bold text-slate-800 dark:text-slate-100">
            {itemName}
          </span>{" "}
          (Blood Group{" "}
          <span className="font-bold text-red-600 dark:text-red-400">
            {itemBlood}
          </span>
          )? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-2.5">
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="shadow-xs rounded-xl bg-red-600 px-5 py-2 text-xs font-semibold text-white transition-colors hover:bg-red-700"
          >
            Delete Donor
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;

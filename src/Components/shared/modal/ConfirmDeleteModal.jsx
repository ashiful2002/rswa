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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 bg-opacity-50">
      <div className="relative w-96 rounded-lg bg-white p-5">
        <button
          onClick={onClose}
          className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
        >
          <MdClose size={24} />
        </button>
        <h2 className="mb-4 text-xl font-semibold">Confirm Delete</h2>
        <p className="mb-4">
          Are you sure you want to delete{" "}
          <span className="font-bold">{itemName}</span> blood Group{" "}
          <span className="font-bold">{itemBlood}</span>?
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded border px-4 py-2 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;

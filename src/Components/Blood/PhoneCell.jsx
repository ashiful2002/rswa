/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { FaEye, FaPhoneAlt } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";
import { useTheme } from "../../Context/ThemeProvider";

/**
 * PhoneCell - Renders masked phone number with a confirmation modal before revealing.
 */
const PhoneCell = ({ phone, donorName }) => {
  const [revealed, setRevealed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { isDark } = useTheme();

  if (!phone) {
    return <span className="text-muted dark:text-slate-400">N/A</span>;
  }

  const visiblePart = phone.slice(0, 3);
  const hiddenPart = phone.slice(3);

  const handleConfirm = () => {
    setRevealed(true);
    setShowModal(false);
  };

  return (
    <>
      <div className="flex items-center gap-2">
        {revealed ? (
          <a
            href={`tel:${phone}`}
            className="flex items-center gap-1.5 font-mono font-medium text-emerald-600 hover:underline dark:text-emerald-400"
          >
            <FaPhoneAlt className="text-xs" />
            {phone}
          </a>
        ) : (
          <div className="flex items-center gap-2">
            <span className="font-mono text-slate-600 dark:text-slate-400">
              {visiblePart}
              {hiddenPart.replace(/./g, "X")}
            </span>
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:text-emerald-300 dark:hover:bg-emerald-900/60"
              title="Click to reveal phone number"
            >
              <FaEye className="text-xs" />
              <span>Show</span>
            </button>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        size="sm"
        contentClassName={`${isDark ? "dark:bg-slate-900" : ""} border-0 rounded-2xl shadow-xl`}
      >
        <Modal.Header
          closeButton
          closeVariant={isDark ? "white" : undefined}
          className="border-b border-slate-200 dark:border-slate-800"
        >
          <Modal.Title className="fs-6 font-bold text-slate-900 dark:text-slate-100">
            Reveal Phone Number
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-slate-700 dark:text-slate-200">
          Are you sure you want to show{" "}
          {donorName ? (
            <strong className="text-slate-900 dark:text-slate-100">
              {donorName}&apos;s
            </strong>
          ) : (
            "this donor's"
          )}{" "}
          full phone number?
        </Modal.Body>
        <Modal.Footer className="border-t border-slate-200 dark:border-slate-800">
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => setShowModal(false)}
            className="border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            Cancel
          </Button>
          <Button
            variant="success"
            size="sm"
            onClick={handleConfirm}
            className="border-emerald-600 bg-emerald-600 text-white hover:bg-emerald-700 dark:border-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700"
          >
            Yes, Show Number
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PhoneCell;


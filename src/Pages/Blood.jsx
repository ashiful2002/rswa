import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdBloodtype } from "react-icons/md";
import { FaEye, FaPhoneAlt } from "react-icons/fa";
import Loading from "../Components/Loading/Loading";
import { Modal, Button, Spinner } from "react-bootstrap";

const bloodGroups = [
  "",
  "A(+)ve",
  "A(-)ve",
  "B(+)ve",
  "B(-)ve",
  "O(+)ve",
  "O(-)ve",
  "AB(+)ve",
  "AB(-)ve",
];

const fetchBloodData = async ({ queryKey }) => {
  const [_key, params] = queryKey;
  const { data } = await axios.get(
    "https://rswa-server.vercel.app/blood-group",
    { params }
  );
  return data;
};

// Phone cell with react-bootstrap confirm modal
const PhoneCell = ({ phone, donorName }) => {
  const [revealed, setRevealed] = useState(false);
  const [showModal, setShowModal] = useState(false);

  if (!phone) return <span className="text-muted">N/A</span>;

  const visiblePart = phone.slice(0, 3);
  const hiddenPart = phone.slice(3);

  const handleConfirm = () => {
    setRevealed(true);
    setShowModal(false);
  };

  if (revealed) {
    return (
      <a
        href={`tel:${phone}`}
        className="d-inline-flex align-items-center gap-1 text-decoration-none fw-semibold"
      >
        <FaPhoneAlt className="text-success" size={12} />
        {phone}
      </a>
    );
  }

  return (
    <>
      <span
        role="button"
        onClick={() => setShowModal(true)}
        className="d-inline-flex align-items-center gap-2"
        style={{ cursor: "pointer" }}
        title="Click to reveal number"
      >
        <span>
          {visiblePart}
          <span
            style={{
              filter: "blur(4px)",
              userSelect: "none",
            }}
          >
            {hiddenPart}
          </span>
        </span>
        <FaEye className="text-secondary" size={14} />
      </span>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        size="sm"
      >
        <Modal.Header closeButton>
          <Modal.Title className="fs-6">Reveal Phone Number</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to show{" "}
          {donorName ? <strong>{donorName}'s</strong> : "this donor's"} full
          phone number?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" size="sm" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="success" size="sm" onClick={handleConfirm}>
            Yes, Show Number
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const Blood = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [bloodGroupFilter, setBloodGroupFilter] = useState("");
  const [sortField, setSortField] = useState("Name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading, isError } = useQuery({
    queryKey: [
      "bloodData",
      {
        search: debouncedSearch,
        bloodGroup: bloodGroupFilter,
        sortField,
        sortOrder,
        page,
        limit,
      },
    ],
    queryFn: fetchBloodData,
    keepPreviousData: true,
  });

  const totalPages = data?.totalPages || 1;
  const bloodData = data?.data || [];

  const goToPage = (num) => {
    if (num >= 1 && num <= totalPages) setPage(num);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="pageTitle bg-success">RSWA Virtual Blood Bank</h1>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center justify-between gap-2">
          <select
            className="rounded border px-4 py-2"
            value={bloodGroupFilter}
            onChange={(e) => setBloodGroupFilter(e.target.value)}
          >
            {bloodGroups.map((bg, i) => (
              <option key={i} value={bg}>
                {bg || "All Blood Group"}
              </option>
            ))}
          </select>{" "}
          <select
            className="rounded border px-3 py-2"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
        </div>

        <div>
          <Link to="/add-bg" className="btn btn-danger text-white flex w-full">
            Add new Blood Group <MdBloodtype className="inline text-xl" />
          </Link>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="border p-3">#</th>
              <th className="border p-3">Name</th>
              <th className="border p-3">Blood Group</th>
              <th className="border p-3">Present address</th>
              <th className="border p-3">Permanent address</th>
              <th className="border p-3">SSC Batch</th>
              <th className="border p-3">Phone</th>
            </tr>
          </thead>
          <tbody>
            {bloodData.length > 0 ? (
              bloodData.map((donor, index) => (
                <tr key={donor._id} className="hover:bg-gray-50">
                  <td className="border p-3">
                    {(page - 1) * limit + index + 1}
                  </td>
                  <td className="border p-3">{donor.Name}</td>
                  <td className="border p-3">{donor.Blood_Group}</td>
                  <td className="border p-3">
                    {donor.Present_Address || "N/A"}
                  </td>
                  <td className="border p-3">
                    {donor.Permanent_Address || "N/A"}
                  </td>
                  <td className="border p-3">SSC-{donor.SSC_Batch || "N/A"}</td>
                  <td className="border p-3">
                    <PhoneCell phone={donor.Phone_Number} donorName={donor.Name} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-4 text-center">
                  No data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center space-x-2">
        <button
          className="rounded border px-3 py-1 disabled:opacity-50"
          onClick={() => goToPage(page - 1)}
          disabled={page === 1}
        >
          Prev
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={`rounded border px-3 py-1 ${page === i + 1 ? "bg-blue-600 text-white" : ""}`}
            onClick={() => goToPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="rounded border px-3 py-1 disabled:opacity-50"
          onClick={() => goToPage(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Blood;
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdBloodtype } from "react-icons/md";
import { FaEye, FaPhoneAlt, FaSearch } from "react-icons/fa";
import Loading from "../Components/Loading/Loading";
import { Modal, Button } from "react-bootstrap";
import Pagination from "../Components/shared/Pagination";

import { API_ENDPOINTS } from "../config/api";

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
  const queryParams = {
    page: params.page,
    limit: params.limit,
    sortField: params.sortField,
    sortOrder: params.sortOrder,
  };

  if (params.search) {
    queryParams.search = params.search;
  }
  if (params.bloodGroup) {
    queryParams.Blood_Group = params.bloodGroup;
  }

  const { data } = await axios.get(API_ENDPOINTS.BLOOD_GROUP, {
    params: queryParams,
  });
  return data;
};

// Phone cell with react-bootstrap confirm modal
const PhoneCell = ({ phone, donorName }) => {
  const [revealed, setRevealed] = useState(false);
  const [showModal, setShowModal] = useState(false);

  if (!phone) return <span className="text-muted dark:text-slate-400">N/A</span>;

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
        className="d-inline-flex align-items-center gap-1 font-semibold text-emerald-600 text-decoration-none dark:text-emerald-400"
      >
        <FaPhoneAlt size={12} />
        {phone}
      </a>
    );
  }

  return (
    <>
      <span
        role="button"
        onClick={() => setShowModal(true)}
        className="d-inline-flex align-items-center gap-2 text-slate-800 dark:text-slate-200"
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
        <FaEye className="text-secondary dark:text-slate-400" size={14} />
      </span>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        size="sm"
        contentClassName=" text-slate-900 border border-slate-200 dark:bg-slate-900 dark:text-slate-100 dark:border-slate-800 shadow-lg"
      >
        <Modal.Header
          closeButton
          className="border-b border-slate-200 text-slate-900 dark:border-slate-800 dark:text-slate-100 dark:[&_.btn-close]:filter dark:[&_.btn-close]:invert"
        >
          <Modal.Title className="fs-6 font-bold text-slate-900 dark:text-slate-100">
            Reveal Phone Number
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-slate-700 dark:text-slate-200">
          Are you sure you want to show{" "}
          {donorName ? (
            <strong className="text-slate-900 dark:text-slate-100">{donorName}'s</strong>
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

const Blood = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [bloodGroupFilter, setBloodGroupFilter] = useState("");
  const [sortField, setSortField] = useState("Name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading } = useQuery({
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

  const totalPages = data?.meta?.totalPages || data?.totalPages || 1;
  const totalDonors = data?.meta?.total ?? data?.total ?? 0;
  const bloodData = data?.data || [];

  const goToPage = (num) => {
    if (num >= 1 && num <= totalPages) setPage(num);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto py-4">
      <h1 className="pageTitle bg-emerald-600 dark:bg-emerald-400">RSWA Virtual Blood Bank</h1>
      <p className="mb-6 text-sm font-medium text-slate-600 dark:text-slate-400">
        Save a life today — search among{" "}
        <span className="font-bold text-emerald-600 dark:text-emerald-400">
          {totalDonors}
        </span>{" "}
        registered donors.
      </p>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center justify-between gap-3">


          {/* Blood Group Select */}
          <select
            className="rounded border border-slate-200  px-4 py-2 text-sm text-slate-900 transition-colors dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
            value={bloodGroupFilter}
            onChange={(e) => {
              setBloodGroupFilter(e.target.value);
              setPage(1);
            }}
          >
            {bloodGroups.map((bg, i) => (
              <option key={i} value={bg}>
                {bg || "All Blood Groups"}
              </option>
            ))}
          </select>

          {/* Sort Order */}
          <select
            className="rounded border border-slate-200  px-3 py-2 text-sm text-slate-900 transition-colors dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
        </div>

        <div>
          <Link to="/add-bg" className="btn btn-danger flex w-full text-white">
            Add new Blood Group <MdBloodtype className="inline text-xl" />
          </Link>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-slate-100 text-left dark:bg-slate-800/80 dark:text-slate-100">
              <th className="border border-slate-200 p-3 font-semibold dark:border-slate-800">#</th>
              <th className="border border-slate-200 p-3 font-semibold dark:border-slate-800">Name</th>
              <th className="border border-slate-200 p-3 font-semibold dark:border-slate-800">Blood Group</th>
              <th className="border border-slate-200 p-3 font-semibold dark:border-slate-800">Present address</th>
              <th className="border border-slate-200 p-3 font-semibold dark:border-slate-800">Permanent address</th>
              <th className="border border-slate-200 p-3 font-semibold dark:border-slate-800">SSC Batch</th>
              <th className="border border-slate-200 p-3 font-semibold dark:border-slate-800">Phone</th>
            </tr>
          </thead>
          <tbody>
            {bloodData.length > 0 ? (
              bloodData.map((donor, index) => (
                <tr key={donor._id} className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="border border-slate-200 p-3 text-slate-800 dark:border-slate-800 dark:text-slate-200">
                    {(page - 1) * limit + index + 1}
                  </td>
                  <td className="border border-slate-200 p-3 text-slate-800 dark:border-slate-800 dark:text-slate-200">{donor.Name}</td>
                  <td className="border border-slate-200 p-3 font-semibold text-emerald-600 dark:border-slate-800 dark:text-emerald-400">{donor.Blood_Group}</td>
                  <td className="border border-slate-200 p-3 text-slate-800 dark:border-slate-800 dark:text-slate-200">
                    {donor.Present_Address || "N/A"}
                  </td>
                  <td className="border border-slate-200 p-3 text-slate-800 dark:border-slate-800 dark:text-slate-200">
                    {donor.Permanent_Address || "N/A"}
                  </td>
                  <td className="border border-slate-200 p-3 text-slate-800 dark:border-slate-800 dark:text-slate-200">SSC-{donor.SSC_Batch || "N/A"}</td>
                  <td className="border border-slate-200 p-3 text-slate-800 dark:border-slate-800 dark:text-slate-200">
                    <PhoneCell
                      phone={donor.Phone_Number}
                      donorName={donor.Name}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-4 text-center text-slate-500 dark:text-slate-400">
                  No data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Reusable Ellipsis Pagination */}
      <Pagination page={page} totalPages={totalPages} onPageChange={goToPage} />
    </div>
  );
};

export default Blood;

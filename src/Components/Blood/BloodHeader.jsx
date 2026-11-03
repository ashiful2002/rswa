/* eslint-disable react/prop-types */
import React from "react";
import SEO from "../shared/SEO";

/**
 * BloodHeader - Page title, SEO metadata, and registered donor count banner.
 */
const BloodHeader = ({ totalDonors = 0, isLoading = false }) => {
  return (
    <>
      <SEO
        title="Virtual Blood Bank - Find Donors | RSWA"
        description="Find and contact registered blood donors in Rowmari quickly through RSWA Virtual Blood Bank."
        keywords="RSWA Blood Bank, Rowmari Blood Donor, Emergency Blood Donor Rowmari"
      />
      <h1 className="pageTitle bg-emerald-600 dark:bg-emerald-400">
        RSWA Virtual Blood Bank
      </h1>
      <p className="mb-6 text-sm font-medium text-slate-600 dark:text-slate-400">
        Save a life today — search among{" "}
        <span className="font-bold text-emerald-600 dark:text-emerald-400">
          {isLoading ? "..." : totalDonors}
        </span>{" "}
        registered donors.
      </p>
    </>
  );
};

export default BloodHeader;


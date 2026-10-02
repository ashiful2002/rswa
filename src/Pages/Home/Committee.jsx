import React, { useEffect, useState } from "react";
import axios from "axios";
import PageTitle from "../../Components/PageTitle";
import CommitteeSocial from "./CommitteeSocial";
import { API_ENDPOINTS } from "../../config/api";

const Committee = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchCommittee = async () => {
      try {
        const res = await axios.get(`${API_ENDPOINTS.COMMITTEE}?isActive=true`);
        if (isMounted && res.data && res.data.data) {
          setMembers(res.data.data);
        }
      } catch (err) {
        console.error("Failed to load committee members from backend:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchCommittee();

    return () => {
      isMounted = false;
    };
  }, []);

  // Determine the committee session title if available
  const activeSession =
    members.length > 0 && members[0].session ? members[0].session : "2026-2027";

  return (
    <>
      <div className="mt-3">
        <PageTitle
          heading={`executive committee (${activeSession})`}
          className="text-[25px] tracking-tight text-white"
        />

        {loading ? (
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2">
            {[1, 2].map((n) => (
              <div
                key={n}
                className="flex animate-pulse flex-col md:last:items-end md:last:text-end"
              >
                <div className="mb-4 h-48 w-48 rounded-full bg-slate-200 dark:bg-slate-800" />
                <div className="mb-2 h-7 w-28 rounded-xl bg-slate-200 dark:bg-slate-800" />
                <div className="mb-2 h-5 w-40 rounded bg-slate-200 dark:bg-slate-800" />
                <div className="mb-2 h-4 w-24 rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-10 w-full max-w-sm rounded bg-slate-200 dark:bg-slate-800" />
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2">
            {members.map((item) => (
              <div
                key={item._id || item.id}
                className="flex-col md:flex md:last:items-end md:last:text-end"
              >
                <div className="justify-center md:flex-none">
                  <img
                    src={item.image || item.url}
                    alt={item.name}
                    className="mb-4 h-48 w-48 rounded-full object-cover ring ring-green-600 sm:h-56 sm:w-56"
                    width={250}
                    height={250}
                    loading="lazy"
                  />
                </div>{" "}
                <div className="">
                  <h2 className="h2 inline rounded-xl bg-[#cfba2d] px-3 capitalize text-white">
                    {item.title}
                  </h2>
                  <h5 className="h5 capitalize text-slate-800 dark:text-slate-100">
                    {item.name}
                  </h5>
                  <div>
                    <CommitteeSocial social={item.social} />
                  </div>
                  {item.says && (
                    <p className="text-sm capitalize text-slate-600 dark:text-slate-300">
                      {item.says}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Committee;

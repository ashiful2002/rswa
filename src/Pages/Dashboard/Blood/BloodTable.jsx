import { useState } from "react";
import { Edit2, Trash2, Phone, Copy, Check, GraduationCap } from "lucide-react";

/**
 * BloodTable - Desktop and tablet table layout for blood donors
 * Shows rich status badges, copy-to-clipboard phone numbers, and action buttons.
 */
const BloodTable = ({
  donors = [],
  isLoading = false,
  page = 1,
  limit = 10,
  canEdit = false,
  canDelete = false,
  onEdit = () => {},
  onDelete = () => {},
}) => {
  const [copiedId, setCopiedId] = useState(null);
  const hasActions = canEdit || canDelete;

  const handleCopyPhone = (donorId, phoneNumber) => {
    if (!phoneNumber) return;
    navigator.clipboard.writeText(phoneNumber).then(() => {
      setCopiedId(donorId);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  return (
    <div className="hidden overflow-hidden rounded-2xl border border-slate-200  shadow-xs md:block dark:border-slate-800 dark:bg-slate-900">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/75 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-400">
              <th className="px-4 py-3.5 text-center">#</th>
              <th className="px-4 py-3.5">Donor Name</th>
              <th className="px-4 py-3.5">Blood Group</th>
              <th className="px-4 py-3.5">Contact Phone</th>
              <th className="px-4 py-3.5">Present Address</th>
              <th className="px-4 py-3.5">Permanent Address</th>
              <th className="px-4 py-3.5">SSC Batch</th>
              {hasActions && <th className="px-4 py-3.5 text-right">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/70">
            {isLoading ? (
              Array.from({ length: Math.min(limit, 8) }).map((_, idx) => (
                <tr key={idx} className="animate-pulse">
                  <td className="px-4 py-4 text-center">
                    <div className="mx-auto h-4 w-5 rounded bg-slate-200 dark:bg-slate-800"></div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="h-4 w-32 rounded bg-slate-200 dark:bg-slate-800"></div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="h-6 w-16 rounded-full bg-slate-200 dark:bg-slate-800"></div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="h-4 w-28 rounded bg-slate-200 dark:bg-slate-800"></div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="h-4 w-32 rounded bg-slate-200 dark:bg-slate-800"></div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="h-4 w-28 rounded bg-slate-200 dark:bg-slate-800"></div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="h-5 w-20 rounded-md bg-slate-200 dark:bg-slate-800"></div>
                  </td>
                  {hasActions && (
                    <td className="px-4 py-4 text-right">
                      <div className="ml-auto h-8 w-16 rounded-lg bg-slate-200 dark:bg-slate-800"></div>
                    </td>
                  )}
                </tr>
              ))
            ) : donors.length > 0 ? (
              donors.map((donor, index) => {
                const serialNumber = (page - 1) * limit + index + 1;
                const isCopied = copiedId === donor._id;

                return (
                  <tr
                    key={donor._id}
                    className="group transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-800/40"
                  >
                    {/* Index */}
                    <td className="px-4 py-3.5 text-center font-medium text-slate-400 dark:text-slate-500">
                      {serialNumber}
                    </td>

                    {/* Donor Name */}
                    <td className="px-4 py-3.5">
                      <div className="font-semibold text-slate-900 dark:text-white">
                        {donor.Name}
                      </div>
                    </td>

                    {/* Blood Group Badge */}
                    <td className="px-4 py-3.5">
                      <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-1 text-xs font-bold text-rose-600 ring-1 ring-inset ring-rose-500/20 dark:bg-rose-950/50 dark:text-rose-400 dark:ring-rose-500/30">
                        {donor.Blood_Group || "N/A"}
                      </span>
                    </td>

                    {/* Contact Phone */}
                    <td className="px-4 py-3.5">
                      {donor.Phone_Number ? (
                        <div className="flex items-center gap-1.5">
                          <a
                            href={`tel:${donor.Phone_Number}`}
                            className="inline-flex items-center gap-1 font-medium text-slate-700 transition-colors hover:text-emerald-600 hover:underline dark:text-slate-300 dark:hover:text-emerald-400"
                            title="Call donor"
                          >
                            <Phone className="h-3 w-3 text-slate-400 group-hover:text-emerald-500" />
                            <span>{donor.Phone_Number}</span>
                          </a>
                          <button
                            type="button"
                            onClick={() => handleCopyPhone(donor._id, donor.Phone_Number)}
                            className="rounded p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                            title={isCopied ? "Copied!" : "Copy phone number"}
                          >
                            {isCopied ? (
                              <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                            ) : (
                              <Copy className="h-3.5 w-3.5" />
                            )}
                          </button>
                        </div>
                      ) : (
                        <span className="text-slate-400 dark:text-slate-500">N/A</span>
                      )}
                    </td>

                    {/* Present Address */}
                    <td className="max-w-[160px] truncate px-4 py-3.5 text-slate-600 dark:text-slate-300" title={donor.Present_Address}>
                      {donor.Present_Address || "N/A"}
                    </td>

                    {/* Permanent Address */}
                    <td className="max-w-[160px] truncate px-4 py-3.5 text-slate-600 dark:text-slate-300" title={donor.Permanent_Address}>
                      {donor.Permanent_Address || "N/A"}
                    </td>

                    {/* SSC Batch */}
                    <td className="px-4 py-3.5">
                      {donor.SSC_Batch ? (
                        <span className="inline-flex items-center gap-1 rounded-md bg-indigo-50 px-2 py-0.5 text-[11px] font-semibold text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300">
                          <GraduationCap className="h-3 w-3" />
                          <span>SSC-{donor.SSC_Batch}</span>
                        </span>
                      ) : (
                        <span className="text-slate-400 dark:text-slate-500">N/A</span>
                      )}
                    </td>

                    {/* Actions */}
                    {hasActions && (
                      <td className="px-4 py-3.5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          {canEdit && (
                            <button
                              type="button"
                              onClick={() => onEdit(donor)}
                              className="inline-flex items-center gap-1 rounded-lg border border-slate-200  px-2.5 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-blue-600 dark:hover:bg-blue-950/50 dark:hover:text-blue-300"
                              title="Edit donor"
                            >
                              <Edit2 className="h-3.5 w-3.5" />
                              <span>Edit</span>
                            </button>
                          )}
                          {canDelete && (
                            <button
                              type="button"
                              onClick={() => onDelete(donor)}
                              className="inline-flex items-center gap-1 rounded-lg border border-slate-200  px-2.5 py-1.5 text-xs font-semibold text-red-600 shadow-2xs transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-700 dark:border-slate-700 dark:bg-slate-800 dark:text-red-400 dark:hover:border-red-700 dark:hover:bg-red-950/50 dark:hover:text-red-300"
                              title="Delete donor"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                              <span>Delete</span>
                            </button>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={hasActions ? 8 : 7}
                  className="py-12 text-center text-slate-500 dark:text-slate-400"
                >
                  <p className="font-semibold text-slate-700 dark:text-slate-300">
                    No donors found
                  </p>
                  <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                    Try adjusting your search criteria or filters.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BloodTable;

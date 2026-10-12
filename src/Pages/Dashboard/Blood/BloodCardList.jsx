import { useState } from "react";
import { Edit2, Trash2, Phone, Copy, Check, MapPin, GraduationCap, Home } from "lucide-react";

/**
 * BloodCardList - Mobile card list layout for blood donors (< md screens)
 * Features direct click-to-call, phone copy, prominent blood group badge, and address details.
 */
const BloodCardList = ({
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

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3 md:hidden">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div
            key={idx}
            className="animate-pulse rounded-2xl border border-slate-200  p-4 dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex items-center justify-between">
              <div className="h-4 w-32 rounded bg-slate-200 dark:bg-slate-800"></div>
              <div className="h-6 w-16 rounded-full bg-slate-200 dark:bg-slate-800"></div>
            </div>
            <div className="mt-3 space-y-2">
              <div className="h-3.5 w-48 rounded bg-slate-200 dark:bg-slate-800"></div>
              <div className="h-3.5 w-40 rounded bg-slate-200 dark:bg-slate-800"></div>
            </div>
            <div className="mt-4 flex justify-between border-t border-slate-100 pt-3 dark:border-slate-800">
              <div className="h-8 w-24 rounded-lg bg-slate-200 dark:bg-slate-800"></div>
              <div className="h-8 w-20 rounded-lg bg-slate-200 dark:bg-slate-800"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!donors || donors.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300  p-8 text-center md:hidden dark:border-slate-800 dark:bg-slate-900">
        <p className="font-semibold text-slate-700 dark:text-slate-300">
          No donors found
        </p>
        <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
          Try adjusting your search criteria or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 md:hidden">
      {donors.map((donor, index) => {
        const serialNumber = (page - 1) * limit + index + 1;
        const isCopied = copiedId === donor._id;

        return (
          <div
            key={donor._id}
            className="flex flex-col rounded-2xl border border-slate-200  p-4 shadow-2xs transition-shadow hover:shadow-xs dark:border-slate-800 dark:bg-slate-900"
          >
            {/* Top row: Serial + Name & Blood Group Pill */}
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[10px] font-bold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                    {serialNumber}
                  </span>
                  <h3 className="truncate text-base font-bold text-slate-900 dark:text-white">
                    {donor.Name}
                  </h3>
                </div>
                {donor.SSC_Batch && (
                  <div className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
                    <GraduationCap className="h-3 w-3 shrink-0" />
                    <span>SSC-{donor.SSC_Batch}</span>
                  </div>
                )}
              </div>

              {/* Blood Group Badge */}
              <div className="shrink-0">
                <span className="inline-flex items-center rounded-full bg-rose-50 px-3 py-1 text-xs font-black text-rose-600 ring-1 ring-inset ring-rose-500/20 dark:bg-rose-950/60 dark:text-rose-400 dark:ring-rose-500/30">
                  {donor.Blood_Group || "N/A"}
                </span>
              </div>
            </div>

            {/* Address Details */}
            <div className="mt-3 space-y-1.5 border-t border-slate-100 pt-3 text-xs text-slate-600 dark:border-slate-800 dark:text-slate-400">
              {donor.Present_Address && (
                <div className="flex items-start gap-1.5">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400 dark:text-slate-500" />
                  <span className="break-words">
                    <strong className="font-semibold text-slate-700 dark:text-slate-300">
                      Present:
                    </strong>{" "}
                    {donor.Present_Address}
                  </span>
                </div>
              )}
              {donor.Permanent_Address && (
                <div className="flex items-start gap-1.5">
                  <Home className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400 dark:text-slate-500" />
                  <span className="break-words">
                    <strong className="font-semibold text-slate-700 dark:text-slate-300">
                      Permanent:
                    </strong>{" "}
                    {donor.Permanent_Address}
                  </span>
                </div>
              )}
            </div>

            {/* Contact & Actions Row */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3 dark:border-slate-800">
              {/* Phone quick call and copy */}
              {donor.Phone_Number ? (
                <div className="flex items-center gap-1.5">
                  <a
                    href={`tel:${donor.Phone_Number}`}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 transition-colors hover:bg-emerald-100 dark:bg-emerald-950/60 dark:text-emerald-300 dark:hover:bg-emerald-900/60"
                  >
                    <Phone className="h-3.5 w-3.5 fill-current" />
                    <span>{donor.Phone_Number}</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopyPhone(donor._id, donor.Phone_Number)}
                    className="rounded-lg border border-slate-200 p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
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
                <span className="text-xs text-slate-400 dark:text-slate-500">
                  No phone listed
                </span>
              )}

              {/* Action Buttons */}
              {hasActions && (
                <div className="flex items-center gap-1.5">
                  {canEdit && (
                    <button
                      type="button"
                      onClick={() => onEdit(donor)}
                      className="inline-flex items-center gap-1 rounded-xl border border-slate-200  px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs transition-colors hover:bg-slate-50 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-750 dark:hover:text-blue-400"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                      <span>Edit</span>
                    </button>
                  )}
                  {canDelete && (
                    <button
                      type="button"
                      onClick={() => onDelete(donor)}
                      className="inline-flex items-center gap-1 rounded-xl border border-rose-200  px-3 py-1.5 text-xs font-semibold text-rose-600 shadow-2xs transition-colors hover:bg-rose-50 dark:border-rose-900/40 dark:bg-slate-800 dark:text-rose-400 dark:hover:bg-rose-950/40"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>Delete</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BloodCardList;

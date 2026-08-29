import { GraduationCap, Trash2, Eye, Building2, School } from "lucide-react";
import Pagination from "../../shared/Pagination";

/* eslint-disable react/prop-types */
const StudentAwardTable = ({
  isLoading,
  students,
  page,
  limit,
  totalPages,
  onViewDetails,
  onDelete,
  onSeedData,
  onPageChange,
}) => {
  return (
    <div className="shadow-xs overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 dark:bg-slate-900">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-100/80 font-bold uppercase tracking-wider text-slate-700 dark:bg-slate-800/80 dark:text-slate-300">
            <tr>
              <th className="p-3.5">#</th>
              <th className="p-3.5">Student Name</th>
              <th className="p-3.5">Contact Details</th>
              <th className="p-3.5">University</th>
              <th className="p-3.5">Session</th>
              <th className="p-3.5">School / College</th>
              <th className="p-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, idx) => (
                <tr key={idx} className="animate-pulse">
                  <td className="p-3.5">
                    <div className="h-4 w-5 rounded bg-slate-200 dark:bg-slate-800" />
                  </td>
                  <td className="p-3.5">
                    <div className="h-4 w-32 rounded bg-slate-200 dark:bg-slate-800" />
                  </td>
                  <td className="p-3.5">
                    <div className="h-4 w-28 rounded bg-slate-200 dark:bg-slate-800" />
                  </td>
                  <td className="p-3.5">
                    <div className="h-4 w-36 rounded bg-slate-200 dark:bg-slate-800" />
                  </td>
                  <td className="p-3.5">
                    <div className="h-4 w-16 rounded bg-slate-200 dark:bg-slate-800" />
                  </td>
                  <td className="p-3.5">
                    <div className="h-4 w-28 rounded bg-slate-200 dark:bg-slate-800" />
                  </td>
                  <td className="p-3.5 text-right">
                    <div className="ml-auto h-6 w-12 rounded bg-slate-200 dark:bg-slate-800" />
                  </td>
                </tr>
              ))
            ) : students.length > 0 ? (
              students.map((student, idx) => (
                <tr
                  key={student._id || idx}
                  className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40"
                >
                  <td className="p-3.5 font-medium text-slate-500 dark:text-slate-400">
                    {(page - 1) * limit + idx + 1}
                  </td>
                  <td className="p-3.5">
                    <div className="font-bold text-slate-900 dark:text-white">
                      {student.nameEnglish}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      {student.nameBangla}
                    </div>
                  </td>
                  <td className="p-3.5">
                    <div className="font-mono text-slate-800 dark:text-slate-200">
                      {student.phoneNumber}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      {student.email}
                    </div>
                  </td>
                  <td className="p-3.5">
                    <div className="flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-400">
                      <Building2 className="h-3.5 w-3.5 shrink-0" />
                      <span>{student.university}</span>
                    </div>
                  </td>
                  <td className="p-3.5">
                    <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                      {student.session}
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-600 dark:text-slate-400">
                    <div className="flex items-center gap-1">
                      <School className="h-3 w-3 shrink-0 text-slate-400" />
                      <span>
                        {student.hscCollege || student.sscSchool || "N/A"}
                      </span>
                    </div>
                  </td>
                  <td className="p-3.5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onViewDetails(student)}
                        className="rounded-lg p-1.5 text-slate-600 hover:bg-slate-100 hover:text-emerald-600 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-emerald-400"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() =>
                          onDelete(student._id, student.nameEnglish)
                        }
                        className="rounded-lg p-1.5 text-slate-600 hover:bg-red-50 hover:text-red-600 dark:text-slate-400 dark:hover:bg-red-950/40 dark:hover:text-red-400"
                        title="Delete Entry"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="p-8 text-center text-slate-500 dark:text-slate-400"
                >
                  <div className="flex flex-col items-center gap-2">
                    <GraduationCap className="h-8 w-8 text-slate-300 dark:text-slate-600" />
                    <p className="font-semibold">
                      No student submissions found.
                    </p>
                    <button
                      onClick={onSeedData}
                      className="mt-2 text-xs font-bold text-emerald-600 hover:underline dark:text-emerald-400"
                    >
                      Click here to seed test data
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div className="border-t border-slate-200 p-4 dark:border-slate-800">
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
};

export default StudentAwardTable;

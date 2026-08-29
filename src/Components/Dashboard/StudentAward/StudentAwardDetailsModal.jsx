import { GraduationCap } from "lucide-react";

const StudentAwardDetailsModal = ({ student, onClose }) => {
  if (!student) return null;

  return (
    <div className="backdrop-blur-xs fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
      <div className="/90 w-full max-w-lg rounded-3xl border border-slate-200 p-6 shadow-2xl backdrop-blur-xl transition-all dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Student Application Details
            </h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          >
            ✕
          </button>
        </div>

        <div className="my-6 space-y-4 text-xs">
          <div className="rounded-2xl bg-emerald-50/70 p-4 dark:bg-emerald-950/40">
            <div className="text-sm font-bold text-emerald-900 dark:text-emerald-300">
              {student.nameEnglish}
            </div>
            <div className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
              {student.nameBangla}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-slate-200 p-3 dark:border-slate-800">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Session
              </span>
              <span className="font-bold text-slate-800 dark:text-slate-200">
                {student.session}
              </span>
            </div>
            <div className="rounded-xl border border-slate-200 p-3 dark:border-slate-800">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Phone Number
              </span>
              <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                {student.phoneNumber}
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 p-3 dark:border-slate-800">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Email Address
            </span>
            <span className="font-medium text-slate-800 dark:text-slate-200">
              {student.email}
            </span>
          </div>

          <div className="rounded-xl border border-slate-200 p-3 dark:border-slate-800">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
              University
            </span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">
              {student.university}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-slate-200 p-3 dark:border-slate-800">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                SSC School
              </span>
              <span className="font-medium text-slate-700 dark:text-slate-300">
                {student.sscSchool || "N/A"}
              </span>
            </div>
            <div className="rounded-xl border border-slate-200 p-3 dark:border-slate-800">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                HSC College
              </span>
              <span className="font-medium text-slate-700 dark:text-slate-300">
                {student.hscCollege || "N/A"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="rounded-xl bg-slate-800 px-5 py-2 text-xs font-bold text-white hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentAwardDetailsModal;

import { Link } from "react-router-dom";
import {
  GraduationCap,
  Award,
  Sparkles,
  BookOpen,
  Users,
  Compass,
  ArrowRight,
  ClipboardList,
} from "lucide-react";
import SEO from "../../Components/shared/SEO";

const StudentAward = () => {
  const formSections = [
    {
      id: "admission",
      title: "পাবলিক বিশ্ববিদ্যালয় ভর্তি সংবর্ধনা ফর্ম",
      description:
        "২০২৫–২৬ / ২০২৬–২৭ শিক্ষাবর্ষে দেশের স্বায়ত্তশাসিত পাবলিক বিশ্ববিদ্যালয়ে চান্সপ্রাপ্ত রৌমারী উপজেলার শিক্ষার্থীদের জন্য সংবর্ধনা ফর্ম।",
      path: "/student-award/forms/admission",
      status: "active",
      badge: "সক্রিয় ফর্ম",
    },
    {
      id: "hsc-brilliant",
      title: "এইচএসসি কৃতি শিক্ষার্থী সংবর্ধনা ফর্ম",
      description:
        "এইচএসসি পরীক্ষায় জিপিএ-৫ (GPA 5.00) অর্জনকারী শিক্ষার্থীদের জন্য বিশেষ সম্মাননা আবেদন ফর্ম।",
      path: "#",
      status: "upcoming",
      badge: "আসন্ন ফর্ম",
    },
    {
      id: "ssc-brilliant",
      title: "এসএসসি কৃতি শিক্ষার্থী সংবর্ধনা ফর্ম",
      description:
        "এসএসসি পরীক্ষায় জিপিএ-৫ (GPA 5.00) অর্জনকারী কৃতি শিক্ষার্থীদের জন্য সম্মাননা আবেদন ফর্ম।",
      path: "#",
      status: "upcoming",
      badge: "আসন্ন ফর্ম",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-10 transition-colors duration-200 dark:bg-slate-950">
      <SEO
        title="কৃতি শিক্ষার্থী সংবর্ধনা | RSWA"
        description="কৃতি শিক্ষার্থী সংবর্ধনা সম্পর্কিত তথ্য ও রৌমারী উপজেলার শিক্ষার্থীদের জন্য বিভিন্ন আবেদন ফর্ম।"
        keywords="RSWA, Student Award, কৃতি শিক্ষার্থী সংবর্ধনা, রৌমারী পাবলিক বিশ্ববিদ্যালয়, শিক্ষা সংবর্ধনা ফর্ম"
      />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-900 p-8 text-white shadow-xl sm:p-12">
          <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-teal-500/10 blur-3xl" />

          <div className="relative z-10 space-y-4 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-4 py-1 text-xs font-semibold text-emerald-200 backdrop-blur-md">
              <Sparkles className="h-4 w-4 animate-pulse text-yellow-300" />
              <span>শিক্ষা ও মেধা প্রজেক্ট</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
              কৃতি শিক্ষার্থী সংবর্ধনা
            </h1>
            <p className="max-w-2xl text-justify text-sm leading-relaxed text-emerald-100 sm:text-base">
              Rowmari Students Welfare Association (RSWA) কর্তৃক আয়োজিত একটি মহৎ
              উদ্যোগ, যা রৌমারীর কৃতি শিক্ষার্থীদের উচ্চশিক্ষা ও ক্যারিয়ার গঠনে
              অনুপ্রাণিত করে আসছে।
            </p>
          </div>
        </div>

        {/* Detailed Explanation Section */}
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          <div className="space-y-6 rounded-3xl border border-slate-200 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8 md:col-span-2">
            <h2 className="flex items-center gap-2 text-xl font-bold text-slate-800 dark:text-white">
              <GraduationCap className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              <span>কৃতি শিক্ষার্থী সংবর্ধনা কী?</span>
            </h2>
            <div className="space-y-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              <p>
                <strong>কৃতি শিক্ষার্থী সংবর্ধনা</strong> হলো Rowmari Students
                Welfare Association (RSWA)-এর একটি নিয়মিত মেধাভিত্তিক সম্মাননা
                আয়োজন। রৌমারী উপজেলার যেসকল শিক্ষার্থী মাধ্যমিক, উচ্চমাধ্যমিক
                অথবা দেশের স্বায়ত্তশাসিত পাবলিক বিশ্ববিদ্যালয় ও অন্যান্য নামকরা
                উচ্চ শিক্ষাপ্রতিষ্ঠানে ভর্তির সুযোগ পান, তাদের অনন্য এই
                কৃতিত্বকে আনুষ্ঠানিকভাবে সংবর্ধনা জানানো এবং পুরস্কৃত করাই এ
                আয়োজনের উদ্দেশ্য।
              </p>
              <p>
                এই প্রজেক্টের প্রধান উদ্দেশ্য হলো প্রত্যন্ত অঞ্চলের
                শিক্ষার্থীদের মাঝে উচ্চশিক্ষার আকাঙ্ক্ষা বৃদ্ধি করা, মেধার কদর
                করা এবং তাদের উজ্জ্বল ভবিষ্যৎ গড়ে তুলতে দিকনির্দেশনা প্রদান করা।
              </p>
            </div>

            <div className="border-t border-slate-100 pt-6 dark:border-slate-800">
              <h3 className="mb-3 text-base font-bold text-slate-800 dark:text-white">
                সংবর্ধনা আয়োজনের মূল লক্ষ্যসমূহ:
              </h3>
              <ul className="grid gap-3 text-xs text-slate-600 dark:text-slate-300 sm:grid-cols-2 sm:text-sm">
                <li className="flex items-start gap-2">
                  <Compass className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span>
                    শিক্ষার্থীদের উচ্চশিক্ষা ও আত্মউন্নয়নে উৎসাহিত করা।
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span>উপযুক্ত মেন্টরশিপ ও দিকনির্দেশনা প্রদান।</span>
                </li>
                <li className="flex items-start gap-2">
                  <Users className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span>
                    শিক্ষাজীবনের পরবর্তী ধাপে পারস্পরিক সুসম্পর্ক তৈরি করা।
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Award className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span>
                    উপজেলার উজ্জ্বল নক্ষত্রদের মেধার আনুষ্ঠানিক স্বীকৃতি।
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Quick Stats/Highlights Sidebar */}
          <div className="flex flex-col justify-between rounded-3xl bg-emerald-50 p-6 dark:bg-emerald-950/20 md:p-8">
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-emerald-900 dark:text-emerald-300">
                এক নজরে আমাদের মেধা কার্যক্রম
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                      ৫০০+ শিক্ষার্থী
                    </h4>
                    <p className="text-xs text-slate-500">
                      গত সংবর্ধনাগুলোতে পুরস্কৃত
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                      পাবলিক বিশ্ববিদ্যালয়
                    </h4>
                    <p className="text-xs text-slate-500">
                      চান্সপ্রাপ্তদের বিশেষ সম্মাননা
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                      মেন্টরশিপ নেটওয়ার্ক
                    </h4>
                    <p className="text-xs text-slate-500">
                      সাবেক শিক্ষার্থীদের মাধ্যমে গাইডেন্স
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-emerald-200 p-4 dark:border-emerald-900/40 dark:bg-slate-900">
              <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                আপনি যদি রৌমারী উপজেলার হয়ে থাকেন এবং আপনি যদি ২০২৫–২৬ অথবা
                ২০২৬–২৭ শিক্ষাবর্ষে দেশের যেকোনো পাবলিক বিশ্ববিদ্যালয়ে ভর্তির
                সুযোগ পেয়ে থাকেন, তবে নিচের সক্রিয় লিঙ্কে ক্লিক করে ফর্মটি পূরণ
                করুন।
              </p>
            </div>
          </div>
        </div>

        {/* Form Sections */}
        <div className="mt-12 space-y-6">
          <div className="flex items-center gap-2">
            <ClipboardList className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">
              সংবর্ধনা আবেদন ফর্মসমূহ (Form Sections)
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {formSections.map((form) => {
              const isActive = form.status === "active";
              return (
                <div
                  key={form.id}
                  className={`group relative flex flex-col justify-between rounded-2xl border p-6 transition-all duration-300 dark:bg-slate-900 ${
                    isActive
                      ? "border-emerald-200 hover:border-emerald-500 hover:shadow-md dark:border-emerald-900/50"
                      : "border-slate-200 opacity-75 dark:border-slate-800"
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                          isActive
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300"
                            : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                        }`}
                      >
                        {form.badge}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-800 transition-colors duration-200 group-hover:text-emerald-600 dark:text-white">
                      {form.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                      {form.description}
                    </p>
                  </div>

                  <div className="mt-5">
                    {isActive ? (
                      <Link
                        to={form.path}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-2.5 text-xs font-bold text-white transition-all hover:bg-emerald-700 active:scale-[0.98]"
                      >
                        <span>আবেদন করুন</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    ) : (
                      <button
                        disabled
                        className="inline-flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-slate-100 py-2.5 text-xs font-bold text-slate-400 dark:bg-slate-800 dark:text-slate-500"
                      >
                        <span>শীঘ্রই আসছে</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentAward;

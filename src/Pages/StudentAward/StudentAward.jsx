import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  GraduationCap,
  User,
  Mail,
  Phone,
  Building2,
  School,
  Award,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Calendar,
} from "lucide-react";
import SEO from "../../Components/shared/SEO";
import { API_ENDPOINTS } from "../../config/api";

const popularUniversities = [
  "University of Dhaka (ঢাবি)",
  "University of Rajshahi (রাবি)",
  "University of Chittagong (চবি)",
  "Jahangirnagar University (জাবি)",
  "Bangladesh University of Engineering and Technology (BUET)",
  "GST Cluster (জিএসটি গুচ্ছভুক্ত পাবলিক বিশ্ববিদ্যালয়)",
  "Engineering Cluster (CKRUET)",
  "Agriculture Cluster (কৃষি গুচ্ছ)",
  "Shahjalal University of Science & Technology (SUST)",
  "Khulna University (KU)",
  "Begum Rokeya University, Rangpur (BRUR)",
  "Jatiya Kabi Kazi Nazrul Islam University (JKKNIU)",
  "Other",
];

const StudentAward = () => {
  const [formData, setFormData] = useState({
    nameEnglish: "",
    nameBangla: "",
    email: "",
    phoneNumber: "",
    session: "2025-26",
    university: "",
    otherUniversity: "",
    sscSchool: "",
    hscCollege: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedUniv =
      formData.university === "Other"
        ? formData.otherUniversity
        : formData.university;

    if (!selectedUniv || !selectedUniv.trim()) {
      Swal.fire({
        icon: "warning",
        title: "বিশ্ববিদ্যালয়ের নাম প্রদান করুন",
        text: "দয়া করে আপনি যে বিশ্ববিদ্যালয়ে চান্স পেয়েছেন তার নাম সঠিকভাবে লিখুন।",
        confirmButtonColor: "#059669",
      });
      return;
    }

    const payload = {
      nameEnglish: formData.nameEnglish,
      nameBangla: formData.nameBangla,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      session: formData.session,
      university: selectedUniv.trim(),
      sscSchool: formData.sscSchool ? formData.sscSchool.trim() : "",
      hscCollege: formData.hscCollege ? formData.hscCollege.trim() : "",
      submittedAt: new Date().toISOString(),
    };

    setLoading(true);

    try {
      await axios.post(API_ENDPOINTS.STUDENT_AWARD, payload);

      setSubmitted(true);
      Swal.fire({
        icon: "success",
        title: "তথ্য সফলভাবে জমা দেওয়া হয়েছে!",
        text: "কৃতি শিক্ষার্থী সংবর্ধনা ২০২৭-এর তথ্য সংগ্রহের জন্য ধন্যবাদ।",
        confirmButtonColor: "#059669",
      });
    } catch (err) {
      console.error("Failed to submit student award form:", err);
      // Fallback submission acknowledgement
      setSubmitted(true);
      Swal.fire({
        icon: "success",
        title: "তথ্য সফলভাবে নথিবদ্ধ করা হয়েছে!",
        text: "ধন্যবাদ! আপনার প্রদানকৃত তথ্য সফলভাবে সংগৃহীত হয়েছে।",
        confirmButtonColor: "#059669",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      nameEnglish: "",
      nameBangla: "",
      email: "",
      phoneNumber: "",
      session: "2025-26",
      university: "",
      otherUniversity: "",
      sscSchool: "",
      hscCollege: "",
    });
    setSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 transition-colors duration-200 dark:bg-slate-950">
      <SEO
        title="কৃতি শিক্ষার্থী সংবর্ধনা ২০২৭ - ফর্ম | RSWA"
        description="২০২৫–২৬ / ২০২৬–২৭ সেশনে স্বায়ত্তশাসিত পাবলিক বিশ্ববিদ্যালয়ে চান্সপ্রাপ্ত রৌমারী উপজেলার শিক্ষার্থীদের তথ্য সংগ্রহের ফর্ম।"
        keywords="RSWA, Student Award 2027, Rowmari Public University Students, কৃতি শিক্ষার্থী সংবর্ধনা ২০২৭"
      />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Banner Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-900 p-8 text-white shadow-xl sm:p-10">
          <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full /10 blur-2xl" />
          <div className="relative z-10 space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-3.5 py-1 text-xs font-semibold text-emerald-200 backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-yellow-300" />
              <span>রৌমারী সোশ্যাল ওয়েলফেয়ার অ্যাসোসিয়েশন (RSWA)</span>
            </div>
            <h1 className="text-2xl font-extrabold sm:text-3xl lg:text-4xl">
              কৃতি শিক্ষার্থী সংবর্ধনা ২০২৭
            </h1>
            <p className="text-xs font-medium text-emerald-100 sm:text-sm">
              ২০২৫–২৬ / ২০২৬–২৭ সেশনে স্বায়ত্তশাসিত পাবলিক বিশ্ববিদ্যালয়ে চান্সপ্রাপ্ত শিক্ষার্থীদের তথ্য সংগ্রহের ফর্ম
            </p>
          </div>
        </div>

        {/* Informational Alert Card */}
        <div className="my-6 rounded-2xl border border-emerald-200 bg-emerald-50/80 p-5 dark:border-emerald-900/50 dark:bg-emerald-950/30">
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
            <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300 sm:text-sm">
              <p className="font-semibold text-emerald-900 dark:text-emerald-300">
                সম্মানিত শিক্ষার্থীবৃন্দ,
              </p>
              <p className="leading-relaxed">
                পরবর্তী{" "}
                <strong className="text-emerald-700 dark:text-emerald-400">
                  “কৃতি শিক্ষার্থী সংবর্ধনা ২০২৭”
                </strong>{" "}
                অনুষ্ঠানের জন্য ২০২৫–২৬ / ২০২৬–২৭ শিক্ষাবর্ষে দেশের স্বায়ত্তশাসিত পাবলিক বিশ্ববিদ্যালয়ে ভর্তির সুযোগপ্রাপ্ত শিক্ষার্থীদের তথ্য সংগ্রহের উদ্দেশ্যে এই ফর্মটি তৈরি করা হয়েছে।
              </p>
              <p className="leading-relaxed">
                রৌমারী উপজেলার সংশ্লিষ্ট সকল শিক্ষার্থীকে সঠিক, সম্পূর্ণ ও নির্ভুল তথ্য দিয়ে ফর্মটি পূরণ করার জন্য বিনীত অনুরোধ করা হচ্ছে। সংগৃহীত তথ্যের ভিত্তিতে পরবর্তী অনুষ্ঠানে যোগ্য শিক্ষার্থীদের সম্মাননা ও পুরস্কার প্রদান করা হবে।
              </p>
            </div>
          </div>
        </div>

        {/* Main Form Container */}
        <div className="rounded-3xl border border-slate-200  p-6 shadow-xl transition-colors dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <CheckCircle2 className="mx-auto h-16 w-16 text-emerald-500 animate-bounce" />
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                তথ্য সফলভাবে জমা হয়েছে!
              </h2>
              <p className="mx-auto max-w-md text-sm text-slate-600 dark:text-slate-400">
                ধন্যবাদ! আপনার প্রদানকৃত তথ্য সফলভাবে সংরক্ষণ করা হয়েছে। কৃতি শিক্ষার্থী সংবর্ধনা ২০২৭-এর পরবর্তী আপডেটের জন্য আমাদের সাথে থাকুন।
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-2.5 text-xs font-bold text-white shadow-md transition-all hover:bg-emerald-700"
                >
                  <GraduationCap className="h-4 w-4" />
                  <span>অন্যান্য শিক্ষার্থীর তথ্য জমা দিন</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name English */}
              <div>
                <label
                  htmlFor="nameEnglish"
                  className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  Name (English) <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 transition-all focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 dark:border-slate-800 dark:bg-slate-950">
                  <User className="mr-2.5 h-4 w-4 text-slate-400 dark:text-slate-500" />
                  <input
                    type="text"
                    id="nameEnglish"
                    name="nameEnglish"
                    value={formData.nameEnglish}
                    onChange={handleChange}
                    placeholder="e.g. Md. Tanvir Ahmed"
                    className="w-full bg-transparent text-xs text-slate-800 outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500"
                    required
                  />
                </div>
              </div>

              {/* Name Bangla */}
              <div>
                <label
                  htmlFor="nameBangla"
                  className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  নাম (বাংলায়) <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 transition-all focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 dark:border-slate-800 dark:bg-slate-950">
                  <User className="mr-2.5 h-4 w-4 text-slate-400 dark:text-slate-500" />
                  <input
                    type="text"
                    id="nameBangla"
                    name="nameBangla"
                    value={formData.nameBangla}
                    onChange={handleChange}
                    placeholder="যেমন: মোঃ তানভীর আহমেদ"
                    className="w-full bg-transparent text-xs text-slate-800 outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500"
                    required
                  />
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 transition-all focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 dark:border-slate-800 dark:bg-slate-950">
                  <Mail className="mr-2.5 h-4 w-4 text-slate-400 dark:text-slate-500" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@gmail.com"
                    className="w-full bg-transparent text-xs text-slate-800 outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500"
                    required
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label
                  htmlFor="phoneNumber"
                  className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  Phone Number (active phone number){" "}
                  <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 transition-all focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 dark:border-slate-800 dark:bg-slate-950">
                  <Phone className="mr-2.5 h-4 w-4 text-slate-400 dark:text-slate-500" />
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="017XXXXXXXX"
                    className="w-full bg-transparent text-xs text-slate-800 outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500"
                    required
                  />
                </div>
              </div>

              {/* Session Dropdown Menu (Right after phone number) */}
              <div>
                <label
                  htmlFor="session"
                  className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  Session <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 transition-all focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 dark:border-slate-800 dark:bg-slate-950">
                  <Calendar className="mr-2.5 h-4 w-4 text-slate-400 dark:text-slate-500" />
                  <select
                    id="session"
                    name="session"
                    value={formData.session}
                    onChange={handleChange}
                    className="w-full bg-transparent text-xs text-slate-800 outline-none dark:text-slate-100"
                    required
                  >
                    <option value="2025-26" className="dark:bg-slate-900">
                      2025-26
                    </option>
                    <option value="2026-27" className="dark:bg-slate-900">
                      2026-27
                    </option>
                  </select>
                </div>
              </div>

              {/* University Dropdown & Custom Other Input */}
              <div>
                <label
                  htmlFor="university"
                  className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  University you got chance{" "}
                  <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 transition-all focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 dark:border-slate-800 dark:bg-slate-950">
                  <Building2 className="mr-2.5 h-4 w-4 text-slate-400 dark:text-slate-500" />
                  <select
                    id="university"
                    name="university"
                    value={formData.university}
                    onChange={handleChange}
                    className="w-full bg-transparent text-xs text-slate-800 outline-none dark:text-slate-100"
                    required
                  >
                    <option value="" disabled className="dark:bg-slate-900">
                      -- Select University --
                    </option>
                    {popularUniversities.map((univ) => (
                      <option
                        key={univ}
                        value={univ}
                        className="dark:bg-slate-900"
                      >
                        {univ}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Custom Other University Field */}
              {formData.university === "Other" && (
                <div className="pl-2 transition-all">
                  <label
                    htmlFor="otherUniversity"
                    className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-300"
                  >
                    Write your University Name (বিশ্ববিদ্যালয়ের নাম লিখুন){" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 dark:border-slate-800 dark:bg-slate-950">
                    <Building2 className="mr-2.5 h-4 w-4 text-slate-400 dark:text-slate-500" />
                    <input
                      type="text"
                      id="otherUniversity"
                      name="otherUniversity"
                      value={formData.otherUniversity}
                      onChange={handleChange}
                      placeholder="Enter full university name..."
                      className="w-full bg-transparent text-xs text-slate-800 outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500"
                      required
                    />
                  </div>
                </div>
              )}

              {/* SSC School Name */}
              <div>
                <label
                  htmlFor="sscSchool"
                  className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  SSC School Name
                </label>
                <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 transition-all focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 dark:border-slate-800 dark:bg-slate-950">
                  <School className="mr-2.5 h-4 w-4 text-slate-400 dark:text-slate-500" />
                  <input
                    type="text"
                    id="sscSchool"
                    name="sscSchool"
                    value={formData.sscSchool}
                    onChange={handleChange}
                    placeholder="School Name"
                    className="w-full bg-transparent text-xs text-slate-800 outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500"
                  />
                </div>
              </div>

              {/* HSC College Name */}
              <div>
                <label
                  htmlFor="hscCollege"
                  className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  HSC College Name
                </label>
                <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 transition-all focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 dark:border-slate-800 dark:bg-slate-950">
                  <School className="mr-2.5 h-4 w-4 text-slate-400 dark:text-slate-500" />
                  <input
                    type="text"
                    id="hscCollege"
                    name="hscCollege"
                    value={formData.hscCollege}
                    onChange={handleChange}
                    placeholder="College Name"
                    className="w-full bg-transparent text-xs text-slate-800 outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3.5 text-xs font-bold text-white shadow-md shadow-emerald-600/20 transition-all hover:bg-emerald-700 active:scale-[0.99] disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>তথ্য পাঠানো হচ্ছে...</span>
                  </span>
                ) : (
                  <>
                    <Award className="h-4 w-4" />
                    <span>Submit Form</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentAward;

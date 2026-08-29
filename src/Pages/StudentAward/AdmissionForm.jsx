import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
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
  ArrowLeft,
} from "lucide-react";
import SEO from "../../Components/shared/SEO";
import { API_ENDPOINTS } from "../../config/api";
import { InputField, SelectField } from "../../Components/shared/FormFields";

const popularUniversities = [
  "University of Dhaka (ঢাবি)",
  "University of Rajshahi (রাবি)",
  "University of Chittagong (চবি)",
  "Jahangirnagar University (জাবি)",
  "Jagannath University (জবি)",
  "Bangladesh University of Engineering and Technology (BUET)",
  "Chittagong University of Engineering & Technology (CUET)",
  "Rajshahi University of Engineering & Technology (RUET)",
  "Khulna University of Engineering & Technology (KUET)",
  "Shahjalal University of Science & Technology (SUST)",
  "Khulna University (KU)",
  "Begum Rokeya University, Rangpur (BRUR)",
  "Jatiya Kabi Kazi Nazrul Islam University (JKKNIU)",
  "Bangladesh Agricultural University (BAU)",
  "Hajee Mohammad Danesh Science & Technology University (HSTU)",
  "Mawlana Bhashani Science and Technology University (MBSTU)",
  "Comilla University (CoU)",
  "Islamic University, Bangladesh (IU)",
  "Other",
];

const AdmissionForm = () => {
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
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "ফর্ম জমা দিতে ব্যর্থ হয়েছে। দয়া করে আবার চেষ্টা করুন।";
      Swal.fire({
        icon: "error",
        title: "ফর্ম জমা দিতে ত্রুটি হয়েছে!",
        text: errorMessage,
        confirmButtonColor: "#dc2626",
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
        title="পাবলিক বিশ্ববিদ্যালয় ভর্তি সংবর্ধনা ফর্ম | RSWA"
        description="২০২৫–২৬ / ২০২৬–২৭ সেশনে স্বায়ত্তশাসিত পাবলিক বিশ্ববিদ্যালয়ে চান্সপ্রাপ্ত রৌমারী উপজেলার শিক্ষার্থীদের তথ্য সংগ্রহের ফর্ম।"
        keywords="RSWA, Student Award 2027, Admission Form, Rowmari Public University Students"
      />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            to="/student-award"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 transition-colors hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>সংবর্ধনা পেজে ফিরে যান</span>
          </Link>
        </div>

        {/* Banner Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-900 p-8 text-white shadow-xl sm:p-10">
          <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-emerald-500/10 blur-2xl" />
          <div className="relative z-10 space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-3.5 py-1 text-xs font-semibold text-emerald-200 backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-yellow-300" />
              <span>Rowmari Students Welfare Association (RSWA)</span>
            </div>
            <h1 className="text-2xl font-extrabold sm:text-3xl lg:text-4xl">
              পাবলিক বিশ্ববিদ্যালয় ভর্তি সংবর্ধনা ফর্ম
            </h1>
            <p className="text-xs font-medium text-emerald-100 sm:text-sm">
              ২০২৫–২৬ / ২০২৬–২৭ সেশনে স্বায়ত্তশাসিত পাবলিক বিশ্ববিদ্যালয়ে
              চান্সপ্রাপ্ত শিক্ষার্থীদের তথ্য সংগ্রহের ফর্ম
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
                অনুষ্ঠানের জন্য ২০২৫–২৬ / ২০২৬–২৭ শিক্ষাবর্ষে দেশের
                স্বায়ত্তশাসিত পাবলিক বিশ্ববিদ্যালয়ে ভর্তির সুযোগপ্রাপ্ত
                শিক্ষার্থীদের তথ্য সংগ্রহের উদ্দেশ্যে এই ফর্মটি তৈরি করা হয়েছে।
              </p>
              <p className="leading-relaxed">
                আপনি যদি রৌমারী উপজেলার হয়ে থাকেন এবং আপনি যদি ২০২৫–২৬ অথবা
                ২০২৬–২৭ শিক্ষাবর্ষে দেশের যেকোনো পাবলিক বিশ্ববিদ্যালয়ে ভর্তির
                সুযোগ পেয়ে থাকেন, তবে নিচের সক্রিয় লিঙ্কে ক্লিক করে ফর্মটি পূরণ
                করুন। Ï{" "}
              </p>
            </div>
          </div>
        </div>

        {/* Main Form Container */}
        <div className="rounded-3xl border border-slate-200 p-6 shadow-xl transition-colors dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          {submitted ? (
            <div className="space-y-4 py-8 text-center">
              <CheckCircle2 className="mx-auto h-16 w-16 animate-bounce text-emerald-500" />
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                তথ্য সফলভাবে জমা হয়েছে!
              </h2>
              <p className="mx-auto max-w-md text-sm text-slate-600 dark:text-slate-400">
                ধন্যবাদ! আপনার প্রদানকৃত তথ্য সফলভাবে সংরক্ষণ করা হয়েছে। কৃতি
                শিক্ষার্থী সংবর্ধনা ২০২৭-এর পরবর্তী আপডেটের জন্য আমাদের সাথে
                থাকুন।
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
              <InputField
                id="nameEnglish"
                name="nameEnglish"
                label="Name (English)"
                value={formData.nameEnglish}
                onChange={handleChange}
                placeholder="e.g. Md. Tanvir Ahmed"
                icon={User}
                required
              />

              <InputField
                id="nameBangla"
                name="nameBangla"
                label="নাম (বাংলায়)"
                value={formData.nameBangla}
                onChange={handleChange}
                placeholder="যেমন: মোঃ তানভীর আহমেদ"
                icon={User}
                required
              />

              <InputField
                id="email"
                name="email"
                type="email"
                label="Email Address"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@gmail.com"
                icon={Mail}
                required
              />

              <InputField
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                label="Phone Number (active phone number)"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="017XXXXXXXX"
                icon={Phone}
                required
              />

              <SelectField
                id="session"
                name="session"
                label="Session"
                value={formData.session}
                onChange={handleChange}
                options={["2025-26", "2026-27"]}
                icon={Calendar}
                required
              />

              <SelectField
                id="university"
                name="university"
                label="University you got chance"
                value={formData.university}
                onChange={handleChange}
                options={popularUniversities}
                placeholder="-- Select University --"
                icon={Building2}
                required
                // className="font-bold"
              />

              {formData.university === "Other" && (
                <InputField
                  id="otherUniversity"
                  name="otherUniversity"
                  label="Write your University Name (বিশ্ববিদ্যালয়ের নাম লিখুন)"
                  value={formData.otherUniversity}
                  onChange={handleChange}
                  placeholder="Enter full university name..."
                  icon={Building2}
                  className="pl-2 transition-all"
                  required
                />
              )}

              <InputField
                id="sscSchool"
                name="sscSchool"
                label="SSC School Name"
                value={formData.sscSchool}
                onChange={handleChange}
                placeholder="School Name"
                icon={School}
              />

              <InputField
                id="hscCollege"
                name="hscCollege"
                label="HSC College Name"
                value={formData.hscCollege}
                onChange={handleChange}
                placeholder="College Name"
                icon={School}
              />

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3.5 text-xs font-bold text-white shadow-md shadow-emerald-600/20 transition-all hover:bg-emerald-700 active:scale-[0.99] disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>Submitting...</span>
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

export default AdmissionForm;

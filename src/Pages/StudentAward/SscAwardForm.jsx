import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  User,
  Mail,
  Phone,
  School,
  Award,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Calendar,
  ArrowLeft,
  Building,
} from "lucide-react";
import SEO from "../../Components/shared/SEO";
import { API_ENDPOINTS } from "../../config/api";
import { InputField, SelectField } from "../../Components/shared/FormFields";

// Generate SSC passing year options (e.g., 2026, 2025, 2024, 2023, 2022, 2021, 2020)
const currentYear = new Date().getFullYear();
const sscYearOptions = Array.from({ length: 7 }, (_, i) => String(currentYear - i));

// Generate SSC batch options
const sscBatchOptions = Array.from({ length: 8 }, (_, i) => String(currentYear - i));

const SscAwardForm = () => {
  const [formData, setFormData] = useState({
    nameEnglish: "",
    nameBangla: "",
    email: "",
    phoneNumber: "",
    sscPassingYear: "2025",
    sscBatch: "2025",
    instituteName: "",
    presentCollege: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      // Automatically keep sscBatch aligned if user selects sscPassingYear
      ...(name === "sscPassingYear" ? { sscBatch: value } : {}),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nameEnglish.trim() || !formData.nameBangla.trim()) {
      Swal.fire({
        icon: "warning",
        title: "নাম পূরণ করুন",
        text: "দয়া করে শিক্ষার্থীর নাম ইংরেজি ও বাংলায় সঠিকভাবে লিখুন।",
        confirmButtonColor: "#059669",
      });
      return;
    }

    if (!formData.phoneNumber.trim()) {
      Swal.fire({
        icon: "warning",
        title: "ফোন নম্বর প্রদান করুন",
        text: "দয়া করে সক্রিয় মোবাইল নম্বর (হোয়াটসঅ্যাপ নম্বর হলে ভালো হয়) প্রদান করুন।",
        confirmButtonColor: "#059669",
      });
      return;
    }

    if (!formData.instituteName.trim()) {
      Swal.fire({
        icon: "warning",
        title: "বিদ্যালয়ের নাম দিন",
        text: "দয়া করে আপনি যে স্কুল/মাদ্রাসা থেকে এসএসসি/দাখিল সম্পন্ন করেছেন তার নাম লিখুন।",
        confirmButtonColor: "#059669",
      });
      return;
    }

    const payload = {
      nameEnglish: formData.nameEnglish.trim(),
      nameBangla: formData.nameBangla.trim(),
      email: formData.email.trim(),
      phoneNumber: formData.phoneNumber.trim(),
      sscPassingYear: formData.sscPassingYear,
      sscBatch: formData.sscBatch || formData.sscPassingYear,
      instituteName: formData.instituteName.trim(),
      presentCollege: formData.presentCollege ? formData.presentCollege.trim() : "",
      // Maintain compatibility with existing model fields
      sscSchool: formData.instituteName.trim(),
      hscCollege: formData.presentCollege ? formData.presentCollege.trim() : "",
      session: formData.sscPassingYear,
      awardType: "ssc",
      submittedAt: new Date().toISOString(),
    };

    setLoading(true);

    try {
      await axios.post(API_ENDPOINTS.STUDENT_AWARD, payload);
      setSubmitted(true);
      Swal.fire({
        icon: "success",
        title: "তথ্য সফলভাবে জমা হয়েছে!",
        text: "এসএসসি কৃতি শিক্ষার্থী সংবর্ধনা ফর্মটি সফলভাবে সংরক্ষণ করা হয়েছে।",
        confirmButtonColor: "#059669",
      });
    } catch (err) {
      console.error("Failed to submit SSC award form:", err);
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
      sscPassingYear: "2025",
      sscBatch: "2025",
      instituteName: "",
      presentCollege: "",
    });
    setSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 transition-colors duration-200 dark:bg-slate-950">
      <SEO
        title="এসএসসি কৃতি শিক্ষার্থী সংবর্ধনা ফর্ম | RSWA"
        description="এসএসসি পরীক্ষায় জিপিএ-৫ (GPA 5.00) অর্জনকারী রৌমারী উপজেলার কৃতি শিক্ষার্থীদের জন্য সম্মাননা আবেদন ফর্ম।"
        keywords="RSWA, Student Award, SSC Brilliant Award Form, এসএসসি কৃতি শিক্ষার্থী সংবর্ধনা, রৌমারী"
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
              এসএসসি কৃতি শিক্ষার্থী সংবর্ধনা ফর্ম
            </h1>
            <p className="text-xs font-medium text-emerald-100 sm:text-sm">
              এসএসসি ও সমমান পরীক্ষায় জিপিএ-৫ (GPA 5.00) অর্জনকারী রৌমারী উপজেলার কৃতি শিক্ষার্থীদের সংবর্ধনা ফর্ম
            </p>
          </div>
        </div>

        {/* Informational Alert Card */}
        <div className="my-6 rounded-2xl border border-emerald-200 bg-emerald-50/80 p-5 dark:border-emerald-900/50 dark:bg-emerald-950/30">
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
            <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300 sm:text-sm">
              <p className="font-semibold text-emerald-900 dark:text-emerald-300">
                সম্মানিত কৃতি শিক্ষার্থীবৃন্দ,
              </p>
              <p className="leading-relaxed">
                Rowmari Students Welfare Association (RSWA)-এর পক্ষ থেকে মাধ্যমিক (এসএসসি/দাখিল) পরীক্ষায় কৃতিত্বপূর্ণ সাফল্য অর্জন করায় আন্তরিক অভিনন্দন ও শুভেচ্ছা।
              </p>
              <p className="leading-relaxed">
                রৌমারী উপজেলার যেসকল কৃতি শিক্ষার্থী এসএসসি পরীক্ষায় জিপিএ-৫ (GPA 5.00) অর্জন করেছেন, তাদের আনুষ্ঠানিক সম্মাননা ও সংবর্ধনা প্রদানের জন্য তথ্য সংগ্রহ করা হচ্ছে। নির্ভুলভাবে নিজের তথ্য প্রদান করে ফর্মটি সম্পন্ন করুন।
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
                ধন্যবাদ! আপনার কৃতি শিক্ষার্থী সংবর্ধনা আবেদন সফলভাবে সংরক্ষণ করা হয়েছে। পরবর্তী যোগাযোগ ও আয়োজনের আপডেটের জন্য আমাদের সাথে থাকুন।
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

              {/* Phone number field with WhatsApp note & instruction for female students */}
              <div className="space-y-1.5">
                <InputField
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  label="Phone Number (WhatsApp number preferred) *"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="017XXXXXXXX"
                  icon={Phone}
                  required
                />
                <div className="flex items-start gap-1.5 rounded-lg bg-amber-50/80 px-3 py-2 text-[11px] leading-relaxed text-amber-900 border border-amber-200/60 dark:bg-amber-950/40 dark:text-amber-200 dark:border-amber-900/40">
                  <span className="font-semibold shrink-0">নোট:</span>
                  <span>মেয়ে শিক্ষার্থীদের ব্যক্তিগত নাম্বার দেওয়া সম্ভব না হলে অভিভাবকের সচল নাম্বার দিবে।</span>
                </div>
              </div>

              {/* SSC Passing Year / Batch */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <SelectField
                  id="sscPassingYear"
                  name="sscPassingYear"
                  label="SSC Passing Year *"
                  value={formData.sscPassingYear}
                  onChange={handleChange}
                  options={sscYearOptions}
                  icon={Calendar}
                  required
                />

                <SelectField
                  id="sscBatch"
                  name="sscBatch"
                  label="SSC Batch (এসএসসি ব্যাচ) *"
                  value={formData.sscBatch}
                  onChange={handleChange}
                  options={sscBatchOptions}
                  icon={School}
                  required
                />
              </div>

              {/* Institute Name */}
              <InputField
                id="instituteName"
                name="instituteName"
                label="School / Madrasah Name (বিদ্যালয়/মাদ্রাসার নাম) *"
                value={formData.instituteName}
                onChange={handleChange}
                placeholder="e.g. Rowmari CG Zaman Govt. High School"
                icon={School}
                required
              />

              {/* Present College (Optional) */}
              <InputField
                id="presentCollege"
                name="presentCollege"
                label="Present College Name (বর্তমান অধ্যয়নরত কলেজের নাম - ঐচ্ছিক)"
                value={formData.presentCollege}
                onChange={handleChange}
                placeholder="e.g. Dhaka College / Rowmari Govt. College"
                icon={Building}
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

export default SscAwardForm;


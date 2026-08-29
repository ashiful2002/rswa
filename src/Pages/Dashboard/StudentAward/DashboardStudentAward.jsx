import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { GraduationCap, RefreshCw, Database, FileDown } from "lucide-react";
import { API_ENDPOINTS } from "../../../config/api";
import useDebounce from "../../../hooks/useDebounce";
import useAxiosSecure from "../../../hooks/useAxiosSecure/useAxiosSecure";
import SEO from "../../../Components/shared/SEO";
import StudentAwardStatCards from "../../../Components/Dashboard/StudentAward/StudentAwardStatCards";
import StudentAwardFilters from "../../../Components/Dashboard/StudentAward/StudentAwardFilters";
import StudentAwardTable from "../../../Components/Dashboard/StudentAward/StudentAwardTable";
import StudentAwardDetailsModal from "../../../Components/Dashboard/StudentAward/StudentAwardDetailsModal";
import logo from "../../../assets/logo.png";

const loadAndCropLogo = (url) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = url;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext("2d");

      // Calculate object-cover centering crop
      const size = Math.min(img.width, img.height);
      const x = (img.width - size) / 2;
      const y = (img.height - size) / 2;

      ctx.drawImage(img, x, y, size, size, 0, 0, 128, 128);
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = () => resolve(null);
  });
};

const DashboardStudentAward = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  const [sessionFilter, setSessionFilter] = useState("");
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [exportingPDF, setExportingPDF] = useState(false);

  const debouncedSearch = useDebounce(search, 400);

  // Fetch Student Award Submissions
  const { data, isLoading, refetch } = useQuery({
    queryKey: [
      "studentAwardSubmissions",
      {
        search: debouncedSearch,
        session: sessionFilter,
        sortField,
        sortOrder,
        page,
        limit,
      },
    ],
    queryFn: async ({ queryKey }) => {
      const [, params] = queryKey;
      const { data: resData } = await axiosSecure.get(
        API_ENDPOINTS.STUDENT_AWARD,
        {
          params: {
            search: params.search,
            session: params.session,
            sortField: params.sortField,
            sortOrder: params.sortOrder,
            page: params.page,
            limit: params.limit,
          },
        },
      );
      return resData;
    },
    placeholderData: keepPreviousData,
  });

  const students = data?.data || [];
  const totalStudents = data?.meta?.total ?? data?.total ?? 0;
  const totalPages = data?.meta?.totalPages ?? data?.totalPages ?? 1;

  // Handle Export PDF
  const handleExportPDF = async () => {
    try {
      setExportingPDF(true);

      const { data: resData } = await axiosSecure.get(
        API_ENDPOINTS.STUDENT_AWARD,
        {
          params: {
            search: debouncedSearch,
            session: sessionFilter,
            sortField,
            sortOrder,
            limit: 1000,
          },
        },
      );

      const exportList = resData?.data || [];

      if (exportList.length === 0) {
        Swal.fire({
          icon: "info",
          title: "No Data to Export",
          text: "There are no student records matching the selected filter to export.",
          confirmButtonColor: "#059669",
        });
        return;
      }

      const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      // RSWA Emerald Header Banner
      doc.setFillColor(5, 150, 105);
      doc.rect(0, 0, 297, 22, "F");

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(15);
      doc.setFont("helvetica", "bold");
      doc.text("Rowmari Students Welfare Association (RSWA)", 14, 11);

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text("Student Award 2027 Applicants Report", 14, 17);

      // Render logo on the top right
      try {
        const logoDataUrl = await loadAndCropLogo(logo);
        if (logoDataUrl) {
          // image cropped to 1:1 aspect ratio (object-cover) and placed at top right
          doc.addImage(logoDataUrl, "PNG", 268, 4, 14, 14);
        }
      } catch (logoErr) {
        console.error("Failed to load logo for PDF:", logoErr);
      }

      // Meta info section
      doc.setTextColor(51, 65, 85);
      doc.setFontSize(9);
      doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 28);
      doc.text(`Total Reports: ${exportList.length}`, 120, 28);
      doc.text(
        `Filter: ${sessionFilter ? `Session ${sessionFilter}` : "All Sessions"}${debouncedSearch ? ` | Search: "${debouncedSearch}"` : ""}`,
        200,
        28,
      );

      // Table columns & rows
      const tableColumn = [
        "#",
        "Name (English)",
        "Name (Bangla)",
        "Phone Number",
        "Email",
        "University",
        "Session",
        "College Name",
      ];

      const tableRows = exportList.map((st, i) => [
        i + 1,
        st.nameEnglish || "",
        st.nameBangla || "",
        st.phoneNumber || "",
        st.email || "",
        st.university || "",
        st.session || "",
        st.hscCollege || "-",
      ]);

      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 32,
        theme: "striped",
        headStyles: {
          fillColor: [5, 150, 105],
          textColor: [255, 255, 255],
          fontStyle: "bold",
          fontSize: 9,
        },
        bodyStyles: {
          fontSize: 8.5,
          textColor: [30, 41, 59],
        },
        alternateRowStyles: {
          fillColor: [241, 245, 249],
        },
        columnStyles: {
          0: { cellWidth: 10 },
          1: { cellWidth: 40 },
          2: { cellWidth: 40 },
          3: { cellWidth: 28 },
          4: { cellWidth: 45 },
          5: { cellWidth: 50 },
          6: { cellWidth: 22 },
          7: { cellWidth: 35 },
        },
        didDrawPage: (dataArg) => {
          const str = `Page ${doc.internal.getNumberOfPages()}`;
          doc.setFontSize(8);
          doc.setTextColor(148, 163, 184);
          doc.text(
            str,
            dataArg.settings.margin.left,
            doc.internal.pageSize.height - 8,
          );
          doc.text(
            "RSWA Official Dashboard Report",
            doc.internal.pageSize.width - 60,
            doc.internal.pageSize.height - 8,
          );
        },
      });

      const fileName = `RSWA_Student_Award_Applicants_${new Date()
        .toISOString()
        .slice(0, 10)}.pdf`;

      doc.save(fileName);

      Swal.fire({
        icon: "success",
        title: "PDF Exported!",
        text: `Exported ${exportList.length} student entries to PDF successfully.`,
        confirmButtonColor: "#059669",
      });
    } catch (error) {
      console.error("Failed to export PDF:", error);
      Swal.fire({
        icon: "error",
        title: "Export Failed",
        text: "Could not generate PDF. Please try again.",
        confirmButtonColor: "#dc2626",
      });
    } finally {
      setExportingPDF(false);
    }
  };

  // Handle Seed Data Trigger
  const handleSeedData = async () => {
    try {
      const { data: resData } = await axiosSecure.post(
        `${API_ENDPOINTS.STUDENT_AWARD}/seed`,
      );
      Swal.fire({
        icon: "success",
        title: "Seed Data Created",
        text: resData.message || "Sample student award entries inserted!",
        confirmButtonColor: "#059669",
      });
      refetch();
    } catch (err) {
      console.error("Seed error:", err);
      Swal.fire({
        icon: "error",
        title: "Seed Failed",
        text: "Failed to insert sample seed data.",
        confirmButtonColor: "#dc2626",
      });
    }
  };

  // Handle Delete Submission
  const handleDelete = async (id, name) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Delete submission for "${name}"? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#475569",
      confirmButtonText: "Yes, Delete",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`${API_ENDPOINTS.STUDENT_AWARD}/${id}`);
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Student entry has been deleted.",
          confirmButtonColor: "#059669",
        });
        refetch();
      } catch (err) {
        console.error("Delete error:", err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to delete submission.",
          confirmButtonColor: "#dc2626",
        });
      }
    }
  };

  const goToPage = (num) => {
    if (num >= 1 && num <= totalPages) setPage(num);
  };

  return (
    <div className="space-y-6">
      <SEO
        title="Manage Student Award Data | RSWA Admin"
        description="Admin and Moderator dashboard to manage student award applicants for 2027 award program."
      />

      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="flex items-center gap-2.5 text-xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
            <GraduationCap className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
            <span>Manage Student Award Data</span>
          </h1>
          <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
            কৃতি শিক্ষার্থী সংবর্ধনা ২০২৭ অনুষ্ঠানে নিবন্ধিত শিক্ষার্থীদের তথ্য
            পরিচালনা করুন।
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => refetch()}
            className="shadow-xs inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
            title="Refresh Data"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Refresh</span>
          </button>

          <button
            onClick={handleExportPDF}
            disabled={exportingPDF}
            className="shadow-xs inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <FileDown className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>{exportingPDF ? "Generating PDF..." : "Export PDF"}</span>
          </button>
        </div>
      </div>

      {/* Reusable Stat Cards */}
      <StudentAwardStatCards
        isLoading={isLoading}
        totalStudents={totalStudents}
        students={students}
      />

      {/* Reusable Filters */}
      <StudentAwardFilters
        search={search}
        setSearch={setSearch}
        sessionFilter={sessionFilter}
        setSessionFilter={setSessionFilter}
        sortField={sortField}
        setSortField={setSortField}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        setPage={setPage}
      />

      {/* Reusable Data Table */}
      <StudentAwardTable
        isLoading={isLoading}
        students={students}
        page={page}
        limit={limit}
        totalPages={totalPages}
        onViewDetails={(student) => setSelectedStudent(student)}
        onDelete={handleDelete}
        onSeedData={handleSeedData}
        onPageChange={goToPage}
      />

      {/* Reusable Details Modal */}
      <StudentAwardDetailsModal
        student={selectedStudent}
        onClose={() => setSelectedStudent(null)}
      />
    </div>
  );
};

export default DashboardStudentAward;

import { useEffect } from "react";

const SEO = ({
  title = "RSWA | Rowmari Students Welfare Association",
  description = "Rowmari Students Welfare Association (RSWA) is a non-profit student welfare organization in Rowmari established on September 23, 2009. Dedicated to student development, virtual blood bank, emergency contacts, and social welfare.",
  keywords = "RSWA, Rowmari, Rowmari Students Welfare Association, Virtual Blood Bank, Emergency Numbers, Student Welfare, Kurigram, Bangladesh",
}) => {
  useEffect(() => {
    // Document Title
    document.title = title;

    // Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute("content", description);

    // Meta Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement("meta");
      metaKeywords.setAttribute("name", "keywords");
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute("content", keywords);

    // Open Graph Title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute("content", title);
    }

    // Open Graph Description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute("content", description);
    }
  }, [title, description, keywords]);

  return null;
};

export default SEO;

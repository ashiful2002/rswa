/**
 * Resolves the creation date of a donor record using:
 * 1. donor.createdAt (ISO Date from Mongoose timestamps)
 * 2. donor.Timestamp (Legacy Google Form timestamp string)
 * 3. donor._id (First 4 bytes of MongoDB ObjectId contains creation timestamp)
 * 4. donor.updatedAt (Fallback)
 */
export const getDonorDate = (donor) => {
  if (!donor) return null;

  if (donor.createdAt) {
    const d = new Date(donor.createdAt);
    if (!isNaN(d.getTime())) return d;
  }

  if (donor.Timestamp) {
    const d = new Date(donor.Timestamp);
    if (!isNaN(d.getTime())) return d;
  }

  const idStr = String(donor._id || "");
  if (idStr.length === 24) {
    const sec = parseInt(idStr.substring(0, 8), 16);
    if (!isNaN(sec) && sec > 0) return new Date(sec * 1000);
  }

  if (donor.updatedAt) {
    const d = new Date(donor.updatedAt);
    if (!isNaN(d.getTime())) return d;
  }

  return null;
};

/**
 * Formats donor creation date to user's local date and time strings.
 */
export const formatDonorDate = (donor) => {
  const date = getDonorDate(donor);
  if (!date) {
    return { dateStr: "N/A", timeStr: "", full: "N/A" };
  }

  const dateStr = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const timeStr = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return {
    dateStr,
    timeStr,
    full: `${dateStr}, ${timeStr}`,
    date,
  };
};

/**
 * Normalizes user-input or URL blood group query values (e.g. "O+", "a-", "B(+)ve")
 * to the canonical format used by the application options (e.g. "O(+)ve", "A(-)ve").
 */
export const normalizeBloodGroup = (val) => {
  if (!val || typeof val !== "string") return "";
  const cleaned = val.trim().toUpperCase().replace(/\s+/g, "");

  const map = {
    "A+": "A(+)ve",
    "A(+)VE": "A(+)ve",
    "A+VE": "A(+)ve",
    "A-": "A(-)ve",
    "A(-)VE": "A(-)ve",
    "A-VE": "A(-)ve",
    "B+": "B(+)ve",
    "B(+)VE": "B(+)ve",
    "B+VE": "B(+)ve",
    "B-": "B(-)ve",
    "B(-)VE": "B(-)ve",
    "B-VE": "B(-)ve",
    "O+": "O(+)ve",
    "O(+)VE": "O(+)ve",
    "O+VE": "O(+)ve",
    "O-": "O(-)ve",
    "O(-)VE": "O(-)ve",
    "O-VE": "O(-)ve",
    "AB+": "AB(+)ve",
    "AB(+)VE": "AB(+)ve",
    "AB+VE": "AB(+)ve",
    "AB-": "AB(-)ve",
    "AB(-)VE": "AB(-)ve",
    "AB-VE": "AB(-)ve",
  };

  return map[cleaned] || val;
};


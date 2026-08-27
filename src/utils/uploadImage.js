import axios from "axios";

const IMGBB_API_KEY = "425878c6318fb2ac0bfbb35ada9925e8";

/**
 * Uploads a local image File object to ImgBB and returns the hosted image URL.
 * @param {File} imageFile - The file selected from an HTML file input element.
 * @returns {Promise<string>} Hosted image URL from ImgBB.
 */
export const uploadToImgBB = async (imageFile) => {
  if (!imageFile) {
    throw new Error("No image file provided.");
  }

  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
      formData,
    );

    if (
      response.data &&
      response.data.success &&
      response.data.data &&
      (response.data.data.display_url || response.data.data.url)
    ) {
      return response.data.data.display_url || response.data.data.url;
    } else {
      throw new Error(response.data?.error?.message || "ImgBB upload failed.");
    }
  } catch (error) {
    console.error("ImgBB Upload Error:", error);
    throw error;
  }
};

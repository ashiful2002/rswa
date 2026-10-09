import rswaLogo from "../../../assets/logo.png";

export const BIRTHDAY_CARD_CONFIG = {
  // Dimensions for high-resolution 1:1 square photo card export
  width: 1080,
  height: 1080,

  // Two static text lines (not editable through the form)
  staticText: {
    greeting:
      "Wishing you a very Happy Birthday filled with health, joy & success!",
    organization: "Rowmari Students Welfare Association - RSWA",
    established: "ESTD. 2009 • ROWMARI, KURIGRAM",
  },

  // Color tokens derived directly from the official RSWA logo
  // Primary Green (#00873d / #047857), Crown Gold (#d97706 / #c5a017 / #f59e0b), White & Slate
  colors: {
    background: "#ffffff",
    cardBorder: "#e2e8f0",

    // RSWA Logo Forest / Emerald Greens
    primaryGreen: "#00873d",
    forestGreen: "#047857",
    deepGreen: "#064e3b",

    // RSWA Logo Crown & Quill Gold
    crownGold: "#c5a017",
    gold: "#d97706",
    goldAccent: "#f59e0b",
    goldLight: "#fef08a",

    // Banner gradients matching logo
    nameBannerStart: "#064e3b",
    nameBannerMid: "#047857",
    nameBannerEnd: "#00873d",
    nameBannerBorder: "#f59e0b",

    designationBannerStart: "#b45309",
    designationBannerMid: "#d97706",
    designationBannerEnd: "#ca8a04",

    // Text & subtle accents
    white: "#ffffff",
    textDark: "#0f172a",
    textMuted: "#475569",
    softMint: "#ecfdf5",
    softGold: "#fefce8",
    envelopeTeal: "#0d9488",
  },

  // Default sample & template values (all customizable in the generator form)
  defaults: {
    name: "Ashiful Islam Mukto ",
    designation: "Organizing Secretary",
    greeting:
      "Wishing you a very Happy Birthday filled with health, joy & success!",
    organization: "Rowmari Students Welfare Association - RSWA",
    committee: "Executive Committee 2026-27",
    website: "https://rswaa.vercel.app/",
  },

  // Organization logo
  logo: {
    src: rswaLogo,
    width: 130,
    height: 130,
  },
};

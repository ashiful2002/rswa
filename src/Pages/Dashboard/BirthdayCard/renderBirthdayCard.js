import { BIRTHDAY_CARD_CONFIG } from "./birthdayCardConfig";

/**
 * Helper to draw a rounded rectangle on Canvas
 */
const drawRoundedRect = (ctx, x, y, width, height, radius) => {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
};

/**
 * Measures text and scales down font size to fit maximum width
 */
const fitText = (
  ctx,
  text,
  maxFontSize,
  minFontSize,
  maxWidth,
  fontWeight = "bold",
  fontFamily = "'Inter', 'Segoe UI', system-ui, sans-serif",
) => {
  let size = maxFontSize;
  ctx.font = `${fontWeight} ${size}px ${fontFamily}`;
  while (ctx.measureText(text).width > maxWidth && size > minFontSize) {
    size -= 1;
    ctx.font = `${fontWeight} ${size}px ${fontFamily}`;
  }
  return size;
};

/**
 * Loads an image URL into an HTMLImageElement
 */
export const loadImage = (src) => {
  return new Promise((resolve) => {
    if (!src) {
      resolve(null);
      return;
    }
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = (err) => {
      console.warn("Failed to load image for canvas:", src, err);
      resolve(null); // Resolve with null so rendering does not crash
    };
    img.src = src;
  });
};

/**
 * Main Canvas Render Function
 * Draws the complete, high-resolution 1080x1350 birthday poster.
 *
 * @param {HTMLCanvasElement} canvas
 * @param {Object} params
 * @param {HTMLImageElement|null} params.portraitImg - The transparent portrait or original photo
 * @param {string} params.name - Person's name (editable)
 * @param {string} params.designation - Person's designation (editable)
 * @param {HTMLImageElement|null} params.logoImg - RSWA logo
 * @param {Object} [params.options] - Customization adjustments (zoom, offsetY)
 */
export const renderBirthdayCard = (
  canvas,
  {
    portraitImg = null,
    name = BIRTHDAY_CARD_CONFIG.defaults.name,
    designation = BIRTHDAY_CARD_CONFIG.defaults.designation,
    greeting = BIRTHDAY_CARD_CONFIG.defaults.greeting,
    organization = BIRTHDAY_CARD_CONFIG.defaults.organization,
    committee = BIRTHDAY_CARD_CONFIG.defaults.committee,
    website = BIRTHDAY_CARD_CONFIG.defaults.website,
    logoImg = null,
    options = {},
  },
) => {
  if (!canvas) return;

  const width = BIRTHDAY_CARD_CONFIG.width;
  const height = BIRTHDAY_CARD_CONFIG.height;

  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return;

  const scale = options.scale ?? 1;
  const offsetY = options.offsetY ?? 0;
  const offsetX = options.offsetX ?? 0;

  // 1. BASE BACKGROUND: Pure white with soft warm vignette
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);

  // Soft subtle pastel radial gradients in corners using logo palette
  const bgGradTopRight = ctx.createRadialGradient(width, 0, 50, width, 0, 700);
  bgGradTopRight.addColorStop(0, "rgba(209, 250, 229, 0.6)"); // soft RSWA mint/emerald
  bgGradTopRight.addColorStop(1, "rgba(255, 255, 255, 0)");
  ctx.fillStyle = bgGradTopRight;
  ctx.fillRect(0, 0, width, height);

  const bgGradTopLeft = ctx.createRadialGradient(0, 0, 50, 0, 0, 600);
  bgGradTopLeft.addColorStop(0, "rgba(254, 243, 199, 0.6)"); // soft crown gold/amber
  bgGradTopLeft.addColorStop(1, "rgba(255, 255, 255, 0)");
  ctx.fillStyle = bgGradTopLeft;
  ctx.fillRect(0, 0, width, height);

  const bgGradBottom = ctx.createRadialGradient(
    width / 2,
    height,
    100,
    width / 2,
    height,
    800,
  );
  bgGradBottom.addColorStop(0, "rgba(209, 250, 229, 0.5)"); // soft emerald
  bgGradBottom.addColorStop(1, "rgba(255, 255, 255, 0)");
  ctx.fillStyle = bgGradBottom;
  ctx.fillRect(0, 0, width, height);

  // 2. CURVED ARTWORK / ABSTRACT WAVES (Subtle elegant curves)
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(0, 125);
  ctx.bezierCurveTo(240, 85, 480, 175, width, 110);
  ctx.lineTo(width, 0);
  ctx.lineTo(0, 0);
  ctx.closePath();
  ctx.fillStyle = "rgba(240, 253, 244, 0.75)";
  ctx.fill();

  // Bottom curved wave - RSWA signature deep forest green gradient
  ctx.beginPath();
  ctx.moveTo(0, height - 55);
  ctx.bezierCurveTo(300, height - 95, 700, height - 25, width, height - 65);
  ctx.lineTo(width, height);
  ctx.lineTo(0, height);
  ctx.closePath();
  const bottomGrad = ctx.createLinearGradient(0, height - 100, width, height);
  bottomGrad.addColorStop(0, "#064e3b"); // RSWA deep green
  bottomGrad.addColorStop(0.5, "#047857"); // RSWA forest green
  bottomGrad.addColorStop(1, "#00873d"); // RSWA signature emerald green
  ctx.fillStyle = bottomGrad;
  ctx.fill();
  ctx.restore();

  // Golden accent ribbon above bottom wave
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(0, height - 60);
  ctx.bezierCurveTo(300, height - 100, 700, height - 30, width, height - 70);
  ctx.strokeStyle = "#f59e0b";
  ctx.lineWidth = 3.5;
  ctx.stroke();
  ctx.restore();

  // 3. ELEGANT CARD INNER BORDER
  ctx.save();
  ctx.strokeStyle = "rgba(203, 213, 225, 0.6)";
  ctx.lineWidth = 2;
  drawRoundedRect(ctx, 24, 24, width - 48, height - 48, 20);
  ctx.stroke();

  // Inner hairline gold frame
  ctx.strokeStyle = "rgba(245, 158, 11, 0.4)";
  ctx.lineWidth = 1;
  drawRoundedRect(ctx, 32, 32, width - 64, height - 64, 16);
  ctx.stroke();
  ctx.restore();

  // 4. TOP LOGOS & HEADER
  // Top-left: RSWA Official Logo
  if (logoImg) {
    ctx.save();
    const logoX = 52;
    const logoY = 44;
    const logoSize = 88;
    ctx.shadowColor = "rgba(0, 0, 0, 0.08)";
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 3;
    ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize);
    ctx.restore();
  }

  // Top-right: Organizational Crest badge
  ctx.save();
  const crestX = width - 140;
  const crestY = 44;
  const crestSize = 88;
  ctx.fillStyle = "#ffffff";
  ctx.shadowColor = "rgba(0, 0, 0, 0.08)";
  ctx.shadowBlur = 10;
  ctx.shadowOffsetY = 3;
  ctx.beginPath();
  ctx.arc(
    crestX + crestSize / 2,
    crestY + crestSize / 2,
    crestSize / 2,
    0,
    Math.PI * 2,
  );
  ctx.fill();
  ctx.lineWidth = 2.5;
  ctx.strokeStyle = "#059669";
  ctx.stroke();

  // Text inside crest badge
  ctx.shadowBlur = 0;
  ctx.fillStyle = "#059669";
  ctx.textAlign = "center";
  ctx.font = "bold 17px 'Inter', sans-serif";
  ctx.fillText("RSWA", crestX + crestSize / 2, crestY + 39);
  ctx.fillStyle = "#d97706";
  ctx.font = "bold 11px 'Inter', sans-serif";
  ctx.fillText("ESTD. 2009", crestX + crestSize / 2, crestY + 56);
  ctx.restore();

  // Top Center: GREETING HEADING ("HAPPY BIRTHDAY")
  ctx.save();
  ctx.textAlign = "center";

  // Sub-header badge in RSWA Crown Gold
  ctx.fillStyle = "#b45309";
  ctx.font = "bold 13px 'Inter', sans-serif";
  ctx.letterSpacing = "4px";
  ctx.fillText("• GREETINGS & BEST WISHES •", width / 2, 78);

  // Main Happy Birthday typography - RSWA Forest Green & Crown Gold gradient
  const hbGrad = ctx.createLinearGradient(
    width / 2 - 200,
    0,
    width / 2 + 200,
    0,
  );
  hbGrad.addColorStop(0, "#064e3b"); // RSWA deep green
  hbGrad.addColorStop(0.5, "#d97706"); // RSWA crown gold
  hbGrad.addColorStop(1, "#047857"); // RSWA forest green
  ctx.fillStyle = hbGrad;
  ctx.font = "900 45px 'Inter', system-ui, sans-serif";
  ctx.shadowColor = "rgba(4, 120, 87, 0.25)";
  ctx.shadowBlur = 10;
  ctx.shadowOffsetY = 3;
  ctx.fillText("HAPPY BIRTHDAY", width / 2, 134);
  ctx.restore();

  // 5. SQUARE PORTRAIT FRAME & BACKDROP
  const sqSize = 370;
  const portraitCenterX = width / 2;
  const portraitCenterY = 385;
  const sqX = portraitCenterX - sqSize / 2;
  const sqY = portraitCenterY - sqSize / 2;
  const sqRadius = 24;

  // Square backdrop fill with soft warm gold & mint gradient
  ctx.save();
  ctx.shadowColor = "rgba(0, 0, 0, 0.08)";
  ctx.shadowBlur = 18;
  ctx.shadowOffsetY = 4;
  const sqGrad = ctx.createLinearGradient(sqX, sqY, sqX + sqSize, sqY + sqSize);
  sqGrad.addColorStop(0, "rgba(254, 243, 199, 0.85)"); // soft warm gold
  sqGrad.addColorStop(1, "rgba(209, 250, 229, 0.85)"); // soft mint green
  ctx.fillStyle = sqGrad;
  drawRoundedRect(ctx, sqX, sqY, sqSize, sqSize, sqRadius);
  ctx.fill();

  // Outer square border frame in Crown Gold
  ctx.shadowBlur = 0;
  ctx.strokeStyle = "rgba(217, 119, 6, 0.45)";
  ctx.lineWidth = 3;
  drawRoundedRect(ctx, sqX, sqY, sqSize, sqSize, sqRadius);
  ctx.stroke();

  // Inner hairline square frame in Forest Green
  ctx.strokeStyle = "rgba(4, 120, 87, 0.25)";
  ctx.lineWidth = 1.5;
  drawRoundedRect(ctx, sqX + 7, sqY + 7, sqSize - 14, sqSize - 14, 18);
  ctx.stroke();
  ctx.restore();

  // DRAW PORTRAIT (if provided)
  if (portraitImg) {
    ctx.save();
    // Clip portrait precisely inside the square frame
    drawRoundedRect(ctx, sqX + 4, sqY + 4, sqSize - 8, sqSize - 8, 20);
    ctx.clip();

    // Preserve aspect ratio
    const imgRatio = portraitImg.width / portraitImg.height;
    const portraitBoxWidth = sqSize - 10;
    const portraitBoxHeight = sqSize + 10;
    let drawW, drawH;

    if (imgRatio > 1) {
      drawH = portraitBoxHeight * scale;
      drawW = drawH * imgRatio;
    } else {
      drawW = portraitBoxWidth * scale;
      drawH = drawW / imgRatio;
    }

    const drawX = portraitCenterX - drawW / 2 + offsetX;
    const drawY = portraitCenterY - drawH / 2 + offsetY + 10;

    // Draw portrait with subtle shadow
    ctx.shadowColor = "rgba(0, 0, 0, 0.16)";
    ctx.shadowBlur = 18;
    ctx.shadowOffsetY = 6;
    ctx.drawImage(portraitImg, drawX, drawY, drawW, drawH);
    ctx.restore();
  } else {
    // Placeholder avatar when no photo has been uploaded yet
    ctx.save();
    ctx.fillStyle = "rgba(241, 245, 249, 0.95)";
    drawRoundedRect(ctx, sqX + 10, sqY + 10, sqSize - 20, sqSize - 20, 18);
    ctx.fill();
    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = "#94a3b8";
    ctx.textAlign = "center";
    ctx.font = "bold 22px 'Inter', sans-serif";
    ctx.fillText(
      "Upload Photo to Preview",
      portraitCenterX,
      portraitCenterY + 8,
    );
    ctx.restore();
  }

  // 7. DESIGNATION BANNER (RSWA CROWN GOLD ACCENT)
  // Positioned right below portrait
  const desBannerY = 594;
  const desBannerH = 46;
  const desBannerW = 430;
  const desBannerX = width / 2 - desBannerW / 2;

  ctx.save();
  ctx.shadowColor = "rgba(217, 119, 6, 0.35)";
  ctx.shadowBlur = 18;
  ctx.shadowOffsetY = 6;

  // Rich Crown Gold gradient matching logo crown & feather
  const desGrad = ctx.createLinearGradient(
    desBannerX,
    desBannerY,
    desBannerX + desBannerW,
    desBannerY,
  );
  desGrad.addColorStop(0, "#b45309"); // Deep crown amber
  desGrad.addColorStop(0.5, "#d97706"); // Warm gold
  desGrad.addColorStop(1, "#ca8a04"); // Bright gold
  ctx.fillStyle = desGrad;

  drawRoundedRect(ctx, desBannerX, desBannerY, desBannerW, desBannerH, 23);
  ctx.fill();

  // White inner highlight line
  ctx.shadowBlur = 0;
  ctx.strokeStyle = "rgba(255, 255, 255, 0.45)";
  ctx.lineWidth = 1.5;
  drawRoundedRect(
    ctx,
    desBannerX + 4,
    desBannerY + 4,
    desBannerW - 8,
    desBannerH - 8,
    19,
  );
  ctx.stroke();

  // Designation Text
  const desText = (
    designation || BIRTHDAY_CARD_CONFIG.defaults.designation
  ).toUpperCase();
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  const desFontSize = fitText(
    ctx,
    desText,
    21,
    14,
    desBannerW - 50,
    "bold",
    "'Inter', sans-serif",
  );
  ctx.font = `bold ${desFontSize}px 'Inter', sans-serif`;
  ctx.shadowColor = "rgba(0, 0, 0, 0.25)";
  ctx.shadowBlur = 4;
  ctx.shadowOffsetY = 1;
  ctx.fillText(
    desText,
    width / 2,
    desBannerY + desBannerH / 2 + desFontSize * 0.35,
  );
  ctx.restore();

  // 8. NAME BANNER (PROMINENT RSWA FOREST GREEN BANNER)
  const nameBannerY = 658;
  const nameBannerH = 74;
  const nameBannerW = 630;
  const nameBannerX = width / 2 - nameBannerW / 2;

  ctx.save();
  ctx.shadowColor = "rgba(6, 78, 59, 0.45)";
  ctx.shadowBlur = 24;
  ctx.shadowOffsetY = 8;

  // RSWA Signature Forest Green gradient
  const nameGrad = ctx.createLinearGradient(
    nameBannerX,
    nameBannerY,
    nameBannerX + nameBannerW,
    nameBannerY,
  );
  nameGrad.addColorStop(0, "#064e3b"); // Deep forest green
  nameGrad.addColorStop(0.5, "#047857"); // Emerald green
  nameGrad.addColorStop(1, "#00873d"); // Signature RSWA logo green
  ctx.fillStyle = nameGrad;

  drawRoundedRect(ctx, nameBannerX, nameBannerY, nameBannerW, nameBannerH, 37);
  ctx.fill();

  // Golden crown accent border around the name banner
  ctx.shadowBlur = 0;
  ctx.strokeStyle = "rgba(245, 158, 11, 0.9)";
  ctx.lineWidth = 3;
  drawRoundedRect(
    ctx,
    nameBannerX + 4,
    nameBannerY + 4,
    nameBannerW - 8,
    nameBannerH - 8,
    33,
  );
  ctx.stroke();

  // Name Text with Auto Scaling
  const nameText = name || BIRTHDAY_CARD_CONFIG.defaults.name;
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  const nameFontSize = fitText(
    ctx,
    nameText,
    38,
    20,
    nameBannerW - 80,
    "bold",
    "'Inter', 'Segoe UI', system-ui, sans-serif",
  );
  ctx.font = `bold ${nameFontSize}px 'Inter', 'Segoe UI', system-ui, sans-serif`;
  ctx.shadowColor = "rgba(0, 0, 0, 0.35)";
  ctx.shadowBlur = 6;
  ctx.shadowOffsetY = 2;
  ctx.fillText(
    nameText,
    width / 2,
    nameBannerY + nameBannerH / 2 + nameFontSize * 0.33,
  );
  ctx.restore();

  // 8. TEMPLATE GREETING & ORGANIZATION LINES
  ctx.save();
  ctx.textAlign = "center";

  // Clean minimal professional divider
  const divY = 758;
  const divW = 280;
  ctx.strokeStyle = "rgba(203, 213, 225, 0.75)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(width / 2 - divW / 2, divY);
  ctx.lineTo(width / 2 - 14, divY);
  ctx.moveTo(width / 2 + 14, divY);
  ctx.lineTo(width / 2 + divW / 2, divY);
  ctx.stroke();

  // Subtle center accent dot in RSWA Crown Gold
  ctx.beginPath();
  ctx.arc(width / 2, divY, 3, 0, Math.PI * 2);
  ctx.fillStyle = "#d97706";
  ctx.fill();

  // LINE 1: Birthday Greeting (Editable)
  const greetingText = greeting || BIRTHDAY_CARD_CONFIG.defaults.greeting;
  ctx.fillStyle = "#334155"; // Slate 700
  const greetSize = fitText(
    ctx,
    greetingText,
    20,
    14,
    940,
    "500",
    "'Inter', sans-serif",
  );
  ctx.font = `500 ${greetSize}px 'Inter', sans-serif`;
  ctx.fillText(greetingText, width / 2, 798);

  // LINE 2: Organization Name (Editable)
  const orgText = organization || BIRTHDAY_CARD_CONFIG.defaults.organization;
  ctx.fillStyle = "#047857"; // RSWA Forest Green
  const orgSize = fitText(
    ctx,
    orgText,
    26,
    16,
    960,
    "bold",
    "'Inter', sans-serif",
  );
  ctx.font = `bold ${orgSize}px 'Inter', sans-serif`;
  ctx.fillText(orgText, width / 2, 844);
  ctx.restore();

  // 9. BOTTOM FOOTER - JUSTIFIED BETWEEN (EXECUTIVE COMMITTEE & WEBSITE)
  ctx.save();

  // Subtle separator rule
  const footerLineY = 914;
  ctx.strokeStyle = "rgba(203, 213, 225, 0.75)";
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(68, footerLineY);
  ctx.lineTo(width - 68, footerLineY);
  ctx.stroke();

  // Subtle gold accent dots at the ends of the footer rule
  ctx.fillStyle = "#d97706";
  ctx.beginPath();
  ctx.arc(68, footerLineY, 2.5, 0, Math.PI * 2);
  ctx.arc(width - 68, footerLineY, 2.5, 0, Math.PI * 2);
  ctx.fill();

  const footerTextY = 948;

  // LEFT: Executive Committee Session (Justified Left)
  const committeeText = committee || BIRTHDAY_CARD_CONFIG.defaults.committee;
  ctx.textAlign = "left";
  ctx.fillStyle = "#b45309"; // RSWA Crown Gold
  const comSize = fitText(
    ctx,
    committeeText,
    16,
    12,
    440,
    "bold",
    "'Inter', sans-serif",
  );
  ctx.font = `bold ${comSize}px 'Inter', sans-serif`;
  ctx.letterSpacing = "0.5px";
  ctx.fillText(committeeText, 68, footerTextY);

  // RIGHT: Official Website URL (Justified Right)
  const rawWeb = website || BIRTHDAY_CARD_CONFIG.defaults.website;
  const webText =
    rawWeb.toLowerCase().startsWith("http") &&
    !rawWeb.toLowerCase().startsWith("website")
      ? `Website: ${rawWeb}`
      : rawWeb;
  ctx.textAlign = "right";
  ctx.fillStyle = "#0d9488"; // Logo envelope teal
  const webSize = fitText(
    ctx,
    webText,
    15,
    11,
    440,
    "600",
    "'Inter', monospace, sans-serif",
  );
  ctx.font = `600 ${webSize}px 'Inter', monospace, sans-serif`;
  ctx.letterSpacing = "0.3px";
  ctx.fillText(webText, width - 68, footerTextY);

  ctx.restore();
};

/**
 * Downloads the rendered canvas as high-resolution PNG
 *
 * @param {HTMLCanvasElement} canvas
 * @param {string} name
 */
export const downloadBirthdayCardPNG = (canvas, name = "member") => {
  if (!canvas) {
    throw new Error("Canvas is not ready for export.");
  }

  return new Promise((resolve, reject) => {
    try {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Failed to generate PNG blob from canvas."));
            return;
          }

          const safeName = (name || "member")
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]+/g, "");

          const filename = `birthday-card-${safeName || "member"}.png`;

          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = filename;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          setTimeout(() => URL.revokeObjectURL(url), 1000);
          resolve(filename);
        },
        "image/png",
        1.0,
      );
    } catch (err) {
      reject(err);
    }
  });
};

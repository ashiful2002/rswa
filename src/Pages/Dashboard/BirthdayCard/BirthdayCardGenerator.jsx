import { useEffect, useState } from "react";
import { Sparkles, RefreshCw } from "lucide-react";
import PhotoUploader from "./PhotoUploader";
import CardTextForm from "./CardTextForm";
import BirthdayCardPreview from "./BirthdayCardPreview";
import { BIRTHDAY_CARD_CONFIG } from "./birthdayCardConfig";
import { safeRevokeUrl } from "./removeBackground";

const BirthdayCardGenerator = () => {
  const [originalPhotoUrl, setOriginalPhotoUrl] = useState(null);
  const [transparentPhotoUrl, setTransparentPhotoUrl] = useState(null);
  const [useTransparent, setUseTransparent] = useState(true);

  // Editable member fields
  const [name, setName] = useState(BIRTHDAY_CARD_CONFIG.defaults.name);
  const [designation, setDesignation] = useState(
    BIRTHDAY_CARD_CONFIG.defaults.designation,
  );

  // Editable template & organization lines (infrequently changed)
  const [greeting, setGreeting] = useState(
    BIRTHDAY_CARD_CONFIG.defaults.greeting,
  );
  const [organization, setOrganization] = useState(
    BIRTHDAY_CARD_CONFIG.defaults.organization,
  );
  const [committee, setCommittee] = useState(
    BIRTHDAY_CARD_CONFIG.defaults.committee,
  );
  const [website, setWebsite] = useState(BIRTHDAY_CARD_CONFIG.defaults.website);

  // Framing adjustments
  const [options, setOptions] = useState({
    scale: 1,
    offsetY: 0,
    offsetX: 0,
  });

  // Clean up Object URLs on unmount
  useEffect(() => {
    return () => {
      safeRevokeUrl(originalPhotoUrl);
      safeRevokeUrl(transparentPhotoUrl);
    };
  }, [originalPhotoUrl, transparentPhotoUrl]);

  const handlePhotoSelected = ({ originalUrl, transparentUrl }) => {
    // Revoke previous URLs to prevent memory leak
    if (originalPhotoUrl && originalPhotoUrl !== originalUrl) {
      safeRevokeUrl(originalPhotoUrl);
    }
    if (transparentPhotoUrl && transparentPhotoUrl !== transparentUrl) {
      safeRevokeUrl(transparentPhotoUrl);
    }

    setOriginalPhotoUrl(originalUrl);
    setTransparentPhotoUrl(transparentUrl || null);
    setUseTransparent(Boolean(transparentUrl));
  };

  const handleRemovePhoto = () => {
    safeRevokeUrl(originalPhotoUrl);
    safeRevokeUrl(transparentPhotoUrl);
    setOriginalPhotoUrl(null);
    setTransparentPhotoUrl(null);
    setUseTransparent(true);
    setOptions({ scale: 1, offsetY: 0, offsetX: 0 });
  };

  const activePhotoUrl =
    useTransparent && transparentPhotoUrl
      ? transparentPhotoUrl
      : originalPhotoUrl;

  const handleResetDefaults = () => {
    setName(BIRTHDAY_CARD_CONFIG.defaults.name);
    setDesignation(BIRTHDAY_CARD_CONFIG.defaults.designation);
    setGreeting(BIRTHDAY_CARD_CONFIG.defaults.greeting);
    setOrganization(BIRTHDAY_CARD_CONFIG.defaults.organization);
    setCommittee(BIRTHDAY_CARD_CONFIG.defaults.committee);
    setWebsite(BIRTHDAY_CARD_CONFIG.defaults.website);
    setOptions({ scale: 1, offsetY: 0, offsetX: 0 });
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-white">
              Birthday Card Generator
            </h2>
          </div>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Generate and export high-resolution birthday greeting posters for
            RSWA committee members and students.
          </p>
        </div>

        {/* Security & Access Badges */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
            title="Reset to default sample text"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Reset Defaults</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Controls on Left, Live Preview on Right */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
        {/* Step 1: Portrait Photo Upload & AI Background Removal */}
        <div className="order-1 lg:col-span-7 lg:col-start-1 lg:row-start-1">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              1. Member Portrait Photo
            </h3>
            <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
              <Sparkles className="h-3 w-3" />
              Browser AI Transparent Cutout
            </span>
          </div>

          <PhotoUploader
            originalPhotoUrl={originalPhotoUrl}
            transparentPhotoUrl={transparentPhotoUrl}
            useTransparent={useTransparent}
            onPhotoSelected={handlePhotoSelected}
            onRemovePhoto={handleRemovePhoto}
            onToggleTransparent={setUseTransparent}
          />
        </div>

        {/* Live Canvas Preview & High-Res Download (Order 2 on mobile: right after Photo Uploader) */}
        <div className="order-2 space-y-3 lg:sticky lg:top-20 lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Live Card Preview
            </h3>
            <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
              1080 × 1080 Square
            </span>
          </div>

          <BirthdayCardPreview
            photoUrl={activePhotoUrl}
            name={name}
            designation={designation}
            greeting={greeting}
            organization={organization}
            committee={committee}
            website={website}
            options={options}
            hasPhoto={Boolean(activePhotoUrl)}
          />
        </div>

        {/* Step 2: Member Details & Template Fields (Order 3 on mobile: just after the download button!) */}
        <div className="order-3 lg:col-span-7 lg:col-start-1 lg:row-start-2">
          <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            2. Poster Content & Framing
          </h3>

          <CardTextForm
            name={name}
            designation={designation}
            greeting={greeting}
            organization={organization}
            committee={committee}
            website={website}
            onNameChange={setName}
            onDesignationChange={setDesignation}
            onGreetingChange={setGreeting}
            onOrganizationChange={setOrganization}
            onCommitteeChange={setCommittee}
            onWebsiteChange={setWebsite}
            options={options}
            onOptionsChange={setOptions}
            hasPhoto={Boolean(activePhotoUrl)}
          />
        </div>
      </div>
    </div>
  );
};

export default BirthdayCardGenerator;

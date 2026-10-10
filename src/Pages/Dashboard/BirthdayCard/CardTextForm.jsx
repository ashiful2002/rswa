import { useState } from "react";
import {
  Sliders,
  User,
  Briefcase,
  Globe,
  Building2,
  Users,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Settings2,
} from "lucide-react";
import { BIRTHDAY_CARD_CONFIG } from "./birthdayCardConfig";

const SUGGESTED_DESIGNATIONS = [
  "President",
  "Senior Vice President",
  "Vice President",
  "General Secretary",
  "Joint General Secretary",
  "Organizing Secretary",
  "Finance Secretary",
  "Executive Member",
  "Adviser",
  "Meritorious Student",
  "Life Member",
];

const CardTextForm = ({
  name,
  designation,
  greeting,
  organization,
  committee,
  website,
  onNameChange,
  onDesignationChange,
  onGreetingChange,
  onOrganizationChange,
  onCommitteeChange,
  onWebsiteChange,
  options = {},
  onOptionsChange,
  hasPhoto,
}) => {
  const [isTemplateOpen, setIsTemplateOpen] = useState(true);

  const handleResetTemplateDefaults = () => {
    onGreetingChange(BIRTHDAY_CARD_CONFIG.defaults.greeting);
    onOrganizationChange(BIRTHDAY_CARD_CONFIG.defaults.organization);
    onCommitteeChange(BIRTHDAY_CARD_CONFIG.defaults.committee);
    onWebsiteChange(BIRTHDAY_CARD_CONFIG.defaults.website);
  };

  return (
    <div className="space-y-5">
      {/* Photo Framing Controls (Zoom, Horizontal & Vertical Pan) */}
      {hasPhoto && (
        <div className="shadow-xs space-y-3 rounded-2xl border border-slate-200  p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 dark:border-slate-800">
            <div className="flex items-center gap-1.5">
              <Sliders className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Portrait Framing Adjustments
              </h3>
            </div>
            {(Boolean(options?.scale && options.scale !== 1) ||
              Boolean(options?.offsetX) ||
              Boolean(options?.offsetY)) && (
              <button
                type="button"
                onClick={() =>
                  onOptionsChange({
                    ...options,
                    scale: 1,
                    offsetX: 0,
                    offsetY: 0,
                  })
                }
                className="text-[10px] font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400"
              >
                Reset Framing
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-1 sm:grid-cols-3">
            {/* Slider 1: Zoom Scale */}
            <div>
              <div className="mb-1 flex items-center justify-between text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                <span>Zoom Scale</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400">
                  {Math.round((options?.scale || 1) * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="2.0"
                step="0.05"
                value={options?.scale ?? 1}
                onChange={(e) =>
                  onOptionsChange({
                    ...options,
                    scale: parseFloat(e.target.value),
                  })
                }
                className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-emerald-600 dark:bg-slate-800"
              />
            </div>

            {/* Slider 2: Horizontal Pan (Left - Right) */}
            <div>
              <div className="mb-1 flex items-center justify-between text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                <span>Horizontal Pan</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400">
                  {options?.offsetX
                    ? `${options.offsetX > 0 ? "+" : ""}${options.offsetX}px`
                    : "0px"}
                </span>
              </div>
              <input
                type="range"
                min="-150"
                max="150"
                step="2"
                value={options?.offsetX ?? 0}
                onChange={(e) =>
                  onOptionsChange({
                    ...options,
                    offsetX: parseInt(e.target.value, 10),
                  })
                }
                className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-emerald-600 dark:bg-slate-800"
              />
            </div>

            {/* Slider 3: Vertical Pan (Up - Down) */}
            <div>
              <div className="mb-1 flex items-center justify-between text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                <span>Vertical Pan</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400">
                  {options?.offsetY
                    ? `${options.offsetY > 0 ? "+" : ""}${options.offsetY}px`
                    : "0px"}
                </span>
              </div>
              <input
                type="range"
                min="-150"
                max="150"
                step="2"
                value={options?.offsetY ?? 0}
                onChange={(e) =>
                  onOptionsChange({
                    ...options,
                    offsetY: parseInt(e.target.value, 10),
                  })
                }
                className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-emerald-600 dark:bg-slate-800"
              />
            </div>
          </div>
        </div>
      )}

      {/* 1. Primary Member Poster Fields */}
      <div className="shadow-xs space-y-4 rounded-2xl border border-slate-200  p-4 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            1. Member Poster Details
          </h3>
          <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
            Live Preview Updates
          </span>
        </div>

        {/* Field 1: Person's Name */}
        <div>
          <label className="mb-1 flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300">
            <User className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Person&apos;s Full Name *</span>
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Nasim Iqbal Naim"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            className="w-full rounded-xl border border-slate-200 p-2.5 text-xs font-medium text-slate-800 outline-none transition-colors focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
          />
          <p className="mt-1 text-[10px] text-slate-400">
            Rendered inside the prominent RSWA forest green banner with golden
            trim and auto font scaling.
          </p>
        </div>

        {/* Field 2: Designation */}
        <div>
          <label className="mb-1 flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300">
            <Briefcase className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
            <span>Designation / Position *</span>
          </label>
          <input
            type="text"
            required
            list="designations-list"
            placeholder="e.g. General Secretary"
            value={designation}
            onChange={(e) => onDesignationChange(e.target.value)}
            className="w-full rounded-xl border border-slate-200 p-2.5 text-xs font-medium text-slate-800 outline-none transition-colors focus:border-amber-500 focus:ring-1 focus:ring-amber-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
          />
          <datalist id="designations-list">
            {SUGGESTED_DESIGNATIONS.map((d) => (
              <option key={d} value={d} />
            ))}
          </datalist>
          <p className="mt-1 text-[10px] text-slate-400">
            Rendered inside the logo crown gold banner directly beneath the
            portrait.
          </p>
        </div>
      </div>

      {/* 3. Section 2: Template & Organization Texts (Editable, Infrequently Changed) */}
      <div className="shadow-xs space-y-4 rounded-2xl border border-slate-200 p-4 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Settings2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                2. Organization & Template Texts
              </h3>
              <p className="text-[10px] text-slate-400">
                Infrequently changed • Fully editable
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleResetTemplateDefaults}
              className="text-[10px] font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400"
              title="Reset these 4 lines to official organization defaults"
            >
              Reset to Defaults
            </button>
            <button
              type="button"
              onClick={() => setIsTemplateOpen(!isTemplateOpen)}
              className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
              title={isTemplateOpen ? "Collapse section" : "Expand section"}
            >
              {isTemplateOpen ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {isTemplateOpen && (
          <div className="space-y-4 pt-1">
            {/* Field 1: Greeting */}
            <div>
              <label className="mb-1 flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                <MessageSquare className="h-3.5 w-3.5 text-slate-500" />
                <span>Birthday Greeting Line</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Wishing you a very Happy Birthday filled with health, joy & success!"
                value={greeting}
                onChange={(e) => onGreetingChange(e.target.value)}
                className="w-full rounded-xl border border-slate-200 p-2.5 text-xs font-medium text-slate-800 outline-none transition-colors focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              />
              <p className="mt-1 text-[10px] text-slate-400">
                Rendered directly beneath the prominent name banner divider.
              </p>
            </div>

            {/* Field 2: Organization Name */}
            <div>
              <label className="mb-1 flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                <Building2 className="h-3.5 w-3.5 text-emerald-600" />
                <span>Organization Name</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Rowmari Students Welfare Association - RSWA"
                value={organization}
                onChange={(e) => onOrganizationChange(e.target.value)}
                className="w-full rounded-xl border border-slate-200 p-2.5 text-xs font-medium text-slate-800 outline-none transition-colors focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              />
              <p className="mt-1 text-[10px] text-slate-400">
                Rendered in bold RSWA signature forest green.
              </p>
            </div>

            {/* Field 3: Executive Committee */}
            <div>
              <label className="mb-1 flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                <Users className="h-3.5 w-3.5 text-amber-600" />
                <span>Executive Committee Session</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Executive Committee 2026-27"
                value={committee}
                onChange={(e) => onCommitteeChange(e.target.value)}
                className="e w-full rounded-xl border border-slate-200 p-2.5 text-xs font-medium text-slate-800 outline-none transition-colors focus:border-amber-500 focus:ring-1 focus:ring-amber-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              />
              <p className="mt-1 text-[10px] text-slate-400">
                Rendered justified at the bottom-left in RSWA crown gold
                styling.
              </p>
            </div>

            {/* Field 4: Website URL */}
            <div>
              <label className="mb-1 flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                <Globe className="h-3.5 w-3.5 text-teal-600" />
                <span>Official Website URL</span>
              </label>
              <input
                type="text"
                placeholder="e.g. https://rswaa.vercel.app/"
                value={website}
                onChange={(e) => onWebsiteChange(e.target.value)}
                className="w-full rounded-xl border border-slate-200 p-2.5 text-xs font-medium text-slate-800 outline-none transition-colors focus:border-teal-500 focus:ring-1 focus:ring-teal-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              />
              <p className="mt-1 text-[10px] text-slate-400">
                Rendered justified at the bottom-right in logo teal styling.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardTextForm;

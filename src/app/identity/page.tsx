'use client';

import { useMemo, useState } from 'react';
import {JSX} from 'react';
/* =====================================================================
   Icons (inline SVG, no external deps)
   ===================================================================== */

function IdCardIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="8" cy="11" r="1.8" stroke="currentColor" strokeWidth="1.6" />
      <path d="M5 16c0-1.7 1.3-2.7 3-2.7s3 1 3 2.7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M14 10h5M14 13h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3 12h18M12 3c2.7 2.4 4.2 5.6 4.2 9s-1.5 6.6-4.2 9c-2.7-2.4-4.2-5.6-4.2-9s1.5-6.6 4.2-9Z" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function BriefcaseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="2.5" y="8" width="19" height="12" rx="2.2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 8V6.5A2.5 2.5 0 0 1 10.5 4h3A2.5 2.5 0 0 1 16 6.5V8" stroke="currentColor" strokeWidth="1.6" />
      <path d="M2.5 13h19" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function BuildingIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="4" y="3" width="12" height="18" rx="1.2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M16 9h4v12h-4" stroke="currentColor" strokeWidth="1.8" />
      <path d="M7.5 7h1.2M11.3 7h1.2M7.5 10.5h1.2M11.3 10.5h1.2M7.5 14h1.2M11.3 14h1.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M9 21v-3.2h2V21" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function GrowthIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M3 17l6-6 4 4 8-9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 6h6v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PersonIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="1.7" />
      <path d="M5 20c0-3.6 3-6 7-6s7 2.4 7 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3 9.5h18M8 3v3.5M16 3v3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="9" cy="8" r="2.6" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17" cy="9.5" r="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M15.5 14.3c2.3.3 4 2 4 4.7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function GenderIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="9" cy="14" r="4.2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12.1 10.9 17 6M13.4 6h3.6v3.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function RingsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="9" cy="14" r="4.4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="15" cy="14" r="4.4" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 8.5 12 3l4 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GraduationCapIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M2 9.5 12 5l10 4.5-10 4.5-10-4.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M6 11.6v4.2c0 1.5 2.7 2.7 6 2.7s6-1.2 6-2.7v-4.2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M21 9.5v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function LocationIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <circle cx="12" cy="9.5" r="2.2" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function FlagIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M5 21V3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M5 4.5c3-1.6 5.5 1.6 8.5 0s5.5 1.6 5.5 1.6v8.4s-2.5-1.6-5.5 0-5.5-1.6-8.5 0V4.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function LanguageIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
      <path d="M4 9h16M4 15h16" stroke="currentColor" strokeWidth="1.4" />
      <path d="M12 3c2 2.3 3 5.5 3 9s-1 6.7-3 9c-2-2.3-3-5.5-3-9s1-6.7 3-9Z" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function TagIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M11.5 3H5a2 2 0 0 0-2 2v6.5a2 2 0 0 0 .6 1.4l9 9a2 2 0 0 0 2.8 0l6.5-6.5a2 2 0 0 0 0-2.8l-9-9a2 2 0 0 0-1.4-.6Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="8" cy="8" r="1.6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function LayersIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 3 2.5 8.5 12 14l9.5-5.5L12 3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M2.5 13 12 18.5 21.5 13M2.5 17 12 22.5 21.5 17" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function RupeeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M6 4h12M6 8h12M6 4c4 0 6 1.6 6 4s-2 4-6 4h-1l8 8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GaugeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M4 15a8 8 0 0 1 16 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M12 15 16 10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <circle cx="12" cy="15" r="1.3" fill="currentColor" />
    </svg>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function EditIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M4 20h4l10.5-10.5a2.1 2.1 0 0 0-3-3L5 17v3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowLeftIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* =====================================================================
   Stepper config — active step is always solid blue; inactive steps
   show their own theme color as an outline.
   ===================================================================== */

const STEPS = [
  { key: 'identity', label: 'Identity', icon: IdCardIcon, ring: 'ring-emerald-400', text: 'text-emerald-500' },
  { key: 'globe', label: 'Globe', icon: GlobeIcon, ring: 'ring-rose-400', text: 'text-rose-500' },
  { key: 'profession', label: 'Profession', icon: BriefcaseIcon, ring: 'ring-amber-400', text: 'text-amber-500' },
  { key: 'corporate', label: 'Corporate', icon: BuildingIcon, ring: 'ring-blue-400', text: 'text-blue-500' },
  { key: 'growth', label: 'Growth', icon: GrowthIcon, ring: 'ring-sky-300', text: 'text-sky-400' },
] as const;

/* =====================================================================
   Shared field types
   ===================================================================== */

type Gender = 'Male' | 'Female' | 'Others';
type MaritalStatus = 'Single' | 'Married' | 'Others';
type EmploymentType = 'Full-time' | 'Part-time' | 'Freelance' | 'Contract';
type RiskAppetite = 'Low' | 'Medium' | 'High';

interface EducationEntry {
  id: number;
  degree: string;
  from: string;
  to: string;
  institute: string;
}

interface ExperienceEntry {
  id: number;
  company: string;
  from: string;
  to: string;
  location: string;
}

interface OnboardingFormData {
  // Identity
  firstName: string;
  lastName: string;
  dob: string;
  gender: Gender;
  maritalStatus: MaritalStatus;
  education: EducationEntry[];

  // Globe
  country: string;
  state: string;
  city: string;
  nationality: string;
  languages: string[];
  willingToRelocate: boolean;

  // Profession
  jobTitle: string;
  department: string;
  totalExperience: string;
  employmentType: EmploymentType;
  skills: string[];

  // Corporate
  companyName: string;
  companyType: string;
  companySize: string;
  fromDate: string;
  toDate: string;
  currentlyWorking: boolean;
  workExperience: ExperienceEntry[];

  // Growth
  currentCTC: string;
  expectedCTC: string;
  investmentCapacity: string;
  riskAppetite: RiskAppetite;
}

const INITIAL_FORM: OnboardingFormData = {
  firstName: '',
  lastName: '',
  dob: '1996-02-06',
  gender: 'Male',
  maritalStatus: 'Single',
  education: [
    { id: 1, degree: 'Masters of Commerce', from: 'Mar 2022', to: 'Feb 2024', institute: 'World College of Accountancy, Rohtak' },
    { id: 2, degree: 'Bachelor of Commerce', from: 'Mar 2022', to: 'Feb 2024', institute: 'World College of Accountancy, Rohtak' },
  ],

  country: '',
  state: '',
  city: '',
  nationality: '',
  languages: ['English', 'Hindi'],
  willingToRelocate: false,

  jobTitle: '',
  department: '',
  totalExperience: '',
  employmentType: 'Full-time',
  skills: ['Figma', 'User Research'],

  companyName: '',
  companyType: 'Private Limited',
  companySize: '200 - 250',
  fromDate: '2026-08-23',
  toDate: '2026-08-23',
  currentlyWorking: true,
  workExperience: [
    { id: 1, company: 'Adobe Systems', from: 'Mar 2022', to: 'Feb 2024', location: 'San Jose, Ireland' },
    { id: 2, company: 'Airbnb LLC', from: 'Mar 2022', to: 'Feb 2024', location: 'Palo Alto, United States of America' },
  ],

  currentCTC: '',
  expectedCTC: '',
  investmentCapacity: '',
  riskAppetite: 'Medium',
};

function calculateAge(dob: string): number | null {
  if (!dob) return null;
  const birth = new Date(dob);
  if (Number.isNaN(birth.getTime())) return null;
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const hasHadBirthdayThisYear =
    today.getMonth() > birth.getMonth() || (today.getMonth() === birth.getMonth() && today.getDate() >= birth.getDate());
  if (!hasHadBirthdayThisYear) age -= 1;
  return age;
}

/* =====================================================================
   Small reusable field primitives
   ===================================================================== */

function FieldLabel({ icon: Icon, tone, children }: { icon: (props: { className?: string }) => React.JSX.Element; tone: string; children: React.ReactNode }) {
  return (
    <span className="mb-1 flex items-center gap-1.5 text-sm font-semibold text-gray-700">
      <Icon className={`h-4 w-4 ${tone}`} />
      {children}
    </span>
  );
}

function TextInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:border-blue-500"
    />
  );
}

function SelectInput({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-800 outline-none focus:border-blue-500"
      >
        {options.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
      <ChevronDownIcon className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
    </div>
  );
}

function PillGroup<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; icon?: (props: { className?: string }) => React.JSX.Element; iconTone?: string }[];
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const Icon = opt.icon;
        const selected = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={[
              'flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors',
              selected ? 'border-blue-200 bg-blue-50 text-blue-600' : 'border-gray-300 bg-white text-gray-700',
            ].join(' ')}
          >
            {Icon && <Icon className={`h-3.5 w-3.5 ${opt.iconTone ?? ''}`} />}
            {opt.value}
          </button>
        );
      })}
    </div>
  );
}

function ToggleRow({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center justify-between">
      <span className="text-sm font-semibold text-gray-700">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={['relative h-6 w-11 rounded-full transition-colors', checked ? 'bg-emerald-500' : 'bg-gray-300'].join(' ')}
      >
        <span
          className={[
            'absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform',
            checked ? 'translate-x-5' : 'translate-x-0.5',
          ].join(' ')}
        />
      </button>
    </label>
  );
}

function ChipInput({ values, onChange, placeholder }: { values: string[]; onChange: (v: string[]) => void; placeholder?: string }) {
  const [draft, setDraft] = useState('');

  const addChip = () => {
    const trimmed = draft.trim();
    if (trimmed && !values.includes(trimmed)) {
      onChange([...values, trimmed]);
    }
    setDraft('');
  };

  return (
    <div>
      <div className="mb-2 flex flex-wrap gap-2">
        {values.map((chip) => (
          <span key={chip} className="flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
            {chip}
            <button type="button" onClick={() => onChange(values.filter((v) => v !== chip))} aria-label={`Remove ${chip}`}>
              <CloseIcon className="h-3 w-3" />
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addChip();
            }
          }}
          placeholder={placeholder}
          className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:border-blue-500"
        />
        <button
          type="button"
          onClick={addChip}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white hover:bg-blue-700"
          aria-label="Add"
        >
          <PlusIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

/* =====================================================================
   Page
   ===================================================================== */

export default function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(0);
  const [form, setForm] = useState<OnboardingFormData>(INITIAL_FORM);

  const age = useMemo(() => calculateAge(form.dob), [form.dob]);

  const update = <K extends keyof OnboardingFormData>(key: K, value: OnboardingFormData[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const goBack = () => setCurrentStep((s) => Math.max(0, s - 1));
  const goNext = () => setCurrentStep((s) => Math.min(STEPS.length - 1, s + 1));

  return (
    <main className="flex h-screen flex-col bg-gray-100">
      <div className="flex-1 overflow-y-auto bg-white p-5">
        {/* Stepper */}
        <ol className="mb-6 flex items-start justify-between">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isActive = idx === currentStep;
            const isLast = idx === STEPS.length - 1;
            return (
              <li key={step.key} className="flex flex-1 items-center">
                <button type="button" onClick={() => setCurrentStep(idx)} className="flex flex-col items-center gap-1">
                  <span
                    className={[
                      'flex h-11 w-11 items-center justify-center rounded-full ring-2 transition-colors',
                      isActive ? 'bg-blue-600 text-white ring-0' : `bg-white ${step.ring} ${step.text}`,
                    ].join(' ')}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className={['text-[11px] font-medium', isActive ? 'text-gray-900' : 'text-gray-500'].join(' ')}>
                    {step.label}
                  </span>
                </button>
                {!isLast && <span className="mx-1 mt-[-18px] h-px flex-1 bg-gray-200" />}
              </li>
            );
          })}
        </ol>

        <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
          {/* ---------------- Step 0: Identity ---------------- */}
          {currentStep === 0 && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <FieldLabel icon={PersonIcon} tone="text-emerald-500">
                    First name
                  </FieldLabel>
                  <TextInput value={form.firstName} onChange={(v) => update('firstName', v)} placeholder="John" />
                </div>
                <div>
                  <span className="mb-1 block text-sm font-semibold text-gray-700">Last Name</span>
                  <TextInput value={form.lastName} onChange={(v) => update('lastName', v)} placeholder="Doe" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <FieldLabel icon={CalendarIcon} tone="text-emerald-500">
                    Date of Birth
                  </FieldLabel>
                  <input
                    type="date"
                    value={form.dob}
                    onChange={(e) => update('dob', e.target.value)}
                    className="w-full border-none bg-transparent p-0 text-sm text-gray-400 outline-none [color-scheme:light]"
                  />
                </div>
                <div>
                  <FieldLabel icon={UsersIcon} tone="text-amber-500">
                    Age
                  </FieldLabel>
                  <p className="text-sm text-gray-400">{age !== null ? `${age} Yrs.` : '—'}</p>
                </div>
              </div>

              <div>
                <FieldLabel icon={GenderIcon} tone="text-teal-500">
                  Gender
                </FieldLabel>
                <PillGroup
                  value={form.gender}
                  onChange={(v) => update('gender', v)}
                  options={[
                    { value: 'Male', icon: PersonIcon },
                    { value: 'Female', icon: PersonIcon },
                    { value: 'Others' },
                  ]}
                />
              </div>

              <div>
                <FieldLabel icon={RingsIcon} tone="text-emerald-500">
                  Marital Status
                </FieldLabel>
                <PillGroup
                  value={form.maritalStatus}
                  onChange={(v) => update('maritalStatus', v)}
                  options={[
                    { value: 'Single', icon: RingsIcon, iconTone: 'text-blue-500' },
                    { value: 'Married', icon: RingsIcon, iconTone: 'text-amber-500' },
                    { value: 'Others' },
                  ]}
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <FieldLabel icon={GraduationCapIcon} tone="text-emerald-500">
                    Education
                  </FieldLabel>
                  <button type="button" aria-label="Add education" className="flex h-7 w-7 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100">
                    <PlusIcon className="h-4 w-4" />
                  </button>
                </div>
                <ul className="flex flex-col gap-2">
                  {form.education.map((entry) => (
                    <li key={entry.id} className="flex items-start justify-between rounded-2xl border border-gray-100 bg-gray-50 p-3">
                      <div>
                        <p className="text-sm font-semibold text-blue-600">{entry.degree}</p>
                        <p className="text-xs text-gray-500">
                          {entry.from} - {entry.to}
                        </p>
                        <p className="text-xs font-medium text-gray-700">{entry.institute}</p>
                      </div>
                      <button type="button" aria-label={`Edit ${entry.degree}`} className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                        <EditIcon className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}

          {/* ---------------- Step 1: Globe ---------------- */}
          {currentStep === 1 && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <FieldLabel icon={LocationIcon} tone="text-rose-500">
                    Country
                  </FieldLabel>
                  <TextInput value={form.country} onChange={(v) => update('country', v)} placeholder="India" />
                </div>
                <div>
                  <span className="mb-1 block text-sm font-semibold text-gray-700">State</span>
                  <TextInput value={form.state} onChange={(v) => update('state', v)} placeholder="Haryana" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="mb-1 block text-sm font-semibold text-gray-700">City</span>
                  <TextInput value={form.city} onChange={(v) => update('city', v)} placeholder="Gurgaon" />
                </div>
                <div>
                  <FieldLabel icon={FlagIcon} tone="text-rose-500">
                    Nationality
                  </FieldLabel>
                  <TextInput value={form.nationality} onChange={(v) => update('nationality', v)} placeholder="Indian" />
                </div>
              </div>

              <div>
                <FieldLabel icon={LanguageIcon} tone="text-rose-500">
                  Languages Known
                </FieldLabel>
                <ChipInput values={form.languages} onChange={(v) => update('languages', v)} placeholder="Add a language and press Enter" />
              </div>

              <ToggleRow label="Willing to Relocate" checked={form.willingToRelocate} onChange={(v) => update('willingToRelocate', v)} />
            </>
          )}

          {/* ---------------- Step 2: Profession ---------------- */}
          {currentStep === 2 && (
            <>
              <div>
                <FieldLabel icon={BriefcaseIcon} tone="text-amber-500">
                  Job Title
                </FieldLabel>
                <TextInput value={form.jobTitle} onChange={(v) => update('jobTitle', v)} placeholder="UI/UX Designer" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <FieldLabel icon={LayersIcon} tone="text-amber-500">
                    Department
                  </FieldLabel>
                  <TextInput value={form.department} onChange={(v) => update('department', v)} placeholder="Product Design" />
                </div>
                <div>
                  <span className="mb-1 block text-sm font-semibold text-gray-700">Total Experience</span>
                  <TextInput value={form.totalExperience} onChange={(v) => update('totalExperience', v)} placeholder="5 Yrs" />
                </div>
              </div>

              <div>
                <span className="mb-2 block text-sm font-semibold text-gray-700">Employment Type</span>
                <PillGroup
                  value={form.employmentType}
                  onChange={(v) => update('employmentType', v)}
                  options={[{ value: 'Full-time' }, { value: 'Part-time' }, { value: 'Freelance' }, { value: 'Contract' }]}
                />
              </div>

              <div>
                <FieldLabel icon={TagIcon} tone="text-amber-500">
                  Skills
                </FieldLabel>
                <ChipInput values={form.skills} onChange={(v) => update('skills', v)} placeholder="Add a skill and press Enter" />
              </div>
            </>
          )}

          {/* ---------------- Step 3: Corporate ---------------- */}
          {currentStep === 3 && (
            <>
              <div>
                <span className="mb-1 block text-sm font-semibold text-gray-700">Company Name</span>
                <TextInput value={form.companyName} onChange={(v) => update('companyName', v)} placeholder="Gweka Consulting Pvt. Ltd" />
              </div>

              <div>
                <span className="mb-1 block text-sm font-semibold text-gray-700">Company Type</span>
                <SelectInput
                  value={form.companyType}
                  onChange={(v) => update('companyType', v)}
                  options={['Private Limited', 'Public Limited', 'LLP', 'Sole Proprietorship']}
                />
              </div>

              <div>
                <span className="mb-1 block text-sm font-semibold text-gray-700">Company Size</span>
                <SelectInput
                  value={form.companySize}
                  onChange={(v) => update('companySize', v)}
                  options={['1 - 50', '50 - 200', '200 - 250', '250 - 500', '500+']}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="mb-1 block text-sm font-semibold text-gray-700">From</span>
                  <input
                    type="date"
                    value={form.fromDate}
                    onChange={(e) => update('fromDate', e.target.value)}
                    className="w-full rounded-xl border border-gray-300 px-3 py-3 text-sm text-gray-800 outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <span className="mb-1 block text-sm font-semibold text-gray-700">To</span>
                  <input
                    type="date"
                    value={form.toDate}
                    disabled={form.currentlyWorking}
                    onChange={(e) => update('toDate', e.target.value)}
                    className="w-full rounded-xl border border-gray-300 px-3 py-3 text-sm text-gray-800 outline-none focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-400"
                  />
                </div>
              </div>

              <ToggleRow label="Currently Working" checked={form.currentlyWorking} onChange={(v) => update('currentlyWorking', v)} />

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-700">Experience</span>
                  <button type="button" aria-label="Add experience" className="flex h-7 w-7 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100">
                    <PlusIcon className="h-4 w-4" />
                  </button>
                </div>
                <ul className="flex flex-col gap-2">
                  {form.workExperience.map((entry) => (
                    <li key={entry.id} className="flex items-start justify-between rounded-2xl border border-gray-100 bg-gray-50 p-3">
                      <div>
                        <p className="text-sm font-semibold text-blue-600">{entry.company}</p>
                        <p className="text-xs text-gray-500">
                          {entry.from} - {entry.to}
                        </p>
                        <p className="text-xs font-medium text-gray-700">{entry.location}</p>
                      </div>
                      <button type="button" aria-label={`Edit ${entry.company}`} className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                        <EditIcon className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}

          {/* ---------------- Step 4: Growth ---------------- */}
          {currentStep === 4 && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <FieldLabel icon={RupeeIcon} tone="text-sky-500">
                    Current CTC
                  </FieldLabel>
                  <TextInput value={form.currentCTC} onChange={(v) => update('currentCTC', v)} placeholder="12 LPA" />
                </div>
                <div>
                  <span className="mb-1 block text-sm font-semibold text-gray-700">Expected CTC</span>
                  <TextInput value={form.expectedCTC} onChange={(v) => update('expectedCTC', v)} placeholder="18 LPA" />
                </div>
              </div>

              <div>
                <FieldLabel icon={GrowthIcon} tone="text-sky-500">
                  Monthly Investment Capacity
                </FieldLabel>
                <TextInput value={form.investmentCapacity} onChange={(v) => update('investmentCapacity', v)} placeholder="₹10,000" />
              </div>

              <div>
                <FieldLabel icon={GaugeIcon} tone="text-sky-500">
                  Risk Appetite
                </FieldLabel>
                <PillGroup value={form.riskAppetite} onChange={(v) => update('riskAppetite', v)} options={[{ value: 'Low' }, { value: 'Medium' }, { value: 'High' }]} />
              </div>
            </>
          )}
        </form>
      </div>

      {/* Footer nav — pinned to the bottom of the viewport; flex-1 above fills any leftover space */}
      <div className="shrink-0 border-t border-gray-100 bg-white px-5 py-4">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={goBack}
            disabled={currentStep === 0}
            aria-label="Previous step"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-1.5">
            {STEPS.map((step, idx) => (
              <span key={step.key} className={['h-2 w-2 rounded-full transition-colors', idx === currentStep ? 'bg-blue-600' : 'bg-gray-300'].join(' ')} />
            ))}
          </div>

          <button
            type="button"
            onClick={goNext}
            disabled={currentStep === STEPS.length - 1}
            aria-label="Next step"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ArrowRightIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </main>
  );
}
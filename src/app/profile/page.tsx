'use client';

import { useState } from 'react';

/* ---------------- Icons (inline SVG, no external deps) ---------------- */

function BackArrowIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ShareIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="6" cy="12" r="2.2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="18" cy="6" r="2.2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="18" cy="18" r="2.2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 10.8l8-4.6M8 13.2l8 4.6" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function BookmarkIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M6 3.5h12v17l-6-4-6 4v-17Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
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

function BriefcaseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="2.5" y="8" width="19" height="12" rx="2.2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 8V6.5A2.5 2.5 0 0 1 10.5 4h3A2.5 2.5 0 0 1 16 6.5V8" stroke="currentColor" strokeWidth="1.6" />
      <path d="M2.5 13h19" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function DocumentIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M6 2.5h9l3 3v16H6v-19Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M15 2.5V6h3" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M8.5 11h7M8.5 14.3h7M8.5 17.6h4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function FactoryIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M3 21V11l5 3.2V11l5 3.2V11l6-3.5V21H3Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M17 7.5V4h3v2" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M6.5 17h2M11 17h2M15.5 17h2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
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

function RupeeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M6 4h12M6 8h12M6 4c4 0 6 1.6 6 4s-2 4-6 4h-1l8 8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 20.5s-7.5-4.6-9.8-9C.6 8 2 4.5 5.4 4c2-.3 3.8.7 6.6 3.4C14.8 4.7 16.6 3.7 18.6 4c3.4.5 4.8 4 3.2 7.5-2.3 4.4-9.8 9-9.8 9Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CakeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M4 21v-7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v7H4Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M4 17.5c1.2 0 1.2-1 2.4-1s1.2 1 2.4 1 1.2-1 2.4-1 1.2 1 2.4 1 1.2-1 2.4-1 1.2 1 2.4 1" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8.5 11V8M12 11V6M15.5 11V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function EyeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="2.6" stroke="currentColor" strokeWidth="1.7" />
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

function CalendarCheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3 9.5h18M8 3v3.5M16 3v3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M8.5 14.5l2 2 4.5-4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 3v12M7.5 10.5 12 15l4.5-4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 18.5h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

/* ---------------- Types ---------------- */

interface ExperienceItem {
  company: string;
  role: string;
  duration: string;
  location: string;
  bullets: string[];
}

interface OtherInfoItem {
  label: string;
  value: string;
}

export interface ProfileDetailData {
  id: string;
  name: string;
  title: string;
  location: string;
  lastActive: string;
  isOnline: boolean;
  company: string;
  companyYears: string;
  description: string;
  industry: string;
  education: string;
  experience: string;
  salary: string;
  stats: {
    maritalStatus: string;
    age: string;
    views: string;
    availability: string;
    noticePeriod: string;
    jdReceived: string;
  };
  about: string;
  experienceList: ExperienceItem[];
  skills: string[];
  otherInfo: OtherInfoItem[];
}

const DEFAULT_PROFILE: ProfileDetailData = {
  id: '55748449',
  name: 'Reet Walia',
  title: 'UI/UX Designer',
  location: 'Gurgaon, India',
  lastActive: 'Just Now',
  isOnline: true,
  company: 'Gweka Consulting Ltd.',
  companyYears: '3.5 Yrs',
  description: 'Handling Payroll, Admin, Compliance, Labour Law & HR Operation of 3000+ Employees',
  industry: 'Manufacturing',
  education: 'MBA | BTech',
  experience: '5 Yrs',
  salary: '15 LPA',
  stats: {
    maritalStatus: 'Unmarried',
    age: '26 Yrs',
    views: '47 Views',
    availability: '5 Days/week',
    noticePeriod: '15 Days',
    jdReceived: '42 Jd Received',
  },
  about:
    'I have recently entered the field of UI/UX, and in this project, I worked with great teammates to design Jobior. This was an invaluable opportunity for me to enhance my soft skills and learn the fundamentals of user-centered design, from wireframes to high-fidelity prototypes.',
  experienceList: [
    {
      company: 'Gweka Consulting Ltd.',
      role: 'UI/UX Designer',
      duration: 'Feb 2023 - Present',
      location: 'Gurgaon, India',
      bullets: [
        'Designed end-to-end UI/UX for Jobior, a hiring platform used by 3000+ employees.',
        'Ran user research and usability testing to validate design decisions.',
        'Built and maintained a shared design system in Figma.',
      ],
    },
    {
      company: 'Airbnb LLC',
      role: 'Junior Product Designer',
      duration: 'Mar 2022 - Feb 2023',
      location: 'Palo Alto, United States of America',
      bullets: [
        'Supported the design team on booking-flow experiments.',
        'Created wireframes and interactive prototypes for A/B tests.',
      ],
    },
  ],
  skills: [
    'Figma',
    'Adobe XD',
    'Wireframing',
    'Prototyping',
    'User Research',
    'Sketch',
    'Design Systems',
    'HTML/CSS',
  ],
  otherInfo: [
    { label: 'Languages Known', value: 'English, Hindi' },
    { label: 'Date of Birth', value: '14 Mar 2000' },
    { label: 'Current CTC', value: '12 LPA' },
    { label: 'Expected CTC', value: '18 LPA' },
    { label: 'Preferred Location', value: 'Gurgaon, Delhi NCR' },
    { label: 'Notice Period', value: '15 Days' },
  ],
};

function initials(name: string) {
  return name.split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase();
}

const TABS = ['About', 'Experience', 'Skills', 'Other Info'] as const;
type Tab = (typeof TABS)[number];

/* ---------------- Component ---------------- */

export default function ProfileDetailCard({
  profile = DEFAULT_PROFILE,
  onBack,
  onShare,
  onSave,
}: {
  profile?: ProfileDetailData;
  onBack?: () => void;
  onShare?: () => void;
  onSave?: () => void;
}) {
  const [activeTab, setActiveTab] = useState<Tab>('About');

  const infoRows = [
    { icon: BriefcaseIcon, tone: 'text-teal-600', content: `${profile.company} (${profile.companyYears})`, emphasize: true },
    { icon: DocumentIcon, tone: 'text-amber-500', content: profile.description, emphasize: false },
    { icon: FactoryIcon, tone: 'text-gray-700', content: profile.industry, emphasize: true },
    { icon: GraduationCapIcon, tone: 'text-emerald-600', content: profile.education, emphasize: true },
    { icon: BriefcaseIcon, tone: 'text-gray-700', content: profile.experience, emphasize: true },
    { icon: RupeeIcon, tone: 'text-emerald-600', content: profile.salary, emphasize: true },
  ];

  const stats = [
    { icon: HeartIcon, label: profile.stats.maritalStatus },
    { icon: CakeIcon, label: profile.stats.age },
    { icon: EyeIcon, label: profile.stats.views },
    { icon: CalendarIcon, label: profile.stats.availability },
    { icon: CalendarCheckIcon, label: profile.stats.noticePeriod },
    { icon: DownloadIcon, label: profile.stats.jdReceived },
  ];

  return (
    <div className="mx-auto w-full max-w-sm overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between bg-blue-600 px-4 py-3 text-white">
        <button type="button" onClick={onBack} aria-label="Go back" className="rounded-full p-1 hover:bg-white/10">
          <BackArrowIcon className="h-5 w-5" />
        </button>
        <h1 className="text-sm font-semibold">Profile</h1>
        <div className="flex items-center gap-3">
          <button type="button" onClick={onShare} aria-label="Share profile" className="rounded-full p-1 hover:bg-white/10">
            <ShareIcon className="h-4.5 w-4.5" />
          </button>
          <button type="button" onClick={onSave} aria-label="Save profile" className="rounded-full p-1 hover:bg-white/10">
            <BookmarkIcon className="h-4.5 w-4.5" />
          </button>
        </div>
      </div>

      <div className="px-4 pb-4 pt-3">
        {/* ID */}
        <p className="mb-2 text-right text-xs font-semibold text-blue-600">ID - {profile.id}</p>

        {/* Identity */}
        <div className="flex items-start gap-3">
          <div className="relative shrink-0">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-lg font-semibold text-blue-700">
              {initials(profile.name)}
            </div>
            {profile.isOnline && (
              <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-500" />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="truncate text-base font-bold text-gray-900">{profile.name}</h2>
            <p className="text-sm text-gray-600">{profile.title}</p>
            <p className="mt-0.5 flex items-center gap-1 text-xs text-gray-500">
              <LocationIcon className="h-3.5 w-3.5" />
              {profile.location}
            </p>
            <p className="mt-0.5 text-xs italic text-gray-400">{profile.lastActive}</p>
          </div>
        </div>

        <hr className="my-3 border-gray-100" />

        {/* Info rows */}
        <ul className="flex flex-col gap-2.5">
          {infoRows.map((row, idx) => {
            const Icon = row.icon;
            return (
              <li key={idx} className="flex items-start gap-2.5">
                <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${row.tone}`} />
                <span className={row.emphasize ? 'text-sm font-semibold text-gray-800' : 'text-sm text-gray-500'}>
                  {row.content}
                </span>
              </li>
            );
          })}
        </ul>

        <hr className="my-3 border-gray-100" />

        {/* Stats */}
        <div className="grid grid-cols-3 gap-y-3 text-center">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="flex flex-col items-center gap-1 px-1">
                <Icon className="h-4 w-4 text-gray-500" />
                <span className="text-[11px] leading-tight text-gray-600">{stat.label}</span>
              </div>
            );
          })}
        </div>

        <hr className="my-3 border-gray-100" />

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={[
                'flex-1 whitespace-nowrap border-b-2 px-1 pb-2 text-xs font-medium transition-colors',
                activeTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700',
              ].join(' ')}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab panels */}
        <div className="pt-3">
          {activeTab === 'About' && (
            <p className="text-sm leading-relaxed text-gray-600">{profile.about}</p>
          )}

          {activeTab === 'Experience' && (
            <ul className="flex flex-col gap-3">
              {profile.experienceList.map((exp, idx) => (
                <li key={idx} className="rounded-xl border border-gray-100 bg-gray-50 p-3">
                  <p className="text-sm font-semibold text-blue-600">{exp.company}</p>
                  <p className="text-xs font-medium text-gray-700">{exp.role}</p>
                  <p className="mt-0.5 text-xs text-gray-500">
                    {exp.duration} &middot; {exp.location}
                  </p>
                  {exp.bullets.length > 0 && (
                    <ul className="mt-2 list-disc space-y-1 pl-4">
                      {exp.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="text-xs text-gray-600">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          )}

          {activeTab === 'Skills' && (
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}

          {activeTab === 'Other Info' && (
            <dl className="flex flex-col gap-2.5">
              {profile.otherInfo.map((item) => (
                <div key={item.label} className="flex items-center justify-between gap-3 text-sm">
                  <dt className="text-gray-500">{item.label}</dt>
                  <dd className="font-medium text-gray-800">{item.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>
    </div>
  );
}
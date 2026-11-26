// Org chart data. Edit this file to change people/roles.
// Validation status per person:
//   verified   – confirmed by an official company source or reputable press
//   corrected  – name/title/role differs from the source chart; updated here
//   partial    – only third-party directory/LinkedIn evidence; looks right but confirm
//   unverified – no public evidence found; came from account intel / source chart
//   vacant     – role open or holder unknown
// isNew = 'NEW' label on the slide; highlight = blue accent bar (otherwise navy).
// These are only the starting defaults – edits made in the app are saved in the browser.
// Validated 26 Nov 2026.

window.ACCOUNTS = [
  {
    id: "anz",
    slideTitle: "NEW ANZ Technology Org Chart",
    supportBox: "Gartner Support",
    footer: "RESTRICTED",
    name: "ANZ Bank",
    asOf: "Validated 26 Nov 2026",
    source: "Technology org chart (Nov 2026) + public sources",
    leader: {
      name: "Donald Patra",
      title: "Group Chief Information Officer",
      remit: "Ex-HSBC (CIO UK & Europe). Started 24 Nov 2025, reports to CEO Nuno Matos. Running a nine-priority tech strategy aligned to ANZ 2030.",
      status: "verified",
      evidence: "ANZ / iTnews appointment coverage; Bluenotes Jul 2026",
      isNew: true,
      highlight: true,
    },
    sidekick: {
      name: "Daniel Szendrak",
      title: "Chief of Staff",
      remit: "Chief of Staff to the Group CIO",
      status: "unverified",
      evidence: "From the source org chart only; no public confirmation found",
    },
    reports: [
      { name: "Joshua McLean", title: "Divisional CIO, Retail Bank", remit: "Retail banking technology", status: "partial", evidence: "Directories list 'CIO, Retail & Commercial' at ANZ" },
      { name: "Peter Barrass", title: "Divisional CIO, Institutional", remit: "Institutional banking & markets technology", status: "corrected", evidence: "Spelling corrected from 'Barras' – public listings use 'Barrass' (CIO, Institutional Banking & Markets)" },
      { name: "Jo Hayes", title: "Divisional CIO, Group Services", remit: "Technology employee experience for ~45k staff; AI adoption", status: "verified", evidence: "ANZ Bluenotes author profile & articles" },
      { name: "Tim Hogarth", title: "Chief Architect", remit: "Enterprise architecture & simplification", status: "verified", evidence: "Was ANZ's first CTO (2022), previously Chief Architect. Source chart shows him back in a Chief Architect role.", isNew: true, highlight: true },
      { name: "Tyson Sheills", title: "Chief Technology Officer", remit: "Infrastructure, hosting, cloud & platforms", status: "corrected", evidence: "Spelling corrected from 'Shiels' – public profiles use 'Sheills' (Group CTO)", isNew: true },
      { name: "Ian Cruttenden", title: "Acting – Strategy & Execution", remit: "Tech strategy office / portfolio execution", status: "unverified", evidence: "From the source org chart only; no public confirmation found", isNew: true },
      { name: "Sandro Bucchianeri", title: "Chief Information Security Officer", remit: "Cyber security. Ex-NAB CSO; started 11 Nov 2026, reports to Donald Patra.", status: "corrected", evidence: "ANZ media release 26 Aug 2026. Replaces Shane Ripley, who was Acting CISO on the source chart.", isNew: true },
      { name: "Kai Yang", title: "Chief Data & AI Officer", remit: "ANZ's first CDAIO; ex-HSBC. Appointed May 2026, reports to Donald Patra.", status: "verified", evidence: "ANZ announcement May 2026", isNew: true },
      { name: "TBD", title: "GM, Non-Financial Risk", remit: "NFR & controls uplift (one of the nine tech priorities)", status: "vacant", evidence: "Role shown as TBD on the source chart", isNew: true },
      { name: "Bagya Krishnamoorthy", title: "Head of GCC (India)", remit: "Global Capability Centre, Bengaluru; also Head of Data for Institutional", status: "partial", evidence: "LinkedIn: Head of Technology, GCC Bengaluru", isNew: true },
    ],
    adjacent: [
      { name: "Shane Ripley", title: "Domain Lead, Cyber Security Risk (was Acting CISO)", status: "verified", evidence: "Acting CISO until Bucchianeri started 11 Nov 2026 (ANZ release)" },
      { name: "Nuno Matos", title: "CEO – Donald Patra's manager", status: "verified", evidence: "ANZ announcements" },
    ],
    entryOrder: [
      "Donald Patra for the nine-priority strategy and executive sponsorship",
      "Kai Yang for data & AI enablement",
      "Tyson Sheills and Tim Hogarth for platforms, simplified architecture and engineering",
      "Sandro Bucchianeri for cyber maturity (new in seat – early relationship window)",
      "Divisional CIOs (McLean, Barrass, Hayes) for business-aligned demand",
    ],
    validationNotes: [
      "Ian Cruttenden and Daniel Szendrak could not be confirmed publicly.",
      "GM NFR is still TBD.",
    ],
  },

  {
    id: "medibank",
    slideTitle: "Medibank Technology Org Chart",
    supportBox: "Gartner Support",
    footer: "RESTRICTED",
    name: "Medibank",
    asOf: "Validated 26 Nov 2026",
    source: "Account intel (Copilot) + public sources",
    leader: {
      name: "Felicia Trewin",
      title: "Group Lead – Data & Technology (CIO)",
      remit: "Owns technology, information security, data, digital and core platforms. Joined Feb 2024 from AMP (CTO).",
      status: "verified",
      evidence: "Medibank Board & Management page; 2026 Annual Report",
    },
    reports: [
      { name: "Christoph Strizik", title: "Chief Information Security Officer", remit: "Cyber strategy, IT security, risk & compliance, board assurance", status: "verified", evidence: "iTnews: joined from Origin Energy in 2025" },
      { name: "Adrian Aurelio", title: "Head of Digital Technology & Engineering", remit: "Digital platforms, engineering, customer-facing technology", status: "unverified", evidence: "Account intel; direct line to Felicia not confirmed" },
      { name: "Purandar Raj Manoharan", title: "Head of Technology – Cloud Engineering & IT Infrastructure", remit: "Cloud, infrastructure and core technology services", status: "unverified", evidence: "Account intel; direct line not confirmed" },
      { name: "Dean Burgess", title: "Head of Operations, Core Customer Systems", remit: "Operations & reliability of core customer platforms", status: "unverified", evidence: "Account intel; direct line not confirmed" },
      { name: "J.P. O'Reilly", title: "Head of IT Service Delivery", remit: "Enterprise service delivery and technology operations", status: "unverified", evidence: "Account intel; direct line not confirmed" },
      { name: "Chris Leech", title: "Head of Data Governance", remit: "Information governance, quality and stewardship", status: "unverified", evidence: "Account intel" },
      { name: "Gemma Scott", title: "Digital Workplace Enablement & Employee Experience", remit: "Microsoft 365, Copilot, Power Platform and workplace AI", status: "unverified", evidence: "Account intel" },
      { name: "Apurv Baviskar", title: "Enterprise Data, AI & Data Mgmt Strategy / Architecture", remit: "Enterprise data, AI strategy and data architecture", status: "unverified", evidence: "Account intel; direct line not confirmed" },
    ],
    adjacent: [
      { name: "Ediz Babacan", title: "Care Management Technology / Amplar Health", status: "unverified" },
      { name: "Rebecca Mafodda", title: "Enterprise Technology Delivery Leader", status: "unverified" },
      { name: "Reshmanth Kolli", title: "Cloud Tech Lead", status: "unverified" },
      { name: "Greg Moss", title: "Senior Commercial Partnerships Manager", status: "unverified" },
      { name: "Adeel Ahmed", title: "Senior Solution Architect", status: "unverified" },
      { name: "Marcos Faria-Silva", title: "Head of Legal – Technology, Procurement & Spaces", status: "unverified" },
    ],
    entryOrder: [
      "Felicia Trewin for enterprise priorities, transformation and executive sponsorship",
      "Christoph Strizik for cyber strategy, resilience and board risk",
      "Purandar Raj Manoharan and J.P. O'Reilly for infrastructure, cloud, service management and vendors",
      "Adrian Aurelio for digital engineering and customer technology",
      "Chris Leech and Apurv Baviskar for data governance, AI and architecture",
    ],
    validationNotes: [
      "Check whether Aurelio, Manoharan, Burgess and O'Reilly report directly to Felicia or through an intermediate exec.",
      "Only Trewin and Strizik are confirmed by public sources.",
    ],
  },

  {
    id: "unisuper",
    slideTitle: "UniSuper Technology Org Chart",
    supportBox: "Gartner Support",
    footer: "RESTRICTED",
    name: "UniSuper",
    asOf: "Validated 26 Nov 2026",
    source: "Account intel (Copilot) + public sources",
    leader: {
      name: "Andrew Todd",
      title: "Chief Technology Officer",
      remit: "Leads Technology & Delivery, strategic transformation and core systems/platform health. Joined Nov 2025 (ex-IRESS, IOOF).",
      status: "verified",
      evidence: "UniSuper executive leadership team page",
    },
    reports: [
      { name: "Vijay Krishnan", title: "Chief Information Security Officer", remit: "Security ops, GRC, architecture, IAM, resilience, observability", status: "partial", evidence: "Only a third-party profile lists him as UniSuper CISO" },
      { name: "Michael Stange", title: "Senior Technology Executive", remit: "Engineering & platform leadership – exact title TBC", status: "unverified", evidence: "No public match found" },
      { name: "Chris Moore", title: "Senior Manager, Application & Cloud Portfolio", remit: "Application portfolio, digital, integration, data and cloud", status: "unverified", evidence: "Account intel" },
      { name: "Farnaz Vahab", title: "Senior Manager – Delivery Capability & Coaching", remit: "Operating model, delivery capability, portfolio flow", status: "unverified", evidence: "Account intel" },
      { name: "Sarah Bingham", title: "Platform Lead", remit: "Super administration platform & technical delivery", status: "unverified", evidence: "Account intel" },
      { name: "Ashfaque Mir", title: "Platform Lead", remit: "Super platforms, solution architecture & delivery", status: "unverified", evidence: "Account intel" },
      { name: "Shane Sweeney", title: "Platform Lead – Technology & Delivery", remit: "Digital product, engineering & member technology", status: "unverified", evidence: "Account intel" },
      { name: "Vacant / TBC", title: "Cloud & Infrastructure Leader", remit: "Cloud, infra, network, FinOps, resilience. Previously Jeremy Bugeja (Manager, Infrastructure & Cloud) – successor not public.", status: "vacant", evidence: "Priority validation" },
    ],
    adjacent: [
      { name: "Dani Murrie", title: "Chief Marketing & Growth Officer – digital/CX exec stakeholder", status: "verified", evidence: "UniSuper media release (joined 2022 from MetLife)" },
      { name: "Vacant / TBC", title: "Enterprise Portfolio Leader – permanent successor to interim lead Bruno Condello", status: "vacant" },
      { name: "Unknown", title: "Data & Analytics Leadership – named senior owner not public", status: "vacant" },
    ],
    entryOrder: [
      "Andrew Todd for technology strategy, simplification, transformation and core-platform health",
      "Vijay Krishnan for cyber, identity, security architecture, resilience and observability",
      "Chris Moore for application, integration and cloud portfolio decisions",
      "Sarah Bingham, Ashfaque Mir and Shane Sweeney for platform-specific discovery",
      "Dani Murrie where tech decisions affect digital channels, member experience or growth",
    ],
    validationNotes: [
      "Working hypothesis: Krishnan, Stange and the portfolio/platform layer sit within Andrew Todd's Technology & Delivery org – confirm solid lines.",
      "Cloud & Infrastructure leader and Data & Analytics owner unknown.",
    ],
  },

  {
    id: "aia",
    slideTitle: "AIA Australia Technology Org Chart",
    supportBox: "Gartner Support",
    footer: "RESTRICTED",
    name: "AIA Australia",
    asOf: "Validated 26 Nov 2026",
    source: "Account intel (Copilot) + public sources",
    leader: {
      name: "Susann Huebner",
      title: "Acting Chief Technology Officer",
      remit: "Joined 2022 as GM Enterprise Platforms; GM IT Strategy & Business Partnership late 2024; Acting CTO from mid-2025. Some directories now list her as CTO (permanent?).",
      status: "corrected",
      evidence: "AIA Australia 'Our People' page. Source chart had this as 'holder unknown' after Sander van den Berg's exit.",
    },
    reports: [
      { name: "Siva Balasundaram", title: "GM, Infrastructure, Platforms & Engineering", remit: "Infrastructure, platforms & engineering leadership", status: "unverified", evidence: "Account intel" },
      { name: "Dirk Vandenbulcke", title: "GM, Technology Infrastructure & Cloud, Engineering & Quality", remit: "Cloud, infrastructure, engineering & quality", status: "unverified", evidence: "Account intel – remit overlaps with Siva" },
      { name: "Hartley Olley", title: "Head of Architecture & Governance", remit: "Enterprise architecture, standards, tech governance", status: "unverified", evidence: "Account intel" },
      { name: "Sam Lee", title: "Head of Applications & Platforms, Digital", remit: "Customer, adviser & partner apps and platforms", status: "unverified", evidence: "Account intel" },
      { name: "Marie Therese Nguyen Da Huong", title: "GM, Data Governance & Business Insights", remit: "Data governance, BI and analytics", status: "unverified", evidence: "Account intel" },
      { name: "Tracy Ballis", title: "Senior Manager – Data Governance, Reporting & Insights", remit: "Within data organisation", status: "unverified", evidence: "Account intel" },
      { name: "Wayne Blackshaw", title: "Head of Technology Risk, AI, Privacy & Business Resilience", remit: "Adjacent control function", status: "unverified", evidence: "Account intel" },
    ],
    adjacent: [
      { name: "Damien Mu", title: "CEO – executive sponsor and business owner", status: "verified", evidence: "AIA Australia, Mar 2026" },
      { name: "Biswa Misra", title: "AIA Group Chief Technology & Life Operations Officer – group-level influence", status: "verified", evidence: "AIA Group / McKinsey / FutureCIO 2026" },
      { name: "Edward Moncreiffe", title: "AIA Group Regional CEO – India, Sri Lanka, Australia & NZ (from 2 Nov 2026)", status: "verified", evidence: "AIA Group announcement" },
      { name: "Unknown", title: "Customer & Claims Technology – named owner TBC", status: "vacant" },
      { name: "Group TDA Leadership", title: "Technology, Digital & Analytics standards and investment influence", status: "unverified" },
    ],
    entryOrder: [
      "Confirm whether Susann Huebner is now permanent CTO",
      "Siva Balasundaram and Dirk Vandenbulcke for platforms, cloud, engineering and operational resilience",
      "Hartley Olley for architecture standards, governance and strategic alignment",
      "Sam Lee for customer, adviser and partner digital platforms",
      "Marie Therese Nguyen Da Huong and Tracy Ballis for data governance, reporting and analytics",
      "Wayne Blackshaw for AI risk, privacy, controls and resilience",
    ],
    validationNotes: [
      "Siva and Dirk have overlapping published remits – confirm whether one superseded the other.",
      "Source chart said van den Berg left Dec 2025; AIA's site shows Huebner acting since mid-2025.",
    ],
  },
];

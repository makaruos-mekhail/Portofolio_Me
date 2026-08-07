import { Dict } from './dict';

export const en: Dict = {
  meta: {
    title: 'Makaruos Mekhail — Frontend Angular Developer',
    description:
      'Frontend Angular Developer with 3+ years building production Angular platforms across FinTech, RegTech and HealthTech.'
  },
  nav: {
    about: 'About',
    experience: 'Experience',
    skills: 'Skills',
    projects: 'Projects',
    education: 'Education',
    certs: 'Certificates',
    contact: 'Contact',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    switchLang: 'التبديل إلى العربية',
    langBtn: 'AR',
    toDark: 'Switch to dark mode',
    toLight: 'Switch to light mode'
  },
  hero: {
    name: 'Makaruos',
    name_short: 'Mekhail Yousab',
    available: 'Open to frontend opportunities',
    role: 'Frontend Angular Developer',
    roles: [
      'Angular 21 · Signals',
      'Micro-Frontend Architecture',
      'Nx Monorepo at scale',
      'SSR · SEO · RTL i18n'
    ],
    tagline:
      '3+ years shipping production Angular across FinTech, compliance and healthcare — currently delivering three Angular 21 platforms on a micro-frontend architecture inside an Nx monorepo.',
    cta1: 'Download CV',
    cta2: 'Get in touch',
    available_short: 'Available',
    location: 'Cairo, Egypt'
  },
  about: {
    title: 'Profile',
    body: 'Frontend Angular Developer with 3+ years of experience building production web applications across FinTech, compliance and healthcare. Currently delivering three Angular 21 platforms on a micro-frontend architecture inside an Nx monorepo — including a US-market wealth-management product I own end to end across its client, admin and SSR website apps.',
    bodyExtra:
      'Strong across Angular v16 → v21 — standalone components, signals, OnPush change detection — with hands-on Stripe, Firebase and brokerage-API integrations, SSR/SEO, and bilingual Arabic/English RTL interfaces. ITI graduate.',
    domains: ['FinTech', 'RegTech', 'HealthTech', 'PropTech', 'E-commerce'],
    pillars: [
      {
        icon: 'layers',
        title: 'Micro-frontend architecture',
        text: 'Three Angular 21 products living in one Nx monorepo, sharing a 19-component UI library.'
      },
      {
        icon: 'cpu',
        title: 'Modern Angular, end to end',
        text: 'Standalone components, signals & computed state, OnPush change detection, lazy-loaded routes.'
      },
      {
        icon: 'shield',
        title: 'Regulated-domain ready',
        text: 'KYC review, roles & permissions, audit logging, Stripe billing and brokerage-API integrations.'
      },
      {
        icon: 'globe',
        title: 'SSR, SEO & bilingual RTL',
        text: 'Prerendered marketing sites with ngx-translate and full Arabic/English right-to-left support.'
      }
    ]
  },
  experience: {
    title: "Where I've worked",
    expand: 'Click to expand',
    collapse: 'Click to collapse'
  },
  skills: {
    title: 'Technical skills',
    subtitle: 'Pick a category to see the toolkit behind the work.',
    groupsLabel: 'Skill categories'
  },
  projects: {
    title: 'Selected projects',
    subtitle:
      'Products shipped across investing, compliance, economic data, healthcare, real estate and e-commerce.',
    filters: ['All', 'Platforms', 'FinTech', 'Company work', 'Freelance', 'Personal'],
    empty: 'No projects in this category yet.'
  },
  education: {
    title: 'Education, certificates & languages',
    eduHeading: 'Education',
    certHeading: 'Certificates',
    langHeading: 'Languages'
  },
  certs: {
    title: 'Certificates'
  },
  contact: {
    title: "Let's build something",
    subtitle: 'Open to new opportunities and freelance collaborations.',
    name: 'Name',
    email: 'Email',
    message: 'Message',
    send: 'Send message',
    sending: 'Opening your mail app…',
    success: 'Your mail app should open now.',
    required: 'This field is required',
    invalidEmail: 'Enter a valid email address',
    ctaTitle: 'Have a product that needs a frontend owner?',
    ctaText:
      'I take products from Figma to production — architecture, components, integrations and SEO included.',
    ctaButton: 'Start a conversation',
    failed: 'Something went wrong. Please email me directly.'
  },
  footer: '© 2026 Makaruos Mekhail. Built with care.',
  backToTop: 'Back to top',
  stats: [
    { value: '3+', label: 'Years experience' },
    { value: '100+', label: 'Screens shipped' },
    { value: '130+', label: 'Components built' },
    { value: '19', label: 'Shared UI components' }
  ],
  jobs: [
    {
      id: 'expand360',
      company: 'Expand360',
      period: '01/2026 – Present',
      location: 'Nasr City, Egypt',
      tag: 'Current',
      role: 'Frontend Angular Developer',
      subtitle: 'FinTech, RegTech & Economic Data SaaS · Angular 21 · Micro-Frontends · Nx Monorepo',
      bullets: [
        'Belvro Wealth — sole frontend developer: delivered the complete frontend of a managed-portfolio investing platform for the US market (client dashboard, admin console and SSR marketing website), covering ~100 page-level screens and 130+ components, backed by a 19-component shared UI library reused across all three apps.',
        "Built Belvro's core investment journeys end to end: risk-based portfolio assessment, allocation and performance dashboards, a multi-step trading-account onboarding flow wired to the Alpaca brokerage API, funding/wallet and transactions, KYC review, fee management, roles & permissions and audit logging.",
        'Integrated Stripe (ngx-stripe / Stripe Elements) for subscription billing, saved payment methods and invoicing, and Firebase for platform services; built a typed API layer over a shared HTTP service with interceptors, route guards and DTO mapping.',
        'Comply360 (3-developer frontend team): owned the marketing website end to end and delivered client and admin modules for a global compliance platform spanning 20+ regulatory frameworks (SOC 2, ISO 27001, HIPAA, NIST, GDPR) across 20+ markets — jurisdiction roadmaps, automated tax compliance and risk-scoring dashboards.',
        'Signals360 (3-developer frontend team): owned the marketing website and built client/admin data views for an economic-intelligence platform on Egypt — macro indicators (GDP, FDI, inflation, unemployment) plus sector and regional breakdowns visualised with ngx-echarts.',
        'Applied modern Angular patterns throughout: standalone components, signals and computed state, OnPush change detection, lazy-loaded routes, SSR with prerendering for SEO, and ngx-translate with full Arabic/English RTL support.',
        'Use AI-assisted development (Claude Code, Cursor, GitHub Copilot) for refactoring, test scaffolding and code review across the 3-app Nx monorepo.'
      ]
    },
    {
      id: 'majisa-egypt',
      company: 'Majisa Egypt',
      period: '01/2025 – 01/2026',
      location: 'Maadi, Egypt',
      tag: 'HealthTech & PropTech',
      role: 'Mid-level Frontend Angular Developer',
      subtitle: 'HealthTech & PropTech',
      bullets: [
        'CareTalk (outsourcing): built the frontend of a telehealth scheduling platform allowing patients to book and join video consultations at times that suit them, with a doctor-facing CRM to review, confirm, reschedule and follow up on appointments.',
        'CherryPick (insourcing): developed a real estate management platform that streamlines property operations — listings, unit and inventory management and sales workflows — with a responsive, component-driven Angular UI.',
        'Converted Figma designs into reusable components, integrated RESTful APIs with reactive forms, pagination and full CRUD, and implemented route guards and role-based access control.'
      ]
    },
    {
      id: 'uktra-digital-solutions',
      company: 'Uktra Digital Solutions',
      period: '07/2023 – 12/2024',
      location: 'New Cairo, Egypt',
      tag: 'Agency',
      role: 'Junior Frontend Angular Developer',
      subtitle: 'Digital agency — corporate & e-commerce delivery',
      bullets: [
        'Delivered 6 corporate and e-commerce websites for agency clients: K-Group (multi-brand corporate site for Prentex and Origin), Prints & Elegant (e-commerce with custom design orders, user accounts and cart), Deoss Congress (international ophthalmology symposium), Hani George, Polymers and Fanarah Schools (online student application portal).',
        'Designed maintainable project architectures combining Angular with SCSS, Bootstrap and PrimeNG, and implemented responsive layouts with smooth CSS animations.',
        'Implemented authentication and role-based permission systems, TinyMCE editor and QR-code scanning integrations, applied SEO and lazy-loading best practices, and handled deployment via cPanel.'
      ]
    },
    {
      id: 'freelance',
      company: 'Freelance',
      period: '02/2024 – 02/2025',
      location: 'USA & Egypt clients',
      tag: 'Freelance',
      role: 'Frontend Angular Developer | Part Time, Remote',
      subtitle: 'Global clients across social impact & e-commerce',
      bullets: [
        'Arise Organization — USA (09/2024 – 02/2025): global social platform empowering people with disabilities and their families. Built the admin dashboard around user-engagement metrics and data visualisation, together with the public-facing website.',
        "E-commerce storefronts: Let's Cookies (10/2024 – 11/2024) and Sham-Pistachio (02/2024 – 04/2024) — responsive Angular stores presenting product catalogues, menus and offers with multi-language support and contact/ordering channels."
      ]
    }
  ],
  skillGroups: [
    {
      id: 'core',
      title: 'Core',
      items: ['Angular (v16 → v21)', 'TypeScript', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'SCSS', 'RxJS']
    },
    {
      id: 'angular',
      title: 'Angular Expertise',
      items: [
        'Standalone components',
        'Signals & computed state',
        'OnPush change detection',
        'Reactive Forms',
        'Route Guards',
        'HTTP Interceptors',
        'Lazy loading',
        'SSR & prerendering',
        'Custom directives & pipes'
      ]
    },
    {
      id: 'architecture',
      title: 'Architecture',
      items: [
        'Micro-frontend architecture',
        'Nx monorepo',
        'Shared UI component libraries',
        'RESTful API integration',
        'Responsive web design',
        'Performance optimisation',
        'SEO'
      ]
    },
    {
      id: 'ui',
      title: 'UI & Libraries',
      items: ['PrimeNG', 'Bootstrap', 'ngx-echarts', 'ngx-translate (AR/EN, RTL)', 'Keen-Slider', 'CSS animations']
    },
    {
      id: 'integrations',
      title: 'Integrations',
      items: [
        'Stripe (ngx-stripe)',
        'Firebase',
        'Alpaca brokerage API',
        'TinyMCE',
        'QR-code scanning',
        'PayPal',
        'Google Analytics',
        'EmailJS'
      ]
    },
    {
      id: 'tooling',
      title: 'Tooling',
      items: ['Git', 'GitHub', 'Bitbucket', 'Figma', 'Jira', 'Monday', 'Agile/Scrum', 'cPanel']
    },
    {
      id: 'ai',
      title: 'AI-Assisted Development',
      items: ['Claude Code', 'Cursor', 'GitHub Copilot', 'Refactoring', 'Test scaffolding', 'Code review']
    },
    {
      id: 'soft',
      title: 'Soft Skills',
      items: [
        'End-to-end ownership',
        'Problem solving',
        'Self-learning',
        'Research',
        'Teamwork',
        'Cross-functional collaboration'
      ]
    }
  ],
  projectItems: [
    {
      id: 'belvro',
      name: 'Belvro Wealth',
      org: 'Expand360 · Full-time',
      category: 'FinTech · Managed portfolio investing (US market)',
      year: '2026',
      desc: 'Sole frontend developer across three apps: client dashboard, admin console and SSR marketing site. Risk-based portfolio assessment, allocation and performance dashboards, multi-step trading-account onboarding on the Alpaca brokerage API, wallet & transactions, KYC review, fee management, roles & permissions and audit logging.',
      metrics: [
        { label: 'Screens', value: '~100' },
        { label: 'Components', value: '130+' },
        { label: 'Shared UI lib', value: '19' }
      ],
      stack: ['Angular 21', 'Signals', 'Stripe', 'Alpaca API', 'Firebase', 'SSR'],
      filterTags: ['Platforms', 'FinTech', 'Company']
    },
    {
      id: 'comply360',
      name: 'Comply360',
      org: 'Expand360 · Full-time',
      category: 'RegTech · Global compliance platform',
      year: '2026',
      desc: 'Owned the marketing website end to end and delivered client and admin modules for a compliance platform spanning 20+ regulatory frameworks (SOC 2, ISO 27001, HIPAA, NIST, GDPR) across 20+ markets — jurisdiction roadmaps, automated tax compliance and risk-scoring dashboards.',
      metrics: [
        { label: 'Frameworks', value: '20+' },
        { label: 'Markets', value: '20+' }
      ],
      stack: ['Angular 21', 'Nx', 'SSR/SEO', 'ngx-translate'],
      filterTags: ['Platforms', 'Company']
    },
    {
      id: 'signals360',
      name: 'Signals360',
      org: 'Expand360 · Full-time',
      category: 'Economic intelligence on Egypt',
      year: '2026',
      desc: 'Owned the marketing website and built client/admin data views — macro indicators (GDP, FDI, inflation, unemployment) plus sector and regional breakdowns, visualised with ngx-echarts.',
      metrics: [{ label: 'Indicators', value: 'GDP · FDI · CPI' }],
      stack: ['Angular 21', 'ngx-echarts', 'RTL i18n'],
      filterTags: ['Platforms', 'Company']
    },
    {
      id: 'caretalk',
      name: 'CareTalk',
      org: 'Majisa Egypt · Full-time',
      category: 'HealthTech · Telehealth scheduling',
      year: '2025',
      desc: 'Patient booking and video-consultation joining flows, paired with a doctor-facing CRM to review, confirm, reschedule and follow up on appointments. Delivered as an outsourcing engagement for Majisa Egypt.',
      stack: ['Angular', 'Reactive Forms', 'REST APIs'],
      filterTags: ['Company']
    },
    {
      id: 'cherrypick',
      name: 'CherryPick',
      org: 'Majisa Egypt · Full-time',
      category: 'PropTech · Real estate management',
      year: '2025',
      desc: 'Property operations streamlined end to end — listings, unit and inventory management and sales workflows — in a responsive, component-driven Angular UI. Built in-house at Majisa Egypt.',
      stack: ['Angular', 'RBAC', 'CRUD'],
      filterTags: ['Company']
    },
    {
      id: 'kgroup',
      name: 'K-Group',
      org: 'Uktra Digital Solutions · Full-time',
      category: 'Corporate · Multi-brand website',
      year: '2024',
      desc: 'Multi-brand corporate site for Prentex and Origin, with a maintainable Angular + SCSS architecture and smooth CSS animations.',
      stack: ['Angular', 'SCSS', 'Bootstrap'],
      filterTags: ['Company']
    },
    {
      id: 'prints-elegant',
      name: 'Prints & Elegant',
      org: 'Uktra Digital Solutions · Full-time',
      category: 'E-commerce · Custom design orders',
      year: '2024',
      desc: 'Storefront with custom design ordering, user accounts and cart, built on reusable Angular components with role-based access.',
      stack: ['Angular', 'PrimeNG', 'REST APIs'],
      filterTags: ['Company']
    },
    {
      id: 'deoss',
      name: 'Deoss Congress',
      org: 'Uktra Digital Solutions · Full-time',
      category: 'Corporate · International symposium',
      year: '2023',
      desc: 'Website for an international ophthalmology symposium, with programme content managed through TinyMCE and QR-code scanning for attendees.',
      stack: ['Angular', 'TinyMCE', 'QR scanning'],
      filterTags: ['Company']
    },
    {
      id: 'fanarah',
      name: 'Fanarah Schools',
      org: 'Uktra Digital Solutions · Full-time',
      category: 'Corporate · Student application portal',
      year: '2023',
      desc: 'Online student application portal with authentication, role-based permissions and multi-step reactive forms.',
      stack: ['Angular', 'Reactive Forms', 'Auth'],
      filterTags: ['Company']
    },
    {
      id: 'hani-polymers',
      name: 'Hani George & Polymers',
      org: 'Uktra Digital Solutions · Full-time',
      category: 'Corporate · Agency clients',
      year: '2023',
      desc: 'Two corporate websites delivered for agency clients, with responsive layouts, SEO and lazy-loading best practices, deployed via cPanel.',
      stack: ['Angular', 'SCSS', 'SEO'],
      filterTags: ['Company']
    },
    {
      id: 'arise',
      name: 'Arise Organization',
      org: 'Freelance · Part-time, USA',
      category: 'Social platform · USA',
      year: '2024',
      desc: 'Global social platform empowering people with disabilities and their families. Built the admin dashboard around user-engagement metrics and data visualisation, plus the public-facing website.',
      stack: ['Angular', 'Charts', 'Admin dashboard'],
      filterTags: ['Freelance']
    },
    {
      id: 'lets-cookies',
      name: "Let's Cookies",
      org: 'Freelance · Part-time',
      category: 'E-commerce · Storefront',
      year: '2024',
      desc: 'Responsive Angular store presenting the product catalogue, menus and offers, with multi-language support and direct ordering channels.',
      stack: ['Angular', 'i18n', 'Responsive UI'],
      filterTags: ['Freelance']
    },
    {
      id: 'sham-pistachio',
      name: 'Sham-Pistachio',
      org: 'Freelance · Part-time',
      category: 'E-commerce · Storefront',
      year: '2024',
      desc: 'Multi-language storefront presenting products and offers, with contact and ordering channels wired in.',
      stack: ['Angular', 'i18n', 'EmailJS'],
      filterTags: ['Freelance']
    },
    {
      id: 'noon',
      name: 'Noon Clone',
      org: 'Personal · ITI graduation project',
      category: 'ITI Angular graduation project',
      year: '2023',
      desc: 'E-commerce platform built with Angular and RESTful APIs, with PayPal integration, reactive forms and lazy loading.',
      stack: ['Angular', 'PayPal', 'Lazy loading'],
      filterTags: ['Personal']
    },
    {
      id: 'portfolio',
      name: 'Personal Portfolio',
      org: 'Personal',
      category: 'Personal project',
      year: '2024',
      desc: 'Angular site with dark mode, multi-language support, an EmailJS contact form and Google Analytics.',
      stack: ['Angular', 'EmailJS', 'i18n', 'Google Analytics'],
      filterTags: ['Personal']
    }
  ],
  educationItems: [
    {
      program: 'Full Stack Web Development (.NET & Angular)',
      school: 'Information Technology Institute (ITI)',
      period: '12/2022 – 04/2023',
      detail: 'Angular, TypeScript, HTML/CSS, Bootstrap, ASP.NET, SQL Server'
    },
    {
      program: 'Software Engineering Fundamentals',
      school: 'Information Technology Institute (ITI)',
      period: '07/2022 – 12/2022',
      detail: 'C/C++, data structures, algorithms and web development fundamentals'
    },
    {
      program: 'Computer Information System',
      school: 'Cairo University',
      period: '09/2018 – 06/2022',
      detail: "Bachelor's degree"
    }
  ],
  certItems: [
    {
      name: 'C# Programming Language (Console, WinForms, OOP)',
      issuer: 'SIMPLIFE',
      date: '01/2021'
    },
    {
      name: 'Database Training (SQL Server, Microsoft Access)',
      issuer: 'SIMPLIFE',
      date: '01/2021'
    }
  ],
  languageItems: [
    { name: 'Arabic', level: 'Native', value: 100 },
    { name: 'English', level: 'Conversational, fluent in technical reading & writing', value: 75 }
  ]
};

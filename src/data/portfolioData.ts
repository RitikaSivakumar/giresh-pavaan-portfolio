import { Project, EducationItem, SkillCategory, GalleryPhoto, AchievementCertificate } from '../types/index.ts';

export const PRIMARY_PROFILE_PHOTO = '/images/giresh-hero-checkered.jpeg';

export const PERSONAL_INFO = {
  fullName: 'GIRESH PAVAAN S K',
  shortName: 'Giresh Pavaan',
  title: 'Mechanical Engineering Student',
  institution: 'Dr. Mahalingam College of Engineering and Technology, Pollachi',
  degree: 'B.E. Mechanical Engineering',
  batch: '2025–2029',
  graduationYear: '2029',
  email: 'gireshpavaansk@gmail.com',
  phone: '+91 8344581524',
  location: 'Pollachi, Coimbatore, Tamil Nadu, India',
  postalCode: '642003',
  address: 'Pollachi, Coimbatore, Tamil Nadu, India',
  linkedinUrl: 'https://www.linkedin.com/in/giresh-pavaan-38b58a235?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
  profilePhoto: PRIMARY_PROFILE_PHOTO,
  headline: 'DESIGNING IDEAS. UNDERSTANDING MACHINES. BUILDING THE FUTURE.',
  careerObjective:
    'Mechanical Engineering student interested in mechanical design, manufacturing, CAD modelling, and automotive systems. Eager to strengthen engineering fundamentals and apply practical problem-solving skills through hands-on learning.',
  supportingDescription:
    'Mechanical Engineering student interested in mechanical design, manufacturing, CAD modelling, and automotive systems. Eager to strengthen engineering fundamentals and apply practical problem-solving skills through hands-on learning.',
  highlights: ['MECHANICAL DESIGN', 'MANUFACTURING PROCESSES', 'AUTOMOTIVE SYSTEMS', 'ENGINEERING DRAWING'],
  languages: ['Tamil (Native)', 'English (Professional)', 'Hindi (Conversational)'],
};


export const ABOUT_CONTENT = {
  label: '01 / ABOUT ME',
  heading: 'THE MIND BEHIND THE MACHINE.',
  careerObjective:
    'Mechanical Engineering student interested in mechanical design, manufacturing, CAD modelling, and automotive systems. Eager to strengthen engineering fundamentals and apply practical problem-solving skills through hands-on learning.',
  description:
    'Mechanical Engineering student interested in mechanical design, manufacturing, CAD modelling, and automotive systems. Eager to strengthen engineering fundamentals and apply practical problem-solving skills through hands-on learning.',
  highlights: [
    {
      title: 'MECHANICAL DESIGN',
      description: 'Understanding components, dimensions, and design principles.',
      detail: 'Orthographic projections, parametric CAD modeling, and geometric tolerances.',
    },
    {
      title: 'MANUFACTURING PROCESSES',
      description: 'Exploring processes, materials, and production methods.',
      detail: 'Machining operations, casting, metal forming, and workshop metrology.',
    },
    {
      title: 'AUTOMOTIVE SYSTEMS',
      description: 'Learning about vehicle components and mechanical systems.',
      detail: 'Chassis suspension dynamics, powertrain mechanics, and braking dissipation.',
    },
    {
      title: 'ENGINEERING DRAWING',
      description: 'Precision technical drafting, multi-view projections, and engineering drawings.',
      detail: 'Orthographic projections, sectional drafting, dimensioning standards, and CAD layouts.',
    },
  ],
};

export const PROJECTS_DATA: Project[] = [
  {
    id: 'proj-01',
    projectNumber: '01',
    category: 'MECHANICAL DESIGN',
    title: 'CAD COMPONENT MODELLING',
    shortDescription:
      'Explore a mechanical component using AutoCAD or SolidWorks, focusing on geometry, dimensions, and engineering drawings.',
    fullDescription:
      'A structured design study to model a functional mechanical component—such as an industrial support bracket or flange—translating engineering specifications into fully constrained 3D solid geometry and standard ISO/ANSI 2D projections.',
    objectives: [
      'Create fully constrained parametric sketches in SolidWorks and AutoCAD.',
      'Apply standard chamfers, fillets, and draft angles for manufacturing feasibility.',
      'Produce orthographic multi-view drafting sheets with sectional details and tolerancing.',
    ],
    toolsPlanned: ['SolidWorks', 'AutoCAD', 'ISO Drafting Standards'],
    cadConsiderations: [
      'Tolerancing stack-up and fit allowances',
      'Fillet radii to mitigate stress concentrations',
      'Neutral datum planes for CNC reference',
    ],
    learningOutcomes: [
      'Mastery of parametric sketch constraints',
      'Understanding GD&T (Geometric Dimensioning & Tolerancing)',
      'STEP/IGES standard format conversion for manufacturing',
    ],
    status: 'PROJECT IDEA',
  },
  {
    id: 'proj-02',
    projectNumber: '02',
    category: 'ENGINEERING FUNDAMENTALS',
    title: 'MECHANICAL SYSTEM STUDY',
    shortDescription:
      'Investigate a basic mechanical system, identify its components, and explain its operating principles.',
    fullDescription:
      'A rigorous analytical investigation into a classical gear-train or linkage transmission (such as compound spur gear reduction or slider-crank mechanisms) assessing mechanical advantage, speed ratios, torque multiplication, and frictional losses.',
    objectives: [
      'Map kinematics and velocity ratios across power transmission stages.',
      'Analyze load paths, reaction forces, and shaft bearing mount points.',
      'Study material wear characteristics and lubrication requirements.',
    ],
    toolsPlanned: ['AutoCAD', 'Microsoft Excel', 'Mechanics Handbooks'],
    cadConsiderations: [
      'Center-to-center shaft tolerances',
      'Backlash allowance and pitch circle alignment',
      'Shaft keyway structural dimensions',
    ],
    learningOutcomes: [
      'Grasp of torque vs. rotational speed trade-offs',
      'Identification of mechanical failure points',
      'Creation of comprehensive technical schematics',
    ],
    status: 'PROJECT IDEA',
  },
  {
    id: 'proj-03',
    projectNumber: '03',
    category: 'AUTOMOTIVE SYSTEMS',
    title: 'AUTOMOTIVE SYSTEM EXPLORATION',
    shortDescription:
      'Explore an automotive subsystem, its mechanical components, and its engineering principles.',
    fullDescription:
      'A focused exploration of an automotive ventilated disc brake and caliper subsystem—examining kinetic-to-thermal energy transformation, hydraulic master cylinder pressure distribution, rotor cooling vane airflow, and structural clamp rigidity.',
    objectives: [
      'Analyze thermal dissipation across ventilated rotor internal cooling channels.',
      'Study hydraulic force amplification from brake pedal to multi-piston calipers.',
      'Evaluate material thermal fatigue resistance under cyclical deceleration loads.',
    ],
    toolsPlanned: ['SolidWorks', 'AutoCAD', 'Automotive Reference Guides'],
    cadConsiderations: [
      'Rotor ventilation vane curvature and airflow optimization',
      'Caliper mounting bracket stiffness under severe braking torque',
      'Wheel hub 5-bolt pattern PCD clearance',
    ],
    learningOutcomes: [
      'Understanding transport deceleration dynamics and safety margins',
      'Insights into friction compounds and rotor heat dispersion',
      'Appreciation for rigorous vehicular safety factors',
    ],
    status: 'PROJECT IDEA',
  },
  {
    id: 'proj-04',
    projectNumber: '04',
    category: 'MANUFACTURING',
    title: 'MANUFACTURING PROCESS STUDY',
    shortDescription:
      'Explore manufacturing methods and how precision affects mechanical component production.',
    fullDescription:
      'An investigative study into primary manufacturing processes—contrasting CNC milling, turning, metal casting, and forming techniques to understand surface finish, dimensional tolerances, material yield, and batch cycle times.',
    objectives: [
      'Analyze machining parameters (cutting speed, feed rate, depth of cut) on surface roughness.',
      'Compare sand casting vs. die casting economics and structural integrity for batch manufacturing.',
      'Document precision metrology techniques using vernier calipers, micrometers, and dial indicators.',
    ],
    toolsPlanned: ['Workshop Metrology Tools', 'Process Flowcharts', 'MS Excel'],
    cadConsiderations: [
      'Tool access clearances for end-milling cutters',
      'Clamping orientations and datum reference planes for machining fixtures',
      'Standardized stock dimension utilization',
    ],
    learningOutcomes: [
      'Understanding Design for Manufacturability (DFM) rules',
      'Accurate dimensional inspection and tolerance verification',
      'Evaluating production trade-offs between speed, cost, and precision',
    ],
    status: 'PROJECT IDEA',
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'technical',
    title: 'TECHNICAL SKILLS',
    subtitle: 'CAD, Prototyping & Product Development',
    skills: [
      { name: 'AutoCAD (Fusion360)', focusArea: '2D drafting, computer-aided design & modeling with Fusion 360' },
      { name: 'SolidWorks (Beginner)', level: 'Beginner', focusArea: 'Fundamental 3D feature modeling, sketch constraints & basic mechanical parts' },
      { name: 'Power Tools Handling', focusArea: 'Workshop machinery, drill press, cutting, angle grinding & lab safety protocols' },
      { name: 'Product Development', focusArea: 'Conceptualization, functional design workflow & design-for-manufacturing principles' },
      { name: 'Marketing Skills', focusArea: 'Technical presentations, event outreach, project communication & symposium engagement' },
      { name: 'Prototyping', focusArea: 'Physical model fabrication, rapid iterations & practical build exploration' },
      { name: 'Root-Cause Analysis', focusArea: 'Systematic troubleshooting, defect identification & diagnostic breakdown' },
      { name: '3D Modelling', focusArea: 'Parametric geometry creation, solid modeling & spatial layout' },
    ],
  },
  {
    id: 'professional',
    title: 'PROFESSIONAL SKILLS',
    subtitle: 'Execution, Analysis & Collaboration',
    skills: [
      { name: 'Problem-Solving', focusArea: 'Methodical analytical breakdown of engineering challenges' },
      { name: 'Teamwork', focusArea: 'Collaborative laboratory, symposium & group academic coursework' },
      { name: 'Communication', focusArea: 'Clear technical articulation of ideas and drawings' },
      { name: 'Time Management', focusArea: 'Balancing rigorous engineering coursework and technical exploration' },
      { name: 'Critical Thinking', focusArea: 'Objective evaluation of design trade-offs, constraints & engineering logic' },
    ],
  },
  {
    id: 'interests',
    title: 'SPORTS AND INTERESTS',
    subtitle: 'Physical Discipline & Kinetic Stamina',
    skills: [
      { name: 'Basketball', focusArea: 'Team coordination, high-energy endurance, tactical positioning & agility' },
      { name: 'Cycling', focusArea: 'Endurance pacing, frame mechanics, gear ratio maintenance & stamina' },
    ],
  },
];

export const ACHIEVEMENTS_DATA: AchievementCertificate[] = [
  {
    id: 'cert-01',
    number: '01',
    title: 'YUVA TECHFEST ’25',
    event: 'National Level Technical Symposium',
    organizer: 'KPRIET',
    date: '27 September 2025',
    category: 'SYMPOSIUM & WORKSHOP',
    badge: 'NATIONAL LEVEL',
    imageSrc: '/images/certificates/cert-01-yuva-techfest-2025.jpeg',
    description: 'Paper Presentation and Workshop at a National Level Technical Symposium, KPRIET.',
    isFirstPlace: false,
  },
  {
    id: 'cert-02',
    number: '02',
    title: 'AutoGen Workshop',
    event: 'AutoGen Technical Workshop',
    organizer: 'PSG Institute of Technology and Applied Research',
    date: '21 February 2026',
    category: 'TECHNICAL WORKSHOP',
    badge: 'PSG iTech',
    imageSrc: '/images/certificates/cert-02-autogen-workshop-2026.jpeg',
    description: 'Participated in the workshop at PSG Institute of Technology and Applied Research.',
    isFirstPlace: false,
  },
  {
    id: 'cert-03',
    number: '03',
    title: 'ZeAI Soft Made in India Hackathon 2026',
    event: 'Phase 1 Online Evaluation Round',
    organizer: 'Team Exotic / ZeAI Soft',
    date: '14 August 2026',
    category: 'INNOVATION HACKATHON',
    badge: 'BRONZE INNOVATOR',
    imageSrc: '/images/certificates/cert-03-zeai-hackathon-2026.jpeg',
    description: 'Phase 1 Online Evaluation Round; Team Exotic; certificate recognizes Bronze Innovator participation. Issued: 14 August 2026.',
    isFirstPlace: false,
  },
  {
    id: 'cert-04',
    number: '04',
    title: 'Science Day 2026 – Science Exhibition and Project Competition',
    event: 'Science Exhibition and Project Competition',
    organizer: 'Dr. Mahalingam College of Engineering and Technology',
    date: '28 February 2026',
    category: 'EXHIBITION & COMPETITION',
    badge: 'FIRST PRIZE (WON I)',
    imageSrc: '/images/certificates/cert-04-science-day-2026.jpeg',
    description: 'Science Exhibition and Project Competition at Dr. Mahalingam College of Engineering and Technology.',
    isFirstPlace: true,
  },
  {
    id: 'cert-05',
    number: '05',
    title: '3D Printing – Print Your Future',
    event: 'Two-day hands-on workshop',
    organizer: 'Dr. Mahalingam College of Engineering and Technology',
    date: '10–11 November 2025',
    category: 'HANDS-ON WORKSHOP',
    badge: '3D PRINTING WORKSHOP',
    imageSrc: '/images/certificates/cert-05-3d-printing-workshop-2025.jpeg',
    description: 'Two-day hands-on workshop at Dr. Mahalingam College of Engineering and Technology.',
    isFirstPlace: false,
  },
  {
    id: 'cert-06',
    number: '06',
    title: 'Domain-Specific Paper Presentation',
    event: 'Student Research Council technical symposium',
    organizer: 'MCET',
    date: '16–18 March 2026',
    category: 'RESEARCH SYMPOSIUM',
    badge: 'SECOND PRIZE (WON II)',
    imageSrc: '/images/certificates/cert-06-technofete-paper-presentation-2026.jpeg',
    description: 'Student Research Council technical symposium at MCET.',
    isFirstPlace: false,
  },
  {
    id: 'cert-07',
    number: '07',
    title: 'Studio Automation Workshop',
    event: 'One-day hands-on workshop',
    organizer: 'Janatics India Pvt. Ltd. at MCET',
    date: '17 September 2026',
    category: 'INDUSTRIAL AUTOMATION',
    badge: 'JANATICS INDIA PVT. LTD.',
    imageSrc: '/images/certificates/cert-07-studio-automation-janatics-2026.jpeg',
    description: 'One-day hands-on workshop organized with Janatics India Pvt. Ltd. at MCET.',
    isFirstPlace: false,
  },
];

export const EDUCATION_JOURNEY: EducationItem[] = [
  {
    period: '2022–2023',
    degree: 'SSLC',
    institution: 'Viswadeepthi Matric School',
    description:
      'Secondary School Leaving Certificate (SSLC) foundational curriculum.',
    type: 'SSLC',
  },
  {
    period: '2024–2025',
    degree: 'HSC',
    institution: 'Viswadeepthi Matric School',
    description:
      'Higher Secondary Certificate (HSC) academic curriculum with concentration on Physics, Chemistry, and Mathematics.',
    type: 'HSC',
  },
  {
    period: '2025–2029',
    degree: 'B.E. Mechanical Engineering',
    institution: 'Dr. Mahalingam College of Engineering and Technology, Pollachi',
    description:
      'Mechanical Engineering student interested in mechanical design, manufacturing, CAD modelling, and automotive systems.',
    type: 'Degree',
  },
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'photo-community-awards',
    src: '/images/gallery/community-awards.jpeg',
    filename: 'WhatsApp Image 2026-10-26 at 9.45.37 PM.jpeg',
    title: 'Award Presentation',
    subtitle: 'Giresh Pavaan S K',
    description: 'Group photograph after an award presentation.',
    tag: '01',
    isPrimary: true,
  },
  {
    id: 'photo-project-demonstration',
    src: '/images/gallery/project-demonstration.jpeg',
    filename: 'WhatsApp Image 2026-10-26 at 9.47.31 PM (1).jpeg',
    title: 'Project Demonstration',
    subtitle: 'Giresh Pavaan S K',
    description: 'Students presenting a project to visitors.',
    tag: '02',
    isPrimary: false,
  },
  {
    id: 'photo-science-day-award',
    src: '/images/gallery/science-day-award.jpeg',
    filename: 'WhatsApp Image 2026-10-26 at 9.47.31 PM (2).jpeg',
    title: 'Science Day Award',
    subtitle: 'Giresh Pavaan S K',
    description: 'Award presentation at the college Science Day exhibition.',
    tag: '03',
    isPrimary: false,
  },
  {
    id: 'photo-workshop-project',
    src: '/images/gallery/workshop-project.jpeg',
    filename: 'WhatsApp Image 2026-10-26 at 9.47.31 PM.jpeg',
    title: 'Workshop Project',
    subtitle: 'Giresh Pavaan S K',
    description: 'Hands-on work at a project display.',
    tag: '04',
    isPrimary: false,
  },
  {
    id: 'photo-media-interview',
    src: '/images/gallery/media-interview.jpeg',
    filename: 'WhatsApp Image 2026-10-26 at 10.17.30 PM (1).jpeg',
    title: 'Media Interview',
    subtitle: 'Giresh Pavaan S K',
    description: 'Speaking with media during an event.',
    tag: '05',
    isPrimary: false,
  },
];


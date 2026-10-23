import { Project, EducationItem, SkillCategory, GalleryPhoto } from '../types/index.ts';

export const PRIMARY_PROFILE_PHOTO = '/images/giresh-hero-checkered.jpeg';

export const PERSONAL_INFO = {
  fullName: 'Giresh Pavaan S K',
  shortName: 'Giresh Pavaan',
  title: 'Mechanical Engineering Student',
  institution: 'Dr. Mahalingam College of Engineering, Pollachi',
  degree: 'B.E. Mechanical Engineering',
  batch: '2025–2029',
  graduationYear: '2029',
  email: 'gireshpavaansk@gmail.com',
  phone: '+91 8344581524',
  location: 'Pollachi, Coimbatore, Tamil Nadu, India',
  postalCode: '642003',
  address: '188, Rajpavaan illam, Pollachi, Coimbatore, Tamil Nadu-642003',
  linkedinUrl: 'https://linkedin.com/in/giresh-pavaan-38b58a235/',
  profilePhoto: PRIMARY_PROFILE_PHOTO,
  headline: 'DESIGNING IDEAS. UNDERSTANDING MACHINES. BUILDING THE FUTURE.',
  supportingDescription:
    'An aspiring mechanical engineer exploring mechanical design, manufacturing, CAD modelling, and automotive systems. Focused on developing strong engineering fundamentals and learning through practical exploration.',
  highlights: ['MECHANICAL DESIGN', 'MANUFACTURING', 'AUTOMOTIVE SYSTEMS'],
  languages: ['Tamil (Native)', 'English (Professional)', 'Hindi (Conversational)'],
};


export const ABOUT_CONTENT = {
  label: '01 / ABOUT ME',
  heading: 'THE MIND BEHIND THE MACHINE.',
  description:
    'I am a second-year Mechanical Engineering student at Dr. Mahalingam College of Engineering, Pollachi. I am interested in understanding how machines work, how products are designed, and how engineering principles translate into practical solutions. I aim to strengthen my technical foundation through continuous learning and hands-on exploration.',
  highlights: [
    {
      title: 'MECHANICAL DESIGN',
      description: 'Understanding components, dimensions, and design principles.',
      detail: 'Orthographic projections, parametric CAD modeling, and geometric tolerances.',
    },
    {
      title: 'MANUFACTURING',
      description: 'Exploring processes, materials, and production methods.',
      detail: 'Machining operations, casting, metal forming, and workshop metrology.',
    },
    {
      title: 'AUTOMOTIVE SYSTEMS',
      description: 'Learning about vehicle components and mechanical systems.',
      detail: 'Chassis suspension dynamics, powertrain mechanics, and braking dissipation.',
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
    id: 'software',
    title: 'Category 1 — SOFTWARE SKILLS',
    subtitle: 'CAD & Computational Tools',
    skills: [
      { name: 'AutoCAD', level: 'Basic', focusArea: '2D drafting, projections, dimensioning' },
      { name: 'SolidWorks', level: 'Beginner', focusArea: '3D feature modeling, sketch constraints, basic parts' },
      { name: 'Microsoft Excel', focusArea: 'Data tabulation, engineering formulas, chart analysis' },
      { name: 'Microsoft PowerPoint', focusArea: 'Technical presentations, project documentation' },
    ],
  },
  {
    id: 'fundamentals',
    title: 'Category 2 — ENGINEERING FUNDAMENTALS',
    subtitle: 'Core Sciences & Mechanics',
    skills: [
      { name: 'Engineering Drawing', focusArea: 'Orthographic projections, sectional views, isometric views' },
      { name: 'Basic Thermodynamics', focusArea: 'Laws of thermodynamics, heat, work, energy conservation' },
      { name: 'Manufacturing Processes', focusArea: 'Foundry, forming, conventional machining, joining' },
    ],
  },
  {
    id: 'professional',
    title: 'Category 3 — PROFESSIONAL SKILLS',
    subtitle: 'Execution & Collaboration',
    skills: [
      { name: 'Teamwork', focusArea: 'Collaborative laboratory and group academic coursework' },
      { name: 'Communication', focusArea: 'Clear technical articulation of ideas and drawings' },
      { name: 'Problem Solving', focusArea: 'Methodical analytical breakdown of engineering challenges' },
      { name: 'Time Management', focusArea: 'Balancing rigorous engineering coursework and technical exploration' },
    ],
  },
];

export const EDUCATION_JOURNEY: EducationItem[] = [
  {
    period: '2022–2023',
    degree: 'Secondary School Leaving Certificate (SSLC)',
    institution: 'Viswadeepthi Matric School, Pollachi',
    description:
      'Foundational secondary education establishing strong analytical and scientific reasoning skills.',
    type: 'SSLC',
  },
  {
    period: '2024–2025',
    degree: 'Higher Secondary Certificate (HSC)',
    institution: 'Viswadeepthi Matric School, Pollachi',
    description:
      'Completed higher secondary academic curriculum with concentration on Physics, Chemistry, and Mathematics.',
    type: 'HSC',
  },
  {
    period: '2025–2029',
    degree: 'B.E. Mechanical Engineering',
    institution: 'Dr. Mahalingam College of Engineering, Pollachi',
    description:
      'Building foundational knowledge in mechanical engineering, engineering drawing, design principles, and manufacturing.',
    type: 'Degree',
  },
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'photo-hero',
    src: '/images/giresh-hero-checkered.jpeg',
    title: 'The Mechanical Mind',
    subtitle: 'Outdoor Portrait · Primary Profile',
    description:
      'Captured in a natural outdoor setting wearing a checkered shirt against lush greenery. Embodying composure, natural focus, and curiosity for real-world mechanical systems.',
    tag: 'PRIMARY PORTRAIT',
    location: 'Campus Courtyard',
    isPrimary: true,
  },
  {
    id: 'photo-blazer',
    src: '/images/giresh-executive-blazer.jpeg',
    title: 'Executive Trajectory',
    subtitle: 'Full-Length Architectural Avenue',
    description:
      'Formal blazer attire on an open tree-lined avenue, symbolizing professionalism, readiness for industry internships, and leadership in engineering.',
    tag: 'EXECUTIVE',
    location: 'Avenue Walkway',
    isPrimary: false,
  },
  {
    id: 'photo-perspective',
    src: '/images/giresh-perspective-balcony.jpeg',
    title: 'Observational Perspective',
    subtitle: 'Structural Balcony Vignette',
    description:
      'A thoughtful study in natural daylight, observing structural geometry, materials, and spatial design from an elevated perspective.',
    tag: 'PERSPECTIVE',
    location: 'Structural Overlook',
    isPrimary: false,
  },
  {
    id: 'photo-waterfront',
    src: '/images/giresh-waterfront-dialogue.jpeg',
    title: 'Waterfront Dialogue',
    subtitle: 'Riverside Veranda',
    description:
      'Relaxed conversation overlooking open waters, reflecting balance between rigorous mathematical study and steady life perspective.',
    tag: 'LIFESTYLE',
    location: 'Riverside Veranda',
    isPrimary: false,
  },
  {
    id: 'photo-studio',
    src: '/images/giresh-studio-headshot.jpeg',
    title: 'Direct Analytical Clarity',
    subtitle: 'Close-Up Academic Headshot',
    description:
      'A clean, direct portrait highlighting approachable warmth, optimism, and steadfast focus on foundational sciences.',
    tag: 'STUDIO HEADSHOT',
    location: 'Studio Session',
    isPrimary: false,
  },
];


// src/data/resume.ts

export const personal = {
  name: "Madhavan R Mohan",
  summary:
    "Final Year Student with 1+ years of experience, seeking full-time roles.",
  location: "Chennai, India",
  phone: "+91 948 745 1421",
  links: {
    email: "maddyrm.mrm@gmail.com",
    linkedin: "https://www.linkedin.com/in/madhavanrm",
  },
};

export const education = [
  {
    degree: "B.S. Data Science and Applications",
    institution: "Indian Institute of Technology, Madras",
    period: "Sep 2022 – Sep 2026",
    status: "Expected",
  },
  {
    degree: "B.Sc. Mathematics",
    institution: "Presidency College, Chennai",
    period: "Aug 2022 – May 2025",
    status: "Completed",
  },
];

export const skills = {
  Languages: ["Python", "SQL", "JavaScript", "HTML/CSS"],
  "AI/ML & Data Science": [
    "Machine Learning",
    "Computer Vision",
    "Generative AI",
    "Predictive Modeling",
  ],
  "Libraries & Frameworks": [
    "Scikit-Learn",
    "Pandas",
    "NumPy",
    "Matplotlib",
    "Seaborn",
    "VueJS",
  ],
};

export const experience = [
  {
    title: "Data Scientist",
    company: "HighOnSwift",
    location: "Chennai, India",
    period: "Feb 2025 – Present",
    current: true,
    highlights: [
      {
        tag: "Voice AI",
        description:
          "Architected AI-driven voice agents and app builders using STT, LLM and TTS APIs, automating customer interactions.",
      },
      {
        tag: "Computer Vision",
        description:
          "Developed a Store Shelf Product Detection system using YOLO, improving retail inventory tracking accuracy and reducing manual audit errors.",
      },
      {
        tag: "Predictive Modeling",
        description:
          "Engineered predictive models (XGBoost, Random Forest) for Student Churn Prediction and Restaurant Order Forecasting, leading to improvements in retention strategies and optimizing restaurant supply chain efficiency.",
      },
    ],
  },
];

export const projects = [
  {
    title: "Bank Telemarketing Success Predictor",
    stack: ["Python", "Scikit-Learn", "Pandas"],
    period: "Sep 2024 – Dec 2024",
    description:
      "Engineered an end-to-end classification pipeline to predict telemarketing campaign success, achieving 75% accuracy using Random Forest Classifier. Conducted comprehensive EDA and feature engineering on complex datasets, optimizing model performance over Logistic Regression and KNN baselines.",
    metric: { label: "Accuracy", value: "75%" },
    category: "ML",
  },
  {
    title: "Retail Inventory Optimization & Analytics",
    stack: ["MS Excel", "Statistical Analysis"],
    period: "May 2024 – Aug 2024",
    description:
      "Executed advanced data analytics — including ABC, Inventory Turnover, RFM and Market Basket Analysis — to identify purchasing patterns and optimize inventory turnover rates. Formulated data-driven sustainability strategies, modeling reductions in holding costs.",
    metric: { label: "Focus", value: "Supply Chain" },
    category: "Analytics",
  },
  {
    title: "Full-Stack Music Streaming App (v2)",
    stack: ["Python", "VueJS", "SQLite"],
    period: "Jan 2024 – Apr 2024",
    description:
      "Developed a dynamic Single Page Application supporting multi-user authentication and media streaming, serving as sole backend and frontend developer. Designed a normalized SQLite database architecture to efficiently query user preferences, playlists, and song metadata.",
    metric: { label: "Type", value: "Full-Stack SPA" },
    category: "Engineering",
  },
  {
    title: "Music Streaming Application (v1)",
    stack: ["Python", "HTML/Bootstrap", "SQLite"],
    period: "Sep 2023 – Dec 2023",
    description:
      "Built the foundational backend architecture of a music streaming platform using Python, establishing core CRUD functionalities for users and media files. Designed a responsive, mobile-friendly UI using HTML and Bootstrap.",
    metric: { label: "Type", value: "Full-Stack" },
    category: "Engineering",
  },
];

export const stats = [
  { label: "Years Experience", value: 1, suffix: "+" },
  { label: "Projects Shipped", value: 4, suffix: "" },
  { label: "Skills Acquired", value: 10, suffix: "+" },
  { label: "Degrees Pursued", value: 2, suffix: "" },
];
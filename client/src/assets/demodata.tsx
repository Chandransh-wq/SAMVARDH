import { GiAtom, GiDeliveryDrone } from "react-icons/gi";
import { IoCodeSlashOutline } from "react-icons/io5";

const notebookData = [
  {
    id: "765ce56d-ab7b-4caf-bab2-9421d2266853",
    title: "Science & Mathematics",
    icon: <GiAtom />,
    description:
      "A collection of resources covering fundamental concepts in chemistry and physics, designed to strengthen analytical and problem-solving skills.",
    createdAt: "2025-09-05T14:57:00.233356",
    updatedAt: "2025-08-02T14:57:00.233374",
    favorite: true,
    color: "#1b739b",
    subjects: [
      {
        id: "e85df493-8161-4963-bc3f-913d30c74001",
        title: "Chemistry",
        description:
          "In-depth exploration of chemical principles, reactions, and molecular structures.",
        color: "#c43117",
        createdAt: "2025-10-07T12:00:00",
        importance: 2,
        tags: ["Science", "Chemistry"],
        topics: [
          {
            id: "ff04c864-35bf-4537-9db1-06a1e0cf3a16",
            title: "Chemical Reactions",
            color: "#8d0026",
            importance: 4,
            description:
              "Understanding how atoms and molecules interact to form new substances, covering reaction types and balancing equations.",
            dueDate: "2025-09-28T12:00:00",
            content: [
              {
                page: "Page 1",
pageContent: `
## Chemical Reactions
Chemical reactions are processes in which one or more substances (*reactants*) 
are transformed into new substances (**products**) with different chemical properties.  

They involve the **breaking and forming of chemical bonds**, and always obey the 
*Law of Conservation of Mass*. Antoine Lavoisier first demonstrated that 
mass is neither created nor destroyed in chemical reactions.  

**Key points:**
- Atoms are rearranged, not created or destroyed.
- Reactions may involve energy transfer (*exothermic* or *endothermic*).
- Chemical equations represent reactions, with reactants on the left, 
  products on the right, and coefficients ensuring balance.
`,
                createdAt: "2025-09-30T12:00:00",
                editedAt: "2025-09-22T14:00:00",
                tags: ["Basic", "Chemistry", "Reactions"]
              },

              {
                page: "Page 2",
                pageContent:
                  "Examples of synthesis, decomposition, and displacement reactions.",
                createdAt: "2025-09-21T12:00:00",
                editedAt: "2025-09-23T14:00:00",
                tags: ["Chemistry", "Reactions"],
              },
            ],
          },
          {
            id: "26b3601e-d777-4f80-ad8d-aec4b45d3039",
            title: "Atomic Structure & Bonding",
            color: "#ed5460",
            importance: 4,
            description:
              "Exploring atomic models, periodic trends, and chemical bonding, including ionic, covalent, and metallic bonds.",
            dueDate: "2025-09-28T12:00:00",
            content: [
              {
                page: "Page 1",
                pageContent:
                  "Review of Dalton’s, Thomson’s, Rutherford’s, and Bohr’s models.",
                createdAt: "2025-09-22T12:00:00",
                editedAt: "2025-09-24T14:00:00",
                tags: ["Chemistry", "Atoms"],
              },
              {
                page: "Page 2",
                pageContent:
                  "Introduction to electron sharing and transfer in bonds.",
                createdAt: "2025-09-23T12:00:00",
                editedAt: "2025-09-25T14:00:00",
                tags: ["Chemistry", "Bonding"],
              },
            ],
          },
        ],
      },
      {
        id: "ad918363-d929-4a51-a8de-f684b006d052",
        title: "Physics",
        description:
          "Covers laws of motion, energy, and the principles of mechanics and thermodynamics.",
        color: "#83b30f",
        importance: 2,
        createdAt: "2025-10-07T12:00:00",
        tags: ["Physics", "Math"],
        topics: [
          {
            id: "d8e3372f-9c69-4dee-8b63-f5ffe55c4387",
            title: "Laws of Motion",
            color: "#3a9ad9",
            importance: 5,
            description:
              "Newton’s three laws of motion and their mathematical applications in real-life scenarios.",
            dueDate: "2025-10-05T12:00:00",
            content: [
              {
                page: "Page 1",
                pageContent:
                  "Newton’s First Law – the concept of inertia and equilibrium.",
                createdAt: "2025-09-24T12:00:00",
                editedAt: "2025-09-26T14:00:00",
                tags: ["Physics", "Newton"],
              },
              {
                page: "Page 2",
                pageContent:
                  "Newton’s Second and Third Laws with force diagrams.",
                createdAt: "2025-09-25T12:00:00",
                editedAt: "2025-09-27T14:00:00",
                tags: ["Physics", "Forces"],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "8e0171ac-aac1-4b00-9525-c043dbcc46ca",
    title: "Design & History",
    icon: <GiDeliveryDrone />,
    description:
      "Explores design movements, art history, and the intersection of mathematics with physics in creative problem-solving.",
    createdAt: "2025-07-18T14:57:00.234393",
    updatedAt: "2025-08-17T14:57:00.234406",
    favorite: false,
    color: "#f58944",
    subjects: [
      {
        id: "5e963fdb-971e-42f6-b165-c2393a10b597",
        title: "Art & Design History",
        description:
          "Study the evolution of art and design, from classical techniques to modern movements.",
        color: "#6c1996",
        createdAt: "2025-10-07T12:00:00",
        importance: 3,
        tags: ["Design", "History"],
        topics: [
          {
            id: "74d458f3-14bf-4df3-9a25-f1f7e97c32c8",
            title: "Renaissance Art",
            color: "#3a4277",
            importance: 4,
            description:
              "Study of the Renaissance period, highlighting perspective, realism, and notable artists like Leonardo da Vinci.",
            dueDate: "2025-10-07T12:00:00",
            content: [
              {
                page: "Page 1",
                pageContent:
                  "Techniques of linear perspective in Renaissance paintings.",
                createdAt: "2025-09-28T12:00:00",
                editedAt: "2025-09-29T12:00:00",
                tags: ["Art", "Renaissance"],
              },
              {
                page: "Page 2",
                pageContent:
                  "Analysis of works such as The Last Supper and Mona Lisa.",
                createdAt: "2025-09-28T13:00:00",
                editedAt: "2025-09-29T14:00:00",
                tags: ["Art", "Da Vinci"],
              },
            ],
          },
          {
            id: "91a3b0b4-10a2-4e2b-8f60-45c52f0420f1",
            title: "Modernist Movements",
            color: "#e07d5a",
            importance: 2,
            description:
              "Overview of modernist art and design, covering Bauhaus, Cubism, and Futurism.",
            dueDate: "2025-10-06T12:00:00",
            content: [
              {
                page: "Page 1",
                pageContent: "Key principles of Bauhaus design.",
                createdAt: "2025-09-29T12:00:00",
                editedAt: "2025-09-30T12:00:00",
                tags: ["Design", "Bauhaus"],
              },
              {
                page: "Page 2",
                pageContent: "Impact of Cubism on 20th-century art.",
                createdAt: "2025-09-29T13:00:00",
                editedAt: "2025-09-30T13:00:00",
                tags: ["Design", "Cubism"],
              },
            ],
          },
        ],
      },
      {
        id: "f2b13d9f-7c7f-4c1b-8354-2d9fa9c3a4d2",
        title: "Applied Mathematics & Physics",
        description:
          "Applies mathematical methods to solve practical physics problems and understand technological applications.",
        color: "#27b8c5",
        createdAt: "2025-10-05T12:00:00",
        importance: 5,
        tags: ["Math", "Physics"],
        topics: [
          {
            id: "c4b7d61f-6b39-4a54-9b9c-d71a5c9c1a2e",
            title: "Calculus for Physics",
            color: "#9f4dff",
            importance: 3,
            description:
              "Introduction to differential and integral calculus for solving kinematics and dynamics problems.",
            dueDate: "2025-10-11T12:00:00",
            content: [
              {
                page: "Page 1",
                pageContent: "Derivatives applied to velocity and acceleration.",
                createdAt: "2025-09-30T12:00:00",
                editedAt: "2025-10-01T12:00:00",
                tags: ["Math", "Calculus"],
              },
              {
                page: "Page 2",
                pageContent:
                  "Integration techniques for calculating displacement.",
                createdAt: "2025-09-30T13:00:00",
                editedAt: "2025-10-01T13:00:00",
                tags: ["Math", "Integration"],
              },
            ],
          },
          {
            id: "abf4c2e1-8e4a-4d99-9f73-3d4d8a8d5a6c",
            title: "Electromagnetism",
            color: "#ff9e5a",
            importance: 4,
            description:
              "Maxwell’s equations and their applications in modern technology.",
            dueDate: "2025-10-13T12:00:00",
            content: [
              {
                page: "Page 1",
                pageContent:
                  "Fundamentals of electric fields and magnetic flux.",
                createdAt: "2025-10-01T12:00:00",
                editedAt: "2025-10-02T12:00:00",
                tags: ["Physics", "Electrostatics"],
              },
              {
                page: "Page 2",
                pageContent:
                  "Applications in motors, generators, and wireless communication.",
                createdAt: "2025-10-01T13:00:00",
                editedAt: "2025-10-02T13:00:00",
                tags: ["Physics", "Technology"],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "d4f7e8b2-5c2f-4f1d-bc9a-2b6a3e1f0d4e",
    title: "Languages & Programming",
    icon: <IoCodeSlashOutline />,
    description:
      "Combines English literature studies with practical programming skills, bridging humanities and technology.",
    createdAt: "2025-06-12T10:45:00.123456",
    updatedAt: "2025-08-20T12:30:00.654321",
    favorite: false,
    color: "#7fbf4a",
    subjects: [
      {
        id: "a1b2c3d4-5678-4f90-abcd-1234567890ef",
        title: "English Literature",
        description:
          "Analysis of English literary works, exploring themes, styles, and historical context.",
        color: "#f56a6a",
        createdAt: "2025-09-29T12:00:00",
        importance: 5,
        tags: ["Language", "History"],
        topics: [
          {
            id: "111aaa22-bb33-44cc-dd55-666eee777fff",
            title: "Shakespearean Plays",
            color: "#5a9fff",
            importance: 4,
            description:
              "Exploring Shakespeare’s works, themes, and influence on English literature.",
            dueDate: "2025-10-15T12:00:00",
            content: [
              {
                page: "Page 1",
                pageContent: "Analysis of Hamlet’s soliloquies.",
                createdAt: "2025-10-01T12:00:00",
                editedAt: "2025-10-02T12:00:00",
                tags: ["Shakespeare", "Drama"],
              },
              {
                page: "Page 2",
                pageContent: "Themes of power and betrayal in Macbeth.",
                createdAt: "2025-10-01T13:00:00",
                editedAt: "2025-10-02T13:00:00",
                tags: ["Shakespeare", "Themes"],
              },
            ],
          },
          {
            id: "222bbb33-cc44-55dd-ee66-777fff888ggg",
            title: "Poetry & Prose",
            color: "#ffcc5a",
            importance: 3,
            description:
              "Study of English poetry and prose with focus on Romanticism and Victorian literature.",
            dueDate: "2025-09-28T12:00:00",
            content: [
              {
                page: "Page 1",
                pageContent: "Romantic ideals in Wordsworth’s works.",
                createdAt: "2025-09-29T12:00:00",
                editedAt: "2025-09-30T12:00:00",
                tags: ["Poetry", "Romanticism"],
              },
              {
                page: "Page 2",
                pageContent:
                  "Victorian prose through the lens of Charles Dickens.",
                createdAt: "2025-09-29T13:00:00",
                editedAt: "2025-09-30T13:00:00",
                tags: ["Prose", "Victorian"],
              },
            ],
          },
        ],
      },
      {
        id: "b2c3d4e5-6789-4f01-bcde-2345678901fa",
        title: "Programming & Software Design",
        description:
          "Covers programming fundamentals, software design patterns, and practical coding exercises.",
        color: "#9e5aff",
        createdAt: "2025-10-05T12:00:00",
        importance: 2,
        tags: ["Programming", "Design"],
        topics: [
          {
            id: "333ccc44-dd55-66ee-ff77-888ggg999hhh",
            title: "Object-Oriented Programming",
            color: "#ff5a7f",
            importance: 5,
            description:
              "Principles of OOP including classes, inheritance, polymorphism, and encapsulation.",
            dueDate: "2025-10-19T12:00:00",
            content: [
              {
                page: "Page 1",
                pageContent: "Defining classes and objects in modern languages.",
                createdAt: "2025-10-02T12:00:00",
                editedAt: "2025-10-03T12:00:00",
                tags: ["OOP", "Basics"],
              },
              {
                page: "Page 2",
                pageContent:
                  "Case study: building a small library management system.",
                createdAt: "2025-10-02T13:00:00",
                editedAt: "2025-10-03T13:00:00",
                tags: ["OOP", "Case Study"],
              },
            ],
          },
          {
            id: "444ddd55-ee66-77ff-gg88-999hhh000iii",
            title: "Web Development Basics",
            color: "#5aff9e",
            importance: 1,
            description:
              "Introduction to HTML, CSS, and JavaScript for building responsive websites.",
            dueDate: "2025-10-21T12:00:00",
            content: [
              {
                page: "Page 1",
                pageContent: "HTML structure and semantic tags.",
                createdAt: "2025-10-03T12:00:00",
                editedAt: "2025-10-04T12:00:00",
                tags: ["Web", "HTML"],
              },
              {
                page: "Page 2",
                pageContent: "CSS styling and JavaScript for interactivity.",
                createdAt: "2025-10-03T13:00:00",
                editedAt: "2025-10-04T13:00:00",
                tags: ["Web", "CSS", "JS"],
              },
            ],
          },
        ],
      },
    ],
  },
];

const ActivityData = [
  { doneAt: "2025-09-27T08:50:00", title: "Logged In", description: "User logged into the system", color: "#4ade80" },
  { doneAt: "2025-09-27T09:15:00", title: "Created PDF", description: "Generated PDF for Math Notebook", color: "#3b82f6" },
  { doneAt: "2025-09-27T09:30:00", title: "Created Notebook", description: "New Notebook: Physics", color: "#facc15" },
  { doneAt: "2025-09-27T09:45:00", title: "Created Subject", description: "Added Subject: Algebra in Math Notebook", color: "#f97316" },
  { doneAt: "2025-09-27T10:00:00", title: "Created Subject", description: "Added Subject: Mechanics in Physics Notebook", color: "#f97316" },
  { doneAt: "2025-09-27T10:15:00", title: "Accessed Data", description: "Viewed all subjects in Chemistry Notebook", color: "#8b5cf6" },
  { doneAt: "2025-09-27T10:30:00", title: "Deleted Task", description: "Removed outdated PDF from Math Notebook", color: "#ef4444" },
  { doneAt: "2025-09-27T10:45:00", title: "Created PDF", description: "Generated PDF for Chemistry Notebook", color: "#3b82f6" },
  { doneAt: "2025-09-27T11:00:00", title: "Created Notebook", description: "New Notebook: History", color: "#facc15" },
  { doneAt: "2025-09-27T11:15:00", title: "Created Subject", description: "Added Subject: World Wars in History Notebook", color: "#f97316" },
  { doneAt: "2025-09-27T11:30:00", title: "Accessed Data", description: "Viewed all PDFs in Math Notebook", color: "#8b5cf6" },
  { doneAt: "2025-09-27T11:45:00", title: "Deleted Task", description: "Removed Subject: Algebra from Math Notebook", color: "#ef4444" },
  { doneAt: "2025-09-27T12:00:00", title: "Created PDF", description: "Generated PDF for Physics Notebook", color: "#3b82f6" },
  { doneAt: "2025-09-27T12:15:00", title: "Created Notebook", description: "New Notebook: Geography", color: "#facc15" },
  { doneAt: "2025-09-27T12:30:00", title: "Created Subject", description: "Added Subject: Maps in Geography Notebook", color: "#f97316" },
  { doneAt: "2025-09-27T12:45:00", title: "Accessed Data", description: "Checked all notebooks in History section", color: "#8b5cf6" },
  { doneAt: "2025-09-27T13:00:00", title: "Deleted Task", description: "Removed PDF from Physics Notebook", color: "#ef4444" },
  { doneAt: "2025-09-27T13:15:00", title: "Created PDF", description: "Generated PDF for Geography Notebook", color: "#3b82f6" },
  { doneAt: "2025-09-27T13:30:00", title: "Created Subject", description: "Added Subject: Rivers in Geography Notebook", color: "#f97316" },
  { doneAt: "2025-09-27T13:45:00", title: "Accessed Data", description: "Viewed all PDFs in History Notebook", color: "#8b5cf6" },
  { doneAt: "2025-09-27T14:00:00", title: "Deleted Task", description: "Removed outdated Subject: Mechanics from Physics Notebook", color: "#ef4444" },
  { doneAt: "2025-09-27T14:15:00", title: "Logged Out", description: "User logged out of the system", color: "#4ade80" }
];

export { notebookData, ActivityData };

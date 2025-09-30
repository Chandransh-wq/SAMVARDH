import { notebookData } from "./demodata";
import { 
  AiOutlineLogin, 
  AiOutlineLogout, 
  AiOutlineFilePdf, 
  AiOutlineBook, 
  AiOutlineFileText, 
  AiOutlineFolder, 
  AiOutlineDelete 
} from "react-icons/ai";
/**
 * Returns the initials of a given name.
 * Example: "John Doe" → "JD"
 */
const getInitials = (name: string) => {
  const names = name.split(' ');
  let initials = names[0].charAt(0).toUpperCase();
  if (names.length > 1) {
    initials += names[names.length - 1].charAt(0).toUpperCase();
  }
  return initials;
};

/**
 * Total number of notebooks
 */
const notebookLength = notebookData.length;

/**
 * Total number of topics across all notebooks
 */
const topicLength = notebookData.reduce(
  (acc, notebook) =>
    acc + notebook.subjects.reduce((subAcc, subject) => subAcc + subject.topics.length, 0),
  0
);

/**
 * Total number of subjects across all notebooks
 */
const subjectLength = notebookData.reduce((acc, notebook) => acc + notebook.subjects.length, 0);

/**
 * Flattened array of all subjects from all notebooks
 */
const Subject = notebookData.flatMap((notebook) => notebook.subjects);

/**
 * Flattened array of all topics from all subjects in all notebooks
 * Includes subjectId and subjectTitle for context
 */
const Topic = notebookData.flatMap((notebook) =>
  notebook.subjects.flatMap((subject) =>
    subject.topics.map((topic) => ({
      ...topic,
      subjectId: subject.id,
      subjectTitle: subject.title,
      notebookId: notebook.id,
      notebookTitle: notebook.title
    }))
  )
);

interface contentProp {
  page: string;
  pageContent: string;
}

interface topicProp {
    id: string,
    title: string,
    color: string,
    importance: number,
    description: string,
    dueDate: string,
    content: contentProp[],
}

const TopicArray = (date: string) => {
  const arr: topicProp[] = []
  Topic.map((topic)=>{topic.dueDate == date ? arr.push(topic) : null})
  return arr;
}

const getIcon = (title: string): React.ReactElement => {
  switch (title.toLowerCase()) {
    case "logged in":
      return <AiOutlineLogin size={25} />;
    case "logged out":
      return <AiOutlineLogout size={25} />;
    case "created pdf":
      return <AiOutlineFilePdf size={25} />;
    case "created notebook":
      return <AiOutlineBook size={25} />;
    case "created subject":
      return <AiOutlineFileText size={25} />;
    case "accessed data":
      return <AiOutlineFolder size={25} />;
    case "deleted task":
      return <AiOutlineDelete size={25} />;
    default:
      return <AiOutlineFileText size={25} />; // fallback icon
  }
};

const user = {
  name: "Pranab Choudhary",
  emailID: "Chandransh-wq@gmail.com"
}

  // Helper function to convert HEX to RGBA
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

const RandomColors = [
  "bg-blue-100",
  "bg-orange-100",
  "bg-yellow-100", // fixed typo (was "ng-yellow-100")
  "bg-red-100",
  "bg-teal-100",
  "bg-green-100",
];

const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * RandomColors.length);
  return RandomColors[randomIndex];
};


export {
  getInitials,
  notebookLength,
  topicLength,
  subjectLength,
  Subject,
  Topic,
  TopicArray,
  getIcon,
  hexToRgba,
  user,
  getRandomColor,
};

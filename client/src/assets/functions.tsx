import { getNotebooks } from "../sources/notebookServices";
import { 
  AiOutlineLogin, 
  AiOutlineLogout, 
  AiOutlineFilePdf, 
  AiOutlineBook, 
  AiOutlineFileText, 
  AiOutlineFolder, 
  AiOutlineDelete 
} from "react-icons/ai";
import type { Topic } from "./types";
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

export const getComputedData = async () => {
  const notebooks = await getNotebooks();
  const subjects = notebooks.flatMap(nb => nb.subjects || []);
  const topics = notebooks.flatMap(nb =>
    (nb.subjects || []).flatMap(sub =>
      (sub.topics || []).map(topic => ({
        ...topic,
        subjectId: sub._id,
        subjectTitle: sub.title,
        notebookId: nb._id,
        notebookTitle: nb.title
      }))
    )
  );

  return {
    notebooks,
    subjects,
    topics,
    notebookLength: notebooks.length,
    subjectLength: subjects.length,
    topicLength: topics.length
  };
};


export interface contentProp {
  page: string;
  pageContent: string;
}

export interface topicProp {
    id: string,
    title: string,
    color: string,
    importance: number,
    description: string,
    dueDate: string,
    content: contentProp[],
}




const TopicArray = async (date: string): Promise<Topic[]> => {
  const { topics } = await getComputedData();
  return topics.filter(topic => topic.dueDate === date);
};

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
  
  
  
  TopicArray,
  getIcon,
  hexToRgba,
  user,
  getRandomColor,
};

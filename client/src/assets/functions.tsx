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

/** Returns initials for a topic title */
const getInitials = (name: string) => {
  const names = name.split(' ');
  let initials = names[0].charAt(0).toUpperCase();
  if (names.length > 1) initials += names[names.length - 1].charAt(0).toUpperCase();
  return initials;
};

/** Fetch all topics across notebooks/subjects */
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

  const notebookLength = notebooks.length;
  const subjectLength = subjects.length;
  const topicLength = topics.length

  return { notebooks, notebookLength, subjects, subjectLength, topics, topicLength };
};

/** Filter topics by date string (YYYY-MM-DD) */
const TopicArray = async (date: string): Promise<Topic[]> => {
  const { topics } = await getComputedData();
  return topics.filter(topic => {
    const topicDateObj = new Date(topic.dueDate ?? "");
    const topicDateStr = topicDateObj.toISOString().split('T')[0]; // "YYYY-MM-DD"
    return topicDateStr === date;
  });
};

/** Get icon for activity type */
const getIcon = (title: string): React.ReactElement => {
  switch (title.toLowerCase()) {
    case "logged in": return <AiOutlineLogin size={25} />;
    case "logged out": return <AiOutlineLogout size={25} />;
    case "created pdf": return <AiOutlineFilePdf size={25} />;
    case "created notebook": return <AiOutlineBook size={25} />;
    case "created subject": return <AiOutlineFileText size={25} />;
    case "accessed data": return <AiOutlineFolder size={25} />;
    case "deleted task": return <AiOutlineDelete size={25} />;
    default: return <AiOutlineFileText size={25} />;
  }
};

const user = {
  name: "Pranab Choudhary",
  emailID: "Chandransh-wq@gmail.com"
};

// Convert hex to rgba
const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const RandomColors = [
  "bg-blue-100", "bg-orange-100", "bg-yellow-100",
  "bg-red-100", "bg-teal-100", "bg-green-100",
];

const getRandomColor = () => RandomColors[Math.floor(Math.random() * RandomColors.length)];

export {
  getInitials,
  TopicArray,
  getIcon,
  hexToRgba,
  user,
  getRandomColor,
};

import React from "react";
import { Card, CardContent } from "../components/Card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/Avatar";
import { notebookData } from "../assets/demodata";
import { getInitials } from "../assets/functions";
import { Book, NotebookPen, Tags } from "lucide-react";

interface Activity {
  doneAt: string;
  title: string;
  description: string;
  color: string;
}

interface ProfileProps {
  darkMode: boolean;
  user?: {
    name: string;
    email: string;
    avatarUrl?: string;
    joinedAt: string;
  };
  activities?: Activity[];
}

const Profile: React.FC<ProfileProps> = ({
  darkMode,
}) => {
  return (
    <div
      className={`${
        darkMode ? "primary-dark" : "primary-light"
      } flex flex-col items-center h-[92vh] overflow-y-auto md:w-[calc(100%)] absolute md:top-[4.5rem] pt-5 top-0 left-0 w-screen px-6`}
    >
      Profile
    </div>
  );
};

export default Profile;

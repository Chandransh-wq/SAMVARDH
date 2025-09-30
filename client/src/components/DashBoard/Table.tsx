import React from "react";
import { notebookData } from "../../assets/demodata";

// background color by score
const getRowColor = (score: number, darkMode = false) => {
  if (score < 40) return darkMode ? "bg-red-900/40" : "bg-red-100";
  if (score < 70) return darkMode ? "bg-yellow-900/40" : "bg-yellow-100";
  return darkMode ? "bg-green-900/40" : "bg-green-100";
};

// score block color
const getScoreColor = (score: number) => {
  if (score < 40) return "bg-red-500";
  if (score < 70) return "bg-yellow-500";
  return "bg-green-500";
};

interface TableProps {
  darkMode?: boolean;
}

const Table: React.FC<TableProps> = ({ darkMode = false }) => {
  const subjects = notebookData.flatMap((nb) => nb.subjects);

  const subjectStats = subjects.map((subject) => {
    const totalTopics = subject.topics.length;
    const completedTopics = subject.topics.filter(
      (t) => new Date(t.dueDate) < new Date()
    ).length;

    const avgImportance =
      totalTopics > 0
        ? subject.topics.reduce((sum, t) => sum + t.importance, 0) / totalTopics
        : 0;

    const score = Math.round(avgImportance * 20);

    const needingAttention = subject.topics.filter((t) => t.importance <= 2).length;
    const workingTowards = subject.topics.filter(
      (t) => t.importance === 3 || t.importance === 4
    ).length;
    const mastered = subject.topics.filter((t) => t.importance >= 5).length;

    return {
      name: subject.title,
      work: `${completedTopics} / ${totalTopics}`,
      score,
      needingAttention,
      workingTowards,
      mastered,
      rowColor: getRowColor(score, darkMode),
      scoreColor: getScoreColor(score),
    };
  });

  return (
    <div className="p-6">
      <div
        className={`overflow-hidden rounded-2xl shadow-md ${
          darkMode ? "bg-gray-900 border border-gray-700" : "bg-white border"
        }`}
      >
        <table className="w-full border text-left ">
          <thead className={`${darkMode ? "bg-gray-800 text-gray-200" : "bg-gray-50 text-gray-700"} border`}>
            <tr>
              <th className="p-3">Full Name</th>
              <th className="p-3">Work Completed</th>
              <th className="p-3">Average Score</th>
              <th className="p-3">Needing Attention</th>
              <th className="p-3">Working Towards</th>
              <th className="p-3">Mastered</th>
            </tr>
          </thead>
          <tbody>
            {subjectStats.map((subject, idx) => (
              <tr
                key={idx}
                className={`${subject.rowColor} ${
                  darkMode ? "border-gray-700" : "border-gray-700"
                } border-b`}
              >
                {/* Name + avatar */}
                <td
                  className={`p-3 font-medium flex items-center gap-2 ${
                    darkMode ? "text-gray-100" : "text-gray-800"
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-white border flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-700">
                      {subject.name.charAt(0)}
                    </span>
                  </div>
                  {subject.name}
                </td>

                {/* Work */}
                <td
                  className={`p-3 font-semibold ${
                    darkMode ? "text-gray-100" : "text-gray-900"
                  }`}
                >
                  {subject.work}
                </td>

                {/* Score block */}
                <td className="p-3 flex items-center gap-2">
                  <div
                    className={`w-10 h-10 rounded flex items-center justify-center text-white font-bold ${subject.scoreColor}`}
                  >
                    {subject.score}%
                  </div>
                </td>

                {/* Needing Attention */}
                <td className="p-3">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-red-500 text-white font-bold">
                    {subject.needingAttention}
                  </div>
                </td>

                {/* Working Towards */}
                <td className="p-3">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-400 text-white font-bold">
                    {subject.workingTowards}
                  </div>
                </td>

                {/* Mastered */}
                <td className="p-3">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500 text-white font-bold">
                    {subject.mastered}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;

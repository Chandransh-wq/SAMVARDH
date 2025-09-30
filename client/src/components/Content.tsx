import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ContentProps {
  darkMode: boolean;
  text: string;
}

const Content: React.FC<ContentProps> = ({ darkMode, text }) => {
  return (
    <div className={`prose max-w-none ${darkMode ? 'prose-invert text-gray-100' : 'text-gray-800'}`}>
<ReactMarkdown
  remarkPlugins={[remarkGfm]}
  components={{
    h1: ({node, ...props}) => <h1 className="text-4xl font-bold my-4" {...props} />,
    h2: ({node, ...props}) => <h2 className="text-3xl font-semibold my-3" {...props} />,
    li: ({node, ...props}) => <li className="ml-6 list-disc" {...props} />
  }}
>
  {text}
</ReactMarkdown>
    </div>
  );
};

export default Content;

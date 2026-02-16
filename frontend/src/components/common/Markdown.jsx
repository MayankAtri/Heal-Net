import React from 'react';
import ReactMarkdown from 'react-markdown';

const Markdown = ({ children, className = '' }) => {
  // react-markdown v10 requires children to be a string
  const content = Array.isArray(children) ? children.join('\n\n') : String(children || '');

  return (
    <div className={`prose prose-sm max-w-none dark:prose-invert ${className}`}>
      <ReactMarkdown
        components={{
          // Style bold text
          strong: ({ children }) => (
            <strong className="font-bold text-stone-900 dark:text-white">{children}</strong>
          ),
          // Style emphasis/italic
          em: ({ children }) => (
            <em className="italic">{children}</em>
          ),
          // Style paragraphs
          p: ({ children }) => (
            <p className="text-stone-700 dark:text-stone-200 mb-2 last:mb-0">{children}</p>
          ),
          // Style lists
          ul: ({ children }) => (
            <ul className="list-disc list-inside space-y-1 text-stone-700 dark:text-stone-200">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside space-y-1 text-stone-700 dark:text-stone-200">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="text-stone-700 dark:text-stone-200">{children}</li>
          ),
          // Style headings
          h1: ({ children }) => (
            <h1 className="text-xl font-bold text-stone-900 dark:text-white mb-2">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-lg font-bold text-stone-900 dark:text-white mb-2">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-base font-bold text-stone-900 dark:text-white mb-2">{children}</h3>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default Markdown;

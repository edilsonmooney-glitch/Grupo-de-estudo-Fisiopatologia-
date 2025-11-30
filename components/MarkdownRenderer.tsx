import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  if (!content) return null;

  // Split by double newline to form paragraphs/blocks
  const blocks = content.split('\n\n');

  return (
    <div className="space-y-4 text-zinc-300 leading-relaxed">
      {blocks.map((block, index) => {
        // Headers
        if (block.startsWith('## ')) {
          return (
            <h2 key={index} className="text-xl font-bold text-green-400 mt-6 mb-3 border-b border-green-900/30 pb-2">
              {block.replace('## ', '')}
            </h2>
          );
        }
        if (block.startsWith('### ')) {
          return (
            <h3 key={index} className="text-lg font-semibold text-green-300 mt-4 mb-2">
              {block.replace('### ', '')}
            </h3>
          );
        }
        
        // Lists
        if (block.trim().startsWith('- ') || block.trim().startsWith('* ')) {
          const items = block.split('\n').filter(line => line.trim().length > 0);
          return (
            <ul key={index} className="list-disc pl-5 space-y-1 text-zinc-300 bg-zinc-900/50 p-4 rounded-lg shadow-sm border border-zinc-800">
              {items.map((item, i) => (
                <li key={i}>{item.replace(/^[-*] /, '')}</li>
              ))}
            </ul>
          );
        }

        // Bold text parsing for paragraphs
        const parts = block.split(/(\*\*.*?\*\*)/g);
        return (
          <p key={index} className="text-base text-zinc-300">
            {parts.map((part, i) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={i} className="font-semibold text-green-400">{part.slice(2, -2)}</strong>;
              }
              return part;
            })}
          </p>
        );
      })}
    </div>
  );
};

export default MarkdownRenderer;
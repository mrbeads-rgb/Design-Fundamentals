
import React from 'react';
import { Section } from '../types';

interface ContentPanelProps {
  section: Section | null;
  content: string;
  isLoading: boolean;
  error: string | null;
}

const SkeletonLoader: React.FC = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-8 bg-slate-700 rounded w-3/4"></div>
    <div className="space-y-2">
      <div className="h-4 bg-slate-700 rounded"></div>
      <div className="h-4 bg-slate-700 rounded w-5/6"></div>
      <div className="h-4 bg-slate-700 rounded w-4/6"></div>
    </div>
    <div className="space-y-2 pt-4">
      <div className="h-4 bg-slate-700 rounded"></div>
      <div className="h-4 bg-slate-700 rounded w-5/6"></div>
    </div>
  </div>
);

const WelcomeMessage: React.FC = () => (
    <div className="text-center flex flex-col items-center justify-center h-full max-w-2xl mx-auto">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-indigo-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v11.494m-9-5.747h18" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v11.494m-9-5.747h18" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v11.494m-9-5.747h18" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.5 12.5l7.5-7.5 7.5 7.5" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.5 12.5l7.5 7.5 7.5-7.5" />
        </svg>
        <h2 className="text-3xl font-bold text-slate-100 mb-2">Welcome to Design Fundamentals</h2>
        <p className="text-slate-400">
            Select a topic from the sidebar to begin your micro-learning journey. The AI will generate a concise lesson for you.
        </p>
    </div>
);


const ContentPanel: React.FC<ContentPanelProps> = ({ section, content, isLoading, error }) => {
  if (!section && !isLoading) {
    return <WelcomeMessage />;
  }

  const formattedContent = content.split('\n').map((paragraph, index) => {
    if (paragraph.trim().startsWith('* ') || paragraph.trim().startsWith('- ')) {
      return (
        <li key={index} className="ml-6 list-disc">
          {paragraph.trim().substring(2)}
        </li>
      );
    }
    return (
      <p key={index} className="mb-4">
        {paragraph}
      </p>
    );
  });

  return (
    <div className="max-w-4xl mx-auto w-full">
      {section && (
        <h1 className="text-3xl md:text-4xl font-bold text-slate-100 mb-6 pb-4 border-b border-slate-700">
          <span className="text-indigo-400">{section.id}</span> {section.title}
        </h1>
      )}
      
      <div className="prose prose-invert prose-lg max-w-none text-slate-300 prose-p:text-slate-300 prose-li:text-slate-300">
        {isLoading && <SkeletonLoader />}
        {error && <div className="bg-red-900/50 border border-red-500 text-red-300 p-4 rounded-md">{error}</div>}
        {!isLoading && !error && content && <div>{formattedContent}</div>}
      </div>
    </div>
  );
};

export default ContentPanel;

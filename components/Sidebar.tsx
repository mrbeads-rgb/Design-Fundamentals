
import React, { useState } from 'react';
import { tableOfContents } from '../data/tableOfContents';
import { Section, Chapter, Part } from '../types';
import BookOpenIcon from './icons/BookOpenIcon';
import ChevronDownIcon from './icons/ChevronDownIcon';
import ChevronRightIcon from './icons/ChevronRightIcon';

interface SidebarProps {
  onSelectSection: (section: Section) => void;
  selectedSectionId: string | null;
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onSelectSection, selectedSectionId, isOpen, onToggle }) => {
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});

  const toggleItem = (id: string) => {
    setOpenItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      <aside className={`absolute md:relative z-20 flex flex-col w-full max-w-xs md:w-80 h-full bg-slate-800 border-r border-slate-700 text-slate-300 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="flex items-center justify-between p-4 border-b border-slate-700 sticky top-0 bg-slate-800 z-10">
          <div className="flex items-center">
             <BookOpenIcon className="h-8 w-8 text-indigo-400" />
            <div className="ml-3">
              <h1 className="text-lg font-bold text-slate-100">Design Fundamentals</h1>
              <p className="text-xs text-slate-400">By Akinola Sobola</p>
            </div>
          </div>
          <button onClick={onToggle} className="p-2 rounded-md hover:bg-slate-700 md:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-2">
          {tableOfContents.map((part) => (
            <div key={part.id} className="mb-2">
              <button onClick={() => toggleItem(part.id)} className="w-full flex justify-between items-center text-left p-2 rounded-md hover:bg-slate-700/50">
                <span className="font-bold text-sm uppercase tracking-wider text-indigo-300">{`Part ${part.id}: ${part.title}`}</span>
                {openItems[part.id] ? <ChevronDownIcon className="h-4 w-4" /> : <ChevronRightIcon className="h-4 w-4" />}
              </button>
              {openItems[part.id] && (
                <div className="pl-4 mt-1">
                  {part.chapters.map((chapter) => (
                    <div key={chapter.id} className="mb-1">
                      <button onClick={() => toggleItem(`${part.id}-${chapter.id}`)} className="w-full flex justify-between items-center text-left p-2 rounded-md hover:bg-slate-700/50">
                        <span className="font-semibold text-sm text-slate-200">{`Chapter ${chapter.id}: ${chapter.title}`}</span>
                         {openItems[`${part.id}-${chapter.id}`] ? <ChevronDownIcon className="h-4 w-4" /> : <ChevronRightIcon className="h-4 w-4" />}
                      </button>
                      {openItems[`${part.id}-${chapter.id}`] && (
                        <ul className="pl-4 border-l-2 border-slate-600 ml-2">
                          {chapter.sections.map((section) => (
                            <li key={section.id}>
                              <button
                                onClick={() => onSelectSection(section)}
                                className={`w-full text-left text-sm p-2 my-1 rounded-md transition-colors duration-200 ${
                                  selectedSectionId === section.id
                                    ? 'bg-indigo-500 text-white font-medium'
                                    : 'text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                                }`}
                              >
                                {`${section.id} ${section.title}`}
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>
      {isOpen && <div onClick={onToggle} className="fixed inset-0 bg-black/60 z-10 md:hidden" aria-hidden="true"></div>}
    </>
  );
};

export default Sidebar;

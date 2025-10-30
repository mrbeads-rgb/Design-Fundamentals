
import React, { useState, useCallback, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ContentPanel from './components/ContentPanel';
import { Section } from './types';
import { generateLesson } from './services/geminiService';
import BookOpenIcon from './components/icons/BookOpenIcon';

const App: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [lessonContent, setLessonContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleSelectSection = useCallback((section: Section) => {
    setSelectedSection(section);
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  }, []);

  useEffect(() => {
    if (!selectedSection) return;

    const fetchLesson = async () => {
      setIsLoading(true);
      setError(null);
      setLessonContent('');
      try {
        const content = await generateLesson(selectedSection.title);
        setLessonContent(content);
      } catch (err) {
        setError('Failed to generate lesson. Please check your API key and try again.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLesson();
  }, [selectedSection]);
  
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-slate-900 text-slate-300 font-sans">
      <Sidebar 
        onSelectSection={handleSelectSection} 
        selectedSectionId={selectedSection?.id ?? null}
        isOpen={isSidebarOpen}
        onToggle={toggleSidebar}
      />

      <main className="flex-1 flex flex-col transition-all duration-300 ease-in-out">
        <header className="flex items-center p-4 bg-slate-800/50 border-b border-slate-700 md:hidden">
          <button onClick={toggleSidebar} className="p-2 mr-4 rounded-md hover:bg-slate-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
          <div className="flex items-center">
            <BookOpenIcon className="h-6 w-6 text-indigo-400" />
            <h1 className="text-xl font-bold ml-2 text-slate-100">Design Fundamentals</h1>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <ContentPanel
            section={selectedSection}
            content={lessonContent}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </main>
    </div>
  );
};

export default App;

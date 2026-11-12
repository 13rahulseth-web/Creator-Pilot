import React, { useState } from 'react';
import { Sidebar, NavigationPage } from './components/layout/Sidebar';
import { TopNav } from './components/layout/TopNav';
import { ToastProvider, useToast } from './components/common/Toast';
import { DashboardPage } from './pages/DashboardPage';
import { VideoStudioPage } from './pages/VideoStudioPage';
import { ClipStudioPage } from './pages/ClipStudioPage';
import { ThumbnailStudioPage } from './pages/ThumbnailStudioPage';
import { ContentStudioPage } from './pages/ContentStudioPage';
import { DistributionPage } from './pages/DistributionPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { SettingsPage } from './pages/SettingsPage';
import {
  SAMPLE_PROJECTS,
  INITIAL_USER,
  INITIAL_WORKSPACE,
  SAMPLE_CLIPS,
} from './data/mockData';
import { Project, UserProfile, UserWorkspace } from './types';
import { X, Search, Film, Video, FileText, ArrowRight } from 'lucide-react';

function AppContent() {
  const { showToast } = useToast();

  const [currentPage, setCurrentPage] = useState<NavigationPage>('dashboard');
  const [projects, setProjects] = useState<Project[]>(SAMPLE_PROJECTS);
  const [activeProject, setActiveProject] = useState<Project>(SAMPLE_PROJECTS[0]);
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [workspace, setWorkspace] = useState<UserWorkspace>(INITIAL_WORKSPACE);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);

  const handleNavigate = (page: NavigationPage) => {
    setCurrentPage(page);
    setIsMobileSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProject = (project: Project) => {
    setActiveProject(project);
    showToast(`Switched active project`, project.title, 'info');
  };

  const handleUpdateProject = (updated: Project) => {
    setActiveProject(updated);
    setProjects((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  // Search filter
  const filteredClips = SAMPLE_CLIPS.filter(
    (c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.captionSnippet.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredProjects = projects.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F9F8F5] text-stone-900 flex flex-col font-sans selection:bg-amber-200">
      {/* Collapsible Desktop / Tablet Sidebar */}
      <Sidebar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Mobile Drawer Backdrop */}
      {isMobileSidebarOpen && (
        <div
          onClick={() => setIsMobileSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-stone-950/40 backdrop-blur-xs md:hidden"
        />
      )}

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col transition-all duration-200 ${
          isSidebarCollapsed ? 'md:pl-20' : 'md:pl-64'
        }`}
      >
        {/* Top Navigation Bar */}
        <TopNav
          currentPage={currentPage}
          user={user}
          workspace={workspace}
          onNavigate={handleNavigate}
          onSearchQuery={(q) => {
            setSearchQuery(q);
            setShowSearchResults(q.trim().length > 0);
          }}
          onSelectWorkspace={(ws) => {
            setWorkspace(ws);
            showToast(`Switched workspace`, ws.name, 'info');
          }}
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        />

        {/* Global Live Search Results Dropdown/Overlay */}
        {showSearchResults && searchQuery.trim().length > 0 && (
          <div className="fixed top-16 inset-x-4 md:left-72 md:right-8 z-40 max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl border border-stone-200 p-4 space-y-4 animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="flex items-center justify-between border-b border-stone-100 pb-2">
              <span className="text-xs font-semibold text-stone-500">
                Search Results for &ldquo;{searchQuery}&rdquo;
              </span>
              <button
                onClick={() => setShowSearchResults(false)}
                className="text-stone-400 hover:text-stone-700 p-1"
                aria-label="Close search"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 max-h-[60vh] overflow-y-auto">
              {/* Matching Clips */}
              {filteredClips.length > 0 && (
                <div className="space-y-1.5">
                  <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Film className="w-3.5 h-3.5" />
                    <span>Clips</span>
                  </div>
                  {filteredClips.map((c) => (
                    <div
                      key={c.id}
                      onClick={() => {
                        setShowSearchResults(false);
                        handleNavigate('clip-studio');
                      }}
                      className="p-2.5 rounded-lg hover:bg-stone-50 cursor-pointer flex items-center justify-between text-xs"
                    >
                      <div>
                        <p className="font-semibold text-stone-900">{c.title}</p>
                        <p className="text-[11px] text-stone-500 font-mono">
                          {c.startTime} - {c.endTime} · {c.duration}
                        </p>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
                    </div>
                  ))}
                </div>
              )}

              {/* Matching Projects */}
              {filteredProjects.length > 0 && (
                <div className="space-y-1.5">
                  <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Video className="w-3.5 h-3.5" />
                    <span>Projects & Videos</span>
                  </div>
                  {filteredProjects.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => {
                        handleSelectProject(p);
                        setShowSearchResults(false);
                        handleNavigate('video-studio');
                      }}
                      className="p-2.5 rounded-lg hover:bg-stone-50 cursor-pointer flex items-center justify-between text-xs"
                    >
                      <div>
                        <p className="font-semibold text-stone-900">{p.title}</p>
                        <p className="text-[11px] text-stone-500 font-mono">
                          {p.video.duration} · {p.clipCount} clips
                        </p>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
                    </div>
                  ))}
                </div>
              )}

              {filteredClips.length === 0 && filteredProjects.length === 0 && (
                <div className="py-6 text-center text-xs text-stone-400">
                  No matching items found for &ldquo;{searchQuery}&rdquo;.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Viewport Content Router */}
        <main className="flex-1 px-4 md:px-8 pt-6 pb-12">
          {currentPage === 'dashboard' && (
            <DashboardPage
              onNavigate={handleNavigate}
              onSelectProject={handleSelectProject}
              activeProject={activeProject}
            />
          )}

          {currentPage === 'video-studio' && (
            <VideoStudioPage
              project={activeProject}
              onUpdateProject={handleUpdateProject}
              onNavigate={handleNavigate}
            />
          )}

          {currentPage === 'clip-studio' && (
            <ClipStudioPage
              project={activeProject}
              onNavigate={handleNavigate}
            />
          )}

          {currentPage === 'thumbnail-studio' && (
            <ThumbnailStudioPage
              project={activeProject}
              onNavigate={handleNavigate}
            />
          )}

          {currentPage === 'content-studio' && (
            <ContentStudioPage
              project={activeProject}
              onNavigate={handleNavigate}
            />
          )}

          {currentPage === 'distribution' && (
            <DistributionPage onNavigate={handleNavigate} />
          )}

          {currentPage === 'analytics' && (
            <AnalyticsPage onNavigate={handleNavigate} />
          )}

          {currentPage === 'settings' && (
            <SettingsPage
              user={user}
              workspace={workspace}
              onUpdateUser={setUser}
              onUpdateWorkspace={setWorkspace}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}

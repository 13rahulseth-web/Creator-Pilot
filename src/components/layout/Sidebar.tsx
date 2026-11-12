import React from 'react';
import {
  LayoutDashboard,
  Video,
  Film,
  Image as ImageIcon,
  FileText,
  CalendarDays,
  BarChart3,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  HardDrive,
} from 'lucide-react';

export type NavigationPage =
  | 'dashboard'
  | 'video-studio'
  | 'clip-studio'
  | 'thumbnail-studio'
  | 'content-studio'
  | 'distribution'
  | 'analytics'
  | 'settings';

interface SidebarProps {
  currentPage: NavigationPage;
  onNavigate: (page: NavigationPage) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

interface NavItem {
  id: NavigationPage;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  hint?: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'video-studio', label: 'Video Studio', icon: Video, hint: 'Upload & Ingest' },
  { id: 'clip-studio', label: 'Clip Studio', icon: Film, hint: '9:16 Highlights' },
  { id: 'thumbnail-studio', label: 'Thumbnail Studio', icon: ImageIcon, hint: 'Visuals' },
  { id: 'content-studio', label: 'Content Studio', icon: FileText, hint: 'Captions & Copy' },
  { id: 'distribution', label: 'Distribution', icon: CalendarDays, hint: 'Calendar' },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, hint: 'Metrics' },
  { id: 'settings', label: 'Settings', icon: SlidersHorizontal, hint: 'Preferences' },
];

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onNavigate,
  isCollapsed,
  onToggleCollapse,
}) => {
  return (
    <aside
      className={`fixed top-0 left-0 bottom-0 z-30 flex flex-col bg-[#FAF8F5] border-r border-[#E7E3DC] transition-all duration-200 select-none ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-[#E7E3DC] shrink-0">
        <div
          onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-3 cursor-pointer overflow-hidden group"
        >
          {/* Brand Mark: Sleek aperture / pilot wing icon in Magenta Wine */}
          <div className="w-10 h-10 rounded-xl bg-[#721246] text-white flex items-center justify-center shrink-0 shadow-md shadow-[#721246]/25 transition-transform duration-150 group-hover:scale-105">
            <Sparkles className="w-5 h-5 text-amber-300" />
          </div>

          {!isCollapsed && (
            <div className="flex flex-col min-w-0">
              <span className="text-base font-bold tracking-tight text-stone-900 whitespace-nowrap">
                CreatorPilot<span className="text-[#721246] ml-0.5 font-extrabold">AI</span>
              </span>
              <span className="text-[11px] text-stone-500 font-medium tracking-wide truncate">
                Solo Studio
              </span>
            </div>
          )}
        </div>

        {/* Desktop Collapse Toggle */}
        <button
          onClick={onToggleCollapse}
          className="hidden md:flex p-1.5 rounded-lg text-stone-400 hover:text-stone-800 hover:bg-stone-200/60 transition-colors"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {!isCollapsed && (
          <div className="px-3 pb-2 text-[11px] font-semibold tracking-wider text-stone-400 uppercase">
            Workspaces
          </div>
        )}

        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              title={isCollapsed ? item.label : undefined}
              data-active={isActive}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left group relative ${
                isActive
                  ? 'bg-[#721246] text-white shadow-sm ring-1 ring-[#721246]/50 active'
                  : 'text-stone-600 hover:text-stone-950 hover:bg-stone-200/50'
              } ${isCollapsed ? 'justify-center px-0' : ''}`}
            >
              <Icon
                className={`w-5 h-5 shrink-0 transition-transform ${
                  isActive ? 'text-amber-400' : 'text-stone-500 group-hover:text-stone-800'
                }`}
              />

              {!isCollapsed && (
                <div className="flex items-center justify-between flex-1 truncate">
                  <span className="truncate">{item.label}</span>
                  {item.hint && !isActive && (
                    <span className="text-[10px] text-stone-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.hint}
                    </span>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Storage and Workspace Quota widget */}
      <div className="p-3 border-t border-[#E7E3DC] shrink-0">
        {!isCollapsed ? (
          <div className="bg-[#F3EFEA] rounded-xl p-3 border border-[#E2DDD4]">
            <div className="flex items-center justify-between text-xs font-medium text-stone-700 mb-1.5">
              <span className="flex items-center gap-1.5">
                <HardDrive className="w-3.5 h-3.5 text-stone-500" />
                Storage Quota
              </span>
              <span className="font-mono tabular-nums text-stone-600">17%</span>
            </div>
            <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
              <div className="bg-amber-600 h-full w-[17%]" />
            </div>
            <div className="flex items-center justify-between mt-2 text-[11px] text-stone-500 font-mono tabular-nums">
              <span>42.8 GB used</span>
              <span>250 GB limit</span>
            </div>
          </div>
        ) : (
          <div
            className="flex justify-center p-2 text-stone-500 hover:text-stone-800"
            title="Storage: 42.8 GB / 250 GB (17%)"
          >
            <HardDrive className="w-5 h-5" />
          </div>
        )}
      </div>
    </aside>
  );
};

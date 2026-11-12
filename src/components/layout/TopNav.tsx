import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  ChevronDown,
  User,
  Settings,
  Layers,
  Check,
  Plus,
  ExternalLink,
  Menu,
} from 'lucide-react';
import { UserProfile, UserWorkspace } from '../../types';
import { NavigationPage } from './Sidebar';

interface TopNavProps {
  currentPage: NavigationPage;
  user: UserProfile;
  workspace: UserWorkspace;
  onNavigate: (page: NavigationPage) => void;
  onSearchQuery?: (query: string) => void;
  onSelectWorkspace: (ws: UserWorkspace) => void;
  onToggleMobileSidebar: () => void;
}

const AVAILABLE_WORKSPACES: UserWorkspace[] = [
  {
    id: 'ws_solo_01',
    name: 'CreatorPilot Solo Lab',
    role: 'owner',
    plan: 'Solo Creator Pro',
    storageUsed: '42.8 GB',
    storageLimit: '250 GB',
  },
  {
    id: 'ws_solo_02',
    name: 'Tech Channel Master',
    role: 'editor',
    plan: 'Studio Team',
    storageUsed: '112.4 GB',
    storageLimit: '500 GB',
  },
  {
    id: 'ws_solo_03',
    name: 'Founder Chronicles Podcast',
    role: 'owner',
    plan: 'Solo Creator Pro',
    storageUsed: '18.1 GB',
    storageLimit: '250 GB',
  },
];

export const TopNav: React.FC<TopNavProps> = ({
  currentPage,
  user,
  workspace,
  onNavigate,
  onSearchQuery,
  onSelectWorkspace,
  onToggleMobileSidebar,
}) => {
  const [isWorkspaceMenuOpen, setIsWorkspaceMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const workspaceRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (workspaceRef.current && !workspaceRef.current.contains(e.target as Node)) {
        setIsWorkspaceMenuOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchTerm(val);
    if (onSearchQuery) {
      onSearchQuery(val);
    }
  };

  const getPageTitle = (page: NavigationPage) => {
    switch (page) {
      case 'dashboard':
        return 'Overview';
      case 'video-studio':
        return 'Video Studio';
      case 'clip-studio':
        return 'Clip Studio';
      case 'thumbnail-studio':
        return 'Thumbnail Studio';
      case 'content-studio':
        return 'Content Studio';
      case 'distribution':
        return 'Distribution Calendar';
      case 'analytics':
        return 'Studio Analytics';
      case 'settings':
        return 'Settings & Persona';
      default:
        return 'Studio';
    }
  };

  return (
    <header className="h-16 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E7E3DC] sticky top-0 z-20 px-4 md:px-8 flex items-center justify-between gap-4">
      {/* Zone 1: Contextual Title & Mobile Hamburger */}
      <div className="flex items-center gap-3 min-w-0 shrink-0">
        <button
          onClick={onToggleMobileSidebar}
          className="md:hidden p-2 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-200/60"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-sm">
          <span className="font-semibold text-stone-900 tracking-tight whitespace-nowrap">
            {getPageTitle(currentPage)}
          </span>
          <span className="text-stone-300 hidden sm:inline" aria-hidden="true">/</span>
          <span className="text-xs text-stone-500 hidden sm:inline truncate max-w-[200px]">
            {workspace.name}
          </span>
        </div>
      </div>

      {/* Zone 2: Search Bar */}
      <div className="flex-1 max-w-md mx-2 hidden sm:block">
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search projects, clips, captions..."
            className="w-full pl-9 pr-4 py-1.5 bg-stone-100/80 hover:bg-stone-100 focus:bg-white text-xs text-stone-900 rounded-lg border border-transparent focus:border-stone-300 focus:outline-none transition-all placeholder:text-stone-400 font-normal"
          />
        </div>
      </div>

      {/* Zone 3: Workspace Selector & User Profile */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Workspace Dropdown */}
        <div className="relative" ref={workspaceRef}>
          <button
            onClick={() => setIsWorkspaceMenuOpen(!isWorkspaceMenuOpen)}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-stone-700 bg-stone-100/80 hover:bg-stone-200/60 rounded-lg border border-stone-200/60 transition-colors"
            aria-expanded={isWorkspaceMenuOpen}
          >
            <Layers className="w-3.5 h-3.5 text-stone-500" />
            <span className="max-w-[130px] truncate hidden md:inline">{workspace.name}</span>
            <ChevronDown className="w-3 h-3 text-stone-400 ml-0.5" />
          </button>

          {isWorkspaceMenuOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-stone-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
              <div className="px-3 py-1.5 text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
                Switch Workspace
              </div>
              {AVAILABLE_WORKSPACES.map((ws) => (
                <button
                  key={ws.id}
                  onClick={() => {
                    onSelectWorkspace(ws);
                    setIsWorkspaceMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 text-xs text-left hover:bg-stone-50 transition-colors"
                >
                  <div className="truncate mr-2">
                    <p className="font-medium text-stone-900 truncate">{ws.name}</p>
                    <p className="text-[11px] text-stone-500">{ws.plan}</p>
                  </div>
                  {ws.id === workspace.id && (
                    <Check className="w-4 h-4 text-[#721246] shrink-0" />
                  )}
                </button>
              ))}

              <div className="border-t border-stone-100 mt-1 pt-1">
                <button
                  onClick={() => {
                    setIsWorkspaceMenuOpen(false);
                    onNavigate('settings');
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-stone-600 hover:text-stone-900 hover:bg-stone-50 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Create New Workspace</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Menu */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-stone-200 transition-all focus:outline-none"
            aria-expanded={isProfileMenuOpen}
            title={user.fullName}
          >
            <div className="w-8 h-8 rounded-full bg-stone-800 text-stone-100 flex items-center justify-center text-xs font-semibold overflow-hidden border border-stone-300">
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.fullName}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to initials
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              ) : (
                'RS'
              )}
            </div>
          </button>

          {isProfileMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-stone-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
              <div className="px-3.5 py-2.5 border-b border-stone-100">
                <p className="text-xs font-semibold text-stone-900 truncate">{user.fullName}</p>
                <p className="text-[11px] text-stone-500 truncate">{user.handle}</p>
                <p className="text-[10px] text-amber-700 font-medium mt-1">Solo Creator Pro Tier</p>
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                    onNavigate('settings');
                  }}
                  className="w-full flex items-center gap-2 px-3.5 py-2 text-xs text-stone-700 hover:bg-stone-50 transition-colors"
                >
                  <User className="w-3.5 h-3.5 text-stone-500" />
                  <span>Account & Profile</span>
                </button>
                <button
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                    onNavigate('settings');
                  }}
                  className="w-full flex items-center gap-2 px-3.5 py-2 text-xs text-stone-700 hover:bg-stone-50 transition-colors"
                >
                  <Settings className="w-3.5 h-3.5 text-stone-500" />
                  <span>Creator Persona</span>
                </button>
              </div>

              <div className="border-t border-stone-100 pt-1">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-between px-3.5 py-2 text-xs text-stone-500 hover:text-stone-800 hover:bg-stone-50 transition-colors"
                >
                  <span>FastAPI Backend Docs</span>
                  <ExternalLink className="w-3 h-3 text-stone-400" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

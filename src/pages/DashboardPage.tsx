import React from 'react';
import {
  Video,
  Film,
  FileText,
  Send,
  Plus,
  ArrowRight,
  TrendingUp,
  Clock,
  Sparkles,
  BarChart2,
  Calendar,
} from 'lucide-react';
import { Project } from '../types';
import { SAMPLE_PROJECTS, RECENT_ACTIVITIES, SAMPLE_ANALYTICS } from '../data/mockData';
import { NavigationPage } from '../components/layout/Sidebar';

interface DashboardPageProps {
  onNavigate: (page: NavigationPage) => void;
  onSelectProject: (project: Project) => void;
  activeProject: Project;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  onNavigate,
  onSelectProject,
  activeProject,
}) => {
  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-[#E7E3DC]">
        <div>
          <div className="flex items-center gap-2 text-xs text-stone-500 font-medium mb-1">
            <span>Solo Creator Studio</span>
            <span aria-hidden="true">·</span>
            <span>FastAPI Integration Ready</span>
          </div>
          <h1 className="text-2xl md:text-3xl text-stone-900 tracking-tight font-bold italic">
            &ldquo;Your creative studio, powered by AI.&rdquo;
          </h1>
          <p className="text-sm text-stone-600 mt-1">
            Turn 1 long-form video into high-retention clips, thumbnails, multi-platform captions, and scheduled posts.
          </p>
        </div>

        {/* Quick primary CTA */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigate('video-studio')}
            className="flex items-center gap-2 px-4 py-2 bg-[#721246] text-white hover:bg-[#5c0e38] text-xs font-semibold rounded-lg shadow-sm transition-colors whitespace-nowrap"
          >
            <Plus className="w-4 h-4 text-amber-300" />
            <span>Upload New Video</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Videos */}
        <div className="bg-white rounded-xl p-5 border border-[#E7E3DC] shadow-xs">
          <div className="flex items-center justify-between text-stone-500 text-xs font-medium">
            <span>Total Videos</span>
            <Video className="w-4 h-4 text-stone-400" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl md:text-3xl font-bold font-mono tabular-nums text-stone-900">
              14
            </span>
            <span className="text-xs text-stone-500 font-medium">master cuts</span>
          </div>
          <div className="mt-2 text-[11px] text-stone-500 flex items-center gap-1.5">
            <span className="text-emerald-700 font-medium">+2 this week</span>
            <span aria-hidden="true">·</span>
            <span>4 active in pipeline</span>
          </div>
        </div>

        {/* Clips Created */}
        <div className="bg-white rounded-xl p-5 border border-[#E7E3DC] shadow-xs">
          <div className="flex items-center justify-between text-stone-500 text-xs font-medium">
            <span>Clips Created</span>
            <Film className="w-4 h-4 text-stone-400" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl md:text-3xl font-bold font-mono tabular-nums text-stone-900">
              58
            </span>
            <span className="text-xs text-stone-500 font-medium">9:16 reels & shorts</span>
          </div>
          <div className="mt-2 text-[11px] text-stone-500 flex items-center gap-1.5">
            <span className="text-emerald-700 font-medium">4.1 avg / video</span>
            <span aria-hidden="true">·</span>
            <span>92% virality score avg</span>
          </div>
        </div>

        {/* Content Assets */}
        <div className="bg-white rounded-xl p-5 border border-[#E7E3DC] shadow-xs">
          <div className="flex items-center justify-between text-stone-500 text-xs font-medium">
            <span>Content Assets</span>
            <FileText className="w-4 h-4 text-stone-400" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl md:text-3xl font-bold font-mono tabular-nums text-stone-900">
              142
            </span>
            <span className="text-xs text-stone-500 font-medium">posts & captions</span>
          </div>
          <div className="mt-2 text-[11px] text-stone-500 flex items-center gap-1.5">
            <span>LinkedIn, YouTube, X, IG</span>
            <span aria-hidden="true">·</span>
            <span className="text-stone-600">3 languages</span>
          </div>
        </div>

        {/* Published Posts */}
        <div className="bg-white rounded-xl p-5 border border-[#E7E3DC] shadow-xs">
          <div className="flex items-center justify-between text-stone-500 text-xs font-medium">
            <span>Published Posts</span>
            <Send className="w-4 h-4 text-stone-400" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl md:text-3xl font-bold font-mono tabular-nums text-stone-900">
              84
            </span>
            <span className="text-xs text-stone-500 font-medium">live posts</span>
          </div>
          <div className="mt-2 text-[11px] text-stone-500 flex items-center gap-1.5">
            <span className="text-emerald-700 font-medium">+18 this month</span>
            <span aria-hidden="true">·</span>
            <span>12 scheduled</span>
          </div>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="bg-[#F4EFEA] rounded-2xl p-5 border border-[#E2DDD4]">
        <div className="text-xs font-semibold text-stone-600 uppercase tracking-wider mb-3">
          Quick Actions
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button
            onClick={() => onNavigate('video-studio')}
            className="flex items-center gap-3 p-3.5 bg-white hover:bg-stone-50 rounded-xl border border-[#E7E3DC] text-left transition-all hover:shadow-xs group"
          >
            <div className="w-9 h-9 rounded-lg bg-stone-100 flex items-center justify-center text-stone-700 group-hover:bg-[#721246] group-hover:text-amber-300 transition-colors shrink-0">
              <Video className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-stone-900">Upload Video</p>
              <p className="text-[11px] text-stone-500">Ingest MP4, MOV, WebM</p>
            </div>
          </button>

          <button
            onClick={() => onNavigate('clip-studio')}
            className="flex items-center gap-3 p-3.5 bg-white hover:bg-stone-50 rounded-xl border border-[#E7E3DC] text-left transition-all hover:shadow-xs group"
          >
            <div className="w-9 h-9 rounded-lg bg-stone-100 flex items-center justify-center text-stone-700 group-hover:bg-[#721246] group-hover:text-amber-300 transition-colors shrink-0">
              <Film className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-stone-900">Open Clip Studio</p>
              <p className="text-[11px] text-stone-500">Extract 9:16 highlights</p>
            </div>
          </button>

          <button
            onClick={() => onNavigate('content-studio')}
            className="flex items-center gap-3 p-3.5 bg-white hover:bg-stone-50 rounded-xl border border-[#E7E3DC] text-left transition-all hover:shadow-xs group"
          >
            <div className="w-9 h-9 rounded-lg bg-stone-100 flex items-center justify-center text-stone-700 group-hover:bg-[#721246] group-hover:text-amber-300 transition-colors shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-stone-900">Create Content</p>
              <p className="text-[11px] text-stone-500">Captions, copy & tags</p>
            </div>
          </button>

          <button
            onClick={() => onNavigate('analytics')}
            className="flex items-center gap-3 p-3.5 bg-white hover:bg-stone-50 rounded-xl border border-[#E7E3DC] text-left transition-all hover:shadow-xs group"
          >
            <div className="w-9 h-9 rounded-lg bg-stone-100 flex items-center justify-center text-stone-700 group-hover:bg-[#721246] group-hover:text-amber-300 transition-colors shrink-0">
              <BarChart2 className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-stone-900">View Analytics</p>
              <p className="text-[11px] text-stone-500">1.42M views & reach</p>
            </div>
          </button>
        </div>
      </div>

      {/* Main 2-Column Split: Recent Projects & Sidebar Activity / Content Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Recent Projects */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-stone-900">Recent Projects</h2>
              <p className="text-xs text-stone-500">Active and processed long-form video masters</p>
            </div>
            <button
              onClick={() => onNavigate('video-studio')}
              className="text-xs font-semibold text-stone-800 hover:text-stone-950 flex items-center gap-1 transition-colors"
            >
              <span>View all videos</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="bg-white rounded-xl border border-[#E7E3DC] shadow-xs overflow-hidden">
            <div className="divide-y divide-[#E7E3DC]">
              {SAMPLE_PROJECTS.map((project) => {
                const isActive = project.id === activeProject.id;
                return (
                  <div
                    key={project.id}
                    onClick={() => onSelectProject(project)}
                    className={`p-4 md:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-stone-50/80 transition-colors ${
                      isActive ? 'bg-amber-50/40' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3.5 min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-stone-100 flex items-center justify-center text-stone-700 shrink-0 mt-0.5 border border-stone-200">
                        <Video className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-semibold text-stone-900 truncate">
                            {project.title}
                          </h3>
                          {isActive && (
                            <span className="text-[10px] text-amber-800 font-medium">
                              (Active)
                            </span>
                          )}
                        </div>

                        {/* Unboxed metadata with typographic separators */}
                        <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 mt-1">
                          <span className="font-mono tabular-nums">{project.video.duration}</span>
                          <span aria-hidden="true">·</span>
                          <span>{project.video.resolution}</span>
                          <span aria-hidden="true">·</span>
                          <span className="capitalize">{project.status}</span>
                          <span aria-hidden="true">·</span>
                          <span>{project.video.uploadDate}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-stone-100">
                      <div className="text-right text-xs text-stone-500">
                        <span className="font-semibold text-stone-800 font-mono tabular-nums">
                          {project.clipCount}
                        </span>{' '}
                        clips ·{' '}
                        <span className="font-semibold text-stone-800 font-mono tabular-nums">
                          {project.thumbnailCount}
                        </span>{' '}
                        thumbnails
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProject(project);
                          onNavigate('clip-studio');
                        }}
                        className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#721246] hover:bg-[#5c0e38] rounded-md transition-colors whitespace-nowrap shadow-xs"
                      >
                        Open Studio
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Content Performance & Recent Activity */}
        <div className="space-y-6">
          {/* Content Performance Widget */}
          <div className="bg-white rounded-xl p-5 border border-[#E7E3DC] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-stone-900">Content Performance</h3>
                <p className="text-[11px] text-stone-500">Last 30 days aggregate across networks</p>
              </div>
              <button
                onClick={() => onNavigate('analytics')}
                className="text-stone-400 hover:text-stone-700 transition-colors"
                title="Full analytics"
              >
                <TrendingUp className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              {SAMPLE_ANALYTICS.platforms.map((p) => (
                <div key={p.platform} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="capitalize font-medium text-stone-700">{p.platform}</span>
                    <span className="font-mono tabular-nums font-semibold text-stone-900">
                      {p.views} views
                    </span>
                  </div>
                  <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        backgroundColor: p.color,
                        width: `${Math.round((p.viewsNumeric / 684200) * 100)}%`,
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-stone-400">
                    <span>{p.followersGained} net followers</span>
                    <span>{p.engagement} engagement</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => onNavigate('analytics')}
              className="w-full mt-2 py-2 text-xs font-semibold text-white bg-[#721246] hover:bg-[#5c0e38] rounded-lg shadow-xs transition-colors text-center"
            >
              Explore Audience Analytics
            </button>
          </div>

          {/* Recent Activity Log */}
          <div className="bg-white rounded-xl p-5 border border-[#E7E3DC] shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-stone-900">Recent Activity</h3>
              <Clock className="w-3.5 h-3.5 text-stone-400" />
            </div>

            <div className="space-y-3">
              {RECENT_ACTIVITIES.map((act) => (
                <div key={act.id} className="text-xs space-y-0.5">
                  <div className="flex items-center justify-between text-stone-800">
                    <span className="font-medium">{act.action}</span>
                    <span className="text-[10px] text-stone-400 font-mono tabular-nums">{act.time}</span>
                  </div>
                  <p className="text-[11px] text-stone-500 truncate">{act.target}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => onNavigate('distribution')}
              className="w-full py-2 flex items-center justify-center gap-1.5 text-xs font-semibold text-white bg-[#721246] hover:bg-[#5c0e38] rounded-lg shadow-xs transition-colors"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Open Distribution Schedule</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

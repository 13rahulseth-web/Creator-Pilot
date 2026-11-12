import React, { useState } from 'react';
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Filter,
  Plus,
  Clock,
  Send,
  Eye,
  CheckCircle2,
  Calendar as CalendarIcon,
  X,
  Share2,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { CalendarEvent, PlatformType } from '../types';
import { SAMPLE_CALENDAR_EVENTS } from '../data/mockData';
import { useToast } from '../components/common/Toast';
import { NavigationPage } from '../components/layout/Sidebar';

interface DistributionPageProps {
  onNavigate: (page: NavigationPage) => void;
}

export const DistributionPage: React.FC<DistributionPageProps> = ({ onNavigate }) => {
  const { showToast } = useToast();

  const [events, setEvents] = useState<CalendarEvent[]>(SAMPLE_CALENDAR_EVENTS);
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'week' | 'month'>('week');
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Event Form State
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventPlatform, setNewEventPlatform] = useState<PlatformType>('youtube');
  const [newEventDate, setNewEventDate] = useState('2026-11-18');
  const [newEventTime, setNewEventTime] = useState('11:00 AM');

  const filteredEvents = events.filter((ev) => {
    if (platformFilter === 'all') return true;
    return ev.platform === platformFilter;
  });

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventTitle.trim()) return;

    const newEv: CalendarEvent = {
      id: `cal_${Date.now()}`,
      projectId: 'proj_01',
      title: newEventTitle.trim(),
      platform: newEventPlatform,
      scheduledDate: newEventDate,
      scheduledTime: newEventTime,
      status: 'scheduled',
    };

    setEvents((prev) => [...prev, newEv]);
    setShowAddModal(false);
    setNewEventTitle('');
    showToast('Scheduled post added to calendar', newEv.title, 'success');
  };

  const getPlatformLabel = (platform: PlatformType) => {
    switch (platform) {
      case 'youtube':
        return 'YouTube Shorts';
      case 'instagram':
        return 'Instagram Reel';
      case 'linkedin':
        return 'LinkedIn Post';
      case 'twitter':
        return 'X Thread';
      default:
        return platform;
    }
  };

  const getStatusColor = (status: CalendarEvent['status']) => {
    switch (status) {
      case 'published':
        return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'scheduled':
        return 'text-amber-800 bg-amber-50 border-amber-200';
      case 'approved':
        return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'draft':
      default:
        return 'text-stone-600 bg-stone-100 border-stone-200';
    }
  };

  // Mock days for current week in November 2026
  const weekDays = [
    { dayName: 'Mon', date: '2026-11-09', dayNum: '09' },
    { dayName: 'Tue', date: '2026-11-10', dayNum: '10' },
    { dayName: 'Wed', date: '2026-11-11', dayNum: '11' },
    { dayName: 'Thu', date: '2026-11-12', dayNum: '12', isToday: true },
    { dayName: 'Fri', date: '2026-11-13', dayNum: '13' },
    { dayName: 'Sat', date: '2026-11-14', dayNum: '14' },
    { dayName: 'Sun', date: '2026-11-15', dayNum: '15' },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#E7E3DC]">
        <div>
          <div className="flex items-center gap-2 text-xs text-stone-500 font-medium mb-1">
            <span>Multi-Channel Distribution Engine</span>
            <span aria-hidden="true">·</span>
            <span>Sandbox Simulation</span>
          </div>
          <h1 className="text-2xl font-bold text-stone-900 tracking-tight">
            Distribution Calendar
          </h1>
          <p className="text-sm text-stone-600 mt-0.5">
            Automate release cadences across vertical platforms without manual copy-pasting.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#721246] text-white hover:bg-[#5c0e38] text-xs font-semibold rounded-lg shadow-sm transition-colors whitespace-nowrap"
          >
            <Plus className="w-4 h-4 text-amber-300" />
            <span>Schedule Slot</span>
          </button>
        </div>
      </div>

      {/* Sandbox Notice Banner */}
      <div className="bg-[#F6F3EE] rounded-xl p-4 border border-[#E4DFD6] flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="text-xs text-stone-700 leading-relaxed">
          <p className="font-semibold text-stone-900">
            Publishing Sandbox Mode Active
          </p>
          <p className="mt-0.5 text-stone-600">
            Social APIs (YouTube Data API v3, Meta Graph API, LinkedIn Community API) will authenticate directly via your connected creator accounts during the live sprint. All scheduling and drafting actions below are saved to your local studio workspace.
          </p>
        </div>
      </div>

      {/* Filter and View Mode Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-[#E7E3DC] shadow-xs">
        {/* Platform filter tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs font-semibold text-stone-400 mr-2 uppercase tracking-wider shrink-0">
            Platform:
          </span>
          {['all', 'youtube', 'instagram', 'linkedin', 'twitter'].map((p) => (
            <button
              key={p}
              onClick={() => setPlatformFilter(p)}
              data-active={platformFilter === p}
              className={`px-3 py-1.5 text-xs rounded-md capitalize font-medium transition-colors shrink-0 ${
                platformFilter === p
                  ? 'bg-[#721246] text-white shadow-xs active'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              {p === 'all' ? 'All Platforms' : p === 'twitter' ? 'X / Twitter' : p}
            </button>
          ))}
        </div>

        {/* Week / Month view toggle */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg text-xs font-medium">
            <button
              onClick={() => setViewMode('week')}
              data-active={viewMode === 'week'}
              className={`px-3 py-1 rounded transition-colors ${
                viewMode === 'week' ? 'bg-[#721246] text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Week View
            </button>
            <button
              onClick={() => setViewMode('month')}
              data-active={viewMode === 'month'}
              className={`px-3 py-1 rounded transition-colors ${
                viewMode === 'month' ? 'bg-[#721246] text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Month View
            </button>
          </div>
        </div>
      </div>

      {/* Week Calendar Grid */}
      <div className="bg-white rounded-2xl border border-[#E7E3DC] shadow-xs overflow-hidden">
        {/* Calendar Month Navigation Header */}
        <div className="p-4 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-base font-bold text-stone-900">November 2026</h2>
            <span className="text-xs font-mono text-stone-500">Week 46</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => showToast('Previous week', undefined, 'info')}
              className="p-1.5 rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-50"
              aria-label="Previous week"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => showToast('Next week', undefined, 'info')}
              className="p-1.5 rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-50"
              aria-label="Next week"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Day Columns */}
        <div className="grid grid-cols-1 md:grid-cols-7 divide-y md:divide-y-0 md:divide-x divide-stone-200 min-h-[480px]">
          {weekDays.map((day) => {
            const dayEvents = filteredEvents.filter((ev) => ev.scheduledDate === day.date);

            return (
              <div
                key={day.date}
                className={`p-3 space-y-3 flex flex-col ${
                  day.isToday ? 'bg-amber-50/20' : 'bg-transparent'
                }`}
              >
                {/* Day Header */}
                <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                  <span className="text-xs font-semibold text-stone-500 uppercase">
                    {day.dayName}
                  </span>
                  <span
                    className={`text-xs font-mono font-bold w-6 h-6 flex items-center justify-center rounded-full ${
                      day.isToday
                        ? 'bg-stone-900 text-amber-400'
                        : 'text-stone-800'
                    }`}
                  >
                    {day.dayNum}
                  </span>
                </div>

                {/* Day Scheduled Items */}
                <div className="space-y-2 flex-1">
                  {dayEvents.map((ev) => (
                    <div
                      key={ev.id}
                      onClick={() => setSelectedEvent(ev)}
                      className="p-2.5 rounded-xl border border-stone-200 bg-white hover:border-stone-400 hover:shadow-xs cursor-pointer transition-all space-y-1.5 group"
                    >
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="font-semibold text-stone-800">
                          {getPlatformLabel(ev.platform)}
                        </span>
                        <span className="font-mono text-stone-500">{ev.scheduledTime}</span>
                      </div>

                      <p className="text-xs font-medium text-stone-900 line-clamp-2 leading-snug group-hover:text-amber-800 transition-colors">
                        {ev.title}
                      </p>

                      <div className="pt-1 flex items-center justify-between">
                        <span
                          className={`text-[9px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded border ${getStatusColor(
                            ev.status
                          )}`}
                        >
                          {ev.status}
                        </span>
                        <Eye className="w-3 h-3 text-stone-400 group-hover:text-stone-700" />
                      </div>
                    </div>
                  ))}

                  {dayEvents.length === 0 && (
                    <div className="h-24 flex flex-col items-center justify-center border border-dashed border-stone-200 rounded-lg text-stone-400 text-[11px] p-2 text-center">
                      <span>No posts queued</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* EVENT DETAIL & PREVIEW MODAL */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full border border-stone-200 shadow-2xl p-6 space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono text-amber-700 uppercase tracking-wider font-bold">
                  {getPlatformLabel(selectedEvent.platform)} · Scheduled Release
                </span>
                <h3 className="text-base font-bold text-stone-900 mt-1">
                  {selectedEvent.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                className="text-stone-400 hover:text-stone-700 p-1"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 bg-stone-50 p-4 rounded-xl border border-stone-200 text-xs">
              <div className="flex items-center justify-between text-stone-600">
                <span>Release Date:</span>
                <span className="font-mono text-stone-900 font-semibold">{selectedEvent.scheduledDate}</span>
              </div>
              <div className="flex items-center justify-between text-stone-600">
                <span>Release Time:</span>
                <span className="font-mono text-stone-900 font-semibold">{selectedEvent.scheduledTime}</span>
              </div>
              <div className="flex items-center justify-between text-stone-600">
                <span>Status:</span>
                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${getStatusColor(selectedEvent.status)}`}>
                  {selectedEvent.status}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => {
                  setSelectedEvent(null);
                  onNavigate('content-studio');
                }}
                className="px-3.5 py-2 text-xs font-medium text-stone-700 hover:text-stone-900"
              >
                Edit in Content Studio
              </button>
              <button
                onClick={() => {
                  showToast('Post simulated publish', 'Release trigger dispatched in sandbox.', 'success');
                  setSelectedEvent(null);
                }}
                className="px-4 py-2 bg-[#721246] text-white hover:bg-[#5c0e38] text-xs font-semibold rounded-lg shadow-xs transition-colors"
              >
                Publish Now (Sandbox)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SCHEDULE NEW SLOT MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs animate-in fade-in duration-150">
          <form
            onSubmit={handleAddEvent}
            className="bg-white rounded-2xl max-w-md w-full border border-stone-200 shadow-2xl p-6 space-y-4"
          >
            <div className="flex items-start justify-between">
              <h3 className="text-base font-bold text-stone-900">Schedule Distribution Slot</h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-stone-400 hover:text-stone-700 p-1"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-stone-700 font-medium mb-1">Post Title</label>
                <input
                  type="text"
                  required
                  value={newEventTitle}
                  onChange={(e) => setNewEventTitle(e.target.value)}
                  placeholder="e.g. 3 AI Tools Replacing Boring SaaS"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:border-stone-400"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-medium mb-1">Platform</label>
                <select
                  value={newEventPlatform}
                  onChange={(e) => setNewEventPlatform(e.target.value as PlatformType)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:border-stone-400"
                >
                  <option value="youtube">YouTube Shorts</option>
                  <option value="instagram">Instagram Reel</option>
                  <option value="linkedin">LinkedIn Post</option>
                  <option value="twitter">X / Twitter Thread</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-medium mb-1">Date</label>
                  <input
                    type="date"
                    value={newEventDate}
                    onChange={(e) => setNewEventDate(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:border-stone-400 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-medium mb-1">Time</label>
                  <input
                    type="text"
                    value={newEventTime}
                    onChange={(e) => setNewEventTime(e.target.value)}
                    placeholder="10:00 AM"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:border-stone-400 font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-3 py-1.5 text-xs text-stone-600 hover:text-stone-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#721246] text-white text-xs font-semibold rounded-lg hover:bg-[#5c0e38] transition-colors"
              >
                Confirm Slot
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import {
  Film,
  Play,
  Pause,
  Download,
  Share2,
  Sliders,
  Sparkles,
  Smartphone,
  Eye,
  Check,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { Project, Clip, AspectRatioType, PlatformType } from '../types';
import { SAMPLE_CLIPS } from '../data/mockData';
import { useToast } from '../components/common/Toast';
import { NavigationPage } from '../components/layout/Sidebar';

interface ClipStudioPageProps {
  project: Project;
  onNavigate: (page: NavigationPage) => void;
}

export const ClipStudioPage: React.FC<ClipStudioPageProps> = ({
  project,
  onNavigate,
}) => {
  const { showToast } = useToast();

  const [clips, setClips] = useState<Clip[]>(SAMPLE_CLIPS);
  const [selectedClipId, setSelectedClipId] = useState<string>(SAMPLE_CLIPS[0].id);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedAspect, setSelectedAspect] = useState<AspectRatioType>('9:16');
  const [showCaptions, setShowCaptions] = useState(true);
  const [showSafeZones, setShowSafeZones] = useState(false);
  const [timelineZoom, setTimelineZoom] = useState(1);
  const [clipProgress, setClipProgress] = useState(35); // simulated percent

  const activeClip = clips.find((c) => c.id === selectedClipId) || clips[0];

  const handleExportClip = (clip: Clip) => {
    showToast(
      'Export queue initialized',
      `Clip "${clip.title}" queued for 1080x1920 MP4 rendering.`,
      'success'
    );
  };

  const getPlatformIcon = (platform: PlatformType) => {
    switch (platform) {
      case 'youtube':
        return <span className="font-semibold text-red-600">YT Shorts</span>;
      case 'instagram':
        return <span className="font-semibold text-pink-600">Reels</span>;
      case 'linkedin':
        return <span className="font-semibold text-blue-700">LinkedIn</span>;
      case 'twitter':
        return <span className="font-semibold text-sky-600">X Post</span>;
      default:
        return <span>{platform}</span>;
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#E7E3DC]">
        <div>
          <div className="flex items-center gap-2 text-xs text-stone-500 font-medium mb-1">
            <span>Autonomous Clipping Workspace</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums">{clips.length} AI Highlights Isolated</span>
          </div>
          <h1 className="text-2xl font-bold text-stone-900 tracking-tight">
            Clip Studio
          </h1>
          <p className="text-sm text-stone-600 mt-0.5">
            Review, fine-tune timestamps, and preview vertical 9:16 cuts tailored for viral short-form algorithms.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigate('thumbnail-studio')}
            className="flex items-center gap-2 px-4 py-2 bg-[#721246] text-white hover:bg-[#5c0e38] text-xs font-semibold rounded-lg shadow-sm transition-colors"
          >
            <span>Proceed to Thumbnails</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Studio Viewport: Clips List & Timeline on Left, 9:16 Vertical Phone Preview on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 7 Columns: Clip Selector & Interactive Timeline */}
        <div className="lg:col-span-7 space-y-6">
          {/* Active Clip Info Bar */}
          <div className="bg-white rounded-xl p-5 border border-[#E7E3DC] shadow-xs space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
                  <span className="font-mono text-stone-700 font-semibold">{activeClip.duration} duration</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums">{activeClip.startTime} - {activeClip.endTime}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-emerald-700 font-semibold font-mono tabular-nums">
                    Virality Score: {activeClip.viralityScore}%
                  </span>
                </div>
                <h2 className="text-base font-bold text-stone-900">{activeClip.title}</h2>
                <p className="text-xs text-stone-600 mt-1 italic leading-relaxed">
                  &ldquo;{activeClip.hook}&rdquo;
                </p>
              </div>

              <button
                onClick={() => handleExportClip(activeClip)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#721246] hover:bg-[#5c0e38] text-white text-xs font-semibold rounded-md transition-colors shrink-0 shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export MP4</span>
              </button>
            </div>
          </div>

          {/* Timeline Interface Component */}
          <div className="bg-white rounded-xl p-5 border border-[#E7E3DC] shadow-xs space-y-4">
            <div className="flex items-center justify-between text-xs font-bold text-stone-800">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-stone-500" />
                <span>Interactive Master Audio Timeline</span>
              </div>
              <div className="flex items-center gap-2 text-stone-500">
                <button
                  onClick={() => setTimelineZoom(Math.max(0.8, timelineZoom - 0.2))}
                  className="p-1 hover:text-stone-900 rounded"
                  title="Zoom out timeline"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="font-mono text-[11px] tabular-nums">{Math.round(timelineZoom * 100)}%</span>
                <button
                  onClick={() => setTimelineZoom(Math.min(1.8, timelineZoom + 0.2))}
                  className="p-1 hover:text-stone-900 rounded"
                  title="Zoom in timeline"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Timeline Ruler */}
            <div className="flex justify-between text-[10px] font-mono text-stone-400 px-1 border-b border-stone-100 pb-1">
              <span>00:00</span>
              <span>04:00</span>
              <span>08:00</span>
              <span>12:00</span>
              <span>16:00</span>
              <span>{project.video.duration}</span>
            </div>

            {/* Waveform & Highlight Bars */}
            <div className="relative h-20 bg-stone-900 rounded-lg p-2 overflow-hidden flex items-center">
              {/* Audio Waveform Simulation */}
              <div
                className="w-full flex items-center justify-between gap-0.5 h-12 px-2 transition-transform duration-150"
                style={{ transform: `scaleX(${timelineZoom})`, transformOrigin: 'left' }}
              >
                {Array.from({ length: 64 }).map((_, i) => {
                  const height = 15 + Math.sin(i * 0.4) * 25 + ((i % 5) * 8);
                  const isHighlighted = i >= 11 && i <= 16; // Simulated clip 1 range
                  return (
                    <div
                      key={i}
                      className={`w-1 rounded-full transition-colors ${
                        isHighlighted ? 'bg-amber-400' : 'bg-stone-700'
                      }`}
                      style={{ height: `${Math.min(48, Math.max(6, height))}px` }}
                    />
                  );
                })}
              </div>

              {/* Scrub Playhead Needle */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-amber-400 z-10 pointer-events-none flex flex-col items-center"
                style={{ left: `${clipProgress}%` }}
              >
                <div className="w-2.5 h-2.5 bg-amber-400 rotate-45 -mt-1 shadow-xs" />
              </div>

              {/* Active Clip Boundary Overlay */}
              <div
                className="absolute inset-y-1 bg-amber-400/20 border-x-2 border-amber-400 pointer-events-none flex items-center justify-between px-2 text-[10px] font-mono text-amber-200"
                style={{ left: '16%', width: '14%' }}
              >
                <span>[IN]</span>
                <span>[OUT]</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-stone-500 pt-1">
              <span className="font-mono tabular-nums">
                Current Playhead: {activeClip.startTime}
              </span>
              <span className="text-[11px]">Click any clip card below to jump to range</span>
            </div>
          </div>

          {/* List of Clip Cards */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-stone-900">Extracted Clip Candidates</h3>
              <span className="text-xs text-stone-500 font-mono">4 highlights detected</span>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {clips.map((clip, index) => {
                const isSelected = clip.id === selectedClipId;
                return (
                  <div
                    key={clip.id}
                    onClick={() => {
                      setSelectedClipId(clip.id);
                      setIsPlaying(true);
                      showToast(`Switched to clip ${index + 1}`, clip.title, 'info');
                    }}
                    className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-amber-50/50 border-amber-400 shadow-xs ring-1 ring-amber-400/20'
                        : 'bg-white border-[#E7E3DC] hover:border-stone-400 hover:bg-stone-50/60'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-stone-900">
                            Clip 0{index + 1}: {clip.title}
                          </span>
                        </div>

                        <p className="text-xs text-stone-600 line-clamp-2">
                          {clip.captionSnippet}
                        </p>

                        {/* Unboxed Metadata with Typographic Separators */}
                        <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 pt-1">
                          <span className="font-mono font-medium text-stone-800">{clip.duration}</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono tabular-nums">{clip.startTime} – {clip.endTime}</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono font-semibold text-emerald-700">
                            {clip.viralityScore}% Virality
                          </span>
                          <span aria-hidden="true">·</span>
                          <div className="flex items-center gap-1.5 text-[11px]">
                            {clip.platforms.map((p) => (
                              <span key={p} className="text-stone-600">
                                {getPlatformIcon(p)}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="shrink-0 flex flex-col items-end gap-2">
                        {isSelected && (
                          <span className="text-[11px] font-semibold text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded">
                            Active Preview
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right 5 Columns: 9:16 Vertical Smartphone Simulation */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-xl p-5 border border-[#E7E3DC] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-stone-900">Vertical Viewport (9:16)</h3>
                <p className="text-xs text-stone-500">Instagram Reels & YouTube Shorts frame</p>
              </div>

              {/* Aspect Ratio Switcher */}
              <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg text-xs font-medium">
                {(['9:16', '1:1', '16:9'] as AspectRatioType[]).map((aspect) => (
                  <button
                    key={aspect}
                    onClick={() => setSelectedAspect(aspect)}
                    data-active={selectedAspect === aspect}
                    className={`px-2 py-1 rounded transition-colors ${
                      selectedAspect === aspect
                        ? 'bg-[#721246] text-white shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {aspect}
                  </button>
                ))}
              </div>
            </div>

            {/* Smartphone Enclosure */}
            <div className="flex justify-center py-2">
              <div
                className={`w-full max-w-[280px] bg-stone-950 rounded-[36px] p-3 shadow-xl border-4 border-stone-800 relative transition-all duration-200 ${
                  selectedAspect === '9:16'
                    ? 'aspect-[9/16]'
                    : selectedAspect === '1:1'
                    ? 'aspect-square'
                    : 'aspect-video'
                }`}
              >
                {/* Phone Notch / Speaker Island */}
                <div className="absolute top-4 inset-x-0 mx-auto w-20 h-4 bg-stone-900 rounded-full z-30" />

                {/* Inner Screen Area */}
                <div className="w-full h-full rounded-[26px] bg-stone-900 overflow-hidden relative flex flex-col justify-between p-4 text-white">
                  {/* Background Mock Video Feed */}
                  <div className="absolute inset-0 bg-radial from-stone-800 via-stone-900 to-black opacity-95" />

                  {/* Speaker Face Simulation Silhouette */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                    <div className="w-40 h-56 rounded-full border border-dashed border-stone-400" />
                  </div>

                  {/* Safe Zone Grid Guide (Toggleable) */}
                  {showSafeZones && (
                    <div className="absolute inset-x-2 top-12 bottom-20 border border-emerald-400/40 rounded-lg pointer-events-none flex flex-col justify-between p-2 text-[9px] font-mono text-emerald-300">
                      <span>Header Safe Zone</span>
                      <span className="text-right">Action Safe Zone</span>
                    </div>
                  )}

                  {/* Top Bar inside Screen */}
                  <div className="relative z-20 flex items-center justify-between text-xs pt-4">
                    <span className="font-mono text-[10px] text-stone-400">
                      {activeClip.duration}
                    </span>
                    <span className="text-[10px] bg-stone-800/80 px-2 py-0.5 rounded text-amber-400 font-mono">
                      VIRAL 94%
                    </span>
                  </div>

                  {/* Dynamic Subtitle Captions Overlay */}
                  {showCaptions && (
                    <div className="relative z-20 my-auto text-center px-2">
                      <div className="inline-block bg-black/80 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10 shadow-lg">
                        <p className="text-xs font-extrabold uppercase tracking-wide text-amber-300 leading-snug drop-shadow-md">
                          &ldquo;{activeClip.hook}&rdquo;
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Bottom Platform Metadata inside Screen */}
                  <div className="relative z-20 space-y-2 pb-1">
                    <p className="text-xs font-bold text-white truncate drop-shadow-sm">
                      @rahulseth_builds
                    </p>
                    <p className="text-[11px] text-stone-300 line-clamp-2 leading-relaxed drop-shadow-sm">
                      {activeClip.title} — {project.title}
                    </p>
                    <div className="w-full bg-white/20 h-1 rounded-full overflow-hidden">
                      <div
                        className="bg-amber-400 h-full transition-all duration-300"
                        style={{ width: `${clipProgress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Viewport Display Toggles */}
            <div className="space-y-2 pt-2 border-t border-stone-100 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-stone-600">Dynamic Captions</span>
                <button
                  onClick={() => setShowCaptions(!showCaptions)}
                  className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                    showCaptions ? 'bg-amber-100 text-amber-900' : 'bg-stone-100 text-stone-600'
                  }`}
                >
                  {showCaptions ? 'Enabled' : 'Disabled'}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-stone-600">Reels / Shorts Safe Zones</span>
                <button
                  onClick={() => setShowSafeZones(!showSafeZones)}
                  className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                    showSafeZones ? 'bg-amber-100 text-amber-900' : 'bg-stone-100 text-stone-600'
                  }`}
                >
                  {showSafeZones ? 'Visible' : 'Hidden'}
                </button>
              </div>
            </div>

            {/* Next Step Nav */}
            <button
              onClick={() => onNavigate('thumbnail-studio')}
              className="w-full py-2.5 bg-[#721246] text-white hover:bg-[#5c0e38] text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              <span>Design Thumbnails in Thumbnail Studio</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

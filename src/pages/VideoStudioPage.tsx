import React, { useState } from 'react';
import {
  UploadCloud,
  FileVideo,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  RotateCcw,
  Sparkles,
  Info,
  CheckCircle2,
  Sliders,
  AlertCircle,
  X,
  Clock,
  HardDrive,
  Cpu,
} from 'lucide-react';
import { Project, VideoFile } from '../types';
import { useToast } from '../components/common/Toast';
import { NavigationPage } from '../components/layout/Sidebar';

interface VideoStudioPageProps {
  project: Project;
  onUpdateProject: (updated: Project) => void;
  onNavigate: (page: NavigationPage) => void;
}

const SUPPORTED_LANGUAGES = [
  'English (US)',
  'English (UK)',
  'Spanish (Español)',
  'French (Français)',
  'German (Deutsch)',
  'Hindi (हिन्दी)',
  'Japanese (日本語)',
  'Portuguese (Português)',
];

export const VideoStudioPage: React.FC<VideoStudioPageProps> = ({
  project,
  onUpdateProject,
  onNavigate,
}) => {
  const { showToast } = useToast();

  const [projectTitle, setProjectTitle] = useState(project.title);
  const [selectedLanguage, setSelectedLanguage] = useState(project.language);
  const [isDragging, setIsDragging] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(194); // 03:14 default marker
  const [isMuted, setIsMuted] = useState(false);
  const [showSprintModal, setShowSprintModal] = useState(false);

  const video = project.video;

  const handleTitleBlur = () => {
    if (projectTitle.trim() && projectTitle !== project.title) {
      onUpdateProject({ ...project, title: projectTitle.trim() });
      showToast('Project title updated', undefined, 'success');
    }
  };

  const handleLanguageChange = (lang: string) => {
    setSelectedLanguage(lang);
    onUpdateProject({ ...project, language: lang });
    showToast(`Language set to ${lang}`, undefined, 'info');
  };

  const handleSimulateUpload = (fileName: string, format: 'mp4' | 'mov' | 'webm') => {
    const updatedVideo: VideoFile = {
      id: `vid_${Date.now()}`,
      name: fileName,
      size: '1.24 GB',
      duration: '16:40',
      durationSeconds: 1000,
      resolution: '3840 x 2160 (4K UHD)',
      fps: 60,
      codec: 'ProRes 422 / H.265',
      audioChannels: 'Stereo (48.0 kHz 24-bit)',
      uploadDate: 'Just now',
      format,
    };

    onUpdateProject({
      ...project,
      title: fileName.replace(/\.[^/.]+$/, '').replace(/_/g, ' '),
      video: updatedVideo,
      status: 'draft',
    });
    setProjectTitle(fileName.replace(/\.[^/.]+$/, '').replace(/_/g, ' '));
    showToast('Video ingested successfully', 'File information updated.', 'success');
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      const extension = file.name.split('.').pop()?.toLowerCase();
      if (extension === 'mp4' || extension === 'mov' || extension === 'webm') {
        handleSimulateUpload(file.name, extension);
      } else {
        showToast('Unsupported format', 'Please upload MP4, MOV, or WebM files.', 'warning');
      }
    }
  };

  const formatSeconds = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const remaining = Math.floor(sec % 60);
    return `${mins.toString().padStart(2, '0')}:${remaining.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#E7E3DC]">
        <div>
          <div className="flex items-center gap-2 text-xs text-stone-500 font-medium mb-1">
            <span>Video Ingestion & Master Studio</span>
            <span aria-hidden="true">·</span>
            <span>Step 1 of 5</span>
          </div>
          <h1 className="text-2xl font-bold text-stone-900 tracking-tight">
            Video Studio
          </h1>
          <p className="text-sm text-stone-600 mt-0.5">
            Ingest your primary long-form master video to prepare for autonomous clipping and content generation.
          </p>
        </div>

        {/* Analyze Video CTA */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setShowSprintModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#721246] text-white hover:bg-[#5c0e38] text-xs font-semibold rounded-lg shadow-sm transition-colors"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Analyze Video with AI</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Upload & Preview on Left, Metadata & Config on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (7 cols): Upload Zone & Video Preview */}
        <div className="lg:col-span-7 space-y-6">
          {/* Drag & Drop Upload Area */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleFileDrop}
            className={`border-2 border-dashed rounded-2xl p-6 md:p-8 text-center transition-all bg-white ${
              isDragging
                ? 'border-amber-600 bg-amber-50/30'
                : 'border-stone-300 hover:border-stone-400'
            }`}
          >
            <div className="max-w-md mx-auto space-y-3">
              <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-700">
                <UploadCloud className="w-6 h-6 text-stone-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-stone-900">
                  Drag and drop your master video file here
                </p>
                <p className="text-xs text-stone-500 mt-1">
                  Upload high-resolution video for optimal 9:16 vertical crop quality
                </p>
              </div>

              {/* Format badges */}
              <div className="flex items-center justify-center gap-2 pt-1">
                <span className="text-[11px] font-mono px-2 py-0.5 bg-stone-100 rounded text-stone-600 border border-stone-200">
                  MP4
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 bg-stone-100 rounded text-stone-600 border border-stone-200">
                  MOV
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 bg-stone-100 rounded text-stone-600 border border-stone-200">
                  WebM
                </span>
                <span className="text-xs text-stone-400">· Max 8 GB</span>
              </div>

              {/* Sample files trigger */}
              <div className="pt-2">
                <label className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-medium rounded-lg transition-colors">
                  <FileVideo className="w-3.5 h-3.5 text-stone-600" />
                  <span>Choose local file</span>
                  <input
                    type="file"
                    accept="video/mp4,video/quicktime,video/webm"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        const file = e.target.files[0];
                        const ext = file.name.split('.').pop()?.toLowerCase();
                        handleSimulateUpload(
                          file.name,
                          (ext === 'mov' ? 'mov' : ext === 'webm' ? 'webm' : 'mp4')
                        );
                      }
                    }}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Video Preview Player */}
          <div className="bg-white rounded-2xl border border-[#E7E3DC] shadow-xs overflow-hidden">
            <div className="p-4 border-b border-stone-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-stone-800">Master Player Preview</span>
                <span className="text-[11px] text-stone-400">· 16:9 Landscape Source</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 bg-stone-100 text-stone-600 rounded">
                {video.resolution}
              </span>
            </div>

            {/* Video Canvas Simulation */}
            <div className="relative aspect-video bg-stone-950 flex items-center justify-center group overflow-hidden">
              {/* Studio Backdrop Graphic */}
              <div className="absolute inset-0 bg-radial from-stone-800 to-stone-950 opacity-90" />
              
              {/* Mock Video Scene */}
              <div className="relative z-10 text-center px-6">
                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mx-auto mb-3 text-white transition-transform group-hover:scale-110">
                  <Play className="w-7 h-7 fill-white translate-x-0.5" />
                </div>
                <p className="text-sm font-semibold text-stone-100 tracking-tight">
                  {video.name}
                </p>
                <p className="text-xs text-stone-400 mt-1 max-w-sm mx-auto">
                  Master timestamp: {formatSeconds(currentTime)} / {video.duration}
                </p>
              </div>

              {/* 9:16 Crop Guide Overlay indicator */}
              <div className="absolute inset-y-0 w-1/3 border-x border-amber-400/40 pointer-events-none flex items-center justify-center">
                <span className="text-[10px] font-mono text-amber-300/80 bg-stone-900/80 px-2 py-0.5 rounded">
                  9:16 Safe Crop Zone
                </span>
              </div>

              {/* Bottom Player Controls */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-transparent p-4 z-20 space-y-2">
                {/* Scrub bar */}
                <div className="flex items-center gap-2 text-stone-300 text-xs font-mono">
                  <span className="text-[11px]">{formatSeconds(currentTime)}</span>
                  <input
                    type="range"
                    min="0"
                    max={video.durationSeconds}
                    value={currentTime}
                    onChange={(e) => setCurrentTime(Number(e.target.value))}
                    className="flex-1 h-1 bg-stone-700 accent-amber-500 rounded-lg cursor-pointer"
                  />
                  <span className="text-[11px] text-stone-400">{video.duration}</span>
                </div>

                {/* Buttons Row */}
                <div className="flex items-center justify-between text-stone-300">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-1.5 hover:text-white transition-colors"
                      aria-label={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => setCurrentTime(0)}
                      className="p-1.5 hover:text-white transition-colors"
                      title="Restart video"
                      aria-label="Restart video"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="p-1.5 hover:text-white transition-colors"
                      aria-label={isMuted ? 'Unmute' : 'Mute'}
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                  </div>

                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-stone-400 text-[11px] font-mono">60 FPS</span>
                    <button
                      onClick={() => showToast('Fullscreen preview activated', undefined, 'info')}
                      className="p-1.5 hover:text-white transition-colors"
                      aria-label="Maximize video"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): File Info Card, Title & Language */}
        <div className="lg:col-span-5 space-y-6">
          {/* Project Title Field */}
          <div className="bg-white rounded-xl p-5 border border-[#E7E3DC] shadow-xs space-y-3">
            <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider">
              Project Title
            </label>
            <input
              type="text"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              onBlur={handleTitleBlur}
              placeholder="e.g. Building a $50k/mo Micro-SaaS Solo"
              className="w-full px-3.5 py-2.5 text-sm font-semibold text-stone-900 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-stone-400 focus:bg-white transition-colors"
            />
            <p className="text-[11px] text-stone-500">
              Used across generated clips, YouTube chapter titles, and social campaign drafts.
            </p>
          </div>

          {/* Primary Language Selector */}
          <div className="bg-white rounded-xl p-5 border border-[#E7E3DC] shadow-xs space-y-3">
            <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider">
              Source Language
            </label>
            <div className="relative">
              <select
                value={selectedLanguage}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs font-medium text-stone-800 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-stone-400 focus:bg-white transition-colors appearance-none cursor-pointer"
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-stone-500 text-xs">
                ▼
              </div>
            </div>
            <p className="text-[11px] text-stone-500">
              Whisper speech recognition model aligns multilingual word-level timestamps.
            </p>
          </div>

          {/* File Information Card */}
          <div className="bg-white rounded-xl p-5 border border-[#E7E3DC] shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-stone-500" />
                <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                  File Ingestion Specs
                </h3>
              </div>
              <span className="text-[11px] text-emerald-700 font-medium">Valid Master</span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between text-stone-600">
                <span>File Name</span>
                <span className="font-mono text-stone-900 font-medium truncate max-w-[200px]" title={video.name}>
                  {video.name}
                </span>
              </div>

              <div className="flex items-center justify-between text-stone-600">
                <span>File Size</span>
                <span className="font-mono tabular-nums text-stone-900 font-medium">{video.size}</span>
              </div>

              <div className="flex items-center justify-between text-stone-600">
                <span>Master Duration</span>
                <span className="font-mono tabular-nums text-stone-900 font-medium">{video.duration}</span>
              </div>

              <div className="flex items-center justify-between text-stone-600">
                <span>Source Resolution</span>
                <span className="font-mono tabular-nums text-stone-900 font-medium">{video.resolution}</span>
              </div>

              <div className="flex items-center justify-between text-stone-600">
                <span>Frame Rate</span>
                <span className="font-mono tabular-nums text-stone-900 font-medium">{video.fps} FPS</span>
              </div>

              <div className="flex items-center justify-between text-stone-600">
                <span>Video Codec</span>
                <span className="font-mono text-stone-900 font-medium">{video.codec}</span>
              </div>

              <div className="flex items-center justify-between text-stone-600">
                <span>Audio Stream</span>
                <span className="font-mono text-stone-900 font-medium">{video.audioChannels}</span>
              </div>
            </div>

            {/* Pipeline Readiness */}
            <div className="pt-3 border-t border-stone-100">
              <div className="flex items-center gap-2 text-xs text-stone-600">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Audio stream and keyframes ready for autonomous clipping</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SPRINT AI PLACEHOLDER MODAL (Strict requirement from Section 6) */}
      {showSprintModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-stone-200 shadow-2xl p-6 md:p-7 space-y-6">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-stone-900">
                    AI Integration Coming During Live Sprint
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    FastAPI autonomous orchestration pipeline
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowSprintModal(false)}
                className="text-stone-400 hover:text-stone-700 transition-colors p-1"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Pipeline Details */}
            <div className="space-y-3 bg-[#FAF8F5] p-4 rounded-xl border border-[#E7E3DC] text-xs text-stone-700">
              <p className="font-medium text-stone-900">
                During the hackathon live sprint, clicking &ldquo;Analyze Video&rdquo; triggers:
              </p>
              <ul className="space-y-2 text-stone-600">
                <li className="flex items-start gap-2">
                  <span className="font-mono text-stone-400">01.</span>
                  <span><strong>Whisper Audio Transcription</strong>: Word-level timestamps & speech density indexing.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono text-stone-400">02.</span>
                  <span><strong>Saliency & Face Tracking</strong>: Dynamic 9:16 smart pan-and-scan camera centering.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono text-stone-400">03.</span>
                  <span><strong>Highlight Extraction</strong>: Semantic hook scoring & virality retention ranking.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono text-stone-400">04.</span>
                  <span><strong>Multi-Asset Generation</strong>: 3 thumbnails + platform-native captions.</span>
                </li>
              </ul>
            </div>

            {/* Note & Action Buttons */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs text-stone-500">
                <Info className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                <span>We have pre-loaded static demo clips and thumbnails for you to explore.</span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setShowSprintModal(false)}
                  className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors"
                >
                  Stay on Ingestion
                </button>
                <button
                  onClick={() => {
                    setShowSprintModal(false);
                    onNavigate('clip-studio');
                  }}
                  className="px-4 py-2 text-xs font-semibold bg-[#721246] text-white hover:bg-[#5c0e38] rounded-lg transition-colors shadow-xs"
                >
                  Explore Demo in Clip Studio →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

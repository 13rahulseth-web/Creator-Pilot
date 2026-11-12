import React, { useState } from 'react';
import {
  Image as ImageIcon,
  Check,
  Download,
  Copy,
  Sparkles,
  Layers,
  Eye,
  Sliders,
  Maximize2,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { Project, Thumbnail } from '../types';
import { SAMPLE_THUMBNAILS } from '../data/mockData';
import { useToast } from '../components/common/Toast';
import { NavigationPage } from '../components/layout/Sidebar';

interface ThumbnailStudioPageProps {
  project: Project;
  onNavigate: (page: NavigationPage) => void;
}

const SUGGESTED_HEADLINES = [
  'I REPLACED MY TEAM WITH 1 VIDEO',
  'THE SOLO CREATOR STACK 2026',
  'STOP MAKING 100 SHORT REELS',
  '$50K/MO AS A 1-PERSON FOUNDER',
  'HOW I SHIP 20 ASSETS IN 30 MINS',
];

export const ThumbnailStudioPage: React.FC<ThumbnailStudioPageProps> = ({
  project,
  onNavigate,
}) => {
  const { showToast } = useToast();

  const [thumbnails, setThumbnails] = useState<Thumbnail[]>(SAMPLE_THUMBNAILS);
  const [selectedThumbId, setSelectedThumbId] = useState<string>(SAMPLE_THUMBNAILS[0].id);
  const [customHeadline, setCustomHeadline] = useState('');

  const activeThumb = thumbnails.find((t) => t.id === selectedThumbId) || thumbnails[0];

  const handleSelectThumbnail = (id: string) => {
    setSelectedThumbId(id);
    setThumbnails((prev) =>
      prev.map((t) => ({
        ...t,
        isSelected: t.id === id,
      }))
    );
    showToast('Thumbnail variation selected', undefined, 'success');
  };

  const handleApplyHeadline = (headline: string) => {
    setThumbnails((prev) =>
      prev.map((t) => (t.id === selectedThumbId ? { ...t, headline } : t))
    );
    showToast('Applied headline to active thumbnail', headline, 'info');
  };

  const handleExportThumbnail = () => {
    showToast(
      'Thumbnail Exported',
      `High-res 1280x720 JPEG generated with color profile sRGB.`,
      'success'
    );
  };

  // Render High-Fidelity SVG Graphic Mockups for Thumbnails
  const renderThumbnailPreview = (thumb: Thumbnail) => {
    if (thumb.theme === 'bold_contrast') {
      return (
        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-stone-900 border border-stone-800 shadow-md flex items-center justify-between p-6 select-none">
          {/* Radial Studio Backlight */}
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-600/30 via-stone-900 to-stone-950" />
          
          {/* Left Text Block */}
          <div className="relative z-10 max-w-[65%] space-y-2">
            <span className="inline-block bg-amber-400 text-stone-950 font-black text-[11px] md:text-xs tracking-wider uppercase px-2 py-0.5 rounded">
              2026 PLAYBOOK
            </span>
            <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-white leading-tight tracking-tight uppercase drop-shadow-lg">
              {thumb.headline}
            </h3>
            <p className="text-xs md:text-sm font-bold text-amber-200">
              {thumb.subheadline}
            </p>
          </div>

          {/* Right Silhouette / Graphic Representation */}
          <div className="relative z-10 w-28 md:w-36 h-full flex flex-col items-center justify-end">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-b from-stone-200 to-stone-400 border-2 border-amber-400/80 shadow-2xl flex items-end justify-center overflow-hidden">
              {/* Creator Icon Silhouette */}
              <div className="w-16 h-20 bg-stone-900 rounded-t-full" />
            </div>
            <div className="mt-1 bg-black/80 px-2 py-0.5 rounded text-[10px] font-mono text-amber-300">
              SOLO CREATOR
            </div>
          </div>

          {/* Corner Resolution Watermark */}
          <span className="absolute bottom-2 right-2 text-[10px] font-mono text-stone-500 bg-stone-950/80 px-1.5 py-0.5 rounded">
            1280 × 720
          </span>
        </div>
      );
    }

    if (thumb.theme === 'minimal_split') {
      return (
        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-stone-950 border border-stone-800 shadow-md flex select-none">
          {/* Left Split: Emerald Accent Metric */}
          <div className="w-1/2 bg-stone-900/90 p-5 flex flex-col justify-between border-r border-stone-800 relative">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">
                Financial Blueprint
              </span>
              <h3 className="text-lg md:text-xl font-black text-white leading-tight uppercase">
                {thumb.headline}
              </h3>
            </div>
            <div className="bg-emerald-500/10 border border-emerald-500/30 p-2.5 rounded-lg">
              <span className="text-xl md:text-2xl font-black font-mono text-emerald-400">$50,000</span>
              <p className="text-[10px] text-stone-300">Monthly Solo Revenue</p>
            </div>
          </div>

          {/* Right Split: Architecture Blueprint Mockup */}
          <div className="w-1/2 bg-[#121214] p-5 flex flex-col justify-between items-center text-center">
            <span className="text-[10px] font-mono text-stone-400 uppercase">1 Video → 14 Assets</span>
            <div className="w-16 h-16 rounded-xl bg-stone-800 border border-stone-700 flex items-center justify-center text-amber-400">
              <Layers className="w-8 h-8" />
            </div>
            <p className="text-xs font-bold text-stone-200">{thumb.subheadline}</p>
          </div>
        </div>
      );
    }

    // Cinematic Dark Variation
    return (
      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-[#0A0A0C] border border-stone-800 shadow-md flex flex-col justify-between p-6 select-none">
        {/* Cinematic Flare */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-rose-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-sky-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex items-center justify-between">
          <span className="bg-rose-600 text-white font-extrabold text-[10px] uppercase px-2 py-0.5 rounded tracking-widest">
            WARNING
          </span>
          <span className="text-[10px] font-mono text-stone-400">CTR OPTIMIZED</span>
        </div>

        <div className="relative z-10 my-auto">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-white tracking-tight uppercase leading-none drop-shadow-xl">
            {thumb.headline}
          </h3>
          <p className="text-xs md:text-sm font-semibold text-sky-400 mt-2">
            {thumb.subheadline}
          </p>
        </div>

        <div className="relative z-10 flex items-center justify-between text-[11px] text-stone-400 border-t border-stone-800/80 pt-2">
          <span>Autonomous Studio Model</span>
          <span className="font-mono text-rose-400">High Tension Concept</span>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#E7E3DC]">
        <div>
          <div className="flex items-center gap-2 text-xs text-stone-500 font-medium mb-1">
            <span>Visual Concept & Thumbnail Studio</span>
            <span aria-hidden="true">·</span>
            <span>3 Layout Compositions</span>
          </div>
          <h1 className="text-2xl font-bold text-stone-900 tracking-tight">
            Thumbnail Studio
          </h1>
          <p className="text-sm text-stone-600 mt-0.5">
            Compare algorithmic visual arrangements, evaluate contrast ratings, and test suggested high-CTR headlines.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleExportThumbnail}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-[#721246] hover:bg-[#5c0e38] text-white text-xs font-semibold rounded-lg transition-colors shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PNG</span>
          </button>
          <button
            onClick={() => onNavigate('content-studio')}
            className="flex items-center gap-2 px-4 py-2 bg-[#721246] text-white hover:bg-[#5c0e38] text-xs font-semibold rounded-lg shadow-sm transition-colors"
          >
            <span>Proceed to Content Studio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Grid: Gallery & Variations on Left, Composition Metrics & Headlines on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 7 Columns: Thumbnail Variations Gallery */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-stone-900">
              Sample Thumbnail Variations ({thumbnails.length})
            </h2>
            <span className="text-xs text-stone-500 font-mono">16:9 Landscape Aspect</span>
          </div>

          <div className="space-y-6">
            {thumbnails.map((thumb) => {
              const isSelected = thumb.id === selectedThumbId;
              return (
                <div
                  key={thumb.id}
                  onClick={() => handleSelectThumbnail(thumb.id)}
                  className={`bg-white rounded-2xl p-5 border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-amber-500 shadow-md ring-2 ring-amber-500/20'
                      : 'border-[#E7E3DC] hover:border-stone-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-stone-900">
                        {thumb.variationLabel}: {thumb.styleName}
                      </span>
                      {isSelected && (
                        <span className="text-[11px] font-semibold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                          Selected for Master
                        </span>
                      )}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectThumbnail(thumb.id);
                      }}
                      className={`p-1.5 rounded-full transition-colors ${
                        isSelected
                          ? 'bg-[#721246] text-white'
                          : 'bg-stone-100 text-stone-400 hover:text-stone-700'
                      }`}
                      aria-label="Select thumbnail"
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Render Thumbnail Visual Canvas */}
                  {renderThumbnailPreview(thumb)}

                  {/* Unboxed Metadata Footer */}
                  <div className="flex flex-wrap items-center justify-between text-xs text-stone-500 mt-4 pt-3 border-t border-stone-100">
                    <div className="flex items-center gap-2">
                      <span>{thumb.visualComposition.contrastRatio.split(' ')[0]} Contrast</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono tabular-nums">
                        {thumb.visualComposition.ruleOfThirdsScore}% Rule of Thirds
                      </span>
                    </div>

                    <span className="text-stone-600 text-[11px]">
                      {thumb.visualComposition.focalPoint}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 5 Columns: Visual Composition Diagnostics & Headline Suggestions */}
        <div className="lg:col-span-5 space-y-6">
          {/* Visual Composition Diagnostics Card */}
          <div className="bg-white rounded-xl p-5 border border-[#E7E3DC] shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                Composition Diagnostics
              </h3>
              <span className="text-xs text-amber-800 font-semibold">
                {activeThumb.variationLabel}
              </span>
            </div>

            <div className="space-y-3.5 text-xs">
              <div>
                <div className="flex items-center justify-between text-stone-600 mb-1">
                  <span>Rule of Thirds Alignment</span>
                  <span className="font-mono font-bold text-stone-900 tabular-nums">
                    {activeThumb.visualComposition.ruleOfThirdsScore}%
                  </span>
                </div>
                <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-600 h-full rounded-full"
                    style={{ width: `${activeThumb.visualComposition.ruleOfThirdsScore}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between py-1 border-t border-stone-100">
                <span className="text-stone-600">Contrast Ratio</span>
                <span className="font-mono font-medium text-stone-900">
                  {activeThumb.visualComposition.contrastRatio}
                </span>
              </div>

              <div className="flex items-center justify-between py-1 border-t border-stone-100">
                <span className="text-stone-600">Text Readability</span>
                <span className="font-mono font-medium text-stone-900">
                  {activeThumb.visualComposition.textReadabilityIndex}
                </span>
              </div>

              <div className="flex items-start justify-between py-1 border-t border-stone-100">
                <span className="text-stone-600 shrink-0 mr-2">Focal Point</span>
                <span className="font-medium text-stone-800 text-right">
                  {activeThumb.visualComposition.focalPoint}
                </span>
              </div>
            </div>
          </div>

          {/* Suggested Headline Placeholders */}
          <div className="bg-white rounded-xl p-5 border border-[#E7E3DC] shadow-xs space-y-4">
            <div>
              <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                Suggested High-CTR Headlines
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Click to apply directly to the selected thumbnail layout
              </p>
            </div>

            <div className="space-y-2">
              {SUGGESTED_HEADLINES.map((h, i) => (
                <button
                  key={i}
                  onClick={() => handleApplyHeadline(h)}
                  className="w-full p-2.5 rounded-lg bg-stone-50 hover:bg-stone-100 border border-stone-200 text-left text-xs font-bold text-stone-800 transition-colors flex items-center justify-between group"
                >
                  <span className="truncate pr-2">{h}</span>
                  <Copy className="w-3.5 h-3.5 text-stone-400 group-hover:text-stone-700 shrink-0" />
                </button>
              ))}
            </div>

            {/* Custom Headline Input */}
            <div className="pt-2 border-t border-stone-100 space-y-2">
              <label className="text-[11px] font-semibold text-stone-600">
                Custom Headline Override
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={customHeadline}
                  onChange={(e) => setCustomHeadline(e.target.value)}
                  placeholder="Enter custom thumbnail text..."
                  className="flex-1 px-3 py-1.5 text-xs text-stone-900 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-stone-400"
                />
                <button
                  onClick={() => {
                    if (customHeadline.trim()) {
                      handleApplyHeadline(customHeadline.toUpperCase());
                      setCustomHeadline('');
                    }
                  }}
                  className="px-3.5 py-1.5 bg-[#721246] text-white text-xs font-semibold rounded-lg hover:bg-[#5c0e38] transition-colors"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>

          {/* Next Step Nav */}
          <button
            onClick={() => onNavigate('content-studio')}
            className="w-full py-2.5 bg-[#721246] text-white hover:bg-[#5c0e38] text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs"
          >
            <span>Proceed to Content & Captions Studio</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

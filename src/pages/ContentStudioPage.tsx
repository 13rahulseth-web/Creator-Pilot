import React, { useState } from 'react';
import {
  FileText,
  Copy,
  Check,
  Globe,
  Hash,
  Share2,
  Calendar,
  Sparkles,
  ArrowRight,
  Eye,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react';
import { Project, ContentAsset, PlatformType } from '../types';
import { SAMPLE_CONTENT_ASSETS } from '../data/mockData';
import { useToast } from '../components/common/Toast';
import { NavigationPage } from '../components/layout/Sidebar';

interface ContentStudioPageProps {
  project: Project;
  onNavigate: (page: NavigationPage) => void;
}

const PLATFORM_LIMITS: Record<PlatformType, number> = {
  instagram: 2200,
  youtube: 5000,
  linkedin: 3000,
  twitter: 280,
};

export const ContentStudioPage: React.FC<ContentStudioPageProps> = ({
  project,
  onNavigate,
}) => {
  const { showToast } = useToast();

  const [selectedPlatform, setSelectedPlatform] = useState<PlatformType>('instagram');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('English (US)');
  const [previewPlatform, setPreviewPlatform] = useState<'instagram' | 'youtube' | 'linkedin'>('instagram');

  // Editable content asset state per platform
  const [assets, setAssets] = useState<Record<string, ContentAsset>>(SAMPLE_CONTENT_ASSETS);

  const currentAsset = assets[selectedPlatform] || assets.instagram;

  const handleCaptionChange = (val: string) => {
    setAssets((prev) => ({
      ...prev,
      [selectedPlatform]: {
        ...prev[selectedPlatform],
        caption: val,
        characterCount: val.length,
      },
    }));
  };

  const handleTitleChange = (val: string) => {
    setAssets((prev) => ({
      ...prev,
      [selectedPlatform]: {
        ...prev[selectedPlatform],
        title: val,
      },
    }));
  };

  const handleCopyCaption = () => {
    const fullText = `${currentAsset.caption}\n\n${currentAsset.hashtags.join(' ')}`;
    navigator.clipboard.writeText(fullText);
    showToast('Copied to clipboard', 'Caption & hashtags ready to paste.', 'success');
  };

  const handleAddHashtag = (tag: string) => {
    if (!currentAsset.hashtags.includes(tag)) {
      setAssets((prev) => ({
        ...prev,
        [selectedPlatform]: {
          ...prev[selectedPlatform],
          hashtags: [...prev[selectedPlatform].hashtags, tag],
        },
      }));
      showToast('Hashtag added', tag, 'info');
    }
  };

  const handleRemoveHashtag = (tagToRemove: string) => {
    setAssets((prev) => ({
      ...prev,
      [selectedPlatform]: {
        ...prev[selectedPlatform],
        hashtags: prev[selectedPlatform].hashtags.filter((t) => t !== tagToRemove),
      },
    }));
  };

  const charCount = currentAsset.caption.length;
  const limit = PLATFORM_LIMITS[selectedPlatform];
  const isNearLimit = charCount > limit * 0.9;
  const isOverLimit = charCount > limit;

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#E7E3DC]">
        <div>
          <div className="flex items-center gap-2 text-xs text-stone-500 font-medium mb-1">
            <span>Multi-Channel Copy & Captions Studio</span>
            <span aria-hidden="true">·</span>
            <span>Platform-Native Formatting</span>
          </div>
          <h1 className="text-2xl font-bold text-stone-900 tracking-tight">
            Content Studio
          </h1>
          <p className="text-sm text-stone-600 mt-0.5">
            Refine platform-tailored copy, manage character constraints, and preview live layouts for Instagram, YouTube, and LinkedIn.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleCopyCaption}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-[#721246] hover:bg-[#5c0e38] text-white text-xs font-semibold rounded-lg transition-colors shadow-xs"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Copy Full Post</span>
          </button>
          <button
            onClick={() => onNavigate('distribution')}
            className="flex items-center gap-2 px-4 py-2 bg-[#721246] text-white hover:bg-[#5c0e38] text-xs font-semibold rounded-lg shadow-sm transition-colors"
          >
            <span>Proceed to Distribution</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Grid: Editor on Left, Live Social Previews on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 7 Columns: Caption & Title Editor */}
        <div className="lg:col-span-7 space-y-6">
          {/* Platform and Language Selectors */}
          <div className="bg-white rounded-xl p-4 border border-[#E7E3DC] shadow-xs flex flex-wrap items-center justify-between gap-3">
            {/* Platform Selector Buttons */}
            <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg text-xs font-medium">
              {(['instagram', 'youtube', 'linkedin', 'twitter'] as PlatformType[]).map(
                (plat) => (
                  <button
                    key={plat}
                    onClick={() => {
                      setSelectedPlatform(plat);
                      if (plat === 'instagram' || plat === 'youtube' || plat === 'linkedin') {
                        setPreviewPlatform(plat);
                      }
                    }}
                    data-active={selectedPlatform === plat}
                    className={`px-3 py-1.5 rounded capitalize transition-colors ${
                      selectedPlatform === plat
                        ? 'bg-[#721246] text-white shadow-xs font-semibold'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {plat === 'twitter' ? 'X / Twitter' : plat}
                  </button>
                )
              )}
            </div>

            {/* Language Selector */}
            <div className="flex items-center gap-2 text-xs">
              <Globe className="w-3.5 h-3.5 text-stone-500" />
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="bg-stone-50 border border-stone-200 text-stone-800 rounded-md px-2 py-1 focus:outline-none focus:border-stone-400"
              >
                <option value="English (US)">English (US)</option>
                <option value="Spanish (Español)">Spanish (Español)</option>
                <option value="French (Français)">French (Français)</option>
              </select>
            </div>
          </div>

          {/* Post Title Field */}
          <div className="bg-white rounded-xl p-5 border border-[#E7E3DC] shadow-xs space-y-2">
            <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider">
              Post Title / Header Hook
            </label>
            <input
              type="text"
              value={currentAsset.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full px-3.5 py-2 text-sm font-semibold text-stone-900 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-stone-400 focus:bg-white"
            />
          </div>

          {/* Caption Editor */}
          <div className="bg-white rounded-xl p-5 border border-[#E7E3DC] shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider">
                Platform Caption & Description
              </label>

              {/* Character Counter */}
              <div className="flex items-center gap-1.5 text-xs font-mono">
                <span
                  className={`font-semibold tabular-nums ${
                    isOverLimit
                      ? 'text-rose-600 font-bold'
                      : isNearLimit
                      ? 'text-amber-600'
                      : 'text-stone-500'
                  }`}
                >
                  {charCount}
                </span>
                <span className="text-stone-400">/</span>
                <span className="text-stone-400 tabular-nums">{limit}</span>
                {isOverLimit && (
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600 ml-1" />
                )}
              </div>
            </div>

            <textarea
              rows={9}
              value={currentAsset.caption}
              onChange={(e) => handleCaptionChange(e.target.value)}
              className="w-full p-3.5 text-xs text-stone-900 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-stone-400 focus:bg-white font-sans leading-relaxed resize-y"
              placeholder="Write or refine caption..."
            />

            <div className="flex items-center justify-between text-xs text-stone-500 pt-1">
              <span>Optimized for algorithmic discovery & audience retention</span>
              <button
                onClick={handleCopyCaption}
                className="text-stone-800 hover:text-stone-950 font-semibold flex items-center gap-1"
              >
                <Copy className="w-3 h-3" />
                <span>Copy Caption</span>
              </button>
            </div>
          </div>

          {/* Hashtag Management Section */}
          <div className="bg-white rounded-xl p-5 border border-[#E7E3DC] shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Hash className="w-4 h-4 text-stone-500" />
                <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                  Targeted Hashtags
                </h3>
              </div>
              <span className="text-xs text-stone-500 font-mono">
                {currentAsset.hashtags.length} tags attached
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {currentAsset.hashtags.map((tag) => (
                <span
                  key={tag}
                  onClick={() => handleRemoveHashtag(tag)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-stone-100 hover:bg-rose-50 hover:text-rose-700 text-stone-700 text-xs rounded-md font-mono cursor-pointer transition-colors"
                  title="Click to remove tag"
                >
                  <span>{tag}</span>
                  <span className="text-stone-400 hover:text-rose-700 text-[10px]">×</span>
                </span>
              ))}
            </div>

            {/* Quick add common tags */}
            <div className="pt-2 border-t border-stone-100 flex items-center gap-2 text-xs">
              <span className="text-stone-400 text-[11px]">Quick Add:</span>
              {['#Solopreneur', '#IndieHacker', '#BuildInPublic', '#FastAPI'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleAddHashtag(tag)}
                  className="text-stone-600 hover:text-stone-900 hover:underline font-mono text-[11px]"
                >
                  +{tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right 5 Columns: Dynamic Live Platform Previews */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-xl p-5 border border-[#E7E3DC] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-stone-900">Live Channel Preview</h3>
                <p className="text-xs text-stone-500">Native UI appearance simulation</p>
              </div>

              {/* Preview channel switcher */}
              <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg text-xs font-medium">
                {(['instagram', 'youtube', 'linkedin'] as const).map((channel) => (
                  <button
                    key={channel}
                    onClick={() => setPreviewPlatform(channel)}
                    data-active={previewPlatform === channel}
                    className={`px-2.5 py-1 rounded capitalize transition-colors ${
                      previewPlatform === channel
                        ? 'bg-[#721246] text-white shadow-xs font-semibold'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {channel}
                  </button>
                ))}
              </div>
            </div>

            {/* PREVIEW CONTAINER */}
            <div className="border border-stone-200 rounded-xl overflow-hidden bg-stone-50 p-4">
              {/* INSTAGRAM PREVIEW */}
              {previewPlatform === 'instagram' && (
                <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs">
                  {/* IG Post Header */}
                  <div className="p-3 flex items-center justify-between border-b border-stone-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-rose-500 p-0.5">
                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center font-bold text-[10px] text-stone-800">
                          RS
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-stone-900">rahulseth_builds</p>
                        <p className="text-[10px] text-stone-400">Audio · Original sound</p>
                      </div>
                    </div>
                    <span className="text-stone-400 font-bold text-sm">···</span>
                  </div>

                  {/* IG Media Frame Mock */}
                  <div className="aspect-square bg-stone-900 flex flex-col items-center justify-center text-white p-6 text-center relative overflow-hidden">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-2">
                      <Sparkles className="w-6 h-6 text-amber-400" />
                    </div>
                    <p className="text-sm font-bold uppercase tracking-wide text-amber-300">
                      {currentAsset.title}
                    </p>
                    <p className="text-xs text-stone-300 mt-1 max-w-[200px]">
                      1 Video → 4 Vertical Clips
                    </p>
                  </div>

                  {/* IG Actions & Caption */}
                  <div className="p-3.5 space-y-2 text-xs">
                    <div className="flex items-center justify-between text-stone-700">
                      <div className="flex items-center gap-3">
                        <span>❤️ 1,248</span>
                        <span>💬 84</span>
                        <span>↗️ 210</span>
                      </div>
                      <span>🔖</span>
                    </div>

                    <div className="space-y-1">
                      <p className="text-stone-900 whitespace-pre-line text-[11px] leading-relaxed">
                        <span className="font-bold mr-1.5">rahulseth_builds</span>
                        {currentAsset.caption}
                      </p>
                      <p className="text-[11px] text-blue-800 font-mono">
                        {currentAsset.hashtags.join(' ')}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* YOUTUBE PREVIEW */}
              {previewPlatform === 'youtube' && (
                <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs p-4 space-y-3">
                  <div className="aspect-video bg-stone-900 rounded-lg flex items-center justify-center text-white text-xs">
                    <span className="font-mono">[YouTube 16:9 Video Canvas]</span>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-stone-900 leading-snug">
                      {currentAsset.title}
                    </h4>
                    <div className="flex items-center gap-2 text-[11px] text-stone-500 mt-1">
                      <span>42K views</span>
                      <span aria-hidden="true">·</span>
                      <span>2 days ago</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-stone-600 font-mono">#SoloSaaS #IndieHacker</span>
                    </div>
                  </div>

                  <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 text-xs text-stone-700 whitespace-pre-line leading-relaxed font-mono text-[11px]">
                    {currentAsset.caption}
                  </div>
                </div>
              )}

              {/* LINKEDIN PREVIEW */}
              {previewPlatform === 'linkedin' && (
                <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs p-4 space-y-3">
                  <div className="flex items-start gap-2.5">
                    <div className="w-10 h-10 rounded-full bg-stone-800 text-white font-bold flex items-center justify-center text-xs">
                      RS
                    </div>
                    <div>
                      <p className="text-xs font-bold text-stone-900">Rahul Seth</p>
                      <p className="text-[10px] text-stone-500">Solo Founder · Building CreatorPilot AI</p>
                      <p className="text-[9px] text-stone-400">1h · Edited · 🌐</p>
                    </div>
                  </div>

                  <div className="text-xs text-stone-800 whitespace-pre-line leading-relaxed">
                    {currentAsset.caption}
                  </div>

                  <div className="text-xs text-blue-700 font-medium">
                    {currentAsset.hashtags.join(' ')}
                  </div>

                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-stone-500 text-xs">
                    <span>👍 418 reactions</span>
                    <span>💬 62 comments</span>
                  </div>
                </div>
              )}
            </div>

            {/* Next Step Nav */}
            <button
              onClick={() => onNavigate('distribution')}
              className="w-full py-2.5 bg-[#721246] text-white hover:bg-[#5c0e38] text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              <Calendar className="w-4 h-4" />
              <span>Schedule in Distribution Calendar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

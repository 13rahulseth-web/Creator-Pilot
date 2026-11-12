import React, { useState } from 'react';
import {
  User,
  Sliders,
  Sparkles,
  Layers,
  Shield,
  HardDrive,
  Check,
  Save,
  Key,
  Globe,
  Palette,
  AlertCircle,
  Plus,
  Trash2,
} from 'lucide-react';
import { UserProfile, UserWorkspace, CreatorPersona } from '../types';
import { INITIAL_USER, INITIAL_WORKSPACE, INITIAL_PERSONA } from '../data/mockData';
import { useToast } from '../components/common/Toast';

interface SettingsPageProps {
  user: UserProfile;
  workspace: UserWorkspace;
  onUpdateUser: (u: UserProfile) => void;
  onUpdateWorkspace: (w: UserWorkspace) => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({
  user,
  workspace,
  onUpdateUser,
  onUpdateWorkspace,
}) => {
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'persona' | 'profile' | 'workspace' | 'integrations'>('persona');

  // Profile State
  const [fullName, setFullName] = useState(user.fullName);
  const [email, setEmail] = useState(user.email);
  const [handle, setHandle] = useState(user.handle);
  const [preferredLanguage, setPreferredLanguage] = useState(user.preferredLanguage);
  const [defaultResolution, setDefaultResolution] = useState(user.defaultExportResolution);

  // Persona State
  const [persona, setPersona] = useState<CreatorPersona>(INITIAL_PERSONA);
  const [newForbiddenWord, setNewForbiddenWord] = useState('');

  // Workspace State
  const [workspaceName, setWorkspaceName] = useState(workspace.name);

  // API Backend Key State (Placeholder for hackathon sprint)
  const [apiUrl, setApiUrl] = useState('http://localhost:8000/api/v1');
  const [geminiKeyMasked, setGeminiKeyMasked] = useState('AIzaSyD********************');

  const handleSaveAll = () => {
    onUpdateUser({
      ...user,
      fullName,
      email,
      handle,
      preferredLanguage,
      defaultExportResolution: defaultResolution,
    });

    onUpdateWorkspace({
      ...workspace,
      name: workspaceName,
    });

    showToast('Preferences updated successfully', 'Studio settings and creator persona saved.', 'success');
  };

  const handleAddForbiddenWord = () => {
    if (newForbiddenWord.trim() && !persona.forbiddenWords.includes(newForbiddenWord.trim())) {
      setPersona((prev) => ({
        ...prev,
        forbiddenWords: [...prev.forbiddenWords, newForbiddenWord.trim().toLowerCase()],
      }));
      setNewForbiddenWord('');
      showToast('Forbidden word added', newForbiddenWord, 'info');
    }
  };

  const handleRemoveForbiddenWord = (word: string) => {
    setPersona((prev) => ({
      ...prev,
      forbiddenWords: prev.forbiddenWords.filter((w) => w !== word),
    }));
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#E7E3DC]">
        <div>
          <div className="flex items-center gap-2 text-xs text-stone-500 font-medium mb-1">
            <span>Studio Configuration</span>
            <span aria-hidden="true">·</span>
            <span>Preferences & Personas</span>
          </div>
          <h1 className="text-2xl font-bold text-stone-900 tracking-tight">
            Settings & Persona
          </h1>
          <p className="text-sm text-stone-600 mt-0.5">
            Configure your brand voice, default export resolutions, workspace preferences, and backend API routes.
          </p>
        </div>

        {/* Save CTA */}
        <button
          onClick={handleSaveAll}
          className="flex items-center gap-2 px-4 py-2 bg-[#721246] text-white hover:bg-[#5c0e38] text-xs font-semibold rounded-lg shadow-sm transition-colors whitespace-nowrap"
        >
          <Save className="w-4 h-4 text-amber-300" />
          <span>Save Changes</span>
        </button>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-[#E7E3DC] pb-px">
        {[
          { id: 'persona', label: 'Creator Persona', icon: Sparkles },
          { id: 'profile', label: 'User Profile & Defaults', icon: User },
          { id: 'workspace', label: 'Workspace & Quotas', icon: Layers },
          { id: 'integrations', label: 'Backend & APIs', icon: Key },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              data-active={isActive}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-all ${
                isActive
                  ? 'border-[#721246] text-[#721246]'
                  : 'border-transparent text-stone-500 hover:text-stone-800 hover:border-stone-300'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: CREATOR PERSONA */}
      {activeTab === 'persona' && (
        <div className="space-y-6">
          <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#E7E3DC] text-xs text-stone-700">
            <p className="font-semibold text-stone-900">
              Autonomous Tone & Persona Engine
            </p>
            <p className="mt-0.5 text-stone-600">
              Define your signature creator fingerprint. The AI pipeline enforces these vocabulary rules and stylistic parameters across all generated captions, scripts, and descriptions.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#E7E3DC] shadow-xs space-y-5">
            {/* Tone of Voice */}
            <div>
              <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2">
                Primary Tone of Voice
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {[
                  { id: 'conversational', label: 'Conversational', desc: 'Friendly & direct' },
                  { id: 'authoritative', label: 'Authoritative', desc: 'Thought leadership' },
                  { id: 'energetic', label: 'Energetic', desc: 'High hook velocity' },
                  { id: 'storyteller', label: 'Storyteller', desc: 'Narrative-driven' },
                  { id: 'analytical', label: 'Analytical', desc: 'Data & teardowns' },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() =>
                      setPersona({ ...persona, tone: t.id as CreatorPersona['tone'] })
                    }
                    data-active={persona.tone === t.id}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      persona.tone === t.id
                        ? 'border-[#721246] bg-[#721246] text-white shadow-xs active'
                        : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-800'
                    }`}
                  >
                    <p className="text-xs font-bold">{t.label}</p>
                    <p
                      className={`text-[10px] mt-0.5 ${
                        persona.tone === t.id ? 'text-stone-300' : 'text-stone-500'
                      }`}
                    >
                      {t.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Target Audience */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider">
                Target Audience Profile
              </label>
              <input
                type="text"
                value={persona.targetAudience}
                onChange={(e) => setPersona({ ...persona, targetAudience: e.target.value })}
                className="w-full px-3.5 py-2 text-xs text-stone-900 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-stone-400"
              />
            </div>

            {/* Creator Niche */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider">
                Core Niche & Focus
              </label>
              <input
                type="text"
                value={persona.niche}
                onChange={(e) => setPersona({ ...persona, niche: e.target.value })}
                className="w-full px-3.5 py-2 text-xs text-stone-900 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-stone-400"
              />
            </div>

            {/* Forbidden Words List */}
            <div className="space-y-3 pt-2 border-t border-stone-100">
              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider">
                  Forbidden AI Buzzwords & Clichés
                </label>
                <p className="text-xs text-stone-500 mt-0.5">
                  Autonomous agents will never inject these phrases into your content.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {persona.forbiddenWords.map((word) => (
                  <span
                    key={word}
                    onClick={() => handleRemoveForbiddenWord(word)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-rose-50 text-rose-700 border border-rose-200 text-xs rounded-md font-mono cursor-pointer hover:bg-rose-100 transition-colors"
                  >
                    <span>{word}</span>
                    <span className="text-rose-400 text-[10px]">×</span>
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 max-w-sm">
                <input
                  type="text"
                  value={newForbiddenWord}
                  onChange={(e) => setNewForbiddenWord(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddForbiddenWord();
                    }
                  }}
                  placeholder="e.g. delve, game-changer"
                  className="flex-1 px-3 py-1.5 text-xs text-stone-900 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-stone-400"
                />
                <button
                  type="button"
                  onClick={handleAddForbiddenWord}
                  className="px-3 py-1.5 bg-[#721246] hover:bg-[#5c0e38] text-white text-xs font-semibold rounded-lg transition-colors"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Signature Sign-Off */}
            <div className="space-y-2 pt-2 border-t border-stone-100">
              <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider">
                Signature Sign-Off
              </label>
              <input
                type="text"
                value={persona.signatureSignOff}
                onChange={(e) => setPersona({ ...persona, signatureSignOff: e.target.value })}
                className="w-full px-3.5 py-2 text-xs text-stone-900 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-stone-400"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PROFILE & DEFAULTS */}
      {activeTab === 'profile' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-[#E7E3DC] shadow-xs space-y-5">
            <h2 className="text-base font-bold text-stone-900">Creator Profile</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Creator Handle</label>
                <input
                  type="text"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-900 font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Preferred Language</label>
                <select
                  value={preferredLanguage}
                  onChange={(e) => setPreferredLanguage(e.target.value)}
                  className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-900"
                >
                  <option value="English (US)">English (US)</option>
                  <option value="English (UK)">English (UK)</option>
                  <option value="Spanish (Español)">Spanish (Español)</option>
                  <option value="French (Français)">French (Français)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Default Export Resolution</label>
                <select
                  value={defaultResolution}
                  onChange={(e) => setDefaultResolution(e.target.value as '1080p' | '4k')}
                  className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-900 font-mono"
                >
                  <option value="1080p">1080p Full HD (Recommended)</option>
                  <option value="4k">4K UHD Master (Higher render time)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Theme Preference</label>
                <div className="flex items-center gap-2 pt-1">
                  <span className="px-3 py-1.5 bg-[#721246] text-white rounded-lg text-xs font-semibold">
                    Light Beige (Studio Native)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: WORKSPACE & QUOTAS */}
      {activeTab === 'workspace' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-[#E7E3DC] shadow-xs space-y-5">
            <h2 className="text-base font-bold text-stone-900">Workspace Details</h2>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Workspace Name</label>
                <input
                  type="text"
                  value={workspaceName}
                  onChange={(e) => setWorkspaceName(e.target.value)}
                  className="w-full max-w-md px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-900 font-medium"
                />
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between max-w-md">
                <div>
                  <p className="font-semibold text-stone-900">Active Membership Tier</p>
                  <p className="text-stone-500">{workspace.plan}</p>
                </div>
                <span className="text-[11px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                  ACTIVE
                </span>
              </div>

              <div className="pt-3 border-t border-stone-100 space-y-2 max-w-md">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-stone-800">Storage Usage</span>
                  <span className="font-mono tabular-nums text-stone-600">
                    {workspace.storageUsed} / {workspace.storageLimit}
                  </span>
                </div>
                <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-600 h-full w-[17%]" />
                </div>
                <p className="text-[11px] text-stone-400">
                  Includes master videos, 9:16 clips, and cached Whisper audio transcripts.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: BACKEND INTEGRATIONS & APIS */}
      {activeTab === 'integrations' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-[#E7E3DC] shadow-xs space-y-5">
            <h2 className="text-base font-bold text-stone-900">Backend API Endpoints</h2>
            <p className="text-xs text-stone-500">
              Configure endpoints for the live sprint FastAPI server and AI execution pipeline.
            </p>

            <div className="space-y-4 text-xs max-w-lg">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">FastAPI Service URL</label>
                <input
                  type="text"
                  value={apiUrl}
                  onChange={(e) => setApiUrl(e.target.value)}
                  className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-900 font-mono"
                />
                <p className="text-[11px] text-stone-400 mt-1">Configured in .env via VITE_API_BASE_URL</p>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Server-Side Gemini API Key</label>
                <input
                  type="text"
                  disabled
                  value={geminiKeyMasked}
                  className="w-full px-3.5 py-2 bg-stone-100 border border-stone-200 rounded-lg text-stone-500 font-mono"
                />
                <p className="text-[11px] text-stone-400 mt-1">
                  Managed securely on the server via AI Studio environment secrets.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

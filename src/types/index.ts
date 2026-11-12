export type PlatformType = 'youtube' | 'instagram' | 'linkedin' | 'twitter';

export type AspectRatioType = '9:16' | '16:9' | '1:1';

export type ProjectStatus = 'draft' | 'analyzing' | 'processed' | 'ready' | 'published';

export type ClipStatus = 'ready' | 'rendering' | 'exported';

export interface VideoFile {
  id: string;
  name: string;
  size: string;
  duration: string;
  durationSeconds: number;
  resolution: string;
  fps: number;
  codec: string;
  audioChannels: string;
  uploadDate: string;
  fileUrl?: string;
  format: 'mp4' | 'mov' | 'webm';
}

export interface Project {
  id: string;
  title: string;
  description?: string;
  language: string;
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;
  video: VideoFile;
  clipCount: number;
  thumbnailCount: number;
  contentAssetCount: number;
}

export interface Clip {
  id: string;
  projectId: string;
  title: string;
  hook: string;
  startTime: string;
  endTime: string;
  startSeconds: number;
  endSeconds: number;
  duration: string;
  platforms: PlatformType[];
  viralityScore: number;
  aspectRatio: AspectRatioType;
  status: ClipStatus;
  captionSnippet: string;
}

export interface Thumbnail {
  id: string;
  projectId: string;
  variationLabel: string;
  styleName: string;
  headline: string;
  subheadline: string;
  visualComposition: {
    ruleOfThirdsScore: number;
    contrastRatio: string;
    textReadabilityIndex: string;
    focalPoint: string;
  };
  dominantColors: string[];
  theme: 'bold_contrast' | 'minimal_split' | 'cinematic_dark';
  isSelected: boolean;
}

export interface ContentAsset {
  id: string;
  projectId: string;
  platform: PlatformType;
  language: string;
  title: string;
  description: string;
  caption: string;
  hashtags: string[];
  characterCount: number;
  characterLimit: number;
  status: 'draft' | 'approved' | 'scheduled';
}

export interface CalendarEvent {
  id: string;
  projectId: string;
  contentAssetId?: string;
  title: string;
  platform: PlatformType;
  scheduledDate: string; // ISO date format YYYY-MM-DD
  scheduledTime: string; // e.g. 10:00 AM
  status: 'draft' | 'approved' | 'scheduled' | 'published';
  thumbnailSnippet?: string;
}

export interface AnalyticsMetric {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
  timeframe: string;
}

export interface PlatformPerformance {
  platform: PlatformType;
  views: string;
  viewsNumeric: number;
  engagement: string;
  followersGained: string;
  shares: string;
  color: string;
}

export interface TopPerformingContent {
  id: string;
  title: string;
  platform: PlatformType;
  views: string;
  engagementRate: string;
  watchTime: string;
  retentionScore: number;
  publishDate: string;
}

export interface CreatorPersona {
  tone: 'conversational' | 'authoritative' | 'energetic' | 'storyteller' | 'analytical';
  targetAudience: string;
  niche: string;
  brandColors: string[];
  forbiddenWords: string[];
  signatureSignOff: string;
  defaultCallToAction: string;
}

export interface UserWorkspace {
  id: string;
  name: string;
  role: 'owner' | 'editor' | 'viewer';
  plan: 'Solo Creator Pro' | 'Free Starter' | 'Studio Team';
  storageUsed: string;
  storageLimit: string;
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  handle: string;
  avatarUrl: string;
  preferredLanguage: string;
  defaultExportResolution: '1080p' | '4k';
  theme: 'light' | 'dark' | 'system';
}

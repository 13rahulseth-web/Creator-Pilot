import {
  Project,
  Clip,
  Thumbnail,
  ContentAsset,
  CalendarEvent,
  AnalyticsMetric,
  PlatformPerformance,
  TopPerformingContent,
  CreatorPersona,
  UserProfile,
  UserWorkspace,
} from '../types';

export const INITIAL_USER: UserProfile = {
  id: 'usr_rahul_01',
  fullName: 'Rahul Seth',
  email: '13rahulseth@gmail.com',
  handle: '@rahulseth_builds',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80',
  preferredLanguage: 'English (US)',
  defaultExportResolution: '1080p',
  theme: 'light',
};

export const INITIAL_WORKSPACE: UserWorkspace = {
  id: 'ws_solo_01',
  name: 'CreatorPilot Solo Lab',
  role: 'owner',
  plan: 'Solo Creator Pro',
  storageUsed: '42.8 GB',
  storageLimit: '250 GB',
};

export const INITIAL_PERSONA: CreatorPersona = {
  tone: 'conversational',
  targetAudience: 'Software builders, solopreneurs, tech creators, and modern founders',
  niche: 'AI Tools, Solo Business, Indie Hacking & Content Systems',
  brandColors: ['#1C1917', '#D97706', '#E7E5DF'],
  forbiddenWords: ['game-changer', 'synergy', 'leverage (as a verb)', 'delve', 'unleash'],
  signatureSignOff: 'Keep shipping, keep iterating.',
  defaultCallToAction: 'Drop a comment if you want the Notion template, and subscribe for weekly breakdowns.',
};

export const SAMPLE_PROJECTS: Project[] = [
  {
    id: 'proj_01',
    title: 'Building a $50k/mo Micro-SaaS Solo in 2026',
    description: 'Complete breakdown of tech stack, autonomous content engine, and customer acquisition playbook.',
    language: 'English (US)',
    status: 'ready',
    createdAt: '2026-11-10T14:32:00Z',
    updatedAt: '2026-11-11T09:15:00Z',
    clipCount: 4,
    thumbnailCount: 3,
    contentAssetCount: 5,
    video: {
      id: 'vid_01',
      name: 'solo_founder_saas_full_master_4k.mov',
      size: '1.42 GB',
      duration: '18:42',
      durationSeconds: 1122,
      resolution: '3840 x 2160 (4K UHD)',
      fps: 60,
      codec: 'ProRes 422 / H.265 HEVC',
      audioChannels: 'Stereo (48.0 kHz 24-bit)',
      uploadDate: 'Nov 10, 2026',
      format: 'mov',
    },
  },
  {
    id: 'proj_02',
    title: 'My Entire Content Workflow as a 1-Person Team',
    description: 'How I turn 1 long-form YouTube video into 20 assets in under 30 minutes without burnout.',
    language: 'English (US)',
    status: 'ready',
    createdAt: '2026-11-06T18:20:00Z',
    updatedAt: '2026-11-08T11:45:00Z',
    clipCount: 6,
    thumbnailCount: 3,
    contentAssetCount: 8,
    video: {
      id: 'vid_02',
      name: 'content_engine_workflow_final.mp4',
      size: '980 MB',
      duration: '14:18',
      durationSeconds: 858,
      resolution: '1920 x 1080 (FHD)',
      fps: 30,
      codec: 'H.264 / AAC',
      audioChannels: 'Stereo (48.0 kHz)',
      uploadDate: 'Nov 6, 2026',
      format: 'mp4',
    },
  },
  {
    id: 'proj_03',
    title: 'The Future of Autonomous Agents in 2026',
    description: 'Deep dive into multimodal agent architectures, tool calling, and local execution.',
    language: 'English (US)',
    status: 'processed',
    createdAt: '2026-10-29T10:00:00Z',
    updatedAt: '2026-11-02T16:30:00Z',
    clipCount: 5,
    thumbnailCount: 3,
    contentAssetCount: 4,
    video: {
      id: 'vid_03',
      name: 'autonomous_agents_2026_lecture.mp4',
      size: '2.1 GB',
      duration: '26:50',
      durationSeconds: 1610,
      resolution: '3840 x 2160 (4K UHD)',
      fps: 60,
      codec: 'H.265 / HEVC',
      audioChannels: 'Stereo (48.0 kHz)',
      uploadDate: 'Oct 29, 2026',
      format: 'mp4',
    },
  },
  {
    id: 'proj_04',
    title: 'Why I Stopped Using Traditional Video Editors',
    description: 'Moving from Premiere timeline friction to AI-first script & transcript workflows.',
    language: 'English (US)',
    status: 'draft',
    createdAt: '2026-11-11T20:10:00Z',
    updatedAt: '2026-11-11T20:10:00Z',
    clipCount: 0,
    thumbnailCount: 0,
    contentAssetCount: 0,
    video: {
      id: 'vid_04',
      name: 'raw_take_timeline_rant.webm',
      size: '412 MB',
      duration: '08:15',
      durationSeconds: 495,
      resolution: '1920 x 1080 (FHD)',
      fps: 30,
      codec: 'VP9 / Opus',
      audioChannels: 'Stereo (48.0 kHz)',
      uploadDate: 'Nov 11, 2026',
      format: 'webm',
    },
  },
];

export const SAMPLE_CLIPS: Clip[] = [
  {
    id: 'clip_01',
    projectId: 'proj_01',
    title: 'The 3 AI Tools Replacing Boring SaaS',
    hook: 'Most developers are building wrappers, but here is the quiet stack making $50k/mo solo...',
    startTime: '03:14',
    endTime: '04:02',
    startSeconds: 194,
    endSeconds: 242,
    duration: '0:48',
    platforms: ['instagram', 'youtube'],
    viralityScore: 94,
    aspectRatio: '9:16',
    status: 'ready',
    captionSnippet: 'Stop building generic ChatGPT wrappers. Here is what modern solo software businesses actually use in 2026 to hit $50,000 monthly with zero full-time hires.',
  },
  {
    id: 'clip_02',
    projectId: 'proj_01',
    title: 'The Zero-Employee Architecture',
    hook: 'If your startup needs 10 engineers before shipping v1, you are already obsolete in 2026...',
    startTime: '07:30',
    endTime: '08:18',
    startSeconds: 450,
    endSeconds: 498,
    duration: '0:48',
    platforms: ['instagram'],
    viralityScore: 89,
    aspectRatio: '9:16',
    status: 'ready',
    captionSnippet: 'We used to hire teams for ops, customer support, and asset generation. Today, one thoughtful engineer with autonomous pipelines outperforms a 10-person agency.',
  },
  {
    id: 'clip_03',
    projectId: 'proj_01',
    title: 'Distribution is 80% of the Game',
    hook: 'One 20-minute video should be 5 Shorts, 3 LinkedIn posts, and a newsletter. Here is how...',
    startTime: '11:05',
    endTime: '11:58',
    startSeconds: 665,
    endSeconds: 718,
    duration: '0:53',
    platforms: ['youtube', 'linkedin'],
    viralityScore: 92,
    aspectRatio: '9:16',
    status: 'ready',
    captionSnippet: 'If you record once and post once, you are wasting 80% of your production effort. The leverage is in repurposing across every single vertical surface.',
  },
  {
    id: 'clip_04',
    projectId: 'proj_01',
    title: 'My Solo Founder Tech Stack',
    hook: 'Here is the exact terminal setup, database, and cloud stack running my business...',
    startTime: '14:22',
    endTime: '15:10',
    startSeconds: 862,
    endSeconds: 910,
    duration: '0:48',
    platforms: ['youtube', 'instagram'],
    viralityScore: 86,
    aspectRatio: '9:16',
    status: 'ready',
    captionSnippet: 'No complex Kubernetes clusters. Just FastAPI, PostgreSQL, Tailwind, and autonomous cron triggers that handle the heavy lifting while I sleep.',
  },
];

export const SAMPLE_THUMBNAILS: Thumbnail[] = [
  {
    id: 'thumb_01',
    projectId: 'proj_01',
    variationLabel: 'Variation A',
    styleName: 'High-Contrast Focus',
    headline: 'I REPLACED A 10-PERSON TEAM',
    subheadline: 'The 2026 Solo Founder Playbook',
    visualComposition: {
      ruleOfThirdsScore: 96,
      contrastRatio: '14.2:1 (AAA High Contrast)',
      textReadabilityIndex: '98% at Mobile Scale (120px)',
      focalPoint: 'Upper Left Headline + Right Subject Gaze',
    },
    dominantColors: ['#1C1917', '#F59E0B', '#F9F8F5'],
    theme: 'bold_contrast',
    isSelected: true,
  },
  {
    id: 'thumb_02',
    projectId: 'proj_01',
    variationLabel: 'Variation B',
    styleName: 'Minimalist Split Concept',
    headline: '$50K/MO AS A SOLO CREATOR',
    subheadline: '1 Video → 14 Assets Blueprint',
    visualComposition: {
      ruleOfThirdsScore: 91,
      contrastRatio: '11.8:1 (AAA Standard)',
      textReadabilityIndex: '94% at Mobile Scale',
      focalPoint: 'Center Metric Badge & Studio Rig',
    },
    dominantColors: ['#18181B', '#10B981', '#FAF5F0'],
    theme: 'minimal_split',
    isSelected: false,
  },
  {
    id: 'thumb_03',
    projectId: 'proj_01',
    variationLabel: 'Variation C',
    styleName: 'Dark Mode Cinematic',
    headline: 'STOP POSTING RANDOM REELS',
    subheadline: 'Autonomous Studio Pipeline',
    visualComposition: {
      ruleOfThirdsScore: 88,
      contrastRatio: '12.5:1 (AAA Dark Surface)',
      textReadabilityIndex: '92% at Mobile Scale',
      focalPoint: 'Lower Third Heavy Punchline',
    },
    dominantColors: ['#09090B', '#E11D48', '#38BDF8'],
    theme: 'cinematic_dark',
    isSelected: false,
  },
];

export const SAMPLE_CONTENT_ASSETS: Record<string, ContentAsset> = {
  instagram: {
    id: 'asset_ig_01',
    projectId: 'proj_01',
    platform: 'instagram',
    language: 'English (US)',
    title: 'The Solo Creator Multiplier 🚀',
    description: 'Instagram Reel caption and hashtag strategy optimized for discovery.',
    caption: `Stop spending 15 hours editing reels for 200 views. 

Here is the exact formula I used to turn ONE 20-minute video into 4 viral short clips, 3 LinkedIn posts, and a full newsletter:

1. Record long-form once with high conceptual density
2. Identify the 3 sharpest contrarian hooks
3. Cut vertical 9:16 clips with locked eye-level framing
4. Distribute across YouTube Shorts, Reels & X Threads in sync

Are you still doing all manual editing, or using autonomous studio pipelines? Let me know below 👇`,
    hashtags: ['#SoloCreator', '#CreatorEconomy', '#IndieHacker', '#BuildInPublic', '#ContentStrategy', '#AITools', '#MicroSaaS'],
    characterCount: 462,
    characterLimit: 2200,
    status: 'approved',
  },
  youtube: {
    id: 'asset_yt_01',
    projectId: 'proj_01',
    platform: 'youtube',
    language: 'English (US)',
    title: 'Building a $50k/mo Micro-SaaS Solo in 2026 (Tech Stack & Content Engine)',
    description: 'YouTube description formatted with clean chapter timestamps and resource links.',
    caption: `In this video, I walk through how I run a profitable solo software business without employees, using modern tools and an automated content repurposing workflow.

Timestamps:
00:00 - The Solo Founder Landscape in 2026
03:14 - The 3 AI Tools Replacing Boring SaaS
07:30 - The Zero-Employee Architecture
11:05 - How to Turn 1 Video into 14 Assets
14:22 - Complete Tech Stack & Code Walkthrough
17:40 - Lessons Learned & Free Notion System

Resources Mentioned:
- Architecture Blueprint: https://creatorpilot.ai/blueprint
- My Minimal Studio Setup: https://creatorpilot.ai/stack

Subscribe for weekly engineering and creator deep-dives.`,
    hashtags: ['#SaaS', '#IndieHacker', '#Programming', '#Solopreneur', '#Productivity'],
    characterCount: 658,
    characterLimit: 5000,
    status: 'approved',
  },
  linkedin: {
    id: 'asset_li_01',
    projectId: 'proj_01',
    platform: 'linkedin',
    language: 'English (US)',
    title: 'The death of the 10-person early-stage team.',
    description: 'Long-form editorial post structured for executive and founder engagement.',
    caption: `The biggest shift in 2026 isn't just LLM intelligence. 

It is the collapse of operational overhead.

Three years ago, running a media-driven software company required:
- A full-time video editor ($4,000/mo)
- A copywriter for social adaptations ($3,000/mo)
- A thumbnail designer ($1,500/mo)
- A scheduling coordinator ($1,000/mo)

Total burn: ~$9,500/month before writing a single line of product code.

Today, I record ONE high-quality video for 20 minutes on Sunday. 
By Monday morning, an autonomous pipeline has:
→ Isolated the highest retention 45-second clips
→ Rendered 3 thumbnail variations with readability scores
→ Generated platform-native copy for LinkedIn, YouTube, and X
→ Queued distribution across all channels

The competitive advantage is no longer headcount. It is workflow leverage.

What is one manual task in your content system you wish was completely autonomous?`,
    hashtags: ['#Entrepreneurship', '#FutureOfWork', '#Technology', '#Leadership', '#SoftwareEngineering'],
    characterCount: 938,
    characterLimit: 3000,
    status: 'scheduled',
  },
  twitter: {
    id: 'asset_x_01',
    projectId: 'proj_01',
    platform: 'twitter',
    language: 'English (US)',
    title: 'Thread Starter: The Solo Creator Playbook',
    description: 'Bite-sized punchy post tailored for X / Twitter.',
    caption: `If you are spending more than 2 hours editing video clips for social media in 2026, you are working for the algorithm instead of building your business.

One 20-min recording = 4 clips + 3 posts + 1 newsletter.

Here is the exact framework 🧵👇`,
    hashtags: ['#buildinpublic', '#creatoreconomy', '#solopreneur'],
    characterCount: 236,
    characterLimit: 280,
    status: 'draft',
  },
};

export const SAMPLE_CALENDAR_EVENTS: CalendarEvent[] = [
  {
    id: 'cal_01',
    projectId: 'proj_01',
    title: 'The 3 AI Tools Replacing Boring SaaS',
    platform: 'youtube',
    scheduledDate: '2026-11-12',
    scheduledTime: '10:00 AM',
    status: 'scheduled',
    thumbnailSnippet: 'Variation A: High-Contrast Focus',
  },
  {
    id: 'cal_02',
    projectId: 'proj_01',
    title: 'The death of the 10-person early-stage team.',
    platform: 'linkedin',
    scheduledDate: '2026-11-12',
    scheduledTime: '01:30 PM',
    status: 'scheduled',
  },
  {
    id: 'cal_03',
    projectId: 'proj_01',
    title: 'The Solo Creator Multiplier 🚀',
    platform: 'instagram',
    scheduledDate: '2026-11-13',
    scheduledTime: '04:00 PM',
    status: 'approved',
  },
  {
    id: 'cal_04',
    projectId: 'proj_01',
    title: 'Why solo founders are winning in 2026',
    platform: 'twitter',
    scheduledDate: '2026-11-14',
    scheduledTime: '11:15 AM',
    status: 'draft',
  },
  {
    id: 'cal_05',
    projectId: 'proj_01',
    title: 'Thread: The Solo Creator Playbook',
    platform: 'twitter',
    scheduledDate: '2026-11-15',
    scheduledTime: '09:00 AM',
    status: 'draft',
  },
  {
    id: 'cal_06',
    projectId: 'proj_02',
    title: 'Clip 02: 1 Video → 20 Assets in 30 Mins',
    platform: 'youtube',
    scheduledDate: '2026-11-16',
    scheduledTime: '10:00 AM',
    status: 'scheduled',
  },
  {
    id: 'cal_07',
    projectId: 'proj_02',
    title: 'Building in Public: Real Numbers',
    platform: 'linkedin',
    scheduledDate: '2026-11-17',
    scheduledTime: '08:45 AM',
    status: 'approved',
  },
];

export const SAMPLE_ANALYTICS = {
  summary: [
    { label: 'Total Views', value: '1.42M', change: '+24.8%', isPositive: true, timeframe: 'vs last 30 days' },
    { label: 'Engagement Rate', value: '5.8%', change: '+0.9%', isPositive: true, timeframe: 'industry avg: 2.3%' },
    { label: 'Audience Growth', value: '+12.4K', change: '+18.2%', isPositive: true, timeframe: 'across 4 networks' },
    { label: 'Published Clips', value: '84', change: '+16 this mo', isPositive: true, timeframe: '98% repurpose efficiency' },
  ] as AnalyticsMetric[],

  platforms: [
    { platform: 'youtube', views: '684.2K', viewsNumeric: 684200, engagement: '6.4%', followersGained: '+5.2K', shares: '18.4K', color: '#EF4444' },
    { platform: 'instagram', views: '412.8K', viewsNumeric: 412800, engagement: '7.1%', followersGained: '+4.1K', shares: '24.9K', color: '#EC4899' },
    { platform: 'linkedin', views: '194.5K', viewsNumeric: 194500, engagement: '4.8%', followersGained: '+2.3K', shares: '6.8K', color: '#0A66C2' },
    { platform: 'twitter', views: '131.0K', viewsNumeric: 131000, engagement: '5.2%', followersGained: '+850', shares: '11.2K', color: '#1D9BF0' },
  ] as PlatformPerformance[],

  weeklyActivity: [
    { day: 'Mon', views: 42, clips: 4, posts: 2 },
    { day: 'Tue', views: 68, clips: 6, posts: 3 },
    { day: 'Wed', views: 89, clips: 8, posts: 4 },
    { day: 'Thu', views: 114, clips: 10, posts: 5 },
    { day: 'Fri', views: 95, clips: 7, posts: 3 },
    { day: 'Sat', views: 72, clips: 5, posts: 2 },
    { day: 'Sun', views: 84, clips: 6, posts: 3 },
  ],

  topContent: [
    {
      id: 'top_01',
      title: 'The 3 AI Tools Replacing Boring SaaS',
      platform: 'youtube',
      views: '342,100',
      engagementRate: '8.4%',
      watchTime: '42.8 hrs',
      retentionScore: 84,
      publishDate: 'Nov 8, 2026',
    },
    {
      id: 'top_02',
      title: 'The death of the 10-person early-stage team.',
      platform: 'linkedin',
      views: '118,400',
      engagementRate: '6.9%',
      watchTime: '18.2 hrs',
      retentionScore: 78,
      publishDate: 'Nov 5, 2026',
    },
    {
      id: 'top_03',
      title: 'The Zero-Employee Architecture (Shorts)',
      platform: 'instagram',
      views: '98,600',
      engagementRate: '9.2%',
      watchTime: '14.1 hrs',
      retentionScore: 91,
      publishDate: 'Nov 7, 2026',
    },
    {
      id: 'top_04',
      title: 'Distribution is 80% of the Game',
      platform: 'twitter',
      views: '76,200',
      engagementRate: '7.4%',
      watchTime: '11.6 hrs',
      retentionScore: 74,
      publishDate: 'Nov 9, 2026',
    },
  ] as TopPerformingContent[],
};

export const RECENT_ACTIVITIES = [
  { id: 'act_1', action: 'Video analyzed', target: 'Building a $50k/mo Micro-SaaS Solo', time: '12 mins ago', type: 'video' },
  { id: 'act_2', action: '4 vertical clips isolated', target: 'Clip Studio Pipeline', time: '28 mins ago', type: 'clip' },
  { id: 'act_3', action: '3 thumbnail variations generated', target: 'Thumbnail Studio', time: '45 mins ago', type: 'thumbnail' },
  { id: 'act_4', action: 'Post scheduled for YouTube Shorts', target: 'Distribution Calendar', time: '2 hours ago', type: 'distribution' },
  { id: 'act_5', action: 'LinkedIn editorial copy approved', target: 'Content Studio', time: '4 hours ago', type: 'content' },
];

/**
 * CreatorPilot AI — API Client & Integration Layer
 * 
 * Ready for FastAPI backend connection during hackathon sprint.
 * Endpoints map to FastAPI router /api/v1/...
 */

import {
  Project,
  VideoFile,
  Clip,
  Thumbnail,
  ContentAsset,
  CalendarEvent,
  PlatformType,
} from '../types';

export class ApiError extends Error {
  public statusCode: number;
  public details?: unknown;

  constructor(message: string, statusCode: number = 500, details?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.details = details;
  }
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
  timestamp: string;
}

// Configured via .env or fallback for preview sandbox
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const headers = new Headers(options.headers || {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  });

  const config: RequestInit = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      let errorBody: unknown;
      try {
        errorBody = await response.json();
      } catch {
        errorBody = await response.text();
      }
      throw new ApiError(
        `API Request Failed: ${response.statusText}`,
        response.status,
        errorBody
      );
    }

    const data: ApiResponse<T> = await response.json();
    return data.data;
  } catch (err: unknown) {
    if (err instanceof ApiError) {
      throw err;
    }
    const message = err instanceof Error ? err.message : 'Unknown Network Error';
    throw new ApiError(`Network or connection error: ${message}`, 0, err);
  }
}

/**
 * Videos & Projects Endpoints (FastAPI mapping)
 */
export const VideoApiService = {
  // POST /api/v1/videos/upload
  uploadVideo: async (formData: FormData): Promise<VideoFile> => {
    return request<VideoFile>('/videos/upload', {
      method: 'POST',
      body: formData,
      headers: {}, // Let browser set multipart boundaries
    });
  },

  // GET /api/v1/projects
  getProjects: async (): Promise<Project[]> => {
    return request<Project[]>('/projects');
  },

  // GET /api/v1/projects/:id
  getProjectById: async (id: string): Promise<Project> => {
    return request<Project>(`/projects/${id}`);
  },

  // POST /api/v1/projects/:id/analyze
  analyzeVideo: async (projectId: string, options: { language: string; targetPlatforms: PlatformType[] }) => {
    return request<{ taskId: string; estimatedTimeSeconds: number }>(`/projects/${projectId}/analyze`, {
      method: 'POST',
      body: JSON.stringify(options),
    });
  },
};

/**
 * Clips Endpoints (FastAPI mapping)
 */
export const ClipApiService = {
  // GET /api/v1/clips?projectId=...
  getClips: async (projectId: string): Promise<Clip[]> => {
    return request<Clip[]>(`/clips?projectId=${projectId}`);
  },

  // POST /api/v1/clips/:id/export
  exportClip: async (clipId: string, format: { resolution: string; burnedCaptions: boolean }) => {
    return request<{ downloadUrl: string; renderStatus: string }>(`/clips/${clipId}/export`, {
      method: 'POST',
      body: JSON.stringify(format),
    });
  },
};

/**
 * Thumbnails Endpoints (FastAPI mapping)
 */
export const ThumbnailApiService = {
  // GET /api/v1/thumbnails?projectId=...
  getThumbnails: async (projectId: string): Promise<Thumbnail[]> => {
    return request<Thumbnail[]>(`/thumbnails?projectId=${projectId}`);
  },

  // POST /api/v1/thumbnails/:id/select
  selectThumbnail: async (thumbnailId: string): Promise<{ success: boolean }> => {
    return request<{ success: boolean }>(`/thumbnails/${thumbnailId}/select`, {
      method: 'POST',
    });
  },
};

/**
 * Content Assets & Captions Endpoints
 */
export const ContentApiService = {
  // GET /api/v1/content?projectId=...
  getContentAssets: async (projectId: string): Promise<ContentAsset[]> => {
    return request<ContentAsset[]>(`/content?projectId=${projectId}`);
  },

  // PUT /api/v1/content/:id
  updateContentAsset: async (id: string, updates: Partial<ContentAsset>): Promise<ContentAsset> => {
    return request<ContentAsset>(`/content/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },
};

/**
 * Distribution & Calendar Endpoints
 */
export const DistributionApiService = {
  // GET /api/v1/distribution/calendar
  getCalendarEvents: async (): Promise<CalendarEvent[]> => {
    return request<CalendarEvent[]>('/distribution/calendar');
  },

  // POST /api/v1/distribution/schedule
  schedulePost: async (post: Partial<CalendarEvent>): Promise<CalendarEvent> => {
    return request<CalendarEvent>('/distribution/schedule', {
      method: 'POST',
      body: JSON.stringify(post),
    });
  },
};

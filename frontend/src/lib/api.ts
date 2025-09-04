// API configuration for different environments
const IS_STATIC_EXPORT = process.env.NEXT_PUBLIC_IS_STATIC_EXPORT === 'true';
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

// API base URL configuration
const getApiBaseUrl = () => {
  if (IS_STATIC_EXPORT) {
    // For static export (GitHub Pages), use relative paths to static JSON files
    return BASE_PATH;
  }
  
  // For development and server-side rendering
  return process.env.BACKEND_URL || 'http://localhost:3001';
};

const API_BASE_URL = getApiBaseUrl();

// API helper functions
export const apiRequest = async (endpoint: string, options?: RequestInit) => {
  if (IS_STATIC_EXPORT) {
    // For static export, map API endpoints to static JSON files
    const staticEndpoint = mapToStaticEndpoint(endpoint);
    const response = await fetch(staticEndpoint);
    return response;
  }
  
  // For dynamic API calls
  const url = endpoint.startsWith('/api') 
    ? endpoint  // Use Next.js API routes in development
    : `${API_BASE_URL}${endpoint}`; // Use external backend
    
  return fetch(url, options);
};

const mapToStaticEndpoint = (endpoint: string): string => {
  // Map dynamic API endpoints to static JSON files
  if (endpoint === '/api/stories' || endpoint.startsWith('/api/stories?')) {
    return `${BASE_PATH}/api/stories/stories.json`;
  }
  
  if (endpoint.match(/\/api\/stories\/[^\/]+\/replies/)) {
    return `${BASE_PATH}/api/replies/demo-replies.json`;
  }
  
  if (endpoint === '/api/stories/random') {
    // For random story, return one of the demo stories
    return `${BASE_PATH}/api/stories/stories.json`;
  }
  
  // Default fallback
  return `${BASE_PATH}/api/stories/stories.json`;
};

// Specific API functions
export const fetchStories = async (page = 1, limit = 10) => {
  const response = await apiRequest(`/api/stories?page=${page}&limit=${limit}`);
  if (!response.ok) throw new Error('Failed to fetch stories');
  return response.json();
};

export const fetchStoryWithReplies = async (storyId: string) => {
  const response = await apiRequest(`/api/stories/${storyId}/replies`);
  if (!response.ok) throw new Error('Failed to fetch story with replies');
  return response.json();
};

export const fetchRandomStory = async () => {
  if (IS_STATIC_EXPORT) {
    // For static export, return a demo story
    const response = await apiRequest('/api/stories/random');
    const data = await response.json();
    // Return the first story as "random"
    return data.stories[0];
  }
  
  const response = await apiRequest('/api/stories/random');
  if (!response.ok) {
    if (response.status === 429) {
      throw new Error('RATE_LIMITED');
    }
    throw new Error('Failed to fetch random story');
  }
  return response.json();
};

export const createStory = async (storyData: { title: string; content: string; author: string }) => {
  if (IS_STATIC_EXPORT) {
    // For static export, simulate successful creation
    return { success: true, message: 'Story saved! (Demo mode - changes not persisted)' };
  }
  
  const response = await apiRequest('/api/stories', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(storyData),
  });
  
  if (!response.ok) throw new Error('Failed to create story');
  return response.json();
};

export const createReply = async (replyData: { storyId: string; content: string; author: string }) => {
  if (IS_STATIC_EXPORT) {
    // For static export, simulate successful creation
    return { success: true, message: 'Reply saved! (Demo mode - changes not persisted)' };
  }
  
  const response = await apiRequest('/api/replies', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(replyData),
  });
  
  if (!response.ok) throw new Error('Failed to create reply');
  return response.json();
};

import api from '../api/config';

export interface StoryData {
  title: string;
  content: string;
  category?: string;
  images?: string[];
}

export const storiesService = {
  getStories: async (limit?: number) => {
    try {
      const response = await api.get('/success-stories', {
        params: { limit: limit || 20 },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getStoryById: async (storyId: string) => {
    try {
      const response = await api.get(`/success-stories/${storyId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createStory: async (storyData: StoryData) => {
    try {
      const response = await api.post('/success-stories', storyData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateStory: async (storyId: string, storyData: Partial<StoryData>) => {
    try {
      const response = await api.put(`/success-stories/${storyId}`, storyData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteStory: async (storyId: string) => {
    try {
      await api.delete(`/success-stories/${storyId}`);
    } catch (error) {
      throw error;
    }
  },

  likeStory: async (storyId: string) => {
    try {
      const response = await api.post(`/success-stories/${storyId}/like`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  addComment: async (storyId: string, content: string) => {
    try {
      const response = await api.post(`/success-stories/${storyId}/comments`, {
        content,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getComments: async (storyId: string) => {
    try {
      const response = await api.get(`/success-stories/${storyId}/comments`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

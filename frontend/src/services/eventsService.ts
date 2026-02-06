import api from '../api/config';

export interface EventFilter {
  category?: string;
  location?: string;
  limit?: number;
  page?: number;
}

export const eventsService = {
  getEvents: async (filters?: EventFilter) => {
    try {
      const response = await api.get('/events', { params: filters });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getEventById: async (eventId: string) => {
    try {
      const response = await api.get(`/events/${eventId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createEvent: async (eventData: any) => {
    try {
      const response = await api.post('/events', eventData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateEvent: async (eventId: string, eventData: any) => {
    try {
      const response = await api.put(`/events/${eventId}`, eventData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteEvent: async (eventId: string) => {
    try {
      await api.delete(`/events/${eventId}`);
    } catch (error) {
      throw error;
    }
  },

  registerForEvent: async (eventId: string) => {
    try {
      const response = await api.post(`/events/${eventId}/register`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  unregisterFromEvent: async (eventId: string) => {
    try {
      await api.post(`/events/${eventId}/unregister`);
    } catch (error) {
      throw error;
    }
  },

  getMyEvents: async () => {
    try {
      const response = await api.get('/events/my-events');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAttendees: async (eventId: string) => {
    try {
      const response = await api.get(`/events/${eventId}/attendees`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

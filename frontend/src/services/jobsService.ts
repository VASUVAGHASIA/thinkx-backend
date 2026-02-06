import api from '../api/config';

export interface JobFilter {
  type?: 'full-time' | 'part-time' | 'contract';
  location?: string;
  salary?: string;
  limit?: number;
  page?: number;
}

export const jobsService = {
  getJobs: async (filters?: JobFilter) => {
    try {
      const response = await api.get('/jobs', { params: filters });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getJobById: async (jobId: string) => {
    try {
      const response = await api.get(`/jobs/${jobId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  postJob: async (jobData: any) => {
    try {
      const response = await api.post('/jobs', jobData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getMyJobs: async () => {
    try {
      const response = await api.get('/jobs/my-jobs');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateJob: async (jobId: string, jobData: any) => {
    try {
      const response = await api.put(`/jobs/${jobId}`, jobData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteJob: async (jobId: string) => {
    try {
      await api.delete(`/jobs/${jobId}`);
    } catch (error) {
      throw error;
    }
  },

  applyForJob: async (jobId: string) => {
    try {
      const response = await api.post(`/jobs/${jobId}/apply`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getApplications: async (jobId: string) => {
    try {
      const response = await api.get(`/jobs/${jobId}/applications`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

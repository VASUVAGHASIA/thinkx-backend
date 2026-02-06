import api from '../api/config';

export interface DonationData {
  amount: number;
  initiative: string;
  paymentMethod?: string;
  message?: string;
}

export const donationsService = {
  makeDonation: async (donationData: DonationData) => {
    try {
      const response = await api.post('/donations', donationData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getMyDonations: async () => {
    try {
      const response = await api.get('/donations/my-donations');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getDonationStats: async () => {
    try {
      const response = await api.get('/donations/stats');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getDonationsByInitiative: async (initiative: string) => {
    try {
      const response = await api.get(`/donations/initiative/${initiative}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAllDonations: async (limit?: number) => {
    try {
      const response = await api.get('/donations', {
        params: { limit: limit || 50 },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

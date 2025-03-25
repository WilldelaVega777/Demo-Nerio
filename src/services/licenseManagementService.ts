import axios from 'axios';

interface CreateMultipleLicenseKeysRequest {
  quantity: number;
  expirationDate: string;
}

interface LicenseKey {
  id: string;
  status: 'available' | 'active' | 'expired';
  expirationDate: Date | null;
  activationDate: Date | null;
  userId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const createMultipleLicenseKeys = async (data: CreateMultipleLicenseKeysRequest): Promise<LicenseKey[]> => {
  try {
    const response = await axios.post(`${API_URL}/license-keys/create-multiple`, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating license keys:', error);
    throw error;
  }
};
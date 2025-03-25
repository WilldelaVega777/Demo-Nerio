import axios from 'axios';

interface LicenseValidationResponse {
  valid: boolean;
  message?: string;
  licenseKey?: any;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const validateLicenseKey = async (licenseKey: string): Promise<LicenseValidationResponse> => {
  try {
    const response = await axios.post(`${API_URL}/license-keys/validate`, { licenseKey });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        valid: false,
        message: error.response.data.message || 'Invalid license key'
      };
    }
    return {
      valid: false,
      message: 'Error validating license key'
    };
  }
};

export const activateLicenseKey = async (licenseKey: string, userId: string): Promise<LicenseValidationResponse> => {
  try {
    const response = await axios.post(`${API_URL}/license-keys/activate`, { licenseKey, userId });
    return {
      valid: true,
      licenseKey: response.data
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        valid: false,
        message: error.response.data.message || 'Error activating license key'
      };
    }
    return {
      valid: false,
      message: 'Error activating license key'
    };
  }
};
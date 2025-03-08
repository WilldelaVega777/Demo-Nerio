import axios from 'axios';

interface LicenseValidationResponse {
  valid: boolean;
  message?: string;
}

const API_URL = 'http://localhost:3000';

export const validateLicenseKey = async (licenseKey: string): Promise<LicenseValidationResponse> => {
  try {
    const response = await axios.post(`${API_URL}/license/validate`, { licenseKey });
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
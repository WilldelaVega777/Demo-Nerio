import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Verifica si un email ya existe en la base de datos
 * @param email El email a verificar
 * @returns true si el email ya existe, false en caso contrario
 */
export const checkEmailExists = async (email: string): Promise<boolean> => {
  try {
    const response = await axios.get(`${API_URL}/auth/check-email-exists`, {
      params: { email }
    });
    return response.data.exists;
  } catch (error) {
    console.error('Error checking email existence:', error);
    return false;
  }
};

/**
 * Verifica un token de verificación de correo electrónico
 * @param token El token de verificación
 * @returns Un objeto con el resultado de la verificación
 */
export const verifyEmail = async (token: string): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await axios.get(`${API_URL}/auth/verify-email`, {
      params: { token }
    });
    return response.data;
  } catch (error) {
    console.error('Error verifying email:', error);
    if (axios.isAxiosError(error) && error.response?.data?.message) {
      return { success: false, message: error.response.data.message };
    }
    return { success: false, message: 'Error al verificar el correo electrónico' };
  }
};

/**
 * Reenvía el correo de verificación
 * @param email El correo electrónico al que reenviar la verificación
 * @returns Un objeto con el resultado del reenvío
 */
export const resendVerificationEmail = async (email: string): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await axios.post(`${API_URL}/auth/resend-verification`, { email });
    return response.data;
  } catch (error) {
    console.error('Error resending verification email:', error);
    if (axios.isAxiosError(error) && error.response?.data?.message) {
      return { success: false, message: error.response.data.message };
    }
    return { success: false, message: 'Error al reenviar el correo de verificación' };
  }
};
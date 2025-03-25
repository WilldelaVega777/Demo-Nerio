import axios from 'axios';
import { checkEmailExists, verifyEmail, resendVerificationEmail } from '../../services/authService';

// Mock de axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock axios.isAxiosError function
const isAxiosError = jest.fn().mockImplementation(<T = any, D = any>(error: any): error is import('axios').AxiosError<T, D> => {
  return error && error.response !== undefined;
}) as jest.MockedFunction<typeof axios.isAxiosError>;
mockedAxios.isAxiosError = isAxiosError;

describe('authService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('checkEmailExists', () => {
    test('returns true when email exists', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: { exists: true } });
      const result = await checkEmailExists('existing@example.com');
      expect(result).toBe(true);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_URL}/auth/check-email-exists`,
        { params: { email: 'existing@example.com' } }
      );
    });

    test('returns false when email does not exist', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: { exists: false } });
      const result = await checkEmailExists('new@example.com');
      expect(result).toBe(false);
    });

    test('returns false when API call fails', async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error('Network error'));
      const result = await checkEmailExists('test@example.com');
      expect(result).toBe(false);
    });
  });

  describe('verifyEmail', () => {
    test('returns success response when verification is successful', async () => {
      const successResponse = { success: true, message: 'Email verified successfully' };
      mockedAxios.get.mockResolvedValueOnce({ data: successResponse });
      
      const result = await verifyEmail('valid-token');
      
      expect(result).toEqual(successResponse);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_URL}/auth/verify-email`,
        { params: { token: 'valid-token' } }
      );
    });

    test('returns error response when verification fails', async () => {
      const errorMessage = 'Invalid or expired token';
      mockedAxios.get.mockRejectedValueOnce({
        response: { data: { message: errorMessage } }
      });
      
      const result = await verifyEmail('invalid-token');
      
      expect(result).toEqual({
        success: false,
        message: errorMessage
      });
    });

    test('returns generic error message when API call fails without response data', async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error('Network error'));
      
      const result = await verifyEmail('some-token');
      
      expect(result).toEqual({
        success: false,
        message: 'Error al verificar el correo electrónico'
      });
    });
  });

  describe('resendVerificationEmail', () => {
    test('returns success response when email is resent successfully', async () => {
      const successResponse = { success: true, message: 'Verification email sent' };
      mockedAxios.post.mockResolvedValueOnce({ data: successResponse });
      
      const result = await resendVerificationEmail('test@example.com');
      
      expect(result).toEqual(successResponse);
      expect(mockedAxios.post).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_URL}/auth/resend-verification`,
        { email: 'test@example.com' }
      );
    });

    test('returns error response when resending fails', async () => {
      const errorMessage = 'User not found';
      mockedAxios.post.mockRejectedValueOnce({
        response: { data: { message: errorMessage } }
      });
      
      const result = await resendVerificationEmail('unknown@example.com');
      
      expect(result).toEqual({
        success: false,
        message: errorMessage
      });
    });

    test('returns generic error message when API call fails without response data', async () => {
      mockedAxios.post.mockRejectedValueOnce(new Error('Network error'));
      
      const result = await resendVerificationEmail('test@example.com');
      
      expect(result).toEqual({
        success: false,
        message: 'Error al reenviar el correo de verificación'
      });
    });
  });
});
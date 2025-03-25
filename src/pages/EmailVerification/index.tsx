import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, Typography, Button, Alert, Spin, Result } from 'antd';
import { CheckCircleOutlined, MailOutlined } from '@ant-design/icons';
import { resendVerificationEmail } from '../../services/authService';

const EmailVerification: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // Obtener el email del state de la navegación
    if (location.state && location.state.email) {
      setEmail(location.state.email);
    } else {
      // Si no hay email en el state, redirigir al signup
      navigate('/signup');
    }
  }, [location, navigate]);

  const handleResendVerification = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      // Llamar al servicio para reenviar el correo de verificación
      const { success, message } = await resendVerificationEmail(email);
      
      if (!success) {
        throw new Error(message || 'Error al reenviar el correo de verificación');
      }
      
      setIsLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al reenviar el correo de verificación. Por favor, inténtalo de nuevo.');
      setIsLoading(false);
    }
  };

  // Ya no necesitamos el método handleVerifyEmail ya que la verificación se realiza a través del enlace enviado por correo

  const handleContinue = () => {
    // Redirigir al usuario al dashboard o a la página de licencia
    navigate('/dashboard');
  };

  if (isVerified) {
    return (
      <Card style={{ maxWidth: 500, margin: '40px auto', padding: '24px' }}>
        <Result
          status="success"
          title="¡Correo electrónico verificado!"
          subTitle="Tu cuenta ha sido verificada exitosamente."
          extra={[
            <Button type="primary" key="console" onClick={handleContinue}>
              Continuar al Dashboard
            </Button>
          ]}
        />
      </Card>
    );
  }

  return (
    <Card style={{ maxWidth: 500, margin: '40px auto', padding: '24px' }}>
      <Typography.Title level={2} style={{ textAlign: 'center', marginBottom: '24px' }}>
        Verifica tu correo electrónico
      </Typography.Title>

      {error && (
        <Alert
          message={error}
          type="error"
          showIcon
          style={{ marginBottom: '24px' }}
        />
      )}

      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <MailOutlined style={{ fontSize: 64, color: '#1890ff', marginBottom: '16px' }} />
        <Typography.Paragraph>
          Hemos enviado un correo de verificación a <strong>{email}</strong>.
          Por favor, revisa tu bandeja de entrada y haz clic en el enlace de verificación.
        </Typography.Paragraph>
        <Typography.Paragraph type="secondary">
          Si no encuentras el correo, revisa tu carpeta de spam o solicita un nuevo correo de verificación.
        </Typography.Paragraph>
      </div>

      <Button 
        type="primary" 
        block 
        onClick={handleResendVerification}
        loading={isLoading}
        style={{ marginBottom: '16px' }}
      >
        Reenviar correo de verificación
      </Button>

      <Button 
        type="link" 
        block 
        onClick={() => navigate('/login')}
      >
        Volver al inicio de sesión
      </Button>

      {/* El botón de simulación ha sido eliminado ya que ahora tenemos un sistema real de verificación */}
    </Card>
  );
};

export default EmailVerification;
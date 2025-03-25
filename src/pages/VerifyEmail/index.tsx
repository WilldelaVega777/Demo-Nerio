import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, Typography, Button, Alert, Result, Spin } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { verifyEmail } from '../../services/authService';

const VerifyEmail: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const verifyUserEmail = async () => {
      try {
        // Obtener el token de la URL
        const searchParams = new URLSearchParams(location.search);
        const token = searchParams.get('token');

        if (!token) {
          setError('Token de verificación no encontrado');
          setIsLoading(false);
          return;
        }

        // Verificar el token
        const result = await verifyEmail(token);
        
        if (result.success) {
          setIsVerified(true);
        } else {
          setError(result.message || 'Error al verificar el correo electrónico');
        }
      } catch (err) {
        setError('Error al procesar la verificación');
      } finally {
        setIsLoading(false);
      }
    };

    verifyUserEmail();
  }, [location]);

  const handleContinue = () => {
    // Redirigir al usuario a la página de verificación de licencia
    navigate('/license-verification', { state: { email: location.state?.email } });
  };

  if (isLoading) {
    return (
      <Card style={{ maxWidth: 500, margin: '40px auto', padding: '24px', textAlign: 'center' }}>
        <Spin size="large" />
        <Typography.Paragraph style={{ marginTop: '16px' }}>
          Verificando tu correo electrónico...
        </Typography.Paragraph>
      </Card>
    );
  }

  if (isVerified) {
    return (
      <Card style={{ maxWidth: 500, margin: '40px auto', padding: '24px' }}>
        <Result
          status="success"
          title="¡Correo electrónico verificado!"
          subTitle="Tu cuenta ha sido verificada exitosamente. Ahora puedes iniciar sesión."
          icon={<CheckCircleOutlined />}
          extra={[
            <Button type="primary" key="console" onClick={handleContinue}>
              Continuar a verificación de licencia
            </Button>
          ]}
        />
      </Card>
    );
  }

  return (
    <Card style={{ maxWidth: 500, margin: '40px auto', padding: '24px' }}>
      <Result
        status="error"
        title="Error de verificación"
        subTitle={error || 'No se pudo verificar tu correo electrónico'}
        icon={<CloseCircleOutlined />}
        extra={[
          <Button type="primary" key="console" onClick={() => navigate('/login')}>
            Volver al inicio de sesión
          </Button>
        ]}
      />
    </Card>
  );
};

export default VerifyEmail;
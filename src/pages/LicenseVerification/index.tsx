import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, Typography, Button, Alert, Result, Spin, Input, Form } from 'antd';
import { KeyOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { validateLicenseKey, activateLicenseKey } from '../../services/licenseService';
import { useAuth } from '../../providers/AuthProvider';

const LicenseVerification: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [email, setEmail] = useState<string>('');
  const [licenseKey, setLicenseKey] = useState<string>('');
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

  const handleVerifyLicense = async () => {
    if (!licenseKey.trim()) {
      setError('Por favor, ingresa una clave de licencia');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      // Llamar al servicio para verificar la licencia
      const result = await validateLicenseKey(licenseKey);
      
      if (result.valid) {
        // Si la licencia es válida, la activamos para el usuario actual
        if (user && user.id) {
          const activationResult = await activateLicenseKey(licenseKey, user.id);
          if (activationResult.valid) {
            setIsVerified(true);
          } else {
            setError(activationResult.message || 'Error al activar la licencia');
          }
        } else {
          // Si no hay usuario, simplemente marcamos como verificada
          setIsVerified(true);
        }
      } else {
        setError(result.message || 'Clave de licencia inválida o expirada');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al verificar la licencia. Por favor, inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinue = () => {
    // Redirigir al usuario al dashboard
    navigate('/dashboard');
  };

  if (isVerified) {
    return (
      <Card style={{ maxWidth: 500, margin: '40px auto', padding: '24px' }}>
        <Result
          status="success"
          title="¡Licencia verificada!"
          subTitle="Tu licencia ha sido verificada exitosamente. Ahora puedes acceder a todas las funcionalidades."
          icon={<CheckCircleOutlined />}
          extra={[
            <Button type="primary" key="console" onClick={handleContinue}>
              Ir al Dashboard
            </Button>
          ]}
        />
      </Card>
    );
  }

  return (
    <Card style={{ maxWidth: 500, margin: '40px auto', padding: '24px' }}>
      <Typography.Title level={2} style={{ textAlign: 'center', marginBottom: '24px' }}>
        Verificación de Licencia
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
        <KeyOutlined style={{ fontSize: 64, color: '#1890ff', marginBottom: '16px' }} />
        <Typography.Paragraph>
          Para continuar, necesitas verificar tu clave de licencia.
        </Typography.Paragraph>
        <Typography.Paragraph>
          Usuario: <strong>{email}</strong>
        </Typography.Paragraph>
      </div>

      <Form layout="vertical">
        <Form.Item label="Clave de Licencia" required>
          <Input
            placeholder="Ingresa tu clave de licencia"
            value={licenseKey}
            onChange={(e) => setLicenseKey(e.target.value)}
            style={{ backgroundColor: '#2a2a2a' }}
          />
        </Form.Item>

        <Button 
          type="primary" 
          block 
          onClick={handleVerifyLicense}
          loading={isLoading}
          style={{ marginBottom: '16px' }}
        >
          Verificar Licencia
        </Button>
      </Form>
    </Card>
  );
};

export default LicenseVerification;
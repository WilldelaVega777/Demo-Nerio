import React, { useState } from 'react';
import { Form, Input, Button, Typography, Card, Alert, DatePicker, InputNumber, List, Tooltip, message } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { createMultipleLicenseKeys } from '../../services/licenseManagementService';
import dayjs from 'dayjs';

interface LicenseKey {
  id: string;
  status: 'available' | 'active' | 'expired';
  expirationDate: Date | null;
  activationDate: Date | null;
  userId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export const LicenseManagement: React.FC = () => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [generatedLicenses, setGeneratedLicenses] = useState<LicenseKey[]>([]);

  const handleSubmit = async (values: { quantity: number; expirationDate: dayjs.Dayjs }) => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await createMultipleLicenseKeys({
        quantity: values.quantity,
        expirationDate: values.expirationDate.format('YYYY-MM-DD')
      });
      
      setGeneratedLicenses(response);
      form.resetFields();
      message.success(`Se han generado ${response.length} licencias correctamente`);
    } catch (err) {
      setError('Error al generar las licencias. Por favor, inténtelo de nuevo.');
      console.error('Error generating licenses:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    message.success('Licencia copiada al portapapeles');
  };

  const copyAllToClipboard = () => {
    const allLicenses = generatedLicenses.map(license => license.id).join('\n');
    navigator.clipboard.writeText(allLicenses);
    message.success('Todas las licencias copiadas al portapapeles');
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '24px' }}>
      <Typography.Title level={2} style={{ textAlign: 'center', marginBottom: '24px' }}>
        Gestión de Licencias
      </Typography.Title>

      <Card title="Generar Nuevas Licencias" style={{ marginBottom: '24px' }}>
        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            style={{ marginBottom: '24px' }}
          />
        )}

        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          requiredMark="optional"
        >
          <Form.Item
            label="Cantidad de Licencias"
            name="quantity"
            rules={[{ required: true, message: 'Por favor ingrese la cantidad de licencias a generar' }]}
          >
            <InputNumber min={1} max={100} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label="Fecha de Expiración"
            name="expirationDate"
            rules={[{ required: true, message: 'Por favor seleccione una fecha de expiración' }]}
          >
            <DatePicker style={{ width: '100%' }} disabledDate={(current) => current && current < dayjs().endOf('day')} />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={isLoading}
            >
              {isLoading ? 'Generando...' : 'Generar Licencias'}
            </Button>
          </Form.Item>
        </Form>
      </Card>

      {generatedLicenses.length > 0 && (
        <Card 
          title="Licencias Generadas" 
          extra={(
            <Button type="link" onClick={copyAllToClipboard}>
              Copiar Todas
            </Button>
          )}
        >
          <List
            bordered
            dataSource={generatedLicenses}
            renderItem={(license) => (
              <List.Item
                actions={[
                  <Tooltip title="Copiar al portapapeles">
                    <Button 
                      icon={<CopyOutlined />} 
                      onClick={() => copyToClipboard(license.id)}
                      type="text"
                    />
                  </Tooltip>
                ]}
              >
                <Typography.Text copyable>{license.id}</Typography.Text>
              </List.Item>
            )}
          />
        </Card>
      )}
    </div>
  );
};

export default LicenseManagement;
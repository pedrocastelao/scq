import React, { useState } from 'react';
import { Input, QRCode, Space, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const ConfirmarPagamento = () => {
  const [text, setText] = useState('https://ant.design/');
  const navigate = useNavigate();

  return (
    <Space direction="vertical" align="center" style={{ padding: '50px' }}>
      <h2>Confirmação de Pagamento</h2>
      <QRCode value={text || '-'} />
      <Input
        placeholder="Insira o texto ou URL para gerar o QR code"
        maxLength={60}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button type="primary" onClick={() => navigate('/')}>
        Voltar para Home
      </Button>
    </Space>
  );
};

export default ConfirmarPagamento;

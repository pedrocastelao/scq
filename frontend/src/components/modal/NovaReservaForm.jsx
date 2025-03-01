import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { quadrasService } from "../../hooks/apiServices";
import { format, isAfter, isSameDay } from "date-fns";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  color: #333;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 8px 12px;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

const Select = styled.select`
  padding: 8px 12px;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  font-size: 14px;
  background-color: white;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }
`;

const NovaReservaForm = ({ onClose, onSubmit }) => {
  const { getQuadras } = quadrasService;
  const [formData, setFormData] = useState({
    nome: "",
    dataInicio: format(new Date(), "yyyy-MM-dd"),
    horaInicio: "",
    dataFim: format(new Date(), "yyyy-MM-dd"),
    horaFim: "",
    quadraId: "",
  });
  const [quadras, setQuadras] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Buscar quadras do backend
    const fetchQuadras = async () => {
      try {
        const response = await getQuadras();
        // console.log(response.data);

        setQuadras(response.data);
      } catch (error) {
        console.error("Erro ao buscar quadras:", error);
      }
    };

    fetchQuadras();
  }, []);

  // Gerar horários disponíveis (apenas horas exatas)
  const getHorariosDisponiveis = (isHoraFim = false, horaInicio = "") => {
    const horarios = [];
    const now = new Date();
    const today = format(now, "yyyy-MM-dd");
    const isToday = formData.dataInicio === today;

    for (let i = 8; i <= 22; i++) {
      const hora = `${i.toString().padStart(2, "0")}:00`;

      if (isHoraFim) {
        // Para hora fim, só mostrar horários depois da hora início e no máximo 2h depois
        if (hora <= horaInicio) continue;

        const horaInicioNum = parseInt(horaInicio.split(":")[0]);
        if (i > horaInicioNum + 2) continue; // Limita a 2h após hora início
      } else if (isToday) {
        // Para hora início hoje, só mostrar horários futuros
        const horaAtual = now.getHours();
        if (i <= horaAtual) continue;
      }

      horarios.push(hora);
    }

    return horarios;
  };

  const validateForm = () => {
    const errors = {};
    const now = new Date();
    const dataInicioDate = new Date(
      `${formData.dataInicio}T${formData.horaInicio}`
    );
    const dataFimDate = new Date(`${formData.dataFim}T${formData.horaFim}`);

    // Validar data início
    if (dataInicioDate < now) {
      errors.dataInicio = "A data e hora de início deve ser futura";
    }

    // Validar data fim
    if (!isSameDay(dataInicioDate, dataFimDate)) {
      errors.dataFim = "A data de fim deve ser a mesma que a data de início";
    }

    // Validar hora fim
    if (!isAfter(dataFimDate, dataInicioDate)) {
      errors.horaFim = "A hora de fim deve ser maior que a hora de início";
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const reservaData = {
      nome: formData.nome,
      dataInicio: new Date(
        `${formData.dataInicio}T${formData.horaInicio}`
      ).toISOString(),
      dataFim: new Date(
        `${formData.dataFim}T${formData.horaFim}`
      ).toISOString(),
      quadraId: formData.quadraId,
      status: "FUTURA",
    };
    onSubmit(reservaData);
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormGroup>
        <Label>Nome</Label>
        <Input
          type="text"
          required
          value={formData.nome}
          onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
        />
      </FormGroup>

      <FormGroup>
        <Label>Data</Label>
        <Input
          type="date"
          required
          min={format(new Date(), "yyyy-MM-dd")}
          value={formData.dataInicio}
          onChange={(e) => {
            setFormData({
              ...formData,
              dataInicio: e.target.value,
              dataFim: e.target.value, // Atualiza data fim automaticamente
              horaInicio: "", // Reseta horários ao mudar a data
              horaFim: "",
            });
            setErrors({});
          }}
        />
        {errors.dataInicio && <ErrorMessage>{errors.dataInicio}</ErrorMessage>}
      </FormGroup>

      <FormGroup>
        <Label>Hora de Início</Label>
        <Select
          required
          value={formData.horaInicio}
          onChange={(e) => {
            setFormData({
              ...formData,
              horaInicio: e.target.value,
              horaFim: "", // Reseta hora fim ao mudar hora início
            });
            setErrors({});
          }}
        >
          <option value="">Selecione um horário</option>
          {getHorariosDisponiveis().map((hora) => (
            <option key={hora} value={hora}>
              {hora}
            </option>
          ))}
        </Select>
      </FormGroup>

      <FormGroup>
        <Label>Hora de Fim</Label>
        <Select
          required
          value={formData.horaFim}
          onChange={(e) => {
            setFormData({ ...formData, horaFim: e.target.value });
            setErrors({});
          }}
          disabled={!formData.horaInicio}
        >
          <option value="">Selecione um horário</option>
          {getHorariosDisponiveis(true, formData.horaInicio).map((hora) => (
            <option key={hora} value={hora}>
              {hora}
            </option>
          ))}
        </Select>
        {errors.horaFim && <ErrorMessage>{errors.horaFim}</ErrorMessage>}
      </FormGroup>

      <FormGroup>
        <Label>Quadra</Label>
        <Select
          required
          value={formData.quadraId}
          onChange={(e) =>
            setFormData({ ...formData, quadraId: e.target.value })
          }
        >
          <option value="">Selecione uma quadra</option>
          {quadras.map((quadra) => (
            <option key={quadra.id} value={quadra.id}>
              {quadra.localizacao}
            </option>
          ))}
        </Select>
      </FormGroup>

      <SubmitButton type="submit">Criar Reserva</SubmitButton>
    </FormContainer>
  );
};

const ErrorMessage = styled.span`
  color: #dc3545;
  font-size: 12px;
  margin-top: 4px;
`;
export default NovaReservaForm;

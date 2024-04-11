const nodemailer = require("nodemailer");

const emailController = {
  sendConfirmEmail: async (nome, email, token) => {
    // Configure o transportador de email
    console.log("Chega aqui ?");
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "castelao.pedro2@gmail.com", // Substitua pelo seu email
        pass: "habv efaq ahxz ijuq", // Substitua pela sua senha
      },
    });
    const mailOptions = {
      from: "Sitema de Controle de Quadras <castelao.pedro2@gmail.com>",
      to: email,
      subject: "Confirmação de Cadastro - SCQ",
      text: `
    Olá ${nome},

    Obrigado por se cadastrar no SCQ! Por favor, clique no link abaixo para confirmar seu endereço de e-mail e concluir seu registro:

    [Link de Confirmação]([link para endpoint de confirmação]?token=${token})

    Este link é válido por 24 horas. Se você não confirmar seu e-mail dentro desse período, precisará solicitar um novo link de confirmação.

    Obrigado,

    Equipe SCQ
  `,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log("Email de confirmação enviado com sucesso");
    } catch (error) {
      console.error("Erro ao enviar email de confirmação:", error);
    }
  },
};

module.exports = emailController;

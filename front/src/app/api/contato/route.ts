import ContatoEmail from '@/components/Emails/ContatoEmail';
import { emailService } from '@/services/emailService';
import { render } from '@react-email/render';
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, message } = await request.json();

    // Criar o HTML dos dados como você já fazia
    const html = `
      <p><b>Nome: </b>${name}</p>
      <p><b>E-mail: </b>${email}</p>
      <p><b>Telefone: </b>${phone}</p>
      <p><b>Mensagem: </b><br> ${message}</p>
    `;

    // Renderizar seu componente ContatoEmail usando react-email
    const emailHtml = await render(ContatoEmail({ html }));

    // Preparar parâmetros para o service
    const serviceParams = {
      name: "Contato",
      to: "diegoricardoweb@gmail.com",
      subject: "Contato via site",
      htmlContent: emailHtml, // HTML renderizado do seu componente
    };

    // Chamar o emailService.send
    const result = await emailService.send(serviceParams);

    return NextResponse.json({ success: true, data: result });

  } catch (error) {
    console.error("Erro ao enviar email de contato:", error);

    if (axios.isAxiosError(error)) {
      console.error("Erro do Axios:", error.response?.data);
      return NextResponse.json(
        { error: error.response?.data?.message || 'Erro ao enviar email' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Erro desconhecido ao enviar email' },
      { status: 500 }
    );
  }
}
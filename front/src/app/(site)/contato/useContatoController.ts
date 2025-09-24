import { sendMailAction } from "@/app/actions/emails/send-mail";
import { contatoSchema } from "@/schemas/contatoSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

type FormData = z.infer<typeof contatoSchema>

export function useContatoController() {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(contatoSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      accept: false,
    },
  })

  function resetStatusMessage() {
    setSuccess(false);
  }

  const handleSubmit = form.handleSubmit(async (data) => {
    console.log({data});
    try {
      setIsLoading(true)

      const payload = {
        name: "Contato",
        to: "diegoricardoweb@gmail.com",
        subject: "Contato via site",
        htmlContent: `
          <p><b>Nome: </b>${data.name}</p>
          <p><b>E-mail: </b>${data.email}</p>
          <p><b>Telefone: </b>${data.phone}</p>
          <p><b>Mensagem: </b><br> ${data.message}</p>
        `
      }

      await sendMailAction(payload);
      
      setSuccess(true);
      form.reset()
    } catch (error) {
      console.log('error', error);
      setError(true);
    } finally {
      setIsLoading(false)
    }
  })

  return {
    form,
    isLoading,
    success,
    error,
    handleSubmit,
    resetStatusMessage
  }
}
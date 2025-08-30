import { getEmailAction } from "@/app/actions/emails/get-email";
import { Email } from "@/entities/Email";
import { useState } from "react";

export function useEmailsController() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [idEmail, setIdEmail] = useState('');
  const [emailItem, setEmailItem] = useState<Email>();

  const handleSee = async (idCategory: string) => {
    const email = await getEmailAction(idCategory);
    setIdEmail(idCategory);
    setEmailItem(email);
    setIsDialogOpen(true);
  };

  return {
    isDialogOpen,
    emailItem,
    handleSee,
    setIsDialogOpen
  }
}
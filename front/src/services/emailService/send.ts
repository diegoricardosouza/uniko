import { httpClient } from "../httpClient";

export interface EmailsParams {
  name: string;
  to: string;
  subject: string;
  htmlContent: string;
  attachments?: string | File | undefined;
}

export async function send(params: EmailsParams) {
  const formData = new FormData();

  formData.append("name", params.name);
  formData.append("to", params.to);
  formData.append("subject", params.subject);
  formData.append("htmlContent", params.htmlContent);

  if (params.attachments) formData.append("attachments", params.attachments);

  const { data } = await httpClient.post("/emails/send", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
}
/* eslint-disable @typescript-eslint/no-explicit-any */
import { httpClient } from "../httpClient";

export interface EmailsParams {
  name: string;
  to: string;
  subject: string;
  htmlContent: string;
  attachments?: File[] | undefined;
}

export async function send(params: EmailsParams) {
  const formData = new FormData();

  formData.append("name", params.name);
  formData.append("to", params.to);
  formData.append("subject", params.subject);
  formData.append("htmlContent", params.htmlContent);

  // if (params.attachments) formData.append("attachments", params.attachments);

  if (params.attachments && params.attachments.length > 0) {
    params.attachments.forEach((file: any) => {
      formData.append("attachments", file);
    });
  }

  const { data } = await httpClient.post("/emails/send", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
}
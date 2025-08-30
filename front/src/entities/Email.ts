
type Attach = {
  id: string;
  filename: string;
  mimetype: string;
  size: number;
}

export interface Email {
  id: string;
  name: string;
  to: string;
  subject: string;
  htmlContent: string;
  // attachments?: (string | File | undefined)[];
  attachments?: Attach[];
  status?: string;
  createdAt?: string;
}
export interface SupportFormType {
  title: string;
  message: string;
  category: string;
  attachments?: Attachment[];
}

export interface SupportMessageFormType {
  message: string;
  attachments?: Attachment[];
}

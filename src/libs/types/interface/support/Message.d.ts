interface Message {
  id: string;
  messages: string;
  attachments: Attachment[];
  sender: 'admin' | 'user';
  createdAt: string;
}

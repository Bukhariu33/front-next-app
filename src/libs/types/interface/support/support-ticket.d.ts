export interface SupportTicket {
  id: string;
  code: string;

  title: string;
  category: string;
  status: 'open' | 'inProgress' | 'resolved' | 'closed';
  messages: number;

  createdAt: string;
  updatedAt: string;
}

export type BESupportTicket = Omit<
  SupportTicketCard,
  'status',
  TEnum<SupportTicket['status']>
>;

export type APIResponseSupportList = APIResponse<SupportTicket[]>;

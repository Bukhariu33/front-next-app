import { axiosInternal } from '@/libs/configs/axios';
import { createQKey, createQueryOptions } from '@/libs/packages/queryBuilder';

export const getSupportTicketMessagesQueryOptions = createQueryOptions({
  key: createQKey('Global', 'support-messages'),
  detail: (ticketId: string) => ({
    queryFn: async () => {
      const { data } = await axiosInternal.get(`/support/${ticketId}/messages`);

      const { data: innerData } = data;
      return innerData.map(
        (
          message: Message & {
            sender: {
              name: string;
              value: string;
              description: string;
            };
          },
        ) => {
          const { sender, ...otherProps } = message;
          return {
            ...otherProps,
            sender: sender.value,
          };
        },
      );
    },
    enabled: !!ticketId,
  }),
});

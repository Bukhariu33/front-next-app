import { Box, Center, Flex, Text } from '@mantine/core';

import OwaisLogo from '@/libs/icons/OwaisLogo';
import { cn } from '@/utils/cn';

import Attachment from '../Base/Attachment';

interface SupportMessageProps {
  message: Message;
}

export default function SupportMessage({ message }: SupportMessageProps) {
  const isAdminMessage = message?.sender === 'admin';

  return (
    <Box
      className={cn('rounded-[10px] p-4', {
        'bg-[#FFCA2826]': isAdminMessage,
        'bg-[#F5F7F9]': !isAdminMessage,
      })}
    >
      <Flex justify="space-between" direction="row-reverse">
        <Text className="font-medium text-[#64646C]">
          {message && message.createdAt && (
            <span>{new Date(message.createdAt).toLocaleString()}</span>
          )}
        </Text>
        {isAdminMessage && (
          <Center className="h-[43px] w-[74px] overflow-hidden rounded-[10px] bg-white">
            <OwaisLogo className="mx-2 w-full" />
          </Center>
        )}
      </Flex>
      <Text className="mt-4 font-medium text-[#64646C]">
        {message.messages}
      </Text>
      <Box className="mt-4 grid gap-4 md:flex">
        {message?.attachments?.map((attachment: Attachment) => (
          <Box key={attachment.key} className="rounded-[1.2rem] bg-white">
            <Attachment
              key={attachment.key}
              name={attachment.name}
              fileSrc={attachment.name}
              fileType={attachment.type}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

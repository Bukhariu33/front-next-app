import { Avatar, SimpleGrid, Stack, Text } from '@mantine/core';
import type { FC } from 'react';

import type { AdminFund } from '@/libs/types/interface/fund';

import BasePanel from '../BasePanel';

type Team = AdminFund['fundTeam'];

const TeamPanel: FC<{ members: Team }> = ({ members }) => {
  return (
    <BasePanel>
      <SimpleGrid className=" grid-cols-[repeat(auto-fit,142px)] justify-between gap-[61px] text-center">
        {members.map(member => {
          return (
            <Stack
              key={member.id}
              className="w-[151px] items-center gap-[10px]"
            >
              <Avatar
                src="/avatar.png"
                alt={`${member.name} image`}
                size={142}
                classNames={{
                  root: 'shadow-sm',
                  placeholder: 'bg-white',
                }}
              />
              <Text className="text-[1.75rem] font-medium leading-[1.28571] tracking-[-0.56px]">
                {member.name}
              </Text>
              <Text className="text-2xl font-normal leading-[1.33333] tracking-[-0.48px] text-brand-accent-500">
                {member.position}
              </Text>
            </Stack>
          );
        })}
      </SimpleGrid>
    </BasePanel>
  );
};

export default TeamPanel;

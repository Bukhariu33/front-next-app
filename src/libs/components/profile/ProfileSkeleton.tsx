import { Box, Flex, SimpleGrid, Skeleton } from '@mantine/core';
import type { FC } from 'react';

import { ProfileLayout } from '@/libs/components/profile/ProfileLayout';
import type { UserType } from '@/libs/types/auth/user';

const ProfileSkeleton: FC<{ userType?: UserType; isEditable?: boolean }> = ({
  userType,
  isEditable,
}) => {
  // Helper function to render skeleton for edit form
  const renderEditableSkeleton = () => (
    <>
      <Skeleton width={250} height={21} mb="xl" />
      <Box>
        <Skeleton width={187} height={15} mb={16} />
        <Skeleton width="100%" height={60} />
      </Box>
      <SimpleGrid className="mt-[32px] gap-x-[42px] gap-y-[16px] sm:grid-cols-2">
        <Box>
          <Skeleton width={187} height={15} mb={16} />
          <Skeleton width="100%" height={60} />
        </Box>
        <Box>
          <Skeleton width={187} height={15} mb={16} />
          <Skeleton width="100%" height={60} />
        </Box>
      </SimpleGrid>
      <SimpleGrid className="mt-[32px] gap-x-[42px] gap-y-[16px] sm:grid-cols-2">
        <Box>
          <Skeleton width={187} height={15} mb={16} />
          <Skeleton width="100%" height={60} />
        </Box>
        <Box>
          <Skeleton width={187} height={15} mb={16} />
          <Skeleton width="100%" height={60} />
        </Box>
      </SimpleGrid>
      <Box className="mt-[32px]">
        <Skeleton width={187} height={15} mb={16} />
        <Skeleton width="100%" height={60} />
      </Box>
    </>
  );

  // Helper function to render skeleton for non-CooperateInvestor owais-users
  const renderNonCooperateInvestorSkeleton = () => (
    <>
      <Skeleton width={193} height={21} mb="xl" />
      <Flex className="flex-wrap gap-[42px]">
        <Box className="w-[182px]">
          <Skeleton width={67} height={14} mb={11} />
          <Skeleton width={139} height={15.75} />
        </Box>
        <Box className="w-[129px]">
          <Skeleton width={67} height={14} mb={11} />
          <Skeleton width={98} height={15.75} />
        </Box>
        <Box className="w-[130px]">
          <Skeleton width={89} height={14} mb={11} />
          <Skeleton width={39} height={15.75} ml={14} />
        </Box>
        <Box>
          <Skeleton width={89} height={14} mb={11} />
          <Skeleton width={39} height={15.75} />
        </Box>
      </Flex>
      <Flex className="mt-[30px] flex-wrap gap-[42px]">
        <Box className="w-[182px]">
          <Skeleton width={67} height={14} mb={11} />
          <Skeleton width={139} height={15.75} />
        </Box>
        <Box className="w-[129px]">
          <Skeleton width={67} height={14} mb={11} />
          <Skeleton width={98} height={15.75} />
        </Box>
        <Box className="w-[130px]">
          <Skeleton width={89} height={14} mb={11} />
          <Skeleton width={39} height={15.75} ml={14} />
        </Box>
        <Box>
          <Skeleton width={89} height={14} mb={11} />
          <Skeleton width={39} height={15.75} />
        </Box>
      </Flex>
      <Box>
        <Skeleton width={87} height={15.75} mt={32} />
        <Skeleton width="min(100%,797px)" height={89} mt={38} />
      </Box>
    </>
  );

  // Helper function to render skeleton for other user types
  const renderDefaultSkeleton = () => (
    <>
      <Skeleton width={193} height={21} mb="xl" />
      <Flex className="flex-wrap justify-between gap-[32px]">
        <Box>
          <Skeleton width={66} height={15.75} mb={13} />
          <Skeleton width={348} height={15.75} mb={7} />
          <Skeleton width={305} height={15.75} />
        </Box>
        <Flex className="flex-wrap gap-[40px]">
          <Box>
            <Skeleton width={76} height={14} />
            <Skeleton width={87} height={15.75} mt={11} />
          </Box>
          <Box>
            <Skeleton width={115} height={14} />
            <Skeleton width={80} height={15.75} mt={11} />
          </Box>
          <Box>
            <Skeleton width={98} height={14} />
            <Skeleton width={67} height={15.75} mt={11} />
          </Box>
          <Box>
            <Skeleton width={115} height={14} />
            <Skeleton width={80} height={15.75} mt={11} />
          </Box>
        </Flex>
      </Flex>
      <Box className="mt-[32px]">
        <Skeleton width={133} height={15.75} />
        <Skeleton width="min(748px, 100%)" height={15.75} mt={13} />
      </Box>
      <Box className="mt-[32px]">
        <Skeleton width={99} height={15.75} mb={30} />
        <Skeleton width="min(100%, 797px)" height={89} />
      </Box>
      <Box className="mt-[60px]">
        <Skeleton width="min(100%,250px)" height={21} mb="xl" />
        <Flex className="flex-wrap gap-[40px]">
          <Box>
            <Skeleton width={76} height={14} />
            <Skeleton width={87} height={15.75} mt={11} />
          </Box>
          <Box>
            <Skeleton width={115} height={14} />
            <Skeleton width={80} height={15.75} mt={11} />
          </Box>
          <Box>
            <Skeleton width={98} height={14} />
            <Skeleton width={67} height={15.75} mt={11} />
          </Box>
        </Flex>
      </Box>
    </>
  );

  return (
    <ProfileLayout>
      {isEditable && renderEditableSkeleton()}
      {!isEditable &&
        userType !== 'corporateInvestor' &&
        renderNonCooperateInvestorSkeleton()}
      {!isEditable &&
        userType === 'corporateInvestor' &&
        renderDefaultSkeleton()}
    </ProfileLayout>
  );
};

export default ProfileSkeleton;

import { Card, SimpleGrid } from '@mantine/core';
import { useEffect, useRef } from 'react';

import Button from '@/libs/components/Base/Buttons/Button';
import Input from '@/libs/components/Base/inputs/input';
import { ProfileSectionLayout } from '@/libs/components/profile/ProfileSectionLayout';

export default function Profile() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // scrolling to the form
  useEffect(() => {
    const section = sectionRef.current;
    if (section)
      window.scrollTo({
        top: section.offsetTop,
      });
  }, [sectionRef]);

  return (
    <Card className="mt-5">
      <ProfileSectionLayout
        title="updateProfile"
        className="mt-[60px] gap-[30px]"
      >
        <SimpleGrid className="gap-[30px]" ref={sectionRef}>
          <SimpleGrid className="grid-cols-2 gap-[30px] max-sm:grid-cols-1">
            <Input
              namespace="auth"
              label="firstName"
              placeholder="firstName"
              type="text"
            />
            <Input
              namespace="auth"
              label="lastName"
              placeholder="lastName"
              type="text"
            />
          </SimpleGrid>

          <SimpleGrid className="grid-cols-2 gap-[30px] max-sm:grid-cols-1">
            <Input
              namespace="auth"
              label="email"
              placeholder="email"
              type="text"
            />
            <Input
              namespace="auth"
              label="phoneNumber"
              placeholder="phoneNumber"
              type="text"
            />
            <Input
              namespace="auth"
              label="Country"
              placeholder="Country"
              type="text"
            />
          </SimpleGrid>
        </SimpleGrid>
        <div>
          <Button
            namespace="profile"
            text="update"
            className="float-right w-[10rem]"
          />
        </div>
      </ProfileSectionLayout>
    </Card>
  );
}

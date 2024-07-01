import { Box, Divider, Stack } from '@mantine/core';
import { FieldArray, useFormikContext } from 'formik';
import type { FC } from 'react';

import Card from '@/libs/admin/components/funds/fund-form-elements/Card';
import Counter from '@/libs/admin/components/funds/fund-form-elements/Counter';
import Team from '@/libs/admin/components/funds/fund-form-elements/TeamMember';
import type {
  FrequentPayoutFundsValidationType,
  TeamMemberValidationType,
} from '@/libs/validations/admin/fund-form-validation';
import { cn } from '@/utils/cn';

const teamMember: TeamMemberValidationType = {
  name: '',
  image: '',
  position: '',
};

const FundTeam: FC<{
  mode?: 'create' | 'edit';
}> = ({ mode = 'create' }) => {
  const {
    values: { fundTeam, nameEn: name },
    setFieldValue,
    getFieldProps,
    errors,
    touched,
  } = useFormikContext<FrequentPayoutFundsValidationType>();

  const fundTeamCount = fundTeam?.length || 1;
  if (!fundTeam) return null;
  return (
    <FieldArray
      name="fundTeam"
      validateOnChange
      render={arrayHelpers => (
        <Card
          title="fundTeam"
          classNames={{ actions: 'gap-[100px]' }}
          actions={
            <Counter
              initialCount={fundTeamCount}
              min={1}
              max={10}
              onIncrease={() => {
                arrayHelpers.push(teamMember);
              }}
              onDecrease={c => {
                arrayHelpers.remove(c);
              }}
            />
          }
        >
          <Stack className="gap-[30px]">
            {Array.isArray(fundTeam) &&
              fundTeam?.map((_, idx) => (
                <Box
                  key={
                    // eslint-disable-next-line react/no-array-index-key
                    `fundTeam-member-${idx}-fund-${name}`
                  }
                >
                  <Team
                    mode={mode}
                    index={idx}
                    setFieldValue={setFieldValue}
                    getFieldProps={getFieldProps}
                    errors={errors}
                    touched={touched}
                  />
                  <Divider
                    className={cn('mt-[30px] h-[1px] w-full bg-gray-300', {
                      hidden: idx === fundTeamCount - 1,
                    })}
                  />
                </Box>
              ))}
          </Stack>
        </Card>
      )}
    />
  );
};

export default FundTeam;

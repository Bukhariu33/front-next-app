import { Box, Switch } from '@mantine/core';
import { useFormikContext } from 'formik';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import Card from '@/libs/admin/components/funds/fund-form-elements/Card';
import InputErrorMessage from '@/libs/components/Base/inputs/input-error-message';
import Map from '@/libs/packages/maps/map';
import type { FrequentPayoutFundsValidationType } from '@/libs/validations/admin/fund-form-validation';

export default function SelectFundLocation() {
  const [checked, setChecked] = useState(false);
  const { setFieldValue, values, touched, errors } =
    useFormikContext<FrequentPayoutFundsValidationType>();
  const { t } = useTranslation('common');

  return (
    <Card
      title="selectFundLocation"
      classNames={{
        actions: 'justify-between',
      }}
      actions={
        <Switch
          label={t('useCurrentLocation')}
          labelPosition="left"
          checked={checked}
          onChange={event => setChecked(event.currentTarget.checked)}
        />
      }
    >
      <Box className="relative h-[357px] overflow-hidden rounded-[15px]">
        <Map
          location={
            values.location as {
              lat: number;
              lng: number;
            }
          }
          useCurrentLocation={checked}
          onPlaceChanged={({ location, _place, place }) => {
            setFieldValue('location', {
              lat: location.lat,
              lng: location.lng,
              place,
              _place,
            });
          }}
        />
      </Box>
      <InputErrorMessage
        message={t(
          t(touched?.location && (errors.location as any), {
            ns: 'error',
          }),
        )}
      />
    </Card>
  );
}

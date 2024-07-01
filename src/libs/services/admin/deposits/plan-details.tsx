import { Button, Divider, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useQuery } from '@tanstack/react-query';

import { getUserPlanDetailsQueryOptions } from '../../user/user-current-plan';

interface PlanDetailsProps {
  rowData: any;
}
const PlanDetails = ({ rowData }: PlanDetailsProps) => {
  const [opened, { open, close }] = useDisclosure(false);

  const { data: planDetails } = useQuery(
    getUserPlanDetailsQueryOptions.details(
      // eslint-disable-next-line no-underscore-dangle
      rowData?.rowData?.userData?._id,
    ),
  );

  return (
    <div>
      <Button onClick={open}>Plan Details</Button>
      <Modal opened={opened} onClose={close} title="Plan Details" centered>
        <h3>
          Plan: <span>{planDetails?.subscription?.plan?.name}</span>
        </h3>
        <Divider />
        <h3>
          Price: <span>{planDetails?.subscription?.plan?.planPrice}</span>
        </h3>
      </Modal>
    </div>
  );
};

export default PlanDetails;

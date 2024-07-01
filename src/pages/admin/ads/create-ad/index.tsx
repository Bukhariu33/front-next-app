import AdsFormBody from '@/libs/admin/components/Ads/ads-form';
import AdminIndexLayout from '@/libs/admin/layout/index-layout';

const CreateAd = () => {
  return (
    <AdminIndexLayout>
      <AdsFormBody type="create" />
    </AdminIndexLayout>
  );
};

export default CreateAd;

import type { Profile } from '@/libs/types/profile';

export const MOCKED_USER = {
  isKycComplete: false,
  type: 'corporateInvestor',
  fullName: 'Bader Rashed Salah Alobaidi',
  email: 'fund-manager9@app.com',
  gender: 'Male',
  nationality: 'Saudi',
  nationalId: 1083894129,
  birthDate: '14/11/1994',
  mobile: '+966 55-636-3243',
  maritalStatus: 'single',
  jobTitle: '-',
  address: {
    unitNum: '11',
    streetNum: '12',
    city: 'Egypt',
    buildingNum: '20',
    zone: '33',
    postalCode: '383873',
  },
  corporate: {
    name: 'شركة أويس الاصول لتقنية المالية في أعمال الأوراق المالية شركة شخص واحد',
    crNumber: '12/11/1994',
    issuanceDate: '12/11/1994',
    expiryDate: '12/11/2028',
    city: 'الرياض',
    activities: [
      {
        id: '649921',
        name: 'أنشطة الاستثمار للحساب الخاص للوحدات المعنية ، يشمل شركات رؤوس الأموال المجازفة، ونوادي الاستثمار',
      },
      {
        id: '661221',
        name: 'التعامل في الأوراق المالية',
      },
      {
        id: '661907',
        name: 'التقنية المالية في أعمال الأوراق المالية',
      },
      {
        id: '663002',
        name: 'إدارة الاستثمارات وتشغيل الصناديق',
      },
      {
        id: '663003',
        name: 'إدارة الاستثمارات',
      },
    ],
    createdAt: '12/11/1994',
    updatedAt: '12/11/1994',
  },
} satisfies Profile;

function useUserMock() {
  return {
    user: MOCKED_USER,
  };
}

export default useUserMock;

const getInvestorSettingsMock = () => {
  return {
    en: {
      status: 200,
      data: {
        accountUpgradeConditions: [
          {
            key: 'generalCertificateToDeal',
            label:
              'To hold a general certificate to deal in securities accredited by the regulatory authority, provided that their annual income is not less than six hundred thousand Saudi riyals in the past two years.',
          },
          {
            key: 'netAssetValueMoreThan5M',
            label:
              'Do not state a net asset value less than five million Saudi riyals.',
          },
          {
            key: 'professionalExperienceInSecuritiesInvestment',
            label:
              'To have worked, or previously worked for at least three years, in a professional capacity related to securities investment in the financial sector.',
          },
          {
            key: 'specializedCertificateInFinancialPaperwork',
            label:
              'To have obtained a specialized professional certificate in the field of financial paperwork from a recognized international entity.',
          },
          {
            key: 'stockTradesMoreThan40M',
            label:
              'To have carried out transactions in the stock markets, the total value of which is not less than forty million Saudi riyals and no less than ten transactions every quarter during the past twelve months.',
          },
        ],
        annualIncomeOptions: [
          {
            key: '100kTo300k',
            label: 'SAR 100,001 - 300,000,',
          },
          {
            key: '10mTo50m',
            label: 'SAR 10,000,001 - 50,000,000,',
          },
          {
            key: '1500kTo5m',
            label: 'SAR 1,500,001 - 5,000,000,',
          },
          {
            key: '300kTo600k',
            label: 'SAR 300,001 - 600,000,',
          },
          {
            key: '500kTo1500k',
            label: 'SAR 600,001 - 1,500,000,',
          },
          {
            key: '5mTo10m',
            label: 'SAR 5,000,001 - 10,000,000,',
          },
          {
            key: 'lessThan100k',
            label: 'SAR 100,000 or Less,',
          },
          {
            key: 'moreThan50m',
            label: 'SAR 50,000,000 and More',
          },
        ],
        bankNameOptions: [
          {
            key: 'alBilad',
            label: 'Bank Al-Bilad',
          },
          {
            key: 'alinmaBank',
            label: 'Alinma Bank',
          },
          {
            key: 'alJazeera',
            label: 'AL-Jazeera Bank',
          },
          {
            key: 'alRajhi',
            label: 'Al-Rajhi Bank',
          },
          {
            key: 'nationalArab',
            label: 'National Arab Bank',
          },
          {
            key: 'riyadhBank',
            label: 'Riyadh Bank',
          },
          {
            key: 'saudiBritish',
            label: 'Saudi British bank',
          },
          {
            key: 'saudiFransi',
            label: 'Saudi Fransi Bank',
          },
          {
            key: 'saudiInvestment',
            label: 'Saudi Investment Bank',
          },
          {
            key: 'snb',
            label: 'SNB Bank',
          },
        ],
        clientAndCustodian: [
          {
            key: 'forTheClient',
            label: 'For the client',
          },
          {
            key: 'safekeepingCustodian',
            label: 'Safekeeping Custodian',
          },
          {
            key: 'other',
            label: 'Other',
          },
        ],
        defaultLanguage: [
          {
            key: 'lang',
            value: 'ar',
            label: 'Default Language',
          },
        ],
        workedInFinancialSectorDuringPastFiveYears: [
          {
            key: 'yes',
            label: 'Yes',
          },
          {
            key: 'no',
            label: 'No',
          },
        ],
        otherPracticalExperienceInFinancialSector: [
          {
            key: 'yes',
            label: 'Yes',
          },
          {
            key: 'no',
            label: 'No',
          },
        ],
        investedInInvestmentOrRealEstateFunds: [
          {
            key: 'yes',
            label: 'Yes',
          },
          {
            key: 'no',
            label: 'No',
          },
        ],
        boardMemberAuditCommitteeMemberSeniorExecutive: [
          {
            key: 'yes',
            label: 'Yes',
          },
          {
            key: 'no',
            label: 'No',
          },
        ],
        entrustedWithProminentPublicFunctions: [
          {
            key: 'yes',
            label: 'Yes',
          },
          {
            key: 'no',
            label: 'No',
          },
        ],
        clientHasRelationshipWithProminentPublicFunction: [
          {
            key: 'yes',
            label: 'Yes',
          },
          {
            key: 'no',
            label: 'No',
          },
        ],
        clientIsBeneficialOwner: [
          {
            key: 'beneficiary',
            label: 'Beneficiary',
          },
          {
            key: 'proxy',
            label: 'Proxy',
          },
        ],
        clientShareholdersOrBeneficiariesHoldAmericanCitizenship: [
          {
            key: 'yes',
            label: 'Yes',
          },
          {
            key: 'no',
            label: 'No',
          },
        ],
        clientHasAppointedCustodian: [
          {
            key: 'yes',
            label: 'Yes',
          },
          {
            key: 'no',
            label: 'No',
          },
        ],
        educationalLevelOptions: [
          {
            key: 'bachelors',
            label: "Bachelor's",
          },
          {
            key: 'diploma',
            label: 'Diploma',
          },
          {
            key: 'high',
            label: 'High',
          },
          {
            key: 'intermediate',
            label: 'Intermediate',
          },
          {
            key: 'masterPhd',
            label: 'Master or Phd',
          },
          {
            key: 'primary',
            label: 'Primary',
          },
        ],
        employmentStatusOptions: [
          {
            key: 'businessman',
            label: 'Businessman',
          },
          {
            key: 'employee',
            label: 'Employee',
          },
          {
            key: 'governmentSector',
            label: 'Government Sector',
          },
          {
            key: 'housewife',
            label: 'Housewife',
          },
          {
            key: 'militarySector',
            label: 'Military Sector',
          },
          {
            key: 'other',
            label: 'Other',
          },
          {
            key: 'privateSector',
            label: 'Private Sector',
          },
          {
            key: 'retired',
            label: 'Retired',
          },
          {
            key: 'student',
            label: 'Student',
          },
        ],
        financingStructure: [
          {
            key: 'Ijarah',
            label: 'Ijarah (Leasing)',
          },
          {
            key: 'Mudarabah',
            label: 'Mudarabah (Profit Sharing)',
          },
          {
            key: 'Murabaha',
            label: 'Murabaha (Cost-plus Financing)',
          },
          {
            key: 'Musharakah',
            label: 'Musharakah (Joint Venture Partnership)',
          },
          {
            key: 'Sukuk',
            label: 'Sukuk (Islamic Bonds)',
          },
        ],
        guarantees: [
          {
            key: 'assignment-of-proceeds',
            label: 'Assignment of Proceeds',
          },
          {
            key: 'mortgages-on-real-estate',
            label: 'Mortgages on Real Estate',
          },
          {
            key: 'order-note',
            label: 'Order Note',
          },
        ],
        investmentDurationOptions: [
          {
            key: 'long',
            label: 'Long',
          },
          {
            key: 'medium',
            label: 'Medium',
          },
          {
            key: 'short',
            label: 'Short',
          },
        ],
        investmentExperienceOptions: [
          {
            key: 'high',
            label: 'High',
          },
          {
            key: 'medium',
            label: 'Medium',
          },
          {
            key: 'low',
            label: 'Low',
          },
        ],
        investmentGoalOptions: [
          {
            key: 'balanced',
            label: 'Balanced',
          },
          {
            key: 'buyingAnAsset',
            label: 'Buying Assets',
          },
          {
            key: 'capitalGains',
            label: 'Capital Gains',
          },
          {
            key: 'capitalProtection',
            label: 'Capital Protection',
          },
          {
            key: 'incomeGeneration',
            label: 'Income Generation',
          },
          {
            key: 'projectFunding',
            label: 'Project Funding',
          },
          {
            key: 'savingsForRetirement',
            label: 'Savings For Retirement',
          },
        ],
        investmentPortfolioOptions: [
          {
            key: 'capitalMarket',
            label: 'Capital Market',
          },
          {
            key: 'other',
            label: 'Other',
          },
          {
            key: 'privateEquity',
            label: 'Private Equity',
          },
          {
            key: 'real-estate',
            label: 'Real Estate',
          },
        ],
        investmentRiskLevelOptions: [
          {
            key: 'high',
            label: 'High',
          },
          {
            key: 'medium',
            label: 'Medium',
          },
          {
            key: 'low',
            label: 'Low',
          },
        ],
        netWorthOptions: [
          {
            key: '100kTo300k',
            label: 'SAR 100,001 - 300,000,',
          },
          {
            key: '10mTo50m',
            label: 'SAR 10,000,001 - 50,000,000,',
          },
          {
            key: '1500kTo5m',
            label: 'SAR 1,500,001 - 5,000,000,',
          },
          {
            key: '300kTo600k',
            label: 'SAR 300,001 - 600,000,',
          },
          {
            key: '500kTo1500k',
            label: 'SAR 600,001 - 1,500,000,',
          },
          {
            key: '5mTo10m',
            label: 'SAR 5,000,001 - 10,000,000,',
          },
          {
            key: 'lessThan100k',
            label: 'SAR 100,000 or Less,',
          },
          {
            key: 'moreThan50m',
            label: 'SAR 50,000,000 and More',
          },
        ],
        owaisCreditTeam: [
          {
            key: 'owais-credit-team',
            label: 'Owais Credit Team',
          },
        ],
        paymentFrequency: [
          {
            key: 'Annually',
            label: 'Annually',
          },
          {
            key: 'Bullet',
            label: 'Bullet',
          },
          {
            key: 'Monthly',
            label: 'Monthly',
          },
          {
            key: 'Quarterly',
            label: 'Quarterly',
          },
          {
            key: 'SemiAnnually',
            label: 'Semi Annually',
          },
        ],
        purposeOfFundsUsage: [
          {
            key: 'acquisitions-and-mergers',
            label: 'Acquisitions and Mergers',
          },
          {
            key: 'business-expansion',
            label: 'Business Expansion',
          },
          {
            key: 'debt-refinancing',
            label: 'Debt Refinancing',
          },
          {
            key: 'equipment-purchase',
            label: 'Equipment Purchase',
          },
          {
            key: 'inventory-purchase',
            label: 'Inventory Purchase',
          },
          {
            key: 'marketing-and-advertising',
            label: 'Marketing and Advertising',
          },
          {
            key: 'Real-estate-acquisition',
            label: 'Real Estate Acquisition',
          },
          {
            key: 'research-and-development',
            label: 'Research and Development (R&D)',
          },
          {
            key: 'working-capital',
            label: 'Working Capital',
          },
        ],
        rolesListing: [
          {
            key: 'Finance',
            label: 'Finance',
          },
          {
            key: 'IndividualInvestor',
            label: 'Individual Investor',
          },
          {
            key: 'CorporateInvestor',
            label: 'Corporate Investor',
          },
          {
            key: 'LiteAdmin',
            label: 'Lite Admin',
          },
          {
            key: 'NormalRetailInvestor',
            label: 'Retail Investor',
          },
          {
            key: 'QualifiedInvestor',
            label: 'Qualified Investor',
          },
          {
            key: 'SuperAdmin',
            label: 'Super Admin',
          },
          {
            key: 'USER',
            label: 'SME',
          },
        ],
        sukukStructure: [
          {
            key: 'Mudarabah',
            label: 'Mudarabah (Profit Sharing)',
          },
          {
            key: 'Murabaha',
            label: 'Murabaha (Cost-plus Financing)',
          },
          {
            key: 'Musharakah',
            label: 'Musharakah (Joint Venture Partnership)',
          },
        ],
        supportCategories: [
          {
            key: 'earnings',
            label: 'Earnings',
          },
          {
            key: 'general',
            label: 'General',
          },
        ],
        userStatuses: [
          {
            key: 'approved',
            label: 'approved',
          },
          {
            key: 'closed',
            label: 'Closed',
          },
          {
            key: 'pending',
            label: 'pending',
          },
          {
            key: 'PendingKyc',
            label: 'Pending Kyc',
          },
          {
            key: 'qualified',
            label: 'Qualified',
          },
          {
            key: 'rejected',
            label: 'Rejected',
          },
          {
            key: 'suspended',
            label: 'Suspended',
          },
        ],
      },
      total: 0,
      meta: {},
    },
    ar: {
      status: 200,
      data: {
        accountUpgradeConditions: [
          {
            key: 'generalCertificateToDeal',
            label:
              'أن تكون حاصلاً على شهادة عامة بالتعامل في الأوراق المالية معتمدة من الهيئة الرقابية على ألا يقل دخلها السنوي عن ستمائة ألف ريال سعودي في العامين الماضيين.',
          },
          {
            key: 'netAssetValueMoreThan5M',
            label: 'لا تذكر صافي قيمة الأصول أقل من خمسة ملايين ريال سعودي.',
          },
          {
            key: 'professionalExperienceInSecuritiesInvestment',
            label:
              'أن يكون قد عمل ، أو سبق له العمل لمدة ثلاث سنوات على الأقل ، بصفة مهنية تتعلق باستثمار الأوراق المالية في القطاع المالي.',
          },
          {
            key: 'specializedCertificateInFinancialPaperwork',
            label:
              'أن يكون حاصلاً على شهادة مهنية متخصصة في مجال الأوراق المالية من جهة دولية معترف بها.',
          },
          {
            key: 'stockTradesMoreThan40M',
            label:
              'أن يكون قد نفذ صفقات في البورصات لا تقل قيمتها الإجمالية عن أربعين مليون ريال سعودي ولا تقل عن عشرة صفقات كل ثلاثة أشهر خلال الاثني عشر شهرًا الماضية.',
          },
        ],
        annualIncomeOptions: [
          {
            key: '100kTo300k',
            label: '100001 - 300000 ريال سعودي ،',
          },
          {
            key: '10mTo50m',
            label: '10،000،001 - 50،000،000 ريال سعودي ،',
          },
          {
            key: '1500kTo5m',
            label: '1،500،001 - 5،000،000 ريال سعودي ،',
          },
          {
            key: '300kTo600k',
            label: '300،001 - 600،000 ريال سعودي ،',
          },
          {
            key: '500kTo1500k',
            label: '600،001 - 1،500،000 ريال سعودي ،',
          },
          {
            key: '5mTo10m',
            label: '5،000،001 - 10،000،000 ريال سعودي ،',
          },
          {
            key: 'lessThan100k',
            label: '100،000 ريال سعودي أو أقل ،',
          },
          {
            key: 'moreThan50m',
            label: '50،000،000 ريال سعودي وأكثر',
          },
        ],
        bankNameOptions: [
          {
            key: 'alBilad',
            label: 'بنك البلاد',
          },
          {
            key: 'alinmaBank',
            label: 'مصرف الإنماء',
          },
          {
            key: 'alJazeera',
            label: 'الجزيرة بنك',
          },
          {
            key: 'alRajhi',
            label: 'مصرف الراجحي',
          },
          {
            key: 'nationalArab',
            label: 'البنك العربي الوطني',
          },
          {
            key: 'riyadhBank',
            label: 'بنك الرياض',
          },
          {
            key: 'saudiBritish',
            label: 'البنك السعودي البريطاني',
          },
          {
            key: 'saudiFransi',
            label: 'بنك الفرنسيس السعودي',
          },
          {
            key: 'saudiInvestment',
            label: 'البنك السعودي للاستثمار',
          },
          {
            key: 'snb',
            label: 'بنك SNB',
          },
        ],
        clientAndCustodian: [
          {
            key: 'forTheClient',
            label: 'للعميل',
          },
          {
            key: 'safekeepingCustodian',
            label: 'امين حفظ',
          },
          {
            key: 'other',
            label: 'اخرى',
          },
        ],
        defaultLanguage: [
          {
            key: 'lang',
          },
        ],
        workedInFinancialSectorDuringPastFiveYears: [
          {
            key: 'yes',
            label: 'نعم',
          },
          {
            key: 'no',
            label: 'لا',
          },
        ],
        otherPracticalExperienceInFinancialSector: [
          {
            key: 'yes',
            label: 'نعم',
          },
          {
            key: 'no',
            label: 'لا',
          },
        ],
        investedInInvestmentOrRealEstateFunds: [
          {
            key: 'yes',
            label: 'نعم',
          },
          {
            key: 'no',
            label: 'لا',
          },
        ],
        boardMemberAuditCommitteeMemberSeniorExecutive: [
          {
            key: 'yes',
            label: 'نعم',
          },
          {
            key: 'no',
            label: 'لا',
          },
        ],
        entrustedWithProminentPublicFunctions: [
          {
            key: 'yes',
            label: 'نعم',
          },
          {
            key: 'no',
            label: 'لا',
          },
        ],
        clientHasRelationshipWithProminentPublicFunction: [
          {
            key: 'yes',
            label: 'نعم',
          },
          {
            key: 'no',
            label: 'لا',
          },
        ],
        clientIsBeneficialOwner: [
          {
            key: 'beneficiary',
            label: 'المستفيد',
          },
          {
            key: 'proxy',
            label: 'نائب أو موكل',
          },
        ],
        clientShareholdersOrBeneficiariesHoldAmericanCitizenship: [
          {
            key: 'yes',
            label: 'نعم',
          },
          {
            key: 'no',
            label: 'لا',
          },
        ],
        clientHasAppointedCustodian: [
          {
            key: 'yes',
            label: 'نعم',
          },
          {
            key: 'no',
            label: 'لا',
          },
        ],
        educationalLevelOptions: [
          {
            key: 'bachelors',
            label: 'بكالوريوس',
          },
          {
            key: 'diploma',
            label: 'شهادة دبلوم',
          },
          {
            key: 'high',
            label: 'عالي',
          },
          {
            key: 'intermediate',
            label: 'متوسط',
          },
          {
            key: 'masterPhd',
            label: 'ماجستير أو دكتوراه',
          },
          {
            key: 'primary',
            label: 'أساسي',
          },
        ],
        employmentStatusOptions: [
          {
            key: 'businessman',
            label: 'رجل اعمال',
          },
          {
            key: 'employee',
            label: 'موظف',
          },
          {
            key: 'governmentSector',
            label: 'القطاع الحكومي',
          },
          {
            key: 'housewife',
            label: 'ربه منزل',
          },
          {
            key: 'militarySector',
            label: 'القطاع العسكري',
          },
          {
            key: 'other',
            label: 'آخر',
          },
          {
            key: 'privateSector',
            label: 'القطاع الخاص',
          },
          {
            key: 'retired',
            label: 'متقاعد',
          },
          {
            key: 'student',
            label: 'طالب',
          },
        ],
        financingStructure: [
          {
            key: 'Ijarah',
            label: 'إجارة',
          },
          {
            key: 'Mudarabah',
            label: 'مضاربة (تقاسم الأرباح)',
          },
          {
            key: 'Murabaha',
            label: 'مرابحة (التمويل بزيادة التكلفة)',
          },
          {
            key: 'Musharakah',
            label: 'مشاركة (شراكة المشروع المشترك)',
          },
          {
            key: 'Sukuk',
            label: 'صكوك (السندات الإسلامية)',
          },
        ],
        guarantees: [
          {
            key: 'assignment-of-proceeds',
            label: 'اتفاقية التنازل عن العائدات',
          },
          {
            key: 'mortgages-on-real-estate',
            label: 'الرهن العقاري',
          },
          {
            key: 'order-note',
            label: 'سندات لإمر',
          },
        ],
        investmentDurationOptions: [
          {
            key: 'long',
            label: 'طويل',
          },
          {
            key: 'medium',
            label: 'متوسط',
          },
          {
            key: 'short',
            label: 'قصير',
          },
        ],
        investmentExperienceOptions: [
          {
            key: 'high',
            label: 'عالي',
          },
          {
            key: 'medium',
            label: 'متوسط',
          },
          {
            key: 'low',
            label: 'قليل',
          },
        ],
        investmentGoalOptions: [
          {
            key: 'balanced',
            label: 'متوازن',
          },
          {
            key: 'buyingAnAsset',
            label: 'شراء أصول',
          },
          {
            key: 'capitalGains',
            label: 'مكاسب رأس المال',
          },
          {
            key: 'capitalProtection',
            label: 'حماية رأس المال',
          },
          {
            key: 'incomeGeneration',
            label: 'توليد الدخل',
          },
          {
            key: 'projectFunding',
            label: 'تمويل المشاريع',
          },
          {
            key: 'savingsForRetirement',
            label: 'المدخرات للتقاعد',
          },
        ],
        investmentPortfolioOptions: [
          {
            key: 'capitalMarket',
            label: 'سوق رأس المال',
          },
          {
            key: 'other',
            label: 'آخر',
          },
          {
            key: 'privateEquity',
            label: 'الملكية الخاصة',
          },
          {
            key: 'real-estate',
            label: 'العقارات',
          },
        ],
        investmentRiskLevelOptions: [
          {
            key: 'high',
            label: 'عالي',
          },
          {
            key: 'medium',
            label: 'متوسط',
          },
          {
            key: 'low',
            label: 'قليل',
          },
        ],
        netWorthOptions: [
          {
            key: '100kTo300k',
            label: '100001 - 300000 ريال سعودي ،',
          },
          {
            key: '10mTo50m',
            label: '10،000،001 - 50،000،000 ريال سعودي ،',
          },
          {
            key: '1500kTo5m',
            label: '1،500،001 - 5،000،000 ريال سعودي ،',
          },
          {
            key: '300kTo600k',
            label: '300،001 - 600،000 ريال سعودي ،',
          },
          {
            key: '500kTo1500k',
            label: '600،001 - 1،500،000 ريال سعودي ،',
          },
          {
            key: '5mTo10m',
            label: '5،000،001 - 10،000،000 ريال سعودي ،',
          },
          {
            key: 'lessThan100k',
            label: '100،000 ريال سعودي أو أقل ،',
          },
          {
            key: 'moreThan50m',
            label: '50،000،000 ريال سعودي وأكثر',
          },
        ],
        owaisCreditTeam: [
          {
            key: 'owais-credit-team',
            label: 'Owais Credit Team',
          },
        ],
        paymentFrequency: [
          {
            key: 'Annually',
            label: 'سنويًا ',
          },
          {
            key: 'Bullet',
            label: 'دفعه واحدة',
          },
          {
            key: 'Monthly',
            label: 'شهرياً',
          },
          {
            key: 'Quarterly',
            label: 'ربع سنويًا',
          },
          {
            key: 'SemiAnnually',
            label: 'نصف سنويًا ',
          },
        ],
        purposeOfFundsUsage: [
          {
            key: 'acquisitions-and-mergers',
            label: 'الاستحواذات والاندماجات',
          },
          {
            key: 'business-expansion',
            label: 'توسيع الأعمال',
          },
          {
            key: 'debt-refinancing',
            label: 'إعادة تمويل الديون',
          },
          {
            key: 'equipment-purchase',
            label: 'شراء المعدات',
          },
          {
            key: 'inventory-purchase',
            label: 'شراء المخزون',
          },
          {
            key: 'marketing-and-advertising',
            label: 'التسويق والإعلان',
          },
          {
            key: 'Real-estate-acquisition',
            label: 'الإستحواذ على عقار',
          },
          {
            key: 'research-and-development',
            label: 'البحث والتطوير (R&D)',
          },
          {
            key: 'working-capital',
            label: 'رأس المال العامل',
          },
        ],
        rolesListing: [
          {
            key: 'Finance',
          },
          {
            key: 'IndividualInvestor',
          },
          {
            key: 'CorporateInvestor',
          },
          {
            key: 'LiteAdmin',
          },
          {
            key: 'NormalRetailInvestor',
          },
          {
            key: 'QualifiedInvestor',
          },
          {
            key: 'SuperAdmin',
          },
          {
            key: 'USER',
          },
        ],
        sukukStructure: [
          {
            key: 'Mudarabah',
            label: 'مضاربة (تقاسم الأرباح)',
          },
          {
            key: 'Murabaha',
            label: 'مرابحة (التمويل بزيادة التكلفة)',
          },
          {
            key: 'Musharakah',
            label: 'مشاركة (شراكة المشروع المشترك)',
          },
        ],
        supportCategories: [
          {
            key: 'earnings',
            label: 'أرباح',
          },
          {
            key: 'general',
            label: 'عام',
          },
        ],
        userStatuses: [
          {
            key: 'approved',
          },
          {
            key: 'closed',
          },
          {
            key: 'pending',
          },
          {
            key: 'PendingKyc',
          },
          {
            key: 'qualified',
          },
          {
            key: 'rejected',
          },
          {
            key: 'suspended',
          },
        ],
      },
      total: 0,
      meta: {},
    },
  };
};

export default getInvestorSettingsMock;

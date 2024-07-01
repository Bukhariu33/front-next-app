// eslint-disable-next-line import/extensions
import { fundData } from 'cypress/constants/funds';
import dayjs from 'dayjs';

function createFund() {
  cy.intercept('/api/admin/settings', req => {
    req.headers['Cache-Control'] = 'no-cache';
    req.headers.Pragma = 'no-cache';
    req.headers.Expires = '0';
  }).as('settings');

  cy.intercept('/api/admin/fund-managers', req => {
    req.headers['Cache-Control'] = 'no-cache';
    req.headers.Pragma = 'no-cache';
    req.headers.Expires = '0';
  }).as('fundManagers');

  cy.get('[data-cy-input="nameEn"]').type(fundData.nameEn);
  cy.get('[data-cy-input="nameAr"]').type(fundData.nameAr);

  cy.wait('@settings').then(({ response }) => {
    cy.selectDropdownOption(
      'fundAssetsClass',
      response?.body.fundAssetsClassOptions[1].label,
    );

    cy.selectDropdownOption(
      'fundType',
      response?.body.fundTypeOptions[0].label,
    );
    cy.selectDropdownOption(
      'fundSCity',
      response?.body.fundCityOptions[0].label,
    );
    cy.selectDropdownOption(
      'fundDuration',
      response?.body.durationOptions[0].label,
    );
    cy.selectDropdownOption(
      'fundImageDimension',
      response?.body.imageDimensionOptions[0].label,
    );
  });
  cy.wait('@fundManagers').then(({ response }) => {
    cy.selectDropdownOption('fundManagerName', response?.body.data[0].fullName);
  });

  cy.get('[data-cy-input="fundCoverage"]').type(fundData.coverage.toString());
  cy.get('[data-cy-input="minimumCoverageAmount"]').type(
    fundData.minCoverage.toString(),
  );
  cy.get('[data-cy-input="minimumInvestmentAmount"]').type(
    fundData.minInvestment.toString(),
  );
  const day = dayjs().toDate();
  const nextDay = dayjs().add(1, 'day').toDate();
  cy.selectDateFromPicker('investment-starting-date', day);
  cy.selectDateFromPicker('investment-ending-date', nextDay);

  cy.get('[data-cy-input="expectedRoi"]').type(fundData.expectedRoi.toString());

  cy.get('[data-cy-input="investmentUnitPrice"]').type(
    fundData.unitPrice.toString(),
  );
  cy.get('[data-cy-input="numberOfInvestmentUnit"]').type(
    fundData.units.toString(),
  );

  cy.get('[data-cy-input="subscriptionFeesPercentage"]').type(
    fundData.subscriptionFeesPercentage.toString(),
  );
  cy.get('[data-cy-input="distributionFees"]').type(
    fundData.distributionFees.toString(),
  );

  cy.get('[data-cy-input="generalInformationEn"]').type(
    fundData.generalInformationEn,
  );
  cy.get('[data-cy-input="generalInformationAr"]').type(
    fundData.generalInformationAr,
  );
  cy.get('[data-cy-input="financialInformationEn"]').type(
    fundData.financialInformationEn,
  );
  cy.get('[data-cy-input="financialInformationAr"]').type(
    fundData.financialInformationAr,
  );
  cy.get('[data-cy-input="updatesEn"]').type(fundData.updatesEn);
  cy.get('[data-cy-input="updatesAr"]').type(fundData.updatesAr);

  cy.uploadFile('fundAttachments', 'empty.pdf', 'application/pdf');

  cy.uploadFile('fundImages', 'test.jpeg', 'image/jpeg', true);

  cy.get('[name="fundTeam.0.name"]').type('Yousef');

  cy.get('[name="fundTeam.0.position"]').type('dev');

  cy.uploadFile('avatar', 'test.jpeg', 'image/jpeg', true);

  cy.get('[data-cy-input="riskMessageEn"]').type('Risk Message');
  cy.get('[data-cy-input="riskMessageAr"]').type('Risk Message AR');
}

export default createFund;

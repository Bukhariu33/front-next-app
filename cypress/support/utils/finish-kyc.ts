function matchExperienceYears(requiredNum: number) {
  const maxAttempts = 10;
  let attempts = 0;

  const adjustExperienceYears = (currentYears: number) => {
    if (currentYears < requiredNum) {
      cy.get('[data-cy-button="add-experience-year"]').click();
    } else if (currentYears > requiredNum) {
      cy.get('[data-cy-button="remove-experience-year"]').click();
    }
  };

  const checkAndAdjust = () => {
    if (attempts >= maxAttempts) {
      cy.log('Maximum attempts reached.');
      return;
    }

    cy.get('[data-cy="investment-experience-years"]').then($el => {
      const experienceYears = parseInt($el.text(), 10);
      if (experienceYears !== requiredNum) {
        adjustExperienceYears(experienceYears);
        attempts += 1;
        checkAndAdjust();
      }
    });
  };

  checkAndAdjust();
}

function finishKyc(
  investorType: 'individual' | 'corporate',
  suitability?: 'suitable' | 'unsuitable',
) {
  cy.url().should('include', '/investor/kyc/personal-information');
  cy.get('[data-cy="kyc-stepper"] button').should(
    'have.length',
    investorType === 'corporate' ? 5 : 4,
  );

  // PERSONAL INFORMATION
  cy.selectRadioOption('worked-in-financial-sector');
  cy.selectRadioOption('other-exp-in-financial-sector');
  cy.selectRadioOption('invested-in-real-estate');
  cy.selectRadioOption('board-member-in-listed-company');
  cy.selectRadioOption(
    'investment-knowledge-experience',
    suitability === 'unsuitable' ? /low/i : /high/i,
  );
  cy.selectRadioOption(
    'risk-tolerance',
    suitability === 'unsuitable' ? /low/i : /high/i,
  );
  cy.selectRadioOption('investment-term');
  cy.selectRadioOption('entrusted-with-functions');
  cy.selectRadioOption('has-relation-with-function');
  cy.selectRadioOption('client-is-beneficial-owner', /Beneficiary/i);
  cy.selectDropdownOption('educational-level');
  cy.selectDropdownOption('occupation');

  // CLIENT CLASSIFICATION
  if (investorType === 'corporate') {
    cy.get('[data-cy-button="next-kyc-step"]').click();
    cy.url().should('include', '/investor/kyc/client-classification');

    cy.selectRadioOption('is-shareholders-american');
    cy.selectRadioOption('client-has-custodian');
    cy.selectRadioOption('where-investment-docs');
    cy.selectRadioOption('where-earnings');
    cy.selectRadioOption('where-results');
  }

  cy.get('[data-cy-button="next-kyc-step"]').click();
  cy.url().should('include', '/investor/kyc/financial-condition');

  // FINANCIAL CONDITION
  cy.selectDropdownOption('net-worth');
  cy.get('[data-cy="portfolio-checkboxes"] [type="checkbox"]').first().check();
  cy.get('[data-cy="goal-checkboxes"] [type="checkbox"]').first().check();
  matchExperienceYears(suitability === 'unsuitable' ? 0 : 2);
  cy.selectDropdownOption('appr-annual-income');
  cy.selectDropdownOption('expected-amount-per-opportunity');
  cy.selectDropdownOption('expected-annual-investments');

  // APPROVAL AND DECLARATION
  cy.get('[data-cy-button="next-kyc-step"]').click();
  cy.url().should('include', '/investor/kyc/approval-and-declaration');

  cy.get('[data-cy="terms-card"] input[type="checkbox"]').each($el => {
    cy.wrap($el).check({ force: true });
  });

  // RATING
  cy.get('[data-cy-button="next-kyc-step"]').click();
  cy.url().should('include', '/investor/kyc/rating');

  cy.get('h1')
    .contains(
      suitability === 'unsuitable'
        ? /You are not suitable for investment/i
        : /You are suitable for investment/i,
    )
    .should('be.visible');

  // SUBMIT
  cy.get('[data-cy-button="submit-suitable-kyc"]').click();
  if (suitability === 'unsuitable') {
    cy.url().should('include', '/investor/kyc/rating-not-acceptable-report');
    cy.get('[data-cy-button="consent-and-submit-kyc"]').click();
  }

  cy.expectModal(
    investorType === 'individual'
      ? /You can track your investments through 'My investments' section in the menu./i
      : /Your request is received! Our admin team will review it soon. Thank you for your patience./i,
  );

  // REDIRECTION TO DASHBOARD
  cy.url().should(url => {
    const parsedUrl = new URL(url);
    expect(parsedUrl.pathname).to.eq('/investor');
  });
}

export default finishKyc;

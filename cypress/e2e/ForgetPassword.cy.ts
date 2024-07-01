const data = {
  mobile: '+966502222231',
  password: 'Test@1',
};

const invalidData = {
  mobile: '+966513',
  password: 'Test@1',
  confirmPassword: 'Test@2',
};

describe('it should reset password', () => {
  beforeEach(() => {
    cy.visit('/auth/forget-password');
  });
  it('should reset password with valid credentials', () => {
    cy.get('[data-cy-input="mobile"]').type(data.mobile);

    cy.get('[data-cy-button="send-otp"]').click();
    cy.intercept('/api/otp/check').as('otpCheck');
    cy.fillOtp('1234');

    cy.wait('@otpCheck').then(({ response }) => {
      expect(response?.statusCode).to.eq(201);
    });

    cy.get('[data-cy-input="newPassword"]').type(data.password);
    cy.get('[data-cy-input="confirmNewPassword"]').type(data.password);

    cy.intercept('/api/auth/reset-password').as('resetPassword');
    cy.get('[data-cy-button="reset-password"]').click();

    cy.wait('@resetPassword').then(({ response }) => {
      expect(response?.statusCode).to.eq(201);
    });

    cy.url().should('include', '/auth/sign-in');
  });

  it('should fail to reset password with invalid moible number', () => {
    cy.get('[data-cy-input="mobile"]').type(invalidData.mobile);
    cy.get('[data-cy-button="send-otp"]').click();

    cy.get('[data-cy-id="input-error-message"]')
      .contains('Phone number is not valid')
      .should('be.visible');
  });

  it('should fail to reset password if password and confirm password do not match', () => {
    cy.get('[data-cy-input="mobile"]').type(data.mobile);
    cy.get('[data-cy-button="send-otp"]').click();
    cy.intercept('/api/otp/check').as('otpCheck');
    cy.fillOtp('1234');

    cy.wait('@otpCheck').then(({ response }) => {
      expect(response?.statusCode).to.eq(201);
    });

    cy.get('[data-cy-input="newPassword"]').type(invalidData.password);
    cy.get('[data-cy-input="confirmNewPassword"]').type(
      invalidData.confirmPassword,
    );

    cy.get('[data-cy-button="reset-password"]').should('be.disabled');
  });
});

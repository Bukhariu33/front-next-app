function readAndFillOtp(action: () => void) {
  cy.intercept({
    method: 'POST',
    url: '/api/otp',
  }).as('otp');

  // Perform the action to trigger the API call
  action();

  cy.wait('@otp').then(({ response }) => {
    cy.fillOtp(response?.body.data.otp);
  });
}

export default readAndFillOtp;

const fillOtp = (otp: number | string) => {
  const otpArray = otp.toString().split('');

  cy.get('input[aria-label="PinInput"]')
    .should('be.visible')
    .then(() => {
      otpArray.forEach((digit, i) => {
        cy.get('input[aria-label="PinInput"]').eq(i).clear({ force: true });
        cy.get('input[aria-label="PinInput"]')
          .eq(i)
          .type(digit, { force: true });
      });
    });
};

export default fillOtp;

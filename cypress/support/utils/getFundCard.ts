function getFundCard(status: string | string[], buttonTestId: string) {
  cy.get('[data-testid="fund-card"]')
    .filter((_, el) => {
      const $el = Cypress.$(el);
      if (Array.isArray(status)) {
        return status.some(s => $el.text().includes(s));
      }
      return $el.text().includes(status);
    })
    .first() // Select the first matching card
    .within(() => {
      // Search only within this card
      cy.get(`[data-cy-button="${buttonTestId}"]`).click();
    });
}
export default getFundCard;

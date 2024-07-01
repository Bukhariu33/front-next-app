/**
 * Uploads a file in a Cypress test.
 * @param elementId The ID of the input element or its wrapper.
 * @param fileName The name of the file in the fixtures folder.
 * @param fileType The MIME type of the file.
 * @param useWrapper A flag indicating whether to use the wrapper ID or the input ID make it true when using Dropzone or uploadAvatar
 */
function uploadFile(
  elementId: string,
  fileName: string,
  fileType: string,
  useWrapper: boolean = false,
) {
  // Read the file from the fixtures folder
  cy.fixture(fileName, 'base64').then(fileContent => {
    // Convert to Blob
    const blob = Cypress.Blob.base64StringToBlob(fileContent, fileType);

    // Build up the file structure
    const testFile = new File([blob], fileName, { type: fileType });
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(testFile);

    let selector = `#${elementId}`;
    if (useWrapper) {
      selector += ' input[type="file"]'; // If using wrapper, find the input inside it
    }

    cy.intercept({
      method: 'POST',
      url: '/api/media/upload',
    }).as('uploadFile');

    // Attach file to input element
    cy.get(selector)
      .then(input => {
        // eslint-disable-next-line no-param-reassign
        (input[0] as HTMLInputElement).files = dataTransfer.files;
      })
      .trigger('change', { force: true });

    cy.wait('@uploadFile').then(({ response }) => {
      const { url } = response?.body.data as any;
      expect(url).to.be.a('string');
    });
  });
}

export default uploadFile;

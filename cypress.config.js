/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: '3ufdu7',
  e2e: {
    baseUrl: 'http://localhost:4000',
    experimentalInteractiveRunEvents: true,
    defaultCommandTimeout: 30000,
    setupNodeEvents(on) {
      // run reset mock data script  before each test
      on('before:run', () => {
        import('child_process').then(({ exec }) => {
          exec('node ./scripts/setupTest', (err, stdout, stderr) => {
            if (err) {
              console.error(err);
              return;
            }
            console.log(stdout);
            console.log(stderr);
          });
        });
      });
    },
  },
});

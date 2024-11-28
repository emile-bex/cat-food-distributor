import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: { default: 'nx run cat-food-distributor-front:start' },
      ciWebServerCommand: 'nx run cat-food-distributor-front:serve-static',
    }),
    baseUrl: 'http://localhost:3000',
  },
});

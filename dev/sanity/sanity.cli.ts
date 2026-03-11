import { defineCliConfig } from 'sanity/cli';

const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? '4kycpr3y';
const dataset = process.env.SANITY_STUDIO_DATASET ?? 'production';

export default defineCliConfig({
  api: {
    projectId,
    dataset
  }
});

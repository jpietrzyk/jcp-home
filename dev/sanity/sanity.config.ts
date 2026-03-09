import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { schemaTypes } from './schemaTypes';

const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? 'your_project_id';
const dataset = process.env.SANITY_STUDIO_DATASET ?? 'production';

export default defineConfig({
  name: 'default',
  title: 'jcp.home Studio',
  projectId,
  dataset,
  plugins: [deskTool()],
  schema: {
    types: schemaTypes
  }
});

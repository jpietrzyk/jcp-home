import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { schemaTypes } from './schemaTypes';

export default defineConfig({
  name: 'default',
  title: 'jcp.home Studio',
  projectId: 'your_project_id',
  dataset: 'production',
  plugins: [deskTool()],
  schema: {
    types: schemaTypes
  }
});

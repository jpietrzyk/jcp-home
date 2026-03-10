import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { schemaTypes } from './schemaTypes';

export default defineConfig({
  name: 'default',
  title: 'jcp.home Studio',
  projectId: '4kycpr3y',
  dataset: 'production',
  plugins: [deskTool()],
  schema: {
    types: schemaTypes
  }
});

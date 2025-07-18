import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {colorInput} from '@sanity/color-input'
import {schemaTypes} from './src/schemaTypes'

// Environment variables for project configuration
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'your-projectID'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

export default defineConfig({
  name: 'sanity-template-astro-clean',
  title: 'Havnegata - handelsgata i Namsos',
  projectId,
  dataset,
  plugins: [structureTool(), visionTool(), colorInput()],
  schema: {
    types: schemaTypes,
  },
})

import dotenv from 'dotenv';
import { managementClient } from '../lib/contentful.js';

// Load environment variables
dotenv.config();

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const ENVIRONMENT_ID = process.env.CONTENTFUL_ENVIRONMENT || 'master';

async function setupFundraisingModels() {
  // Check required environment variables
  if (!SPACE_ID) {
    console.error('❌ CONTENTFUL_SPACE_ID is required. Please check your .env file.');
    return;
  }

  if (!managementClient) {
    console.error('❌ Management client not available. Please check your CONTENTFUL_MANAGEMENT_TOKEN in .env file.');
    return;
  }

  console.log('🚀 Setting up fundraising content models...');
  console.log(`📁 Space ID: ${SPACE_ID}`);
  console.log(`🌍 Environment: ${ENVIRONMENT_ID}`);

  try {
    const space = await managementClient.getSpace(SPACE_ID);
    console.log('✅ Connected to Contentful space');

    const environment = await space.getEnvironment(ENVIRONMENT_ID);
    console.log('✅ Connected to environment');

    // Create Fundraiser content type
    const fundraiserContentType = await environment.createContentType({
      name: 'Fundraiser',
      id: 'fundraiser',
      description: 'A simple fundraiser with details and PDF link',
      displayField: 'title',
      fields: [
        {
          id: 'title',
          name: 'Title',
          type: 'Symbol',
          required: true,
          validations: [
            {
              size: { max: 100 }
            }
          ]
        },
        {
          id: 'description',
          name: 'Description',
          type: 'Text',
          required: true,
          validations: [
            {
              size: { max: 500 }
            }
          ]
        },
        {
          id: 'fundraiserType',
          name: 'Fundraiser Type',
          type: 'Symbol',
          required: true,
          validations: [
            {
              in: ['Money', 'Items']
            }
          ]
        },
        {
          id: 'goal',
          name: 'Fundraising Goal',
          type: 'Number',
          required: true,
          validations: [
            {
              range: { min: 1 }
            }
          ]
        },
        {
          id: 'raised',
          name: 'Amount Raised',
          type: 'Number',
          required: true,
          defaultValue: 0,
          validations: [
            {
              range: { min: 0 }
            }
          ]
        },
        {
          id: 'unit',
          name: 'Unit',
          type: 'Symbol',
          required: true,
          description: 'Unit of measurement ($, cans, books, etc.)'
        },
        {
          id: 'startDate',
          name: 'Start Date',
          type: 'Date',
          required: true
        },
        {
          id: 'endDate',
          name: 'End Date',
          type: 'Date',
          required: false
        },
        {
          id: 'isActive',
          name: 'Is Active',
          type: 'Boolean',
          required: true,
          defaultValue: true
        },
        {
          id: 'pdfUrl',
          name: 'PDF URL',
          type: 'Symbol',
          required: true,
          description: 'URL to the PDF document'
        },
        {
          id: 'category',
          name: 'Category',
          type: 'Symbol',
          required: true,
          validations: [
            {
              in: ['General', 'Technology', 'Arts', 'Sports', 'Library', 'Playground', 'Classroom Supplies']
            }
          ]
        }
      ]
    });

    console.log('✅ Fundraiser content type created successfully!');
    console.log('\n📋 Next steps:');
    console.log('1. Publish the content type in Contentful');
    console.log('2. Create sample fundraisers or run: npm run populate-fundraising');
    console.log('3. Update the fundraising page to use this model');

  } catch (error) {
    console.error('❌ Error setting up content types:', error.message);
    if (error.sys && error.sys.id) {
      console.error('Contentful Error ID:', error.sys.id);
    }
  }
}

// Run the setup
setupFundraisingModels();

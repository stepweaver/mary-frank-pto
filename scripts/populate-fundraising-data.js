import dotenv from 'dotenv';
import { managementClient } from '../lib/contentful.js';

// Load environment variables
dotenv.config();

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const ENVIRONMENT_ID = process.env.CONTENTFUL_ENVIRONMENT || 'master';

async function populateFundraisingData() {
  // Check required environment variables
  if (!SPACE_ID) {
    console.error('❌ CONTENTFUL_SPACE_ID is required. Please check your .env file.');
    return;
  }

  if (!managementClient) {
    console.error('❌ Management client not available. Please check your CONTENTFUL_MANAGEMENT_TOKEN in .env file.');
    return;
  }

  console.log('🚀 Populating fundraising data...');
  console.log(`📁 Space ID: ${SPACE_ID}`);
  console.log(`🌍 Environment: ${ENVIRONMENT_ID}`);

  try {
    const space = await managementClient.getSpace(SPACE_ID);
    console.log('✅ Connected to Contentful space');

    const environment = await space.getEnvironment(ENVIRONMENT_ID);
    console.log('✅ Connected to environment');

    // Sample fundraisers
    const fundraisers = [
      {
        title: 'Food Drive',
        description: 'We\'re donating 5,000 cans of food to the local food pantry!',
        fundraiserType: 'Items',
        goal: 5000,
        raised: 3000,
        unit: 'cans',
        startDate: '2025-09-09',
        endDate: '2025-09-13',
        isActive: true,
        pdfUrl: 'https://example.com/food-drive.pdf',
        category: 'General'
      },
      {
        title: 'Cookie Sale',
        description: 'Buy cookies to raise money for a new playground.',
        fundraiserType: 'Money',
        goal: 10000,
        raised: 5000,
        unit: '$',
        startDate: '2025-08-29',
        endDate: '2025-09-27',
        isActive: true,
        pdfUrl: 'https://example.com/cookie-sale.pdf',
        category: 'General'
      }
    ];

    console.log(`📝 Creating ${fundraisers.length} fundraisers...`);

    for (const fundraiserData of fundraisers) {
      const fundraiser = await environment.createEntry('fundraiser', {
        fields: {
          title: { 'en-US': fundraiserData.title },
          description: { 'en-US': fundraiserData.description },
          fundraiserType: { 'en-US': fundraiserData.fundraiserType },
          goal: { 'en-US': fundraiserData.goal },
          raised: { 'en-US': fundraiserData.raised },
          unit: { 'en-US': fundraiserData.unit },
          startDate: { 'en-US': fundraiserData.startDate },
          endDate: { 'en-US': fundraiserData.endDate },
          isActive: { 'en-US': fundraiserData.isActive },
          pdfUrl: { 'en-US': fundraiserData.pdfUrl },
          category: { 'en-US': fundraiserData.category }
        }
      });

      await fundraiser.publish();
      console.log(`✅ Created fundraiser: ${fundraiserData.title}`);
    }

    console.log('\n🎉 All sample fundraisers created successfully!');
    console.log('\n📊 Created:');
    console.log(`- ${fundraisers.length} fundraisers`);

  } catch (error) {
    console.error('❌ Error populating data:', error.message);
    if (error.sys && error.sys.id) {
      console.error('Contentful Error ID:', error.sys.id);
    }
  }
}

// Run the population
populateFundraisingData();

import { createClient } from "contentful";
import { createClient as createManagementClient } from "contentful-management";

// Only create clients if environment variables are available
const deliveryClient = process.env.CONTENTFUL_SPACE_ID && process.env.CONTENTFUL_ACCESS_TOKEN
  ? createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  })
  : null;

const managementClient = process.env.CONTENTFUL_MANAGEMENT_TOKEN
  ? createManagementClient({
    accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
  })
  : null;

// Debug logging (development only)
if (process.env.NODE_ENV === 'development') {
  console.log('Contentful clients initialized:');
  console.log('- Delivery client:', !!deliveryClient);
  console.log('- Management client:', !!managementClient);
  console.log('- Management token available:', !!process.env.CONTENTFUL_MANAGEMENT_TOKEN);
}

export default deliveryClient;
export { managementClient };

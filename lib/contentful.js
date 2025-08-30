import { createClient } from "contentful";
import { createClient as createManagementClient } from "contentful-management";

// Delivery client for reading content
const deliveryClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

// Management client for updating content
const managementClient = process.env.CONTENTFUL_MANAGEMENT_TOKEN
  ? createManagementClient({
    accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
  })
  : null;

// Debug logging
console.log('Contentful clients initialized:');
console.log('- Delivery client:', !!deliveryClient);
console.log('- Management client:', !!managementClient);
console.log('- Management token available:', !!process.env.CONTENTFUL_MANAGEMENT_TOKEN);

export default deliveryClient;
export { managementClient };

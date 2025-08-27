import Container from "@/components/layout/Container";

export default function Events() {
  return (
    <Container className="py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Events</h1>
        <p className="text-lg text-gray-600 mb-4">
          Stay updated on all PTO meetings, fundraisers, and school events.
        </p>
        <div className="bg-gray-100 p-8 rounded-lg text-center">
          <p className="text-gray-500">Event calendar coming soon...</p>
        </div>
      </div>
    </Container>
  );
}
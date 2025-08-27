import Container from "@/components/layout/Container";

export default function Volunteer() {
  return (
    <Container className="py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Volunteer</h1>
        <p className="text-lg text-gray-600 mb-4">
          Find opportunities to help and make a difference in our school.
        </p>
        <div className="bg-gray-100 p-8 rounded-lg text-center">
          <p className="text-gray-500">Volunteer opportunities coming soon...</p>
        </div>
      </div>
    </Container>
  );
}
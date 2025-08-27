import Container from '@/components/layout/Container'

export default function About() {
  return (
    <Container className="py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          About Mary Frank PTO
        </h1>
        <p className="text-lg text-gray-600 mb-4">
          We are a dedicated group of parents, teachers, and staff working
          together to enhance the educational experience at Mary Frank
          Elementary.
        </p>
        <p className="text-lg text-gray-600 mb-4">
          Our mission is to support our teachers, enhance student learning, and
          build strong partnerships between families and our school.
        </p>
      </div>
    </Container>
  )
}

import Container from '@/components/layout/Container'
import Image from 'next/image'

export default function BoxTopsSection() {
  return (
    <section className="py-24 bg-gray-50">
      <Container>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-6xl font-bold text-gray-900 mb-12 text-center">
            Box Tops For Education
          </h2>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left Side - Box Tops Image */}
            <div className="text-center lg:text-left">
              {/* Clickable Box Tops Image */}
              <div>
                <a
                  href="https://www.boxtops4education.com/s/get-the-app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block cursor-pointer hover:opacity-90 transition-opacity"
                >
                  <Image
                    src="/bt_buy.webp"
                    alt="Box Tops for Education - Click to get the app"
                    width={1200}
                    height={1200}
                    className="rounded-xl shadow-2xl"
                  />
                </a>
              </div>
            </div>

            {/* Right Side - Call to Action */}
            <div className="text-center lg:text-left">
              <div className="mb-10">
                <p className="text-2xl text-gray-700 mb-6">
                  Download the Box Tops for Education app and start scanning.
                </p>
                <p className="text-lg text-gray-500 mb-8">
                  *Add Mary Frank Elementary to your app (look for Adams Rd,
                  Granger)
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start mb-10">
                <a
                  href="https://www.boxtops4education.com/s/get-the-app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-bold text-lg px-12 py-4 rounded-xl transition-colors"
                >
                  Get the App
                </a>
                <a
                  href="https://www.boxtops4education.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center border-3 border-green-500 text-green-500 hover:bg-green-500 hover:text-white font-bold text-lg px-12 py-4 rounded-xl transition-colors"
                >
                  Learn More
                </a>
              </div>

              <div>
                <p className="text-lg text-gray-600">
                  Every Box Top counts! Your participation directly supports
                  classroom supplies, field trips, and educational programs at
                  Mary Frank Elementary.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

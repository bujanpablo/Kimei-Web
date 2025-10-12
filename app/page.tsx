import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />

      {/* Placeholder para el resto del contenido */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-kimei-green mb-8">
            Contenido en Desarrollo
          </h2>
          <p className="text-gray-600 text-lg">
            El resto de las secciones se implementarán próximamente
          </p>
        </div>
      </section>
    </main>
  )
}

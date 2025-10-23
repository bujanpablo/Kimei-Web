import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import { AgroMarket } from '@/components/agro/AgroMarket'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <AgroMarket />

      {/* Placeholder para el resto del contenido */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-kimei-green mb-8">
            Más Contenido en Desarrollo
          </h2>
          <p className="text-gray-600 text-lg">
            El resto de las secciones se implementarán próximamente
          </p>
        </div>
      </section>
    </main>
  )
}

'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Calendar, TrendingUp, Users } from 'lucide-react'
import WheatFieldBackground from './WheatFieldBackground'

const HeroSection = () => {
  const stats = [
    { icon: Calendar, value: '20+', label: 'Años de Experiencia' },
    { icon: TrendingUp, value: '1000+', label: 'Operaciones Exitosas' },
    { icon: Users, value: '500+', label: 'Clientes Satisfechos' },
  ]

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Imagen de fondo con overlay */}
      <div className="absolute inset-0 z-0">
        {/* Fondo de campo de trigo simulado */}
        <WheatFieldBackground />
        
        {/* Overlay con gradiente para mejor legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-kimei-green/20" />
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl">
          {/* Badge de 20 años */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-kimei-gold text-kimei-dark px-4 py-2 rounded-full text-sm font-semibold mb-6"
          >
            <Calendar size={16} />
            <span>20 Años de Excelencia</span>
          </motion.div>

          {/* Título principal */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight hero-text-shadow"
          >
            Cultivando
            <span className="block text-kimei-gold">Futuros</span>
            <span className="block text-2xl md:text-3xl font-normal mt-4 opacity-90">
              desde 2003
            </span>
          </motion.h1>

          {/* Subtítulo */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl leading-relaxed"
          >
            Líderes en comercialización de granos e insumos agrícolas, 
            conectando productores con mercados globales con más de 
            <span className="text-kimei-gold font-semibold"> dos décadas de experiencia</span>.
          </motion.p>

          {/* Botones de acción */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            <button className="btn-secondary text-lg px-8 py-4 inline-flex items-center justify-center group">
              Nuestros Servicios
              <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-kimei-green px-8 py-4 rounded-lg font-medium transition-all duration-300 inline-flex items-center justify-center">
              Portal de Clientes
            </button>
          </motion.div>

          {/* Estadísticas */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {stats.map((stat, index) => (
              <div key={index} className="glass-effect rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-2">
                  <stat.icon className="text-kimei-gold" size={24} />
                  <span className="text-3xl font-bold text-white">{stat.value}</span>
                </div>
                <p className="text-white/80 text-sm">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Elementos decorativos */}
      <div className="absolute bottom-10 right-10 z-10">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-2 h-2 bg-kimei-gold rounded-full"
        />
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-kimei-gold rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  )
}

export default HeroSection

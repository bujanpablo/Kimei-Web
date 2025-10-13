'use client'

import { motion } from 'framer-motion'

const HeroSection = () => {
  return (
    <section 
      className="relative min-h-[60vh] flex items-center mt-32 pt-16" 
      style={{ 
        position: 'relative',
        backgroundImage: "url('/images/hero-wheat-field.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center left',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay de fondo muy sutil */}
      <div className="absolute inset-0 bg-kimei-green/5"></div>
      
      {/* Franja superior muy sutil */}
      <div className="absolute top-0 left-0 w-full h-[40px] z-10" style={{background: 'linear-gradient(180deg, rgba(255, 215, 0, 0.15) 0%, rgba(255, 255, 255, 0.6) 70%, rgba(255, 255, 255, 1) 100%)'}}></div>
      
      {/* Franja inferior muy sutil */}
      <div className="absolute bottom-0 left-0 w-full h-[40px] z-10" style={{background: 'linear-gradient(0deg, rgba(128, 128, 128, 0.2) 0%, rgba(255, 255, 255, 0.6) 70%, rgba(255, 255, 255, 1) 100%)'}}></div>
      
      {/* Elemento decorativo esquina inferior izquierda */}
      <div className="absolute bottom-4 left-4 z-10">
        <div style={{width: 0, height: 0, borderLeft: '20px solid transparent', borderRight: '20px solid transparent', borderBottom: '25px solid #d4af37', opacity: 0.4}}></div>
      </div>
      
      {/* Elemento decorativo esquina superior derecha */}
      <div className="absolute top-4 right-4 z-10">
        <div style={{width: '12px', height: '12px', background: '#d4af37', transform: 'rotate(45deg)', opacity: 0.4}}></div>
      </div>
      
    </section>
  )
}

export default HeroSection
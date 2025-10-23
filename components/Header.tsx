'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import Logo from './Logo'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Kimei', href: '/kimei' },
    { name: 'Informes', href: '/informes' },
    { name: 'Mercado', href: '/mercado' },
    { name: 'Contacto', href: '/contacto' },
  ]

  return (
    <>
      {/* Header principal */}
      <header 
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg' 
            : 'bg-white shadow-sm'
        }`}
      >
        {/* Contenedor centrado con max-width 1320px */}
        <div className="max-w-[1320px] mx-auto px-4">
          {/* Layout de 3 columnas */}
          <div className="grid grid-cols-3 items-center min-h-[80px] gap-5">
            
            {/* Columna 1: Logo */}
            <div className="flex items-center justify-start">
              <div className="h-[40px] flex items-center">
                <Logo showText={true} size="md" />
              </div>
            </div>

            {/* Columna 2: Navegación centrada */}
            <div className="flex items-center justify-center">
              <nav className="hidden lg:flex items-center">
                <ul className="flex items-center" style={{ gap: 'clamp(1.25rem, 2.2vw, 2.75rem)' }}>
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="nav-link-original text-sm font-semibold uppercase tracking-[0.1em] text-kimei-dark hover:text-kimei-gold transition-colors duration-300"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              
              {/* Botón menú móvil */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Columna 3: Botones */}
            <div className="flex items-center justify-end gap-3">
              <button className="btn-sea-cliente hidden md:inline-flex">
                Sea Cliente
              </button>
              <button className="btn-exclusive hidden md:inline-flex">
                Portal Clientes
              </button>
            </div>
          </div>
        </div>

        {/* Drawer móvil */}
        <Dialog open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <DialogContent className="flex flex-col p-0" data-state={isMenuOpen ? "open" : "closed"}>
            {/* Header del drawer */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <Logo showText={true} size="sm" />
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-accent transition-colors"
                aria-label="Cerrar menú"
              >
                <X size={24} />
              </button>
            </div>

            {/* Navegación del drawer */}
            <nav className="flex-1 p-6">
              <div className="space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block text-lg font-medium text-foreground hover:text-kimei-green transition-colors duration-300 py-3 px-2 rounded-lg hover:bg-accent/50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </nav>

            {/* Footer del drawer con botón Clientes */}
            <div className="p-6 border-t border-border">
              <button 
                className="btn-primary w-full"
                onClick={() => setIsMenuOpen(false)}
              >
                Clientes
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </header>
    </>
  )
}

export default Header

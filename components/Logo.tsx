'use client'

import { useState } from 'react'
import Link from 'next/link'

interface LogoProps {
  className?: string
  showText?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const Logo = ({ className = '', showText = true, size = 'md' }: LogoProps) => {
  const [logoError, setLogoError] = useState(false)

  const sizeClasses = {
    sm: 'h-8',   // 32px
    md: 'h-10',  // 40px
    lg: 'h-12'   // 48px
  }

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl'
  }

  const handleLogoError = () => {
    setLogoError(true)
  }

  return (
    <Link href="/" className={`flex items-center space-x-3 ${className}`}>
      {/* Logo real de Kimei */}
      {!logoError ? (
        <img 
          src="/images/logos/logo-kimei-full.png" 
          alt="Kimei Cereales S.A." 
          className={`${sizeClasses[size]} w-auto transition-all duration-300 hover:scale-105`}
          onError={handleLogoError}
        />
      ) : (
        /* Placeholder cuando no hay logo real */
        <div className={`flex items-center space-x-3 ${className}`}>
          <div className="bg-kimei-green text-white p-2 rounded-lg shadow-lg">
            <span className={`font-bold ${size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl'}`}>
              K
            </span>
          </div>
          {showText && (
            <div>
              <h1 className={`font-bold text-kimei-green ${textSizeClasses[size]}`}>
                KIMEI
              </h1>
              <p className={`text-gray-600 ${size === 'sm' ? 'text-xs' : 'text-xs'}`}>
                CEREALES S.A.
              </p>
            </div>
          )}
        </div>
      )}
    </Link>
  )
}

export default Logo


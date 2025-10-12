'use client'

const WheatFieldBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Fondo base con gradiente que simula cielo y campo */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-300 via-blue-200 to-yellow-400" />
      
      {/* Simulación de plantas de trigo con CSS */}
      <div className="absolute bottom-0 left-0 w-full h-1/2">
        {/* Capa de trigo dorado */}
        <div className="absolute inset-0 bg-gradient-to-t from-yellow-600 via-yellow-500 to-yellow-400 opacity-80" />
        
        {/* Líneas verticales para simular tallos de trigo */}
        <div className="absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute bg-gradient-to-t from-yellow-700 to-yellow-500 opacity-60"
              style={{
                left: `${i * 2}%`,
                width: '2px',
                height: `${Math.random() * 30 + 20}%`,
                bottom: 0,
                transform: `skewX(${Math.random() * 10 - 5}deg)`,
              }}
            />
          ))}
        </div>
        
        {/* Granos de trigo simulados */}
        <div className="absolute inset-0">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute bg-yellow-300 rounded-full opacity-70"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 40 + 10}%`,
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Efecto de luz dorada */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-yellow-200/20 to-yellow-400/30" />
    </div>
  )
}

export default WheatFieldBackground




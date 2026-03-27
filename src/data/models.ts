// Definición de criterios de evaluación para cada modelo
export interface EvaluationCriteria {
  name: string
  questions: string[]
  score: number
  observations?: string
}

export interface ModelEvaluation {
  criteria: EvaluationCriteria[]
}

// Tipos específicos para cada modelo
export interface McCallDetails {
  factors: {
    operation: readonly string[]
    revision: readonly string[]
    transition: readonly string[]
  }
}

export interface BoehmDetails {
  characteristics: {
    utility: readonly string[]
    maintainability: readonly string[]
    portability: readonly string[]
  }
}

export interface FurpsDetails {
  categories: {
    functionality: string
    usability: string
    reliability: string
    performance: string
    supportability: string
  }
}

export interface Model {
  name: string
  description: string
  details: McCallDetails | BoehmDetails | FurpsDetails
  evaluation: ModelEvaluation
}

export const models = {
  mccall: {
    name: 'McCall',
    description:
      'Modelo de calidad que evalúa el software desde tres perspectivas: operación del producto, revisión del producto y transición del producto.',
    details: {
      factors: {
        operation: [
          'Correctitud',
          'Fiabilidad',
          'Eficiencia',
          'Integridad',
          'Usabilidad',
        ] as const,
        revision: [
          'Mantenibilidad',
          'Flexibilidad',
          'Capacidad de prueba',
        ] as const,
        transition: [
          'Portabilidad',
          'Reusabilidad',
          'Interoperabilidad',
        ] as const,
      },
    },
    evaluation: {
      criteria: [
        {
          name: 'Correctitud',
          questions: [
            '¿YouTube muestra correctamente los videos sin errores de reproducción?',
            '¿Las recomendaciones son precisas según el historial del usuario?',
            '¿Los resultados de búsqueda son relevantes?',
          ],
          score: 5,
          observations:
            'Excelente precisión en reproducción y recomendaciones, aunque ocasionalmente aparecen videos no relevantes.',
        },
        {
          name: 'Fiabilidad',
          questions: [
            '¿El sitio está disponible 24/7 sin interrupciones?',
            '¿Los videos se cargan sin errores constantes?',
            '¿El sistema maneja adecuadamente las altas cargas de usuarios?',
          ],
          score: 4,
          observations:
            'Altamente confiable, aunque en momentos de alta demanda puede haber pequeñas demoras.',
        },
        {
          name: 'Eficiencia',
          questions: [
            '¿Los videos se cargan rápidamente en diferentes conexiones?',
            '¿El uso de recursos del sistema es óptimo?',
            '¿La interfaz responde rápidamente a las interacciones?',
          ],
          score: 4,
          observations:
            'Buena eficiencia general, pero consume muchos recursos en dispositivos móviles.',
        },
        {
          name: 'Usabilidad',
          questions: [
            '¿La interfaz es intuitiva y fácil de navegar?',
            '¿Los usuarios pueden encontrar fácilmente lo que buscan?',
            '¿La experiencia es consistente en todos los dispositivos?',
          ],
          score: 5,
          observations:
            'Excelente usabilidad, interfaz limpia e intuitiva para usuarios de todas las edades.',
        },
        {
          name: 'Mantenibilidad',
          questions: [
            '¿La plataforma se actualiza regularmente sin afectar la experiencia?',
            '¿Se corrigen bugs rápidamente?',
            '¿La arquitectura permite agregar nuevas funcionalidades fácilmente?',
          ],
          score: 4,
          observations:
            'Actualizaciones frecuentes y constantes mejoras, aunque a veces los cambios drásticos confunden a usuarios.',
        },
      ],
    },
  } as const,
  boehm: {
    name: 'Boehm',
    description:
      'Modelo de calidad propuesto por Barry Boehm que evalúa el software basándose en características de utilidad, mantenibilidad y portabilidad.',
    details: {
      characteristics: {
        utility: ['Confiabilidad', 'Eficiencia', 'Usabilidad'] as const,
        maintainability: [
          'Mantenibilidad',
          'Documentación',
          'Estructura',
        ] as const,
        portability: [
          'Portabilidad',
          'Adaptabilidad',
          'Interoperabilidad',
        ] as const,
      },
    },
    evaluation: {
      criteria: [
        {
          name: 'Utilidad General',
          questions: [
            '¿YouTube cumple con su propósito principal de compartir y visualizar videos?',
            '¿Las funciones de likes, comentarios y suscripciones son útiles?',
            '¿La plataforma ofrece valor real a los creadores y espectadores?',
          ],
          score: 5,
          observations:
            'Excelente utilidad, es la plataforma líder en contenido audiovisual.',
        },
        {
          name: 'Confiabilidad',
          questions: [
            '¿El sistema mantiene la integridad de los datos de los usuarios?',
            '¿Las notificaciones y alertas funcionan correctamente?',
            '¿El historial y las listas de reproducción se guardan correctamente?',
          ],
          score: 4,
          observations:
            'Muy confiable, aunque ocasionalmente hay errores en notificaciones.',
        },
        {
          name: 'Eficiencia de Rendimiento',
          questions: [
            '¿La reproducción de videos es fluida en diferentes calidades?',
            '¿El algoritmo de recomendación es eficiente?',
            '¿La búsqueda devuelve resultados rápidamente?',
          ],
          score: 4,
          observations:
            'Buen rendimiento general, pero mejorable en conexiones limitadas.',
        },
        {
          name: 'Mantenibilidad',
          questions: [
            '¿La plataforma es fácil de mantener y actualizar?',
            '¿Los desarrolladores pueden implementar cambios sin problemas?',
            '¿La documentación técnica es adecuada?',
          ],
          score: 4,
          observations:
            'Actualizaciones frecuentes, aunque algunas introducen bugs temporales.',
        },
        {
          name: 'Portabilidad',
          questions: [
            '¿YouTube funciona correctamente en todos los dispositivos (PC, móvil, TV)?',
            '¿La experiencia es consistente en diferentes navegadores?',
            '¿La aplicación móvil mantiene la misma funcionalidad que la web?',
          ],
          score: 5,
          observations:
            'Excelente portabilidad, disponible en múltiples plataformas con experiencia consistente.',
        },
      ],
    },
  } as const,
  furps: {
    name: 'FURPS',
    description:
      'Modelo de calidad que evalúa: Funcionalidad, Usabilidad, Confiabilidad, Rendimiento y Soporte.',
    details: {
      categories: {
        functionality: 'Conjunto de capacidades y características del sistema',
        usability: 'Facilidad de uso y aprendizaje',
        reliability: 'Disponibilidad, precisión y tolerancia a fallos',
        performance: 'Velocidad, eficiencia y consumo de recursos',
        supportability: 'Capacidad de mantenimiento y soporte',
      },
    },
    evaluation: {
      criteria: [
        {
          name: 'Funcionalidad',
          questions: [
            '¿YouTube ofrece todas las funciones esperadas (subir, ver, comentar, compartir)?',
            '¿Las funciones de monetización para creadores son adecuadas?',
            '¿Las herramientas de edición y gestión de contenido son completas?',
          ],
          score: 5,
          observations: 'Funcionalidades completas y en constante evolución.',
        },
        {
          name: 'Usabilidad',
          questions: [
            '¿La interfaz es fácil de usar para nuevos usuarios?',
            '¿La navegación es intuitiva?',
            '¿Las opciones de accesibilidad son adecuadas (subtítulos, descripciones)?',
          ],
          score: 5,
          observations:
            'Interfaz muy intuitiva con excelentes opciones de accesibilidad.',
        },
        {
          name: 'Confiabilidad',
          questions: [
            '¿El sistema es estable y rara vez falla?',
            '¿Los datos de los usuarios están seguros?',
            '¿La plataforma maneja adecuadamente errores y excepciones?',
          ],
          score: 4,
          observations:
            'Muy estable, aunque ocasionalmente hay caídas del servicio.',
        },
        {
          name: 'Rendimiento',
          questions: [
            '¿La carga de videos es rápida?',
            '¿El streaming es fluido en diferentes calidades?',
            '¿La plataforma responde rápidamente a las interacciones?',
          ],
          score: 4,
          observations:
            'Buen rendimiento, pero puede mejorar la velocidad de carga inicial.',
        },
        {
          name: 'Soporte',
          questions: [
            '¿YouTube ofrece soporte adecuado a creadores y usuarios?',
            '¿La documentación y ayuda son completas?',
            '¿Hay canales efectivos para reportar problemas?',
          ],
          score: 3,
          observations:
            'Soporte mejorable, especialmente para creadores pequeños.',
        },
      ],
    },
  } as const,
} as const

// Función para verificar el tipo de detalles
export const isMcCallDetails = (details: any): details is McCallDetails => {
  return 'factors' in details
}

export const isBoehmDetails = (details: any): details is BoehmDetails => {
  return 'characteristics' in details
}

export const isFurpsDetails = (details: any): details is FurpsDetails => {
  return 'categories' in details
}

// Calcular resultados automáticamente
export const getModelResults = (modelKey: ModelKey) => {
  const model = models[modelKey]
  const criteria = model.evaluation.criteria
  const totalScore = criteria.reduce((sum, c) => sum + c.score, 0)
  const maxScore = criteria.length * 5
  const percentage = Math.round((totalScore / maxScore) * 100)

  let interpretation = ''
  if (percentage >= 90) interpretation = 'Excelente - Calidad superior'
  else if (percentage >= 80)
    interpretation = 'Muy bueno - Cumple ampliamente con los estándares'
  else if (percentage >= 70)
    interpretation = 'Bueno - Cumple con los requisitos básicos'
  else if (percentage >= 60) interpretation = 'Aceptable - Requiere mejoras'
  else interpretation = 'Necesita mejoras significativas'

  return {
    totalScore,
    maxScore,
    percentage,
    interpretation,
  }
}

export type ModelKey = keyof typeof models
export const youtubeInfo = {
  platform: 'YouTube',
  url: 'https://www.youtube.com',
  evaluatedDate: new Date().toLocaleDateString('es-ES'),
  evaluator: 'Equipo de Evaluación',
}

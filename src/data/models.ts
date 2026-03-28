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
      'Modelo de calidad que evalúa el software desde tres perspectivas: operación del producto (40%), revisión del producto (30%) y transición del producto (30%).',
    details: {
      factors: {
        operation: [
          'Corrección',
          'Confiabilidad',
          'Usabilidad',
          'Integridad o Seguridad',
        ] as const,
        revision: [
          'Facilidad Mantenimiento',
          'Flexibilidad',
          'Facilidad de Prueba',
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
          name: 'Corrección',
          questions: [
            '¿El contenido es objetivo y se presenta de forma equilibrada?',
            '¿Las funciones implementadas cumplen con los requisitos?',
            '¿Se evitan errores en la ejecución?',
          ],
          score: 4.0,
          observations:
            'YouTube cumple excepcionalmente con todas las funciones requeridas.',
        },
        {
          name: 'Confiabilidad',
          questions: [
            '¿El sistema opera sin fallos de manera continua?',
            '¿Mantiene estabilidad bajo carga?',
            '¿Recupera correctamente ante errores?',
          ],
          score: 3.6,
          observations:
            'YouTube es altamente confiable, con mínimos tiempos de inactividad.',
        },
        {
          name: 'Usabilidad',
          questions: [
            '¿La aplicación permite al usuario manejar de forma intuitiva cada una de sus funciones?',
            '¿Es fácil de aprender y usar?',
            '¿La curva de aprendizaje es adecuada?',
          ],
          score: 3.3,
          observations:
            'Interfaz muy intuitiva, aunque algunas funciones avanzadas requieren aprendizaje.',
        },
        {
          name: 'Integridad o Seguridad',
          questions: [
            '¿La aplicación garantiza la seguridad de datos personales?',
            '¿Protege adecuadamente los datos del usuario?',
            '¿Previene accesos no autorizados?',
          ],
          score: 3.2,
          observations:
            'Buenos estándares de seguridad, aunque ha tenido vulnerabilidades en el pasado.',
        },
        {
          name: 'Portabilidad',
          questions: [
            '¿Es posible utilizar el recurso en diferentes dispositivos y plataformas?',
            '¿Funciona en múltiples plataformas?',
            '¿Puede migrarse fácilmente?',
          ],
          score: 3.48,
          observations:
            'Excelente portabilidad: disponible en web, iOS, Android, TV, consolas, etc.',
        },
        {
          name: 'Reusabilidad',
          questions: [
            '¿Diferentes acciones y funciones que posee funcionan de manera efectiva?',
            '¿Los componentes pueden reutilizarse?',
            '¿La API permite integración?',
          ],
          score: 4.0,
          observations:
            'Alta reusabilidad mediante su API pública y componentes embebibles.',
        },
        {
          name: 'Interoperabilidad',
          questions: [
            '¿El recurso es accesible para personas con discapacidades (subtítulos, voz)?',
            '¿Se integra con otros sistemas?',
            '¿Soporta estándares abiertos?',
          ],
          score: 4.0,
          observations:
            'Excelente interoperabilidad: integración con redes sociales, reproductores externos.',
        },
        {
          name: 'Facilidad Mantenimiento',
          questions: [
            '¿La curva de aprendizaje de esta aplicación es adecuada para usuarios no técnicos?',
            '¿Es fácil de mantener y actualizar?',
            '¿Permite correcciones ágiles?',
          ],
          score: 3.48,
          observations:
            'Google mantiene actualizaciones continuas de manera efectiva.',
        },
        {
          name: 'Flexibilidad',
          questions: [
            '¿La curva de aprendizaje para funciones avanzadas es adecuada?',
            '¿Puede adaptarse a nuevos requisitos?',
            '¿Es fácil extender funcionalidades?',
          ],
          score: 3.48,
          observations:
            'Alta flexibilidad con actualizaciones frecuentes y nuevas funciones.',
        },
        {
          name: 'Facilidad de Prueba',
          questions: [
            '¿Los tiempos de visualización son calculados de forma precisa?',
            '¿Puede probarse fácilmente?',
            '¿Permite validar cambios?',
          ],
          score: 3.3,
          observations:
            'Google realiza pruebas exhaustivas antes de cada despliegue.',
        },
      ],
    },
  } as const,
  boehm: {
    name: 'Boehm',
    description:
      'Modelo de calidad propuesto por Barry Boehm que evalúa el software basándose en características de utilidad general (portabilidad y utilidad) y mantenibilidad.',
    details: {
      characteristics: {
        utility: ['Fiabilidad', 'Eficiencia', 'Interactividad'] as const,
        maintainability: [
          'Facilidad de Prueba',
          'Facilidad de Entendimiento',
          'Modificabilidad',
        ] as const,
        portability: [
          'Independencia de Dispositivos',
          'Auto-contención',
        ] as const,
      },
    },
    evaluation: {
      criteria: [
        // Portabilidad
        {
          name: 'Independencia de Dispositivos',
          questions: [
            '¿El software puede ejecutarse en distintos dispositivos?',
            '¿Es compatible con múltiples sistemas operativos?',
            '¿Se adapta a diferentes tamaños de pantalla?',
          ],
          score: 4.0,
          observations:
            'Excelente portabilidad: disponible en prácticamente todos los dispositivos.',
        },
        {
          name: 'Auto-contención',
          questions: [
            '¿El la aplicación incluye todos los componentes necesarios para su ejecución?',
            '¿Requiere dependencias externas?',
            '¿Funciona de forma autónoma?',
          ],
          score: 4.0,
          observations:
            'La aplicación es autónoma en dispositivos móviles y web.',
        },
        // Fiabilidad
        {
          name: 'Precisión',
          questions: [
            '¿Los datos, cálculos y resultados mostrados son exactos y libres de error?',
            '¿Los resultados son precisos?',
            '¿La información mostrada es correcta?',
          ],
          score: 4.0,
          observations: 'Alta precisión en recomendaciones y métricas.',
        },
        {
          name: 'Completitud',
          questions: [
            '¿El software posee todas sus funciones y partes implementadas al 100%?',
            '¿Las características están completas?',
            '¿Faltan funcionalidades clave?',
          ],
          score: 4.0,
          observations:
            'Funciones completas para reproducción, subida y gestión de contenido.',
        },
        {
          name: 'Robustez (Fiabilidad)',
          questions: [
            '¿El sistema reacciona de forma estable ante datos de entrada incorrectos o fallos?',
            '¿Maneja adecuadamente los fallos?',
            '¿Se recupera de errores?',
          ],
          score: 4.0,
          observations: 'Sistema robusto con buena recuperación ante fallos.',
        },
        {
          name: 'Consistencia',
          questions: [
            '¿El diseño, la interfaz y los menús siguen un estándar uniforme en toda la aplicación?',
            '¿La interfaz es consistente?',
            '¿Los menús mantienen coherencia?',
          ],
          score: 4.0,
          observations: 'Diseño consistente en todas las plataformas.',
        },
        // Eficiencia
        {
          name: 'Responsabilidad',
          questions: [
            '¿El software responde con rapidez a las acciones ejecutadas por el usuario?',
            '¿Los tiempos de carga son óptimos?',
            '¿La interacción es fluida?',
          ],
          score: 4.0,
          observations:
            'Buena velocidad de respuesta, aunque depende de la conexión.',
        },
        {
          name: 'Eficiencia de dispositivos',
          questions: [
            '¿El software optimiza el uso de memoria, CPU y batería del hardware?',
            '¿Consumo de batería adecuado?',
            '¿Uso eficiente del CPU?',
          ],
          score: 3.0,
          observations: 'Consumo de batería mejorable en dispositivos móviles.',
        },
        {
          name: 'Accesibilidad (Eficiencia)',
          questions: [
            '¿Cuenta con facilidades para que personas con discapacidad puedan usarlo?',
            '¿Tiene subtítulos y audiodescripción?',
            '¿Es accesible para todos?',
          ],
          score: 4.0,
          observations:
            'Ofrece subtítulos automáticos y opciones de accesibilidad.',
        },
        // Interactividad
        {
          name: 'Robustez (Interactividad)',
          questions: [
            '¿El sistema mantiene su estado y datos ante desconexiones de red repentinas?',
            '¿Recupera datos tras fallos de red?',
            '¿Persiste información correctamente?',
          ],
          score: 3.0,
          observations: 'Mejorable en manejo de desconexiones repentinas.',
        },
        {
          name: 'Accesibilidad (Interactividad)',
          questions: [
            '¿Permite la interacción mediante diferentes periféricos (teclado, mouse, voz)?',
            '¿Soporta teclado, mouse, voz?',
            '¿Es compatible con controles alternativos?',
          ],
          score: 4.0,
          observations: 'Soporta múltiples formas de interacción.',
        },
        {
          name: 'Capacidad de comunicación',
          questions: [
            '¿El software permite el intercambio de información con otros sistemas o usuarios?',
            '¿Comparte información con otras apps?',
            '¿Tiene integración con redes?',
          ],
          score: 4.0,
          observations: 'Excelente capacidad de comunicación y compartición.',
        },
        // Facilidad de Prueba
        {
          name: 'Auto descripción',
          questions: [
            '¿Las funciones e iconos son lo suficientemente claros para no requerir instrucciones adicionales?',
            '¿No requiere instrucciones adicionales?',
            '¿La interfaz es auto-explicativa?',
          ],
          score: 4.0,
          observations: 'Interfaz intuitiva y auto-descriptiva.',
        },
        {
          name: 'Estructuración (Prueba)',
          questions: [
            '¿El contenido y el código están organizados de manera lógica y jerárquica?',
            '¿La jerarquía es clara?',
            '¿La navegación es coherente?',
          ],
          score: 4.0,
          observations: 'Excelente estructuración de contenido.',
        },
        // Facilidad de Entendimiento
        {
          name: 'Concisión',
          questions: [
            '¿El software evita información redundante o código innecesario?',
            '¿Es conciso en su presentación?',
            '¿Evita información redundante?',
          ],
          score: 3.0,
          observations: 'Algo de redundancia en recomendaciones y contenido.',
        },
        {
          name: 'Legibilidad',
          questions: [
            '¿El texto y los elementos visuales son fáciles de leer y comprender?',
            '¿Los elementos visuales son claros?',
            '¿La tipografía es adecuada?',
          ],
          score: 4.0,
          observations: 'Buena legibilidad en todas las plataformas.',
        },
        // Modificabilidad
        {
          name: 'Estructuración (Modificabilidad)',
          questions: [
            '¿La jerarquía de la interfaz facilita una navegación lógica entre contenidos?',
            '¿La estructura es lógica?',
            '¿Permite cambios fácilmente?',
          ],
          score: 3.0,
          observations: 'Estructura mejorable en ciertas secciones.',
        },
        {
          name: 'Escalabilidad',
          questions: [
            '¿Tiene la capacidad de crecer en usuarios y funciones sin perder calidad?',
            '¿Mantiene calidad al escalar?',
            '¿Soporta crecimiento sin pérdida?',
          ],
          score: 4.0,
          observations: 'Excelente escalabilidad demostrada a nivel global.',
        },
      ],
    },
  } as const,
  furps: {
    name: 'FURPS',
    description:
      'Modelo de calidad que evalúa: Funcionalidad (30%), Usabilidad (20%), Confiabilidad (15%), Rendimiento (20%) y Soporte (15%).',
    details: {
      categories: {
        functionality:
          'Características y capacidades del programa, generalidad de las funciones, seguridad del sistema',
        usability:
          'Capacidad de prueba, capacidad de configuración, compatibilidad, requisitos de instalación',
        reliability:
          'Frecuencia y severidad de fallos, exactitud de las salidas, capacidad de predicción',
        performance:
          'Factores humanos, factores estéticos, consistencia de la interfaz, documentación',
        supportability:
          'Velocidad de procesamiento, tiempo de respuesta, consumo de recursos, rendimiento efectivo total, eficacia',
      },
    },
    evaluation: {
      criteria: [
        // Funcionalidad
        {
          name: 'Características y capacidades del programa',
          questions: [
            '¿El software ofrece todas las funciones esperadas?',
            '¿Las características implementadas son completas?',
            '¿Cumple con los requisitos funcionales?',
          ],
          score: 4.0,
          observations: 'Amplio conjunto de características completas.',
        },
        {
          name: 'Generalidad de las funciones',
          questions: [
            '¿Las funciones cubren casos de uso generales?',
            '¿Es versátil en su aplicación?',
            '¿Se adapta a diferentes necesidades?',
          ],
          score: 4.0,
          observations: 'Alta generalidad que cubre múltiples casos de uso.',
        },
        {
          name: 'Seguridad del Sistema',
          questions: [
            '¿La aplicación garantiza la seguridad de datos personales?',
            '¿Protege adecuadamente la información?',
            '¿Previene vulnerabilidades?',
          ],
          score: 3.0,
          observations:
            'Seguridad adecuada pero con antecedentes de vulnerabilidades.',
        },
        // Usabilidad
        {
          name: 'Capacidad de Prueba',
          questions: [
            '¿Puede probarse fácilmente?',
            '¿Permite evaluar funcionalidades?',
            '¿Existe documentación de prueba?',
          ],
          score: 3.0,
          observations: 'Capacidad de prueba limitada para usuarios finales.',
        },
        {
          name: 'Capacidad de configuración',
          questions: [
            '¿Permite personalizar la experiencia?',
            '¿Hay opciones de configuración?',
            '¿Se adapta a preferencias del usuario?',
          ],
          score: 4.0,
          observations: 'Amplias opciones de configuración y personalización.',
        },
        {
          name: 'Compatibilidad',
          questions: [
            '¿Es compatible con múltiples dispositivos?',
            '¿Funciona en diferentes navegadores?',
            '¿Soporta distintos sistemas operativos?',
          ],
          score: 4.0,
          observations: 'Excelente compatibilidad multiplataforma.',
        },
        {
          name: 'Requisitos de instalación',
          questions: [
            '¿La instalación es sencilla?',
            '¿No requiere configuración compleja?',
            '¿Está disponible inmediatamente?',
          ],
          score: 4.0,
          observations:
            'Instalación simple o uso inmediato sin instalación en web.',
        },
        // Confiabilidad
        {
          name: 'Frecuencia y severidad de fallos',
          questions: [
            '¿Los fallos son poco frecuentes?',
            '¿La severidad de errores es baja?',
            '¿El sistema es estable?',
          ],
          score: 3.0,
          observations: 'Fallos ocasionales, generalmente de baja severidad.',
        },
        {
          name: 'Exactitud de las salidas',
          questions: [
            '¿Los resultados son precisos?',
            '¿Las salidas coinciden con lo esperado?',
            '¿Hay errores en la información mostrada?',
          ],
          score: 4.0,
          observations: 'Alta exactitud en reproducción y métricas.',
        },
        {
          name: 'Capacidad de predicción',
          questions: [
            '¿El comportamiento es predecible?',
            '¿Se anticipa a las necesidades?',
            '¿Las recomendaciones son acertadas?',
          ],
          score: 3.0,
          observations: 'Algoritmos de recomendación generalmente acertados.',
        },
        // Rendimiento
        {
          name: 'Factores Humanos',
          questions: [
            '¿Considera la experiencia del usuario?',
            '¿La interfaz es amigable?',
            '¿Facilita la interacción?',
          ],
          score: 4.0,
          observations: 'Excelente consideración de factores humanos.',
        },
        {
          name: 'Factores Estéticos',
          questions: [
            '¿El diseño es atractivo?',
            '¿La interfaz es visualmente agradable?',
            '¿Sigue tendencias de diseño?',
          ],
          score: 3.0,
          observations: 'Diseño funcional pero mejorable estéticamente.',
        },
        {
          name: 'Consistencia de la interfaz',
          questions: [
            '¿La interfaz es consistente?',
            '¿Los patrones se repiten?',
            '¿Hay coherencia visual?',
          ],
          score: 4.0,
          observations: 'Alta consistencia en toda la interfaz.',
        },
        {
          name: 'Documentación',
          questions: [
            '¿Existe documentación adecuada?',
            '¿Los usuarios encuentran ayuda?',
            '¿Los centros de ayuda son útiles?',
          ],
          score: 3.0,
          observations: 'Documentación disponible pero mejorable en claridad.',
        },
        // Soporte
        {
          name: 'Velocidad de procesamiento',
          questions: [
            '¿El procesamiento es rápido?',
            '¿La carga de videos es eficiente?',
            '¿Los tiempos de respuesta son adecuados?',
          ],
          score: 3.0,
          observations: 'Velocidad buena pero depende de ancho de banda.',
        },
        {
          name: 'Tiempo de respuesta',
          questions: [
            '¿Responde rápidamente a acciones?',
            '¿Los tiempos de carga son aceptables?',
            '¿Hay latencia perceptible?',
          ],
          score: 3.0,
          observations: 'Tiempos de respuesta variables según la red.',
        },
        {
          name: 'Consumo de recursos',
          questions: [
            '¿Optimiza el uso de recursos del sistema?',
            '¿Consumo de batería adecuado?',
            '¿Uso eficiente de memoria?',
          ],
          score: 2.0,
          observations:
            'Consumo de recursos mejorable, especialmente en dispositivos móviles.',
        },
        {
          name: 'Rendimiento efectivo total',
          questions: [
            '¿El rendimiento global es satisfactorio?',
            '¿La experiencia de usuario es fluida?',
            '¿Hay cuellos de botella?',
          ],
          score: 3.0,
          observations: 'Rendimiento general aceptable con mejoras pendientes.',
        },
        {
          name: 'Eficacia',
          questions: [
            '¿El software cumple su propósito de manera efectiva?',
            '¿Los usuarios logran sus objetivos?',
            '¿La plataforma es efectiva para creadores y espectadores?',
          ],
          score: 4.0,
          observations: 'Altamente eficaz en cumplir su propósito principal.',
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
  const maxScore = criteria.length * 4 // Escala de 0 a 4
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
  name: 'YouTube',
  url: 'https://www.youtube.com',
  evaluatedDate: 'Marzo 2026',
  evaluator: 'Equipo de Evaluación de Calidad',
}

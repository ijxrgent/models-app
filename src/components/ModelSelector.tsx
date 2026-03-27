'use client'
import { useState, useEffect } from 'react'
import { models, ModelKey, getModelResults, youtubeInfo } from '../data/models'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts'

// Componente personalizado para el Tooltip del gráfico de barras
const CustomBarTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-purple-900/95 backdrop-blur-sm border border-purple-400 rounded-lg p-3 shadow-xl">
        <p className="text-purple-200 font-semibold text-sm mb-1">{label}</p>
        <p className="text-emerald-400 text-2xl font-bold">
          {payload[0].value}%
        </p>
        <p className="text-purple-300 text-xs mt-1">Puntuación total</p>
      </div>
    )
  }
  return null
}

// Componente personalizado para el Tooltip del gráfico de radar
const CustomRadarTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-purple-900/95 backdrop-blur-sm border border-purple-400 rounded-lg p-3 shadow-xl">
        <p className="text-purple-200 font-semibold text-sm">
          {payload[0].payload.subject}
        </p>
        <p className="text-emerald-400 text-xl font-bold">
          {payload[0].value} / 5
        </p>
        <div className="w-full bg-white/20 rounded-full h-1.5 mt-2">
          <div
            className="bg-gradient-to-r from-purple-400 to-emerald-400 h-1.5 rounded-full"
            style={{ width: `${(payload[0].value / 5) * 100}%` }}
          />
        </div>
      </div>
    )
  }
  return null
}

export default function ModelSelector() {
  const [selected, setSelected] = useState<ModelKey>('mccall')
  const [showComparison, setShowComparison] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const results = getModelResults(selected)
  const model = models[selected]

  const allResults = {
    mccall: getModelResults('mccall'),
    boehm: getModelResults('boehm'),
    furps: getModelResults('furps'),
  }

  const barChartData = [
    { name: 'McCall', score: allResults.mccall.percentage },
    { name: 'Boehm', score: allResults.boehm.percentage },
    { name: 'FURPS', score: allResults.furps.percentage },
  ]

  const radarData = model.evaluation.criteria.map((criterion) => ({
    subject: criterion.name,
    score: criterion.score,
    fullMark: 5,
  }))

  useEffect(() => {
    setIsAnimating(true)
    const timer = setTimeout(() => setIsAnimating(false), 500)
    return () => clearTimeout(timer)
  }, [selected])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-purple-500 blur-2xl opacity-20"></div>
              <div className="relative flex items-center justify-center gap-3">
                <svg
                  className="w-12 h-12 md:w-16 md:h-16 text-red-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
                <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-red-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Evaluación de Calidad - YouTube
                </h1>
              </div>
            </div>
          </div>
          <p className="text-md md:text-lg text-purple-200 mb-2">
            Aplicación de modelos McCall, Boehm y FURPS
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-xs md:text-sm text-purple-300">
            <span>📅 Evaluado: {youtubeInfo.evaluatedDate}</span>
            <span>🔗 {youtubeInfo.url}</span>
            <span>👥 {youtubeInfo.evaluator}</span>
          </div>

          <button
            onClick={() => setShowComparison(!showComparison)}
            className="mt-6 px-6 py-2 bg-gradient-to-r from-purple-500 to-emerald-500 rounded-full text-white font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            {showComparison
              ? '📊 Ver modelo seleccionado'
              : '📈 Ver comparativa general'}
          </button>
        </div>

        {/* Vista de Comparativa */}
        {showComparison && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-center text-white mb-6">
              Comparativa de Modelos
            </h2>

            {/* Gráfico de barras con tooltip personalizado */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-8">
              <h3 className="text-lg font-semibold text-purple-300 mb-4 text-center">
                Comparativa de Puntuaciones
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff30" />
                  <XAxis
                    dataKey="name"
                    stroke="#c4b5fd"
                    tick={{ fill: '#c4b5fd' }}
                  />
                  <YAxis stroke="#c4b5fd" tick={{ fill: '#c4b5fd' }} />
                  <Tooltip
                    content={<CustomBarTooltip />}
                    cursor={{ fill: '#ffffff10' }}
                  />
                  <Bar
                    dataKey="score"
                    fill="url(#colorGradient)"
                    radius={[10, 10, 0, 0]}
                  >
                    <defs>
                      <linearGradient
                        id="colorGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop offset="0%" stopColor="#8b5cf6" stopOpacity={1} />
                        <stop
                          offset="100%"
                          stopColor="#10b981"
                          stopOpacity={1}
                        />
                      </linearGradient>
                    </defs>
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Tarjetas de comparativa */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(allResults).map(([key, result]) => (
                <div
                  key={key}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 transform hover:scale-105 transition-all duration-300"
                >
                  <h3 className="text-xl font-bold text-purple-300 mb-4 capitalize flex items-center gap-2">
                    {key === 'mccall' && '📊'}
                    {key === 'boehm' && '🔧'}
                    {key === 'furps' && '⚡'}
                    {key}
                  </h3>
                  <div className="text-center mb-4">
                    <div className="text-4xl font-bold text-emerald-400">
                      {result.percentage}%
                    </div>
                    <div className="text-sm text-purple-300 mt-2">
                      {result.interpretation}
                    </div>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-3 mb-4">
                    <div
                      className="bg-gradient-to-r from-purple-400 to-emerald-400 h-3 rounded-full transition-all duration-1000"
                      style={{ width: `${result.percentage}%` }}
                    />
                  </div>
                  <div className="text-center text-purple-200 text-sm">
                    <div>
                      Puntuación: {result.totalScore}/{result.maxScore}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Vista principal */}
        {!showComparison && (
          <>
            {/* Grid de tarjetas de modelos */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {Object.entries(models).map(([key, model]) => {
                const isSelected = selected === key
                const modelResults = getModelResults(key as ModelKey)

                return (
                  <div
                    key={key}
                    onClick={() => setSelected(key as ModelKey)}
                    className={`
                      cursor-pointer transition-all duration-500 transform hover:-translate-y-2
                      rounded-2xl overflow-hidden backdrop-blur-sm
                      ${
                        isSelected
                          ? 'bg-gradient-to-br from-purple-500/20 to-emerald-500/20 border-2 border-purple-400 shadow-2xl shadow-purple-500/20'
                          : 'bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:shadow-xl'
                      }
                    `}
                  >
                    <div className="p-6">
                      <div className="mb-4">
                        <div
                          className={`
                          w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300
                          ${isSelected ? 'bg-gradient-to-br from-purple-500 to-emerald-500' : 'bg-white/20'}
                        `}
                        >
                          <span className="text-2xl">
                            {key === 'mccall' && '📊'}
                            {key === 'boehm' && '🔧'}
                            {key === 'furps' && '⚡'}
                          </span>
                        </div>
                      </div>

                      <h3
                        className={`text-xl font-bold mb-2 transition-colors ${isSelected ? 'text-purple-300' : 'text-white'}`}
                      >
                        {model.name}
                      </h3>

                      <p className="text-purple-200 text-sm mb-4 line-clamp-2">
                        {model.description}
                      </p>

                      <div className="mt-4 pt-4 border-t border-white/20">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs text-purple-300">
                            Puntuación total
                          </span>
                          <span className="text-sm font-bold text-emerald-400">
                            {modelResults.percentage}%
                          </span>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-purple-400 to-emerald-400 h-2 rounded-full transition-all duration-1000"
                            style={{ width: `${modelResults.percentage}%` }}
                          />
                        </div>
                        {isSelected && (
                          <div className="mt-3 flex justify-end">
                            <span className="text-xs font-medium text-purple-300 bg-purple-500/30 px-3 py-1 rounded-full">
                              ✨ Seleccionado
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Detalle completo del modelo seleccionado */}
            {model && (
              <div
                className={`relative group transition-all duration-500 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-emerald-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>

                <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/20">
                  <div className="bg-gradient-to-r from-purple-600/50 to-emerald-600/50 px-6 py-4 border-b border-white/20">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                      <div>
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-200 to-emerald-200 bg-clip-text text-transparent">
                          {model.name}
                        </h2>
                        <p className="text-purple-300 text-sm mt-1">
                          {model.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-emerald-400">
                          {results.percentage}%
                        </div>
                        <div className="text-xs text-purple-300">
                          {results.interpretation}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    {/* Gráfico de Radar con tooltip personalizado */}
                    <div className="mb-8 p-4 bg-white/5 rounded-xl border border-white/10">
                      <h3 className="text-sm font-semibold text-purple-300 uppercase tracking-wider mb-4 text-center">
                        📊 Evaluación por Criterios (Gráfico de Radar)
                      </h3>
                      <ResponsiveContainer width="100%" height={300}>
                        <RadarChart data={radarData}>
                          <PolarGrid stroke="#c4b5fd" />
                          <PolarAngleAxis
                            dataKey="subject"
                            stroke="#c4b5fd"
                            tick={{ fill: '#c4b5fd', fontSize: 12 }}
                          />
                          <PolarRadiusAxis
                            angle={30}
                            domain={[0, 5]}
                            stroke="#c4b5fd"
                            tick={{ fill: '#c4b5fd' }}
                          />
                          <Radar
                            name={model.name}
                            dataKey="score"
                            stroke="#8b5cf6"
                            fill="#8b5cf6"
                            fillOpacity={0.6}
                          />
                          <Tooltip content={<CustomRadarTooltip />} />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Factores del modelo */}
                    {model.details && (
                      <div className="mb-6 p-4 bg-white/5 rounded-xl border border-white/10">
                        <h3 className="text-sm font-semibold text-purple-300 uppercase tracking-wider mb-3">
                          📋 Factores evaluados
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {'factors' in model.details && (
                            <>
                              {model.details.factors.operation && (
                                <div>
                                  <h4 className="text-emerald-400 text-sm font-semibold mb-2">
                                    Operación
                                  </h4>
                                  <ul className="space-y-1">
                                    {model.details.factors.operation.map(
                                      (factor: string) => (
                                        <li
                                          key={factor}
                                          className="text-purple-200 text-xs"
                                        >
                                          • {factor}
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              )}
                              {model.details.factors.revision && (
                                <div>
                                  <h4 className="text-emerald-400 text-sm font-semibold mb-2">
                                    Revisión
                                  </h4>
                                  <ul className="space-y-1">
                                    {model.details.factors.revision.map(
                                      (factor: string) => (
                                        <li
                                          key={factor}
                                          className="text-purple-200 text-xs"
                                        >
                                          • {factor}
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              )}
                              {model.details.factors.transition && (
                                <div>
                                  <h4 className="text-emerald-400 text-sm font-semibold mb-2">
                                    Transición
                                  </h4>
                                  <ul className="space-y-1">
                                    {model.details.factors.transition.map(
                                      (factor: string) => (
                                        <li
                                          key={factor}
                                          className="text-purple-200 text-xs"
                                        >
                                          • {factor}
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              )}
                            </>
                          )}
                          {'characteristics' in model.details && (
                            <>
                              {model.details.characteristics.utility && (
                                <div>
                                  <h4 className="text-emerald-400 text-sm font-semibold mb-2">
                                    Utilidad
                                  </h4>
                                  <ul className="space-y-1">
                                    {model.details.characteristics.utility.map(
                                      (char: string) => (
                                        <li
                                          key={char}
                                          className="text-purple-200 text-xs"
                                        >
                                          • {char}
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              )}
                              {model.details.characteristics
                                .maintainability && (
                                <div>
                                  <h4 className="text-emerald-400 text-sm font-semibold mb-2">
                                    Mantenibilidad
                                  </h4>
                                  <ul className="space-y-1">
                                    {model.details.characteristics.maintainability.map(
                                      (char: string) => (
                                        <li
                                          key={char}
                                          className="text-purple-200 text-xs"
                                        >
                                          • {char}
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              )}
                              {model.details.characteristics.portability && (
                                <div>
                                  <h4 className="text-emerald-400 text-sm font-semibold mb-2">
                                    Portabilidad
                                  </h4>
                                  <ul className="space-y-1">
                                    {model.details.characteristics.portability.map(
                                      (char: string) => (
                                        <li
                                          key={char}
                                          className="text-purple-200 text-xs"
                                        >
                                          • {char}
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              )}
                            </>
                          )}
                          {'categories' in model.details && (
                            <div className="col-span-3">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {Object.entries(model.details.categories).map(
                                  ([key, value]) => (
                                    <div
                                      key={key}
                                      className="bg-white/5 rounded p-2"
                                    >
                                      <span className="text-emerald-400 text-xs font-semibold capitalize">
                                        {key}:
                                      </span>
                                      <span className="text-purple-200 text-xs ml-2">
                                        {value}
                                      </span>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Criterios de evaluación */}
                    <h3 className="text-sm font-semibold text-purple-300 uppercase tracking-wider mb-4">
                      📊 Evaluación detallada
                    </h3>
                    <div className="space-y-4">
                      {model.evaluation.criteria.map((criterion, idx) => (
                        <div
                          key={idx}
                          className="bg-white/5 rounded-lg p-4 border border-white/10 transition-all duration-300 hover:scale-[1.02]"
                        >
                          <div className="flex justify-between items-start mb-3">
                            <h4 className="text-lg font-semibold text-purple-200">
                              {criterion.name}
                            </h4>
                            <div className="flex items-center gap-2">
                              <div className="text-2xl font-bold text-emerald-400">
                                {criterion.score}
                              </div>
                              <div className="text-sm text-purple-300">/5</div>
                            </div>
                          </div>

                          <div className="mb-3">
                            <div className="w-full bg-white/20 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-purple-400 to-emerald-400 h-2 rounded-full transition-all duration-1000"
                                style={{
                                  width: `${(criterion.score / 5) * 100}%`,
                                }}
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div>
                              <p className="text-xs text-purple-300 mb-1">
                                📝 Preguntas:
                              </p>
                              <ul className="list-disc list-inside space-y-1">
                                {criterion.questions.map((q, qIdx) => (
                                  <li
                                    key={qIdx}
                                    className="text-purple-200 text-sm"
                                  >
                                    {q}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {criterion.observations && (
                              <div className="mt-2 p-2 bg-emerald-500/10 rounded border border-emerald-500/30">
                                <p className="text-xs text-emerald-300">
                                  💡 Observación: {criterion.observations}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Conclusiones y resultados */}
                    <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/20 to-emerald-500/20 rounded-xl border border-white/20">
                      <h3 className="text-sm font-semibold text-purple-300 uppercase tracking-wider mb-3">
                        📈 Resultados y Conclusiones
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-emerald-400">
                            {results.totalScore}
                          </div>
                          <div className="text-xs text-purple-300">
                            Puntuación Total
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-emerald-400">
                            {results.maxScore}
                          </div>
                          <div className="text-xs text-purple-300">
                            Puntuación Máxima
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-emerald-400">
                            {results.percentage}%
                          </div>
                          <div className="text-xs text-purple-300">
                            Porcentaje
                          </div>
                        </div>
                      </div>
                      <p className="text-purple-200 text-center font-semibold">
                        {results.interpretation}
                      </p>
                      <p className="text-purple-300 text-sm text-center mt-2">
                        YouTube demuestra una calidad{' '}
                        {results.percentage >= 80
                          ? 'excepcional'
                          : results.percentage >= 70
                            ? 'sólida'
                            : 'adecuada'}{' '}
                        en la evaluación del modelo {model.name}.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <footer className="mt-12 text-center text-purple-400 text-sm border-t border-white/10 pt-6">
        <p>
          © 2024 - Evaluación de Calidad de Software | YouTube como caso de
          estudio
        </p>
        <p className="text-xs mt-2">Modelos: McCall | Boehm | FURPS</p>
      </footer>
    </div>
  )
}

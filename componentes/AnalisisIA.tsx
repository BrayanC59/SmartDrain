import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Activity, ShieldAlert, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SensorIoT } from '../tipos';
import { ServicioGroq } from '../servicios/ServicioGroq';

interface Props {
  sensores: SensorIoT[];
}

export const AnalisisIA: React.FC<Props> = ({ sensores }) => {
  const [insight, setInsight] = useState('');
  const [cargando, setCargando] = useState(true);
  const [origen, setOrigen] = useState<'groq' | 'local'>('local');
  const ultimaPeticion = useRef(0);

  useEffect(() => {
    const idPeticion = ++ultimaPeticion.current;
    setCargando(true);

    ServicioGroq.analizarRed(sensores).then(({ texto, origen: fuente }) => {
      if (idPeticion !== ultimaPeticion.current) return;
      setInsight(texto);
      setOrigen(fuente);
      setCargando(false);
    });

    return () => {
      ultimaPeticion.current++;
    };
  }, [sensores]);

  const criticos = sensores.filter((s) => s.estado === 'Critico').length;
  const alertas = sensores.filter((s) => s.estado === 'Alerta').length;

  return (
    <div className="glass rounded-3xl p-6 border-emerald-500/10 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <Sparkles className="h-20 w-20 text-emerald-400" />
      </div>

      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
          <Zap className="h-5 w-5 text-emerald-500 animate-pulse" />
        </div>
        <div>
          <h4 className="text-[10px] font-black uppercase text-emerald-500 tracking-widest">
            IA operativa • {origen === 'groq' ? 'Groq' : 'Local'}
          </h4>
          <h3 className="font-heading font-bold text-gray-900 dark:text-white">Análisis SmartDrain</h3>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {cargando ? (
          <motion.div
            key="cargando"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 py-4"
          >
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" />
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.2s]" />
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
            <span className="text-xs text-emerald-500 font-mono">Analizando telemetría...</span>
          </motion.div>
        ) : (
          <motion.div
            key="insight"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <p className="text-sm text-gray-600 dark:text-slate-300 italic leading-relaxed">
              &ldquo;{insight}&rdquo;
            </p>
            <div className="flex gap-4 flex-wrap">
              <div className="flex items-center gap-1.5">
                <Activity className="h-3 w-3 text-emerald-500" />
                <span className="text-[10px] font-bold text-gray-400 uppercase">
                  Nodos: {sensores.length}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldAlert className="h-3 w-3 text-orange-500" />
                <span className="text-[10px] font-bold text-gray-400 uppercase">
                  Alertas: {alertas} · Críticos: {criticos}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

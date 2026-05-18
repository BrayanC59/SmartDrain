import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { Icon } from 'leaflet';
import { Camera, MapPin, CheckCircle2, Waves, AlertTriangle, Trash2, Droplets, ArrowRight, X } from 'lucide-react';
import { usarAuth } from '../contextos/ContextoAuth';
import { ServicioBdLocal } from '../servicios/ServicioBdLocal';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { usarTema } from '../contextos/ContextoTema';
import { urlCapaMapa } from '../utilidades/estilosTema';

const customIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

type Categoria = 'Obstrucción' | 'Mal Olor' | 'Tapa Dañada' | 'Desbordamiento';

const CATEGORIAS: { id: Categoria; icono: any; color: string; desc: string }[] = [
  { id: 'Obstrucción', icono: Trash2, color: 'text-orange-500', desc: 'Basura o sedimentos' },
  { id: 'Mal Olor', icono: Droplets, color: 'text-purple-500', desc: 'Gases o estancamiento' },
  { id: 'Tapa Dañada', icono: AlertTriangle, color: 'text-red-500', desc: 'Peligro en vía' },
  { id: 'Desbordamiento', icono: Waves, color: 'text-blue-500', desc: 'Exceso de agua' },
];

function MapClickHandler({ onLocationSelect }: { onLocationSelect: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export default function NuevoReporte() {
  const { usuario } = usarAuth();
  const { tema } = usarTema();
  const navigate = useNavigate();
  const [posicion, setPosicion] = useState<{lat: number, lng: number}>({ lat: 2.4418, lng: -76.6063 });
  const [categoria, setCategoria] = useState<Categoria>('Obstrucción');
  const [descripcion, setDescripcion] = useState('');
  const [severidad, setSeveridad] = useState<'Leve' | 'Moderado' | 'Grave'>('Moderado');
  const [enviado, setEnviado] = useState(false);
  const [paso, setPaso] = useState(1);

  const manejarEnvio = (e: React.FormEvent) => {
    e.preventDefault();
    ServicioBdLocal.guardarReporte({
      descripcion: `[${categoria}] ${descripcion}`,
      latitud: posicion.lat,
      longitud: posicion.lng,
      severidad,
      autorId: usuario?.id || 'anonimo'
    });
    setEnviado(true);
    setTimeout(() => navigate('/panel'), 2500);
  };

  if (enviado) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-gray-50 dark:bg-slate-950">
        <motion.div 
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-emerald-500/20"
        >
          <CheckCircle2 className="h-12 w-12 text-white" />
        </motion.div>
        <h2 className="text-4xl font-heading font-bold mb-4 text-gray-900 dark:text-white">¡Su Voz cuenta!</h2>
        <p className="text-gray-500 dark:text-slate-400 max-w-md text-lg">
          El reporte ha sido digitalizado y enviado al comando de emergencias de Popayán.
        </p>
        <motion.div 
          className="mt-12 w-16 h-1.5 bg-gray-200 dark:bg-slate-800 rounded-full overflow-hidden"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        >
           <motion.div 
            className="h-full bg-primary-500"
            initial={{ width: 0 }} animate={{ width: '100%' }}
            transition={{ duration: 2.5 }}
           />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-12 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
           <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-500 mb-2">Popayán SmartDrain</p>
           <h1 className="text-5xl font-heading font-medium italic text-gray-900 dark:text-white">Digitalizar Reporte</h1>
           <p className="text-gray-500 dark:text-slate-500 mt-2 text-lg">Ayúdenos a mantener la ciudad libre de inundaciones.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-7 space-y-8">
            {/* Paso 1: Categoría */}
            <div className={`card-premium rounded-[2.5rem] p-10 transition-all ${paso === 1 ? 'opacity-100 ring-2 ring-primary-500/20' : 'paso-inactivo'}`}>
               <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-8">Paso 01: Identificar Problema</h3>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {CATEGORIAS.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => { setCategoria(cat.id); setPaso(2); }}
                      className={`flex flex-col items-center justify-center p-6 rounded-3xl border-2 transition-all gap-4 group ${categoria === cat.id ? 'bg-primary-500/10 border-primary-500 shadow-xl' : 'bg-white dark:bg-slate-900 border-gray-100 dark:border-slate-800 hover:border-gray-200'}`}
                    >
                      <cat.icono className={`h-8 w-8 transition-transform group-hover:scale-110 ${categoria === cat.id ? cat.color : 'text-gray-400'}`} />
                      <div className="text-center">
                         <p className={`text-xs font-black uppercase tracking-tighter ${categoria === cat.id ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}>{cat.id}</p>
                         <p className="text-[9px] text-gray-400 dark:text-slate-500 mt-1">{cat.desc}</p>
                      </div>
                    </button>
                  ))}
               </div>
            </div>

            {/* Paso 2: Detalles */}
            <div className={`card-premium rounded-[2.5rem] p-10 transition-all ${paso === 2 ? 'opacity-100 ring-2 ring-primary-500/20' : 'paso-inactivo'}`}>
               <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-8">Paso 02: Detalles del Hallazgo</h3>
               <div className="space-y-6">
                  <div>
                    <label className="text-[10px] font-black uppercase text-gray-400 mb-4 block">Descripción Narrativa</label>
                    <textarea 
                      value={descripcion}
                      onChange={(e) => setDescripcion(e.target.value)}
                      className="w-full input-field rounded-2xl px-6 py-5 focus:outline-none focus:ring-2 focus:ring-primary-500 text-lg min-h-[120px] resize-none text-slate-900 dark:text-slate-100"
                      placeholder="Cuéntanos exactamente qué está sucediendo..."
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-black uppercase text-gray-400 mb-4 block">Nivel de Gravedad Percibido</label>
                    <div className="grid grid-cols-3 gap-4">
                       {['Leve', 'Moderado', 'Grave'].map((n) => (
                         <button
                           key={n}
                           onClick={() => setSeveridad(n as any)}
                           className={`p-4 rounded-xl font-bold text-sm transition-all border ${severidad === n ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-transparent' : 'bg-white dark:bg-slate-900 text-gray-500 border-gray-100 dark:border-slate-800'}`}
                         >
                           {n}
                         </button>
                       ))}
                    </div>
                  </div>

                  <div className="pt-4 flex gap-4">
                    <button 
                      onClick={manejarEnvio}
                      disabled={!descripcion}
                      className="flex-1 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-200 dark:disabled:bg-slate-800 disabled:text-gray-400 py-5 rounded-2xl text-white font-bold text-lg flex items-center justify-center gap-3 transition-all hover:shadow-2xl hover:shadow-primary-500/30"
                    >
                      Sincronizar y Enviar
                      <ArrowRight className="h-5 w-5" />
                    </button>
                    <button onClick={() => setPaso(1)} className="p-5 rounded-2xl border border-gray-200 dark:border-slate-800 text-gray-400 hover:text-gray-900 dark:hover:text-white"><X className="h-6 w-6" /></button>
                  </div>
               </div>
            </div>
          </div>

          <div className="lg:col-span-5">
             <div className="card-premium rounded-[2.5rem] overflow-hidden flex flex-col h-[600px] sticky top-12">
                <div className="p-8 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary-500/10 rounded-xl flex items-center justify-center">
                        <MapPin className="text-primary-500 h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest leading-none">Ubicación Precisa</p>
                        <p className="font-bold text-gray-900 dark:text-white mt-1">Popayán, Centro Histórico</p>
                      </div>
                   </div>
                </div>
                <div className="flex-1 relative z-0">
                  <MapContainer center={[posicion.lat, posicion.lng]} zoom={15} style={{ height: '100%', width: '100%' }}>
                    <TileLayer url={urlCapaMapa(tema === 'oscuro')} attribution='&copy; CARTO' />
                    <MapClickHandler onLocationSelect={(lat, lng) => { setPosicion({lat, lng}); setPaso(2); }} />
                    <Marker position={[posicion.lat, posicion.lng]} icon={customIcon} />
                  </MapContainer>
                </div>
                <div className="p-8 bg-slate-50 dark:bg-slate-900/50">
                   <p className="text-xs text-gray-500 italic text-center">Toca el mapa para reubicar el incidente si es necesario.</p>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}

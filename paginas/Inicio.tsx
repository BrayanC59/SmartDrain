import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, AlertTriangle, Activity, Map, Sparkles, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export default function Inicio() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)] overflow-x-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-emerald-500/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-blue-500/5 blur-[120px]" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 lg:pt-32 lg:pb-48">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8">
                 <Sparkles className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                 <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">Innovación en la Ciudad Blanca</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-heading font-medium text-gray-900 dark:text-white leading-[1.1] mb-8">
                Hacia una de <span className="italic">resiliencia hídrica</span> inteligente.
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-slate-400 mb-12 max-w-xl leading-relaxed">
                SmartDrain es el primer ecosistema de Popayán que fusiona **telemetría IoT de vanguardia** con la participación ciudadana para erradicar las inundaciones.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6">
                 <Link to="/reportar" className="group relative inline-flex items-center justify-center px-8 py-5 font-bold text-white transition-all duration-200 bg-primary-600 font-sans rounded-2xl hover:bg-primary-500 shadow-xl shadow-primary-600/25">
                   <AlertTriangle className="mr-2 h-5 w-5" />
                   Reportar Emergencia
                   <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                 </Link>
                 
                 <Link to="/panel" className="inline-flex items-center justify-center px-8 py-5 text-sm font-bold text-slate-800 transition-all duration-200 bg-white border border-slate-200 rounded-2xl shadow-sm dark:bg-slate-900 dark:text-white dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800">
                    Ver Panel de Control
                 </Link>
              </div>

              <div className="mt-12 flex items-center gap-8 text-slate-500 dark:text-slate-400">
                 <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Protocolo Seguro</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">IoT Activo</span>
                 </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative lg:block hidden"
            >
               <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-blue-500/20 rounded-[3rem] blur-3xl -z-10" />
               <div className="glass rounded-[3rem] p-8 relative">
                  <div className="bg-white dark:bg-slate-950 rounded-2xl aspect-[4/3] overflow-hidden shadow-xl relative border border-slate-200 dark:border-slate-800">
                     <div className="absolute top-4 left-4 right-4 h-8 bg-slate-100 dark:bg-white/5 rounded-lg flex items-center px-4 justify-between border border-slate-200 dark:border-transparent">
                        <div className="flex gap-1.5"><div className="w-2 h-2 rounded-full bg-red-500" /><div className="w-2 h-2 rounded-full bg-yellow-500" /><div className="w-2 h-2 rounded-full bg-green-500" /></div>
                        <div className="text-[10px] text-slate-400 dark:text-white/40 uppercase font-mono tracking-widest">smartdrain.popayan.gov.co</div>
                     </div>
                     <div className="p-12 pt-16 grid grid-cols-2 gap-4">
                        <div className="bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-xl p-4 flex flex-col justify-between h-32">
                           <span className="text-[8px] font-bold text-emerald-600 dark:text-emerald-500 uppercase">Sector Histórico</span>
                           <span className="text-4xl font-heading text-slate-900 dark:text-white">88% <span className="text-xs text-emerald-600 dark:text-emerald-400">FLUJO</span></span>
                        </div>
                        <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-xl p-4 h-32" />
                        <div className="col-span-2 bg-slate-50 dark:bg-white/5 h-20 rounded-xl border border-slate-200 dark:border-white/10" />
                     </div>
                  </div>
               </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Trust & Stats */}
      <section className="bg-slate-50/80 dark:bg-slate-950 py-24 border-t border-slate-200 dark:border-slate-800">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
               <h2 className="text-3xl font-heading font-medium mb-4 italic">Gestión Moderna para Popayán</h2>
               <p className="text-gray-500 uppercase text-[10px] tracking-[0.4em] font-bold">Uniendo Tecnología y Ciudadanía</p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-12 text-center items-center">
               <div>
                  <p className="text-5xl font-heading font-light text-primary-600 mb-2">12</p>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest font-sans">Sensores IoT</p>
               </div>
               <div className="h-px md:h-12 w-12 md:w-px bg-gray-200 dark:bg-slate-800 mx-auto" />
               <div>
                  <p className="text-5xl font-heading font-light text-primary-600 mb-2">99.8%</p>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest font-sans">Disponibilidad</p>
               </div>
               <div className="h-px md:h-12 w-12 md:w-px bg-gray-200 dark:bg-slate-800 mx-auto" />
               <div>
                  <p className="text-5xl font-heading font-light text-primary-600 mb-2">± 15min</p>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest font-sans">Tiempo Respuesta</p>
               </div>
               <div className="h-px md:h-12 w-12 md:w-px bg-gray-200 dark:bg-slate-800 mx-auto" />
               <div>
                   <p className="text-xs font-bold text-gray-500 uppercase tracking-widest font-sans leading-loose">Ciudad Blanca <br/> <span className="opacity-40 italic">Smart City Ready</span></p>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}

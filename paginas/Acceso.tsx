import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { usarAuth } from '../contextos/ContextoAuth';
import { motion } from 'motion/react';

export default function Acceso() {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const { autenticar } = usarAuth();
  const navigate = useNavigate();

  const manejarEnvio = (e: React.FormEvent) => {
    e.preventDefault();
    if(correo && password) {
      const nombre = correo.split('@')[0];
      autenticar(nombre, correo);
      navigate('/reportar');
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md card-container rounded-2xl p-8 shadow-xl shadow-slate-200/50 dark:shadow-none"
      >
        <div className="text-center mb-8">
          <div className="inline-flex justify-center items-center w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-4">
            <LogIn className="h-7 w-7 text-primary-600 dark:text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold font-heading text-gray-900 dark:text-white">Bienvenido a SmartDrain</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Accede para realizar tus reportes ciudadanos</p>
        </div>

        <form onSubmit={manejarEnvio} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">Correo Electrónico</label>
            <input 
              type="email" 
              required
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className="w-full input-field rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:outline-none transition-shadow"
              placeholder="ciudadano@popayan.gov.co"
            />
          </div>
          <div>
             <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">Contraseña</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full input-field rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:outline-none transition-shadow"
              placeholder="••••••••"
            />
          </div>
          
          <button 
            type="submit"
            className="w-full mt-2 bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Iniciar Sesión
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-600 dark:text-gray-400">
          ¿No tienes cuenta? <Link to="/registro" className="text-primary-600 dark:text-blue-400 font-medium hover:underline">Regístrate aquí</Link>
        </p>
      </motion.div>
    </div>
  );
}

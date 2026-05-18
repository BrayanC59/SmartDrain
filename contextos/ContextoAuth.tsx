import React, { createContext, useContext, useState, useEffect } from 'react';
import { Usuario } from '../tipos';

interface ContextoAuthValor {
  usuario: Usuario | null;
  autenticar: (nombre: string, correo: string) => void;
  cerrarSesion: () => void;
}

const ContextoAuth = createContext<ContextoAuthValor | undefined>(undefined);

export const ProveedorAuth: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    const usr = localStorage.getItem('smartdrain_usuario');
    if(usr) setUsuario(JSON.parse(usr));
  }, []);

  const autenticar = (nombre: string, correo: string) => {
    const nuevoUsuario: Usuario = { id: Math.random().toString(36).substr(2, 9), nombre, correo };
    setUsuario(nuevoUsuario);
    localStorage.setItem('smartdrain_usuario', JSON.stringify(nuevoUsuario));
  };

  const cerrarSesion = () => {
    setUsuario(null);
    localStorage.removeItem('smartdrain_usuario');
  };

  return (
    <ContextoAuth.Provider value={{ usuario, autenticar, cerrarSesion }}>
      {children}
    </ContextoAuth.Provider>
  );
};

export const usarAuth = () => {
  const context = useContext(ContextoAuth);
  if(!context) throw new Error('usarAuth debe usarse dentro de un ProveedorAuth');
  return context;
};

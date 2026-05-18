import React, { createContext, useContext, useEffect, useState } from 'react';

type Tema = 'claro' | 'oscuro';

interface ContextoTemaValor {
  tema: Tema;
  alternarTema: () => void;
  establecerTema: (tema: Tema) => void;
}

const ContextoTema = createContext<ContextoTemaValor | undefined>(undefined);

export const ProveedorTema: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tema, setTema] = useState<Tema>(() => {
    if (typeof localStorage !== 'undefined') {
      return (localStorage.getItem('smartdrain_tema') as Tema) || 'claro';
    }
    return 'claro';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('dark', 'light', 'claro', 'oscuro');
    if (tema === 'oscuro') {
      root.classList.add('dark');
    }
    root.style.colorScheme = tema === 'oscuro' ? 'dark' : 'light';
    localStorage.setItem('smartdrain_tema', tema);
  }, [tema]);

  const alternarTema = () => {
    setTema(prev => (prev === 'claro' ? 'oscuro' : 'claro'));
  };

  const establecerTema = (nuevoTema: Tema) => {
    setTema(nuevoTema);
  };

  return (
    <ContextoTema.Provider value={{ tema, alternarTema, establecerTema }}>
      {children}
    </ContextoTema.Provider>
  );
};

export const usarTema = () => {
  const context = useContext(ContextoTema);
  if (!context) throw new Error('usarTema debe usarse dentro de un ProveedorTema');
  return context;
};

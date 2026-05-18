import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProveedorTema } from './contextos/ContextoTema';
import { ProveedorAuth, usarAuth } from './contextos/ContextoAuth';
import { BarraNavegacion } from './componentes/BarraNavegacion';

// Páginas
import Inicio from './paginas/Inicio';
import Acceso from './paginas/Acceso';
import Registro from './paginas/Registro';
import NuevoReporte from './paginas/NuevoReporte';
import PanelIoT from './paginas/PanelIoT';

// Protected Route Wrapper
const RutaPrivada = ({ children }: { children: React.ReactNode }) => {
  const { usuario } = usarAuth();
  if (!usuario) {
    return <Navigate to="/acceso" replace />;
  }
  return <>{children}</>;
};

export default function App() {
  return (
    <ProveedorTema>
      <ProveedorAuth>
        <BrowserRouter>
          <div className="min-h-screen">
            <BarraNavegacion />
            <main>
              <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/acceso" element={<Acceso />} />
                <Route path="/registro" element={<Registro />} />
                <Route path="/panel" element={<PanelIoT />} />
                <Route 
                  path="/reportar" 
                  element={
                    <RutaPrivada>
                      <NuevoReporte />
                    </RutaPrivada>
                  } 
                />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </ProveedorAuth>
    </ProveedorTema>
  );
}

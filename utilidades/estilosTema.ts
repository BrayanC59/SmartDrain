export const urlCapaMapa = (oscuro: boolean) =>
  oscuro
    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
    : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

export const estiloTooltipGrafica = (oscuro: boolean) => ({
  background: oscuro ? 'rgba(15, 23, 42, 0.95)' : '#ffffff',
  border: `1px solid ${oscuro ? '#334155' : '#e2e8f0'}`,
  borderRadius: '12px',
  fontSize: '11px',
  color: oscuro ? '#f8fafc' : '#0f172a',
  boxShadow: oscuro ? '0 4px 12px rgba(0,0,0,0.3)' : '0 4px 12px rgba(15,23,42,0.08)',
});

export const cursorGrafica = (oscuro: boolean) => ({
  fill: oscuro ? 'rgba(255,255,255,0.06)' : 'rgba(15,23,42,0.04)',
});

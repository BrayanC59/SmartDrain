import { Sun, Moon } from 'lucide-react';
import { usarTema } from '../contextos/ContextoTema';

export const SelectorTema = () => {
  const { tema, establecerTema } = usarTema();
  const esOscuro = tema === 'oscuro';

  return (
    <button
      type="button"
      role="switch"
      aria-checked={esOscuro}
      aria-label={esOscuro ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      onClick={() => establecerTema(esOscuro ? 'claro' : 'oscuro')}
      className={`
        relative h-9 w-[4.25rem] shrink-0 rounded-full border-2 border-[#1a2744] transition-colors duration-300
        ${esOscuro ? 'bg-[#1a2744]' : 'bg-white'}
      `}
    >
      {esOscuro ? (
        <span
          className="absolute left-0.5 top-1/2 h-7 w-7 -translate-y-1/2 rounded-full bg-white"
          aria-hidden
        />
      ) : (
        <span
          className="absolute right-0.5 top-1/2 h-7 w-7 -translate-y-1/2 rounded-full bg-[#1a2744]"
          aria-hidden
        />
      )}

      <span
        className={`
          absolute top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-[#f5b301]
          transition-all duration-300 ease-out
          ${esOscuro ? 'left-[calc(100%-1.875rem)]' : 'left-0.5'}
        `}
      >
        {esOscuro ? (
          <Moon className="h-4 w-4 text-[#1a2744]" strokeWidth={2.5} />
        ) : (
          <Sun className="h-4 w-4 text-[#1a2744]" strokeWidth={2.5} />
        )}
      </span>
    </button>
  );
};

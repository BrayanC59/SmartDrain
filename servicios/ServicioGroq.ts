import { SensorIoT } from '../tipos';

const ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions';

function analisisRespaldo(sensores: SensorIoT[]): string {
  const criticos = sensores.filter((s) => s.estado === 'Critico');
  const alertas = sensores.filter((s) => s.estado === 'Alerta');

  if (criticos.length > 0) {
    const s = criticos[0];
    return `Crítico: Riesgo de desbordamiento en ${s.ubicacion} (nivel ${s.nivelAgua}%, flujo ${s.flujo} m³/s). Se recomienda brigada de limpieza inmediata.`;
  }
  if (alertas.length > 0) {
    const s = alertas[0];
    return `Alerta: Nivel elevado en ${s.ubicacion} (${s.nivelAgua}%). Monitorear evolución y preparar intervención preventiva.`;
  }
  return 'Red estable: todos los nodos reportan niveles dentro de parámetros operativos normales.';
}

function resumenSensores(sensores: SensorIoT[]): string {
  return sensores
    .map(
      (s) =>
        `- ${s.ubicacion}: nivel ${s.nivelAgua}%, flujo ${s.flujo} m³/s, batería ${s.bateria}%, estado ${s.estado}`
    )
    .join('\n');
}

export const ServicioGroq = {
  analizarRed: async (sensores: SensorIoT[]): Promise<{ texto: string; origen: 'groq' | 'local' }> => {
    const apiKey = import.meta.env.VITE_GROQ_API_KEY;
    const modelo = import.meta.env.VITE_GROQ_MODEL || 'llama-3.3-70b-versatile';

    if (!apiKey?.trim()) {
      return { texto: analisisRespaldo(sensores), origen: 'local' };
    }

    try {
      const resp = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: modelo,
          temperature: 0.4,
          max_tokens: 280,
          messages: [
            {
              role: 'system',
              content:
                'Eres un analista operativo de SmartDrain en Popayán, Colombia. Evalúas telemetría de alcantarillado IoT. Responde en español, máximo 3 oraciones, tono profesional y accionable. Prioriza zonas Crítico y Alerta.',
            },
            {
              role: 'user',
              content: `Analiza el estado actual de la red y recomienda acciones:\n${resumenSensores(sensores)}`,
            },
          ],
        }),
      });

      if (!resp.ok) {
        throw new Error(`Groq ${resp.status}`);
      }

      const data = await resp.json();
      const texto = data?.choices?.[0]?.message?.content?.trim();

      if (!texto) throw new Error('Respuesta vacía');

      return { texto, origen: 'groq' };
    } catch (error) {
      console.error('ServicioGroq:', error);
      return { texto: analisisRespaldo(sensores), origen: 'local' };
    }
  },
};

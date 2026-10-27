import { describe, expect, it } from 'vitest';
import { estadoClinica } from './horario';

// Octubre en Chile continental rige UTC-3 (hora de verano desde septiembre).
const chile = (iso) => new Date(`${iso}-03:00`);

describe('estadoClinica', () => {
  it('abre de lunes a viernes entre las 9:00 y las 18:00', () => {
    expect(estadoClinica(chile('2026-10-27T10:30:00')).abierto).toBe(true); // martes
    expect(estadoClinica(chile('2026-10-27T09:00:00')).abierto).toBe(true);
    expect(estadoClinica(chile('2026-10-27T17:59:00')).abierto).toBe(true);
  });

  it('cierra a las 18:00 y abre al día siguiente', () => {
    const e = estadoClinica(chile('2026-10-27T18:00:00'));
    expect(e.abierto).toBe(false);
    expect(e.texto).toContain('mañana');
  });

  it('antes de las 9:00 dice que abre hoy', () => {
    const e = estadoClinica(chile('2026-10-27T08:15:00'));
    expect(e.abierto).toBe(false);
    expect(e.texto).toContain('hoy');
  });

  it('viernes en la tarde, sábado y domingo apuntan al lunes', () => {
    for (const iso of ['2026-10-30T19:00:00', '2026-10-31T11:00:00', '2026-11-01T11:00:00']) {
      const e = estadoClinica(chile(iso));
      expect(e.abierto).toBe(false);
      expect(e.texto).toContain('lunes');
    }
  });
});

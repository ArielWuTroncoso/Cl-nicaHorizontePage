import { describe, expect, it } from 'vitest';
import { AREAS, TRATAMIENTOS, delArea, porSlug } from './tratamientos';
import { CLINICA, FRANJAS, PREGUNTAS, RAYOS_X, enlaceWhatsApp } from './clinica';

describe('tratamientos', () => {
  it('son los siete del afiche, con slugs únicos', () => {
    expect(TRATAMIENTOS).toHaveLength(7);
    expect(new Set(TRATAMIENTOS.map((t) => t.slug)).size).toBe(7);
  });

  it('cada uno tiene su contenido completo y un área válida', () => {
    for (const t of TRATAMIENTOS) {
      expect(AREAS.some((a) => a.id === t.area), t.slug).toBe(true);
      expect(t.resumen.length, t.slug).toBeGreaterThan(20);
      expect(t.paraQuien.length, t.slug).toBeGreaterThanOrEqual(3);
      expect(t.proceso.length, t.slug).toBeGreaterThanOrEqual(4);
      expect(t.faqs.length, t.slug).toBeGreaterThanOrEqual(2);
    }
  });

  it('todo tratamiento pertenece a un área y las áreas no quedan vacías', () => {
    expect(AREAS.flatMap((a) => delArea(a.id))).toHaveLength(TRATAMIENTOS.length);
    AREAS.forEach((a) => expect(delArea(a.id).length).toBeGreaterThan(0));
  });

  it('cada tratamiento explica para qué sirven los rayos X en su caso', () => {
    TRATAMIENTOS.forEach((t) => expect(t.rayosX?.length, t.slug).toBeGreaterThan(30));
  });

  it('porSlug devuelve el tratamiento o undefined', () => {
    expect(porSlug('implantes')?.nombre).toBe('Implantes dentales');
    expect(porSlug('no-existe')).toBeUndefined();
  });
});

describe('datos de la clínica', () => {
  it('el enlace de WhatsApp usa el número sin "+" y codifica el mensaje', () => {
    const url = enlaceWhatsApp('Hola, ¿hay hora?');
    expect(url.startsWith('https://wa.me/56930078427?text=')).toBe(true);
    expect(url).toContain(encodeURIComponent('Hola, ¿hay hora?'));
  });

  it('las franjas coinciden con las que valida el backend', () => {
    expect(FRANJAS.map((f) => f.id)).toEqual(['manana', 'tarde']);
  });

  it('los rayos X dentro de la clínica figuran en los datos y en las preguntas frecuentes', () => {
    expect(RAYOS_X.puntos.length).toBeGreaterThanOrEqual(3);
    expect(PREGUNTAS.some((p) => /rayos x/i.test(p.q))).toBe(true);
  });

  it('el teléfono visible corresponde al de marcado', () => {
    expect(CLINICA.telefono.label.replace(/\D/g, '')).toBe(CLINICA.telefono.tel.replace(/\D/g, ''));
  });
});

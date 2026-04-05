import { defineConfig, presetUno } from 'unocss';

export default defineConfig({
  presets: [
    presetUno(),
  ],

  // Tema — referencia a CSS custom properties de tokens.css
  // Los colores no se definen aquí, van en tokens.css como custom properties
  theme: {
    fontFamily: {
      display: "'Stack Sans Notch', sans-serif",
      body:    "'Geist Mono', monospace",
      mono:    "'Geist Mono', monospace",
    },
    breakpoints: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
  },

  // Shortcuts para patrones repetidos
  shortcuts: {
    // Layout
    'container-site':
      'max-w-[1280px] mx-auto px-[clamp(1rem,4vw,2rem)]',
    'section-padding':
      'py-[var(--space-24)]',
    'section-padding-sm':
      'py-[var(--space-16)]',

    // Botones
    'btn-primary':
      'inline-flex items-center gap-2 px-6 py-3 bg-[var(--z-lime-400)] text-[var(--z-black)] font-semibold rounded-full cursor-pointer transition-colors duration-200 hover:bg-[var(--z-lime-500)] active:bg-[var(--z-lime-600)]',
    'btn-ghost':
      'inline-flex items-center gap-2 px-6 py-3 border border-[var(--z-midnight-800)] text-[var(--z-white)] rounded-full cursor-pointer transition-colors duration-200 hover:border-[var(--z-lime-400)] hover:text-[var(--z-lime-400)]',
    'btn-link':
      'inline-flex items-center gap-1 text-[var(--z-lime-400)] hover:text-[var(--z-lime-500)] transition-colors duration-200',

    // Tipografía
    'text-hero-style':
      'font-[var(--font-display)] font-bold text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05]',
    'text-h1-style':
      'font-[var(--font-display)] font-bold text-[clamp(2rem,3.5vw,3rem)] leading-[1.1]',
    'text-h2-style':
      'font-[var(--font-display)] font-semibold text-[clamp(1.5rem,2.5vw,2rem)] leading-[1.2]',
    'text-h3-style':
      'font-[var(--font-display)] font-semibold text-[clamp(1.25rem,2vw,1.5rem)] leading-[1.3]',
    'text-body-style':
      'font-[var(--font-body)] font-normal text-base leading-[1.6]',
    'text-small-style':
      'font-[var(--font-body)] font-normal text-[0.875rem] leading-[1.5]',
    'text-caption-style':
      'font-[var(--font-body)] font-medium text-[0.75rem] leading-[1.4]',

    // Label monospace (numbered sections, metadata)
    'label-mono':
      'font-mono text-[var(--z-lime-400)] text-[0.75rem] font-medium tracking-widest uppercase',

    // Cards
    'card-dark':
      'bg-[var(--z-midnight-900)] border border-[var(--z-midnight-800)] rounded-[var(--border-radius-lg)] overflow-hidden',
    'card-light':
      'bg-[var(--z-slate-100)] rounded-[var(--border-radius-lg)] overflow-hidden',

    // Badge / pill
    'badge':
      'inline-flex items-center px-3 py-1 bg-[var(--z-midnight-800)] text-[var(--z-slate-300)] text-[0.75rem] font-medium rounded-full',
    'badge-lime':
      'inline-flex items-center px-3 py-1 bg-[var(--z-lime-400)] text-[var(--z-black)] text-[0.75rem] font-semibold rounded-full',

    // Divisor
    'divider':
      'w-full h-px bg-[var(--z-midnight-800)]',

    // Focus ring accesible
    'focus-ring':
      'outline-none focus-visible:ring-2 focus-visible:ring-[var(--z-lime-400)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--z-midnight-950)]',
  },

  // Safelist para clases generadas dinámicamente
  safelist: [],
});

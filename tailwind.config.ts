import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary - Earth Tones
        terracotta: {
          light: '#D89080',
          DEFAULT: '#C86F4D',
          dark: '#A35A3D',
        },
        sand: {
          light: '#F2E5D9',
          DEFAULT: '#E8D5C4',
          dark: '#D4C0AE',
        },
        ochre: {
          light: '#DBA564',
          DEFAULT: '#CC8B3F',
          dark: '#B37730',
        },
        // Secondary - Savannah
        'deep-green': {
          light: '#3D5F4F',
          DEFAULT: '#2D4A3E',
          dark: '#1F3429',
        },
        sage: {
          light: '#9DB3A8',
          DEFAULT: '#7D9B8F',
          dark: '#6A8477',
        },
        grass: {
          light: '#BCC9B3',
          DEFAULT: '#A8B89D',
          dark: '#92A286',
        },
        // Accent - Sunset
        gold: {
          light: '#E0C563',
          DEFAULT: '#D4AF37',
          dark: '#B89520',
        },
        amber: {
          light: '#EDB976',
          DEFAULT: '#E6A04E',
          dark: '#D18A36',
        },
        // Neutrals
        cream: {
          light: '#FBF4E8',
          DEFAULT: '#f3e9d7',
          dark: '#E8DCC9',
        },
        'warm-gray': {
          light: '#A8A39E',
          DEFAULT: '#8B8680',
          dark: '#6E6965',
        },
        charcoal: {
          light: '#5A5754',
          DEFAULT: '#3A3633',
          dark: '#252321',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        accent: ['var(--font-accent)', 'cursive'],
      },
      fontSize: {
        'xs': '0.75rem',      // 12px
        'sm': '0.875rem',     // 14px
        'base': '1rem',       // 16px
        'md': '1.125rem',     // 18px
        'lg': '1.25rem',      // 20px
        'xl': '1.5rem',       // 24px
        '2xl': '1.875rem',    // 30px
        '3xl': '2.25rem',     // 36px
        '4xl': '3rem',        // 48px
        '5xl': '3.75rem',     // 60px
        '6xl': '4.5rem',      // 72px
      },
      spacing: {
        '18': '4.5rem',       // 72px
        '88': '22rem',        // 352px
        '128': '32rem',       // 512px
      },
      maxWidth: {
        '8xl': '88rem',       // 1408px
        '9xl': '96rem',       // 1536px
      },
      borderRadius: {
        '4xl': '2rem',        // 32px
      },
      boxShadow: {
        'card': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        'gold': '0 10px 15px -3px rgba(212, 175, 55, 0.2)',
        'terracotta': '0 10px 15px -3px rgba(200, 111, 77, 0.2)',
      },
      animation: {
        'ken-burns': 'kenBurns 20s ease-in-out infinite alternate',
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        kenBurns: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.1)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [],
};

export default config;

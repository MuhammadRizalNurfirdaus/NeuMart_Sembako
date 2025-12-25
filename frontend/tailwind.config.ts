import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          blue: '#1E88E5',
          green: '#66BB6A',
        },
        accent: {
          brown: '#A67C52',
        }
      },
    },
  },
  plugins: [],
}
export default config

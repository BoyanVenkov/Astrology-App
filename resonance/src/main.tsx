import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Starfield } from './components/Starfield.tsx'
import { installScrollCalm } from './lib/scrollCalm.ts'

installScrollCalm()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Starfield />
    <App />
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { TonConnectUIProvider } from '@tonconnect/ui-react'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TonConnectUIProvider manifestUrl="http://192.168.40.109:7009/tonconnect-manifest.json">
      <App />
    </TonConnectUIProvider>
  </StrictMode>,
)

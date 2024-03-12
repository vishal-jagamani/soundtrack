import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './contexts/store/store.tsx'
import { AuthProvider } from './utils/hof/AuthContext.tsx'
import { SpeedInsights } from '@vercel/speed-insights/next'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <App />
        <SpeedInsights />
      </Provider>
    </AuthProvider>
  </React.StrictMode>,
)

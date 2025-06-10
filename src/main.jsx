import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthProvider from './provider/AuthProvider.jsx'
import { RouterProvider } from 'react-router'
import router from './routes/router.jsx'
import ThemeProvider from './provider/ThemeProvider.jsx'
import { HelmetProvider } from 'react-helmet-async'


createRoot(document.getElementById('root')).render(

  <HelmetProvider>
    <AuthProvider>
      <ThemeProvider>
        <RouterProvider router={router}></RouterProvider>
      </ThemeProvider>
    </AuthProvider>

  </HelmetProvider>


)

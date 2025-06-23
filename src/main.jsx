import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './app.css'

import App from './App.jsx'
import { RouterProvider } from 'react-router'
import { router } from './router/router.jsx'
import 'aos/dist/aos.css';
import Aos from 'aos'
import ContextProvidor from './Context/ContextProvidor.jsx'
import "leaflet/dist/leaflet.css";

Aos.init()



createRoot(document.getElementById('root')).render(

  <StrictMode>
    <ContextProvidor>
      <div className='font-urbanist'>
        <RouterProvider router={router}></RouterProvider>
      </div>
    </ContextProvidor>
  </StrictMode>,
)

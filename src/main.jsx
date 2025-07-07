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
import { QueryClient, QueryClientProvider, } from '@tanstack/react-query'

Aos.init()

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <QueryClientProvider client={queryClient} >
      <ContextProvidor>
        <div className='font-urbanist'>
          <RouterProvider router={router}></RouterProvider>
        </div>
      </ContextProvidor>
    </QueryClientProvider>
  </StrictMode>,
)

// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

// Import routing
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { route } from './routes/route.tsx'

const router = createBrowserRouter(route)

createRoot(document.getElementById('root')!).render(
  //<StrictMode>
    <RouterProvider router={router} />
  //</StrictMode>,
)

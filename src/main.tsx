// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

// Import routing
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { route } from './routes/route.tsx'

// Import React Query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


const router = createBrowserRouter(route)
const queryClient = new QueryClient()



createRoot(document.getElementById('root')!).render(
  //<StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  //</StrictMode>,
)

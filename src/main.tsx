import React from 'react'

import { AppProvider } from 'context/app'
import 'index.css'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import IndexRoute from 'routes'
import Root from 'routes/__root'
import About from 'routes/about'
import AlarmEdit from 'routes/alarm/[id]'
import Page404 from 'routes/page404'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Page404 />,
    children: [
      {
        path: '',
        element: <IndexRoute />,
      },
      {
        path: 'alarm/:id',
        element: <AlarmEdit />,
      },
      {
        path: 'about',
        element: <About />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </React.StrictMode>
)

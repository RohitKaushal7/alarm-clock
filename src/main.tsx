import React from 'react'

import 'index.css'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import IndexRoute from 'routes'
import Root from 'routes/__root'
import About from 'routes/about'
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
        path: 'about',
        element: <About />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

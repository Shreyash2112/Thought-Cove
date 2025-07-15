import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ProtectedLayout } from './components/index.js'

import { AddPost, AllPosts, EditPost, Home, Login, Post, Signup } from "./pages"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/login",
        element: (
          <ProtectedLayout authentication={false}>
            <Login />
          </ProtectedLayout>
        )
      },
      {
        path: "/signup",
        element: (
          <ProtectedLayout authentication={false}>
            <Signup />
          </ProtectedLayout>
        )
      },
      {
        path: "/all-posts",
        element: (
          <ProtectedLayout authentication={true}>
            <AllPosts />
          </ProtectedLayout>
        )
      },
      {
        path: "/add-post",
        element: (
          <ProtectedLayout authentication={true}>
            <AddPost />
          </ProtectedLayout>
        )
      },
      {
        path: "/edit-post/:slug",
        element: (
          <ProtectedLayout authentication={true}>
            <EditPost />
          </ProtectedLayout>
        )
      },
      {
        path: "/post/:slug",
        element: <post />
      }
    ]
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)

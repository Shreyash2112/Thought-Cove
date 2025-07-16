import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ProtectedLayout } from './components/index.js'

import Home from "./pages/Home.jsx"
import Login from "./pages/Login.jsx"
import Signup from "./pages/Signup.jsx"
import AllPosts from './pages/AllPosts.jsx'
import AddPost from "./pages/AddPost.jsx"
import EditPost from "./pages/EditPost.jsx"
import Post from "./pages/Post.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: < Home />
      },
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
        element: <Post />
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

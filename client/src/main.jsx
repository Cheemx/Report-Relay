import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.jsx'
import Home from './components/Home.jsx'
import Signup from './components/Signup.jsx'
import Login from './components/Login.jsx'
import CreatePerformance from './components/CreatePerformance.jsx'
import Protected from "./components/Protected.jsx"
import store from './store/store.js'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:[
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/register",
        element: (
          <Protected authentication = {false}>
            <Signup />
          </Protected>
        )
      },
      {
        path: "/login",
        element: (
          <Protected authentication = {false}>
            <Login />
          </Protected>
        )
      },
      {
        path: "/create-form",
        element: (
          <Protected authentication = {true}>
            <CreatePerformance />
          </Protected>
        )
      }
      // Add children here
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)

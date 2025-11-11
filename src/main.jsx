import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from './Layout/RootLayout';
import Home from './Componants/Home';
import AuthProvider from './context/AuthProvider';
import Register from './Componants/Register';
import Login from './Componants/Login';
import ReviewDetails from './Componants/ReviewDetails';
import AllReviews from './Componants/AllReviews';


const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children:
    [
      {
        index: true,
        Component: Home
      },
      {
        path: "register",
        Component: Register
      },
      {
        path: "login",
        Component: Login
      },
      {
        path: "reviews/:id",  
        Component: ReviewDetails
      },
      {
        path: "reviews",
        Component: AllReviews
      }
    ]
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)

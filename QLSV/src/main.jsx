import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Homepage from './page/Homepage.jsx';
import Login from './page/Login.jsx';
import Register from './page/Register.jsx';

const router = createBrowserRouter([
  {
    path:"/login",
    element :<Login/>,
  },
  {
    path:"/register",
    element :<Register/>,
  },
  
  {
    path: "/",
    element:(
        <App /> 
    ),
    children:[
      {
        path: "/",
        element:<Homepage/>
      },
      
    ]
  }
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
        <RouterProvider router={router} />
  </StrictMode>,
)
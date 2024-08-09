import React, { useState, useEffect } from 'react';
import Layout from './pages/Layout.jsx';
import './index.css';
import { RouterProvider, createBrowserRouter, Route, createRoutesFromElements } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import Turfs from './pages/Turfs.jsx';
import BookingLayout from './pages/BookingLayout.jsx';

import axios from 'axios';


export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authenticatedResponse, setAuthenticatedResponse] = useState({});

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  const checkAuthenticated = async () => {
    try {
      try {
        const userAuthRes = await axios.get(`http://localhost:8000/api/v1/users/get-current-user`, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (userAuthRes.data.success) {
            setIsAuthenticated(true);
            // console.log("App  ", userAuthRes.data.data);
            setAuthenticatedResponse(userAuthRes.data.data);
            return;
          }
      } catch (error) {
        
      }
      
      try {
        const ownerAuthRes = await axios.get(`http://localhost:8000/api/v1/owners/get-current-owner`, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
  
        if (ownerAuthRes.data.success) {
          setIsAuthenticated(true);
          // console.log("App  ", userAuthRes.data.data);
          setAuthenticatedResponse(ownerAuthRes.data.data);
          return;
        }
      } catch (error) {
        
      }
      
    //   console.log("App  + ", authenticatedResponse);
      setIsAuthenticated(false);
      return;
    } catch (error) {
      console.log("Could not fetch data : ", error.message);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, [isAuthenticated]);

  const router = createBrowserRouter(
    createRoutesFromElements(<>
      <Route path="/" element={<Layout authenticatedResponse={authenticatedResponse} setAuth={setAuth} isAuthenticated={isAuthenticated} />}>
        <Route path="/" element={<Home />} />
        <Route exact path="/login" element={<Login setAuth={setAuth} />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route path = "/turfs" element = {<Turfs />} />
        <Route path = "/booking/:id" element = {<BookingLayout/>}>

        </Route>

      </Route>
      </>
    )
  );

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

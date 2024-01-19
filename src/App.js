import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Component/Header/Header";
import Footer from "./Component/Footer/Footer";
import Signin from "./Component/Pages/SignIn/Signin";
import Signup from "./Component/Pages/SignUp/Signup";
import Movie from './Component/Pages/Movie/Movie';
import ProtectedRoutes from './Component/ProtectedRoutes';
import { MovieDetails } from './Component/Pages/MovieDetails/MovieDetails';


function App() {

  const handleLogout = () => {
    // Perform your logout logic and set isLoggedIn to false on logout
    // setIsLoggedIn(false);
  };

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route element={<ProtectedRoutes/> }>
            <Route path="/" element={ <Movie />} />
            <Route path="/movieDetail/:id" element={ <MovieDetails />} />
          </Route>
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/sign-up" element={<Signup />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;

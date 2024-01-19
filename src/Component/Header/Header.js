import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.scss";
import logo from "../../assets/images/logo.png";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useNavigate } from "react-router-dom";


function Header() {
  const [isOpen, setIsopen] = useState(false);

  const navigate = useNavigate();

  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleSidebar = () => {
    setIsopen(!isOpen);
  };

  const closeSidebar = () => {
    setIsopen(false);
  };




  const handleLogout = () => {
    // Perform your logout logic and set isLoggedIn to false on logout
    // setIsLoggedIn(false);
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    closeSidebar()
    navigate('/sign-in')

  };


  return (
    <>
      <div className="nav-header-layout">
        <nav className="navbar navbar-expand-lg navbar-light bg-white ">
          <div className="container fhunger-parent-nav mt-3 px-lg-0 py-2">
            <div className="fhunger-nav">
              <div className="form-inline ml-auto">
                <div className="fhun-hamburger" onClick={toggleSidebar}>
                  {isOpen ? (
                    <FontAwesomeIcon icon={faTimes} />
                  ) : (
                    <FontAwesomeIcon icon={faBars} />
                  )}
                </div>
              </div>
              <a
                href="/"
                className={`fhunger-logo ms-4 ${!(scrollPosition <= 0 || isOpen) && "minLogo"
                  } `}
              >
                <img src={logo} alt="logo" />
              </a>
            </div>
            <div className="welcome" >Welcome,
              {localStorage.getItem('token') ? (
                <React.Fragment> {localStorage.getItem('email')} | <span className="sd-link" onClick={handleLogout}>
                  Sign out
                </span></React.Fragment>) : (
                <React.Fragment> user! | <NavLink className="sd-link" to="/sign-in" onClick={closeSidebar}>
                  Sign In
                </NavLink></React.Fragment>)} </div>
          </div>
        </nav>
        <div className={`sidebar ${isOpen === true ? "active" : ""}`}>

          <div className="sd-body">
            {localStorage.getItem('token') ? (
              <React.Fragment>
                {/* Content to display when there is a token */}
                <p>Welcome, {localStorage.getItem('email')}</p>
                <ul>
                  <li>
                    <NavLink className="sd-link" to="/" onClick={closeSidebar}>
                      Movie List
                    </NavLink>
                  </li>
                  <li>
                    <span className="sd-link" onClick={handleLogout}>
                      Sign out
                    </span>
                  </li>
                </ul>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {/* Content to display when there is no token */}
                <p>Please sign in to access the content.</p>
                <ul>
                  <li>
                    <NavLink className="sd-link" to="/sign-in" onClick={closeSidebar}>
                      Sign In
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="sd-link" to="/sign-up" onClick={closeSidebar}>
                      Sign Up
                    </NavLink>
                  </li>
                </ul>
              </React.Fragment>
            )}
          </div>

        </div>
        <div
          className={`sidebar-overlay ${isOpen === true ? "active" : ""}`}
          onClick={toggleSidebar}
        ></div>

      </div>
    </>
  );
}

export default Header;

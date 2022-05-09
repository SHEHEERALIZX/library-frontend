import React from "react";
// import "./Navbar.css"
import { Routes, Route, Link} from "react-router-dom";
// import Loadinganimation from "./Loadinganimation";
import AddUser from "./pages/AddUser";
import AllocationEngine from "./pages/AllocationEngine";
import Capacity from "./pages/Capacity";
import AddBooktoLibrary from "./pages/AddBooktoLibrary";
import Dashboard from "./pages/Dashboard";
import Payments from "./pages/Payments";
import Runsheets from "./pages/Runsheets";
import BookShelf from "./pages/BookShelf";
import LoginPage from "./pages/LoginPage";

function Navbar() {





  return (
    <div>




      <nav className="navbar navbar-light navbar-expand-md  ">
        <div className="container-fluid">
          <Link className="navbar-brand" to='/'>
            GPTC Library
          </Link>
          <button
            className="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#navcol-1"
          >
            <span className="visually-hidden">Toggle navigation</span>
            <span className="navbar-toggler-icon"></span>
          </button>

          <div id="navcol-1" className="collapse navbar-collapse text-start">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link" >
                  Dashboard
                </Link>

              </li>

              <li className="nav-item">
                <Link to="/bookshelf" className="nav-link" >
                  Books Shelf
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/allocation" className="nav-link" >
                  Allocation
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/runsheets" className="nav-link">
                  Runsheets
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/addbook" className="nav-link">
                  CreateBook
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/capacity" className="nav-link">
                  Capacity
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <button className=" btn nav-link" onClick={()=>{
                  localStorage.clear()
                  console.log(localStorage.getItem('token'))

                  }}>
                  Logout
                </button>
              </li>
              <li className="nav-item"></li>
              <li className="nav-item"></li>
              <li className="nav-item"></li>
              <li className="nav-item"></li>
            </ul>
          </div>
         
        </div>
        
      </nav>


<Routes>

<Route path="/" element={<Dashboard/>} />
<Route path="/allocation" element={<AllocationEngine/>} />
<Route path="/runsheets" element={<Runsheets/>} />
<Route path="/payments" element={<Payments/>} />
<Route path="/capacity" element={<Capacity/>} />
<Route path="/add-user" element={<AddUser/>} />
{/* <Route path="/loading" element={<Loadinganimation/>} /> */}
<Route path="/addbook" element={<AddBooktoLibrary/>} />
<Route path="/bookshelf" element={<BookShelf/>} />
<Route path="/login" element={<LoginPage/>} />





</Routes>



 
    </div>

  );
}

export default Navbar;

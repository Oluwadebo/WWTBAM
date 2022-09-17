import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import download from "./assets/download.jfif";

const Dashboard = () => {
  const [allUser, setallUser] = useState([]);
  const [currentuser, setcurrentuser] = useState("");
  const [currentuserdetails, setcurrentuserdetails] = useState({});
  const [customer, setcustomer] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.wwtbam && localStorage.signinEmail && localStorage.users) {
      let AllUser = JSON.parse(localStorage.wwtbam);
      setallUser(JSON.parse(localStorage.wwtbam));
      setcurrentuser(JSON.parse(localStorage.signinEmail));
      setcurrentuserdetails(JSON.parse(localStorage.users));
      let email = JSON.parse(localStorage.users).email;
      let index = JSON.parse(localStorage.wwtbam).findIndex(
        (x) => x.email === email
      );
      setcustomer(AllUser[index]);
    } else {
      navigate("/Signin");
    }
  }, []);
  const logout = () => {
    localStorage.removeItem("signinEmail");
    navigate("/Signin");
  };
  const toggleMenu = () => {
    let navigation = document.querySelector(".navigation");
    let container = document.querySelector(".container");
    let toggle = document.querySelector(".toggle");
    container.classList.toggle("active");
    navigation.classList.toggle("active");
    toggle.classList.toggle("active");
  };
  return (
    <>
      <div className="navigation">
        <ul>
          <li>
            <Link to="/Dashboard" className="a">
              <span className="icon">
                <i className="fa fa-home" aria-hidden="true"></i>
              </span>
              <span className="title">Home</span>
            </Link>
          </li>
          <li>
            <Link to="/Takequiz" className="a">
              <span className="icon">
                <i className="fa fa-comment" aria-hidden="true"></i>
              </span>
              <span className="title">TAKE QUIZ</span>
            </Link>
          </li>
          <li>
            <Link to="/Admin" className="a">
              <span className="icon">
                <i className="fa fa-comment" aria-hidden="true"></i>
              </span>
              <span className="title">Set-Questions</span>
            </Link>
          </li>
          <li>
            <button
              className="btn form-control text-light a"
              style={{ border: "none" }}
              onClick={logout}
            >
              <span className="icon">
                <i className="fa fa-sign-out" aria-hidden="true"></i>
              </span>
              <span className="title">Log-Out</span>
            </button>
          </li>
        </ul>
      </div>
      <div className="toggle" onClick={toggleMenu}></div>
      <div className="container text-light pt-5">
        <center>
          <div className="row mx-auto">
            <div className="col-6 mx-auto mt-4 mb-3 asd">
              <h2>
                <span>FullName: </span>
                {customer.firstname} {customer.Lastname}
              </h2>
              <h2 className="py-1">
                <span>Account: </span>$ {customer.account}
              </h2>
            </div>
            <div className="col-12">
              <img src={download} alt="" className="img-fluid" />
            </div>
          </div>
        </center>
      </div>
    </>
  );
};

export default Dashboard;

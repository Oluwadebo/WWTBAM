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
    let toggle = document.querySelector(".toggle");
    navigation.classList.toggle("active");
    toggle.classList.toggle("active");
  };
  return (
    <>
      <div>
        <div class="navigation">
          <ul>
            <li>
              <Link to="/Dashboard">
                <button
                  className="btn form-control text-light"
                  style={{ border: "none" }}
                >
                  <a>
                    <span class="icon">
                      <i class="fa fa-home" aria-hidden="true"></i>
                    </span>
                    <span class="title">Home</span>
                  </a>
                </button>
              </Link>
            </li>
            <li>
              <Link to="/Takequiz">
                <button
                  className="btn form-control text-light"
                  style={{ border: "none" }}
                >
                  <a>
                    <span class="icon">
                      <i class="fa fa-comment" aria-hidden="true"></i>
                    </span>
                    <span class="title">TAKE QUIZ</span>
                  </a>
                </button>
              </Link>
            </li>
            <li>
              <Link to="/Admin">
                <button
                  className="btn form-control text-light"
                  style={{ border: "none" }}
                >
                  <a>
                    <span class="icon">
                      <i class="fa fa-comment" aria-hidden="true"></i>
                    </span>
                    <span class="title">Set-Questions</span>
                  </a>
                </button>
              </Link>
            </li>
            <li>
              <button
                className="btn form-control text-light"
                onClick={logout}
                style={{ border: "none" }}
              >
                <a>
                  <span class="icon">
                    <i class="fa fa-sign-out" aria-hidden="true"></i>
                  </span>
                  <span class="title">Log-Out</span>
                </a>
              </button>
            </li>
          </ul>
        </div>
        <div class="toggle" onClick={toggleMenu}></div>
        <div className="container text-light pt-5">
          <center>
            <div className="row mx-auto">
              <div className="col-12 mt-4 mb-3">
                <h2 className="py-1">${customer.score}</h2>
              </div>
              <div className="col-12">
                <img src={download} alt="" className="img-fluid" />
              </div>
            </div>
          </center>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

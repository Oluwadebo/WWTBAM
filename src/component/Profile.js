import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import download from "./assets/download.jfif";

const Das = () => {
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
  return (
    <>
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 nbars">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
              <h2 className="d-none d-sm-inline mx-0 mx-md-2 my-4">
                <span className="d-flex">
                  <i className="fa fa-graduation-cap pe-2"></i>
                  <span>WWTBAM</span>
                </span>
              </h2>
              <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start">
                <li>
                  <Link
                    to="/Dashboard"
                    className="nav-link px-0 align-middle link my-2"
                  >
                    <i className="fa fa-dashboard pe-2"></i>
                    <span className="ms-1 d-none d-sm-inline">Dashboard</span>
                  </Link>
                </li>
                <li>
                  <Link to="" className="nav-link px-0 align-middle link my-2">
                    <i className="fa fa-user pe-3"></i>
                    <span className="ms-1 d-none d-sm-inline">My Profile</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Takequiz"
                    className="nav-link px-0 align-middle link my-2"
                  >
                    <i className="fa fa-minus-circle pe-3"></i>
                    <span className="ms-1 d-none d-sm-inline">Take Quiz</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Admin"
                    className="nav-link px-0 align-middle link my-2 "
                  >
                    <i className="fa fa-plus-circle pe-3"></i>
                    <span className="ms-1 d-none d-sm-inline">
                      Add Questions
                    </span>
                  </Link>
                </li>
                <li>
                  <span
                    className="nav-link px-0 align-middle link my-2"
                    style={{ border: "none" }}
                    onClick={logout}
                  >
                    <i className="fa fa-sign-out pe-3"></i>
                    <span className="ms-1 d-none d-sm-inline">Log-Out</span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="col py-3 text-white">
            <div className="container my-4">
              <div className="row">
                <div className="col-12 col-md-6">
                  <h5>
                    <span>
                      Welcome <span className="naem">{customer.Lastname}</span>
                    </span>
                  </h5>
                </div>
                <div className="col-12 col-md-6 text-end d-none d-md-block">
                  <span className="text-light">
                    <i className="fa fs-5 fa-address-card mx-4"></i>
                  </span>
                  <span className="text-light">
                    <i className="fa fs-5 fa-bell-o mx-4"></i>
                  </span>
                  <span className="text-light">
                    <a href="http:// wb.me/09044796430" target="_blank">
                      <i className="fa fs-5 fa-envelope mx-4 text-light"></i>
                    </a>
                  </span>
                  <span className="text-light">
                    <i className="fa fs-5 fa-cog mx-4"></i>
                  </span>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row d-flex justify-content-between">
                <div className="col-md-12 animate__animated animate__bounce animate__delay-2s text-center px-5 text-white rounded">
                  <div className="row mx-auto">
                    <div className="col-12 col-md-8 mx-auto mb-3 asd">
                      <h4 className="py-2">
                        <span>Fullname: </span>
                        <span className="gapsa">
                          {customer.firstname} {customer.Lastname}
                        </span>
                      </h4>
                      <h4 className="py-2 d-none d-md-block">
                        <span>Email: </span>
                        <span>{customer.email}</span>
                      </h4>
                      <h4 className="py-2">
                        <span>Gender: </span>
                        <span className="gapsa">{customer.gender}</span>
                      </h4>
                      <h4 className="py-2">
                        <span>Account: </span>
                        <span className="gapsa">$ {customer.account}</span>
                      </h4>
                      <h4 className="py-2">
                        <span>Score: </span>
                        <span className="gapsa">{customer.score}</span>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Das;

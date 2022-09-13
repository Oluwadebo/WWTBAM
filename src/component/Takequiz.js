import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Takequiz = () => {
  const [allUser, setallUser] = useState([]);
  const [currentuser, setcurrentuser] = useState("");
  const [currentuserdetails, setcurrentuserdetails] = useState({});
  const [customer, setcustomer] = useState({});
  const [admin, setadmin] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.wwtbam && localStorage.signinEmail && localStorage.users) {
      let AllUser = JSON.parse(localStorage.wwtbam);
      setallUser(JSON.parse(localStorage.wwtbam));
      setcurrentuser(JSON.parse(localStorage.signinEmail));
      setcurrentuserdetails(JSON.parse(localStorage.users));
      let email = JSON.parse(localStorage.users).email;
      let index = JSON.parse(localStorage.wwtbam).findIndex(
        (x) => x.email == email
      );
      setcustomer(AllUser[index]);
    } else {
      navigate("/Signin");
    }
    if (localStorage.admin) {
      let detail = JSON.parse(localStorage.admin);
      setadmin(JSON.parse(localStorage.admin));
    } else {
      setadmin([]);
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
          <div className="container text-light">
            <div className="row my-2">
              <div className="col-12">
                <center>
                  <h2>Quiz Questions</h2>
                </center>
                <div className="row">
                  <div className="col-12"></div>
                </div>
                {/* {admin.map((quest, ind) => (
              <div key={ind}>
                <h3>
                  {ind + 1}. {quest.question}?
                </h3>
                <form action="">
                  <button className="btn text-light" style={{ border: "none",cursor: "default" }}>
                    <input type="radio" name="option" className="mx-2" />
                    {quest.option1}
                  </button>
                  <button
                    className="btn text-light"
                    style={{ border: "none", cursor: "default" }}
                  >
                    <input type="radio" name="option" className="mx-2" />
                    {quest.option2}
                  </button>
                  <button className="btn text-light" style={{ border: "none",cursor: "default" }}>
                    <input type="radio" name="option" className="mx-2" />
                    {quest.option3}
                  </button>
                </form>
              </div>
            ))} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Takequiz;

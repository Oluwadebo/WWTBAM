import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Takequiz = () => {
  const [allUser, setallUser] = useState([]);
  const [currentuser, setcurrentuser] = useState("");
  const [currentuserdetails, setcurrentuserdetails] = useState({});
  const [customer, setcustomer] = useState({});
  const [question, setquestion] = useState([]);
  const [disquestion, setdisquestion] = useState([]);
  const [Answer, setAnswer] = useState("");
  const [Correct, setCorrect] = useState("");
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

    let allQuestion = JSON.parse(localStorage.admin);
    let ab = Math.floor(Math.random() * allQuestion.length);
    setquestion(allQuestion);
    setdisquestion(() => allQuestion[ab]);

    let correctAnswer = allQuestion[ab].answer;
    setAnswer(correctAnswer);
  }, []);
  const nextQuestion = () => {
    let a = Math.floor(Math.random() * question.length);
    setdisquestion(() => question[a]);
    let correctAnswer = question[a].answer;
    setAnswer(correctAnswer);
  };

  const option = (e) => {
    console.log(e);
    if (e === Answer) {
      console.log("correct");
      setCorrect("true");
    } else {
      if (e != Answer) {
        console.log("worng");
        setCorrect("false");
      }
    }
  };
  const logout = () => {
    localStorage.removeItem("signinEmail");
    navigate("/Signin");
  };
  const toggleMenu = () => {
    let navigation = document.querySelector(".navigation");
    let container = document.querySelector(".container");
    let toggle = document.querySelector(".toggle");
    navigation.classList.toggle("active");
    container.classList.toggle("active");
    toggle.classList.toggle("active");
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 nbars">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
              <h2 className="d-none d-sm-inline mx-0 mx-md-2 my-4">WWTBAM</h2>
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
                  <Link
                    to="/Profile"
                    className="nav-link px-0 align-middle link my-2"
                  >
                    <i className="fa fa-user pe-3"></i>
                    <span className="ms-1 d-none d-sm-inline">My Profile</span>
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
                  <span className="naem">{customer.Lastname}</span>
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
                    <i className="fa fs-5 fa-envelope mx-4"></i>
                  </span>
                  <span className="text-light">
                    <i className="fa fs-5 fa-cog mx-4"></i>
                  </span>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row d-flex justify-content-between">
                <div className="col-12">
                  <center>
                    <h2>Quiz Questions</h2>
                  </center>
                </div>
                <h3 className="my-4 col-12 mx-md-5 mx-0">
                  {disquestion.question} ?
                </h3>
                <div className=" col-12 col-md-12 animate__animated animate__bounce animate__delay-2s text-center px-5 text-white rounded">
                  <div className="row">
                    <div className="col-12">
                      <div className="row">
                        <div
                          className="col-12 col-md-7 mx-md-5 mx-0"
                          onClick={(e) => option(e.target.innerHTML)}
                        >
                          <h5 className="border rounded rounded-5 p-4 cort">
                            {disquestion.option1}
                          </h5>
                        </div>
                        <div
                          className="col-12 col-md-7 mx-md-5 mx-0"
                          onClick={(e) => option(e.target.innerHTML)}
                        >
                          <h5 className="border rounded rounded-5 p-4 cort">
                            {disquestion.option2}
                          </h5>
                        </div>
                        <div
                          className="col-12 col-md-7 mx-md-5 mx-0"
                          onClick={(e) => option(e.target.innerHTML)}
                        >
                          <h5 className="border rounded rounded-5 p-4 cort">
                            {disquestion.option3}
                          </h5>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 mx-md-5 mx-0">
                      <div className="row">
                        <div className="col-11" style={{ float: "right" }}>
                          <h3 className="circle" onClick={nextQuestion}>
                            Next
                          </h3>
                        </div>
                      </div>
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

export default Takequiz;

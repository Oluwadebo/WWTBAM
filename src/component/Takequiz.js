import { clear } from "@testing-library/user-event/dist/clear";
import { getActiveElement } from "@testing-library/user-event/dist/utils";
import React from "react";
import { useRef } from "react";
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
  const [indexx, setindexx] = useState();
  const id = useRef(null)
  const [Timer, setTimer] = useState(10);
  useEffect(() => {
    id.current = window.setInterval(() => {
      setTimer((time) => time - 1)
    }, 1000)
    return () => clear();
  }, [])
  useEffect(() => {
    if (Timer === 0) {
      clear()
      //  alert("the lord is good")
    }
  }, [Timer])
  const clear = () => {
    window.clearInterval(id.current)
  }
  const popupToggle = () => {
    const popup = document.getElementById('popup');
    popup.classList.toggle('active')
  }
  const mod = () => {
    <button
      type="button"
      data-bs-toggle="modal"
      data-bs-target="#Money"
      className="btn btn-info form-control text-light py-3 mt-3 asd"
    ></button>
  }
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
    setindexx(-1);
  };


  let incre = 18

  const option = (e, index) => {
    setindexx(index);
    if (e === Answer) {
      let email = currentuserdetails.email;
      let index = allUser.findIndex((x) => x.email == email);
      let { Lastname, account, firstname, gender, password, score } = allUser[index];
      account = Number(account)
      account += 1;
      console.log(account);
      score = Number(score)
      score += 1
      setallUser([{
        Lastname,
        account,
        firstname,
        gender,
        password,
        score,
        email
      }])
      localStorage.setItem("wwtbam", JSON.stringify(allUser));
      setCorrect("true");
    } else {
      if (e != Answer) {
        setCorrect("false");
      }
    }
  };
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
                  <div
                    className="modal"
                    id="Money"
                    data-bs-backdrop="static"
                  >
                    <div className="modal-dialog text-dark">
                      <div className="modal-content">
                        <div className="modal-header"></div>
                        <div className="modal-body">
                          <h2>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam quos perspiciatis accusantium veniam dignissimos, nostrum, natus architecto quaerat vero quibusdam delectus tenetur quis alias tempora nulla eaque laboriosam at? Ad.</h2>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-info"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <center>
                    <h2>Quiz Questions</h2>
                    <div><h4><span className="circ">Time left: {Timer} s</span></h4></div>
                    <a className="modals" onClick={() => popupToggle()}>finsh</a>
                    <div className="popup" id="popup">
                      <div className="content">
                        <h2>Lorem ipsum dolor sit amet</h2>
                        <span className="text-light close" onClick={() => popupToggle()}>
                          <i className="fa fs-5 fa-close mx-4"></i>
                        </span>
                      </div>
                    </div>
                  </center>
                </div>
                <h3 className="my-4 col-12 mx-md-5 mx-0 ">
                  {disquestion.question} ?
                </h3>
                <div className=" col-12 col-md-12 animate__animated animate__bounce animate__delay-2s text-center px-5 text-white rounded">
                  <div className="row">
                    <div className="col-12">
                      <div className="row">
                        <div className="col-12 col-md-7 mx-md-5 mx-0">
                          <div
                            className={
                              indexx == 0 && Correct == "true"
                                ? "border rounded rounded-5 p-4 bg-success"
                                : indexx == 0 && Correct == "false"
                                  ? "border rounded rounded-5 p-4 bg-success"
                                  : "border rounded rounded-5 p-4 cort"
                            }
                            onClick={(e) => option(e.target.innerHTML, 0)}
                          >
                            {disquestion.option1}
                          </div>
                        </div>
                        <div className="col-12 col-md-7 mx-md-5 mx-0 my-3">
                          <div
                            className={
                              indexx == 1 && Correct == "true"
                                ? "border rounded rounded-5 p-4 bg-success"
                                : indexx == 1 && Correct == "false"
                                  ? "border rounded rounded-5 p-4 bg-success"
                                  : "border rounded rounded-5 p-4 cort"
                            }
                            onClick={(e) => option(e.target.innerHTML, 1)}
                          >
                            {disquestion.option2}
                          </div>
                        </div>
                        <div className="col-12 col-md-7 mx-md-5 mx-0">
                          <div
                            className={
                              indexx == 2 && Correct == "true"
                                ? "border rounded rounded-5 p-4 bg-success"
                                : indexx == 2 && Correct == "false"
                                  ? "border rounded rounded-5 p-4 bg-success"
                                  : "border rounded rounded-5 p-4 cort"
                            }
                            onClick={(e) => option(e.target.innerHTML, 2)}
                          >
                            {disquestion.option3}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 mx-md-5 mx-0">
                      <div className="row">
                        <div className="col-11" style={{ float: "right" }} onClick={nextQuestion}>
                          <h3 className="circle" >
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

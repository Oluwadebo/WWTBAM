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
      <div>
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
        <div className="container text-light pt-5 ade">
          <div className="row my-2">
            <div className="col-12">
              <center>
                <h2>Quiz Questions</h2>
              </center>
            </div>
            <div className="col-12">
              <h3 className="my-4 mx-md-5 mx-0">{disquestion.question} ?</h3>
              <div className="row">
                <div
                  className="col-12 col-md-6 mx-md-5 mx-0"
                  onClick={(e) => option(e.target.innerHTML)}
                >
                  <h5 className="border rounded rounded-5 p-4 cort">
                    {disquestion.option1}
                  </h5>
                </div>
                <div
                  className="col-12 col-md-6 mx-md-5 mx-0"
                  onClick={(e) => option(e.target.innerHTML)}
                >
                  <h5 className="border rounded rounded-5 p-4 cort">
                    {disquestion.option2}
                  </h5>
                </div>
                <div
                  className="col-12 col-md-6 mx-md-5 mx-0"
                  onClick={(e) => option(e.target.innerHTML)}
                >
                  <h5 className="border rounded rounded-5 p-4 cort">
                    {disquestion.option3}
                  </h5>
                </div>
              </div>
            </div>
            <div className="col-12 mx-5">
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
    </>
  );
};

export default Takequiz;

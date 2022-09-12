import React from "react";
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
  return (
    <>
      <nav className="navbar navbar-expand-lg shadow asda">
        <div className="container">
          <button
            className="navbar-toggler sd"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <span className="navbar-text">
              <Link to="/Dashboard">
                <button className="btn btn-success form-control asd">
                  <b>Home</b>
                </button>
              </Link>
            </span>
          </div>
        </div>
      </nav>
      <div className="container text-light">
        <div className="row my-2">
          <div className="col-12">
            {admin.map((quest, ind) => (
              <div key={ind}>
                <h3>
                  {ind + 1}. {quest.question}?
                </h3>
                <div action="">
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
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Takequiz;

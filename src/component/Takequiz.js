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
      setadmin(detail);
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
                <h5>{quest.question}</h5>
                <form action="">
                  <input type="checkbox" name="" placeholder="{quest.option1}" id="" />
                  {quest.option1}
                  <input type="checkbox" name="" id="" />
                  {quest.option2}
                </form>
              </div>
              // <tr key={ind}>
              //   <td style={{ border: "1px solid white" }}>
              //     {quest.category}
              //   </td>
              //   <td style={{ border: "1px solid white" }}>
              //     {quest.question}
              //   </td>
              //   <td style={{ border: "1px solid white" }}>{quest.option1}</td>
              //   <td style={{ border: "1px solid white" }}>{quest.option2}</td>
              //   <td style={{ border: "1px solid white" }}>{quest.option3}</td>
              // </tr>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Takequiz;

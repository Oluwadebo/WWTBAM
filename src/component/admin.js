import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Admin = () => {
  const [allUser, setallUser] = useState([]);
  const [currentuser, setcurrentuser] = useState("");
  const [currentuserdetails, setcurrentuserdetails] = useState({});
  const [customer, setcustomer] = useState({});
  const [Error, setError] = useState("");
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

  const formik = useFormik({
    initialValues: {
      question: "",
      option1: "",
      option2: "",
      option3: "",
      answer: "",
      category: "",
    },
    onSubmit: (values) => {
      let email = currentuserdetails.email;
      let user = allUser;
      let index = user.findIndex((x) => x.email == email);
      let remain = parseInt(user[index].account) + Number(1);
      setallUser((user[index].account = remain));
      localStorage.setItem("wwtbam", JSON.stringify(allUser));
      const newobj = [...admin, values];
      setadmin(newobj);
      localStorage.setItem("admin", JSON.stringify(newobj));
    },
    onReset: (values) => { },
    validationSchema: yup.object({
      category: yup.string().required("This field is required"),
      question: yup.string().required("This field is required"),
      option1: yup.string().required("This field is required"),
      option2: yup.string().required("This field is required"),
      option3: yup.string().required("This field is required"),
      answer: yup.string().required("This field is required"),
    }),
  });
  const logout = () => {
    localStorage.removeItem("signinEmail");
    navigate("/Signin");
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 nbars">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100 fis">
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
                    to="/Takequiz"
                    className="nav-link px-0 align-middle link my-2"
                  >
                    <i className="fa fa-minus-circle pe-3"></i>
                    <span className="ms-1 d-none d-sm-inline">Take Quiz</span>
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
                  <center>
                    <h2>Set Questions</h2>
                    <p>Click the button below to set your own question</p>
                  </center>
                  <div className="row">
                    <div className="col-12 col-md-4">
                      <button
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#Money"
                        className="btn btn-info form-control text-light py-3 mt-3 asd"
                      >
                        <span>
                          <i className="fa fa-plus-circle" style={{ fontSize: "20px" }}></i> Set Questions
                        </span>
                      </button>
                      <div
                        className="modal"
                        id="Money"
                        data-bs-backdrop="static"
                      >
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <form
                              onSubmit={formik.handleSubmit}
                              action=""
                              className="mx-2"
                            >
                              <div className="modal-header text-dark">
                                <select
                                  value={formik.values.category}
                                  className={
                                    formik.errors.category &&
                                      formik.touched.category
                                      ? "form-control is-invalid"
                                      : "form-control"
                                  }
                                  onChange={formik.handleChange}
                                  name="category"
                                  onBlur={formik.handleBlur}
                                  style={{ backgroundColor: "#F5F7FA" }}
                                >
                                  <option>CATEGORY</option>
                                  <option value="ENGLISH">ENGLISH</option>
                                  <option value="BIOLOGY">BIOLOGY</option>
                                  <option value="OTHERS">OTHERS</option>
                                </select>
                                {formik.touched.category && (
                                  <div
                                    style={{ color: "red" }}
                                    className="my-2"
                                  >
                                    {formik.errors.category}
                                  </div>
                                )}
                              </div>
                              <div className="modal-body">
                                <label className="col-form-label text-dark">
                                  Questions
                                </label>
                                <input
                                  type="text"
                                  placeholder="Questions"
                                  onChange={formik.handleChange}
                                  value={formik.values.question}
                                  className={
                                    formik.errors.question &&
                                      formik.touched.question
                                      ? "form-control is-invalid"
                                      : "form-control"
                                  }
                                  name="question"
                                />
                                {formik.touched.question && (
                                  <div
                                    style={{ color: "red" }}
                                    className="my-2"
                                  >
                                    {formik.errors.question}
                                  </div>
                                )}
                                <label className="col-form-label text-dark">
                                  Options
                                </label>
                                <input
                                  type="text"
                                  placeholder="Option A"
                                  onChange={formik.handleChange}
                                  value={formik.values.option1}
                                  className={
                                    formik.errors.option1 &&
                                      formik.touched.option1
                                      ? "form-control is-invalid"
                                      : "form-control"
                                  }
                                  name="option1"
                                />
                                {formik.touched.option1 && (
                                  <div
                                    style={{ color: "red" }}
                                    className="my-2"
                                  >
                                    {formik.errors.option1}
                                  </div>
                                )}
                                <input
                                  type="text"
                                  placeholder="Option B"
                                  onChange={formik.handleChange}
                                  value={formik.values.option2}
                                  className={
                                    formik.errors.option2 &&
                                      formik.touched.option2
                                      ? "form-control is-invalid"
                                      : "form-control mt-3"
                                  }
                                  name="option2"
                                />
                                {formik.touched.option2 && (
                                  <div
                                    style={{ color: "red" }}
                                    className="my-2"
                                  >
                                    {formik.errors.option2}
                                  </div>
                                )}
                                <input
                                  type="text"
                                  placeholder="Option C"
                                  onChange={formik.handleChange}
                                  value={formik.values.option3}
                                  className={
                                    formik.errors.option3 &&
                                      formik.touched.option3
                                      ? "form-control is-invalid"
                                      : "form-control mt-3"
                                  }
                                  name="option3"
                                />
                                {formik.touched.option3 && (
                                  <div
                                    style={{ color: "red" }}
                                    className="my-2"
                                  >
                                    {formik.errors.option3}
                                  </div>
                                )}
                                <label className="col-form-label text-dark">
                                  Correct Answer
                                </label>
                                <input
                                  type="text"
                                  placeholder="Correct Answer"
                                  onChange={formik.handleChange}
                                  value={formik.values.answer}
                                  className={
                                    formik.errors.answer &&
                                      formik.touched.answer
                                      ? "form-control is-invalid"
                                      : "form-control"
                                  }
                                  name="answer"
                                />
                                {formik.touched.answer && (
                                  <div
                                    style={{ color: "red" }}
                                    className="my-2"
                                  >
                                    {formik.errors.answer}
                                  </div>
                                )}
                                <button
                                  type="submit"
                                  className="btn btn-info form-control py-2 mt-3"
                                >
                                  SAVE
                                </button>
                              </div>
                            </form>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-info"
                                data-bs-dismiss="modal"
                              >
                                Close
                              </button>
                              <button
                                type="reset"
                                onClick={formik.handleReset}
                                className="btn btn-danger"
                              >
                                RESET
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="container">
                        <div className="row mt-4">
                          <div className="col-12 table-responsive asd">
                            <center>
                              <h2>QUESTIONS AVAILABLE</h2>
                            </center>
                            {admin.map((item, index) => (
                              <div className="container">
                                <h3>
                                  {index + 1}. {item.question} ?
                                </h3>
                                <p>
                                  <span>(a) {item.option1} </span>
                                  <br />
                                  <span>(b) {item.option2} </span>
                                  <br />
                                  <span>(c) {item.option3} </span>
                                </p>
                              </div>
                            ))}
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
      </div>
    </>
  );
};

export default Admin;

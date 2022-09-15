import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [allUser, setallUser] = useState([]);
  const [Error, setError] = useState("");
  useEffect(() => {
    if (localStorage.wwtbam) {
      let detail = JSON.parse(localStorage.wwtbam);
      setallUser(detail);
    } else {
      setallUser([]);
    }
  }, []);
  let lower = new RegExp(`(?=.*[a-z])`);
  let upper = new RegExp(`(?=.*[A-Z])`);
  let number = new RegExp(`(?=.*[0-9])`);
  const formik = useFormik({
    initialValues: {
      firstname: "",
      Lastname: "",
      email: "",
      password: "",
      gender: "",
      questions: [],
      score: "0",
    },
    onSubmit: (values) => {
      let debo = JSON.parse(localStorage.getItem("wwtbam"));
      setallUser(debo);
      if (values) {
        if (allUser <= 0) {
          setallUser(allUser.push(values));
          localStorage.setItem("wwtbam", JSON.stringify(allUser));
          navigate("/Signin");
        } else {
          for (const a of allUser) {
            let User = values;
            if (a["email"] !== User.email && a["password"] !== User.password) {
              setallUser(allUser.push(values));
              localStorage.setItem("wwtbam", JSON.stringify(allUser));
              navigate("/Signin");
            } else if (a["email"] === User.email) {
              let err = "email-already-in-use";
              setError(err);
            }
          }
        }
      }
    },
    validationSchema: yup.object({
      firstname: yup
        .string()
        .required("This field is required")
        .min(4, "must be greater than three"),
      Lastname: yup
        .string()
        .required("This field is required")
        .min(3, "must be greater than two"),
      email: yup
        .string()
        .required("This field is required")
        .email("must be a valid email"),
      gender: yup.string().required("This field is required"),
      password: yup
        .string()
        .required("This field is required")
        .matches(lower, "Must include lowerCase letter")
        .matches(upper, "Must include upperCase letter")
        .matches(number, "Must include a number")
        .min(5, "must be greater than 5 charaters"),
    }),
  });
  const toggle = useRef();
  const i = useRef();
  const password = useRef();

  const showHide = () => {
    if (password.current.type === "password") {
      password.current.setAttribute("type", "text");
      toggle.current.classList.add("hide");
      i.current.classList = "fa fa-eye-slash";
    } else {
      password.current.setAttribute("type", "password");
      i.current.classList = "fa fa-eye";
      toggle.current.classList.remove("hide");
    }
  };
  return (
    <>
      <div className="container">
        <div className="row mx-auto mt-4">
          <div className="shadow col-12 col-md-8 mx-auto px-4 pb-3 asd">
            <h2 className="m-4 text-light">
              <b>
                <i>Create an account</i>
              </b>
            </h2>
            <p>
              <b className="text-danger">{Error}</b>
            </p>
            <form action="" onSubmit={formik.handleSubmit}>
              <div className="form-floating">
                <input
                  type="text"
                  placeholder="Your firstname"
                  className={
                    formik.errors.firstname && formik.touched.firstname
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  onChange={formik.handleChange}
                  style={{ backgroundColor: "#F5F7FA" }}
                  name="firstname"
                  onBlur={formik.handleBlur}
                />
                {formik.touched.firstname && (
                  <div style={{ color: "red" }} className="my-2">
                    {formik.errors.firstname}
                  </div>
                )}
                <label>&#x1F464;&nbsp; Your firstname</label>
              </div>
              <div className="form-floating my-3">
                <input
                  type="text"
                  placeholder="Your Lastname"
                  className={
                    formik.errors.Lastname && formik.touched.Lastname
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  onChange={formik.handleChange}
                  style={{ backgroundColor: "#F5F7FA" }}
                  name="Lastname"
                  onBlur={formik.handleBlur}
                />
                {formik.touched.Lastname && (
                  <div style={{ color: "red" }} className="my-2">
                    {formik.errors.Lastname}
                  </div>
                )}
                <label>&#x1F464;&nbsp; Your Lastname</label>
              </div>
              <div className="form-floating my-3">
                <input
                  type="email"
                  placeholder="Your email"
                  className={
                    formik.errors.email && formik.touched.email
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  onChange={formik.handleChange}
                  style={{ backgroundColor: "#F5F7FA" }}
                  name="email"
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && (
                  <div style={{ color: "red" }} className="my-2">
                    {formik.errors.email}
                  </div>
                )}
                <label>&#x1F4E7;&nbsp; Your email</label>
              </div>
              <div className="form-floating my-3">
                <select
                  className={
                    formik.errors.gender && formik.touched.gender
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  onChange={formik.handleChange}
                  name="gender"
                  onBlur={formik.handleBlur}
                  style={{ backgroundColor: "#F5F7FA" }}
                >
                  <option>&#x1F4B7;&nbsp; Your gender</option>
                  <option value="MALE">MALE</option>
                  <option value="FEMALE">FEMALE</option>
                </select>
                {formik.touched.gender && (
                  <div style={{ color: "red" }} className="my-2">
                    {formik.errors.gender}
                  </div>
                )}
                <label>&#x1F4B7;&nbsp; Your gender</label>
              </div>
              <div className="form-floating my-3">
                <input
                  type="password"
                  placeholder="Your password"
                  className={
                    formik.errors.password && formik.touched.password
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  ref={password}
                  maxLength={10}
                  onChange={formik.handleChange}
                  style={{ backgroundColor: "#F5F7FA" }}
                  name="password"
                  onBlur={formik.handleBlur}
                />y
                <div
                  id="toggle"
                  ref={toggle}
                  onClick={showHide}
                  className="gose pe-4"
                >
                  <i ref={i} className="fa fa-eye" aria-hidden="true"></i>
                </div>
                {formik.touched.password && (
                  <div style={{ color: "red" }} className="my-2">
                    {formik.errors.password}
                  </div>
                )}
                <label>&#x1F512;&nbsp; Your password</label>
                <button
                  type="submit"
                  className="btn btn-info form-control py-3 mt-3 asd"
                >
                  Sign-Up
                </button>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-8 text-light">
                      <p style={{ opacity: "0.6" }}>Already have an account?</p>
                    </div>
                    <div className="col-4">
                      <p>
                        <b>
                          <Link to="/Signin" className="sig">
                            Sign-In
                          </Link>
                        </b>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;

import React from "react";

const Da = () => {
  const toggleMenu = () => {
    let navigation = document.querySelector(".navigation");
    let toggle = document.querySelector(".toggle");
    navigation.classList.toggle("active");
    toggle.classList.toggle("active");
  };
  return (
    <>
      <div class="navigation">
        <ul>
          <li>
            <a href="#">
              <span class="icon">
                <i class="fa fa-home" aria-hidden="true"></i>
              </span>
              <span class="title">Home</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span class="icon">
                <i class="fa fa-user" aria-hidden="true"></i>
              </span>
              <span class="title">Profile</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span class="icon">
                <i class="fa fa-comment" aria-hidden="true"></i>
              </span>
              <span class="title">Messages</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span class="icon">
                <i class="fa fa-question-circle" aria-hidden="true"></i>
              </span>
              <span class="title">Help</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span class="icon">
                <i class="fa fa-cog" aria-hidden="true"></i>
              </span>
              <span class="title">Setting</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span class="icon">
                <i class="fa fa-lock" aria-hidden="true"></i>
              </span>
              <span class="title">Password</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span class="icon">
                <i class="fa fa-sign-out" aria-hidden="true"></i>
              </span>
              <span class="title">Sign Out</span>
            </a>
          </li>
        </ul>
      </div>
      <div class="toggle" onClick={toggleMenu}></div>
    </>
  );
};

export default Da;

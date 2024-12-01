import React from "react";
import "../styles/fSignUp.css";
import { Form, redirect, useSubmit } from "react-router-dom";
import axios from "axios";
import Header from "./header";
import { useState } from "react";
import firstnameimg from "../images/firstname.png";
import lastnameimg from "../images/lastname.png";
import usernameimg from "../images/username.png";
import passwordimg from "../images/password.png";
import emailimg from "../images/email.png";
import skillimg from "../images/skills.png";
import phoneimg from "../images/phone.png";

export default function FsignUp() {
  const [formData, setFormData] = useState({
    FirstName: '',
    LastName: '',
    UserName: '',
    email: '',
    Password: '',
    Skill: '',
    MobileNo: '',
    DOB:''
  });

  const [page, setPage] = useState(1);
  const [backButton, setBackButton] = useState(false);
  const [nextButton, setNextButton] = useState(true);
  const [submitButton, setSubmitButton] = useState(false);
  const [errors, setErrors] = useState({});
  const submit = useSubmit();

  function nextBlock() {
    if(page === 1 && validatePage()) {
      setPage(2);
      setBackButton(true);
    }
    else if(page === 2 && validatePage()) {
      setPage(3)
      setNextButton(false);
      setSubmitButton(true);
    }
  //   let backButton = document.querySelector(".backButton");
  //   let nextButton = document.querySelector(".nextButton");
  //   let submitButton = document.querySelector(".submitButton");
  //   let step = document.querySelector("#step");
  //   if (step.textContent === "Step-1") {
  //     step.textContent = "Step-2";
  //     document.querySelector(".display2").style.display = "block";
  //     document.querySelector(".display3").style.display = "none";
  //     document.querySelector(".display1").style.display = "none";
  //     backButton.style.display = "block";
  //   } else if (step.textContent === "Step-2") {
  //     submitButton.style.display = "block";
  //     step.textContent = "Step-3";
  //     document.querySelector(".display3").style.display = "block";
  //     document.querySelector(".display2").style.display = "none";
  //     document.querySelector(".display1").style.display = "none";
  //     nextButton.style.display = "none";
  //   }
  }

  function prevBlock() {
    if(page === 2) {
      setPage(1)
      setBackButton(false)
    }
    else if(page === 3) {
      setPage(2);
      setNextButton(true);
      setSubmitButton(false);
    }
  //   let backButton = document.querySelector(".backButton");
  //   let nextButton = document.querySelector(".nextButton");
  //   let submitButton = document.querySelector(".submitButton");
  //   let step = document.querySelector("#step");
  //   if (step.textContent === "Step-2") {
  //     step.textContent = "Step-1";
  //     document.querySelector(".display1").style.display = "block";
  //     document.querySelector(".display3").style.display = "none";
  //     document.querySelector(".display2").style.display = "none";
  //     backButton.style.display = "none";
  //   } else if (step.textContent === "Step-3") {
  //     submitButton.style.display = "none";
  //     step.textContent = "Step-2";
  //     document.querySelector(".display2").style.display = "block";
  //     document.querySelector(".display1").style.display = "none";
  //     document.querySelector(".display3").style.display = "none";
  //     nextButton.style.display = "block";
  //   }
  }

  // const errors = useActionData();
  // console.log(errors);

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  }

  function validatePage() {
    const currentErrors = {};
    const nameRegEx = /^[a-zA-Z]+$/;
    const userNameRegEx = /^[a-zA-Z]+\d{2}$/;
    const emailRegEx = /^[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
    const passwordRegEx = /^[a-zA-Z0-9]{8,}$/;
    const mobileNoRegEx = /^[0-9]{10}$/;

    if (page === 1) {
      if (!nameRegEx.test(formData.FirstName)) {
        currentErrors.FirstName = "Enter a valid first name";
      }
      if (!nameRegEx.test(formData.LastName)) {
        currentErrors.LastName = "Enter a valid last name";
      }
    } else if (page === 2) {
      if (!emailRegEx.test(formData.email)) {
        currentErrors.email = "Enter a valid email address";
      }
      if (!mobileNoRegEx.test(formData.MobileNo)) {
        currentErrors.MobileNo = "Phone Number should be of length 10";
      }
    } else if (page === 3) {
      if (!userNameRegEx.test(formData.UserName)) {
        currentErrors.UserName = "Username format should be example17";
      }
      if (!passwordRegEx.test(formData.Password)) {
        currentErrors.Password = "Password must be at least 8 characters";
      }
    }

    setErrors(currentErrors);
    return Object.keys(currentErrors).length === 0;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validatePage()) {
      const formDataObj = new FormData();
      for (const key in formData) {
        formDataObj.append(key, formData[key]);
      }

      submit(formDataObj, { method: "post", action: "/signUp/freelancer" });
    }
  };


  return (
    <div className="FsignUpPage">
      <Header/>
      <div className="formBlock">
        <div className="sideCover">
          <ul className="list1">
            <li>S</li>
            <li>I</li>
            <li>G</li>
            <li>N</li>
          </ul>
          <ul className="list2">
            <br/>
            <li>U</li>
            <li>P</li>
          </ul>
        </div>
        <Form className="form signUpForm" method="post" onSubmit={handleSubmit}>
          <h2 id="step">Step {page}</h2>
          <div className="progress-container">
            <div className={`progress-bar ${page === 3 ? 'step3' : page === 2 ? 'step2' : 'step1'}`}>
              <div className={`step1 ${page > 0 ? "color":""}`}>1</div>
              <div className={`step2 ${page > 1 ? "color":""}`}>2</div>
              <div className={`step3 ${page > 2 ? "color":""}`}>3</div>
            </div>
          </div>
          { page === 1 && 
            <div className="display1">
              <fieldset>
                <div className="input-wrapper">
                  <input type="text" name="FirstName" placeholder="" value={formData.FirstName} onChange={handleInputChange}/>
                  <img src={firstnameimg} alt="" />
                </div>
                {errors?.FirstName && <span>{errors.FirstName}</span>}
              </fieldset>
              <fieldset>
                <div className="input-wrapper">
                  <input type="text" name="LastName" placeholder="" value={formData.LastName} onChange={handleInputChange}/>
                  <img src={lastnameimg} alt="" />
                </div>
                {errors?.LastName && <span>{errors.LastName}</span>}
              </fieldset>
              <fieldset>
                <label>Enter your DOB:</label>
                <input type="Date" name="DOB" value={formData.DOB} onChange={handleInputChange}/>
              </fieldset>
            </div> 
          }
          { page === 2 && 
            <div className="display2">
              <fieldset>
                <div className="input-wrapper">
                  <input type="email" name="email" placeholder="" value={formData.email} onChange={handleInputChange}/>
                <img src={emailimg} alt="" />
                </div>
                {errors && errors.email && <span>{errors.email}</span>}
              </fieldset>
              <fieldset>
                <div className="input-wrapper">
                  <input type="Number" name="MobileNo" placeholder="" value={formData.MobileNo} onChange={handleInputChange}/>
                  <img src={phoneimg} alt="" />
                </div>
                {errors && errors.MobileNo && <span>{errors.MobileNo}</span>}
              </fieldset>
              <fieldset>
                <div className="input-wrapper">
                  <input type="text" name="Skill" placeholder="" value={formData.Skill} onChange={handleInputChange}/>
                  <img src={skillimg} alt="" />
                </div>
            </fieldset>
              
            </div>
          }
          {page === 3 && 
            <div className="display3">
              <fieldset>
                <div className="input-wrapper">
                  <input type="text" name="UserName" placeholder="" value={formData.UserName} onChange={handleInputChange}/>
                  <img src={usernameimg} alt="" />
                </div>
                {errors && errors.UserName && <span>{errors.UserName}</span>}
              </fieldset>
              <fieldset>
              <div className="input-wrapper">
                  <input type="password" name="Password" placeholder="" value={formData.Password} onChange={handleInputChange}/>
                  <img src={passwordimg} alt="" />
                </div>
                {errors?.Password && <span>{errors.Password}</span>}
              </fieldset>
            </div>
          }
          <section className="linking">
            { backButton && 
              <button className="backButton" type="button" onClick={prevBlock}>
                Back
              </button>
            }
            { nextButton && 
              <button className="nextButton" type="button" onClick={nextBlock}>
                Next
              </button>
            }
            { submitButton && 
              <button className="submitButton" type="submit">
                Submit
              </button>
            }
          </section>
        </Form>
      </div>
    </div>
  );
}

export async function Action({ request }) {
  const formData = Object.fromEntries(await request.formData());
  const errors = {};
  const nameRegEx = /^[a-zA-Z]+$/;
  const userNameRegEx = /^[a-zA-Z]+\d{2}$/;
  const emailRegEx = /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
  const passwordRegEx = /^[a-zA-Z0-9]{8,}$/;
  const mobileNoRegEx = /^[0-9]{10}$/;
  if (!nameRegEx.test(formData.FirstName))
    errors.FirstName = "Enter a valid String";
  if (!nameRegEx.test(formData.LastName))
    errors.LastName = "Enter a valid String";
  if (!userNameRegEx.test(formData.UserName))
    errors.UserName = "username example: example17";
  if (!emailRegEx.test(formData.email))
    errors.email = "Enter a valid email";
  if (!passwordRegEx.test(formData.Password))
    errors.Password = "Enter a valid String";
  if (!mobileNoRegEx.test(formData.MobileNo))
    errors.MobileNo = "Enter a valid Phone Number";
  if (Object.keys(errors).length) {
    return errors;
  }
  const res = await axios.post(
    "http://localhost:5500/signUp/freelancer",
    formData
  );
  if (res.data) {
    return redirect("/login");
  } else {
    return redirect("/signUp");
  }
}

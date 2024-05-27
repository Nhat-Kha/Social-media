import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

import { logIn, signUp } from "../../redux/actions/AuthAction";

export default function SignIn() {
  const initialState = {
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmpass: "",
  };

  const { error, errorMessage, loading } = useSelector((state) => ({
    error: state.auth.error,
    errorMessage: state.auth.errorMessage,
    loading: state.auth.loading,
  }));

  console.log({ loading });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignUp, setIsSignUp] = useState(false);

  const [data, setData] = useState(initialState);

  const [confirmPass, setConfirmPass] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  console.log(errorMessage);
  // const dispatch = useDispatch()

  // Reset Form
  const resetForm = () => {
    setData(initialState);
    setConfirmPass(confirmPass);
  };

  // handle Change in input
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // Form Submission
  const handleSubmit = (e) => {
    setHasSubmitted(true);
    e.preventDefault();
    if (isSignUp) {
      data.password === data.confirmpass
        ? dispatch(signUp(data, navigate))
        : setConfirmPass(true);
    } else {
      dispatch(logIn(data, navigate));
    }
  };

  return (
    <div className="h-screen flex">
      <div
        className="hidden lg:flex w-full lg:w-1/2 login_img_section
          justify-around items-center"
      >
        <div
          className=" 
                  bg-black 
                  opacity-20 
                  inset-0 
                  z-0"
        ></div>
        <div className="w-full mx-auto px-20 flex-col items-center space-y-6">
          <h1 className="text-white font-bold text-4xl font-sans">
            Simple App
          </h1>
          <p className="text-white mt-1">The simplest app to use</p>
          <div className="flex justify-center lg:justify-start mt-6">
            <a
              href="#!"
              className="hover:bg-indigo-700 hover:text-white hover:-translate-y-1 transition-all duration-500 bg-white text-indigo-800 mt-4 px-4 py-2 rounded-2xl font-bold mb-2"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
      <div className="flex w-full lg:w-1/2 justify-center items-center bg-white space-y-8">
        <div className="w-full px-8 md:px-32 lg:px-24">
          <form
            className="bg-white rounded-md shadow-2xl p-5"
            onSubmit={handleSubmit}
          >
            <h1 className="text-gray-800 font-bold text-2xl mb-1">
              {isSignUp ? "Hello Again!" : "Hello!"}
            </h1>
            <p className="text-sm font-normal text-gray-600 mb-8">
              {isSignUp ? "Welcome to Register" : "Welcome to Login!"}
            </p>
            {isSignUp && (
              <>
                <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                  <input
                    required
                    className=" pl-2 w-full outline-none border-none"
                    type="text"
                    name="firstname"
                    value={data.firstname}
                    placeholder="First name"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                  <input
                    required
                    className=" pl-2 w-full outline-none border-none"
                    type="text"
                    name="lastname"
                    placeholder="Last Name"
                    value={data.lastname}
                    onChange={handleChange}
                  />
                </div>
              </>
            )}
            <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
              <input
                required
                className=" pl-2 w-full outline-none border-none"
                type="text"
                name="username"
                placeholder="User Name"
                value={data.username}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center border-2 mb-12 py-2 px-3 rounded-2xl ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                required
                className="pl-2 w-full outline-none border-none"
                type="password"
                name="password"
                placeholder="Password"
                value={data.password}
                onChange={handleChange}
              />
            </div>
            {isSignUp && (
              <div className="flex items-center border-2 mb-12 py-2 px-3 rounded-2xl ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  required
                  className="pl-2 w-full outline-none border-none"
                  type="password"
                  name="confirmpass"
                  placeholder="Confirm password"
                  onChange={handleChange}
                />
              </div>
            )}

            <button
              type="submit"
              className="block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 
              transition-all duration-500 text-white font-semibold mb-2"
              disabled={loading}
            >
              {loading ? "Loading..." : isSignUp ? "SignUp" : "Login"}
            </button>
            {isSignUp ? (
              <span
                style={{
                  color: "red",
                  fontSize: "12px",
                  alignSelf: "flex-end",
                  marginRight: "5px",
                  display: confirmPass ? "block" : "none",
                }}
              >
                *Confirm password is not same
              </span>
            ) : (
              <span
                style={{
                  color: "red",
                  fontSize: "12px",
                  alignSelf: "flex-end",
                  marginRight: "5px",
                  display: hasSubmitted && error ? "block" : "none",
                }}
              >
                *{errorMessage}
              </span>
            )}
            <div className="flex justify-between mt-4">
              <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all">
                Forgot Password ?
              </span>

              <span
                href="#"
                className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all"
                onClick={() => {
                  resetForm();
                  setIsSignUp((prev) => !prev);
                }}
              >
                {isSignUp
                  ? "Already have an account Login"
                  : "Don't have an account Sign up"}
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

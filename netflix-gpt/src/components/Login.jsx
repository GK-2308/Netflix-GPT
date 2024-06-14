import React, { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/51c1d7f7-3179-4a55-93d9-704722898999/be90e543-c951-40d0-9ef5-e067f3e33d16/IN-en-20240610-popsignuptwoweeks-perspective_alpha_website_small.jpg"
          alt="background-img"
        />
      </div>
      <form className="w-1/4 absolute mx-auto left-0 right-0 p-12 bg-black my-36 text-white opacity-80">
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            type="text"
            placeholder="Full Name"
            className="bg-gray-700 w-full p-2 my-4"
          />
        )}
        <input
          type="email"
          placeholder="Email"
          className="bg-gray-700 w-full p-2 my-4"
        />
        <input
          type="password"
          placeholder="password"
          className="w-full p-2 my-4 bg-gray-700"
        />
        <button className="p-4 my-6 bg-red-700 w-full rounded-lg ">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className=" my-2 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm ? "New to Netflix? SignUp" : "Already a User, SignIn"}
        </p>
      </form>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import Header from "./Header";
import { validate } from "../utils/validate";
import { useRef } from "react";
import { auth } from "../utils/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { BG_URL, USER_AVATAR } from "../utils/constants";

const Login = () => {
  const dispatch = useDispatch();
  const [isSignInForm, setIsSignInForm] = useState(true);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const [errorMessage, setErrorMessage] = useState(null);
  const handleSubmit = () => {
    // check validate(email ,password)

    const message = validate(email.current.value, password.current.value);

    setErrorMessage(message);

    if (message)
      //if msg is string means incorrect password or email so return
      return;

    if (!isSignInForm) {
      //sign Up logic

      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              // Profile updated!
              const { uid, email, displayName, photoURL } = auth.currentUser;

              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              // An error occurred
              setErrorMessage(error.message);
            });

          console.log(user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " - " + errorMessage);
          // ..
        });
    } else {
      //Sign in logic

      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;

          console.log(user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " - " + errorMessage);
        });
    }
  };
  //   return (
  //     <div className="h-screen relative">
  //       <Header />
  //       <div className="absolute inset-0">
  //         <img
  //           className="object-cover w-full h-full"
  //           src={BG_URL}
  //           alt="background-img"
  //         />
  //       </div>
  //       <form
  //         onSubmit={(e) => e.preventDefault()}
  //         className="w-full md:w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80 overflow-hidden"
  //       >
  //         <h1 className="font-bold text-3xl py-4">
  //           {isSignInForm ? "Sign In" : "Sign Up"}
  //         </h1>
  //         {!isSignInForm && (
  //           <input
  //             ref={name}
  //             type="text"
  //             placeholder="Full Name"
  //             className="bg-gray-700 w-full p-2 my-4"
  //           />
  //         )}
  //         <input
  //           ref={email}
  //           type="email"
  //           placeholder="Email"
  //           className="bg-gray-700 w-full p-2 my-4"
  //         />
  //         <input
  //           ref={password}
  //           type="password"
  //           placeholder="password"
  //           className="w-full p-2 my-4 bg-gray-700"
  //         />
  //         <p className="text-red-600 my-4 font-bold">{errorMessage}</p>
  //         <button
  //           className="p-4 my-6 bg-red-700 w-full rounded-lg "
  //           onClick={handleSubmit}
  //         >
  //           {isSignInForm ? "Sign In" : "Sign Up"}
  //         </button>
  //         <p className=" my-2 cursor-pointer" onClick={toggleSignInForm}>
  //           {isSignInForm ? "New to Netflix? SignUp" : "Already a User, SignIn"}
  //         </p>
  //       </form>
  //     </div>
  //   );
  // };

  // export default Login;
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="relative flex-grow">
        <img
          className="absolute inset-0 object-cover w-full h-full"
          src={BG_URL}
          alt="background-img"
        />
        <div className="relative flex justify-center items-center h-full">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="w-full md:w-3/12 p-12 bg-black text-white rounded-lg bg-opacity-80"
          >
            <h1 className="font-bold text-3xl py-4">
              {isSignInForm ? "Sign In" : "Sign Up"}
            </h1>
            {!isSignInForm && (
              <input
                ref={name}
                type="text"
                placeholder="Full Name"
                className="bg-gray-700 w-full p-2 my-4"
              />
            )}
            <input
              ref={email}
              type="email"
              placeholder="Email"
              className="bg-gray-700 w-full p-2 my-4"
            />
            <input
              ref={password}
              type="password"
              placeholder="password"
              className="w-full p-2 my-4 bg-gray-700"
            />
            <p className="text-red-600 my-4 font-bold">{errorMessage}</p>
            <button
              className="p-4 my-6 bg-red-700 w-full rounded-lg"
              onClick={handleSubmit}
            >
              {isSignInForm ? "Sign In" : "Sign Up"}
            </button>
            <p className="my-2 cursor-pointer" onClick={toggleSignInForm}>
              {isSignInForm
                ? "New to Netflix? SignUp"
                : "Already a User, SignIn"}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

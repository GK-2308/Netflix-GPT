import { onAuthStateChanged, signOut } from "firebase/auth";
import React from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { useEffect } from "react";
import { LOGO, USER_AVATAR } from "../utils/constants";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, email, displayName, photoURL } = user;
        console.log(user);
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
        // ...
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });
  }, []);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        // dispatch(   removeUser()); handled in body when authStateChange
        // navigate("/");
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img className="w-56" src={LOGO} alt="logo" />
      {user && (
        <div className="flex p-2">
          <img className="w-12 h-12" src={USER_AVATAR} alt="usericon" />
          <button
            onClick={handleSignOut}
            className="ml-2 font-bold text-white "
          >
            (Sign Out)
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;

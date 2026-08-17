import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import { auth } from "../firebase/Firebase.init";
import axios from "axios";

const GoogleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const GoogleSignin = () => {
    setLoading(true);

    return signInWithPopup(auth, GoogleProvider);
  };

  const signUp = (email, password) => {
    setLoading(true);

    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signin = (email, password) => {
    setLoading(true);

    return signInWithEmailAndPassword(auth, email, password);
  };

  const SignOutUser = () => {
    setLoading(true);

    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        try {
          const token = await currentUser.getIdToken();

          const response = await axios.get("http://localhost:4000/users/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setRole(response.data.role);
        } catch (error) {
          console.error("Failed to load user role:", error);
          setRole(null);
        }
      } else {
        setRole(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  console.log("AuthProvider user:", user.role);

  const authInfo = {
    user,
    role,
    loading,
    setUser,
    GoogleSignin,
    signin,
    signUp,
    SignOutUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

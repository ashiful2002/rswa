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
import { API_ENDPOINTS } from "../config/api";

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
          window.firebaseToken = token;
          // console.log("🔑 YOUR FIREBASE ID TOKEN FOR POSTMAN:\n", token);

          // 1. Automatically sync/upsert user into MongoDB
          const userData = {
            email: currentUser.email,
            displayName: currentUser.displayName || currentUser.email?.split("@")[0],
            name: currentUser.displayName || currentUser.email?.split("@")[0],
            photoURL: currentUser.photoURL,
            role: "donor",
          };

          try {
            await axios.post(API_ENDPOINTS.USERS, userData, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
          } catch (syncErr) {
            console.error("Backend user sync error:", syncErr);
          }

          // 2. Fetch assigned user role from MongoDB
          const response = await axios.get(
            `${API_ENDPOINTS.USERS}/${currentUser.email}/role`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const fetchedRole =
            response?.data?.data?.role ||
            response?.data?.role ||
            response?.data?.data?.user?.role;
          setRole(fetchedRole || "donor");
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

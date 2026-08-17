import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
 
const useAuth = () => {
  const authInfo = useContext(AuthContext);
  return authInfo;
  // return useContext(AuthContext);
};

export default useAuth;

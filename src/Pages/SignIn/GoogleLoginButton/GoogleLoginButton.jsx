import { Button } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

const GoogleSignInButton = () => {
  const { GoogleSignin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleGoogleSignin = () => {
    GoogleSignin()
      .then((res) => {
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Button
      onClick={handleGoogleSignin}
      type="default"
      icon={<GoogleOutlined />}
      style={{
        backgroundColor: "#ffffff",
        color: "#5f6368",
        border: "1px solid #dadce0",
        fontWeight: "500",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "0 4px",
        height: "40px",
      }}
      className="my-2 w-full"
    >
      Sign in with Google
    </Button>
  );
};

export default GoogleSignInButton;

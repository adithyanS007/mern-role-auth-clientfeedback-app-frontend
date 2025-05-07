import { useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const Root = () => {
    const {user} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
          navigate("/login");
          return;
        }
        switch (user.role) {
          case "admin":
            navigate("/admin-dashboard");
            break;
          case "client":
            navigate("/client-dashboard");
            break;
          default:
            navigate("/login");
        }
      }, [user, navigate]);

    return null;
}

export default Root;
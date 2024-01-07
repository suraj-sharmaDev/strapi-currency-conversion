import { useEffect } from "react";
import { useAuth } from "../contexts/auth";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const { user, loading, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading == false && user) {
      navigate("/home");
    }
  }, [loading, user]);

  const handleLogin = () => {
    login({ name: "suraj" });
  };

  if (loading) return <span>Loading...</span>;

  return (
    <div>
      This is Auth
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

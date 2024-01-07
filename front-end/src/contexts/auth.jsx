import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import localforage from "localforage";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // initially fetch data from local storage
  useEffect(()=>{
    initializeUserData();
  }, []);

  const initializeUserData = async() => {
    const data = await localforage.getItem("user");
    if (data) {
      setUser(JSON.parse(data));
    }
    setLoading(false);
  }

  const login = (user) => {
    setUser(user);
    localforage.setItem("user", JSON.stringify(user));
  };

  const logout = async () => {
    setUser(null);
    localforage.removeItem("user");
  };
  
  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
}
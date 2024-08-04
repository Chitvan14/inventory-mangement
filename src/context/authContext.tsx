// AuthContext.tsx
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import axios from "axios";
import { User } from "../interfaces";

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  login: () => void;
  logout: () => void;
  setUser: any;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/api/auth/login/success`;
      console.log("API URL: ", url);

      // Log cookies before the request
      console.log("Cookies before request: ", document.cookie);

      const { data } = await axios.get(url, { withCredentials: true });
      console.log("DATA ", data);
      const value = localStorage.getItem("user");
      console.log("VALUE ", value);
      if (value) {
        setUser(JSON.parse(value));
      } else {
        localStorage.setItem("user", JSON.stringify(data.user._json));
        setUser(data.user._json);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const login = () => {
    window.open(`${process.env.REACT_APP_API_URL}/api/auth/callback`, "_self");
  };

  const logout = () => {
    window.open(`${process.env.REACT_APP_API_URL}/api/auth/logout`, "_self");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };

// App.tsx
import React, { Fragment, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import InventoryPage from "./pages/InventoryPage";
import AddItemPage from "./pages/AddItemPage";
import AddPartyPage from "./pages/AddPartyPage";
import { useAuth } from "./context/authContext";
import useSubdomain from "./hooks/useSubdomain";
import Navbar from "./components/Navbar";

const ProtectedRoute: React.FC<{ element: JSX.Element; user: any }> = ({
  element,
  user,
}) => {
  return user ? element : <LandingPage />;
};

const App: React.FC = () => {
  const { user, loading, setUser } = useAuth();
  const subdomain = useSubdomain();
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    alert(JSON.stringify({ subdomain, user }));
    if (!subdomain && user) {
      const emailName = user.email.split("@")[0];
      const currentLocation = window.location;

      // Extract the protocol and hostname
      const protocol = currentLocation.protocol;
      const hostname = currentLocation.host;
      alert(JSON.stringify({ emailName, currentLocation, protocol, hostname }));
      // Construct the new URL with the "app" subdomain
      const newUrl = `${protocol}//${emailName}.${hostname}${currentLocation.pathname}${currentLocation.search}${currentLocation.hash}`;
      alert(JSON.stringify({ newUrl }));
      setIsAuth(true);
      setUser(user);
      // window.location.href = newUrl;
    }
    if (subdomain && user) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [subdomain, user]);

  if (loading) {
    return <div>Loading...</div>; // Or a loading spinner
  }
  return (
    <Fragment>
      <Navbar />

      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute element={<InventoryPage />} user={isAuth} />
            }
          />
          <Route
            path="/add-item"
            element={<ProtectedRoute element={<AddItemPage />} user={isAuth} />}
          />
          <Route
            path="/edit-item/:id"
            element={<ProtectedRoute element={<AddItemPage />} user={isAuth} />}
          />
          <Route
            path="/add-party"
            element={
              <ProtectedRoute element={<AddPartyPage />} user={isAuth} />
            }
          />
          <Route
            path="/edit-party/:id"
            element={
              <ProtectedRoute element={<AddPartyPage />} user={isAuth} />
            }
          />
          {/* <Route path="*" element={<Navigate to="/" />} /> */}
        </Routes>
      </Router>
    </Fragment>
  );
};

export default App;

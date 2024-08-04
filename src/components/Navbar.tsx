import React from "react";
import logo from "../assets/colorLogo.png"; // Replace with your logo
import { useAuth } from "../context/authContext";
import Button from "./Button";

const Navbar = () => {
  const { user, logout, login } = useAuth();

  return (
    <header className="w-full py-4 bg-white shadow-md flex justify-center">
      <img src={logo} alt="Inventory Management Tool Logo" className="h-20" />
      <div>
        <span> {user?.name}</span>
        {!user ? (
          <Button
            onClick={login}
            label="Sign in with Google"
            isActive={false}
          />
        ) : (
          <Button label="Logout" onClick={logout} isActive={true} />
        )}
      </div>
    </header>
  );
};

export default Navbar;

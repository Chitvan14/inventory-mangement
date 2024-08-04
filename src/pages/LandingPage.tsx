// src/LandingPage.tsx
import React, { useEffect } from "react";
import heroImage from "../assets/hero.jpeg";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useAuth } from "../context/authContext";

const LandingPage: React.FC = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <main className="flex flex-col items-center py-16 px-4">
        <section className="text-center max-w-4xl mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4 font-oswald uppercase">
            Manage Your Inventory Effortlessly
          </h1>
          <p className="text-lg text-gray-700">
            A seamless and efficient tool to manage your inventory with ease.
          </p>
        </section>
        <section className="mb-16">
          <img
            src={heroImage}
            alt="Hero"
            className="w-full max-w-4xl rounded-lg shadow-lg"
          />
        </section>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mb-16">
          <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-2 font-oswald">
              Easy Tracking 📦
            </h2>
            <p className="text-gray-700">
              Keep track of your inventory effortlessly with real-time updates.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-2 font-oswald">
              Detailed Analytics 📊
            </h2>
            <p className="text-gray-700">
              Get insights into your inventory with comprehensive analytics.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-2 font-oswald">
              Secure & Reliable 🔒
            </h2>
            <p className="text-gray-700">
              Your data is secure with our robust security features.
            </p>
          </div>
        </section>
        <section className="text-center max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 font-oswald">
            Get Started Today
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Sign up now and take control of your inventory management.
          </p>
          <Button
            onClick={login}
            label="Sign in with Google"
            isActive={false}
          />
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
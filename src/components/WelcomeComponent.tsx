import React from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../utils/AuthUtils";

function WelcomeComponent() {
  const navigate = useNavigate();

  const handleGoToCourse = () => {
    navigate("/course");
  };

  const handleGoToTeacher = () => {
    navigate("/teacher");
  };

  return (
    <div className="flex flex-col items-center justify-center h-full text-center bg-gray-50">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        👋 Welcome to Education Management System
      </h1>
      <p className="text-gray-600 text-lg mb-8">
        Manage your courses, teachers, and students easily.
      </p>

      {isLoggedIn() ? "" :<div className="flex gap-4">
        <a href="/login"
          className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Please login to continue.
        </a>
      </div>}
    </div>
  );
}

export default WelcomeComponent;

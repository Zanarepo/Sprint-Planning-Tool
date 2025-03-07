import React from "react";
import LandingPageFeatures2 from "./LandingPageFeatures2";
import DashboardFeaturs from "./DashboardFeaturs";
import ChatWindow from "../Chatdashboard/ChatWindow";
import { LayoutDashboard } from "lucide-react";

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-700 p-6 text-gray-800 dark:text-gray-100 ">
      <DashboardFeaturs />
      <ChatWindow />
      <div className="text-center max-w-3xl bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl my-6">
        <LayoutDashboard size={80} className="mx-auto text-yellow-800 dark:text-yellow-800 mb-4" />
        <h1 className="text-4xl font-bold text-yellow-800 dark:text-yellow-800">
          Your Personalized Sprintify Dashboard
        </h1>
        <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
  Customize your experience with a personalized agile workspace that adapts to your needs.
  Tailor your dashboard, select the tools that matter, and adjust workflows to fit your unique style.
  Enjoy a flexible platform that empowers you to optimize processes and achieve excellence on your terms.
</p>
</div>
      <LandingPageFeatures2 />
    </div>
  );
}

export default HomePage;

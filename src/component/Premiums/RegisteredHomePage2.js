//import { Link } from "react-router-dom";
import LandingPageFeatures2 from './LandingPageFeatures2'
import DashboardFeaturs from './DashboardFeaturs'
import ReviewForm from './ReviewForm'
import ChatWindow from "../Chatdashboard/ChatWindow";



//import Standup from './Standup'
//import AppLauncher from './AppLauncher'
//import { FaCheckCircle, FaBrain, FaListAlt, FaRegLightbulb, FaDollarSign, FaCogs } from "react-icons/fa";

function HomePage() {
  return (
    
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6 text-gray-800 mt-20">
<DashboardFeaturs/>
<ChatWindow/>
      <div className="text-center max-w-3xl bg-white p-8 rounded-lg shadow-xl">
        <h1 className="text-4xl font-bold text-yellow-600">Sprintify</h1>
        <p className="mt-4 text-lg text-gray-700">
        Empowering Agile teams to simulate and prioritize product development on the go. 
        Optimize workflows, plan better sprints, and deliver quality products faster
        </p>
     
        
      </div>
      <LandingPageFeatures2/>
      
     <ReviewForm/>
     
    </div>
    
  );
}

export default HomePage;

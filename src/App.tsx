import { Route, Routes } from "react-router"
import NavBar from "./components/Navbar"
import Home from "./pages/Home"
import HowItWorks from "./pages/HowItWorks"
import ForNGO from "./pages/ForNGO"
import Contacts from "./pages/Contacts"
import Auth from "./pages/Auth"
import Dashboard from "./pages/Dashboard"
import DonatePage from "./pages/DonatePage"
import BrowseDonations from "./pages/BrowseDonations"
import MyDonations from "./pages/MyDonations"
import NGOProfile from "./pages/NGOProfile"
import Leaderboard from "./pages/Leaderboard"
import ProtectedRoute from "./components/ProtectedRoute"

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-100 to-indigo-200 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
    <NavBar/>
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/how-it-works" element={<HowItWorks/>}/>
      <Route path="/leaderboard" element={<Leaderboard/>}/>
      <Route path="/for-ngo" element={<ForNGO/>}/>
      <Route path="/contact" element={<Contacts/>}/>
      <Route path="/auth" element={<Auth/>}/>
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
      <Route path="/donate" element={<ProtectedRoute><DonatePage/></ProtectedRoute>}/>
      <Route path="/browse" element={<ProtectedRoute><BrowseDonations/></ProtectedRoute>}/>
      <Route path="/my-donations" element={<ProtectedRoute><MyDonations/></ProtectedRoute>}/>
      <Route path="/ngo-profile" element={<ProtectedRoute><NGOProfile/></ProtectedRoute>}/>
     </Routes>
    </div>
  )
}

export default App

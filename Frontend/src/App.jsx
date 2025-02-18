import "./App.css";
import Navbar from "./Components/Navbar";
import SideBar from "./Components/SideBar";
import { Routes, Route, Navigate } from "react-router-dom"; // ✅ No Router here!
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import Messages from "./pages/Messages";
import Tasks from "./pages/Tasks";
import Members from "./pages/Members";
import Settings from "./pages/Settings";
import WebsiteRedesign from "./pages/WebsiteRedesign";
import DesignSystem from "./pages/DesignSystem";
import WireFrames from "./pages/WireFrames";
import MobileApp from "./pages/MobileApp";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import HomePage from "./pages/HomePage";

function App() {
  const user = useSelector((state) => state.auth.user); // ✅ Get user from Redux

  return (
    <Routes>
      {!user ? (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/login" />} /> {/* ✅ Redirect unknown routes to login */}
        </>
      ) : (
        <>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/*"
            element={
              <div style={{ display: "flex" }}>
                <SideBar />
                <div style={{ marginLeft: 270, marginTop:20 , padding: 30, width: "100%" }}>
                  <Navbar />
                  <Routes>
                    <Route path="/messages" element={<Messages />} />
                    <Route path="/tasks" element={<Tasks />} />
                    <Route path="/members" element={<Members />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/projects/mobile-app" element={<MobileApp />} />
                    <Route path="/projects/website-redesign" element={<WebsiteRedesign />} />
                    <Route path="/projects/design-system" element={<DesignSystem />} />
                    <Route path="/projects/wireframes" element={<WireFrames />} />
                    <Route path="*" element={<Navigate to="/" />} /> {/* ✅ Redirect unknown routes */}
                  </Routes>
                </div>
              </div>
            }
          />
        </>
      )}
    </Routes>
  );
}

export default App;

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import AccountSettings from "./pages/AccountSettings";
import LogoutModal from "./components/LogoutModal";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";

export default function App() {

  return (
    // <div className=" bg-white dark:bg-dark-main">
      <Router>
        <LogoutModal />
        <Navbar />
        {/* <Temp/> */}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login/" element={<Login />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/account-settings" element={<AccountSettings />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/new-story" element={<CreatePost />} />
          <Route path="/post" element={<Post />} />
        </Routes>
      </Router>
    // </div>
  )
}
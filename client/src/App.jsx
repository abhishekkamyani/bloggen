import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import AccountSettings from "./pages/AccountSettings";
import LogoutModal from "./components/LogoutModal";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import CategoriesSelection from "./components/CategoriesSelection";
import MyBlogs from "./pages/MyBlogs";
import FavoritesPosts from "./pages/FavoritesPosts";
import Footer from "./components/Footer";
import Contact from "./pages/Contact";
import { useUserInfo } from "./contexts/UserContext";
import Temp from "./components/Temp";
import NotFoundPage from "./pages/NotFoundPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";

export default function App() {
  return (
    // <div className="bg-white dark:bg-dark-main">
    <Router>
      <LogoutModal />
      <CategoriesSelection />
      <Navbar />
      <main className="min-h-screen">
        <Routes>
          {/* These are the general routes -> for both unauthorized and authorized users */}
          <Route exact path="/" element={<Home />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/post/:slug" element={<Post />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/contact-us" element={<Contact />} />
          

          {/* These routes are only for unauthorized users */}
          <Route element={<AuthRequired />}>
            <Route path="/account-settings" element={<AccountSettings />} />
            <Route path="/new-story" element={<CreatePost />} />
            <Route path="/blogs" element={<MyBlogs />} />
            <Route path="/my-favorite-blogs" element={<FavoritesPosts />} />
          </Route>

          {/* These routes only accessible when user is not login/registered */}
          <Route element={<UserNotRegistered />}>
            <Route path="/login/" element={<Login />} />
            <Route path="/register" element={<Registration />} />
          </Route>

          <Route path="/temp" element={<Temp />} />
        </Routes>
      </main>
      <Footer />
    </Router>

    // </div>
  );
}

const AuthRequired = () => {
  const { isAuthenticated } = useUserInfo();
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

const UserNotRegistered = () => {
  const { isAuthenticated } = useUserInfo();
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

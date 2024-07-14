import React from "react";
import { ImFacebook, ImGithub, ImLinkedin, ImWhatsapp } from "react-icons/im";
import { Link } from "react-router-dom";
import { useUserInfo } from "../contexts/UserContext";

export default function Footer() {
  const { userInfo, isAuthenticated } = useUserInfo();
  return (
    <footer className="bg-primary theme-switch-transition py-2 shadow-dark-mild dark:bg-slate-700">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <section className="flex md:flex-col md:gap-y-5 justify-between max-sm:items-center">
            <a
              href="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img
                className="h-6 lg:h-7 hover:scale-110 transition-all ease-linear"
                src="/images/logo.png"
              />
            </a>
            {/* Social Icons */}
            <ul className="flex gap-x-4 sm:mx-auto">
              {socialLinks.map((link) => (
                <SocialIcon key={link.url} icon={link.icon} url={link.url} />
              ))}
            </ul>
          </section>
          <ul className="flex select-none flex-wrap items-center justify-center max-sm:mt-6 mb-6 text-sm font-medium text-black sm:mb-0 dark:text-main">
            <li>
              <Link to="/" className="hover:underline me-4 md:me-6">
                Home
              </Link>
            </li>
            <li>
              <a
                href="https://abhishek-kamyani.vercel.app/"
                target="_blank"
                className="hover:underline me-4 md:me-6"
              >
                About
              </a>
            </li>
            <li>
            <Link to="/contact-us" className="hover:underline me-4 md:me-6">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="hover:underline me-4 md:me-6">
                Privacy Policy
              </Link>
            </li>
            {!isAuthenticated && (
              <>
                <li>
                  <Link to="/login" className="hover:underline me-4 md:me-6">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="hover:underline me-4 md:me-6">
                    Sign up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-500 lg:my-8" />
        <span className="block text-sm text-black sm:text-center dark:text-main text-center">
          © {new Date().getFullYear()}{" "}
          <a href="/" className="hover:underline">
            Bloggen™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

const socialLinks = [
  {
    icon: <ImLinkedin className="social-icon bg-white text-linkedIn !py-0" />,
    url: "http://www.linkedin.com/in/abhishekkamyani",
  },
  {
    icon: <ImGithub className="social-icon text-white bg-gitHub" />,
    url: "https://www.github.com/abhishekkamyani/",
  },
  {
    icon: <ImFacebook className="social-icon text-white bg-facebook" />,
    url: "https://www.facebook.com/abhishekkamyani/",
  },
  {
    icon: <ImWhatsapp className="social-icon text-white bg-whatsApp" />,
    url: "https://wa.me/+923337303712",
  },
];

const SocialIcon = ({ icon, url }) => {
  return (
    <li>
      <a href={url} target="_blank">
        {icon}
      </a>
    </li>
  );
};

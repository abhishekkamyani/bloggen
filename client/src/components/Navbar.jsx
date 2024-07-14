import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Collapse, initTWE, Dropdown } from "tw-elements";
import { useUserInfo } from "../contexts/UserContext";
import { useDarkMode } from "../contexts/DarkModeContext";
import ImageLoader from "./loaders/ImageLoader";
function Navbar() {
  const { userInfo, isAuthenticated } = useUserInfo();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  useEffect(() => {
    initTWE({ Collapse, Dropdown });
  });

  return (
    <>
      {/* Main navigation container */}
      <nav className="flex-no-wrap theme-switch-transition select-none relative flex w-full items-center justify-between bg-primary py-2 shadow-dark-mild dark:bg-slate-700 lg:flex-wrap lg:justify-start lg:py-4">
        <div className="flex w-full flex-wrap items-center px-3">
          {/* Hamburger button for mobile view */}
          <button
            className="block border-0 bg-transparent px-2 text-white hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
            type="button"
            data-twe-collapse-init=""
            data-twe-target="#navbarSupportedContent1"
            aria-controls="navbarSupportedContent1"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            {/* Hamburger icon */}
            <span className="[&>svg]:w-10 [&>svg]:stroke-black/50 dark:[&>svg]:stroke-neutral-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </button>
          <div
            className="!visible hidden transition-all ease-linear flex-grow basis-[100%] items-center lg:!flex lg:basis-auto"
            id="navbarSupportedContent1"
            data-twe-collapse-item=""
          >
            {/* Logo */}
            <a href="/">
              <img
                className="h-7 hover:scale-110 transition-all ease-linear max-lg:my-5 mx-auto"
                src="/images/logo.png"
              />
            </a>
            {/* Left navigation links */}
            <ul
              className="list-style-none ms-auto lg:me-2 max-lg:mb-5 flex flex-col gap-y-2 ps-0 lg:flex-row"
              data-twe-navbar-nav-ref=""
            >
              <Link
                to="/"
                type="button"
                data-twe-ripple-color="light"
                className="me-3 inline-block rounded px-2 pb-2 pt-2.5 text-sm font-medium uppercase leading-normal text-white hover:text-black dark:text-white dark:hover:bg-dark-main transition duration-150 ease-in-out"
              >
                Home
              </Link>
              {!isAuthenticated ? (
                <>
                  <Link
                    to="/login"
                    type="button"
                    data-twe-ripple-init=""
                    data-twe-ripple-color="light"
                    className="me-3 inline-block rounded px-2 pb-2 pt-2.5 text-sm font-medium uppercase leading-normal text-white hover:text-black dark:text-white dark:hover:bg-dark-main transition duration-150 ease-in-out"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    type="button"
                    data-twe-ripple-init=""
                    data-twe-ripple-color="light"
                    className="me-3 inline-block rounded bg-dark-main px-2 lg:px-6  pb-2 pt-2.5 text-sm font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-black"
                  >
                    Sign up for free
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/my-favorite-blogs"
                    type="button"
                    data-twe-ripple-color="light"
                    className="me-3 inline-block rounded px-2 pb-2 pt-2.5 text-sm font-medium uppercase leading-normal text-white hover:text-black dark:text-white dark:hover:bg-dark-main transition duration-150 ease-in-out"
                  >
                    Favorites
                  </Link>

                  <Link
                    to="/new-story"
                    type="button"
                    data-twe-ripple-init=""
                    data-twe-ripple-color="light"
                    className="me-3 inline-block rounded bg-dark-main px-2 lg:px-6  pb-2 pt-2.5 text-sm font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-black"
                  >
                    Create blog
                  </Link>
                </>
              )}
            </ul>
          </div>

          {/* Right elements */}
          <div className="relative flex items-center ms-auto gap-x-2 ">
            {/* Dark Mode */}
            <button onClick={toggleDarkMode}>
              <img
                src={isDarkMode ? "/images/moon.png" : "/images/sun.png"}
                alt="theme mode"
                className="select-none"
              />
            </button>

            {/* Profile */}
            {isAuthenticated && (
              <>
                <div
                  className="relative select-none z-20"
                  data-twe-dropdown-ref=""
                  data-twe-dropdown-alignment="end"
                >
                  {/* Second dropdown trigger */}
                  <button
                    className="flex items-center whitespace-nowrap transition duration-150 ease-in-out motion-reduce:transition-none"
                    id="dropdownMenuButton2"
                    role="button"
                    data-twe-dropdown-toggle-ref=""
                    aria-expanded="false"
                  >
                    {/* User avatar */}

                    <ImageLoader
                      src={`${userInfo.avatar}`}
                      className="rounded-full object-cover object-center w-8 h-8"
                      loaderClassName="rounded-full"
                    />
                  </button>
                  {/* Second dropdown menu */}
                  <ul
                    className="absolute float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg data-[twe-dropdown-show]:block dark:bg-slate-700"
                    aria-labelledby="dropdownMenuButton2"
                    data-twe-dropdown-menu-ref=""
                  >
                    {/* Second dropdown menu items */}
                    <li>
                      <Link
                        to={`/profile/${userInfo._id}`}
                        className="profile-menu-item"
                        data-twe-dropdown-item-ref=""
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={`blogs/?user=${userInfo._id}`}
                        className="profile-menu-item"
                        data-twe-dropdown-item-ref=""
                      >
                        My Blogs
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="account-settings/"
                        className="profile-menu-item"
                        data-twe-dropdown-item-ref=""
                      >
                        Account Settings
                      </Link>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="w-full text-start profile-menu-item"
                        data-twe-toggle="modal"
                        data-twe-target="#exampleModalCenter"
                        data-twe-ripple-init=""
                        data-twe-ripple-color="light"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </div>
          {/* Right elements */}
        </div>
      </nav>
    </>
  );
}

export default Navbar;

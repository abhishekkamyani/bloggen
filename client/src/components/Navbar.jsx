import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Collapse, initTWE, Dropdown } from "tw-elements";
import { useUserInfo } from "../contexts/UserContext";

function Navbar() {
    const isDark = localStorage.getItem("isDarkMode") === "true" ? true : false;
    const [isDarkMode, setIsDarkMode] = useState(isDark);
    const { userInfo } = useUserInfo();

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        localStorage.setItem("isDarkMode", !isDarkMode);
    };

    useEffect(() => {
        initTWE({ Collapse, Dropdown });
    });

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    }, [isDarkMode]);

    return (
        <>
            {/* Main navigation container */}
            <nav className="flex-no-wrap relative flex w-full items-center justify-between bg-primary py-2 shadow-dark-mild dark:bg-slate-700 lg:flex-wrap lg:justify-start lg:py-4">
                <div className="flex w-full flex-wrap items-center justify-between px-3">
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
                    {/* Collapsible navigation container */}
                    <div
                        className="!visible hidden flex-grow basis-[100%] items-center lg:!flex lg:basis-auto"
                        id="navbarSupportedContent1"
                        data-twe-collapse-item=""
                    >
                        {/* Logo */}
                        <a
                            className="mb-4 me-5 ms-1 lg:ms-2 mt-3 flex items-center text-white text-2xl max-md:text-xl transition duration-200 hover:text-black/80 hover:ease-in-out motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 lg:mb-0 lg:mt-0"
                            href="/"
                        >
                            {/* <img
                                src="https://tecdn.b-cdn.net/img/logo/te-transparent-noshadows.webp"
                                style={{ height: 15 }}
                                alt="TE Logo"
                                loading="lazy"
                            /> */}
                            Bloggen
                        </a>
                        {/* Left navigation links */}
                        <ul
                            className="list-style-none ms-auto lg:me-2 max-md:mb-5 flex flex-col gap-y-2 ps-0 lg:flex-row"
                            data-twe-navbar-nav-ref=""
                        >
                            {!Boolean(userInfo.email) ? (
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
                                        to="/registration"
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
                                        to="/post"
                                        type="button"
                                        data-twe-ripple-color="light"
                                        className="me-3 inline-block rounded px-2 pb-2 pt-2.5 text-sm font-medium uppercase leading-normal text-white hover:text-black dark:text-white dark:hover:bg-dark-main transition duration-150 ease-in-out"
                                    >
                                        Post
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

                        {/* Left links */}
                    </div>
                    {/* Right elements */}
                    <div className="relative flex items-center gap-x-2 ">
                        {/* Dark Mode */}
                        <button onClick={toggleDarkMode}>
                            <img
                                src={
                                    isDarkMode
                                        ? "https://img.icons8.com/color/35/moon-satellite.png"
                                        : "https://img.icons8.com/fluency/35/sun.png"
                                }
                                alt="theme mode"
                                className="select-none"
                            />
                        </button>
                        {/* Profile */}
                        {Boolean(userInfo.email) && (
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
                                        <img
                                            src={`${userInfo.avatar}`}
                                            className="rounded-full object-cover object-center"
                                            style={{ height: 32, width: 32 }}
                                            alt=""
                                            loading="lazy"
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
                                                to="account-settings/"
                                                className="profile-menu-item"
                                                href="#"
                                                data-twe-dropdown-item-ref=""
                                            >
                                                Account Settings
                                            </Link>
                                        </li>
                                        <li>
                                            {/* <a
                                                className="block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
                                                href="#"
                                                data-twe-dropdown-item-ref=""
                                            >
                                                Something else here
                                            </a> */}
                                            <button
                                                type="button"
                                                className='w-full text-start profile-menu-item'
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

import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SERVER_URL } from "../utils";
import { useUserInfo } from "../contexts/UserContext";
import { Toast } from "primereact/toast";
import CustomHelmet from "../SEO/CustomHelmet";

const initialUser = { email: "", password: "" };
function Login() {
  const [user, setUser] = useState(initialUser);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { setUserInfo } = useUserInfo();
  const navigate = useNavigate();
  const toast = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    //console.log(user);

    try {
      const response = await axios.post(`${SERVER_URL}/api/auth/login`, user, {
        withCredentials: true,
      });
      //console.log(response.status);
      if (response?.status === 200) {
        toast.current.show({
          severity: "success",
          summary: "Welcome!..",
          detail: "You have logged in",
          life: 1000,
        });
        setUserInfo(response.data);
        setUser(initialUser);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (e) {
      console.log(e.response?.status);
      if (e.response?.status === 404) {
        toast.current.show({
          severity: "error",
          summary: "Uff! 🙊",
          detail: e.response?.data?.error,
          life: 3000,
        });
      } else {
        toast.current.show({
          severity: "info",
          summary: "Oh no! 😥",
          detail: e.response?.data?.error || "Server Error",
          life: 3000,
        });
      }
    }

    setIsSubmitting(false);
  };

  return (
    <section
      id="login-section"
      className="bg-gray-50 h-screen md:min-h-full dark:bg-gray-900"
    >
      <CustomHelmet title="Login - Bloggen" />
      <Toast ref={toast} />
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-full lg:py-0">
        <div className="w-full h-3/2 bg-white z-10 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  value={user.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type={!showPassword ? "password" : "text"}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={user.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="passwordToggle"
                      type="checkbox"
                      value={showPassword}
                      onChange={() => setShowPassword(!showPassword)}
                      className="w-4 h-4 cursor-pointer"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="passwordToggle"
                      className="text-gray-500 dark:text-gray-300 cursor-pointer"
                    >
                      Show password
                    </label>
                  </div>
                </div>
                {/* <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a> */}
              </div>
              <button
                type="submit"
                className={`w-full ${
                  !isSubmitting && "btn"
                } focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
                disabled={isSubmitting}
              >
                Sign in
              </button>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link
                  to="/register"
                  className="font-medium link hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;

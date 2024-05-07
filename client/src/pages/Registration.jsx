import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SERVER_URL } from "../utils";
import { useUserInfo } from "../contexts/UserContext";
import { FaCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";

export default function Registration() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    c_password: "",
  });
  const [countries, setCountries] = useState([]);
  const selectedCountryRef = useRef(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setUserInfo } = useUserInfo();
  const navigate = useNavigate();

  useEffect(() => {
    let ignore = false;

    axios
      .get("https://countriesnow.space/api/v0.1/countries/iso")
      .then((response) => {
        if (!ignore) {
          const countriesObj = response.data.data;
          const countries = countriesObj.map((country) => country.name);
          setCountries(countries);
        }
      })
      .catch((e) => {
        //console.log(e);
      });

    return () => {
      ignore = true;
    };
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    toast.dismiss();
    //console.log(user);

    if (user.password !== user.c_password) {
      toast.error("Passwords do not match");
      return setIsSubmitting(false);
    }

    register({ ...user, country: selectedCountryRef.current.value });
  };

  const register = async (user) => {
    //console.log("passwords match");

    try {
      const response = await toast.promise(
        axios.post(`${SERVER_URL}/api/auth/register`, user, {
          withCredentials: true,
        }),
        {
          pending: "Your account creation in progress",
          success: "You're welcome 😊! Account successfully created.",
        }
      );

      if (response?.status === 201) {
        //console.log(response.data);
        setUserInfo(response.data);
        navigate("/");
      }
    } catch (e) {
      //console.log(e.response?.data?.error);

      toast.error(e.response?.data?.error || "Something went wrong, please try again later.");
    }
    setIsSubmitting(false);
  };

  const requirements = [
    { label: "At least one lowercase letter (a-z)", regex: /[a-z]/ },
    { label: "At least one uppercase letter (A-Z)", regex: /[A-Z]/ },
    { label: "At least one digit (0-9)", regex: /\d/ },
    { label: "At least one special character", regex: /[^a-zA-Z0-9]/ }, // Adjusted regex
    { label: "Minimum length of 8 characters", regex: /.{8,}/ },
  ];

  const checkRequirements = (value) => {
    return requirements.map(({ label, regex }) => (
      <li key={label} className="flex items-center gap-x-2">
        <FaCheckCircle
          className={
            value.match(regex)
              ? "text-green-600 dark:text-green-500"
              : "text-gray-300 dark:text-gray-700"
          }
        />
        {label}
      </li>
    ));
  };

  return (
    <section
      id="registration-section"
      className="h-full bg-main dark:bg-dark-main"
    >
      {/* Container */}
      <div className="mx-auto">
        <div className="flex justify-center px-6 py-12">
          {/* Row */}
          <div className="w-full xl:w-3/4 lg:w-11/12 flex">
            {/* Col */}
            <div className="side-image w-full h-auto bg-gray-400 dark:bg-gray-800 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg" />
            {/* Col */}
            <div className="w-full lg:w-7/12 bg-white dark:bg-gray-700 p-5 rounded-lg lg:rounded-l-none">
              <h3 className="py-4 text-2xl text-center text-gray-800 dark:text-white">
                Create an Account!
              </h3>
              <form
                className="px-8 pt-6 pb-8 bg-white dark:bg-gray-800 rounded"
                onSubmit={handleSubmit}
              >
                <div className="mb-4 md:flex md:justify-between">
                  <div className="mb-4 md:mr-2 md:w-1/2 md:mb-0">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                      htmlFor="firstName"
                    >
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight bg-white dark:bg-gray-700 dark:text-main border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="firstName"
                      name="firstName"
                      value={user.firstName}
                      onChange={handleChange}
                      type="text"
                      placeholder="First Name"
                      required
                    />
                  </div>
                  <div className="md:ml-2 md:w-1/2">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                      htmlFor="lastName"
                    >
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight bg-white dark:bg-gray-700 dark:text-main border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="lastName"
                      name="lastName"
                      value={user.lastName}
                      onChange={handleChange}
                      type="text"
                      placeholder="Last Name"
                      required
                    />
                  </div>
                </div>
                <div className="mb-4 md:flex md:justify-between">
                  <div className="mb-4 md:mr-2 md:w-1/2 md:mb-0">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                      htmlFor="email"
                    >
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight bg-white dark:bg-gray-700 dark:text-main border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="email"
                      name="email"
                      value={user.email}
                      onChange={handleChange}
                      type="email"
                      placeholder="Email"
                      required
                    />
                  </div>
                  <div className="md:ml-2 md:w-1/2">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                      htmlFor="lastName"
                    >
                      Country <span className="text-red-500">*</span>
                    </label>
                    <select
                      className="w-full px-3 py-2 text-sm leading-tight bg-white dark:bg-gray-700 dark:text-main border rounded shadow appearance-none"
                      id="country"
                      name="country"
                      ref={selectedCountryRef}
                      required
                    >
                      <option disabled selected value="">
                        Select Country
                      </option>
                      {countries.map((country) => (
                        <option
                          value={country}
                          selected={country === user.country}
                        >
                          {country}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="mb-4 ">
                  <div className="mb-4 md:mb-0">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                      htmlFor="password"
                    >
                      Password <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight bg-white dark:bg-gray-700 dark:text-main border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="password"
                      name="password"
                      value={user.password}
                      onChange={handleChange}
                      type="password"
                      placeholder="******************"
                      pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                      title="Please fulfill all password requirements."
                      required
                    />
                    <ul className="mb-4 dark:text-gray-400">
                      {checkRequirements(user.password)}
                    </ul>
                  </div>
                  <div className="">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                      htmlFor="c_password"
                    >
                      Confirm Password <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight bg-white dark:bg-gray-700 dark:text-main border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="c_password"
                      name="c_password"
                      value={user.c_password}
                      onChange={handleChange}
                      type="password"
                      placeholder="******************"
                      required
                    />
                  </div>
                  {user.password !== user.c_password && user.c_password && (
                    <p className="text-xs italic text-red-500">
                      Passwords do not match
                    </p>
                  )}
                  {user.password === user.c_password && user.c_password && (
                    <p className="text-xs italic text-green-800">
                      Passwords match
                    </p>
                  )}
                </div>
                <div className="mb-6 text-center">
                  <button
                    className={`w-full ${
                      !isSubmitting && "btn"
                    } px-4 py-2 font-bold rounded-full`}
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Register Account
                  </button>
                </div>
                <hr className="mb-6 border-t" />
                <div className="text-center">
                  <Link
                    to="/login"
                    className="inline-block text-sm align-baseline link"
                  >
                    Already have an account? Login!
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

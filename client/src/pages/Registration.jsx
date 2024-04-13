import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SERVER_URL } from '../utils';
import { useUserInfo } from "../contexts/UserContext";

export default function Registration() {
  const [user, setUser] = useState({ firstName: "", lastName: "", email: "", password: "", c_password: "" });
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
          //   console.log(countries);
          setCountries(countries);
        }
      })
      .catch((e) => {
        console.log(e);
      });

    return () => {
      ignore = true;
    };
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log(user);

    if (user.password !== user.c_password) {
      return console.log("Passwords do not match");
    }

    register({...user, country: selectedCountryRef.current.value});
  }

  const register = async (user) => {
    console.log("passwords match");

    try {
      const response = await axios.post(`${SERVER_URL}/api/auth/register`, user, { withCredentials: true });
      if (response?.status === 201) {
        console.log(response.data);
        setUserInfo(response.data);
        navigate("/");
      }
    } catch (e) {
      console.log(e.response?.data?.error);
    }
    setIsSubmitting(false);
  }

  return (
    <section id="registration-section" className="h-full bg-gray-400 dark:bg-dark-main">
      {/* Container */}
      <div className="mx-auto">
        <div className="flex justify-center px-6 py-12">
          {/* Row */}
          <div className="w-full xl:w-3/4 lg:w-11/12 flex">
            {/* Col */}
            <div
              className="side-image w-full h-auto bg-gray-400 dark:bg-gray-800 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
            />
            {/* Col */}
            <div className="w-full lg:w-7/12 bg-white dark:bg-gray-700 p-5 rounded-lg lg:rounded-l-none">
              <h3 className="py-4 text-2xl text-center text-gray-800 dark:text-white">
                Create an Account!
              </h3>
              <form className="px-8 pt-6 pb-8 mb-4 bg-white dark:bg-gray-800 rounded" onSubmit={handleSubmit}>
                <div className="mb-4 md:flex md:justify-between">
                  <div className="mb-4 md:mr-2 md:w-1/2 md:mb-0">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                      htmlFor="firstName"
                    >
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:bg-dark-main dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="firstName"
                      name="firstName"
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
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:bg-dark-main dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="lastName"
                      name="lastName"
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
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:bg-dark-main dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="email"
                      name="email"
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
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:bg-dark-main dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
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
                <div className="mb-4 md:flex md:justify-between">
                  <div className="mb-4 md:mr-2 md:w-1/2 md:mb-0">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                      htmlFor="password"
                    >
                      Password <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:bg-dark-main dark:text-white border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="password"
                      name="password"
                      onChange={handleChange}
                      type="password"
                      placeholder="******************"
                      required
                    />
                    <p className="text-xs italic text-red-500">
                      Please choose a password.
                    </p>
                  </div>
                  <div className="md:ml-2 md:w-1/2">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                      htmlFor="c_password"
                    >
                      Confirm Password <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:bg-dark-main dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="c_password"
                      name="c_password"
                      onChange={handleChange}
                      type="password"
                      placeholder="******************"
                      required
                    />
                  </div>
                </div>
                <div className="mb-6 text-center">
                  <button
                    className={`w-full ${!isSubmitting && "btn"} px-4 py-2 font-bold rounded-full`}
                    type="submit"
                  >
                    Register Account
                  </button>
                </div>
                <hr className="mb-6 border-t" />
                <div className="text-center">
                  <Link to="/login"
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
  )
}

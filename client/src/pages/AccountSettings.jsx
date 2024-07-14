import { forwardRef, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserInfo } from "../contexts/UserContext";
import axios from "axios";
import { toast } from "react-toastify";
import CustomHelmet from "../SEO/CustomHelmet";
import { SERVER_URL } from "../utils";

export default function AccountSettings() {
  const [user, setUser] = useState({});
  const { userInfo } = useUserInfo();
  const [countries, setCountries] = useState([]);
  const modalButtonRef = useRef();
  useEffect(() => {
    let ignore = false;
    axios
      .get(`${SERVER_URL}/api/user/profile/${userInfo._id}`)
      .then((response) => {
        if (!ignore) {
          setUser(response.data);
        }
      })
      .catch((e) => {});

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
        console.log(e);
      });

    return () => {
      ignore = true;
    };
  }, [userInfo._id]);

  const handleChangeUser = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleChangeFile = (e, id) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const imageSrc = event.target.result;
      document.getElementById(id).src = imageSrc;
    };
    setUser({ ...user, [e.target.name]: e.target.files[0] });
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    modalButtonRef.current.click();
  };

  return (
    <section className="py-10 my-auto bg-white dark:bg-dark-main">
      <div className="lg:w-[80%] md:w-[90%] xs:w-[96%] mx-auto flex gap-4">
        <div className="lg:w-[88%] md:w-[80%] sm:w-[88%] xs:w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center dark:bg-gray-800/40">
          {/*  */}
          <div className="">
            <h1 className="lg:text-3xl md:text-2xl sm:text-xl xs:text-xl font-extrabold mb-2 dark:text-white">
              Profile
            </h1>
            <h2 className="text-grey text-sm mb-4 dark:text-gray-400">
              Update Profile
            </h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              {/* Cover Image */}
              {/* <div className="w-full rounded-sm bg-cover bg-center bg-no-repeat items-center" style={{ background: `url('${user.cover}')` }}> */}
              <div
                className="w-full h-[312px] xl:h-[20rem] lg:h-[18rem] md:h-[16rem] sm:h-[14rem] xs:h-[11rem] relative rounded-sm z-0 items-center"
                // style={{ backgroundImage: `url(${SERVER_URL}/${user.cover})` }}
              >
                <img
                  src={`${user.cover}`}
                  id="coverView"
                  style={{ zIndex: "-1" }}
                  className="absolute object-cover object-center w-full h-full rounded-sm  bg-center bg-no-repeat"
                  alt="cover img"
                />
                {/* Profile Image */}
                <div className="mx-auto flex justify-center w-[141px] absolute bottom-5  rounded-full right-[50%] translate-x-[50%] h-[141px] border border-gray-600">
                  <img
                    src={`${user.avatar}`}
                    id="avatarView"
                    className="absolute -z-10 rounded-full h-full w-full object-cover object-center"
                    alt="avatar"
                  />
                  <div className="bg-gray-800 rounded-full w-6 h-6 text-center ml-28 mt-4">
                    <input
                      type="file"
                      name="avatar"
                      id="avatar"
                      accept="image/*"
                      hidden
                      onChange={(e) => handleChangeFile(e, "avatarView")}
                      pattern="^(?=.*\.(jpg|jpeg|png)$)"
                    />
                    <label htmlFor="avatar">
                      <svg
                        data-slot="icon"
                        className="w-6 h-5 z-20 text-primary"
                        fill="none"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                        ></path>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                        ></path>
                      </svg>
                    </label>
                  </div>
                </div>
                <div className="flex justify-end">
                  <input
                    type="file"
                    id="cover"
                    name="cover"
                    onChange={(e) => handleChangeFile(e, "coverView")}
                    hidden
                    accept="image/*"
                    pattern="^(?=.*\.(jpg|jpeg|png)$)"
                  />
                  <div className="bg-gray-800 text-white absolute bottom-0 flex items-center gap-1 rounded-tl-md px-2 text-center font-semibold">
                    <label
                      htmlFor="cover"
                      className="inline-flex items-center gap-1 cursor-pointer"
                    >
                      Cover
                      <svg
                        data-slot="icon"
                        className="w-6 h-5 text-primary"
                        fill="none"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                        ></path>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                        ></path>
                      </svg>
                    </label>
                  </div>
                </div>
              </div>
              <h2 className="text-center mt-1 font-semibold dark:text-gray-300">
                General Information
              </h2>
              <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                <div className="w-full  mb-4 lg:mt-6">
                  <Input
                    label="First Name"
                    ph="First Name"
                    value={user.firstName}
                    name="firstName"
                    required={true}
                    handleChange={handleChangeUser}
                  />
                </div>
                <div className="w-full  mb-4 lg:mt-6">
                  <Input
                    label="Last Name"
                    ph="Last Name"
                    value={user.lastName}
                    name="lastName"
                    required={true}
                    handleChange={handleChangeUser}
                  />
                </div>
              </div>

              <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                <div className="w-full  mb-4 lg:mt-2">
                  <Input
                    label="Email"
                    ph="name@example.com"
                    value={user.email}
                    name="email"
                    type="email"
                    disabled={true}
                    required={true}
                    handleChange={handleChangeUser}
                  />
                </div>
                <div className="w-full mb-4 lg:mt-2">
                  <label className="dark:text-gray-300 mb-2">Country</label>
                  <select
                    className="w-full mt-2 text-grey border-2 rounded-lg p-4 pl-2 pr-2 bg-white dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                    id="country"
                    name="country"
                    value={user.country}
                    // ref={selectedCountryRef}
                    onChange={handleChangeUser}
                    // defaultValue={user.country}
                  >
                    <option disabled value="">
                      Select Country
                    </option>
                    {countries.map((country, index) => (
                      <option value={country} key={index}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="w-full mb-4 lg:mt-2">
                <label htmlFor="bio" className="mb-2 dark:text-gray-300">
                  Bio
                </label>
                <textarea
                  className="mt-2 p-2 w-full border-2 rounded-lg bg-white dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                  rows={7}
                  placeholder="Bloggen Star ⭐❤️"
                  id="bio"
                  name="bio"
                  onChange={handleChangeUser}
                  value={user.bio}
                />
              </div>

              <h2 className="text-center mt-20 mb-5 font-semibold dark:text-gray-300">
                Additional Information
              </h2>
              <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                <div className="w-full  mb-4 lg:mt-6">
                  <Input
                    label="LinkedIn"
                    ph="https://linkedin.com/in/profile-url"
                    name="linkedIn"
                    value={user.linkedIn}
                    pattern="^(https?:\/\/)?(www\.)?linkedin\.com\/.*$"
                    handleChange={handleChangeUser}
                  />
                </div>
                <div className="w-full  mb-4 lg:mt-6">
                  <Input
                    label="Twitter"
                    ph="twitter.com/username"
                    name="twitter"
                    value={user.twitter}
                    pattern="^(https?:\/\/)?(www\.)?twitter\.com\/([A-Za-z0-9_]{1,15})\/?$"
                    handleChange={handleChangeUser}
                  />
                </div>
              </div>
              <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                <div className="w-full  mb-4 lg:mt-6">
                  <Input
                    label="Facebook"
                    ph="https://www.facebook.com/username"
                    name="facebook"
                    value={user.facebook}
                    pattern="^^(https?:\/\/)?(www\.)?facebook\.com\/[a-zA-Z0-9.]+\/?$"
                    handleChange={handleChangeUser}
                  />
                </div>
                <div className="w-full  mb-4 lg:mt-6">
                  <Input
                    label="YouTube"
                    ph="https://www.youtube.com/@username"
                    name="youtube"
                    value={user.youtube}
                    handleChange={handleChangeUser}
                  />
                </div>
              </div>
              <div className="w-full  mb-4 lg:mt-4">
                <Input
                  label="Website"
                  ph="www.mywebsite.com"
                  name="website"
                  value={user.website}
                  handleChange={handleChangeUser}
                />
              </div>

              <div className="w-full rounded-lg btn white text-lg font-semibold mt-10">
                <button type="submit" className="w-full p-4">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ConfirmModal ref={modalButtonRef} user={user} />
    </section>
  );
}

const Input = ({
  label,
  ph,
  type = "text",
  value = "",
  name = "",
  required = false,
  disabled = false,
  handleChange,
  pattern,
}) => {
  return (
    <>
      <label htmlFor={name} className="mb-2 dark:text-gray-300">
        {label}
      </label>
      <input
        type={type}
        className="mt-2 p-4 w-full border-2 rounded-lg bg-white dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
        placeholder={ph}
        required={required}
        disabled={disabled}
        value={value}
        id={name}
        name={name}
        onChange={handleChange}
        pattern={pattern}
      />
    </>
  );
};

const ConfirmModal = forwardRef((props, ref) => {
  const { user } = props;
  const closeButtonRef = useRef();
  const [password, setPassword] = useState("");
  const { resetUserInfo } = useUserInfo();
  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      const formData = new FormData();

      formData.append("user", JSON.stringify(user));
      formData.append("password", password);
      formData.append("avatar", user.avatar);
      formData.append("cover", user.cover);

      const response = await toast.promise(
        axios.patch(`${SERVER_URL}/api/user/profile/update`, formData, {
          withCredentials: true,
        }),
        {
          pending: "Profile update in progress",
        }
      );
      if (response.status === 200) {
        toast.success(response.data?.message);
        window.scrollTo({ top: 0 });
        resetUserInfo();
        navigate(`/profile/${user._id}`);
        // window.location.reload();
      }
      setIsUpdating(false);
    } catch (e) {
      //console.log(e);
      toast.error(
        e.response?.data?.error ||
          "Something went wrong, please try again later."
      );
      setIsUpdating(false);
    }

    closeButtonRef.current.click();
  };

  return (
    <div>
      <CustomHelmet title="Account Settings" />
      {/* Button trigger vertically centered modal*/}
      <button
        className="hidden"
        ref={ref}
        data-twe-toggle="modal"
        data-twe-target="#confirmModal"
        data-twe-ripple-init=""
        data-twe-ripple-color="light"
      ></button>
      {/*Vertically centered modal*/}
      <div
        data-twe-modal-init=""
        className="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
        id="confirmModal"
        tabIndex={-1}
        aria-labelledby="confirmModalTitle"
        aria-modal="true"
        role="dialog"
      >
        <div
          data-twe-modal-dialog-ref
          className="pointer-events-none relative flex min-h-[calc(100%-1rem)] w-auto translate-y-[-50px] items-center opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:min-h-[calc(100%-3.5rem)] min-[576px]:max-w-[500px]"
        >
          <div className="pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-4 outline-none dark:bg-surface-dark">
            <div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 p-4 dark:border-white/10">
              {/* Modal title */}
              <h5
                className="text-xl font-medium leading-normal text-dark-main dark:text-white"
                id="confirmModalTitle"
              >
                Update Profile
              </h5>
              {/* Close button */}
              <button
                type="button"
                ref={closeButtonRef}
                className="box-content rounded-none border-none text-neutral-500 hover:text-neutral-800 hover:no-underline focus:text-neutral-800 focus:opacity-100 focus:shadow-none focus:outline-none dark:text-neutral-400 dark:hover:text-neutral-300 dark:focus:text-neutral-300"
                data-twe-modal-dismiss
                aria-label="Close"
              >
                <span className="[&>svg]:h-6 [&>svg]:w-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </span>
              </button>
            </div>
            {/* Modal body */}
            <form
              id="passwordForm"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              className="relative p-4 text-dark-main dark:text-white"
            >
              <input
                type="password"
                className="peer block min-h-[auto] w-full rounded bg-transparent border border-black mt-5 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="********"
              />
              <label
                htmlFor="password"
                className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
              >
                Password input
              </label>
            </form>
            {/* Modal footer */}
            <div className="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 p-4 dark:border-white/10">
              <button
                type="submit"
                form="passwordForm"
                className={`ms-1 inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal bg-gray-500 ${
                  isUpdating ? "cursor-wait" : "btn"
                } `}
                data-twe-ripple-color="light"
                disabled={isUpdating}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

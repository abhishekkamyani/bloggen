import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { SERVER_URL, removeHTTP } from "../utils";
import { capitalizeEveryFirstChar } from "../utils";
import { FaFacebook, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";
import ImageLoader from "../components/loaders/ImageLoader";
import { format } from "date-fns";
import Posts from "../components/Posts";
import { useLoadingBarProgress } from "../contexts/LoadingBarContext";
import CustomHelmet from "../SEO/CustomHelmet";

export default function Profile() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [isFetched, setIsFetched] = useState(false);
  const { setProgress } = useLoadingBarProgress();
  const navigate = useNavigate();

  useEffect(() => {
    setProgress(30);
    window.scrollTo({
      top: 0,
    });
    let ignore = false;
    axios
      .get(`${SERVER_URL}/api/user/profile/${id}`)
      .then((response) => {
        setProgress(60);
        if (!ignore && response.status === 200) {
          console.log(response.data);
          setUser(response.data);
          setProgress(100);
        }

        setIsFetched(true);
      })
      .catch((e) => {
        setIsFetched(true);
        setProgress(100);
        e.response?.status === 404 && navigate("../not-found");
      });

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <section className="w-full overflow-hidden bg-main dark:bg-dark-main">
      <CustomHelmet
        title={`Meet ${capitalizeEveryFirstChar(
          user.firstName + " " + user.lastName
        )} on Bloggen`}
        description={user.bio}
        author={`${user.firstName} ${user.lastName}`}
        image={user.avatar}
        url={window.location.href}
      />
      <div className="flex flex-col">
        {/* Cover Image */}
        <ImageLoader
          src={`${user.cover}`}
          alt="User Cover"
          className="w-full xl:h-[20rem] object-cover object-center lg:h-[18rem] md:h-[16rem] sm:h-[14rem] xs:h-[11rem]"
        />

        {/* Profile Image */}
        <div className="sm:w-[80%] xs:w-[90%] mx-auto flex">
          <ImageLoader
            src={user.avatar}
            alt="User Profile"
            className="rounded-md  object-cover object-center lg:w-[12rem] lg:h-[12rem] md:w-[10rem] md:h-[10rem] sm:w-[8rem] sm:h-[8rem] xs:w-[7rem] xs:h-[7rem] outline outline-2 outline-offset-2 outline-primary relative lg:bottom-[5rem] sm:bottom-[4rem] xs:bottom-[3rem]"
          />
          {/* FullName */}
          <div className="w-full my-4 sm:mx-4 xs:pl-4 text-gray-800 dark:text-white ">
            <h1 className="text-left lg:text-4xl md:text-3xl sm:text-3xl xs:text-xl">
              {(
                (user.firstName || " ") +
                " " +
                (user.lastName || " ")
              ).toUpperCase()}
            </h1>
            {user.dateJoined && (
              <p className="my-3 text-sm">
                Member Since:{" "}
                {format(new Date(user?.dateJoined), "MMM d, y")}
              </p>
            )}
          </div>
        </div>
        <div className="xl:w-[80%] lg:w-[90%] md:w-[90%] sm:w-[92%] xs:w-[90%] mx-auto flex flex-col gap-4 items-center relative lg:-top-8 md:-top-6 sm:-top-4 xs:-top-4">
          {/* Bio */}
          <p className="w-fit text-gray-700 dark:text-gray-400 text-md">
            {user.bio}
          </p>
          {/* Detail */}
          <div className="w-full my-auto py-6 flex flex-col justify-center gap-2">
            <div className="w-full flex sm:flex-row xs:flex-col gap-2 justify-center">
              <div className="w-full">
                <dl className="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                  <div className="flex flex-col pb-3">
                    <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                      Name
                    </dt>
                    <dd className="text-lg font-semibold capitalize">
                        {(user.firstName || " ") + " " + (user.lastName || " ")}
                    </dd>
                  </div>
                  <div className="flex flex-col py-3">
                    <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                      Email
                    </dt>
                    <dd className="text-lg font-semibold">{user.email}</dd>
                  </div>
                </dl>
              </div>
              <div className="w-full">
                <dl className="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                  <div className="flex flex-col pb-3">
                    <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                      Country
                    </dt>
                    <dd className="text-lg font-semibold capitalize">{user.country}
                    </dd>
                  </div>
                  {user.website && (
                    <div className="flex flex-col pt-3">
                      <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                        Website
                      </dt>
                      <a
                        href={
                          (!user.website.startsWith("http") ? "http://" : "") +
                          user.website
                        }
                        target="_blank"
                        className="text-lg font-semibold"
                      >
                        {removeHTTP(user.website)}
                      </a>
                    </div>
                  )}
                </dl>
              </div>
            </div>
            {user.posts?.length > 0 && (
              <div className="mt-10">
                {/*  */}
                <div className="flex items-center justify-between px-6 lg:px-8 pb-6">
                  <h1 className="w-fit font-serif my-4 rounded-b-md border-b-4 border-primary dark:border-b-4 dark:border-primary-light dark:text-white lg:text-4xl md:text-3xl xs:text-xl">
                    Popular Posts
                  </h1>
                  <Link
                    to={`/blogs/?user=${id}`}
                    className="btn px-3 py-1 md:px-6 md:py-2 text-sm md:text-md rounded-lg"
                  >
                    All Post
                  </Link>
                </div>
                <Posts posts={user?.posts || []} isFetched={isFetched} />
              </div>
            )}
          </div>
          {/* Social Links */}
          <div className="fixed right-2 bottom-20 flex flex-col rounded-sm bg-gray-200 text-gray-500 dark:bg-gray-200/80 dark:text-gray-700 hover:text-gray-600 hover:dark:text-gray-400">
            {user.linkedIn && (
              <SocialMedia url={user.linkedIn}>
                <FaLinkedin className="lg:w-6 lg:h-6 xs:w-4 xs:h-4 text-linkedIn" />
              </SocialMedia>
            )}
            {user.youtube && (
              <SocialMedia url={user.youtube}>
                <FaYoutube className="lg:w-6 lg:h-6 xs:w-4 xs:h-4 text-youtube" />
              </SocialMedia>
            )}
            {user.facebook && (
              <SocialMedia url={user.facebook}>
                <FaFacebook className="lg:w-6 lg:h-6 xs:w-4 xs:h-4 text-facebook" />
              </SocialMedia>
            )}
            {user.twitter && (
              <SocialMedia url={user.twitter}>
                <FaTwitter className="lg:w-6 lg:h-6 xs:w-4 xs:h-4 text-twitter" />
              </SocialMedia>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

const SocialMedia = ({ url, children }) => {
  let updatedUrl = url;
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    updatedUrl = "http://" + url;
  }
  return (
    <a href={updatedUrl} target="_blank">
      <div className="p-2 hover:text-primary hover:dark:text-primary">
        {children}
      </div>
    </a>
  );
};

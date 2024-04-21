import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom';
import { SERVER_URL, capitalizeFirstChar, removeHTTP } from "../utils";
import { capitalizeEveryFirstChar } from "../utils";
import { FaFacebook, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";
import ImageLoader from "../loaders/ImageLoader";
import { format } from "date-fns";

export default function Profile() {    
    const {id} = useParams();
    const [user, setUser] = useState({});

    useEffect(() => {

        window.scrollTo({
            top: 0
        })

        let ignore = false;
        axios.get(`${SERVER_URL}/api/user/profile/${id}`)
            .then(response => {
                if (!ignore) {
                    //console.log(response.data);
                    setUser(response.data);
                }
            })
            .catch(e => {
                //console.log(e.response?.data?.error);
            })

        return () => {
            ignore = true;
        }
    }, [])

    return (
        <section className="w-full overflow-hidden bg-main dark:bg-dark-main">
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
                            {(user.firstName + " " + user.lastName).toUpperCase()}
                        </h1>
                        <p className="my-3 text-sm">Member Since: {format(new Date(user?.dateJoined), "MMM d, y")}</p>
                    </div>
                </div>
                <div className="xl:w-[80%] lg:w-[90%] md:w-[90%] sm:w-[92%] xs:w-[90%] mx-auto flex flex-col gap-4 items-center relative lg:-top-8 md:-top-6 sm:-top-4 xs:-top-4">
                    {/* Bio */}
                    <p className="w-fit text-gray-700 dark:text-gray-400 text-md">{user.bio}</p>
                    {/* Detail */}
                    <div className="w-full my-auto py-6 flex flex-col justify-center gap-2">
                        <div className="w-full flex sm:flex-row xs:flex-col gap-2 justify-center">
                            <div className="w-full">
                                <dl className="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                                    <div className="flex flex-col pb-3">
                                        <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                                            Name
                                        </dt>
                                        <dd className="text-lg font-semibold">{capitalizeEveryFirstChar(user.firstName + " " + user.lastName)}</dd>
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
                                        <dd className="text-lg font-semibold">
                                            {capitalizeFirstChar(user.country)}
                                        </dd>
                                    </div>
                                    {user.website && (
                                        <div className="flex flex-col pt-3">
                                            <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                                                Website
                                            </dt>
                                            <a href={(!user.website.startsWith("http") ? "http://" : "") + user.website} target="_blank" className="text-lg font-semibold">{removeHTTP(user.website)}</a>
                                        </div>
                                    )}
                                </dl>
                            </div>
                        </div>
                        <div className="my-10 lg:w-[70%] md:h-[14rem] xs:w-full xs:h-[10rem]">
                            {/*  */}
                            <h1 className="w-fit font-serif my-4 pb-1 pr-2 rounded-b-md border-b-4 border-primary dark:border-b-4 dark:border-yellow-600 dark:text-white lg:text-4xl md:text-3xl xs:text-xl">
                                Popular Posts
                            </h1>
                            {/* Location */}
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d252230.02028974562!2d38.613328040215286!3d8.963479542403238!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85cef5ab402d%3A0x8467b6b037a24d49!2sAddis%20Ababa!5e0!3m2!1sen!2set!4v1710567234587!5m2!1sen!2set"
                                className="rounded-lg w-full h-full"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </div>
                    {/* Social Links */}
                    <div className="fixed right-2 bottom-20 flex flex-col rounded-sm bg-gray-200 text-gray-500 dark:bg-gray-200/80 dark:text-gray-700 hover:text-gray-600 hover:dark:text-gray-400">
                        {user.linkedIn && (
                            <SocialMedia url={user.linkedIn}>
                                <FaLinkedin className="lg:w-6 lg:h-6 xs:w-4 xs:h-4 text-[#0A66C2]" />
                            </SocialMedia>
                        )}
                        {user.youtube && (
                            <SocialMedia url={user.youtube} >
                                <FaYoutube className="lg:w-6 lg:h-6 xs:w-4 xs:h-4 text-[#FF0000]" />
                            </SocialMedia>
                        )}
                        {user.facebook && (
                            <SocialMedia url={user.facebook} >
                                <FaFacebook className="lg:w-6 lg:h-6 xs:w-4 xs:h-4 text-[#1877F2]" />
                            </SocialMedia>
                        )}
                        {user.twitter && (
                            <SocialMedia url={user.twitter}>
                                <FaTwitter className="lg:w-6 lg:h-6 xs:w-4 xs:h-4 text-[#1DA1F2]" />
                            </SocialMedia>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}


const SocialMedia = ({ url, children }) => {
    let updatedUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        updatedUrl = 'http://' + url;
    }
    return (
        <a href={updatedUrl} target="_blank">
            <div className="p-2 hover:text-primary hover:dark:text-primary">
                {/* <svg
                    className="lg:w-6 lg:h-6 xs:w-4 xs:h-4 text-gray-900"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path d="M13.795 10.533 20.68 2h-3.073l-5.255 6.517L7.69 2H1l7.806 10.91L1.47 22h3.074l5.705-7.07L15.31 22H22l-8.205-11.467Zm-2.38 2.95L9.97 11.464 4.36 3.627h2.31l4.528 6.317 1.443 2.02 6.018 8.409h-2.31l-4.934-6.89Z" />
                </svg> */}
                {children}
            </div>
        </a>
    );
}

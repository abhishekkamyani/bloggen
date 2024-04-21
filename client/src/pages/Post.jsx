import { useEffect, useState } from "react";
import { formatDistance } from "date-fns";
import axios from "axios";
import { SERVER_URL, capitalizeFirstChar } from "../utils";
import { Link, useParams } from "react-router-dom";
import "../css/like-button.css";
import { useUserInfo } from "../contexts/UserContext";

export default function Post() {
    const [post, setPost] = useState('');
    const { slug } = useParams();
    const { userInfo } = useUserInfo();
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        window.scroll({ top: 0 })

        let ignore = false;
        axios.get(`${SERVER_URL}/api/post/${slug}`)
            .then(response => {
                if (response.status === 200 && !ignore) {
                    console.log(response.data);
                    setPost(response.data);
                }
            })
            .catch(e => {
                //console.log(e);
                //console.log(e.response?.data?.error);
            })

        return () => {
            ignore = true;
        }
    }, [])

    useEffect(() => {
        let ignore = false;
        if (!ignore && userInfo._id && post._id) {
            setLiked(post.likers?.includes(userInfo._id));
            console.log("useffected of like");
        }
        return () => {
            ignore = true;
        }
    }, [userInfo._id, post._id])


    const handleLike = () => {
        if (!liked) {
            axios.patch(`${SERVER_URL}/api/post/${post._id}/like`, {}, { withCredentials: true })
                .then(response => {
                    console.log(response.data);
                    setPost({ ...post, likers: response.data.likers });
                    setLiked(true);
                })
                .catch(e => {
                    console.log(e);
                    console.log(e.response?.data?.error);
                })
        }
        else {
            axios.patch(`${SERVER_URL}/api/post/${post._id}/dislike`, {}, { withCredentials: true })
                .then(response => {
                    console.log(response.data);
                    setPost({ ...post, likers: response.data.likers });
                    setLiked(false);
                })
                .catch(e => {
                    console.log(e);
                    console.log(e.response?.data?.error);
                })
        }
    }


    return (
        <>
            {/* <PostEditor content={content} setContent={setContent} /> */}
            <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 antialiased">
                <div className="flex flex-col md:flex-row gap-10 px-5 md:px-10 lg:px-20">
                    <article className="w-full md:w-3/4 format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
                        <header className="mb-4 lg:mb-6 not-format">
                            <h1 className="text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
                                {post.title}
                            </h1>
                            <address className="flex items-center justify-between mt-12 mb-6 not-italic">
                                <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                                    {/* Avatar */}
                                    <img
                                        className="mr-4 w-16 h-16 object-cover rounded-full"
                                        src={post.author?.avatar}
                                        alt="Author Avatar"
                                    />
                                    <div>
                                        <Link
                                            to={`/profile/${post.author?._id}`}
                                            rel="author"
                                            className="text-xl font-bold text-gray-900 dark:text-white"
                                        >
                                            {capitalizeFirstChar(post.author?.firstName) + " " + capitalizeFirstChar(post.author?.lastName)}
                                        </Link>

                                        <p className="text-base text-gray-500 dark:text-gray-400">
                                            <time
                                                dateTime="2022-02-08"
                                                title="February 8th, 2022"
                                            >
                                                {formatDistance(new Date(post.createdAt ?? 0), new Date(), { addSuffix: true })}
                                            </time>
                                        </p>
                                    </div>
                                </div>

                                {/* Like Toggle Button */}

                                <div className="like-dislike-container border rounded-full bg-red-100 text-red-900 font-bold">
                                    <div className="icons">
                                        <label className="btn-label" htmlFor="like-checkbox">
                                            <span className="like-text-content">{post.likers?.length}</span>
                                            <input className="input-box" id="like-checkbox" type="checkbox" checked={liked} onChange={handleLike} />
                                            <svg
                                                className="svgs"
                                                id="icon-like-solid"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 512 512"
                                            >
                                                <path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z" />
                                            </svg>
                                            <svg
                                                className="svgs"
                                                id="icon-like-regular"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 512 512"
                                            >
                                                <path d="M323.8 34.8c-38.2-10.9-78.1 11.2-89 49.4l-5.7 20c-3.7 13-10.4 25-19.5 35l-51.3 56.4c-8.9 9.8-8.2 25 1.6 33.9s25 8.2 33.9-1.6l51.3-56.4c14.1-15.5 24.4-34 30.1-54.1l5.7-20c3.6-12.7 16.9-20.1 29.7-16.5s20.1 16.9 16.5 29.7l-5.7 20c-5.7 19.9-14.7 38.7-26.6 55.5c-5.2 7.3-5.8 16.9-1.7 24.9s12.3 13 21.3 13L448 224c8.8 0 16 7.2 16 16c0 6.8-4.3 12.7-10.4 15c-7.4 2.8-13 9-14.9 16.7s.1 15.8 5.3 21.7c2.5 2.8 4 6.5 4 10.6c0 7.8-5.6 14.3-13 15.7c-8.2 1.6-15.1 7.3-18 15.1s-1.6 16.7 3.6 23.3c2.1 2.7 3.4 6.1 3.4 9.9c0 6.7-4.2 12.6-10.2 14.9c-11.5 4.5-17.7 16.9-14.4 28.8c.4 1.3 .6 2.8 .6 4.3c0 8.8-7.2 16-16 16H286.5c-12.6 0-25-3.7-35.5-10.7l-61.7-41.1c-11-7.4-25.9-4.4-33.3 6.7s-4.4 25.9 6.7 33.3l61.7 41.1c18.4 12.3 40 18.8 62.1 18.8H384c34.7 0 62.9-27.6 64-62c14.6-11.7 24-29.7 24-50c0-4.5-.5-8.8-1.3-13c15.4-11.7 25.3-30.2 25.3-51c0-6.5-1-12.8-2.8-18.7C504.8 273.7 512 257.7 512 240c0-35.3-28.6-64-64-64l-92.3 0c4.7-10.4 8.7-21.2 11.8-32.2l5.7-20c10.9-38.2-11.2-78.1-49.4-89zM32 192c-17.7 0-32 14.3-32 32V448c0 17.7 14.3 32 32 32H96c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32H32z" />
                                            </svg>
                                            <div className="fireworks">
                                                <div className="checked-like-fx" />
                                            </div>
                                        </label>
                                    </div>
                                </div>

                            </address>
                        </header>

                        <figure>
                            <img
                                src={post.blogCover}
                                style={{ maxHeight: "500px" }}
                                alt="blog cover"
                            />
                        </figure>

                        <section className="mt-20">
                            <div className="quill-content" dangerouslySetInnerHTML={{ __html: post.content }} />

                        </section>

                        <summary>

                        </summary>

                    </article>
                    <div className="px-4 w-1/2 md:w-1/4 md:h-screen my-auto text-black dark:text-white">
                        <div className="p-4 bg-slate-300 dark:bg-slate-900 py-6 rounded">
                            <h2 className="text-xl font-bold mb-4">Categories</h2>
                            <ul className="list-disc list-inside">
                                {post?.categories?.map(category => (
                                    <li key={category._id} className="mb-2">
                                        <Link to={`/posts?category=${category.name}`} className="hover:text-gray-500 dark:hover:text-gray-300">
                                            {category.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
            <aside
                aria-label="Related articles"
                className="py-8 lg:py-24 bg-gray-50 dark:bg-gray-800"
            >
                <div className="px-4 mx-auto max-w-screen-xl">
                    <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">
                        Related articles
                    </h2>
                    <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
                        <article className="max-w-xs">
                            <a href="#">
                                <img
                                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-1.png"
                                    className="mb-5 rounded-lg"
                                    alt="Image 1"
                                />
                            </a>
                            <h2 className="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
                                <a href="#">Our first office</a>
                            </h2>
                            <p className="mb-4 text-gray-500 dark:text-gray-400">
                                Over the past year, Volosoft has undergone many changes! After
                                months of preparation.
                            </p>
                            <a
                                href="#"
                                className="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline"
                            >
                                Read in 2 minutes
                            </a>
                        </article>
                        <article className="max-w-xs">
                            <a href="#">
                                <img
                                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-2.png"
                                    className="mb-5 rounded-lg"
                                    alt="Image 2"
                                />
                            </a>
                            <h2 className="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
                                <a href="#">Enterprise design tips</a>
                            </h2>
                            <p className="mb-4  text-gray-500 dark:text-gray-400">
                                Over the past year, Volosoft has undergone many changes! After
                                months of preparation.
                            </p>
                            <a
                                href="#"
                                className="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline"
                            >
                                Read in 12 minutes
                            </a>
                        </article>
                        <article className="max-w-xs">
                            <a href="#">
                                <img
                                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-3.png"
                                    className="mb-5 rounded-lg"
                                    alt="Image 3"
                                />
                            </a>
                            <h2 className="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
                                <a href="#">We partnered with Google</a>
                            </h2>
                            <p className="mb-4  text-gray-500 dark:text-gray-400">
                                Over the past year, Volosoft has undergone many changes! After
                                months of preparation.
                            </p>
                            <a
                                href="#"
                                className="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline"
                            >
                                Read in 8 minutes
                            </a>
                        </article>
                        <article className="max-w-xs">
                            <a href="#">
                                <img
                                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-4.png"
                                    className="mb-5 rounded-lg"
                                    alt="Image 4"
                                />
                            </a>
                            <h2 className="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
                                <a href="#">Our first project with React</a>
                            </h2>
                            <p className="mb-4  text-gray-500 dark:text-gray-400">
                                Over the past year, Volosoft has undergone many changes! After
                                months of preparation.
                            </p>
                            <a
                                href="#"
                                className="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline"
                            >
                                Read in 4 minutes
                            </a>
                        </article>
                    </div>
                </div>
            </aside>
        </>
    )
}
import { useEffect, useState } from "react"
import PostEditor from "../components/PostEditor";
import axios from "axios";
import { SERVER_URL, capitalizeFirstChar } from "../utils";
import { Link } from "react-router-dom";

export default function Post() {
    const [content, setContent] = useState('');
    const [post, setPost] =  useState('');

    useEffect(() => {
      let ignore = false;
      axios.get(`${SERVER_URL}/api/post/title-hai-yeh-humhara-1712947002032`)
      .then(response => {
        if (response.status === 200 && !ignore) {
            console.log(response.data);
            setPost(response.data);
        }
      })
      .catch(e => {
        console.log(e);
         console.log(e.response?.data?.error);
       })
    
      return () => {
        ignore = true;
      }
    }, [])
    

    return (
        <>
            {/* <PostEditor content={content} setContent={setContent} /> */}
            <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 antialiased">
                <div className="flex flex-col md:flex-row gap-10 items-center px-5 md:px-10">
                    <article className="w-full format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
                        <header className="mb-4 lg:mb-6 not-format">
                            <address className="flex items-center mb-6 not-italic">
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
                                                pubdate=""
                                                dateTime="2022-02-08"
                                                title="February 8th, 2022"
                                            >
                                                {/* Feb. 8, 2022 */}
                                            </time>
                                            {new Date().toString(post.createdAt)}
                                        </p>
                                    </div>
                                </div>
                            </address>
                            <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
                                Best practices for successful prototypes
                            </h1>
                        </header>

                        <figure>
                            <img
                                src="https://flowbite.s3.amazonaws.com/typography-plugin/typography-image-1.png"
                                alt="author avatar"
                            />
                        </figure>

                        <section>
                            <div className="quill-content" dangerouslySetInnerHTML={{ __html: content }} />

                        </section>

                        <summary>

                        </summary>

                    </article>
                    <div className="px-4 w-1/2 md:w-1/4 text-black dark:text-white">
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
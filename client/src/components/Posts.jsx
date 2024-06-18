import Post from "./Post";
import PostLoader from "./loaders/PostLoader";

export default function Posts({ posts, isFetched }) {
  // if (isFetched &&) {
    
  // }
  return (
    <div className="relative px-6 lg:px-8 theme-switch-transition">
      <div className="absolute inset-0">
        <div className="h-1/3 sm:h-2/3" />
      </div>
      <div className="relative mx-auto max-w-7xl">
        {/* <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-main sm:text-4xl">
                        Column me neatly.
                    </h2>
                    <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 dark:text-gray-300 sm:mt-4">
                        This is your life and it's ending one minute @ a time...
                    </p>
                </div> */}
        <div className="mx-auto grid max-w-lg gap-10 lg:max-w-none lg:grid-cols-3 2xl:grid-cols-4">
          {isFetched
            ? posts.map((post) => <Post key={post._id} post={post} />)
            : Array(10)
                .fill(null)
                .map((_, index) => <PostLoader key={index} />)}
        </div>
      </div>
    </div>
  );
}

// <section className='grid grid-cols-1 mx-5 lg:mx-10 my-5 md:grid-cols-2 lg:grid-cols-4 gap-4 '>

// </section>

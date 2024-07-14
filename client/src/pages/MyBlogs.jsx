import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { SERVER_URL, capitalizeEveryFirstChar } from "../utils";
import axios from "axios";
import Posts from "../components/Posts";
import { toast } from "react-toastify";
import { useLoadingBarProgress } from "../contexts/LoadingBarContext";
import CustomHelmet from "../SEO/CustomHelmet";

export default function MyBlogs() {
  const [author, setAuthor] = useState({ posts: [] });
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const user = queryParams.get("user") || 1;
  const [isFetched, setIsFetched] = useState(false);
  const { setProgress } = useLoadingBarProgress();

  useEffect(() => {
    setProgress(30);
    window.scrollTo({
      top: 0,
    });
    let ignore = false;
    axios
      .get(`${SERVER_URL}/api/post/?user=${user}`)
      .then((response) => {
        setProgress(60);
        if (response.status === 200 && !ignore) {
          setAuthor(response.data);

          !response.data.posts.length &&
            toast.error("You haven't uploaded any blog post yet.");
        }
        setIsFetched(true);
        setProgress(100);
      })
      .catch((err) => {
        setIsFetched(true);
        toast.error("You haven't uploaded any blog post yet.");
        setProgress(100);
      });

    return () => {
      ignore = true;
    };
  }, [user]);

  if(!author.firstName){
    return <div></div>
  }

  return (
    <section className="py-10">
      <CustomHelmet
        title={`Read the blogs of ${capitalizeEveryFirstChar(
          author.firstName + " " + author.lastName
        )} on Bloggen`}
        description={author.bio}
        author={`${author.firstName} ${author.lastName}`}
        image={author.avatar}
        url={window.location.href}
      />
      <h2 className="text-center mb-7 text-2xl text-black dark:text-main capitalize">
        Read the blogs of <span> </span>
        <Link
          to={`/profile/${author._id}`}
          className="underline font-merriWeather"
        >
          {author.firstName + "-" + author.lastName}
        </Link>
      </h2>
      <Posts posts={author.posts} isFetched={isFetched} />
    </section>
  );
}

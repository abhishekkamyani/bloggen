import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { SERVER_URL } from "../utils";
import axios from "axios";
import Posts from "../components/Posts";

export default function MyBlogs() {
  const [author, setAuthor] = useState({ posts: [] });
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const user = queryParams.get("user") || 1;

  useEffect(() => {
    let ignore = false;
    axios
      .get(`${SERVER_URL}/api/post/?user=${user}`)
      .then((response) => {
        if (response.status === 200 && !ignore) {
          setAuthor(response.data);
          console.log(response.data);
        }
      })
      .catch((err) => console.log(err));

    return () => {
      ignore = true;
    };
  }, [user]);

  return (
    <section className="py-10">
      <h2 className="text-center mb-7 text-2xl text-black dark:text-main capitalize">
        Read the blogs of <span> </span>
        <Link
          to={`/profile/${author._id}`}
          className="underline font-merriWeather"
        >
          {author.firstName + "-" + author.lastName}
        </Link>
      </h2>
      <Posts posts={author.posts} />
    </section>
  );
}

import { useEffect, useState } from "react";
import { useUserInfo } from "../contexts/UserContext";
import axios from "axios";
import { SERVER_URL } from "../utils";
import Posts from "../components/Posts";
import { toast } from "react-toastify";
import { useLoadingBarProgress } from "../contexts/LoadingBarContext";
import CustomHelmet from "../SEO/CustomHelmet";

export default function FavoritesPosts() {
  const [posts, setPosts] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const { setProgress } = useLoadingBarProgress();

  useEffect(() => {
    setProgress(30);
    let ignore = false;
    axios
      .get(`${SERVER_URL}/api/post/likedPosts`, { withCredentials: true })
      .then((response) => {
        setProgress(60);
        if (response.status === 200 && !ignore) {
          console.log(response.data);
          setPosts(response.data);

          !response.data.length &&
            toast.error("You haven't liked any post yet");
          setProgress(100);
        }
        setIsFetched(true);
      })
      .catch((err) => {
        setProgress(100);
        setIsFetched(true);
      });

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <section className="py-10">
      <CustomHelmet title="Favorite Blog Posts" />
      <h2 className="text-center mb-7 text-2xl text-black dark:text-main capitalize border-b-2 border-primary rounded-md px-2 w-fit mx-auto">
        My Favorite Blogs
      </h2>
      <Posts posts={posts} isFetched={isFetched} />
    </section>
  );
}

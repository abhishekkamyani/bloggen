import { useEffect, useState } from "react";
import { useUserInfo } from "../contexts/UserContext";
import axios from "axios";
import { SERVER_URL } from "../utils";

export default function FavoritesPosts() {
  const [posts, setPosts] = useState([]);
  const { userInfo } = useUserInfo();

  useEffect(() => {
    let ignore = false;
    axios.get( `${SERVER_URL}/api/post/likedPosts`, {withCredentials: true})
    .then(response => {
        if (response.status === 200 && !ignore) {
            console.log(response.data);
        }
    })

    return () => {
      ignore = true;
    };
  }, [userInfo._id]);

  return (
    <section className="py-10">
      <h2 className="text-center mb-7 text-2xl text-black dark:text-main capitalize border-b-2 border-primary rounded-md px-2 w-fit mx-auto">
        My Favorite Blogs
      </h2>
      {/* <Posts posts={author.posts} /> */}
    </section>
  );
}

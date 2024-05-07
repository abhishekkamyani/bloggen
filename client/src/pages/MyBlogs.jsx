import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import { SERVER_URL, capitalizeFirstChar } from "../utils";
import axios from "axios";
import Posts from "../components/Posts";

export default function MyBlogs() {
   const [author, setAuthor] = useState({posts: []});
   const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const user = queryParams.get('user') || 1;

   useEffect(() => {
    let ignore = false;
      axios.get(`${SERVER_URL}/api/post/?user=${user}`).then((response) => {
         if (response.status === 200 && !ignore) {
            setAuthor(response.data);
            console.log(response.data);
         }
      });

      return () => {
         ignore = true;
      }
   }, [user]);

  return (
    <section>
        <h2>Read the blogs of {capitalizeFirstChar(author.firstName) + " " + capitalizeFirstChar(author.lastName)}</h2>
        <Posts posts={author.posts}/>
    </section>
  )
}

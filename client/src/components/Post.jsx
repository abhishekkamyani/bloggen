import React from "react";
import { capitalizeEveryFirstChar, capitalizeFirstChar } from "../utils";
import { format, formatDistance } from "date-fns";
import { Link } from "react-router-dom";
import ImageLoader from "./loaders/ImageLoader";
function Post({ post }) {
  const { author } = post;

  return (
    <div className="flex flex-col overflow-hidden rounded-lg shadow-lg outline outline-1">
      <div className="flex-shrink-0 relative">
        {/* <img
          className="h-48 w-full object-cover object-center"
          src={post.blogCover}
          alt="Blog cover"
        /> */}
        <ImageLoader
          src={post.blogCover}
          alt="Blog cover"
          className="h-48 w-full object-cover object-center"
        />
        <div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"></div>
      </div>
      <div className="flex flex-1 flex-col justify-between bg-white dark:bg-slate-700 p-6">
        <div className="flex-1">
          <Link to={`../post/${post.slug}`} className="mt-2 block">
            <p className="text-xl font-semibold text-gray-900 dark:text-main">
              {post.title}
            </p>
            <p className="mt-3 text-base text-gray-500 dark:text-gray-300 line-clamp-3">
              {post.summary}
            </p>
          </Link>
        </div>
        <div className="mt-6 flex items-center">
          {author && (
            <div className="flex-shrink-0">
              <Link to={`/profile/${author._id}`}>
                <img
                  className="h-10 w-10 object-cover object-center rounded-full"
                  src={author.avatar}
                  alt="Author avatar"
                />
              </Link>
            </div>
          )}

          <div className="ml-3 w-full">
            {author && (
              <p className="text-sm font-medium text-gray-900 dark:text-main">
                <Link to={`/profile/${author._id}`} className="hover:underline">
                  {capitalizeEveryFirstChar(author.firstName) +
                    " " +
                    capitalizeFirstChar(author.lastName)}
                </Link>
              </p>
            )}

            <div className="flex space-x-1 justify-between w-full text-sm text-gray-500 dark:text-gray-300">
              <time>
                {format(new Date(post.createdAt || 0), "dd/MM/yyyy, hh:mm a")}
              </time>
              <span>
                {formatDistance(new Date(post.createdAt || 0), new Date(), {
                  addSuffix: true,
                })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;

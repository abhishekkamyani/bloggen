import { useEffect, useRef, useState } from "react";
import PostEditor from "../components/PostEditor";
import { Ripple, Input, Modal, initTWE } from "tw-elements";
import "../css/quill-custom.css";
import { MultiSelect } from "primereact/multiselect";
import { FloatLabel } from "primereact/floatlabel";
import "../css/multiselect.css";
import "primereact/resources/themes/mdc-dark-indigo/theme.css";
import PostPreview from "../components/PostPreview";
import axios from "axios";
import { SERVER_URL } from "../utils";
import { toast } from "react-toastify";
import { Toast } from "primereact/toast";

const initialPost = {
  title: "",
  summary: "",
  blogCover: "",
  categories_names: [],
};

export default function CreatePost() {
  initTWE({ Ripple, Input, Modal });

  const [content, setContent] = useState("");
  const [post, setPost] = useState(initialPost);
  const [image, setImage] = useState("");
  const [categories, setCategories] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const primeToast = useRef(null);

  useEffect(() => {
    let ignore = false;
    axios
      .get(`${SERVER_URL}/api/categories`)
      .then((response) => {
        if (response.status === 200 && !ignore) {
          setCategories(response.data.categories);
        }
      })
      .catch((e) => {
        //console.log(e);
      });

    return () => {
      ignore = true;
    };
  }, []);

  const handleChangeText = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleChangeFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const imageSrc = event.target.result;
      setImage(imageSrc);
    };
    reader.readAsDataURL(file);

    setPost({ ...post, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUploading(true);
    toast.dismiss();
    if (post.categories_names.length <= 0) {
      setIsUploading(false);
      return primeToast.current.show({
        severity: "info",
        summary: "",
        detail: "Please select a category for your blog.",
        life: 3000,
      });
    }
    if (content.length <= 0) {
      setIsUploading(false);
      return primeToast.current.show({
        severity: "info",
        summary: "",
        detail: "Please write content for your blog.",
        life: 3000,
      });
    }

    const formData = new FormData();
    formData.append("data", JSON.stringify(post));
    formData.append("content", content);
    formData.append("blogCover", post.blogCover);

    const promise = axios
      .post(`${SERVER_URL}/api/post/create`, formData, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 201) {
          setPost(initialPost);
          setContent("");
          setImage("");
          primeToast.current.show({
            severity: "success",
            summary: "Hurray 🥳",
            detail: "Your blog has been successfully created.",
            life: 5000,
          });
          setIsUploading(false);
        }
      })
      .catch((e) => {
        console.log(e);
        setIsUploading(false);
        toast.error(
          e.response?.data?.error ||
            "Something went wrong, please try again later."
        );
      });

    toast.promise(promise, { pending: "Your blog upload is in progress" });
  };

  return (
    <div className="py-10 px-5 md:mx-20">
      <Toast ref={primeToast} />
      <h1 className="text-center text-black dark:text-white text-xl sm:text-2xl md:text-3xl font-bold">
        Create Your New Story
      </h1>
      <div className="mx-auto block rounded-lg p-6 shadow-4">
        <form onSubmit={handleSubmit} id="create-post">
          {/*Name input*/}
          <div className="relative mb-6" data-twe-input-wrapper-init="">
            <input
              type="text"
              className="peer block text-black font-bold min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.75rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
              id="title"
              name="title"
              value={post.title}
              onChange={handleChangeText}
              placeholder="title"
            />
            <label
              htmlFor="title"
              className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-300 dark:peer-focus:text-primary"
            >
              Title
            </label>
          </div>
          <div className="mb-10">
            <label
              htmlFor="blogCover"
              className="mb-2 inline-block text-neutral-500 dark:text-neutral-400"
            >
              Blog Cover
            </label>
            <input
              className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-surface transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:me-3 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-e file:border-solid file:border-inherit file:bg-transparent file:px-3  file:py-[0.32rem] file:text-surface focus:border-primary focus:text-gray-700 focus:shadow-inset focus:outline-none dark:border-white/70 dark:text-white  file:dark:text-white"
              type="file"
              accept="image/*"
              id="blogCover"
              name="blogCover"
              // value={post.blogCover}
              onChange={handleChangeFile}
            />
          </div>

          {/*Summary*/}
          <div className="relative mb-6" data-twe-input-wrapper-init="">
            <input
              type="text"
              className="peer font-bold block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.75rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
              id="summary"
              name="summary"
              value={post.summary}
              onChange={handleChangeText}
              placeholder="Email address"
            />
            <label
              htmlFor="summary"
              className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-300 dark:peer-focus:text-primary"
            >
              Summary
            </label>
          </div>

          <div className="mb-6">
            <span className="text-neutral-500 dark:text-neutral-300 inline-block mb-3">
              Selected ({post.categories_names.length} / 3)
            </span>
            <br />
            <FloatLabel>
              <MultiSelect
                id="categories_names"
                name="categories_names"
                value={post.categories_names}
                onChange={handleChangeText}
                options={categories.map((category) => category.name)}
                placeholder="Categories"
                maxLength={3}
                itemClassName={`${
                  post.categories_names.length >= 3 && "pointer-events-none"
                }`}
                showSelectAll={false}
                display="chip"
                filter={true}
                filterPlaceholder="Search categories"
                emptyFilterMessage="No categories found"
                className="px-5"
              />
              <label htmlFor="categories_names">Categories</label>
            </FloatLabel>
          </div>

          <PostEditor content={content} setContent={setContent} />
          {/*Submit button*/}
          {/* <button
            type="submit"
            className=""
            data-twe-ripple-init=""
            data-twe-ripple-color="light"
          >
            Preview
          </button> */}
          <PostPreview
            content={content}
            post={post}
            imageSrc={image}
            isUploading={isUploading}
            form="create-post"
          />
        </form>
      </div>
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";

export default function PostPreview({ content, post, imageSrc, form }) {
  return (
    <>
      {/* Button trigger modal */}
      <button
        type="button"
        className="inline-block font-bold btn mt-10 w-full rounded px-6 py-4 text-xs uppercase leading-normal  transition duration-150 ease-in-out"
        data-twe-toggle="modal"
        data-twe-target="#exampleModalFullscreen"
        data-twe-ripple-init=""
        data-twe-ripple-color="light"
      >
        Preview
      </button>
      {/* Modal */}
      <div
        data-twe-modal-init=""
        className="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
        id="exampleModalFullscreen"
        tabIndex={-1}
        aria-labelledby="exampleModalFullscreenLabel"
        aria-hidden="true"
      >
        <div
          data-twe-modal-dialog-ref=""
          className="pointer-events-none relative w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[0px]:m-0 min-[0px]:h-full min-[0px]:max-w-none"
        >
          <div className="pointer-events-auto relative flex w-full flex-col rounded-md bg-white bg-clip-padding text-current shadow-4 outline-none dark:bg-dark-main min-[0px]:h-full min-[0px]:rounded-none min-[0px]:border-0">
            <div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 p-4 dark:border-white/10 min-[0px]:rounded-none">
              {/* Modal title */}
              <h5
                className="text-xl font-medium leading-normal text-surface dark:text-white"
                id="exampleModalFullscreenLabel"
              >
                Preview
              </h5>
              {/* Close button */}
              <button
                type="button"
                className="box-content rounded-none border-none text-neutral-500 hover:text-neutral-800 hover:no-underline focus:text-neutral-800 focus:opacity-100 focus:shadow-none focus:outline-none dark:text-neutral-400 dark:hover:text-neutral-300 dark:focus:text-neutral-300"
                data-twe-modal-dismiss=""
                aria-label="Close"
              >
                <span className="[&>svg]:h-6 [&>svg]:w-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </span>
              </button>
            </div>

            {/* Modal body */}
            <div className="relative p-4 dark:text-white text-black min-[0px]:overflow-y-auto">
              <main className="container mx-auto mt-8">
                <div className="flex flex-wrap justify-between">
                  <div className="w-full md:w-8/12 h-full px-4 mb-8">
                    <img
                      src={imageSrc}
                      alt="Featured Image"
                      className="w-full h-full rounded"
                    />
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-4 mb-2">
                      {post.title}
                    </h2>
                    <div
                      className="quill-content"
                      dangerouslySetInnerHTML={{ __html: content }}
                    />
                  </div>

                  <div className="w-full md:w-4/12 px-4 mb-8">
                    <div className="px-4 bg-slate-300 dark:bg-slate-900 py-6 rounded">
                      <h3 className="text-lg font-bold mb-2">Categories</h3>
                      <ul className="list-disc list-inside">
                        {post.categories_names.map((name) => (
                          <li>
                            <Link
                              key={name}
                              className="hover:text-gray-500 dark:hover:text-gray-300"
                            >
                              {name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </main>
            </div>
            {/* Modal footer */}
            <div className="mt-auto flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 p-4 dark:border-white/10 min-[0px]:rounded-none">
              <button
                type="button"
                className="inline-block mx-2 rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-200 focus:bg-primary-accent-200 focus:outline-none focus:ring-0 active:bg-primary-accent-200 dark:bg-primary-300 dark:hover:bg-primary-400 dark:focus:bg-primary-400 dark:active:bg-primary-400"
                data-twe-modal-dismiss
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-block mx-2 rounded btn px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal  transition duration-150 ease-in-out "
                data-twe-modal-dismiss
                form={form}
              >
                Publish
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

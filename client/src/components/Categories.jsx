import React from 'react'

export default function Categories() {
    return (
        <>
            {/* Button trigger modal */}
            <button
                type="button"
                className="hidden"
                data-twe-toggle="modal"
                data-twe-target="#categoriesModal"
                id='categoriesModalButton'
                data-twe-ripple-init=""
                data-twe-ripple-color="light"
            >
            </button>
            {/* Modal */}
            <div
                data-twe-modal-init=""
                className="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
                id="categoriesModal"
                tabIndex={-1}
                aria-labelledby="categoriesModalLabel"
                aria-hidden="true"
            >
                <div
                    data-twe-modal-dialog-ref=""
                    className="pointer-events-none relative w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[0px]:m-0 min-[0px]:h-full min-[0px]:max-w-none"
                >
                    <div className="pointer-events-auto relative flex w-full flex-col rounded-md bg-white bg-clip-padding text-current shadow-4 outline-none dark:bg-surface-dark min-[0px]:h-full min-[0px]:rounded-none min-[0px]:border-0">
                        <div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 p-4 dark:border-white/10 min-[0px]:rounded-none">
                            {/* Modal title */}
                            <h5
                                className="text-xl font-medium leading-normal text-surface dark:text-white"
                                id="categoriesModalLabel"
                            >
                                Please Select Your Preferred Categories
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
                        <div className="relative p-4 min-[0px]:overflow-y-auto">
                            <p className="px-10 text-center leading-[3rem]"></p>
                        </div>
                        {/* Modal footer */}
                        <div className="mt-auto flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 p-4 dark:border-white/10 min-[0px]:rounded-none">
                            <button
                                type="button"
                                className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-200 focus:bg-primary-accent-200 focus:outline-none focus:ring-0 active:bg-primary-accent-200 dark:bg-primary-300 dark:hover:bg-primary-400 dark:focus:bg-primary-400 dark:active:bg-primary-400"
                                data-twe-modal-dismiss=""
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

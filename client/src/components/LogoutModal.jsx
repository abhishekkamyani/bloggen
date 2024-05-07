import React, { useEffect } from 'react'
import { Modal, Ripple, initTWE } from "tw-elements";
import { useUserInfo } from '../contexts/UserContext';
import axios from 'axios';
import { SERVER_URL } from '../utils';
import {useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

export default function LogoutModal() {
    const { setUserInfo } = useUserInfo();
    const navigate = useNavigate();

    const handleLogout = () => {
        axios
            .get(`${SERVER_URL}/api/auth/logout`, { withCredentials: true })
            .then(response => {
                if (response.status === 200) {
                    setUserInfo({});
                    navigate("/");
                    toast.success("Logout successful.")
                }
            })
            .catch(e => {
                // console.error(e)
            })
    }

    useEffect(() => {
        initTWE({ Modal, Ripple });
    })

    return (
        <div className="">
            {/* Button trigger vertically centered modal*/}
           
            {/*Vertically centered modal*/}
            <div
                data-twe-modal-init=""
                className="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
                id="exampleModalCenter"
                tabIndex={-1}
                aria-labelledby="exampleModalCenterTitle"
                aria-modal="true"
                role="dialog"
            >
                <div
                    data-twe-modal-dialog-ref
                    className="pointer-events-none relative flex min-h-[calc(100%-1rem)] w-auto translate-y-[-50px] items-center opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:min-h-[calc(100%-3.5rem)] min-[576px]:max-w-[500px]"
                >
                    <div className="pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-4 outline-none dark:bg-slate-700">
                        <div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 p-4 dark:border-white/10">
                            {/* Modal title */}
                            <h5
                                className="text-xl font-medium leading-normal text-dark-main dark:text-white"
                                id="exampleModalCenterTitle"
                            >
                                Logout from Bloggen
                            </h5>
                            {/* Close button */}
                            <button
                                type="button"
                                className="box-content rounded-none border-none text-neutral-500 hover:text-neutral-800 hover:no-underline focus:text-neutral-800 focus:opacity-100 focus:shadow-none focus:outline-none dark:text-neutral-400 dark:hover:text-neutral-300 dark:focus:text-neutral-300"
                                data-twe-modal-dismiss
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
                        <div className="relative p-4 text-dark-main dark:text-white">
                            <p>Are you sure you want to log out?</p>
                        </div>
                        {/* Modal footer */}
                        <div className="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 p-4 dark:border-white/10">
                            <button
                                type="button"
                                className="inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal btn"
                                data-twe-modal-dismiss
                                data-twe-ripple-init
                                data-twe-ripple-color="light"
                            >
                                No
                            </button>
                            <button
                                type="button"
                                className="ms-1 inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal btn"
                                data-twe-ripple-init
                                data-twe-modal-dismiss
                                data-twe-ripple-color="light"
                                onClick={handleLogout}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

import axios from 'axios';
import { useEffect, useRef, useState } from 'react'
import { SelectButton } from 'primereact/selectbutton';
import { SERVER_URL } from '../utils';
import { useUserInfo } from '../contexts/UserContext';

let pageSize = 20, page = 1;
export default function CategoriesSelection() {
    const categoryIds = useUserInfo()?.userInfo?.categories;
    const [categories, setCategories] = useState([]);
    // console.log(categories);
    const [selectedCategories, setSelectedCategories] = useState(categoryIds?.map(_id => ({ _id })));
    const totalPages = useRef();

    const arrayOfObjects = categoryIds?.map(_id => ({ _id }));
    console.log(arrayOfObjects);


    useEffect(() => {
        let ignore = false;

        fetchCategories()
            .then(response => {
                if (!ignore) {
                    console.log(response);
                    setCategories(response.categories);
                    totalPages.current = response.totalPages;
                }
            })
            .catch((e) => console.log(e));

        return () => {
            ignore = true;
        }
    }, [])

    const fetchMore = () => {
        page += 1;
        fetchCategories()
            .then(response => {
                setCategories([...categories, ...response.categories]);
            })
            .catch((e) => console.log(e));
    }

    console.log(selectedCategories);

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/api/categories?page=${page}&pageSize=${pageSize}`);
            if (response.status === 200) {
                return response.data;
            }
            throw new Error(response);
        } catch (error) {
            return error;
        }
    }

    const handleSubmit = () => {
        axios.patch(`${SERVER_URL}/api/user/add-categories`, {categories: selectedCategories}, { withCredentials: true })
            .then(response => {
                if (response.status === 200) {
                    console.log(response.data);
                }
            })
            .catch(e => {
                console.log(e);
            })
    }

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
                    <div className="pointer-events-auto bg-main dark:bg-dark-main text-black dark:text-main relative flex w-full flex-col rounded-md bg-clip-padding text-current shadow-4 outline-none min-[0px]:h-full min-[0px]:rounded-none min-[0px]:border-0">
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
                            <p className="px-10 text-center leading-[3rem]">
                                <SelectButton
                                    optionLabel="name"
                                    optionValue="_id"
                                    options={categories}
                                    value={selectedCategories}
                                    onChange={(e) => setSelectedCategories(e.value)}
                                    multiple
                                />

                                {page < totalPages.current && (
                                    <button onClick={fetchMore} className="relative ms-auto group cursor-pointer text-main  overflow-hidden h-12 w-48 rounded-md bg-primary p-2 flex justify-center items-center font-extrabold">
                                        <div className="absolute top-3 right-20 group-hover:top-12 group-hover:-right-12 z-10 w-40 h-40 rounded-full group-hover:scale-150 group-hover:opacity-50 duration-500 bg-primary" />
                                        <div className="absolute top-3 right-20 group-hover:top-12 group-hover:-right-12 z-10 w-32 h-32 rounded-full group-hover:scale-150 group-hover:opacity-50 duration-500 bg-primary-dark" />
                                        <div className="absolute top-3 right-20 group-hover:top-12 group-hover:-right-12 z-10 w-24 h-24 rounded-full group-hover:scale-150 group-hover:opacity-50 duration-500 bg-primary-light" />
                                        <div className="absolute top-3 right-20 group-hover:top-12 group-hover:-right-12 z-10 w-14 h-14 rounded-full group-hover:scale-150 group-hover:opacity-50 duration-500 bg-primary-dark" />
                                        <p className="z-10">See more</p>
                                    </button>
                                )}


                            </p>
                        </div>
                        {/* Modal footer */}
                        <div className="mt-auto flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 p-4 dark:border-white/10 min-[0px]:rounded-none">
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="inline-block rounded btn px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal transition duration-150 ease-in-out"
                            // data-twe-modal-dismiss=""
                            >
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

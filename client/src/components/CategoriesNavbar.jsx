import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom';
import { useUserInfo } from '../contexts/UserContext';
import axios from 'axios';
import { SERVER_URL } from '../utils';

export default function CategoriesNavbar({ page, pageSize, selectedCategory }) {

    const [isRight, setIsRight] = useState(true);
    const [isLeft, setIsLeft] = useState(false);
    const containerRef = useRef(null);
    const categoryIds = useUserInfo()?.userInfo?.categories;
    const [categories, setCategories] = useState([]);

    const handleScroll = (e) => {
        const container = e.target;

        if (Math.ceil(container.scrollLeft) >= (container.scrollWidth - container.clientWidth)) {
            setIsRight(false);
        }
        else {
            console.log("Scroll");
            setIsRight(true);
        }

        if (container.scrollLeft === 0) {
            setIsLeft(false);
        }
        else {
            setIsLeft(true);
        }
    }

    const handleRight = () => {
        const container = containerRef.current;
        const scrollLeft = container.scrollLeft;

        container.scrollTo({
            left: scrollLeft + 400,
            behavior: "smooth"
        })
    }

    const handleLeft = () => {
        const container = containerRef.current;
        const scrollLeft = container.scrollLeft;

        container.scrollTo({
            left: scrollLeft - 400,
            behavior: "smooth"
        })
    }

    useEffect(() => {
        let ignore = false;

        if (categoryIds?.length) {
            axios.get(`${SERVER_URL}/api/categories/${categoryIds}`)
                .then(response => {
                    if (response.status === 200 && !ignore) {
                        //console.log(response.data);
                        setCategories(response.data);
                    }
                })
                .catch(e => {
                    //console.log(e);
                })
        }

        return () => {
            ignore = true;
        }
    }, [categoryIds])

    useEffect(() => {
        let ignore = false;
        const container = containerRef.current;
        if (container.scrollWidth === container.clientWidth) {
            !ignore && setIsRight(false);
        }
        else {
            !ignore && setIsRight(true);
        }

        console.log("useEffect");

        return () => {
            ignore = true;
        }
    }, [categories])


    return (
        <div className='relative mx-auto dark:text-white w-100 md:w-[90%]'>
            <ul ref={containerRef} className='flex border-b-[2px] dark:border-slate-600 text-center items-center mx-10 overflow-x-scroll overflow-y-hidden my-5 pb-3 text-nowrap' onScroll={handleScroll}>
                <button
                    title="Add New"
                    className="group mr-5 cursor-pointer outline-none hover:rotate-90 duration-300"
                    data-twe-toggle="modal"
                    data-twe-target="#categoriesModal"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="35px"
                        height="35px"
                        viewBox="0 0 24 24"
                        className="stroke-zinc-400 fill-none group-hover:fill-zinc-800 group-active:stroke-zinc-200 group-active:fill-zinc-600 group-active:duration-0 duration-300"
                    >
                        <path
                            d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                            strokeWidth="1.5"
                        />
                        <path d="M8 12H16" strokeWidth="1.5" />
                        <path d="M12 16V8" strokeWidth="1.5" />
                    </svg>
                </button>
                <li key={Math.random()} className='mr-10'>
                    <Link
                        to={`?page=${page}&pageSize=${pageSize}`}
                        className={`${!selectedCategory || selectedCategory === "all" && "font-extrabold"}`}
                    >
                        For You
                    </Link>
                </li>
                {categories?.map(category => (
                    <li key={category._id} className='mr-10'>
                        <Link
                            to={`?page=${page}&pageSize=${pageSize}&category=${category.slug}`}
                            className={`${selectedCategory === category.slug && "font-extrabold"}`}
                        >
                            {category.name}
                        </Link>
                    </li>
                ))}

            </ul>
            <span className='absolute text-2xl top-0 right-0 pr-2 h-full flex items-center bg-transparent px-5 cursor-pointer' onClick={handleRight}>{isRight && ">"}</span>
            <span className='absolute text-2xl top-0 left-0 pl-2 h-full flex items-center cursor-pointer' onClick={handleLeft}>{isLeft && "<"}</span>
            {/* <div className='b w-full h-full'></div> */}
        </div>
    )
}

import { useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom';

export default function Temp() {
    console.log("app");

    const [isRight, setIsRight] = useState(true);
    const [isLeft, setIsLeft] = useState(false);
    const containerRef = useRef(null);


    const handleScroll = (e) => {
        const container = e.target;

        if (container.scrollLeft === (container.scrollWidth - container.clientWidth)) {
            setIsRight(false)
        }
        else {
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
            left: scrollLeft + 100,
            behavior: "smooth"
        })
    }

    const handleLeft = () => {
        const container = containerRef.current;
        const scrollLeft = container.scrollLeft;

        container.scrollTo({
            left: scrollLeft - 100,
            behavior: "smooth"
        })
    }


    return (
        <div className='relative mx-auto border-b-2 border-red-600 dark:text-white w-[75%]'>
            <ul ref={containerRef} className='flex text-center items-center mx-10 gap-x-10 overflow-x-scroll overflow-y-hidden py-5 text-nowrap' onScroll={handleScroll}>
                <li className='item'>
                    <NavLink
                        to={'/temp/1'}
                        className={({ isActive }) => {
                            return [
                                isActive ? "font-bold" : "",
                            ].join(" ")
                        }}
                    >
                        For you 1
                    </NavLink>
                </li>
                <li className='item '>
                    <NavLink
                        to={'/temp/2'}
                        className={({ isActive }) => {
                            return isActive ? "text-orange-500" : "text-gray-500";
                        }}>
                        For you 2
                    </NavLink>
                </li>
                {/* <li className='item '>For you 2</li> */}
                <li className='item '>For you 3</li>
                <li className='item '>For you 4</li>
                <li className='item '>For you 5</li>
                <li className='item '>For you 6</li>
                <li className='item '>For you 7</li>
                <li className='item '>For you 8</li>
            </ul>
                <span className='absolute text-2xl top-0 right-0 pr-2 h-full flex items-center bg-transparent px-5 cursor-pointer' onClick={handleRight}>{isRight && ">"}</span>
                <span className='absolute text-2xl top-0 left-0 pl-2 h-full flex items-center cursor-pointer' onClick={handleLeft}>{isLeft && "<"}</span>
            {/* <div className='b w-full h-full'></div> */}
        </div>
    )
}

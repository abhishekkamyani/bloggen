import { classNames } from 'primereact/utils';
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom';

export default function Temp() {
    console.log("app");

    const [isRight, setIsRight] = useState(true);
    const [isLeft, setIsLeft] = useState(false);


    const handleScroll = (e) => {
        const container = e.target;

        if (container.scrollLeft === (container.scrollWidth - container.clientWidth)) {
            // setArrows({...arrows, isRight: false});
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


    return (
        <div className='bg-slate-700 relative my-10 mx-auto text-white w-1/2'>
            <ul className='flex text-center border-b-2 border-red-600 items-center px-5 gap-x-10 overflow-x-scroll overflow-y-hidden py-5 text-nowrap' onScroll={handleScroll}>
                <li className='item z-10'>
                    <NavLink
                        to={'/temp/1'}
                        className={({ isActive }) => {
                            return isActive ? "text-orange-500" : "text-gray-500";
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
                <span className='absolute text-2xl right-0 pr-2 h-full flex items-center'>{isRight && ">"}</span>
                <span className='absolute text-2xl left-0 pl-2 h-full flex items-center'>{isLeft && "<"}</span>
            </ul>
            {/* <div className='b w-full h-full'></div> */}
        </div>
    )
}

import React from 'react'
import Post from './Post'

export default function Posts() {
    return (
        <section className='grid grid-cols-1 mx-5 lg:mx-10 my-5 md:grid-cols-2 lg:grid-cols-4 gap-4 '>
            <Post />
            <Post />
            <Post />
            <Post />
        </section>
    )
}
